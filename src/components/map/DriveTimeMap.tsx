'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { createTileLayer } from '@/lib/mapTiles';
import 'leaflet/dist/leaflet.css';
import LocationSearchInput from './LocationSearchInput';
import { GeocodingResult } from '@/lib/geocoding';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type TravelMode = 'auto' | 'pedestrian' | 'bicycle';

interface DriveTimeMapProps {
  defaultMode?: TravelMode;
  showDrivingOption?: boolean;
  /**
   * Seed a start point on mount so a default isochrone draws immediately (users see a result,
   * not an empty map). Prefers the user's location when geolocation is ALREADY granted, else the
   * default city. Off by default — the walking page reuses this component and must NOT auto-draw.
   */
  autoComputeDefault?: boolean;
  /** Initial map view + fallback seed center when geolocation isn't already granted. Defaults to DC. */
  defaultCenter?: [number, number];
}

const TIME_PRESETS = [5, 10, 15, 30, 45, 60];

// Time ceiling per mode — all 60 min. The free FOSSGIS Valhalla server frequently FAILS to
// compute isochrones past ~1h (drive included, under load), and a cap that reliably returns
// beats one that errors, so every mode tops out at 60. Kept as a per-mode record so a mode
// could diverge again later without touching the clamp/preset logic.
const MODE_MAX_TIME: Record<TravelMode, number> = { auto: 60, pedestrian: 60, bicycle: 60 };

// Same free FOSSGIS Valhalla server /how-far-did-i-run uses (its /route). No key; fair-use →
// one request per settled edit (debounced), aborted when a newer edit supersedes it.
const VALHALLA_ISOCHRONE = 'https://valhalla1.openstreetmap.de/isochrone';
const FETCH_DEBOUNCE_MS = 300; // collapse a slider drag into ONE request on settle
// Isochrone is a HEAVY compute — Valhalla expands the whole reachable network before it sends
// headers, routinely many seconds, unlike how-far's quick /route lookup. A flat 8s (copied from
// /route) aborted valid slow requests and showed "Couldn't calculate". Give it real headroom,
// scaled by the contour time, with a bit more per minute for the denser walk/cycle graphs. ~20–30s.
function isochroneTimeoutMs(mode: TravelMode, timeMin: number): number {
  const perMin = mode === 'auto' ? 100 : 150;
  return Math.min(30000, 20000 + timeMin * perMin);
}

// Neighborhood-level default view: a real, walkable US city (Washington, DC) at ~zoom 12,
// not the whole-country view. If geolocation is ALREADY granted we recenter on the user at
// street zoom (Permissions API only — never prompts on load). Nothing computes until the user
// sets a start point.
const DEFAULT_CENTER: [number, number] = [38.9072, -77.0369];
const DEFAULT_ZOOM = 12;
const LOCATED_ZOOM = 13;

const MODE_CONFIG: Record<TravelMode, { label: string; icon: string; color: string }> = {
  auto: { label: 'Drive', icon: '🚗', color: '#3B82F6' },
  pedestrian: { label: 'Walk', icon: '🚶', color: '#F97316' },
  bicycle: { label: 'Cycle', icon: '🚴', color: '#22C55E' },
};

// A failed isochrone points the user at the fix: for walk/cycle it's almost always the time
// being too long for the free server, so say so instead of a generic error.
function errorForMode(mode: TravelMode): string {
  if (mode === 'pedestrian') return 'Couldn’t map that walking time — try a shorter time, or switch to Drive.';
  if (mode === 'bicycle') return 'Couldn’t map that cycling time — try a shorter time, or switch to Drive.';
  return 'Couldn’t calculate that drive-time area. Try again, or use the radius tool instead.';
}

export default function DriveTimeMap({
  defaultMode = 'auto',
  showDrivingOption = true,
  autoComputeDefault = false,
  defaultCenter = DEFAULT_CENTER,
}: DriveTimeMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const isochroneLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleLayerRef = useRef<L.Circle | null>(null);
  // The mobile controls panel overlays the bottom of the map; its measured height is reserved
  // as fitBounds bottom-padding so the isochrone frames into the VISIBLE area above it.
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  // Resilience refs: the debounce timer and the in-flight request's controller, so a newer
  // edit (or unmount) cancels the pending/running one instead of racing it.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [time, setTime] = useState(30);
  const [mode, setMode] = useState<TravelMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRadiusCircle, setShowRadiusCircle] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);

  const maxTime = MODE_MAX_TIME[mode];

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const container = mapContainer.current;

    const map = L.map(container, {
      center: defaultCenter,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

    createTileLayer(L).addTo(map);

    // Click on map to set center
    map.on('click', (e: L.LeafletMouseEvent) => {
      setCenter([e.latlng.lat, e.latlng.lng]);
      setLocationName(`${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    });

    mapRef.current = map;

    // Start framing (Permissions API only — never prompts on load). Recenter the VIEW on the user
    // when geolocation is ALREADY granted, else the default city. On auto-compute pages we ALSO
    // seed that point as the start so a default isochrone draws immediately; on other pages (e.g.
    // walking) we only move the view — nothing computes until the user acts.
    const applyStart = (lat: number, lon: number, name: string, located: boolean) => {
      mapRef.current?.setView([lat, lon], located ? LOCATED_ZOOM : DEFAULT_ZOOM);
      if (autoComputeDefault) {
        setLocationName(name);
        setCenter([lat, lon]);
      }
    };
    const seedDefaultCity = () => {
      if (autoComputeDefault) applyStart(defaultCenter[0], defaultCenter[1], 'Washington, DC', false);
    };

    if (typeof navigator !== 'undefined') {
      const perms = (navigator as Navigator & { permissions?: Permissions }).permissions;
      if (perms?.query && navigator.geolocation) {
        perms
          .query({ name: 'geolocation' as PermissionName })
          .then((status) => {
            if (status.state === 'granted') {
              navigator.geolocation.getCurrentPosition(
                (pos) => applyStart(pos.coords.latitude, pos.coords.longitude, 'Your location', true),
                () => seedDefaultCity(), // granted but the read failed → default city
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
              );
            } else {
              seedDefaultCity(); // prompt/denied → default city (auto-compute pages only)
            }
          })
          .catch(() => seedDefaultCity());
      } else {
        seedDefaultCity(); // no Permissions API → default city (auto-compute pages only)
      }
    } else {
      seedDefaultCity();
    }

    // Fix the first-paint sizing race and keep the map correctly sized on any later container
    // resize (mobile URL bar show/hide, rotation) WITHOUT recreating it. Leaflet caches the
    // container's pixel size at init; on mobile that size isn't settled yet, so setView/fitBounds
    // computed the center against a stale size and the origin marker landed off the visual centre.
    // invalidateSize() recomputes it (re-centring the view); a ResizeObserver keeps it correct.
    // Matches AcreOverlayMap / AreaMeasureMap.
    let sizeRaf: number | null = null;
    const invalidate = () => {
      sizeRaf = null;
      mapRef.current?.invalidateSize();
    };
    sizeRaf = requestAnimationFrame(invalidate);
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (sizeRaf != null) cancelAnimationFrame(sizeRaf);
            sizeRaf = requestAnimationFrame(invalidate);
          })
        : null;
    ro?.observe(container);

    return () => {
      if (sizeRaf != null) cancelAnimationFrame(sizeRaf);
      ro?.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker when center changes (marker only — the isochrone has its own effect below).
  useEffect(() => {
    if (!mapRef.current || !center) return;

    if (markerRef.current) {
      markerRef.current.setLatLng(center);
    } else {
      const marker = L.marker(center, {
        icon: L.divIcon({
          className: 'custom-center-marker',
          html: `<div style="width: 20px; height: 20px; background-color: #1E40AF; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
      }).addTo(mapRef.current);
      markerRef.current = marker;
    }
  }, [center]);

  // Single isochrone trigger: debounced + aborted. Fires ONE request per settled change to
  // center / time / mode (no double-fire, no request-per-slider-step). Supersedes and aborts an
  // in-flight request, times out a slow one, and never leaves a stale (wrong) polygon on failure.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (!center || !mapRef.current) return;

    const [lat, lon] = center;
    const reqMode = mode;
    const reqTime = time;
    setError(null);
    setIsLoading(true);

    debounceRef.current = setTimeout(() => {
      const ac = new AbortController();
      abortRef.current = ac;
      let timedOut = false;
      const to = setTimeout(() => {
        timedOut = true;
        ac.abort();
      }, isochroneTimeoutMs(reqMode, reqTime));

      (async () => {
        try {
          const reqJson = JSON.stringify({
            locations: [{ lat, lon }],
            costing: reqMode,
            contours: [{ time: reqTime }],
            polygons: true,
            denoise: 0.5,
            generalize: 50,
          });
          const response = await fetch(`${VALHALLA_ISOCHRONE}?json=${encodeURIComponent(reqJson)}`, {
            signal: ac.signal,
          });
          clearTimeout(to);
          if (!response.ok) throw new Error(`isochrone ${response.status}`);

          const data = await response.json();
          // Superseded while this response was in flight → drop it. A newer request reassigned
          // abortRef, so committing here would draw a stale polygon and clear the spinner early.
          // (Abort usually rejects first, but this guard makes it correct regardless of timing.)
          if (abortRef.current !== ac) return;
          const map = mapRef.current;
          if (!map) return;

          // Swap: remove the previous area, draw the new one, frame it.
          if (isochroneLayerRef.current) {
            isochroneLayerRef.current.remove();
            isochroneLayerRef.current = null;
          }
          const color = MODE_CONFIG[reqMode].color;
          const layer = L.geoJSON(data, {
            style: { color, fillColor: color, fillOpacity: 0.2, weight: 2 },
          }).addTo(map);
          isochroneLayerRef.current = layer;

          const bounds = layer.getBounds();
          if (bounds.isValid()) {
            // On mobile the controls panel (position:absolute) covers the bottom of the map, so
            // reserve its measured height as bottom padding — the whole isochrone then frames into
            // the VISIBLE area above the panel instead of centering under it (origin hidden). On
            // desktop the panel is display:none (offsetHeight 0) → symmetric padding, unchanged.
            const panelH = mobilePanelRef.current?.offsetHeight ?? 0;
            if (panelH > 0) {
              map.fitBounds(bounds, { paddingTopLeft: [28, 28], paddingBottomRight: [28, panelH + 24] });
            } else {
              map.fitBounds(bounds, { padding: [50, 50] });
            }
          }
          setIsLoading(false);
        } catch (err) {
          clearTimeout(to);
          // Superseded by a newer edit → let the newer request own the UI (don't flash an error).
          if ((err as Error).name === 'AbortError' && !timedOut) return;
          if (abortRef.current !== ac) return; // superseded after resolving → newer request owns the UI
          // Real failure or timeout → clear the old polygon so it can't read as a wrong result.
          if (isochroneLayerRef.current) {
            isochroneLayerRef.current.remove();
            isochroneLayerRef.current = null;
          }
          console.error('Isochrone fetch error:', err);
          setError(errorForMode(reqMode));
          setIsLoading(false);
        } finally {
          if (abortRef.current === ac) abortRef.current = null;
        }
      })();
    }, FETCH_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [center, time, mode]);

  // Handle radius circle overlay
  useEffect(() => {
    if (!mapRef.current || !center) return;

    if (circleLayerRef.current) {
      circleLayerRef.current.remove();
      circleLayerRef.current = null;
    }

    if (showRadiusCircle) {
      // Approximate radius based on mode and time
      const speeds: Record<TravelMode, number> = {
        auto: 50, // km/h average
        pedestrian: 5, // km/h
        bicycle: 15, // km/h
      };
      const distanceKm = (speeds[mode] * time) / 60;
      const radiusMeters = distanceKm * 1000;

      const circle = L.circle(center, {
        radius: radiusMeters,
        color: '#9CA3AF',
        fillColor: '#9CA3AF',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5',
      }).addTo(mapRef.current);

      circleLayerRef.current = circle;
    }
  }, [center, showRadiusCircle, time, mode]);

  // Switching mode clamps the time down to the new mode's ceiling so we never leave a time that
  // mode can't compute. (All modes cap at 60 today, so this is a no-op guard that keeps working
  // if a per-mode cap is ever reintroduced.)
  const changeMode = useCallback((m: TravelMode) => {
    setMode(m);
    setTime((t) => Math.min(t, MODE_MAX_TIME[m]));
  }, []);

  // Search for address
  const handleSearch = async () => {
    if (!searchValue.trim() || !mapRef.current) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}&limit=1`,
        {
          headers: {
            'User-Agent': 'MapWithRadius/1.0',
          },
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setCenter(newCenter);
        setLocationName(display_name.split(',').slice(0, 2).join(','));
        mapRef.current.setView(newCenter, 12);
      } else {
        setError('Location not found. Try a different search.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Use current location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
        setCenter(newCenter);
        setLocationName('Your location');
        if (mapRef.current) {
          mapRef.current.setView(newCenter, LOCATED_ZOOM);
        }
        setIsSearching(false);
      },
      () => {
        setError('Location access denied. Please search for an address instead.');
        setIsSearching(false);
      }
    );
  };

  const availableModes = showDrivingOption
    ? (['auto', 'pedestrian', 'bicycle'] as TravelMode[])
    : (['pedestrian', 'bicycle'] as TravelMode[]);

  return (
    // #drive-time-tool marks the whole interactive tool (map + controls) as a Raptive
    // ad-exclusion zone so units are never auto-inserted over the touch surface — matching
    // every other tool (#radius-tool, #how-far-did-i-run-tool, #area-tool, …).
    <div id="drive-time-tool" data-testid="dt-tool" className="relative h-[74vh] lg:h-[75vh]">
      {/* Canonical, layout-independent state for tests/automation */}
      <div
        data-testid="dt-state"
        className="sr-only"
        data-mode={mode}
        data-time={time}
        data-max-time={maxTime}
        data-has-center={center ? '1' : '0'}
        data-loading={isLoading ? '1' : '0'}
        data-error={error ?? ''}
      />

      {/* Map */}
      <div ref={mapContainer} data-testid="dt-map" className="w-full h-full" />

      {/* Status / hint overlay (top-center) — visible on BOTH mobile and desktop, so a denial
          or a server error is never invisible on mobile, and first-timers get a hint. */}
      {(error || isLoading || !center) && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1100] max-w-[92%] pointer-events-none">
          {error ? (
            <div data-testid="dt-error" className="pointer-events-auto bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2 rounded-lg shadow-md text-center">
              {error}
            </div>
          ) : isLoading ? (
            <div data-testid="dt-loading" className="bg-white/95 border border-slate-200 text-blue-600 text-sm px-3.5 py-2 rounded-lg shadow-md flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Calculating travel area…
            </div>
          ) : (
            <div data-testid="dt-hint" className="bg-primary-900/95 text-white text-sm px-3.5 py-2 rounded-lg shadow-md text-center backdrop-blur-sm">
              Search or tap the map to set your start — the area updates automatically.
            </div>
          )}
        </div>
      )}

      {/* Controls Panel — desktop only. Mobile gets the bottom controls below. */}
      <div className="hidden lg:block absolute top-4 right-4 w-80 lg:w-96 bg-white rounded-xl shadow-lg overflow-hidden z-[1000]">
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <LocationSearchInput
                  value={searchValue}
                  onValueChange={setSearchValue}
                  onSelectLocation={(s: GeocodingResult) => {
                    setSearchValue(s.displayName);
                    const newCenter: [number, number] = [s.lat, s.lng];
                    setCenter(newCenter);
                    setLocationName(s.displayName.split(',').slice(0, 2).join(','));
                    if (mapRef.current) mapRef.current.setView(newCenter, 12);
                  }}
                  onSubmit={handleSearch}
                  placeholder="Search address, city, or zip..."
                  inputClassName="w-full pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSearching}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSearching ? '...' : 'Go'}
              </button>
            </div>
            <button
              onClick={handleUseLocation}
              disabled={isSearching}
              className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Detecting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" />
                  </svg>
                  Use My Location
                </>
              )}
            </button>
          </div>

          {/* Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Travel Mode</label>
            <div className="flex gap-2">
              {availableModes.map((m) => (
                <button
                  key={m}
                  data-testid={`dt-mode-${m}`}
                  aria-pressed={mode === m}
                  onClick={() => changeMode(m)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    mode === m
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {MODE_CONFIG[m].icon} {MODE_CONFIG[m].label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Travel Time: <span className="text-blue-600">{time} min</span>
              <span className="text-slate-400 font-normal"> · up to {maxTime} min</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_PRESETS.map((t) => {
                const over = t > maxTime;
                return (
                  <button
                    key={t}
                    data-testid={`dt-time-${t}`}
                    onClick={() => setTime(t)}
                    disabled={over}
                    aria-disabled={over}
                    title={over ? `Too long for ${MODE_CONFIG[mode].label.toLowerCase()} on the free server` : undefined}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      over
                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                        : time === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t >= 60 ? `${t / 60}hr` : `${t}min`}
                  </button>
                );
              })}
            </div>
            <input
              type="range"
              data-testid="dt-slider"
              min="5"
              max={maxTime}
              step="5"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          {/* Show Radius Circle */}
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showRadiusCircle}
              onChange={(e) => setShowRadiusCircle(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Show straight-line radius for comparison
          </label>

          {/* Status */}
          {locationName && (
            <div className="text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
              <span className="font-medium">Center:</span> {locationName}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Controls (bottom panel) */}
      <div ref={mobilePanelRef} data-testid="dt-mobile-panel" className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_12px_-2px_rgba(15,23,42,0.08)] p-4 z-[1000]">
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <LocationSearchInput
              value={searchValue}
              onValueChange={setSearchValue}
              onSelectLocation={(s: GeocodingResult) => {
                setSearchValue(s.displayName);
                const newCenter: [number, number] = [s.lat, s.lng];
                setCenter(newCenter);
                setLocationName(s.displayName.split(',').slice(0, 2).join(','));
                if (mapRef.current) mapRef.current.setView(newCenter, 12);
              }}
              onSubmit={handleSearch}
              placeholder="Search address..."
              inputClassName="w-full pr-3 py-2 text-sm border border-slate-200 rounded-lg"
              disabled={isSearching}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
          >
            Go
          </button>
        </div>
        <button
          onClick={handleUseLocation}
          disabled={isSearching}
          className="w-full mb-3 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Detecting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" />
              </svg>
              Use My Location
            </>
          )}
        </button>
        <div className="flex gap-2 mb-3">
          {availableModes.map((m) => (
            <button
              key={m}
              data-testid={`dt-mode-${m}`}
              aria-pressed={mode === m}
              onClick={() => changeMode(m)}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg ${
                mode === m ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {MODE_CONFIG[m].icon} {MODE_CONFIG[m].label}
            </button>
          ))}
        </div>
        {/* Time presets — buttons are easier to tap than a slider on a phone. Same ladder as the
            desktop panel; over-cap presets are disabled per mode. Wraps to two rows (grid-cols-4);
            the panel scrolls if the content runs tall. */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-700">Travel time</span>
          <span className="text-xs text-slate-400">max {maxTime} min</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {TIME_PRESETS.map((t) => {
            const over = t > maxTime;
            return (
              <button
                key={t}
                data-testid={`dt-time-${t}`}
                type="button"
                onClick={() => setTime(t)}
                disabled={over}
                aria-disabled={over}
                aria-pressed={time === t}
                title={over ? `Too long for ${MODE_CONFIG[mode].label.toLowerCase()} on the free server` : undefined}
                className={`min-h-[36px] px-1 text-xs font-semibold rounded-lg transition-colors ${
                  over
                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                    : time === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 active:bg-slate-200'
                }`}
              >
                {t >= 60 ? `${t / 60}hr` : `${t}min`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
