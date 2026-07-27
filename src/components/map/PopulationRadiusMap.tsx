'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationSearchInput from './LocationSearchInput';
import { loadZipDatabase, type ZipDatabase } from '@/lib/zipCodes';
import {
  computeRings,
  computeSingle,
  ringsToCsv,
  formatPop,
  toMiles,
  unitShort,
  RING_PRESET,
  type Unit,
  type RingResult,
} from '@/lib/population';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ring shades indexed smallest→largest (inner darkest).
const RING_COLORS = ['#1d4ed8', '#3b82f6', '#7dabf8'];
const SINGLE_COLOR = '#2563eb';

interface Center {
  lat: number;
  lng: number;
}

function parseRadiusParam(raw: string): { radius: number; unit: Unit } | null {
  const m = raw.trim().match(/^([\d.]+)\s*(mi|km|mile|miles|kilometer|kilometers|kilometre|kilometres)?$/i);
  if (!m) return null;
  const radius = parseFloat(m[1]);
  if (!Number.isFinite(radius) || radius <= 0) return null;
  const unit: Unit = m[2] && /^k/i.test(m[2]) ? 'kilometers' : 'miles';
  return { radius, unit };
}

export default function PopulationRadiusMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleLayersRef = useRef<L.Circle[]>([]);
  const centerMarkerRef = useRef<L.Marker | null>(null);

  const [isMapReady, setIsMapReady] = useState(false);
  const [db, setDb] = useState<ZipDatabase | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const [center, setCenter] = useState<Center | null>(null);
  const [unit, setUnit] = useState<Unit>('miles');
  const [mode, setMode] = useState<'rings' | 'custom'>('rings');
  const [customRadius, setCustomRadius] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const [rings, setRings] = useState<RingResult[]>([]);
  const [single, setSingle] = useState<{ population: number; zipCount: number } | null>(null);

  // Refs so long-lived Leaflet handlers read current state.
  const centerRef = useRef(center);
  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  // ---- Init map once ----
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });
    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      setSearchValue('');
      setCenter({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapRef.current = map;
    setIsMapReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ---- Load the ZIP+population database ----
  useEffect(() => {
    let cancelled = false;
    loadZipDatabase()
      .then((loaded) => {
        if (cancelled) return;
        setDb(loaded);
        setDbLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setDbError(err instanceof Error ? err.message : 'Failed to load population data');
        setDbLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Parse shareable URL params once ----
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const unitParam = p.get('unit');
    if (unitParam && /^k/i.test(unitParam)) setUnit('kilometers');
    const r = p.get('r');
    if (r) {
      const parsed = parseRadiusParam(r);
      if (parsed) {
        setMode('custom');
        setCustomRadius(parsed.radius);
        setUnit(parsed.unit);
      }
    }
    const lat = parseFloat(p.get('lat') || '');
    const lng = parseFloat(p.get('lng') || '');
    if (Number.isFinite(lat) && Number.isFinite(lng)) setCenter({ lat, lng });
  }, []);

  const publishData = useCallback(
    (ready: boolean, cumulative: Record<string, number>) => {
      const el = containerRef.current;
      if (!el) return;
      el.dataset.ready = ready ? 'true' : 'false';
      el.dataset.mode = mode;
      if (center) {
        el.dataset.centerLat = center.lat.toFixed(6);
        el.dataset.centerLng = center.lng.toFixed(6);
      }
      el.dataset.cumulative = JSON.stringify(cumulative);
    },
    [mode, center]
  );

  // ---- Recompute + redraw whenever inputs change ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    // Clear previous overlays.
    circleLayersRef.current.forEach((c) => c.remove());
    circleLayersRef.current = [];
    if (centerMarkerRef.current) {
      centerMarkerRef.current.remove();
      centerMarkerRef.current = null;
    }

    if (!center || !db) {
      setRings([]);
      setSingle(null);
      publishData(false, {});
      return;
    }

    // Radii (active unit) to draw + measure.
    const radiiUnit = mode === 'rings' ? RING_PRESET : [customRadius];
    const sorted = [...radiiUnit].filter((r) => r > 0).sort((a, b) => a - b);
    if (sorted.length === 0) return;

    // Draw circles largest→smallest so the inner (darker) sits on top.
    for (let i = sorted.length - 1; i >= 0; i--) {
      const rUnit = sorted[i];
      const meters = toMiles(rUnit, unit) * 1609.344;
      const color = mode === 'rings' ? RING_COLORS[i] ?? SINGLE_COLOR : SINGLE_COLOR;
      const circle = L.circle([center.lat, center.lng], {
        radius: meters,
        color,
        weight: 2,
        opacity: 0.85,
        fillColor: color,
        fillOpacity: 0.1,
      }).addTo(map);
      circleLayersRef.current.push(circle);
    }

    // Draggable centre marker.
    const dot = L.divIcon({
      className: 'pop-center-handle',
      html: '<div class="pop-center-dot"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const marker = L.marker([center.lat, center.lng], { icon: dot, draggable: true, keyboard: false }).addTo(map);
    marker.on('dragend', () => {
      const p = marker.getLatLng();
      setSearchValue('');
      setCenter({ lat: p.lat, lng: p.lng });
    });
    centerMarkerRef.current = marker;

    // Fit to the largest circle.
    const largest = circleLayersRef.current.reduce((a, b) => (a.getRadius() >= b.getRadius() ? a : b));
    map.fitBounds(largest.getBounds(), { padding: [40, 40] });

    // Measure + publish.
    if (mode === 'rings') {
      const result = computeRings(center.lat, center.lng, RING_PRESET, unit, db);
      setRings(result);
      setSingle(null);
      publishData(true, Object.fromEntries(result.map((r) => [String(r.radius), r.cumulativePopulation])));
    } else {
      const result = computeSingle(center.lat, center.lng, customRadius, unit, db);
      setSingle({ population: result.population, zipCount: result.zipCount });
      setRings([]);
      publishData(true, { [String(customRadius)]: result.population });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, unit, mode, customRadius, db, isMapReady]);

  const recenterMap = useCallback((lat: number, lng: number, zoom = 11) => {
    mapRef.current?.setView([lat, lng], zoom);
  }, []);

  const handleSelectLocation = useCallback(
    (r: { lat: number; lng: number; displayName: string }) => {
      setSearchValue(r.displayName);
      setCenter({ lat: r.lat, lng: r.lng });
      recenterMap(r.lat, r.lng);
    },
    [recenterMap]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setSearchValue('');
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        recenterMap(pos.coords.latitude, pos.coords.longitude, 12);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [recenterMap]);

  const exportCsv = useCallback(() => {
    if (mode !== 'rings' || rings.length === 0) return;
    const csv = ringsToCsv(rings, unit);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `population-rings-${center?.lat.toFixed(3)}-${center?.lng.toFixed(3)}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [mode, rings, unit, center]);

  const hasResult = !!center && !!db;
  const u = unitShort(unit);

  return (
    // #population-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="population-tool" className="relative">
      <style>{`
        .pop-center-handle { background: transparent !important; border: 0 !important; }
        .pop-center-dot { width: 16px; height: 16px; border-radius: 50%; background: ${SINGLE_COLOR};
          border: 3px solid #fff; box-shadow: 0 1px 4px rgba(15,23,42,0.4); cursor: grab; }
      `}</style>

      <div
        ref={containerRef}
        data-testid="population-map"
        data-ready="false"
        className="w-full h-[62vh] lg:h-[75vh] overflow-hidden"
        style={{ minHeight: '400px' }}
      />

      {/* Search bar overlay */}
      <div className="absolute top-3 left-3 right-3 lg:right-auto lg:w-96 z-[1000]">
        <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
          <div className="flex-1">
            <LocationSearchInput
              value={searchValue}
              onValueChange={setSearchValue}
              onSelectLocation={handleSelectLocation}
              placeholder="Search address, city, or ZIP…"
              inputClassName="w-full pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            aria-label="Use my location"
            className="flex-none px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50"
          >
            {isLocating ? '…' : '📍'}
          </button>
        </div>
      </div>

      {/* Results panel overlay */}
      <div
        data-testid="population-panel"
        className="absolute z-[1000] left-3 right-3 bottom-3 lg:left-auto lg:right-3 lg:top-3 lg:bottom-auto lg:w-96 bg-white rounded-xl shadow-lg overflow-auto max-h-[46vh] lg:max-h-[calc(75vh-1.5rem)]"
      >
        <div className="p-4">
          {/* Controls */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setMode('rings')}
                aria-pressed={mode === 'rings'}
                className={`px-3 py-1.5 font-medium ${mode === 'rings' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                1-3-5 rings
              </button>
              <button
                type="button"
                onClick={() => setMode('custom')}
                aria-pressed={mode === 'custom'}
                className={`px-3 py-1.5 font-medium ${mode === 'custom' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                Custom
              </button>
            </div>
            <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setUnit('miles')}
                aria-pressed={unit === 'miles'}
                className={`px-3 py-1.5 font-medium ${unit === 'miles' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                mi
              </button>
              <button
                type="button"
                onClick={() => setUnit('kilometers')}
                aria-pressed={unit === 'kilometers'}
                className={`px-3 py-1.5 font-medium ${unit === 'kilometers' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                km
              </button>
            </div>
          </div>

          {mode === 'custom' && (
            <div className="mb-3 flex items-center gap-2">
              <label className="text-sm text-slate-600">Radius</label>
              <input
                type="number"
                min={0.1}
                step={0.5}
                value={customRadius}
                onChange={(e) => setCustomRadius(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
              />
              <span className="text-sm text-slate-500">{u}</span>
            </div>
          )}

          {/* Loading / empty / error states */}
          {dbLoading && <p className="text-sm text-slate-500">Loading population data…</p>}
          {dbError && <p className="text-sm text-red-600">{dbError}</p>}
          {!dbLoading && !dbError && !center && (
            <p className="text-sm text-slate-500">
              Search an address or ZIP, tap the map, or use your location to estimate the population within a radius.
            </p>
          )}

          {/* Rings result */}
          {hasResult && mode === 'rings' && rings.length > 0 && (
            <>
              <table data-testid="ring-table" className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="py-1.5 font-medium">Ring</th>
                    <th className="py-1.5 font-medium text-right">Population</th>
                    <th className="py-1.5 font-medium text-right">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {rings.map((r) => (
                    <tr key={r.radius} data-testid={`ring-row-${r.radius}`} className="border-b border-slate-100 last:border-0">
                      <td className="py-2 font-medium text-slate-800">{r.radius} {u}</td>
                      <td className="py-2 text-right tabular-nums text-slate-600">{formatPop(r.bandPopulation)}</td>
                      <td className="py-2 text-right tabular-nums font-semibold text-primary-900" data-raw={r.cumulativePopulation}>
                        {formatPop(r.cumulativePopulation)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                data-testid="export-csv"
                onClick={exportCsv}
                className="mt-3 w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Export CSV
              </button>
            </>
          )}

          {/* Custom radius result */}
          {hasResult && mode === 'custom' && single && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 tracking-wide">
                ESTIMATED POPULATION WITHIN {customRadius} {u}
              </div>
              <div data-testid="single-population" data-raw={single.population} className="text-3xl font-extrabold text-primary-900 tabular-nums">
                {formatPop(single.population)}
              </div>
              <div className="text-sm text-slate-500 mt-1">across {single.zipCount.toLocaleString()} ZIP areas</div>
            </div>
          )}

          {/* Methodology — always visible, honest about coverage + estimate nature */}
          <p className="mt-3 text-[11px] leading-snug text-slate-400">
            Estimate based on 2020 Census ZIP-area (ZCTA) populations; small radii in dense areas are approximate.
            Covers all 50 states, DC, and Puerto Rico; US island territories (USVI, Guam, American Samoa) have no
            2020 ZCTA data and read zero.
          </p>
        </div>
      </div>
    </div>
  );
}
