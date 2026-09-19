'use client';

import { useEffect, useRef, useState } from 'react';
import { sqMToArea, fmtNum } from '@/lib/area';

// The primary "acre calculator" intent is dimensional: someone has a lot that is
// L × W and wants the acreage. This block answers that instantly, standalone — no map
// interaction needed for the number. The button reflects the size onto the map overlay,
// and `reflectedAreaSqM` mirrors size changes made ON the map (preset / drag-resize)
// back into these inputs as the equivalent square. Kept compact so the map overlay is
// visible on load, even on a 375px screen.

type LenUnit = 'ft' | 'm' | 'yd';

// Metres per 1 unit of length. ft² → m² is 0.3048² = 0.09290304, which matches the
// exact sq-ft factor in area.ts, so 43,560 ft² round-trips to 1.000 acre.
const LEN_TO_M: Record<LenUnit, number> = { ft: 0.3048, m: 1, yd: 0.9144 };
const LEN_LABEL: Record<LenUnit, string> = { ft: 'feet', m: 'meters', yd: 'yards' };

const parseDim = (s: string): number => {
  const v = parseFloat(s.replace(/,/g, '').trim());
  return Number.isFinite(v) && v > 0 ? v : NaN;
};

interface Props {
  /** Reflect the current size onto the map overlay + scroll to it. */
  onShowOnMap?: (areaSqM: number) => void;
  /** A size (m²) that changed ON the map (preset / drag-resize) — mirrored here as a square. */
  reflectedAreaSqM?: { areaSqM: number; token: number } | null;
}

export default function AcreDimensionsCalculator({ onShowOnMap, reflectedAreaSqM = null }: Props) {
  const [length, setLength] = useState('200');
  const [width, setWidth] = useState('300');
  const [unit, setUnit] = useState<LenUnit>('ft');

  const l = parseDim(length);
  const w = parseDim(width);
  const valid = !isNaN(l) && !isNaN(w);

  const factor = LEN_TO_M[unit];
  const areaSqM = valid ? l * factor * w * factor : 0;
  const acres = sqMToArea(areaSqM, 'acres');
  const sqft = sqMToArea(areaSqM, 'sqft');
  const hectares = sqMToArea(areaSqM, 'hectares');

  // Mirror a map-originated size change into the inputs as the equivalent square — but
  // skip when it already matches (e.g. the size we just pushed via "Show on map"), so a
  // rectangle the user typed is not clobbered on the round trip.
  const lwRef = useRef({ l, w, unit });
  lwRef.current = { l, w, unit };
  useEffect(() => {
    if (!reflectedAreaSqM) return;
    const { l: cl, w: cw, unit: cu } = lwRef.current;
    const f = LEN_TO_M[cu];
    const ownArea = cl * f * cw * f;
    const target = reflectedAreaSqM.areaSqM;
    if (target <= 0) return;
    if (!Number.isFinite(ownArea) || ownArea <= 0 || Math.abs(target - ownArea) / target > 0.01) {
      const sideU = Math.sqrt(target) / f;
      const rounded = sideU >= 1000 ? Math.round(sideU) : Math.round(sideU * 100) / 100;
      setLength(String(rounded));
      setWidth(String(rounded));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reflectedAreaSqM?.token]);

  const inputCls =
    'w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none';

  return (
    <div data-testid="acre-dims" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 lg:p-5">
      <div className="flex items-end justify-between gap-x-4 gap-y-3 flex-wrap">
        <div className="flex items-end gap-2">
          <div className="w-[92px]">
            <label htmlFor="acre-len" className="block text-[11px] font-semibold text-slate-500 mb-0.5">Length</label>
            <input
              id="acre-len"
              data-testid="acre-dims-length"
              type="text"
              inputMode="decimal"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={inputCls}
            />
          </div>
          <span aria-hidden className="pb-2 text-slate-400 font-semibold select-none">&times;</span>
          <div className="w-[92px]">
            <label htmlFor="acre-wid" className="block text-[11px] font-semibold text-slate-500 mb-0.5">Width</label>
            <input
              id="acre-wid"
              data-testid="acre-dims-width"
              type="text"
              inputMode="decimal"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="flex bg-slate-100 rounded-lg p-[3px] self-end">
            {(['ft', 'm', 'yd'] as LenUnit[]).map((u) => (
              <button
                key={u}
                type="button"
                data-testid={`acre-dims-unit-${u}`}
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`px-2.5 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
                  unit === u ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Live result */}
        <div className="text-right leading-none">
          {valid ? (
            <span data-testid="acre-dims-acres" className="tabular-nums">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900">{fmtNum(acres)}</span>
              <span className="text-sm font-semibold text-slate-500"> acres</span>
            </span>
          ) : (
            <span data-testid="acre-dims-acres" className="text-2xl font-extrabold text-slate-300">—</span>
          )}
        </div>
      </div>

      <div data-testid="acre-dims-breakdown" className="mt-2 text-[13px] text-slate-600 tabular-nums">
        {valid
          ? `= ${fmtNum(sqft)} sq ft · ${fmtNum(hectares)} ha · ${fmtNum(areaSqM)} m²`
          : `Enter a length and width in ${LEN_LABEL[unit]}`}
      </div>

      {onShowOnMap && (
        <button
          type="button"
          data-testid="acre-dims-show"
          onClick={() => valid && onShowOnMap(areaSqM)}
          disabled={!valid}
          className="btn-primary w-full mt-3 text-sm disabled:opacity-50"
        >
          {valid ? `Show ${fmtNum(acres)} acres on the map ↓` : 'Show on the map'}
        </button>
      )}

      <p className="mt-2 text-[11px] text-slate-400">
        Length &times; width &divide; 43,560 = acres.
      </p>
    </div>
  );
}
