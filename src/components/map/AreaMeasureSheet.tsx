'use client';

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { searchLocations, GeocodingResult } from '@/lib/geocoding';
import {
  MeasureUnit,
  MEASURE_UNITS,
  MEASURE_UNIT_SHORT,
  areaValueInUnit,
  formatAreaInUnit,
  formatPerimeter,
  polygonAreaSqM,
} from '@/lib/measure';
import type { MeasurePolygon } from './AreaMeasureMap';

// Mobile-only 3-detent bottom sheet for the Area Calculator. Reuses the radius-tool sheet
// mechanics + mwr-* classes; the peek bar carries a LIVE area/perimeter readout instead of
// an editable value (you draw the area by tapping the map, so there's nothing to type).

interface AreaMeasureSheetProps {
  polygons: MeasurePolygon[];
  activeId: string | null;
  unit: MeasureUnit;
  areaSqM: number;
  perimeterM: number;
  totalAreaSqM: number;
  activeVertexCount: number;
  onUnitChange: (u: MeasureUnit) => void;
  onUndo: () => void;
  onNewArea: () => void;
  onSelectPolygon: (id: string) => void;
  onDeletePolygon: (id: string) => void;
  onClearAll: () => void;
  onExportKML: () => void;
  onDownloadPNG: () => void;
  onLocationSearch: (lat: number, lng: number) => void;
  onUseMyLocation: () => void;
  onToast: (message: string) => void;
  onSearchOpenChange: (open: boolean) => void;
  isLocating: boolean;
  collapseSignal: number;
}

const FLING_VELOCITY = 0.55;
const COMMIT_THRESHOLD = 10;

const vibrate = (ms: number) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* no-op */
  }
};

export default function AreaMeasureSheet({
  polygons,
  activeId,
  unit,
  areaSqM,
  perimeterM,
  totalAreaSqM,
  activeVertexCount,
  onUnitChange,
  onUndo,
  onNewArea,
  onSelectPolygon,
  onDeletePolygon,
  onClearAll,
  onExportKML,
  onDownloadPNG,
  onLocationSearch,
  onUseMyLocation,
  onToast,
  onSearchOpenChange,
  isLocating,
  collapseSignal,
}: AreaMeasureSheetProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const [detent, setDetent] = useState<'peek' | 'mid' | 'full'>('peek');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const detents = useCallback(
    () => ({ peek: 150, mid: Math.min(window.innerHeight * 0.52, 470), full: window.innerHeight - 120 }),
    []
  );
  const sheetYRef = useRef(150);
  const detentRef = useRef<'peek' | 'mid' | 'full'>('peek');
  const searchOpenRef = useRef(false);

  const applySheet = useCallback(
    (px: number, animate = true) => {
      const el = sheetRef.current;
      if (!el) return;
      const d = detents();
      sheetYRef.current = px;
      el.style.height = `${d.full}px`;
      el.classList.toggle('mwr-sheet-dragging', !animate);
      el.style.transform = `translateY(${d.full - px}px)`;
      document.documentElement.style.setProperty('--mwr-chrome-offset', `${Math.round(px) + 8}px`);
    },
    [detents]
  );

  const goToDetent = useCallback(
    (name: 'peek' | 'mid' | 'full') => {
      detentRef.current = name;
      setDetent(name);
      applySheet(detents()[name]);
    },
    [applySheet, detents]
  );

  useLayoutEffect(() => {
    if (!isMobile) return;
    applySheet(detents().peek, false);
    const raf = requestAnimationFrame(() => goToDetent('peek'));
    const onResize = () => {
      if (searchOpenRef.current) return;
      applySheet(detents()[detentRef.current], false);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.documentElement.style.removeProperty('--mwr-chrome-offset');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (collapseSignal > 0) goToDetent('peek');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseSignal]);

  // ---- Sheet drag ----
  const dragRef = useRef<{ startY: number; startPx: number; committed: boolean; lastY: number; lastT: number; vy: number } | null>(null);
  const suppressClickRef = useRef(false);

  const onSheetPointerMove = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dy = e.clientY - drag.startY;
      if (!drag.committed) {
        if (Math.abs(dy) < COMMIT_THRESHOLD) return;
        drag.committed = true;
      }
      const now = performance.now();
      drag.vy = (e.clientY - drag.lastY) / Math.max(1, now - drag.lastT);
      drag.lastY = e.clientY;
      drag.lastT = now;
      const d = detents();
      const next = Math.min(d.full, Math.max(d.peek, drag.startPx - dy));
      applySheet(next, false);
    },
    [applySheet, detents]
  );

  const onSheetPointerUp = useCallback(() => {
    window.removeEventListener('pointermove', onSheetPointerMove);
    window.removeEventListener('pointerup', onSheetPointerUp);
    window.removeEventListener('pointercancel', onSheetPointerUp);
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || !drag.committed) return;
    suppressClickRef.current = true;
    setTimeout(() => (suppressClickRef.current = false), 350);
    const d = detents();
    const order: Array<'peek' | 'mid' | 'full'> = ['peek', 'mid', 'full'];
    const positions = [d.peek, d.mid, d.full];
    let idx = positions.reduce(
      (best, p, i) => (Math.abs(p - sheetYRef.current) < Math.abs(positions[best] - sheetYRef.current) ? i : best),
      0
    );
    if (Math.abs(drag.vy) > FLING_VELOCITY) idx = Math.min(2, Math.max(0, idx + (drag.vy < 0 ? 1 : -1)));
    vibrate(6);
    goToDetent(order[idx]);
  }, [detents, goToDetent, onSheetPointerMove]);

  const startSheetDrag = useCallback(
    (e: React.PointerEvent) => {
      if (searchOpenRef.current) return;
      dragRef.current = { startY: e.clientY, startPx: sheetYRef.current, committed: false, lastY: e.clientY, lastT: performance.now(), vy: 0 };
      window.addEventListener('pointermove', onSheetPointerMove);
      window.addEventListener('pointerup', onSheetPointerUp);
      window.addEventListener('pointercancel', onSheetPointerUp);
    },
    [onSheetPointerMove, onSheetPointerUp]
  );

  const onSheetClickCapture = useCallback((e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  // ---- Search mode ----
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    searchOpenRef.current = true;
    onSearchOpenChange(true);
    goToDetent('full');
    setResults([]);
    setSearchQuery('');
    setTimeout(() => searchInputRef.current?.focus(), 80);
  }, [goToDetent, onSearchOpenChange]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    searchOpenRef.current = false;
    onSearchOpenChange(false);
    searchInputRef.current?.blur();
    const el = sheetRef.current;
    if (el) {
      el.style.bottom = '';
      el.style.height = '';
    }
    goToDetent('peek');
  }, [goToDetent, onSearchOpenChange]);

  useEffect(() => {
    if (!searchOpen || typeof window === 'undefined' || !window.visualViewport) return;
    const vv = window.visualViewport;
    const onVV = () => {
      const el = sheetRef.current;
      if (!el) return;
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      el.style.bottom = `${kb}px`;
      el.style.height = `${vv.height}px`;
      el.style.transform = 'translateY(0)';
    };
    onVV();
    vv.addEventListener('resize', onVV);
    vv.addEventListener('scroll', onVV);
    return () => {
      vv.removeEventListener('resize', onVV);
      vv.removeEventListener('scroll', onVV);
    };
  }, [searchOpen]);

  const runSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    searchTimer.current = setTimeout(async () => {
      const r = await searchLocations(q, 6);
      setResults(r);
      setSearching(false);
    }, 300);
  }, []);

  const pickResult = useCallback(
    (r: GeocodingResult) => {
      onLocationSearch(r.lat, r.lng);
      closeSearch();
    },
    [closeSearch, onLocationSearch]
  );

  const cycleUnit = useCallback(() => {
    const i = MEASURE_UNITS.indexOf(unit);
    onUnitChange(MEASURE_UNITS[(i + 1) % MEASURE_UNITS.length]);
    vibrate(6);
  }, [unit, onUnitChange]);

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  if (!isMobile) return null;

  const closed = activeVertexCount >= 3;

  return (
    <div
      ref={sheetRef}
      data-testid="area-sheet"
      data-detent={detent}
      data-search-open={searchOpen ? 'true' : 'false'}
      className={`mwr-sheet fixed left-0 right-0 z-[999] flex flex-col bg-white rounded-t-[22px] ${searchOpen ? 'mwr-sheet-searching' : ''}`}
      onClickCapture={onSheetClickCapture}
      style={{ bottom: 'calc(var(--mwr-anchor-h, 0px) + env(safe-area-inset-bottom, 0px))', boxShadow: '0 -8px 32px rgba(15,23,42,0.16)' }}
    >
      <div className="w-full max-w-[560px] mx-auto flex flex-col min-h-0 flex-1">
        {/* Grab zone */}
        <div
          className="flex-none pt-2.5 pb-1 cursor-grab touch-none"
          style={{ touchAction: 'none' }}
          onPointerDown={startSheetDrag}
          onClick={() => !suppressClickRef.current && goToDetent(detent === 'peek' ? 'mid' : 'peek')}
          aria-label="Drag to expand controls"
        >
          <div className="w-11 h-[5px] rounded-full bg-slate-300 mx-auto" />
        </div>

        {/* Peek row — LIVE readout, unit cycle, search */}
        {!searchOpen && (
          <div
            data-testid="area-peek"
            className="flex-none flex items-center gap-2 px-4 pb-3.5"
            style={{ touchAction: 'none' }}
            onPointerDown={startSheetDrag}
          >
            <div className="flex-1 min-w-0 flex flex-col justify-center bg-slate-100 border-[1.5px] border-slate-200 rounded-2xl px-4 py-2 min-h-[52px]">
              {closed ? (
                <>
                  <span className="leading-none">
                    <span data-testid="area-sheet-value" className="text-[23px] font-extrabold text-primary-900 tabular-nums">{areaValueInUnit(areaSqM, unit)}</span>
                    <span className="text-sm font-semibold text-slate-500 ml-1">{MEASURE_UNIT_SHORT[unit]}</span>
                  </span>
                  <span className="text-[12px] text-slate-500 font-medium mt-0.5">{formatPerimeter(perimeterM, unit)} perimeter · {activeVertexCount} pts</span>
                </>
              ) : (
                <span className="text-[15px] font-semibold text-slate-500 truncate">
                  {activeVertexCount === 0 ? 'Tap the map to measure an area' : `Add ${3 - activeVertexCount} more point${3 - activeVertexCount === 1 ? '' : 's'}`}
                </span>
              )}
            </div>

            <button
              type="button"
              data-testid="area-unit-cycle"
              onClick={cycleUnit}
              className="flex-none min-w-[52px] h-[52px] px-2 rounded-2xl bg-slate-100 active:bg-slate-200 grid place-items-center text-[13px] font-bold text-accent-600"
              aria-label={`Unit: ${MEASURE_UNIT_SHORT[unit]}, tap to change`}
            >
              {MEASURE_UNIT_SHORT[unit]}
            </button>

            <button
              type="button"
              data-testid="area-search-btn"
              onClick={openSearch}
              className="flex-none w-[52px] h-[52px] rounded-2xl bg-accent-100 active:bg-accent-200 grid place-items-center"
              aria-label="Search location"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.8-3.8" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        {!searchOpen && (
          <div
            // min-h-0 lets this flex child shrink to the sheet height and scroll its own
            // overflow, instead of growing to content height and pushing the last control
            // below the viewport (an unreachable region the old ad box hid).
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4"
            // Bottom padding clears safe-area inset + anchor so the last control stays
            // reachable at full detent (the collapsed ad slot no longer reserves that space).
            style={{ WebkitOverflowScrolling: 'touch', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--mwr-anchor-h, 0px) + 1.5rem)' }}
          >
            {/* Units */}
            <div className="mt-1">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2">UNITS</div>
              <div className="flex flex-wrap gap-2">
                {MEASURE_UNITS.map((u) => (
                  <button
                    key={u}
                    type="button"
                    data-testid={`area-unit-${u}`}
                    onClick={() => onUnitChange(u)}
                    className={`px-3.5 min-h-[44px] rounded-[13px] text-[14px] font-bold border-[1.5px] transition-colors ${
                      unit === u ? 'bg-accent-100 border-accent text-accent-600' : 'bg-slate-100 border-slate-200 text-slate-800 active:scale-[0.96]'
                    }`}
                    aria-pressed={unit === u}
                  >
                    {MEASURE_UNIT_SHORT[u]}
                  </button>
                ))}
              </div>
            </div>

            {/* Draw actions */}
            <div className="flex gap-2.5 mt-4">
              <button
                type="button"
                data-testid="area-undo"
                onClick={() => { onUndo(); vibrate(6); }}
                className="flex-1 min-h-[52px] rounded-2xl text-[15px] font-bold bg-slate-100 text-slate-800 active:scale-[0.98]"
              >
                ↶ Undo
              </button>
              <button
                type="button"
                onClick={() => onNewArea()}
                className="flex-1 min-h-[52px] rounded-2xl text-[15px] font-bold bg-accent text-white active:scale-[0.98]"
              >
                ＋ New area
              </button>
            </div>

            {/* Areas list */}
            <div className="mt-[18px]">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">
                AREAS{polygons.length > 1 ? ` · TOTAL ${formatAreaInUnit(totalAreaSqM, unit)}` : ''}
              </div>
              <div className="flex flex-col gap-2">
                {polygons.length ? (
                  polygons.map((p, i) => {
                    const active = p.id === activeId;
                    return (
                      <div
                        key={p.id}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-[14px] border-[1.5px] min-h-[52px] ${active ? 'border-accent bg-accent-50' : 'border-slate-200'}`}
                      >
                        <button type="button" onClick={() => onSelectPolygon(p.id)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                          <span className="w-[18px] h-[18px] rounded-full flex-none border-2 border-white" style={{ background: p.color, boxShadow: '0 0 0 1.5px rgba(15,23,42,0.12)' }} />
                          <span className="min-w-0">
                            <span className="block text-[15px] font-bold text-primary-900">Area {i + 1}</span>
                            <span className="block text-[12.5px] text-slate-500 font-medium tabular-nums">
                              {p.vertices.length >= 3 ? formatAreaInUnit(polygonAreaSqM(p.vertices), unit) : `${p.vertices.length} point${p.vertices.length === 1 ? '' : 's'}`}
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { onDeletePolygon(p.id); vibrate(8); onToast('Area removed'); }}
                          className="ml-auto w-11 h-11 grid place-items-center rounded-[10px] text-slate-400 active:bg-red-100 active:text-red-600"
                          aria-label={`Delete area ${i + 1}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" /></svg>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-slate-500 px-0.5 py-1.5">No areas yet — tap the map to drop points.</div>
                )}
              </div>
            </div>

            {/* Export */}
            <div className="mt-[18px]">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">EXPORT</div>
              <div className="flex gap-2.5">
                <button type="button" onClick={() => { onExportKML(); onToast('KML saved'); }} className="flex-1 min-h-[52px] rounded-2xl text-[15px] font-bold bg-slate-100 text-slate-800 active:scale-[0.98]">📍 KML</button>
                <button type="button" onClick={() => { onDownloadPNG(); onToast('Exporting PNG…'); }} className="flex-1 min-h-[52px] rounded-2xl text-[15px] font-bold bg-slate-100 text-slate-800 active:scale-[0.98]">🖼 PNG</button>
                <button type="button" onClick={() => { if (polygons.length) { onClearAll(); vibrate(10); onToast('Cleared'); } }} disabled={!polygons.length} className="flex-1 min-h-[52px] rounded-2xl text-[15px] font-bold bg-slate-100 text-slate-800 active:scale-[0.98] disabled:opacity-50">Clear</button>
              </div>
            </div>

            {/* Reserved ad slot for Raptive — collapses entirely when empty (see
                .mwr-ad-slot in globals.css). Last element in the sheet body → CLS-safe. */}
            <div id="area-sheet-ad" className="mwr-ad-slot" />
          </div>
        )}

        {/* Search mode */}
        {searchOpen && (
          <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
            <div className="flex-none flex items-center gap-2.5 bg-slate-100 border-2 border-accent rounded-2xl px-3.5 min-h-[54px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" className="flex-none">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.8-3.8" />
              </svg>
              <input
                ref={searchInputRef}
                data-testid="area-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => runSearch(e.target.value)}
                placeholder="Address, city, or zip code"
                autoComplete="off"
                className="flex-1 min-w-0 bg-transparent outline-none text-[17px] font-medium"
              />
              <button type="button" onClick={closeSearch} className="flex-none text-accent-600 font-bold text-[15px]">Cancel</button>
            </div>
            <div className="flex-1 overflow-y-auto mt-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              <button
                type="button"
                onClick={() => { onUseMyLocation(); closeSearch(); }}
                disabled={isLocating}
                className="w-full flex items-center gap-3 py-3.5 px-1.5 border-b border-slate-200 min-h-[56px] text-accent-600 disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" className="flex-none">
                  <circle cx="12" cy="12" r="7" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
                </svg>
                <span className="text-[16px] font-semibold">{isLocating ? 'Locating…' : 'Use my location'}</span>
              </button>
              {searching && <div className="px-1.5 py-4 text-sm text-slate-500">Searching…</div>}
              {results.map((r, i) => (
                <button
                  key={`${r.lat}-${r.lng}-${i}`}
                  type="button"
                  onClick={() => pickResult(r)}
                  className="w-full text-left flex items-center gap-3 py-3.5 px-1.5 border-b border-slate-200 min-h-[56px] active:bg-slate-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="flex-none mt-0.5">
                    <path d="M12 21s-6-5.3-6-9.6A6 6 0 0 1 18 11.4C18 15.7 12 21 12 21Z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  <span className="text-[15px] text-slate-700 line-clamp-2">{r.displayName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
