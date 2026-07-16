'use client';

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { searchLocations, GeocodingResult } from '@/lib/geocoding';
import {
  AreaUnit,
  OverlayShape,
  UNIT_SHORT,
  areaToSqM,
  sqMToArea,
  fmtNum,
} from '@/lib/area';

// Mobile-only (< lg / 1024px) 3-detent bottom sheet for the Acre Calculator. Reuses the
// approved radius-tool sheet mechanics (detents with a 10px commit threshold, fling-to-detent,
// tap-to-edit value pill, full-screen search with visualViewport keyboard handling, the mwr-*
// CSS classes) — adapted for an AREA value + 4-unit toggle + shape toggle instead of a radius.

interface AcreBottomSheetProps {
  hasOverlay: boolean;
  /** Area value in the current unit. */
  area: number;
  unit: AreaUnit;
  shape: OverlayShape;
  onAreaChange: (value: number) => void;
  onUnitChange: (unit: AreaUnit) => void;
  onShapeChange: (shape: OverlayShape) => void;
  /** Preset value, always expressed in acres. */
  onPreset: (acres: number) => void;
  onLocationSearch: (lat: number, lng: number, displayName: string) => void;
  onUseMyLocation: () => void;
  onCopyLink: () => void;
  onToast: (message: string) => void;
  onSearchOpenChange: (open: boolean) => void;
  isLocating: boolean;
  collapseSignal: number;
}

const UNITS: AreaUnit[] = ['acres', 'hectares', 'sqft', 'sqm'];
const PRESETS = [0.25, 0.5, 1, 2, 5, 10, 40, 100, 640];
const FLING_VELOCITY = 0.55;
const COMMIT_THRESHOLD = 10;

const vibrate = (ms: number) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* no-op */
  }
};

export default function AcreBottomSheet({
  hasOverlay,
  area,
  unit,
  shape,
  onAreaChange,
  onUnitChange,
  onShapeChange,
  onPreset,
  onLocationSearch,
  onUseMyLocation,
  onCopyLink,
  onToast,
  onSearchOpenChange,
  isLocating,
  collapseSignal,
}: AcreBottomSheetProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const acresNow = sqMToArea(areaToSqM(area, unit), 'acres');

  const [detent, setDetent] = useState<'peek' | 'mid' | 'full'>('peek');
  const [searchOpen, setSearchOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Detent geometry + imperative positioning ----
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
  const dragRef = useRef<{
    startY: number;
    startPx: number;
    committed: boolean;
    lastY: number;
    lastT: number;
    vy: number;
  } | null>(null);
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
      if (editing && inputRef.current?.contains(e.target as Node)) return;
      dragRef.current = {
        startY: e.clientY,
        startPx: sheetYRef.current,
        committed: false,
        lastY: e.clientY,
        lastT: performance.now(),
        vy: 0,
      };
      window.addEventListener('pointermove', onSheetPointerMove);
      window.addEventListener('pointerup', onSheetPointerUp);
      window.addEventListener('pointercancel', onSheetPointerUp);
    },
    [editing, onSheetPointerMove, onSheetPointerUp]
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
    goToDetent(hasOverlay ? 'mid' : 'peek');
  }, [goToDetent, hasOverlay, onSearchOpenChange]);

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
      onLocationSearch(r.lat, r.lng, r.displayName);
      closeSearch();
    },
    [closeSearch, onLocationSearch]
  );

  // ---- Value pill tap-to-edit ----
  const beginEdit = useCallback(() => {
    if (!hasOverlay) return;
    setDraft(fmtNum(area).replace(/,/g, ''));
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }, [hasOverlay, area]);

  const commitEdit = useCallback(() => {
    const v = parseFloat(draft.replace(',', '.'));
    if (!isNaN(v) && v > 0) onAreaChange(v);
    setEditing(false);
  }, [draft, onAreaChange]);

  const changeUnit = useCallback(
    (target: AreaUnit) => {
      if (target === unit) return;
      onUnitChange(target);
      vibrate(6);
    },
    [unit, onUnitChange]
  );

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div
      ref={sheetRef}
      data-testid="acre-sheet"
      data-detent={detent}
      data-search-open={searchOpen ? 'true' : 'false'}
      className={`mwr-sheet fixed left-0 right-0 z-[999] flex flex-col bg-white rounded-t-[22px] ${
        searchOpen ? 'mwr-sheet-searching' : ''
      }`}
      onClickCapture={onSheetClickCapture}
      style={{
        bottom: 'calc(var(--mwr-anchor-h, 0px) + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -8px 32px rgba(15,23,42,0.16)',
      }}
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

        {/* Peek row — value pill, unit segmented, search */}
        {!searchOpen && (
          <div
            data-testid="acre-peek"
            className="flex-none flex items-center gap-2 px-4 pb-3.5"
            style={{ touchAction: 'none' }}
            onPointerDown={startSheetDrag}
          >
            {hasOverlay ? (
              editing ? (
                <div className="flex-1 min-w-0 flex items-center gap-1.5 bg-slate-100 border-[1.5px] border-accent rounded-2xl px-4 min-h-[52px]">
                  <input
                    ref={inputRef}
                    data-testid="acre-input"
                    type="text"
                    inputMode="decimal"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') inputRef.current?.blur();
                    }}
                    className="w-full text-[24px] font-extrabold text-primary-900 bg-transparent outline-none tabular-nums"
                    aria-label="Area value"
                  />
                  <span className="text-sm font-semibold text-slate-500">{UNIT_SHORT[unit]}</span>
                </div>
              ) : (
                <button
                  type="button"
                  data-testid="acre-pill"
                  onClick={beginEdit}
                  className="flex-1 min-w-0 flex items-center gap-1.5 bg-slate-100 border-[1.5px] border-slate-200 active:border-accent rounded-2xl px-4 min-h-[52px] text-left"
                >
                  <span data-testid="acre-value" className="text-[24px] font-extrabold tracking-tight text-primary-900 tabular-nums leading-none">
                    {fmtNum(area)}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{UNIT_SHORT[unit]}</span>
                  <svg className="ml-auto flex-none text-slate-400" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 5l4 4L8 20H4v-4L15 5Z" />
                  </svg>
                </button>
              )
            ) : (
              <div className="flex-1 min-w-0 flex items-center gap-2.5 bg-slate-100 border-[1.5px] border-slate-200 rounded-2xl px-4 min-h-[52px]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="flex-none">
                  <rect x="4" y="4" width="16" height="16" rx="1.5" strokeDasharray="3 3" />
                </svg>
                <span className="text-[15px] font-semibold text-slate-500 truncate">Tap the map to place an acre</span>
              </div>
            )}

            {/* Unit segmented (4) */}
            <div className="flex-none flex bg-slate-100 rounded-[13px] p-[3px]">
              {UNITS.map((u) => (
                <button
                  key={u}
                  type="button"
                  data-testid={`acre-unit-${u}`}
                  onClick={() => changeUnit(u)}
                  className={`px-2 min-h-[46px] rounded-[10px] text-[12.5px] font-bold transition-colors ${
                    unit === u ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500'
                  }`}
                  aria-pressed={unit === u}
                >
                  {UNIT_SHORT[u]}
                </button>
              ))}
            </div>

            {/* Search */}
            <button
              type="button"
              data-testid="acre-search-btn"
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

        {/* Scrollable body */}
        {!searchOpen && (
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Shape toggle */}
            <div className="mt-1">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2">SHAPE</div>
              <div className="flex bg-slate-100 rounded-[14px] p-[3px]">
                {(['square', 'circle'] as OverlayShape[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-testid={`acre-shape-${s}`}
                    onClick={() => {
                      onShapeChange(s);
                      vibrate(6);
                    }}
                    className={`flex-1 min-h-[46px] rounded-[11px] text-sm font-bold capitalize transition-colors ${
                      shape === s ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500'
                    }`}
                    aria-pressed={shape === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets (acres) */}
            <div className="mt-4">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2">PRESET SIZE (ACRES)</div>
              <div className="flex gap-2 flex-wrap">
                {PRESETS.map((p) => {
                  const on = Math.abs(acresNow - p) < 0.001 + p * 0.005;
                  return (
                    <button
                      key={p}
                      type="button"
                      data-testid="acre-preset"
                      data-value={p}
                      onClick={() => {
                        onPreset(p);
                        vibrate(8);
                      }}
                      className={`px-4 min-h-[44px] rounded-[14px] text-[14.5px] font-bold border-[1.5px] transition-colors ${
                        on ? 'bg-accent-100 border-accent text-accent-600' : 'bg-slate-100 border-slate-200 text-slate-800 active:scale-[0.96]'
                      }`}
                    >
                      {fmtNum(p)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Share */}
            <div className="mt-[18px]">
              <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">SHARE</div>
              <button
                type="button"
                disabled={!hasOverlay}
                onClick={() => {
                  onCopyLink();
                  onToast('Link copied — restores location, size & shape');
                }}
                className="w-full min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-slate-100 text-slate-800 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                🔗 Copy link
              </button>
            </div>

            {/* Reserved ad slot — fixed 110px so it can never shift layout */}
            <div
              id="acre-sheet-ad"
              className="mt-[22px] rounded-[14px] bg-slate-100 border-[1.5px] border-dashed border-slate-300 grid place-items-center text-center text-slate-400 text-[12.5px] font-semibold leading-relaxed"
              style={{ minHeight: 110 }}
            >
              Advertisement
            </div>
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
                data-testid="acre-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => runSearch(e.target.value)}
                placeholder="Address, city, or zip code"
                autoComplete="off"
                className="flex-1 min-w-0 bg-transparent outline-none text-[17px] font-medium"
              />
              <button type="button" onClick={closeSearch} className="flex-none text-accent-600 font-bold text-[15px]">
                Cancel
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mt-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              <button
                type="button"
                onClick={() => {
                  onUseMyLocation();
                  closeSearch();
                }}
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
