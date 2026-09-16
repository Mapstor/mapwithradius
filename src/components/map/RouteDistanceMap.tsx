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

type Mode = 'run' | 'walk' | 'cycle';
const MODES: { key: Mode; label: string; costing: 'pedestrian' | 'bicycle'; minPerMi: number }[] = [
  { key: 'run', label: '🏃 Run', costing: 'pedestrian', minPerMi: 10 },
  { key: 'walk', label: '🚶 Walk', costing: 'pedestrian', minPerMi: 20 },
  { key: 'cycle', label: '🚴 Cycle', costing: 'bicycle', minPerMi: 4 },
];

const MAX_POINTS = 30;
const KM_PER_MI = 1.60934;
// Same free FOSSGIS Valhalla server /drive-time uses. No key; fair-use → one request per
// settled edit (debounced), aborted when a newer edit supersedes it.
const VALHALLA_ROUTE = 'https://valhalla1.openstreetmap.de/route';
const SNAP_DEBOUNCE_MS = 300;
const SNAP_TIMEOUT_MS = 6000;

const parsePace = (s: string): number => {
  const v = parseFloat(s.replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : 0;
};

// Standard Google-polyline decoder; Valhalla returns leg shapes at precision 6.
function decodeShape(encoded: string, precision = 6): [number, number][] {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coords: [number, number][] = [];
  const factor = Math.pow(10, precision);
  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    coords.push([lat / factor, lng / factor]);
  }
  return coords;
}

type SnapStatus = 'idle' | 'snapping' | 'snapped' | 'straight' | 'error';
// A snapped result carries the exact `points` array it was computed for, so a result that
// arrives after the user has already edited again is discarded by reference check.
interface SnapResult {
  forPoints: Pt[];
  path: [number, number][];
  mi: number;
  mode: Mode;
}

export default function RouteDistanceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<Pt[]>([]);
  const [mode, setMode] = useState<Mode>('run');
  const [snap, setSnap] = useState(true);
  const [paceOverride, setPaceOverride] = useState(''); // '' → use the active mode's default pace
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const [snapResult, setSnapResult] = useState<SnapResult | null>(null);
  const [snapStatus, setSnapStatus] = useState<SnapStatus>('idle');

  const markersRef = useRef<L.Marker[]>([]);
  const lineRef = useRef<L.Polyline | null>(null);
  const prevLenRef = useRef(0);
  const seededRef = useRef(false);
  const pointsRef = useRef<Pt[]>(points);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

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

  // Waypoint handles — rebuilt when the points change; fit only when the count changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

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
        // Live straight preview along the raw handles while dragging (snap fires on release).
        const line = lineRef.current;
        if (line) line.setLatLngs(markersRef.current.map((m) => m.getLatLng()));
      });
      marker.on('dragend', (e) => {
        const np = (e.target as L.Marker).getLatLng();
        setPoints((prev) => prev.map((q, j) => (j === i ? { lat: np.lat, lng: np.lng } : q)));
      });
      markersRef.current.push(marker);
    });

    if (points.length >= 2 && points.length !== prevLenRef.current) {
      map.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number])), { padding: [50, 50] });
    }
    prevLenRef.current = points.length;
  }, [points]);

  // A snapped result is "current" only if it matches the live points AND the live mode AND snap
  // is on — so turning Snap off or switching mode reverts to straight-line immediately (and until
  // a matching snap lands), keeping the distance, the polyline, and the note consistent.
  const snapCurrent =
    snap && snapResult && snapResult.forPoints === points && snapResult.mode === mode ? snapResult : null;

  // Route polyline — snapped path when we have a current one, else straight (dashed) between points.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }
    if (points.length < 2) return;
    const straight = points.map((p) => [p.lat, p.lng] as [number, number]);
    const path = snapCurrent && snapCurrent.path.length >= 2 ? snapCurrent.path : straight;
    lineRef.current = L.polyline(path, {
      color: '#2563eb',
      weight: 4,
      opacity: 0.85,
      // Dashed while we're showing straight segments (snapping in flight, snap off, or fallback).
      dashArray: snapCurrent ? undefined : '6 8',
    }).addTo(map);
  }, [points, snapCurrent]);

  // Snap the whole waypoint list via Valhalla /route — one request per settled edit.
  useEffect(() => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (points.length < 2) {
      setSnapStatus('idle');
      return;
    }
    if (!snap) {
      setSnapStatus('straight');
      return;
    }

    const pts = points;
    const costing = MODES.find((m) => m.key === mode)!.costing;
    setSnapStatus('snapping');

    snapTimerRef.current = setTimeout(async () => {
      const ac = new AbortController();
      abortRef.current = ac;
      let timedOut = false;
      const to = setTimeout(() => {
        timedOut = true;
        ac.abort();
      }, SNAP_TIMEOUT_MS);
      try {
        // GET ?json= (not POST) — matches the drive-time isochrone call and stays a "simple"
        // CORS request, so the free FOSSGIS server needs no preflight. 30 waypoints fit easily.
        const reqJson = JSON.stringify({
          locations: pts.map((p) => ({ lat: p.lat, lon: p.lng })),
          costing,
          directions_options: { units: 'miles' },
        });
        const res = await fetch(`${VALHALLA_ROUTE}?json=${encodeURIComponent(reqJson)}`, {
          headers: { 'User-Agent': 'MapWithRadius/1.0' },
          signal: ac.signal,
        });
        clearTimeout(to);
        if (!res.ok) throw new Error(`route ${res.status}`);
        const data = await res.json();
        const legs = data?.trip?.legs;
        const lengthMi = data?.trip?.summary?.length;
        if (!Array.isArray(legs) || typeof lengthMi !== 'number') throw new Error('bad route response');
        const path = legs.flatMap((leg: { shape?: string }) => (leg.shape ? decodeShape(leg.shape) : []));
        if (path.length < 2) throw new Error('empty shape');
        if (pointsRef.current !== pts) return; // superseded by a newer edit
        setSnapResult({ forPoints: pts, path, mi: lengthMi, mode });
        setSnapStatus('snapped');
      } catch (err) {
        clearTimeout(to);
        // Aborted because a newer edit replaced this request → let the newer one handle it.
        if ((err as Error).name === 'AbortError' && !timedOut) return;
        if (pointsRef.current !== pts) return;
        setSnapStatus('error'); // network error or timeout → fall back to straight-line distance
      } finally {
        if (abortRef.current === ac) abortRef.current = null;
      }
    }, SNAP_DEBOUNCE_MS);

    return () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      // Abort any in-flight request on re-run/unmount (fair-use + no setState after unmount).
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [points, mode, snap]);

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

  const straightMi = useMemo(
    () =>
      points.reduce(
        (sum, p, i) => (i === 0 ? 0 : sum + haversineDistance(points[i - 1].lat, points[i - 1].lng, p.lat, p.lng, 'miles')),
        0
      ),
    [points]
  );
  // Snapped distance when we have a current snap; otherwise the straight-line total.
  const distanceMi = snapCurrent ? snapCurrent.mi : straightMi;

  const modeDef = MODES.find((m) => m.key === mode)!;
  const activePace = paceOverride.trim() ? parsePace(paceOverride) : modeDef.minPerMi;
  const hasRoute = points.length >= 2 && distanceMi > 0;
  const timeMin = hasRoute && activePace > 0 ? Math.round(minutesAtPace(distanceMi, activePace)) : 0;

  const handleClear = useCallback(() => setPoints([]), []);
  const handleUndo = useCallback(() => setPoints((prev) => prev.slice(0, -1)), []);
  const handleMode = useCallback((m: Mode) => {
    setMode(m);
    setPaceOverride(''); // switch back to the new mode's default pace
  }, []);

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

  const snapNote =
    !hasRoute
      ? null
      : snapStatus === 'snapping'
        ? { text: 'Snapping to paths…', cls: 'text-slate-500' }
        : snapStatus === 'snapped'
          ? { text: `Snapped to ${modeDef.costing === 'bicycle' ? 'cycleways & roads' : 'paths & sidewalks'}`, cls: 'text-emerald-600' }
          : snapStatus === 'error'
            ? { text: 'Couldn’t snap to paths — showing straight-line distance.', cls: 'text-amber-600' }
            : { text: 'Straight-line (crow-flies) between points.', cls: 'text-slate-500' };

  return (
    // #how-far-did-i-run-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="how-far-did-i-run-tool" data-testid="hfdir-tool" className="relative">
      {/* Canonical, layout-independent state for tests/automation */}
      <div
        data-testid="hfdir-state"
        className="sr-only"
        data-points={points.length}
        data-distance-mi={distanceMi.toFixed(4)}
        data-mode={mode}
        data-snap={snap ? '1' : '0'}
        data-snap-status={snapStatus}
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
          <div ref={containerRef} className="w-full h-[60vh] lg:h-[80vh] overflow-hidden" style={{ minHeight: '300px' }} />
        </div>

        {/* Controls — desktop: floating card over the map; mobile: card below the map */}
        <div className="lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:z-[500] mt-4 lg:mt-0 px-4 lg:px-0">
          <div className="controls-panel controls-overlay">
            {/* Distance readout — primary answer */}
            <div>
              <div className="control-section-label">Route distance</div>
              <div data-testid="hfdir-distance" className="text-3xl font-bold text-slate-900">
                {hasRoute ? formatDistance(distanceMi, 'miles') : '—'}
                {hasRoute && (
                  <span className="text-slate-500 font-normal text-base ml-2">
                    ({formatDistance(distanceMi * KM_PER_MI, 'kilometers')})
                  </span>
                )}
              </div>
              {snapNote ? (
                <p data-testid="hfdir-snap-note" className={`text-xs mt-1 ${snapNote.cls}`}>
                  {snapNote.text}
                </p>
              ) : (
                <p className="text-xs text-slate-500 mt-1">
                  {points.length === 0
                    ? 'Tap the map to drop your start point.'
                    : 'Tap again to add the next point.'}
                </p>
              )}
            </div>

            {/* Mode → snapping profile + default pace */}
            <div>
              <div className="control-section-label">Mode</div>
              <div className="grid grid-cols-3 gap-1.5">
                {MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    data-testid={`hfdir-mode-${m.key}`}
                    aria-pressed={mode === m.key}
                    onClick={() => handleMode(m.key)}
                    className={`py-1.5 rounded-md text-sm font-medium border transition-colors ${
                      mode === m.key ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  data-testid="hfdir-snap-toggle"
                  checked={snap}
                  onChange={(e) => setSnap(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-slate-700">Snap to paths &amp; roads</span>
              </label>
            </div>

            {/* Pace → time */}
            <div>
              <div className="control-section-label">Time at pace</div>
              <div className="flex items-center gap-2">
                <input
                  data-testid="hfdir-pace-input"
                  type="text"
                  inputMode="decimal"
                  value={paceOverride}
                  placeholder={String(modeDef.minPerMi)}
                  onChange={(e) => setPaceOverride(e.target.value)}
                  className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
                  aria-label="Pace in minutes per mile"
                />
                <span className="text-sm text-slate-600">min / mile</span>
              </div>
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-slate-600">
                  {hasRoute && activePace > 0 ? `at ${activePace} min/mi ≈` : 'Trace a route to estimate the time'}
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
                Snapping follows walkable/runnable paths (or cycleways) between your points. Turn it off for a
                straight-line “as the crow flies” measure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
