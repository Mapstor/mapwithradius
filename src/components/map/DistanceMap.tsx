'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { createTileLayer } from '@/lib/mapTiles';
import 'leaflet/dist/leaflet.css';
import { haversineDistance, formatDistance } from '@/lib/haversine';
import { geocodeAddress, GeocodingResult } from '@/lib/geocoding';
import LocationSearchInput from './LocationSearchInput';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Point {
  lat: number;
  lng: number;
  label: string;
  name?: string; // display name from geocoding (for the A/B input fields)
}

interface RouteResult {
  distance: number; // in meters
  duration: number; // in seconds
  geometry: [number, number][]; // [lng, lat] pairs
}

const MAX_POINTS = 10;
const labelFor = (i: number) => String.fromCharCode(65 + i); // A, B, C…

// Distinct, non-RED marker palette (red reads as "error"). A=green, B=blue, then amber/purple/…
const POINT_COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#8B5CF6', '#14B8A6', '#EC4899', '#0EA5E9', '#84CC16', '#F97316', '#6366F1'];
const pointColor = (i: number) => POINT_COLORS[i % POINT_COLORS.length];

// Seed a real A→B measurement on load (no empty US map). Washington, DC → New York City.
const DEFAULT_A = { lat: 38.9072, lng: -77.0369, name: 'Washington, DC' };
const DEFAULT_B = { lat: 40.7128, lng: -74.006, name: 'New York City' };

// Midpoint along a polyline by arc length (planar approx — fine for placing an on-map label).
function polylineMidpoint(pts: [number, number][]): [number, number] {
  if (pts.length <= 1) return pts[0] ?? [0, 0];
  const seg: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    seg.push(d);
    total += d;
  }
  let half = total / 2;
  for (let i = 0; i < seg.length; i++) {
    if (half <= seg[i]) {
      const t = seg[i] === 0 ? 0 : half / seg[i];
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
    }
    half -= seg[i];
  }
  return pts[pts.length - 1];
}

const formatDurationShort = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function DistanceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [straightLineDistance, setStraightLineDistance] = useState<number | null>(null);
  const [roadDistance, setRoadDistance] = useState<RouteResult | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  // A/B input text (controlled). Kept in sync with points[0]/points[1] so map-click / drag /
  // clear are reflected, while still letting the user type freely before selecting.
  const [pointAQuery, setPointAQuery] = useState('');
  const [pointBQuery, setPointBQuery] = useState('');
  const [stopQuery, setStopQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const markersRef = useRef<L.Marker[]>([]);
  const straightLineRef = useRef<L.Polyline | null>(null);
  const roadLineRef = useRef<L.Polyline | null>(null);
  const straightLabelRef = useRef<L.Tooltip | null>(null);
  const roadLabelRef = useRef<L.Tooltip | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  // fitBounds padding that reserves the controls panel's footprint over the map, so BOTH markers
  // frame into the open area (desktop panel overlays top-right; mobile panel is below → no reserve).
  const computeFitPadding = useCallback((): L.FitBoundsOptions => {
    const base = 40;
    let padLeft = base;
    let padTop = base;
    let padRight = base;
    let padBottom = base;
    const mapEl = containerRef.current;
    const panelEl = panelRef.current;
    if (mapEl && panelEl) {
      const m = mapEl.getBoundingClientRect();
      const p = panelEl.getBoundingClientRect();
      const vOverlap = Math.min(m.bottom, p.bottom) - Math.max(m.top, p.top);
      const hOverlap = Math.min(m.right, p.right) - Math.max(m.left, p.left);
      if (p.width > 0 && p.height > 0 && vOverlap > 0 && hOverlap > 0) {
        if (p.left > m.left + m.width / 2) padRight = Math.max(base, Math.round(m.right - p.left) + 16);
        if (p.top > m.top + m.height / 2) padBottom = Math.max(base, Math.round(m.bottom - p.top) + 16);
      }
    }
    return { paddingTopLeft: [padLeft, padTop], paddingBottomRight: [padRight, padBottom] };
  }, []);

  const addPoint = useCallback((lat: number, lng: number, name?: string) => {
    setPoints((prev) => (prev.length >= MAX_POINTS ? prev : [...prev, { lat, lng, label: labelFor(prev.length), name }]));
  }, []);

  // Set (or insert) a specific slot — used by the Point A / Point B inputs. Relabels A,B,C… by order.
  const setSlot = useCallback((index: number, lat: number, lng: number, name?: string) => {
    setPoints((prev) => {
      const next = [...prev];
      const pt: Point = { lat, lng, label: labelFor(index), name };
      if (index < next.length) next[index] = pt;
      else next.push(pt);
      return next.map((p, i) => ({ ...p, label: labelFor(i) }));
    });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const container = containerRef.current;

    const map = L.map(container, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

    createTileLayer(L).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      addPoint(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;

    // Fix the first-paint sizing race and keep the map correctly sized on any later container
    // resize (mobile URL bar, rotation) WITHOUT recreating it (matches Acre/Area/DriveTime maps).
    let sizeRaf: number | null = null;
    const invalidate = () => {
      sizeRaf = null;
      mapRef.current?.invalidateSize();
    };
    sizeRaf = requestAnimationFrame(invalidate);
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (sizeRaf != null) cancelAnimationFrame(sizeRaf);
            sizeRaf = requestAnimationFrame(invalidate);
          })
        : null;
    ro?.observe(container);

    return () => {
      if (sizeRaf != null) cancelAnimationFrame(sizeRaf);
      ro?.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Seed a default A→B (Washington DC → New York City) once on load, so the tool opens showing a
  // real measurement — but only when nothing else set points (no user clicks / future URL state).
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    setPoints((prev) => {
      if (prev.length > 0) return prev;
      return [
        { lat: DEFAULT_A.lat, lng: DEFAULT_A.lng, label: 'A', name: DEFAULT_A.name },
        { lat: DEFAULT_B.lat, lng: DEFAULT_B.lng, label: 'B', name: DEFAULT_B.name },
      ];
    });
  }, []);

  // Injected styles for the on-map labels (distance pills + marker name tags). pointer-events:none
  // so they never block map interaction; the tooltip arrow is hidden for a clean pill.
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-tooltip.dc-map-label { color:#fff; border:0; box-shadow:0 1px 5px rgba(15,23,42,.4); font-size:12px; font-weight:700; padding:3px 9px; border-radius:999px; white-space:nowrap; opacity:1; pointer-events:none; }
      .leaflet-tooltip.dc-map-label::before { display:none; }
      .leaflet-tooltip.dc-label-straight { background:#2563EB; }
      .leaflet-tooltip.dc-label-road { background:#7C3AED; }
      .leaflet-tooltip.dc-marker-label { background:rgba(15,23,42,.9); color:#fff; border:0; box-shadow:0 1px 4px rgba(15,23,42,.35); font-size:11.5px; font-weight:600; padding:2px 7px; border-radius:8px; white-space:nowrap; opacity:1; pointer-events:none; }
      .leaflet-tooltip.dc-marker-label::before { display:none; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Keep the A/B input text in sync with the actual points.
  useEffect(() => {
    setPointAQuery(points[0] ? points[0].name ?? `${points[0].lat.toFixed(4)}, ${points[0].lng.toFixed(4)}` : '');
    setPointBQuery(points[1] ? points[1].name ?? `${points[1].lat.toFixed(4)}, ${points[1].lng.toFixed(4)}` : '');
  }, [points]);

  // Update markers and lines when points change
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (straightLineRef.current) {
      straightLineRef.current.remove();
      straightLineRef.current = null;
    }
    if (roadLineRef.current) {
      roadLineRef.current.remove();
      roadLineRef.current = null;
    }
    if (straightLabelRef.current) {
      straightLabelRef.current.remove();
      straightLabelRef.current = null;
    }
    if (roadLabelRef.current) {
      roadLabelRef.current.remove();
      roadLabelRef.current = null;
    }

    points.forEach((point, index) => {
      const color = pointColor(index);
      const icon = L.divIcon({
        className: 'custom-point-marker',
        html: `<div data-point-label="${point.label}" style="
          width: 32px;
          height: 32px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">${point.label}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([point.lat, point.lng], { icon, draggable: true }).addTo(map);

      marker.on('dragend', (e) => {
        const newPos = (e.target as L.Marker).getLatLng();
        setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, lat: newPos.lat, lng: newPos.lng, name: undefined } : p)));
      });

      marker.bindPopup(`
        <div class="text-sm">
          <p class="font-medium">Point ${point.label}${point.name ? ` · ${point.name}` : ''}</p>
          <p>${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}</p>
        </div>
      `);

      // Always-on name tag above the marker (e.g. "A: Washington, DC"). Non-interactive.
      marker.bindTooltip(`${point.label}: ${point.name ?? `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`}`, {
        permanent: true,
        direction: 'top',
        className: 'dc-marker-label',
        offset: [0, -10],
        opacity: 1,
      });

      markersRef.current.push(marker);
    });

    if (points.length >= 2) {
      const latLngs = points.map((p) => [p.lat, p.lng] as [number, number]);

      straightLineRef.current = L.polyline(latLngs, {
        color: '#3B82F6',
        weight: 3,
        dashArray: '10, 10',
        opacity: 0.8,
      }).addTo(map);

      let totalDistance = 0;
      for (let i = 0; i < points.length - 1; i++) {
        totalDistance += haversineDistance(points[i].lat, points[i].lng, points[i + 1].lat, points[i + 1].lng, 'miles');
      }
      setStraightLineDistance(totalDistance);

      // On-map straight-line distance label at the path midpoint (e.g. "203.6 mi").
      const sMid = polylineMidpoint(latLngs);
      straightLabelRef.current = L.tooltip({ permanent: true, direction: 'top', className: 'dc-map-label dc-label-straight', interactive: false, opacity: 1 })
        .setLatLng(sMid)
        .setContent(formatDistance(totalDistance, 'miles'))
        .addTo(map);

      // Frame BOTH markers into the open map area (reserve the panel's footprint).
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, computeFitPadding());

      fetchRoute(points);
    } else {
      setStraightLineDistance(null);
      setRoadDistance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const fetchRoute = async (pts: Point[]) => {
    if (pts.length < 2) return;

    setIsLoadingRoute(true);

    try {
      const coords = pts.map((p) => `${p.lng},${p.lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const geometry = route.geometry.coordinates as [number, number][];

        setRoadDistance({ distance: route.distance, duration: route.duration, geometry });

        if (mapRef.current) {
          if (roadLineRef.current) roadLineRef.current.remove();
          if (roadLabelRef.current) {
            roadLabelRef.current.remove();
            roadLabelRef.current = null;
          }
          const latLngs = geometry.map(([lng, lat]) => [lat, lng] as [number, number]);
          roadLineRef.current = L.polyline(latLngs, { color: '#8B5CF6', weight: 4, opacity: 0.9 }).addTo(mapRef.current);

          // On-map road label at the route midpoint (e.g. "225.7 mi · 4h 48m"). Non-interactive.
          const rMid = polylineMidpoint(latLngs);
          roadLabelRef.current = L.tooltip({ permanent: true, direction: 'bottom', className: 'dc-map-label dc-label-road', interactive: false, opacity: 1 })
            .setLatLng(rMid)
            .setContent(`${formatDistance(route.distance / 1609.344, 'miles')} · ${formatDurationShort(route.duration)}`)
            .addTo(mapRef.current);
        }
      } else {
        setRoadDistance(null);
      }
    } catch (error) {
      console.error('Route fetch error:', error);
      setRoadDistance(null);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  // Enter/submit in a Point A / Point B field → geocode the typed text into that slot.
  const handleSlotSubmit = useCallback(
    async (index: number) => {
      const q = index === 0 ? pointAQuery : pointBQuery;
      if (!q.trim()) return;
      setSearchError(null);
      const result = await geocodeAddress(q);
      if (result) {
        setSlot(index, result.lat, result.lng, result.displayName);
        if (mapRef.current) mapRef.current.setView([result.lat, result.lng], 8);
      } else {
        setSearchError('Location not found. Try a different search.');
      }
    },
    [pointAQuery, pointBQuery, setSlot]
  );

  const handleStopSubmit = useCallback(async () => {
    if (!stopQuery.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    const result = await geocodeAddress(stopQuery);
    if (result) {
      addPoint(result.lat, result.lng, result.displayName);
      setStopQuery('');
      if (mapRef.current) mapRef.current.setView([result.lat, result.lng], 8);
    } else {
      setSearchError('Location not found. Try a different search.');
    }
    setIsSearching(false);
  }, [stopQuery, addPoint]);

  const handleClear = () => {
    setPoints([]);
    setStraightLineDistance(null);
    setRoadDistance(null);
  };

  const handleRemoveLastPoint = () => setPoints((prev) => prev.slice(0, -1));

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setSearchError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSlot(0, latitude, longitude, 'Your location'); // "distance from me → …" → Point A
        if (mapRef.current) mapRef.current.setView([latitude, longitude], 10);
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        setSearchError(errorMessage);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    if (hours > 0) return `${hours} hr ${minutes} min`;
    return `${minutes} min`;
  };

  const slotInputClass =
    'w-full pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 hover:border-slate-300';

  return (
    // #distance-tool marks the whole interactive tool as a Raptive ad-exclusion zone (matches
    // every other tool — #radius-tool, #drive-time-tool, …). Register the selector in Raptive.
    <div id="distance-tool" data-testid="dc-tool" className="relative">
      {/* Instruction banner (only when the user has cleared the default route) */}
      {points.length < 2 && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          {points.length === 0 ? 'Type a start & destination, or click the map' : 'Add Point B — type a place or click the map'}
        </div>
      )}

      <div className="relative">
        {/* Map */}
        <div className="w-full">
          <div ref={containerRef} data-testid="dc-map" className="w-full h-[60vh] lg:h-[75vh] overflow-hidden" style={{ minHeight: '300px' }} />
        </div>

        {/* Controls Panel */}
        <div ref={panelRef} data-testid="dc-panel" className="lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:z-[500] mt-4 lg:mt-0 px-4 lg:px-0">
          <div className="controls-panel controls-overlay">
            {/* Route: Point A / Point B — the primary way to set the two points */}
            <div>
              <div className="control-section-label">Route</div>
              <div className="space-y-2">
                <div data-testid="dc-point-a">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pointColor(0) }} />
                    Point A (start)
                  </label>
                  <LocationSearchInput
                    value={pointAQuery}
                    onValueChange={setPointAQuery}
                    onSelectLocation={(s: GeocodingResult) => {
                      setSlot(0, s.lat, s.lng, s.displayName);
                      if (mapRef.current) mapRef.current.setView([s.lat, s.lng], 8);
                    }}
                    onSubmit={() => handleSlotSubmit(0)}
                    placeholder="Start — city, address, or zip"
                    inputClassName={slotInputClass}
                    disabled={isSearching || isLocating}
                  />
                </div>
                <div data-testid="dc-point-b">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pointColor(1) }} />
                    Point B (destination)
                  </label>
                  <LocationSearchInput
                    value={pointBQuery}
                    onValueChange={setPointBQuery}
                    onSelectLocation={(s: GeocodingResult) => {
                      setSlot(1, s.lat, s.lng, s.displayName);
                      if (mapRef.current) mapRef.current.setView([s.lat, s.lng], 8);
                    }}
                    onSubmit={() => handleSlotSubmit(1)}
                    placeholder={points.length === 0 ? 'Set Point A first' : 'Destination — city, address, or zip'}
                    inputClassName={slotInputClass}
                    // Disabled until Point A exists, so a destination typed first can't silently
                    // land in slot A (the array is dense / A-before-B).
                    disabled={isSearching || isLocating || points.length === 0}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating || isSearching}
                className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Detecting location…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Use my location as Point A
                  </>
                )}
              </button>
              {searchError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {searchError}
                </p>
              )}
            </div>

            {/* Results */}
            {points.length >= 2 && (
              <div className="border-t border-slate-200 pt-5">
                <div className="control-section-label">Distance{points.length > 2 ? ' (total)' : ''}</div>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5" style={{ borderBottom: '2px dashed #3B82F6' }} />
                      <span className="text-xs font-medium text-blue-700">Straight line (as the crow flies)</span>
                    </div>
                    {straightLineDistance !== null && (
                      <div data-testid="dc-straight" className="text-lg font-bold text-slate-900">
                        {formatDistance(straightLineDistance, 'miles')}
                        <span className="text-slate-500 font-normal text-sm ml-2">({formatDistance(straightLineDistance * 1.60934, 'kilometers')})</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-purple-500" />
                      <span className="text-xs font-medium text-purple-700">By road (driving)</span>
                    </div>
                    {isLoadingRoute ? (
                      <div className="flex items-center gap-2 text-slate-500">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Calculating route…
                      </div>
                    ) : roadDistance ? (
                      <>
                        <div data-testid="dc-road" className="text-lg font-bold text-slate-900">
                          {formatDistance(roadDistance.distance / 1609.344, 'miles')}
                          <span className="text-slate-500 font-normal text-sm ml-2">({formatDistance(roadDistance.distance / 1000, 'kilometers')})</span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDuration(roadDistance.duration)} drive
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-500">Route not available (road distance server busy — the straight-line distance above is exact).</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Add a stop (power-user multi-point route) */}
            <div className="border-t border-slate-200 pt-5">
              <div className="control-section-label">Add a stop (optional)</div>
              <LocationSearchInput
                value={stopQuery}
                onValueChange={setStopQuery}
                onSelectLocation={(s: GeocodingResult) => {
                  addPoint(s.lat, s.lng, s.displayName);
                  setStopQuery('');
                  setSearchError(null);
                  if (mapRef.current) mapRef.current.setView([s.lat, s.lng], 8);
                }}
                onSubmit={handleStopSubmit}
                placeholder={points.length >= MAX_POINTS ? 'Max 10 points' : `Add Point ${labelFor(points.length)}…`}
                inputClassName={slotInputClass}
                disabled={isSearching || isLocating || points.length >= MAX_POINTS}
              />
              <p className="mt-1.5 text-xs text-slate-500">Or click the map to drop a point. Cumulative distance follows the points in order.</p>
            </div>

            {/* Points list + edit */}
            {points.length > 0 && (
              <div className="border-t border-slate-200 pt-5">
                <div className="control-section-label">Points ({points.length})</div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {points.map((point, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-slate-50 rounded-lg px-3 py-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: pointColor(index) }}>
                        {point.label}
                      </span>
                      <span className="text-slate-600 truncate flex-1">{point.name ?? `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={handleRemoveLastPoint} className="flex-1 btn-secondary text-sm">
                    Remove Last
                  </button>
                  <button onClick={handleClear} className="flex-1 btn-secondary text-sm">
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Legend */}
            {points.length >= 2 && (
              <div className="text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5" style={{ borderBottom: '2px dashed #3B82F6' }} />
                  <span>Straight-line distance (as the crow flies)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500" />
                  <span>Road distance (actual driving route)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
