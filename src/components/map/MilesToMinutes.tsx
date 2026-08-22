'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { toMeters } from '@/lib/haversine';
import { minutesFor, formatDuration, SPEEDS } from '@/lib/travelTimes';
import type { RadiusCircle } from './RadiusMap';
import type L from 'leaflet';

const RadiusMap = dynamic(() => import('./RadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-180px)] lg:h-[75vh] bg-slate-100 flex items-center justify-center">
      <div className="text-slate-500">Loading map…</div>
    </div>
  ),
});

const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 }; // Chicago — matches the hero shot
const CIRCLE_ID = 'mtm-circle';
const LADDER = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100];
const SPEED_OPTIONS = [
  { key: 'city', label: 'City', mph: SPEEDS.cityMph },
  { key: 'highway', label: 'Highway', mph: SPEEDS.highwayMph },
  { key: 'walking', label: 'Walking', mph: SPEEDS.walkMph },
] as const;

type SpeedMode = 'city' | 'highway' | 'walking' | 'custom';

const parseNum = (s: string): number => {
  const v = parseFloat(s.replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : 0;
};

interface MilesToMinutesProps {
  defaultMiles?: number;
}

export default function MilesToMinutes({ defaultMiles = 10 }: MilesToMinutesProps) {
  const [milesText, setMilesText] = useState(String(defaultMiles));
  const [speedMode, setSpeedMode] = useState<SpeedMode>('city');
  const [customMph, setCustomMph] = useState('40');
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const mapRef = useRef<L.Map | null>(null);

  const miles = useMemo(() => parseNum(milesText), [milesText]);
  const activeMph =
    speedMode === 'custom' ? parseNum(customMph) : SPEED_OPTIONS.find((s) => s.key === speedMode)!.mph;

  const circle: RadiusCircle = useMemo(
    () => ({
      id: CIRCLE_ID,
      lat: center.lat,
      lng: center.lng,
      radiusMeters: toMeters(miles > 0 ? miles : 0.1, 'miles'),
      color: '#2563eb',
      unit: 'miles',
    }),
    [center, miles]
  );

  const fitToCircle = useCallback((lat: number, lng: number, radiusMeters: number) => {
    const map = mapRef.current;
    if (!map) return;
    const Lm = (window as unknown as { L: typeof import('leaflet') }).L;
    map.fitBounds(Lm.latLng(lat, lng).toBounds(radiusMeters * 4), {
      padding: [40, 40],
      animate: true,
      duration: 0.3,
      maxZoom: 14,
    });
  }, []);

  // Frame the ring once the map has mounted.
  useEffect(() => {
    const t = setTimeout(() => fitToCircle(center.lat, center.lng, toMeters(miles > 0 ? miles : 0.1, 'miles')), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCircleUpdate = useCallback((_id: string, lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);
  const handleMapClick = useCallback((lat: number, lng: number) => setCenter({ lat, lng }), []);
  const handleRadiusFromDrag = useCallback((next: number) => setMilesText(String(next)), []);
  const noop = useCallback(() => {}, []);

  const setPreset = useCallback(
    (value: number) => {
      setMilesText(String(value));
      fitToCircle(center.lat, center.lng, toMeters(value, 'miles'));
    },
    [center, fitToCircle]
  );

  const cityMin = Math.round(minutesFor(miles, SPEEDS.cityMph));
  const highwayMin = Math.round(minutesFor(miles, SPEEDS.highwayMph));
  const walkMin = Math.round(minutesFor(miles, SPEEDS.walkMph));
  const activeMin = Math.round(minutesFor(miles, activeMph));

  return (
    // #miles-to-minutes-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="miles-to-minutes-tool" data-testid="miles-to-minutes-tool" className="lg:flex lg:items-stretch">
      {/* Canonical, layout-independent state for tests */}
      <div
        data-testid="mtm-state"
        className="sr-only"
        data-miles={miles}
        data-active-mph={activeMph}
        data-active-min={activeMin}
        data-city-min={cityMin}
        data-highway-min={highwayMin}
        data-walk-min={walkMin}
      />

      {/* Calculator — the primary tool */}
      <div className="lg:w-[400px] lg:shrink-0 bg-white p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
        <label htmlFor="mtm-miles" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
          Distance in miles
        </label>
        <input
          id="mtm-miles"
          data-testid="mtm-miles-input"
          type="text"
          inputMode="decimal"
          value={milesText}
          onChange={(e) => setMilesText(e.target.value)}
          className="w-full text-3xl font-bold text-slate-900 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
        />

        {/* Distance ladder */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {LADDER.map((n) => (
            <button
              key={n}
              type="button"
              data-testid={`mtm-preset-${n}`}
              onClick={() => setPreset(n)}
              className={`px-2.5 py-1 rounded-md text-sm font-medium border transition-colors ${
                Math.abs(miles - n) < 0.001
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Speed selector */}
        <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Speed</div>
        <div className="grid grid-cols-4 gap-1.5">
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              data-testid={`mtm-speed-${s.key}`}
              onClick={() => setSpeedMode(s.key)}
              className={`py-1.5 rounded-md text-sm font-medium border transition-colors ${
                speedMode === s.key ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
          <button
            type="button"
            data-testid="mtm-speed-custom"
            onClick={() => setSpeedMode('custom')}
            className={`py-1.5 rounded-md text-sm font-medium border transition-colors ${
              speedMode === 'custom' ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            Custom
          </button>
        </div>
        {speedMode === 'custom' && (
          <div className="mt-2 flex items-center gap-2">
            <input
              data-testid="mtm-mph-input"
              type="text"
              inputMode="decimal"
              value={customMph}
              onChange={(e) => setCustomMph(e.target.value)}
              className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
            />
            <span className="text-sm text-slate-600">mph</span>
          </div>
        )}

        {/* Primary output */}
        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm text-slate-600">
            {miles > 0 ? `${milesText.replace(',', '.')} miles` : 'Enter a distance'}
            {activeMph > 0 && miles > 0 ? ` at ${activeMph} mph ≈` : ''}
          </div>
          <div data-testid="mtm-active-output" className="text-3xl font-bold text-slate-900 mt-1">
            {miles > 0 && activeMph > 0 ? formatDuration(activeMin) : '—'}
          </div>
        </div>

        {/* Driving & walking breakdown */}
        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🚗 Drive, city streets</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(cityMin)} <span className="font-normal text-slate-400 text-xs">at {SPEEDS.cityMph} mph</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🛣️ Drive, highway</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(highwayMin)}{' '}
              <span className="font-normal text-slate-400 text-xs">at {SPEEDS.highwayMph} mph</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🚶 Walk</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(walkMin)} <span className="font-normal text-slate-400 text-xs">at {SPEEDS.walkMph} mph</span>
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-slate-500">
          Times are distance ÷ speed, rounded — a planning estimate that ignores traffic, lights, and terrain.
        </p>
      </div>

      {/* Companion ring — the same map primitive as the distance tool */}
      <div className="lg:flex-1 relative">
        <RadiusMap
          circles={[circle]}
          selectedCircleId={CIRCLE_ID}
          currentRadius={miles}
          currentUnit="miles"
          currentColor="#2563eb"
          onCircleUpdate={handleCircleUpdate}
          onCircleSelect={noop}
          onMapClick={handleMapClick}
          onRadiusChange={handleRadiusFromDrag}
          mapRef={mapRef}
          skipAutoGeolocation
        />
      </div>
    </div>
  );
}
