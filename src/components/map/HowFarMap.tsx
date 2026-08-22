'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { toMeters, formatDistance } from '@/lib/haversine';
import { geocodeAddress, searchLocations, GeocodingResult } from '@/lib/geocoding';
import { travelTimesForMiles, formatDuration, kmToMiles, SPEEDS } from '@/lib/travelTimes';
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

// Chicago — the pre-geolocation default so a ring always renders; matches the hero shot.
const DEFAULT_CENTER = { lat: 41.8781, lng: -87.6298 };
const CIRCLE_ID = 'how-far-circle';
const CIRCLE_COLOR = '#2563eb';
const PRESETS = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100];

interface HowFarMapProps {
  /** Distance the page leads with; the ring opens at this many miles. */
  defaultMiles?: number;
}

export default function HowFarMap({ defaultMiles = 10 }: HowFarMapProps) {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [radius, setRadius] = useState(defaultMiles);
  const [unit, setUnit] = useState<TwoUnit>('miles');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [located, setLocated] = useState(false);
  const isDraggingRef = useRef(false);
  const mapRef = useRef<L.Map | null>(null);

  const circle: RadiusCircle = useMemo(
    () => ({
      id: CIRCLE_ID,
      lat: center.lat,
      lng: center.lng,
      radiusMeters: toMeters(radius, unit),
      color: CIRCLE_COLOR,
      unit,
    }),
    [center, radius, unit]
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

  // Parse ?lat&lng&r&unit on mount (population-tool URL-state pattern). No URL params →
  // request geolocation once so the ring opens on the visitor's own location.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const lat = parseFloat(p.get('lat') || '');
    const lng = parseFloat(p.get('lng') || '');
    const rStr = p.get('r');
    const unitParam = p.get('unit');

    let nextUnit: TwoUnit = 'miles';
    let nextRadius = defaultMiles;
    if (rStr) {
      const m = rStr.match(/^([\d.]+)\s*(mi|km)?$/i);
      if (m) {
        nextRadius = parseFloat(m[1]);
        if (m[2]) nextUnit = /km/i.test(m[2]) ? 'kilometers' : 'miles';
      }
    }
    if (unitParam) nextUnit = /^k/i.test(unitParam) ? 'kilometers' : 'miles';
    setUnit(nextUnit);
    if (Number.isFinite(nextRadius) && nextRadius > 0) setRadius(nextRadius);

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      setCenter({ lat, lng });
      setLocated(true);
      setTimeout(() => fitToCircle(lat, lng, toMeters(nextRadius, nextUnit)), 400);
    } else {
      requestLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the shareable URL in sync with the ring (replaceState → no history spam),
  // but never mid-drag.
  useEffect(() => {
    if (typeof window === 'undefined' || isDraggingRef.current) return;
    const u = new URL(window.location.href);
    u.searchParams.set('lat', center.lat.toFixed(5));
    u.searchParams.set('lng', center.lng.toFixed(5));
    u.searchParams.set('r', `${radius}${unit === 'miles' ? 'mi' : 'km'}`);
    window.history.replaceState(null, '', u.toString());
  }, [center, radius, unit]);

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
          setLocated(true);
          const { latitude, longitude } = pos.coords;
          setCenter({ lat: latitude, lng: longitude });
          setTimeout(() => fitToCircle(latitude, longitude, toMeters(radius, unit)), 0);
        },
        (err) => {
          setIsLocating(false);
          if (userInitiated) {
            setLocationError(
              err.code === err.PERMISSION_DENIED
                ? 'Location access denied. Search for an address instead.'
                : 'Could not get your location. Search for an address instead.'
            );
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    },
    [fitToCircle, radius, unit]
  );

  const handleCircleUpdate = useCallback((_id: string, lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      setCenter({ lat, lng });
      setLocated(true);
      fitToCircle(lat, lng, toMeters(radius, unit));
    },
    [fitToCircle, radius, unit]
  );

  const handleLocationSearch = useCallback(
    (lat: number, lng: number) => {
      setCenter({ lat, lng });
      setLocated(true);
      setLocationError(null);
      setTimeout(() => fitToCircle(lat, lng, toMeters(radius, unit)), 0);
    },
    [fitToCircle, radius, unit]
  );

  const handlePreset = useCallback(
    (value: number) => {
      setRadius(value);
      fitToCircle(center.lat, center.lng, toMeters(value, unit));
    },
    [center, unit, fitToCircle]
  );

  const handleUnit = useCallback(
    (next: TwoUnit) => {
      setUnit(next);
      fitToCircle(center.lat, center.lng, toMeters(radius, next));
    },
    [center, radius, fitToCircle]
  );

  const handleRadiusFromDrag = useCallback((next: number) => setRadius(next), []);

  // Physical radius in miles → the labeled travel times (arithmetic only).
  const miles = unit === 'miles' ? radius : kmToMiles(radius);
  const times = travelTimesForMiles(miles);
  const driveCity = Math.round(times.driveCityMin);
  const driveHighway = Math.round(times.driveHighwayMin);
  const walk = Math.round(times.walkMin);

  const noop = useCallback(() => {}, []);

  const panel = (
    <Panel
      radius={radius}
      unit={unit}
      located={located}
      isLocating={isLocating}
      locationError={locationError}
      driveCity={driveCity}
      driveHighway={driveHighway}
      walk={walk}
      onPreset={handlePreset}
      onUnit={handleUnit}
      onSearch={handleLocationSearch}
      onUseMyLocation={() => requestLocation(true)}
    />
  );

  return (
    // #how-far-tool marks the interactive tool as a Raptive ad-exclusion zone.
    <div id="how-far-tool" data-testid="how-far-tool" className="relative">
      {/* Canonical, layout-independent state for tests/automation */}
      <div
        data-testid="howfar-state"
        className="sr-only"
        data-radius={radius}
        data-unit={unit}
        data-radius-miles={miles.toFixed(3)}
        data-drive-city-min={driveCity}
        data-drive-highway-min={driveHighway}
        data-walk-min={walk}
      />

      {/* Mobile: controls above the map so the CTA is in view without scrolling */}
      <div className="lg:hidden mb-3" data-howfar-panel="mobile">
        {panel}
      </div>

      <div className="relative">
        <RadiusMap
          circles={[circle]}
          selectedCircleId={CIRCLE_ID}
          currentRadius={radius}
          currentUnit={unit}
          currentColor={CIRCLE_COLOR}
          onCircleUpdate={handleCircleUpdate}
          onCircleSelect={noop}
          onMapClick={handleMapClick}
          onRadiusChange={handleRadiusFromDrag}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            isDraggingRef.current = false;
            setRadius((r) => r); // nudge URL-sync effect after the gesture settles
          }}
          mapRef={mapRef}
          skipAutoGeolocation
        />

        {/* Desktop: floating control card, keeping the map full-width */}
        <div
          className="hidden lg:block absolute top-4 right-4 w-80 z-[500]"
          data-howfar-panel="desktop"
        >
          {panel}
        </div>
      </div>
    </div>
  );
}

interface PanelProps {
  radius: number;
  unit: TwoUnit;
  located: boolean;
  isLocating: boolean;
  locationError: string | null;
  driveCity: number;
  driveHighway: number;
  walk: number;
  onPreset: (value: number) => void;
  onUnit: (unit: TwoUnit) => void;
  onSearch: (lat: number, lng: number, displayName: string) => void;
  onUseMyLocation: () => void;
}

function Panel({
  radius,
  unit,
  located,
  isLocating,
  locationError,
  driveCity,
  driveHighway,
  walk,
  onPreset,
  onUnit,
  onSearch,
  onUseMyLocation,
}: PanelProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unitLabel = unit === 'miles' ? 'mi' : 'km';

  const onInput = useCallback((value: string) => {
    setQuery(value);
    setSearchError(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      const results = await searchLocations(value, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 300);
  }, []);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setShowSuggestions(false);
      const result = await geocodeAddress(query);
      if (result) onSearch(result.lat, result.lng, result.displayName);
      else setSearchError('Location not found. Try a different search.');
    },
    [query, onSearch]
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 space-y-4">
      {/* Location */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Your location
        </div>
        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={isLocating}
          data-testid="howfar-use-location"
          className="w-full py-2.5 px-4 bg-accent text-white font-medium rounded-lg transition-colors hover:bg-accent/90 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isLocating ? 'Detecting…' : 'Use my location'}
        </button>
        <form onSubmit={submit} className="mt-2 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => onInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="…or search an address, city, or ZIP"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((s, i) => (
                <button
                  key={`${s.lat}-${s.lng}-${i}`}
                  type="button"
                  onClick={() => {
                    setQuery(s.displayName);
                    setShowSuggestions(false);
                    onSearch(s.lat, s.lng, s.displayName);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                >
                  <span className="text-slate-700 line-clamp-2">{s.displayName}</span>
                </button>
              ))}
            </div>
          )}
        </form>
        {(searchError || locationError) && (
          <p className="mt-2 text-sm text-red-600">{searchError || locationError}</p>
        )}
      </div>

      {/* Distance presets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Distance
          </span>
          <div className="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs font-medium">
            <button
              type="button"
              data-testid="howfar-unit-mi"
              onClick={() => onUnit('miles')}
              className={`px-2.5 py-1 ${unit === 'miles' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
            >
              mi
            </button>
            <button
              type="button"
              data-testid="howfar-unit-km"
              onClick={() => onUnit('kilometers')}
              className={`px-2.5 py-1 ${unit === 'kilometers' ? 'bg-accent text-white' : 'bg-white text-slate-600'}`}
            >
              km
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              data-testid={`howfar-preset-${p}`}
              onClick={() => onPreset(p)}
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                Math.abs(radius - p) < 0.001
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {p} {unitLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Comprehension readout — every figure labeled with its speed assumption */}
      <div className="border-t border-slate-200 pt-3">
        <div className="text-sm text-slate-600 mb-2">
          {located ? 'From your location, ' : 'A '}
          <strong className="text-slate-900">
            {formatDistance(radius, unit === 'miles' ? 'miles' : 'kilometers')}
          </strong>{' '}
          is roughly:
        </div>
        <dl className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🚗 Drive, city streets</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(driveCity)}{' '}
              <span className="font-normal text-slate-400 text-xs">approx. at {SPEEDS.cityMph} mph</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🛣️ Drive, highway</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(driveHighway)}{' '}
              <span className="font-normal text-slate-400 text-xs">approx. at {SPEEDS.highwayMph} mph</span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-600">🚶 Walk</dt>
            <dd className="font-semibold text-slate-900">
              {formatDuration(walk)}{' '}
              <span className="font-normal text-slate-400 text-xs">approx. at {SPEEDS.walkMph} mph</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
