'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import LocationSearchInput from './LocationSearchInput';
import AreaMeasureSheet from './AreaMeasureSheet';
import type { MeasurePolygon, LiveMeasure } from './AreaMeasureMap';
import {
  MeasureUnit,
  MEASURE_UNITS,
  MEASURE_UNIT_SHORT,
  polygonAreaSqM,
  polygonPerimeterM,
  areaValueInUnit,
  formatAreaInUnit,
  formatPerimeter,
} from '@/lib/measure';
import { downloadPolygonKML } from '@/lib/kmlExport';

const AreaMeasureMap = dynamic(() => import('./AreaMeasureMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-120px)] lg:h-[75vh] bg-slate-100 flex items-center justify-center">
      <div className="text-slate-500">Loading map…</div>
    </div>
  ),
});

// Same palette the radius tool uses for multi-shape colouring.
const COLORS = ['#3B82F6', '#EF4444', '#22C55E', '#F59E0B', '#8B5CF6', '#0F172A'];

export default function AreaCalculatorWrapper() {
  const [polygons, setPolygons] = useState<MeasurePolygon[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [unit, setUnit] = useState<MeasureUnit>('acres');
  const [liveMeasure, setLiveMeasure] = useState<LiveMeasure | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Mobile UI state
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [toolInView, setToolInView] = useState(true);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);
  const [collapseSignal, setCollapseSignal] = useState(0);

  const mapRef = useRef<L.Map | null>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastCounter = useRef(0);

  // Canonical mirrors so event handlers never read stale state.
  const polygonsRef = useRef(polygons);
  const activeIdRef = useRef(activeId);
  const idCounter = useRef(0);
  useEffect(() => { polygonsRef.current = polygons; }, [polygons]);
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  const nextId = () => `area-${idCounter.current++}`;
  const markInteracted = useCallback(() => setHasInteracted(true), []);

  const showToast = useCallback((msg: string) => {
    toastCounter.current += 1;
    setToast({ msg, id: toastCounter.current });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    const el = toolRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => setToolInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const commit = (next: MeasurePolygon[]) => {
    polygonsRef.current = next;
    setPolygons(next);
  };

  // ---- Drawing handlers (read/write through refs, single setState each) ----
  const handleMapClick = useCallback((lat: number, lng: number) => {
    markInteracted();
    setCollapseSignal((s) => s + 1);
    const prev = polygonsRef.current;
    const active = prev.find((p) => p.id === activeIdRef.current);
    if (active) {
      commit(prev.map((p) => (p.id === active.id ? { ...p, vertices: [...p.vertices, { lat, lng }] } : p)));
    } else {
      const id = nextId();
      activeIdRef.current = id;
      setActiveId(id);
      commit([...prev, { id, color: COLORS[prev.length % COLORS.length], vertices: [{ lat, lng }] }]);
    }
  }, [markInteracted]);

  const handleMoveVertex = useCallback((polyId: string, index: number, lat: number, lng: number) => {
    setLiveMeasure(null);
    commit(
      polygonsRef.current.map((p) =>
        p.id === polyId ? { ...p, vertices: p.vertices.map((v, i) => (i === index ? { lat, lng } : v)) } : p
      )
    );
  }, []);

  const handleSelectPolygon = useCallback((id: string) => {
    activeIdRef.current = id;
    setActiveId(id);
  }, []);

  const handleLiveMeasure = useCallback((m: LiveMeasure | null) => setLiveMeasure(m), []);

  const handleUndo = useCallback(() => {
    const prev = polygonsRef.current;
    const active = prev.find((p) => p.id === activeIdRef.current);
    if (!active || active.vertices.length === 0) return;
    const trimmed = active.vertices.slice(0, -1);
    setLiveMeasure(null);
    if (trimmed.length === 0) {
      const next = prev.filter((p) => p.id !== active.id);
      const na = next.length ? next[next.length - 1].id : null;
      activeIdRef.current = na;
      setActiveId(na);
      commit(next);
    } else {
      commit(prev.map((p) => (p.id === active.id ? { ...p, vertices: trimmed } : p)));
    }
  }, []);

  const handleNewPolygon = useCallback(() => {
    const prev = polygonsRef.current;
    const active = prev.find((p) => p.id === activeIdRef.current);
    if (active && active.vertices.length === 0) return; // already have an empty one to fill
    markInteracted();
    const id = nextId();
    activeIdRef.current = id;
    setActiveId(id);
    commit([...prev, { id, color: COLORS[prev.length % COLORS.length], vertices: [] }]);
    showToast('Tap the map to start the new area');
  }, [markInteracted, showToast]);

  const handleDeletePolygon = useCallback((id: string) => {
    const prev = polygonsRef.current;
    const next = prev.filter((p) => p.id !== id);
    if (activeIdRef.current === id) {
      const na = next.length ? next[next.length - 1].id : null;
      activeIdRef.current = na;
      setActiveId(na);
    }
    commit(next);
  }, []);

  const handleClearAll = useCallback(() => {
    polygonsRef.current = [];
    activeIdRef.current = null;
    setPolygons([]);
    setActiveId(null);
    setLiveMeasure(null);
  }, []);

  const handleUnitChange = useCallback((u: MeasureUnit) => {
    setUnit(u);
    markInteracted();
  }, [markInteracted]);

  const recenter = useCallback((lat: number, lng: number) => {
    markInteracted();
    mapRef.current?.setView([lat, lng], 16);
  }, [markInteracted]);

  const handleUseMyLocation = useCallback(() => {
    markInteracted();
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        recenter(pos.coords.latitude, pos.coords.longitude);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [markInteracted, recenter]);

  const handleExportKML = useCallback(() => {
    const polys = polygonsRef.current.filter((p) => p.vertices.length >= 3);
    if (polys.length) downloadPolygonKML(polys);
  }, []);

  const handleDownloadPNG = useCallback(async () => {
    if (!mapRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(mapRef.current.getContainer(), { useCORS: true, allowTaint: true, logging: false });
      const link = document.createElement('a');
      link.download = 'area-map.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('PNG export failed:', e);
    }
  }, []);

  const handleSearchSelect = useCallback((r: { lat: number; lng: number }) => {
    setSearchValue('');
    recenter(r.lat, r.lng);
  }, [recenter]);

  const handleSearchOpenChange = useCallback((open: boolean) => setIsMobileSearchOpen(open), []);

  // ---- Derived readout ----
  const activePolygon = polygons.find((p) => p.id === activeId) ?? null;
  const baseArea = activePolygon ? polygonAreaSqM(activePolygon.vertices) : 0;
  const basePerim = activePolygon ? polygonPerimeterM(activePolygon.vertices) : 0;
  const areaSqM = liveMeasure ? liveMeasure.areaSqM : baseArea;
  const perimeterM = liveMeasure ? liveMeasure.perimeterM : basePerim;
  const totalAreaSqM = polygons.reduce((s, p) => s + polygonAreaSqM(p.vertices), 0);
  const activeVertexCount = activePolygon ? activePolygon.vertices.length : 0;

  const showInvite = polygons.length === 0 && !isMobileSearchOpen && toolInView;

  return (
    // #area-tool marks the whole interactive tool as a Raptive ad-exclusion zone.
    <div id="area-tool" ref={toolRef} className="relative">
      {toast && (
        <div
          key={toast.id}
          className="mwr-toast lg:hidden pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-[1100] bg-primary-900 text-white text-[14.5px] font-medium px-[18px] py-[11px] rounded-[14px] shadow-lg max-w-[86vw] text-center"
        >
          {toast.msg}
        </div>
      )}

      <div className="relative">
        {showInvite && (
          <div className="mwr-invite pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[400] text-center">
            <div className="mwr-invite-rings">
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-core" />
            </div>
            <div className="mwr-invite-label">
              <span className="lg:hidden">Tap the map to drop points and measure</span>
              <span className="hidden lg:inline">Click the map to drop points — the area fills in as you go</span>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="w-full">
          <AreaMeasureMap
            polygons={polygons}
            activeId={activeId}
            onMapClick={handleMapClick}
            onMoveVertex={handleMoveVertex}
            onSelectPolygon={handleSelectPolygon}
            onLiveMeasure={handleLiveMeasure}
            mapRef={mapRef}
          />
        </div>

        {/* Desktop controls */}
        <div className="hidden lg:block absolute top-4 right-4 w-80 z-[500]">
          <div className="controls-overlay max-h-[calc(75vh-2rem)]">
            {/* Location */}
            <div>
              <label className="control-section-label">Jump to a place</label>
              <LocationSearchInput
                value={searchValue}
                onValueChange={setSearchValue}
                onSelectLocation={handleSearchSelect}
                placeholder="Search address, city, or zip…"
                inputClassName={`w-full pr-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none border-slate-200 ${hasInteracted ? '' : 'mwr-search-glow'}`}
              />
            </div>

            {/* Readout */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-[11px] font-bold text-slate-400 tracking-wide">AREA</div>
              <div data-testid="area-readout" className="text-3xl font-extrabold text-primary-900 tabular-nums leading-tight">
                {areaValueInUnit(areaSqM, unit)} <span className="text-lg text-slate-500">{MEASURE_UNIT_SHORT[unit]}</span>
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Perimeter: <span className="font-semibold text-slate-800">{formatPerimeter(perimeterM, unit)}</span>
                <span className="text-slate-300 mx-1.5">·</span>
                {activeVertexCount} point{activeVertexCount === 1 ? '' : 's'}
              </div>
              {activeVertexCount > 0 && activeVertexCount < 3 && (
                <div className="text-xs text-amber-600 mt-1">Add {3 - activeVertexCount} more point{3 - activeVertexCount === 1 ? '' : 's'} to close the area.</div>
              )}
            </div>

            {/* Units */}
            <div>
              <label className="control-section-label">Units</label>
              <div className="flex flex-wrap gap-1.5">
                {MEASURE_UNITS.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => handleUnitChange(u)}
                    className={`px-2.5 py-1.5 rounded-md text-[13px] font-semibold border transition-colors ${
                      unit === u ? 'bg-accent text-white border-accent' : 'bg-white text-slate-600 border-slate-200 hover:border-accent-200'
                    }`}
                    aria-pressed={unit === u}
                  >
                    {MEASURE_UNIT_SHORT[u]}
                  </button>
                ))}
              </div>
            </div>

            {/* Draw actions */}
            <div className="flex gap-2">
              <button type="button" onClick={handleUndo} className="btn-secondary flex-1 text-sm">↶ Undo point</button>
              <button type="button" onClick={handleNewPolygon} className="btn-secondary flex-1 text-sm">＋ New area</button>
            </div>

            {/* Areas list */}
            {polygons.length > 0 && (
              <div>
                <label className="control-section-label">Areas ({polygons.length})</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {polygons.map((p, i) => (
                    <div
                      key={p.id}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${p.id === activeId ? 'border-accent bg-accent-50' : 'border-slate-200'}`}
                    >
                      <button type="button" onClick={() => handleSelectPolygon(p.id)} className="flex items-center gap-2 flex-1 min-w-0 text-left">
                        <span className="w-3.5 h-3.5 rounded-full flex-none border-2 border-white" style={{ background: p.color, boxShadow: '0 0 0 1.5px rgba(15,23,42,0.12)' }} />
                        <span className="text-sm font-medium text-slate-800 truncate">
                          Area {i + 1} · {formatAreaInUnit(polygonAreaSqM(p.vertices), unit)}
                        </span>
                      </button>
                      <button type="button" onClick={() => handleDeletePolygon(p.id)} aria-label={`Delete area ${i + 1}`} className="flex-none text-slate-400 hover:text-red-600 p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                {polygons.length > 1 && (
                  <div className="text-xs text-slate-500 mt-1.5">Total: <span className="font-semibold">{formatAreaInUnit(totalAreaSqM, unit)}</span></div>
                )}
              </div>
            )}

            {/* Export */}
            <div className="flex gap-2">
              <button type="button" onClick={handleExportKML} className="btn-secondary flex-1 text-sm">📍 KML</button>
              <button type="button" onClick={handleDownloadPNG} className="btn-secondary flex-1 text-sm">🖼 PNG</button>
              <button type="button" onClick={handleClearAll} className="btn-secondary flex-1 text-sm">Clear</button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        {toolInView && (
          <AreaMeasureSheet
            polygons={polygons}
            activeId={activeId}
            unit={unit}
            areaSqM={areaSqM}
            perimeterM={perimeterM}
            totalAreaSqM={totalAreaSqM}
            activeVertexCount={activeVertexCount}
            onUnitChange={handleUnitChange}
            onUndo={handleUndo}
            onNewArea={handleNewPolygon}
            onSelectPolygon={handleSelectPolygon}
            onDeletePolygon={handleDeletePolygon}
            onClearAll={handleClearAll}
            onExportKML={handleExportKML}
            onDownloadPNG={handleDownloadPNG}
            onLocationSearch={recenter}
            onUseMyLocation={handleUseMyLocation}
            onToast={showToast}
            onSearchOpenChange={handleSearchOpenChange}
            isLocating={isLocating}
            collapseSignal={collapseSignal}
          />
        )}
      </div>
    </div>
  );
}
