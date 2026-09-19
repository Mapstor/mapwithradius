'use client';

import { useState } from 'react';
import { sqMToArea, fmtNum } from '@/lib/area';

// The primary "acre calculator" intent is dimensional: someone has a lot that is
// L × W and wants the acreage. This block answers that instantly, standalone —
// no map interaction needed for the number. It can optionally reflect the size
// onto the map overlay below via onShowOnMap.

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
  /** If provided, renders a button that reflects this size onto the map overlay. */
  onShowOnMap?: (areaSqM: number) => void;
}

export default function AcreDimensionsCalculator({ onShowOnMap }: Props) {
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

  return (
    <div
      data-testid="acre-dims"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 lg:p-6"
    >
      <h2 className="text-lg font-bold text-slate-900">Lot size to acres</h2>
      <p className="text-sm text-slate-500 mb-4">
        Enter a plot&rsquo;s length and width to get the area in acres.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="acre-len" className="block text-xs font-semibold text-slate-600 mb-1">
            Length
          </label>
          <input
            id="acre-len"
            data-testid="acre-dims-length"
            type="text"
            inputMode="decimal"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div aria-hidden className="hidden sm:block pb-3 text-slate-400 font-semibold select-none">
          &times;
        </div>

        <div className="flex-1 min-w-0">
          <label htmlFor="acre-wid" className="block text-xs font-semibold text-slate-600 mb-1">
            Width
          </label>
          <input
            id="acre-wid"
            data-testid="acre-dims-width"
            type="text"
            inputMode="decimal"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
        </div>

        <div className="flex-none">
          <span className="block text-xs font-semibold text-slate-600 mb-1">Unit</span>
          <div className="flex bg-slate-100 rounded-lg p-[3px]">
            {(['ft', 'm', 'yd'] as LenUnit[]).map((u) => (
              <button
                key={u}
                type="button"
                data-testid={`acre-dims-unit-${u}`}
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
                  unit === u ? 'bg-white text-accent-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live result */}
      <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4">
        <div className="text-sm text-slate-500">
          {valid ? `${fmtNum(l)} × ${fmtNum(w)} ${LEN_LABEL[unit]}` : 'Enter both dimensions'}
        </div>
        <div className="text-3xl font-extrabold text-slate-900 tabular-nums leading-tight mt-0.5">
          <span data-testid="acre-dims-acres">{valid ? `${fmtNum(acres)} acres` : '—'}</span>
        </div>
        {valid && (
          <div data-testid="acre-dims-breakdown" className="mt-1 text-sm text-slate-600 tabular-nums">
            = {fmtNum(sqft)} sq ft &middot; {fmtNum(hectares)} ha &middot; {fmtNum(areaSqM)} m&sup2;
          </div>
        )}
      </div>

      {onShowOnMap && (
        <button
          type="button"
          onClick={() => valid && onShowOnMap(areaSqM)}
          disabled={!valid}
          className="btn-secondary w-full mt-4 text-sm disabled:opacity-50"
        >
          See a square this size on the map ↓
        </button>
      )}

      <p className="mt-3 text-xs text-slate-500">
        Formula: square feet = length &times; width; acres = square feet &divide; 43,560.
      </p>
    </div>
  );
}
