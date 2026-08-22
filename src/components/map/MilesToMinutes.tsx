'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { toMeters } from '@/lib/haversine';
import { minutesFor, formatDuration } from '@/lib/travelTimes';
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

type TwoUnit = 'miles' | 'kilometers';
type SpeedSel = { kind: 'chip'; idx: number } | { kind: 'walk' } | { kind: 'custom' };

const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 }; // Chicago — matches the hero shot
const CIRCLE_ID = 'mtm-circle';
const LADDER = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100];
// Drive-speed chips per unit; the km/h values are the rounded equivalents of 25/45/65 mph.
const DRIVE_CHIPS: Record<TwoUnit, number[]> = { miles: [25, 45, 65], kilometers: [40, 70, 100] };
const WALK_SPEED: Record<TwoUnit, number> = { miles: 3, kilometers: 5 };
const SPEED_CLAMP: Record<TwoUnit, [number, number]> = { miles: [1, 120], kilometers: [1, 190] };

const parseNum = (s: string): number => {
  const v = parseFloat(s.replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : 0;
};
const clampSpeed = (v: number, [lo, hi]: [number, number]) => Math.min(hi, Math.max(lo, v));

interface MilesToMinutesProps {
  defaultMiles?: number;
}

export default function MilesToMinutes({ defaultMiles = 10 }: MilesToMinutesProps) {
  const [distanceText, setDistanceText] = useState(String(defaultMiles));
  const [unit, setUnit] = useState<TwoUnit>('miles');
  const [speedSel, setSpeedSel] = useState<SpeedSel>({ kind: 'chip', idx: 0 }); // default 25 mph
  const [customSpeedText, setCustomSpeedText] = useState('30');
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const mapRef = useRef<L.Map | null>(null);

  const distance = useMemo(() => parseNum(distanceText), [distanceText]);
  const speedUnitLabel = unit === 'miles' ? 'mph' : 'km/h';
  const distUnitLabel = unit === 'miles' ? 'mi' : 'km';
  const isWalk = speedSel.kind === 'walk';

  const activeSpeed = useMemo(() => {
    if (speedSel.kind === 'chip') return DRIVE_CHIPS[unit][speedSel.idx];
    if (speedSel.kind === 'walk') return WALK_SPEED[unit];
    const v = parseNum(customSpeedText);
    return v > 0 ? clampSpeed(v, SPEED_CLAMP[unit]) : 0;
  }, [speedSel, unit, customSpeedText]);

  const hasResult = distance > 0 && activeSpeed > 0;
  const activeMin = hasResult ? Math.round(minutesFor(distance, activeSpeed)) : 0;

  const circle: RadiusCircle = useMemo(
    () => ({
      id: CIRCLE_ID,
      lat: center.lat,
      lng: center.lng,
      radiusMeters: toMeters(distance > 0 ? distance : 0.1, unit),
      color: '#2563eb',
      unit,
    }),
    [center, distance, unit]
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

  // Parse ?lat&lng&r&unit on mount; with no URL params, geolocate once so the ring opens
  // on the visitor's own location.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const lat = parseFloat(p.get('lat') || '');
    const lng = parseFloat(p.get('lng') || '');
    const rStr = p.get('r');
    const unitParam = p.get('unit');

    let nextUnit: TwoUnit = 'miles';
    let nextDist = defaultMiles;
    if (rStr) {
      const m = rStr.match(/^([\d.]+)\s*(mi|km)?$/i);
      if (m) {
        nextDist = parseFloat(m[1]);
        if (m[2]) nextUnit = /km/i.test(m[2]) ? 'kilometers' : 'miles';
      }
    }
    if (unitParam) nextUnit = /^k/i.test(unitParam) ? 'kilometers' : 'miles';
    setUnit(nextUnit);
    if (Number.isFinite(nextDist) && nextDist > 0) setDistanceText(String(nextDist));

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      setCenter({ lat, lng });
      setTimeout(() => fitToCircle(lat, lng, toMeters(nextDist, nextUnit)), 400);
    } else {
      requestLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the shareable URL in sync (replaceState → no history spam), never mid-drag.
  useEffect(() => {
    if (typeof window === 'undefined' || isDraggingRef.current) return;
    const u = new URL(window.location.href);
    u.searchParams.set('lat', center.lat.toFixed(5));
    u.searchParams.set('lng', center.lng.toFixed(5));
    u.searchParams.set('r', `${distance}${unit === 'miles' ? 'mi' : 'km'}`);
    window.history.replaceState(null, '', u.toString());
  }, [center, distance, unit]);

  const requestLocation = useCallback(
    (userInitiated: boolean) => {
      if (!navigator.geolocation) {
        if (userInitiated) setLocationError('Geolocation is not supported by your browser.');
        return;
      }
      setIsLocating(true);
      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const { latitude, longitude } = pos.coords;
          setCenter({ lat: latitude, lng: longitude });
          setTimeout(() => fitToCircle(latitude, longitude, toMeters(distance > 0 ? distance : 0.1, unit)), 0);
        },
        (err) => {
          setIsLocating(false);
          if (userInitiated) {
            setLocationError(
              err.code === err.PERMISSION_DENIED
                ? 'Location access denied. Move the point on the map instead.'
                : 'Could not get your location. Move the point on the map instead.'
            );
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    },
    [fitToCircle, distance, unit]
  );

  const handleCircleUpdate = useCallback((_id: string, lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      setCenter({ lat, lng });
      fitToCircle(lat, lng, toMeters(distance > 0 ? distance : 0.1, unit));
    },
    [fitToCircle, distance, unit]
  );
  const handleRadiusFromDrag = useCallback((next: number) => setDistanceText(String(next)), []);
  const noop = useCallback(() => {}, []);

  const setPreset = useCallback(
    (value: number) => {
      setDistanceText(String(value));
      fitToCircle(center.lat, center.lng, toMeters(value, unit));
    },
    [center, unit, fitToCircle]
  );

  const handleUnit = useCallback(
    (next: TwoUnit) => {
      setUnit(next);
      fitToCircle(center.lat, center.lng, toMeters(distance > 0 ? distance : 0.1, next));
    },
    [center, distance, fitToCircle]
  );

  const speedLabel = isWalk ? 'walking' : `at ${activeSpeed} ${speedUnitLabel}`;

  return (
    // #miles-to-minutes-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="miles-to-minutes-tool" data-testid="miles-to-minutes-tool" className="lg:flex lg:items-stretch">
      {/* Canonical, layout-independent state for tests */}
      <div
        data-testid="mtm-state"
        className="sr-only"
        data-distance={distance}
        data-unit={unit}
        data-active-speed={activeSpeed}
        data-active-min={activeMin}
      />

      {/* Calculator — the primary tool */}
      <div className="lg:w-[400px] lg:shrink-0 bg-white p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
        {/* Location */}
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Your location</div>
        <button
          type="button"
          onClick={() => requestLocation(true)}
          disabled={isLocating}
          data-testid="mtm-use-location"
          className="w-full py-2.5 px-4 bg-accent text-white font-medium rounded-lg transition-colors hover:bg-accent/90 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isLocating ? 'Detecting…' : 'Use my location'}
        </button>
        {locationError && <p className="mt-2 text-sm text-red-600">{locationError}</p>}

        {/* Distance */}
        <div className="flex items-center justify-between mt-5 mb-1">
          <label htmlFor="mtm-miles" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Distance
          </label>
          <div className="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs font-medium">
            <button
              type="button"
              data-testid="mtm-unit-mi"
              onClick={() => handleUnit('miles')}
              className={`px-2.5 py-1 ${unit === 'miles' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
            >
              mi
            </button>
            <button
              type="button"
              data-testid="mtm-unit-km"
              onClick={() => handleUnit('kilometers')}
              className={`px-2.5 py-1 ${unit === 'kilometers' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
            >
              km
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="mtm-miles"
            data-testid="mtm-distance-input"
            type="text"
            inputMode="decimal"
            value={distanceText}
            onChange={(e) => setDistanceText(e.target.value)}
            className="w-full text-3xl font-bold text-slate-900 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
          />
          <span className="text-slate-500 font-medium">{distUnitLabel}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {LADDER.map((n) => (
            <button
              key={n}
              type="button"
              data-testid={`mtm-preset-${n}`}
              onClick={() => setPreset(n)}
              className={`px-2.5 py-1 rounded-md text-sm font-medium border transition-colors ${
                Math.abs(distance - n) < 0.001
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Speed — prominent */}
        <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Speed</div>
        <div className="flex flex-wrap gap-1.5">
          {DRIVE_CHIPS[unit].map((mph, i) => (
            <button
              key={DRIVE_CHIPS.miles[i]}
              type="button"
              data-testid={`mtm-speed-${DRIVE_CHIPS.miles[i]}`}
              onClick={() => setSpeedSel({ kind: 'chip', idx: i })}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-colors ${
                speedSel.kind === 'chip' && speedSel.idx === i
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {mph} {speedUnitLabel}
            </button>
          ))}
          <button
            type="button"
            data-testid="mtm-speed-walk"
            onClick={() => setSpeedSel({ kind: 'walk' })}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-colors ${
              isWalk ? 'bg-accent text-white border-accent' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            🚶 Walk
          </button>
          <button
            type="button"
            data-testid="mtm-speed-custom"
            onClick={() => setSpeedSel({ kind: 'custom' })}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-colors ${
              speedSel.kind === 'custom'
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Custom
          </button>
        </div>
        {speedSel.kind === 'custom' && (
          <div className="mt-2 flex items-center gap-2">
            <input
              data-testid="mtm-speed-input"
              type="text"
              inputMode="decimal"
              value={customSpeedText}
              onChange={(e) => setCustomSpeedText(e.target.value)}
              className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
            />
            <span className="text-sm text-slate-600">{speedUnitLabel}</span>
          </div>
        )}

        {/* Live output */}
        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm text-slate-600">
            {distance > 0 ? `${distanceText.replace(',', '.')} ${distUnitLabel} ${speedLabel} ≈` : 'Enter a distance'}
          </div>
          <div data-testid="mtm-active-output" className="text-3xl font-bold text-slate-900 mt-1">
            {hasResult ? formatDuration(activeMin) : '—'}
          </div>
          {!isWalk && hasResult && (
            <div className="text-xs text-slate-500 mt-1">approx. at {activeSpeed} {speedUnitLabel}</div>
          )}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Time is distance ÷ speed, rounded — a planning estimate at typical speeds that ignores traffic, lights,
          and terrain.
        </p>
      </div>

      {/* Companion ring — the same map primitive as the distance tool */}
      <div className="lg:flex-1 relative">
        <RadiusMap
          circles={[circle]}
          selectedCircleId={CIRCLE_ID}
          currentRadius={distance}
          currentUnit={unit}
          currentColor="#2563eb"
          onCircleUpdate={handleCircleUpdate}
          onCircleSelect={noop}
          onMapClick={handleMapClick}
          onRadiusChange={handleRadiusFromDrag}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            isDraggingRef.current = false;
            setDistanceText((d) => d); // nudge URL-sync effect after the gesture settles
          }}
          mapRef={mapRef}
          skipAutoGeolocation
        />
      </div>
    </div>
  );
}
