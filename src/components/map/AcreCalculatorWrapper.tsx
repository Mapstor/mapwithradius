'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import LocationSearchInput from './LocationSearchInput';
import AcreBottomSheet from './AcreBottomSheet';
import {
  AreaUnit,
  OverlayShape,
  UNITS_ALL,
  UNIT_SHORT,
  UNIT_LABEL,
  areaToSqM,
  sqMToArea,
  fmtNum,
  parseAcreParams,
  generateAcreShareUrl,
} from '@/lib/area';

const AcreOverlayMap = dynamic(() => import('./AcreOverlayMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-120px)] lg:h-[75vh] bg-slate-100 flex items-center justify-center">
      <div className="text-slate-500">Loading map…</div>
    </div>
  ),
});

const PRESETS = [0.25, 0.5, 1, 2, 5, 10, 40, 100, 640];

const roundForUnit = (v: number, u: AreaUnit) =>
  u === 'sqft' || u === 'sqm' ? Math.round(v) : Math.round(v * 1000) / 1000;

export default function AcreCalculatorWrapper() {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [area, setArea] = useState(1);
  const [unit, setUnit] = useState<AreaUnit>('acres');
  const [shape, setShape] = useState<OverlayShape>('square');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasUrlParams, setHasUrlParams] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Mobile UI state (mirrors the radius tool)
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [toolInView, setToolInView] = useState(true);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);
  const [collapseSignal, setCollapseSignal] = useState(0);

  const mapRef = useRef<L.Map | null>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useRef(0);

  const areaSqM = areaToSqM(area, unit);

  const markInteracted = useCallback(() => setHasInteracted(true), []);

  const showToast = useCallback((msg: string) => {
    toastId.current += 1;
    setToast({ msg, id: toastId.current });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // Hide the mobile sheet once the tool scrolls out of view.
  useEffect(() => {
    const el = toolRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => setToolInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ---- Handlers ----
  const handleMapClick = useCallback((lat: number, lng: number) => {
    markInteracted();
    setCollapseSignal((s) => s + 1);
    setCenter({ lat, lng });
  }, [markInteracted]);

  const handleCenterChange = useCallback((lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const handleAreaChange = useCallback((value: number) => {
    if (value > 0) setArea(value);
    markInteracted();
  }, [markInteracted]);

  const handleUnitChange = useCallback(
    (target: AreaUnit) => {
      if (target === unit) return;
      const nv = roundForUnit(sqMToArea(areaToSqM(area, unit), target), target);
      setUnit(target);
      setArea(nv > 0 ? nv : 1);
      markInteracted();
    },
    [area, unit, markInteracted]
  );

  const handleShapeChange = useCallback((s: OverlayShape) => {
    setShape(s);
    markInteracted();
  }, [markInteracted]);

  const handlePreset = useCallback((acres: number) => {
    setUnit('acres');
    setArea(acres);
    markInteracted();
  }, [markInteracted]);

  const handleLocationSearch = useCallback((lat: number, lng: number) => {
    markInteracted();
    setCenter({ lat, lng });
  }, [markInteracted]);

  const handleUseMyLocation = useCallback(() => {
    markInteracted();
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        setIsLocating(false);
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? 'Location access denied. Please search for an address instead.'
            : 'Unable to get your location. Please search for an address.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [markInteracted]);

  const handleCopyLink = useCallback(() => {
    if (!center) return;
    const url = generateAcreShareUrl({ lat: center.lat, lng: center.lng, area, unit, shape }, window.location.href);
    navigator.clipboard?.writeText(url);
  }, [center, area, unit, shape]);

  const handleSearchSelect = useCallback((r: { lat: number; lng: number }) => {
    setSearchValue('');
    handleLocationSearch(r.lat, r.lng);
  }, [handleLocationSearch]);

  const handleSearchOpenChange = useCallback((open: boolean) => setIsMobileSearchOpen(open), []);

  // Parse URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { params, locate } = parseAcreParams(new URLSearchParams(window.location.search));
    if (params) {
      setHasUrlParams(true);
      setCenter({ lat: params.lat, lng: params.lng });
      setArea(params.area);
      setUnit(params.unit);
      setShape(params.shape);
      markInteracted();
    }
    if (locate) handleUseMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasOverlay = center !== null;
  const showInvite = !hasOverlay && !isMobileSearchOpen && toolInView;

  // Equivalents for the desktop readout
  const equivalents = UNITS_ALL.map((u) => `${fmtNum(sqMToArea(areaSqM, u))} ${UNIT_SHORT[u]}`);

  return (
    // #acre-tool marks the whole interactive tool as a Raptive ad-exclusion zone.
    <div id="acre-tool" ref={toolRef} className="relative">
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg max-w-[90vw]">
          {locationError}
        </div>
      )}

      {toast && (
        <div
          key={toast.id}
          className="mwr-toast lg:hidden pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-[1100] bg-primary-900 text-white text-[14.5px] font-medium px-[18px] py-[11px] rounded-[14px] shadow-lg max-w-[86vw] text-center"
        >
          {toast.msg}
        </div>
      )}

      <div className="relative">
        {/* Empty-state invitation */}
        {showInvite && (
          <div className="mwr-invite pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[400] text-center">
            <div className="mwr-invite-rings">
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-core" />
            </div>
            <div className="mwr-invite-label">
              <span className="lg:hidden">Tap anywhere to place an acre</span>
              <span className="hidden lg:inline">Click the map — or search a place — to size an acre</span>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="w-full">
          <AcreOverlayMap
            center={center}
            areaSqM={areaSqM}
            shape={shape}
            onMapClick={handleMapClick}
            onCenterChange={handleCenterChange}
            mapRef={mapRef}
            skipAutoGeolocation={hasUrlParams}
          />
        </div>

        {/* Desktop controls */}
        <div className="hidden lg:block absolute top-4 right-4 w-80 z-[500]">
          <div className="controls-overlay max-h-[calc(75vh-2rem)]">
            {/* Location */}
            <div>
              <label className="control-section-label">Location</label>
              <LocationSearchInput
                value={searchValue}
                onValueChange={setSearchValue}
                onSelectLocation={handleSearchSelect}
                placeholder="Search address, city, or zip…"
                inputClassName={`w-full pr-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none border-slate-200 ${hasInteracted ? '' : 'mwr-search-glow'}`}
              />
              <button type="button" onClick={handleUseMyLocation} disabled={isLocating} className="btn-secondary w-full mt-2 text-sm">
                {isLocating ? 'Locating…' : '📍 Use my location'}
              </button>
            </div>

            {/* Size */}
            <div>
              <label className="control-section-label">Size</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={area}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v)) handleAreaChange(v);
                  }}
                  className="flex-1 min-w-0 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  aria-label="Area value"
                />
              </div>
              <div className="mt-2 flex bg-slate-100 rounded-lg p-[3px]">
                {UNITS_ALL.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => handleUnitChange(u)}
                    className={`flex-1 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
                      unit === u ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    aria-pressed={unit === u}
                  >
                    {UNIT_SHORT[u]}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape */}
            <div>
              <label className="control-section-label">Shape</label>
              <div className="flex bg-slate-100 rounded-lg p-[3px]">
                {(['square', 'circle'] as OverlayShape[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleShapeChange(s)}
                    className={`flex-1 py-1.5 rounded-md text-sm font-semibold capitalize transition-colors ${
                      shape === s ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                    aria-pressed={shape === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="control-section-label">Presets (acres)</label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p} type="button" onClick={() => handlePreset(p)} className="preset-button">
                    {fmtNum(p)}
                  </button>
                ))}
              </div>
            </div>

            {/* Equivalents */}
            <div className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-600">{fmtNum(area)} {UNIT_LABEL[unit]}</span> ={' '}
              {equivalents.filter((_, i) => UNITS_ALL[i] !== unit).join(' · ')}
            </div>

            {/* Share */}
            <button type="button" onClick={handleCopyLink} disabled={!hasOverlay} className="btn-primary w-full disabled:opacity-50">
              🔗 Copy share link
            </button>
          </div>
        </div>

        {/* Mobile bottom sheet */}
        {toolInView && (
          <AcreBottomSheet
            hasOverlay={hasOverlay}
            area={area}
            unit={unit}
            shape={shape}
            onAreaChange={handleAreaChange}
            onUnitChange={handleUnitChange}
            onShapeChange={handleShapeChange}
            onPreset={handlePreset}
            onLocationSearch={handleLocationSearch}
            onUseMyLocation={handleUseMyLocation}
            onCopyLink={handleCopyLink}
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
