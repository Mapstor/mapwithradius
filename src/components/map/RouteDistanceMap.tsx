'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { createTileLayer } from '@/lib/mapTiles';
import 'leaflet/dist/leaflet.css';
import { haversineDistance, formatDistance } from '@/lib/haversine';
import { formatDuration, minutesAtPace } from '@/lib/travelTimes';
import { geocodeAddress, GeocodingResult } from '@/lib/geocoding';
import LocationSearchInput from './LocationSearchInput';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Pt {
  lat: number;
  lng: number;
}

const PACE_PRESETS = [
  { key: 'run', label: '🏃 Run', minPerMi: 10 },
  { key: 'walk', label: '🚶 Walk', minPerMi: 20 },
  { key: 'cycle', label: '🚴 Cycle', minPerMi: 4 },
] as const;
type PaceKey = 'run' | 'walk' | 'cycle' | 'custom';

const MAX_POINTS = 30;
const parsePace = (s: string): number => {
  const v = parseFloat(s.replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export default function RouteDistanceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<Pt[]>([]);
  const [paceKey, setPaceKey] = useState<PaceKey>('run');
  const [customPace, setCustomPace] = useState('9');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const markersRef = useRef<L.Marker[]>([]);
  const lineRef = useRef<L.Polyline | null>(null);
  const prevLenRef = useRef(0);
  const seededRef = useRef(false);

  const addPoint = useCallback((lat: number, lng: number) => {
    setPoints((prev) => (prev.length >= MAX_POINTS ? prev : [...prev, { lat, lng }]));
  }, []);

  // Initialize map + seed from ?route=lat,lng;lat,lng (shareable links, hero shot, tests)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });
    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);
    createTileLayer(L).addTo(map);
    map.on('click', (e: L.LeafletMouseEvent) => addPoint(e.latlng.lat, e.latlng.lng));
    mapRef.current = map;

    if (!seededRef.current && typeof window !== 'undefined') {
      seededRef.current = true;
      const raw = new URLSearchParams(window.location.search).get('route');
      if (raw) {
        const seeded = raw
          .split(';')
          .map((seg) => {
            const [a, b] = seg.split(',');
            return { lat: parseFloat(a), lng: parseFloat(b) };
          })
          .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
        if (seeded.length) setPoints(seeded);
      }
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [addPoint]);

  // Render point handles + the route polyline; fit only when the point count changes (never mid-drag)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }

    points.forEach((pt, i) => {
      const color = i === 0 ? '#22c55e' : i === points.length - 1 ? '#ef4444' : '#2563eb';
      const icon = L.divIcon({
        className: 'route-handle',
        html: `<div class="route-handle-dot" style="background:${color}"></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });
      const marker = L.marker([pt.lat, pt.lng], { icon, draggable: true, keyboard: false }).addTo(map);
      marker.on('drag', () => {
        // Redraw the line live while a handle is dragged.
        const line = lineRef.current;
        if (!line) return;
        const latlngs = markersRef.current.map((m) => m.getLatLng());
        line.setLatLngs(latlngs);
      });
      marker.on('dragend', (e) => {
        const np = (e.target as L.Marker).getLatLng();
        setPoints((prev) => prev.map((q, j) => (j === i ? { lat: np.lat, lng: np.lng } : q)));
      });
      markersRef.current.push(marker);
    });

    if (points.length >= 2) {
      lineRef.current = L.polyline(
        points.map((p) => [p.lat, p.lng] as [number, number]),
        { color: '#2563eb', weight: 4, opacity: 0.85 }
      ).addTo(map);
    }

    if (points.length >= 2 && points.length !== prevLenRef.current) {
      map.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number])), { padding: [50, 50] });
    }
    prevLenRef.current = points.length;
  }, [points]);

  // Injected styles for the 44px point handles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .route-handle { background: transparent !important; border: none !important; touch-action: none; display: grid; place-items: center; cursor: grab; }
      .route-handle:active { cursor: grabbing; }
      .route-handle-dot { width: 18px; height: 18px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 6px rgba(15,23,42,0.35); }
      @media (pointer: coarse) { .route-handle-dot { transition: transform 0.12s ease; } .route-handle:active .route-handle-dot { transform: scale(1.3); } }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const distanceMi = useMemo(
    () =>
      points.reduce(
        (sum, p, i) => (i === 0 ? 0 : sum + haversineDistance(points[i - 1].lat, points[i - 1].lng, p.lat, p.lng, 'miles')),
        0
      ),
    [points]
  );
  const activePace =
    paceKey === 'custom' ? parsePace(customPace) : PACE_PRESETS.find((p) => p.key === paceKey)!.minPerMi;
  const hasRoute = points.length >= 2 && distanceMi > 0;
  const timeMin = hasRoute && activePace > 0 ? Math.round(minutesAtPace(distanceMi, activePace)) : 0;

  const handleClear = useCallback(() => setPoints([]), []);
  const handleUndo = useCallback(() => setPoints((prev) => prev.slice(0, -1)), []);

  const handleSearchSelect = useCallback(
    (s: GeocodingResult) => {
      addPoint(s.lat, s.lng);
      setSearchQuery('');
      setSearchError(null);
      mapRef.current?.setView([s.lat, s.lng], 14);
    },
    [addPoint]
  );
  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      const result = await geocodeAddress(searchQuery);
      if (result) handleSearchSelect(result);
      else setSearchError('Location not found. Try a different search.');
    },
    [searchQuery, handleSearchSelect]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setSearchError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        addPoint(pos.coords.latitude, pos.coords.longitude);
        mapRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 14);
      },
      () => {
        setIsLocating(false);
        setSearchError('Could not get your location. Search for an address instead.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [addPoint]);

  return (
    // #how-far-did-i-run-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="how-far-did-i-run-tool" data-testid="hfdir-tool" className="relative">
      {/* Canonical, layout-independent state for tests/automation */}
      <div
        data-testid="hfdir-state"
        className="sr-only"
        data-points={points.length}
        data-distance-mi={distanceMi.toFixed(4)}
        data-active-pace={activePace}
        data-time-min={timeMin}
      />

      {points.length === 0 && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          Tap the map to trace your route — tap each turn
        </div>
      )}

      <div className="relative">
        <div className="w-full">
          <div ref={containerRef} className="w-full h-[60vh] lg:h-[75vh] overflow-hidden" style={{ minHeight: '300px' }} />
        </div>

        {/* Controls */}
        <div className="lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:z-[500] mt-4 lg:mt-0 px-4 lg:px-0">
          <div className="controls-panel controls-overlay">
            {/* Distance readout — primary answer */}
            <div>
              <div className="control-section-label">Route distance</div>
              <div data-testid="hfdir-distance" className="text-3xl font-bold text-slate-900">
                {hasRoute ? formatDistance(distanceMi, 'miles') : '—'}
                {hasRoute && (
                  <span className="text-slate-500 font-normal text-base ml-2">
                    ({formatDistance(distanceMi * 1.60934, 'kilometers')})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {points.length === 0
                  ? 'Tap the map to drop your start point.'
                  : points.length === 1
                    ? 'Tap again to add the next point.'
                    : `${points.length} points · straight segments between them`}
              </p>
            </div>

            {/* Pace → time */}
            <div>
              <div className="control-section-label">Pace</div>
              <div className="grid grid-cols-4 gap-1.5">
                {PACE_PRESETS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    data-testid={`hfdir-pace-${p.key}`}
                    onClick={() => setPaceKey(p.key)}
                    className={`py-1.5 rounded-md text-sm font-medium border transition-colors ${
                      paceKey === p.key ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                <button
                  type="button"
                  data-testid="hfdir-pace-custom"
                  onClick={() => setPaceKey('custom')}
                  className={`py-1.5 rounded-md text-sm font-medium border transition-colors ${
                    paceKey === 'custom' ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Custom
                </button>
              </div>
              {paceKey === 'custom' && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    data-testid="hfdir-pace-input"
                    type="text"
                    inputMode="decimal"
                    value={customPace}
                    onChange={(e) => setCustomPace(e.target.value)}
                    className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
                  />
                  <span className="text-sm text-slate-600">min / mile</span>
                </div>
              )}
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-slate-600">
                  {hasRoute && activePace > 0
                    ? `at ${activePace} min/mi ≈`
                    : 'Trace a route to estimate the time'}
                </div>
                <div data-testid="hfdir-time" className="text-2xl font-bold text-slate-900">
                  {hasRoute && activePace > 0 ? formatDuration(timeMin) : '—'}
                </div>
              </div>
            </div>

            {/* Add / edit */}
            <div>
              <div className="control-section-label">Add a point</div>
              <form onSubmit={handleSearchSubmit} className="space-y-2">
                <LocationSearchInput
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  onSelectLocation={handleSearchSelect}
                  placeholder="Search address, city, or zip…"
                  inputClassName="w-full pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  disabled={isLocating}
                />
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={isLocating}
                  data-testid="hfdir-use-location"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isLocating ? 'Detecting…' : 'Start at my location'}
                </button>
              </form>
              {searchError && <p className="mt-2 text-sm text-red-600">{searchError}</p>}
              {points.length > 0 && (
                <div className="flex gap-2 mt-3">
                  <button onClick={handleUndo} data-testid="hfdir-undo" className="flex-1 btn-secondary text-sm">
                    Undo point
                  </button>
                  <button onClick={handleClear} data-testid="hfdir-clear" className="flex-1 btn-secondary text-sm">
                    Clear
                  </button>
                </div>
              )}
              <p className="mt-3 text-xs text-slate-500">
                Straight-line segments between points. Distance is “as the crow flies” along your route, not
                snapped to roads yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
