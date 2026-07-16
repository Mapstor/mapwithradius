'use client';

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { searchLocations, GeocodingResult } from '@/lib/geocoding';
import { DistanceUnit, toMeters, fromMeters } from '@/lib/haversine';
import type { RadiusCircle } from './RadiusMap';

// Mobile-only (< lg / 1024px) 3-detent bottom sheet. Ports the approved prototype's
// interaction logic: detents with a 10px commit threshold, fling-to-detent, tap-to-edit
// radius pill, mi/km segmented control that CONVERTS (preserves physical size), log-scale
// slider, integer snap, a full-screen search mode with visualViewport keyboard handling,
// and a reserved in-sheet ad slot. Desktop keeps the sidebar (MapControls) untouched.

interface MobileBottomSheetProps {
  circles: RadiusCircle[];
  selectedCircleId: string | null;
  radius: number;
  unit: DistanceUnit;
  color: string;
  isLocating: boolean;
  onRadiusChange: (radius: number) => void;
  onUnitChange: (unit: DistanceUnit) => void;
  onColorChange: (color: string) => void;
  onLocationSearch: (lat: number, lng: number, displayName: string) => void;
  onUseMyLocation: () => void;
  onNewCircle: () => void;
  onSelectCircle: (id: string) => void;
  onDeleteCircle: (id: string) => void;
  onClearAll: () => void;
  onCopyLink: () => void;
  onDownloadPNG: () => void;
  onExportKML: () => void;
  onToast: (message: string) => void;
  onSearchOpenChange: (open: boolean) => void;
  /** Set isDragging on the wrapper while the slider is held, so the map doesn't re-fit each step. */
  onAdjustStart: () => void;
  onAdjustEnd: () => void;
  /** Incrementing counter from the wrapper's map-tap handler → collapse the sheet to peek. */
  collapseSignal: number;
}

const COLORS = ['#3B82F6', '#EF4444', '#22C55E', '#F59E0B', '#8B5CF6', '#0F172A'];
const PRESETS = [1, 2, 5, 10, 25, 50];
// Log-scale slider bounds per unit (0.25 mi ≈ 0.4 km, 250 mi ≈ 400 km)
const BOUNDS = {
  miles: { min: 0.25, max: 250 },
  kilometers: { min: 0.4, max: 400 },
};
const FLING_VELOCITY = 0.55; // px/ms — above this, advance a detent
const COMMIT_THRESHOLD = 10; // px of movement before a touch counts as a sheet drag

const vibrate = (ms: number) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* no-op */
  }
};

// 1 decimal below 100, thousands-separated integer at/above 100.
const fmt = (v: number) => (v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1));

export default function MobileBottomSheet({
  circles,
  selectedCircleId,
  radius,
  unit,
  color,
  isLocating,
  onRadiusChange,
  onUnitChange,
  onColorChange,
  onLocationSearch,
  onUseMyLocation,
  onNewCircle,
  onSelectCircle,
  onDeleteCircle,
  onClearAll,
  onCopyLink,
  onDownloadPNG,
  onExportKML,
  onToast,
  onSearchOpenChange,
  onAdjustStart,
  onAdjustEnd,
  collapseSignal,
}: MobileBottomSheetProps) {
  // Render only below the desktop breakpoint (1024px). ssr:false parent → window is safe here.
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Working unit for the mobile UI is always mi or km; a meters/feet value coming from a
  // shared URL is displayed as its mi/km equivalent (physically identical) and normalized
  // on the first interaction.
  const workingUnit: 'miles' | 'kilometers' = unit === 'kilometers' ? 'kilometers' : 'miles';
  const unitShort = workingUnit === 'kilometers' ? 'km' : 'mi';
  const bounds = BOUNDS[workingUnit];
  const radiusWu = fromMeters(toMeters(radius, unit), workingUnit);
  const hasCircle = circles.length > 0;

  const [detent, setDetent] = useState<'peek' | 'mid' | 'full'>('peek');
  const [searchOpen, setSearchOpen] = useState(false);
  const [editingRadius, setEditingRadius] = useState(false);
  const [radiusDraft, setRadiusDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const radiusInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Detent geometry + imperative positioning (compositor-friendly, no re-render on drag) ----
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

  // Position on mount + keep positioned on viewport resize (URL bar, rotation).
  // useLayoutEffect so the collapse to peek happens before paint (no full-height flash).
  useLayoutEffect(() => {
    if (!isMobile) return;
    applySheet(detents().peek, false);
    // next frame → animate into place
    const raf = requestAnimationFrame(() => goToDetent('peek'));
    const onResize = () => {
      if (searchOpenRef.current) return; // handled by the visualViewport effect
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

  // Map-first: whenever the map is tapped (wrapper increments collapseSignal), drop to peek.
  useEffect(() => {
    if (collapseSignal > 0) goToDetent('peek');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseSignal]);

  // ---- Sheet drag (pointer events, 10px commit threshold, fling-to-detent) ----
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
        if (Math.abs(dy) < COMMIT_THRESHOLD) return; // still a tap — let control clicks through
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
    if (!drag || !drag.committed) return; // plain tap → let click handlers run
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
      // Don't start a drag from the radius input while editing (let the caret move).
      if (editingRadius && radiusInputRef.current?.contains(e.target as Node)) return;
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
    [editingRadius, onSheetPointerMove, onSheetPointerUp]
  );

  // Swallow the synthetic click that follows a committed drag.
  const onSheetClickCapture = useCallback((e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  // ---- Search mode + keyboard-aware positioning ----
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
    goToDetent(hasCircle ? 'mid' : 'peek');
  }, [goToDetent, hasCircle, onSearchOpenChange]);

  // While searching, lift the fixed sheet above the on-screen keyboard so the input stays visible.
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

  // ---- Radius pill tap-to-edit ----
  const beginEditRadius = useCallback(() => {
    if (!hasCircle) return;
    setRadiusDraft(fmt(radiusWu));
    setEditingRadius(true);
    setTimeout(() => {
      radiusInputRef.current?.focus();
      radiusInputRef.current?.select();
    }, 0);
  }, [hasCircle, radiusWu]);

  const commitEditRadius = useCallback(() => {
    const v = parseFloat(radiusDraft.replace(',', '.'));
    if (!isNaN(v) && v > 0) {
      const clamped = Math.min(bounds.max, Math.max(0.1, v));
      onRadiusChange(clamped);
      onUnitChange(workingUnit);
    }
    setEditingRadius(false);
  }, [radiusDraft, bounds.max, onRadiusChange, onUnitChange, workingUnit]);

  // ---- Unit toggle (converts to preserve physical size) ----
  const toggleUnit = useCallback(
    (target: 'miles' | 'kilometers') => {
      if (target === workingUnit) return;
      const meters = toMeters(radius, unit);
      onRadiusChange(Math.round(fromMeters(meters, target) * 10) / 10);
      onUnitChange(target);
      vibrate(6);
    },
    [workingUnit, radius, unit, onRadiusChange, onUnitChange]
  );

  // ---- Slider (log scale in the working unit) ----
  const sliderToRadius = (v: number) => bounds.min * Math.pow(bounds.max / bounds.min, v / 1000);
  const radiusToSlider = (r: number) =>
    (1000 * Math.log(Math.min(bounds.max, Math.max(bounds.min, r)) / bounds.min)) / Math.log(bounds.max / bounds.min);
  const onSlider = useCallback(
    (v: number) => {
      let r = sliderToRadius(v);
      r = r >= 20 ? Math.round(r) : Math.round(r * 2) / 2;
      onRadiusChange(Math.min(bounds.max, Math.max(0.1, r)));
      onUnitChange(workingUnit);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bounds.min, bounds.max, onRadiusChange, onUnitChange, workingUnit]
  );

  const applyPreset = useCallback(
    (p: number) => {
      onRadiusChange(p);
      onUnitChange(workingUnit);
      vibrate(8);
    },
    [onRadiusChange, onUnitChange, workingUnit]
  );

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  if (!isMobile) return null;

  const area = Math.PI * radiusWu * radiusWu;
  const diameter = 2 * radiusWu;
  const sliderFill = radiusToSlider(radiusWu) / 10; // → percentage

  return (
    <>
      {/* Bottom sheet — full-width backdrop, content capped at 560px and centered */}
      <div
        ref={sheetRef}
        data-testid="mwr-sheet"
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

          {/* Peek row — always visible: radius pill, mi/km, search */}
          {!searchOpen && (
            <div
              data-testid="mwr-peek"
              className="flex-none flex items-center gap-2.5 px-4 pb-3.5"
              style={{ touchAction: 'none' }}
              onPointerDown={startSheetDrag}
            >
              {/* Radius pill */}
              {hasCircle ? (
                editingRadius ? (
                  <div className="flex-1 min-w-0 flex items-center gap-1.5 bg-slate-100 border-[1.5px] border-accent rounded-2xl px-4 min-h-[52px]">
                    <input
                      ref={radiusInputRef}
                      data-testid="mwr-radius-input"
                      type="text"
                      inputMode="decimal"
                      value={radiusDraft}
                      onChange={(e) => setRadiusDraft(e.target.value)}
                      onBlur={commitEditRadius}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') radiusInputRef.current?.blur();
                      }}
                      className="w-full text-[24px] font-extrabold text-primary-900 bg-transparent outline-none tabular-nums"
                      aria-label="Radius value"
                    />
                    <span className="text-sm font-semibold text-slate-500">{unitShort}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    data-testid="mwr-radius-pill"
                    onClick={beginEditRadius}
                    className="flex-1 min-w-0 flex items-center gap-1.5 bg-slate-100 border-[1.5px] border-slate-200 active:border-accent rounded-2xl px-4 min-h-[52px] text-left"
                  >
                    <span data-testid="mwr-radius-value" className="text-[24px] font-extrabold tracking-tight text-primary-900 tabular-nums leading-none">
                      {fmt(radiusWu)}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">{unitShort}</span>
                    <svg className="ml-auto flex-none text-slate-400" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 5l4 4L8 20H4v-4L15 5Z" />
                    </svg>
                  </button>
                )
              ) : (
                <div className="flex-1 min-w-0 flex items-center gap-2.5 bg-slate-100 border-[1.5px] border-slate-200 rounded-2xl px-4 min-h-[52px]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="flex-none">
                    <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
                    <circle cx="12" cy="12" r="1.6" fill="#94A3B8" stroke="none" />
                  </svg>
                  <span className="text-[15px] font-semibold text-slate-500 truncate">Tap the map to draw a radius</span>
                </div>
              )}

              {/* mi/km segmented */}
              <div className="flex-none flex bg-slate-100 rounded-[14px] p-[3px]">
                {(['miles', 'kilometers'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    data-testid={`mwr-unit-${u === 'miles' ? 'mi' : 'km'}`}
                    onClick={() => toggleUnit(u)}
                    className={`px-3.5 min-h-[46px] rounded-[11px] text-sm font-bold transition-colors ${
                      workingUnit === u ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500'
                    }`}
                    aria-pressed={workingUnit === u}
                  >
                    {u === 'miles' ? 'mi' : 'km'}
                  </button>
                ))}
              </div>

              {/* Search */}
              <button
                type="button"
                data-testid="mwr-search-btn"
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
              {hasCircle && (
                <>
                  {/* Slider + presets */}
                  <div className="mt-2">
                    <div className="flex items-center gap-3">
                      <span className="flex-none text-xs font-semibold text-slate-400 tabular-nums">{bounds.min}</span>
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        value={Math.round(radiusToSlider(radiusWu))}
                        onChange={(e) => onSlider(Number(e.target.value))}
                        onPointerDown={onAdjustStart}
                        onPointerUp={onAdjustEnd}
                        onPointerCancel={onAdjustEnd}
                        className="mwr-slider flex-1"
                        style={{ ['--fill' as string]: `${sliderFill}%` }}
                        aria-label="Radius"
                      />
                      <span className="flex-none text-xs font-semibold text-slate-400 tabular-nums">{bounds.max}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2.5">
                      {PRESETS.map((p) => {
                        const on = Math.abs(radiusWu - p) < 0.05;
                        return (
                          <button
                            key={p}
                            type="button"
                            data-testid="mwr-preset"
                            data-value={p}
                            onClick={() => applyPreset(p)}
                            className={`px-4 min-h-[44px] rounded-[14px] text-[14.5px] font-bold border-[1.5px] transition-colors ${
                              on ? 'bg-accent-100 border-accent text-accent-600' : 'bg-slate-100 border-slate-200 text-slate-800 active:scale-[0.96]'
                            }`}
                          >
                            {p} {unitShort}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-2.5 mt-4">
                    <div className="flex-1 bg-slate-100 rounded-2xl px-3.5 py-3">
                      <div className="text-[11.5px] font-bold text-slate-400 tracking-wide">AREA</div>
                      <div data-testid="mwr-stat-area" className="text-[17px] font-extrabold text-primary-900 mt-0.5 tabular-nums">
                        {fmt(area)} <span className="text-xs font-semibold text-slate-500">{unitShort}²</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-2xl px-3.5 py-3">
                      <div className="text-[11.5px] font-bold text-slate-400 tracking-wide">DIAMETER</div>
                      <div data-testid="mwr-stat-diameter" className="text-[17px] font-extrabold text-primary-900 mt-0.5 tabular-nums">
                        {fmt(diameter)} <span className="text-xs font-semibold text-slate-500">{unitShort}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Circles */}
              <div className="mt-[18px]">
                <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">CIRCLES</div>
                <div className="flex flex-col gap-2">
                  {circles.length ? (
                    circles.map((c, i) => {
                      const rowRadius = fromMeters(c.radiusMeters, workingUnit);
                      const active = c.id === selectedCircleId;
                      return (
                        <div
                          key={c.id}
                          data-testid="mwr-circle-row"
                          data-index={i}
                          data-active={active ? 'true' : 'false'}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-[14px] border-[1.5px] min-h-[52px] ${
                            active ? 'border-accent bg-accent-50' : 'border-slate-200'
                          }`}
                        >
                          <button type="button" onClick={() => onSelectCircle(c.id)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                            <span
                              className="w-[18px] h-[18px] rounded-full flex-none border-2 border-white"
                              style={{ background: c.color, boxShadow: '0 0 0 1.5px rgba(15,23,42,0.12)' }}
                            />
                            <span className="min-w-0">
                              <span className="block text-[15px] font-bold text-primary-900">Circle {i + 1}</span>
                              <span className="block text-[12.5px] text-slate-500 font-medium tabular-nums">
                                {fmt(rowRadius)} {unitShort} radius
                              </span>
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteCircle(c.id);
                              vibrate(8);
                              onToast('Circle removed');
                            }}
                            className="ml-auto w-11 h-11 grid place-items-center rounded-[10px] text-slate-400 active:bg-red-100 active:text-red-600"
                            aria-label={`Delete circle ${i + 1}`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
                            </svg>
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-slate-500 px-0.5 py-1.5">No circles yet — tap the map or search for a place.</div>
                  )}
                </div>
                <div className="flex gap-2.5 mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onColorChange(COLORS[circles.length % COLORS.length]);
                      onNewCircle();
                      onToast('Tap the map to place the new circle');
                    }}
                    className="flex-1 min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-accent text-white flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    ＋ New circle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!circles.length) return;
                      onClearAll();
                      vibrate(10);
                      onToast('All circles cleared');
                    }}
                    disabled={!circles.length}
                    className="flex-1 min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-slate-100 text-slate-800 active:scale-[0.98] disabled:opacity-50"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              {hasCircle && (
                <>
                  {/* Colors */}
                  <div className="mt-[18px]">
                    <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">CIRCLE COLOR</div>
                    <div className="flex gap-3">
                      {COLORS.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => {
                            onColorChange(col);
                            vibrate(6);
                          }}
                          className="w-11 h-11 rounded-full border-[3px] border-white"
                          style={{ background: col, boxShadow: color === col ? '0 0 0 3px #2563EB' : '0 0 0 1.5px #E2E8F0' }}
                          aria-label={`Color ${col}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Share & export */}
                  <div className="mt-[18px]">
                    <div className="text-[11.5px] font-extrabold tracking-[0.09em] text-slate-400 mb-2.5">SHARE &amp; EXPORT</div>
                    <button
                      type="button"
                      onClick={() => {
                        onCopyLink();
                        onToast('Link copied — restores center & radius');
                      }}
                      className="w-full min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-slate-100 text-slate-800 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      🔗 Copy link
                    </button>
                    <div className="flex gap-2.5 mt-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          onDownloadPNG();
                          onToast('Exporting PNG…');
                        }}
                        className="flex-1 min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-slate-100 text-slate-800 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        🖼 PNG
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onExportKML();
                          onToast('KML saved');
                        }}
                        className="flex-1 min-h-[52px] rounded-2xl text-[15.5px] font-bold bg-slate-100 text-slate-800 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        📍 KML
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Reserved ad slot — fixed 110px, hard-reserved so it can never shift layout */}
              <div
                id="mwr-sheet-ad"
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
                  data-testid="mwr-search-input"
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
    </>
  );
}
