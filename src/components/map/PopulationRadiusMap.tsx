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
const CUSTOM_PRESETS: Record<Unit, number[]> = {
  miles: [1, 3, 5, 10, 25],
  kilometers: [1, 5, 10, 25, 50],
};

interface Center {
  lat: number;
  lng: number;
}

function metersToUnit(m: number, unit: Unit): number {
  return unit === 'kilometers' ? m / 1000 : m / 1609.344;
}

/** Round a radius the way the homepage does: integers at ≥10, one decimal below. */
function tidyRadius(v: number): number {
  return v >= 10 ? Math.round(v) : Math.max(0.1, Math.round(v * 10) / 10);
}

function fmtRadius(unitVal: number, unit: Unit): string {
  return `${tidyRadius(unitVal)} ${unitShort(unit)}`;
}

// Locale-tolerant: accept both "5.5" and "5,5".
function parseDecimal(raw: string): number | null {
  const n = parseFloat(raw.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function parseRadiusParam(raw: string): { radius: number; unit: Unit } | null {
  const m = raw.trim().match(/^([\d.,]+)\s*(mi|km|mile|miles|kilometer|kilometers|kilometre|kilometres)?$/i);
  if (!m) return null;
  const radius = parseDecimal(m[1]);
  if (radius === null || radius <= 0) return null;
  const unit: Unit = m[2] && /^k/i.test(m[2]) ? 'kilometers' : 'miles';
  return { radius, unit };
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// True when `bounds` already sits inside the current view with ≥10% margin — so we can
// skip a fit and avoid a jarring micro-zoom on a small radius tweak.
function comfortablyInView(map: L.Map, bounds: L.LatLngBounds): boolean {
  return map.getBounds().pad(-0.1).contains(bounds);
}

// Frame the circle. animate=false → instant (new location / reduced-motion); animate=true →
// smooth flyToBounds on a radius commit, skipped when it already fits comfortably.
function fitToShape(map: L.Map, circle: L.Circle, animate: boolean): void {
  const b = circle.getBounds();
  if (animate && comfortablyInView(map, b)) return;
  if (!animate || prefersReducedMotion()) {
    map.fitBounds(b, { padding: [40, 40] });
  } else {
    map.flyToBounds(b, { padding: [40, 40], duration: 0.6 });
  }
}

export default function PopulationRadiusMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleLayersRef = useRef<L.Circle[]>([]);
  const centerMarkerRef = useRef<L.Marker | null>(null);
  const edgeMarkerRef = useRef<L.Marker | null>(null);
  const tooltipRef = useRef<L.Tooltip | null>(null);
  const isDraggingRef = useRef(false);
  const skipFitRef = useRef(false);
  const lastCenterRef = useRef<Center | null>(null);

  const [isMapReady, setIsMapReady] = useState(false);
  const [db, setDb] = useState<ZipDatabase | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const [center, setCenter] = useState<Center | null>(null);
  const [unit, setUnit] = useState<Unit>('miles');
  // P1c: custom single-radius is the default; 1-3-5 rings is one tap away.
  const [mode, setMode] = useState<'rings' | 'custom'>('custom');
  const [customRadius, setCustomRadius] = useState(5);
  const [radiusText, setRadiusText] = useState('5'); // raw input text (comma-tolerant)
  const [searchValue, setSearchValue] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const [rings, setRings] = useState<RingResult[]>([]);
  const [single, setSingle] = useState<{ population: number; zipCount: number } | null>(null);

  const setRadius = useCallback((r: number) => {
    const t = tidyRadius(r);
    setCustomRadius(t);
    setRadiusText(String(t));
  }, []);

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

    tooltipRef.current = L.tooltip({
      direction: 'top',
      offset: L.point(0, -10),
      opacity: 1,
      className: 'pop-drag-tip',
      interactive: false,
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      if (isDraggingRef.current) return; // ignore clicks that end a handle drag
      setSearchValue('');
      setCenter({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapRef.current = map;
    setIsMapReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
      tooltipRef.current = null;
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

  // ---- Parse shareable URL params once (?lat&lng&r&unit&mode) ----
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const wantRings = p.get('mode') === 'rings';
    if (wantRings) setMode('rings'); // else keep the custom default (old links → custom)

    const unitParam = p.get('unit');
    if (unitParam && /^k/i.test(unitParam)) setUnit('kilometers');

    const r = p.get('r');
    if (r) {
      const parsed = parseRadiusParam(r);
      if (parsed) {
        setCustomRadius(parsed.radius);
        setRadiusText(String(parsed.radius));
        setUnit(parsed.unit);
        if (!wantRings) setMode('custom');
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

    circleLayersRef.current.forEach((c) => c.remove());
    circleLayersRef.current = [];
    centerMarkerRef.current?.remove();
    centerMarkerRef.current = null;
    edgeMarkerRef.current?.remove();
    edgeMarkerRef.current = null;

    if (!center || !db) {
      setRings([]);
      setSingle(null);
      publishData(false, {});
      return;
    }

    const radiiUnit = mode === 'rings' ? RING_PRESET : [customRadius];
    const sorted = [...radiiUnit].filter((r) => r > 0).sort((a, b) => a - b);
    if (sorted.length === 0) return;

    // Circles largest→smallest so the inner (darker) sits on top.
    for (let i = sorted.length - 1; i >= 0; i--) {
      const meters = toMiles(sorted[i], unit) * 1609.344;
      const color = mode === 'rings' ? RING_COLORS[i] ?? SINGLE_COLOR : SINGLE_COLOR;
      const circle = L.circle([center.lat, center.lng], {
        radius: meters,
        color,
        weight: 2,
        opacity: 0.85,
        fillColor: color,
        fillOpacity: 0.1,
      }).addTo(map);
      circleLayersRef.current.unshift(circle); // keep [smallest..largest]
    }

    // Draggable centre dot.
    const centerIcon = L.divIcon({
      className: 'pop-center-handle',
      html: '<div class="pop-center-dot"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const centerMarker = L.marker([center.lat, center.lng], {
      icon: centerIcon,
      draggable: true,
      keyboard: false,
      zIndexOffset: 1000,
    }).addTo(map);
    centerMarker.on('dragstart', () => {
      isDraggingRef.current = true;
    });
    centerMarker.on('dragend', () => {
      const p = centerMarker.getLatLng();
      skipFitRef.current = true; // don't re-zoom when the user is repositioning
      setSearchValue('');
      setCenter({ lat: p.lat, lng: p.lng });
      setTimeout(() => (isDraggingRef.current = false), 0);
    });
    centerMarkerRef.current = centerMarker;

    // Custom mode: homepage-parity edge handle to resize (56px hit area, first-touch works).
    if (mode === 'custom') {
      const circle = circleLayersRef.current[0];
      const edgeLatLng = L.latLng(center.lat, circle.getBounds().getEast());
      const edgeIcon = L.divIcon({
        className: 'radius-handle edge',
        html: '<div class="radius-handle-dot"></div>',
        iconSize: [56, 56],
        iconAnchor: [28, 28],
      });
      const edge = L.marker(edgeLatLng, { icon: edgeIcon, draggable: true, keyboard: false, zIndexOffset: 900 }).addTo(map);

      edge.on('dragstart', () => {
        isDraggingRef.current = true;
        map.dragging.disable();
        edge.getElement()?.classList.add('dragging');
        const tip = tooltipRef.current;
        if (tip) tip.setLatLng(edge.getLatLng()).setContent(fmtRadius(customRadius, unit)).openOn(map);
      });
      edge.on('drag', () => {
        const handle = edge.getLatLng();
        const rMeters = map.distance([center.lat, center.lng], handle);
        circle.setRadius(rMeters); // live visual only — population recomputes on release
        const tip = tooltipRef.current;
        if (tip) {
          tip.setLatLng(handle);
          tip.setContent(fmtRadius(metersToUnit(rMeters, unit), unit));
        }
      });
      edge.on('dragend', () => {
        map.dragging.enable();
        edge.getElement()?.classList.remove('dragging');
        const tip = tooltipRef.current;
        if (tip) map.closeTooltip(tip);
        const rMeters = map.distance([center.lat, center.lng], edge.getLatLng());
        setRadius(metersToUnit(rMeters, unit)); // release → recompute + smooth fly-to-fit
        setTimeout(() => (isDraggingRef.current = false), 0);
      });
      edge.on('click', (e: L.LeafletMouseEvent) => L.DomEvent.stopPropagation(e));
      edgeMarkerRef.current = edge;
    }

    // Fit behavior: instant frame on a new location; smooth fly on a radius/unit/mode
    // commit (skipped if already comfortably framed); leave the view alone on a centre drag.
    const outer = circleLayersRef.current[circleLayersRef.current.length - 1];
    const last = lastCenterRef.current;
    const centerChanged = !last || last.lat !== center.lat || last.lng !== center.lng;
    lastCenterRef.current = { lat: center.lat, lng: center.lng };
    if (skipFitRef.current) {
      skipFitRef.current = false; // centre drag: keep the view
    } else if (centerChanged) {
      fitToShape(map, outer, false); // new location → instant frame
    } else {
      fitToShape(map, outer, true); // radius / unit / mode commit → smooth fly-to-fit
    }

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
        /* Edge resize handle — reuse the proven RadiusMap pattern: 56px hit area,
           touch-action:none so the first touch resizes instead of scrolling. */
        .radius-handle { background: transparent !important; border: none !important; touch-action: none;
          display: grid; place-items: center; }
        .radius-handle-dot { width: 20px; height: 20px; border-radius: 50%; box-shadow: 0 2px 8px rgba(15,23,42,0.3); }
        .radius-handle.edge { cursor: ew-resize; }
        .radius-handle.edge .radius-handle-dot { background: #fff; border: 3.5px solid ${SINGLE_COLOR}; }
        @media (pointer: coarse) {
          .radius-handle-dot { transition: transform 0.12s ease; }
          .radius-handle.dragging .radius-handle-dot { transform: scale(1.35); }
        }
        .leaflet-tooltip.pop-drag-tip { background: #0f172a; color: #fff; border: 0;
          box-shadow: 0 4px 14px rgba(15,23,42,0.35); font-size: 14px; font-weight: 700;
          padding: 6px 11px; border-radius: 10px; white-space: nowrap; }
        .leaflet-tooltip-top.pop-drag-tip::before { border-top-color: #0f172a; }
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
          {/* Controls: mode + unit toggles */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setMode('custom')}
                aria-pressed={mode === 'custom'}
                className={`px-3 py-1.5 font-medium ${mode === 'custom' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                Custom
              </button>
              <button
                type="button"
                onClick={() => setMode('rings')}
                aria-pressed={mode === 'rings'}
                className={`px-3 py-1.5 font-medium ${mode === 'rings' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
              >
                1-3-5 rings
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
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-slate-600">Radius</label>
                <input
                  type="text"
                  inputMode="decimal"
                  data-testid="radius-input"
                  value={radiusText}
                  onChange={(e) => setRadiusText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur(); // Enter → commit via onBlur
                  }}
                  onBlur={() => {
                    // Commit on blur/Enter (not per keystroke): recompute + smooth fly.
                    const n = parseDecimal(radiusText);
                    if (n !== null && n > 0) setRadius(n);
                    else setRadiusText(String(customRadius));
                  }}
                  className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                />
                <span className="text-sm text-slate-500">{u}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CUSTOM_PRESETS[unit].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setRadius(p)}
                    aria-pressed={customRadius === p}
                    className={`px-2.5 py-1 rounded-md text-[13px] font-medium border transition-colors ${
                      customRadius === p ? 'bg-accent text-white border-accent' : 'bg-white text-slate-600 border-slate-200 hover:border-accent-200'
                    }`}
                  >
                    {p} {u}
                  </button>
                ))}
              </div>
            </div>
          )}

          {dbLoading && <p className="text-sm text-slate-500">Loading population data…</p>}
          {dbError && <p className="text-sm text-red-600">{dbError}</p>}
          {!dbLoading && !dbError && !center && (
            <p className="text-sm text-slate-500">
              Search an address or ZIP, tap the map, or use your location to estimate the population within a radius.
            </p>
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
