'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MapControls from './MapControls';
import MobileBottomSheet from './MobileBottomSheet';
import { DistanceUnit, toMeters, fromMeters, calculateCircleArea, formatDistance, formatArea } from '@/lib/haversine';
import { downloadKML } from '@/lib/kmlExport';
import { shareOrDownloadFile } from '@/lib/shareDownload';
import { generateShareUrl, parseUrlParams, CircleParams } from '@/lib/urlParams';
import type { RadiusCircle } from './RadiusMap';
import type L from 'leaflet';

// Dynamic import for RadiusMap (Leaflet doesn't work with SSR)
const RadiusMap = dynamic(() => import('./RadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-120px)] lg:h-[75vh] bg-slate-100 flex items-center justify-center">
      <div className="text-slate-500">Loading map...</div>
    </div>
  ),
});

interface RadiusMapWrapperProps {
  defaultUnit?: DistanceUnit;
  defaultRadius?: number;
  initialCenter?: { lat: number; lng: number };
  /**
   * Homepage-only: on load with no share-URL state and no initialCenter, draw a starter
   * circle so the tool is immediately "alive". If geolocation is ALREADY granted we place a
   * 1-unit circle at the user's location (never prompting); otherwise a `defaultRadius`
   * circle at the default map center. The wrapper then owns load-time geolocation, so the
   * inner map's auto-geolocation is skipped to avoid a double request / marker overlap.
   */
  defaultCircleOnLoad?: boolean;
}

// Geographic center of the contiguous US — the inner map's initial view. Used as the
// fallback center for the default circle when geolocation isn't already granted.
const DEFAULT_MAP_CENTER = { lat: 39.8283, lng: -98.5795 };

export default function RadiusMapWrapper({ defaultUnit = 'miles', defaultRadius = 10, initialCenter, defaultCircleOnLoad = false }: RadiusMapWrapperProps) {
  const [circles, setCircles] = useState<RadiusCircle[]>([]);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  const [radius, setRadius] = useState(defaultRadius);
  const [unit, setUnit] = useState<DistanceUnit>(defaultUnit);
  const [color, setColor] = useState('#4285F4');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isAddingCircle, setIsAddingCircle] = useState(true); // Start in "add mode"
  const [hasUrlParams, setHasUrlParams] = useState(false);
  // Homepage only: gate the radar-pulse invite. It starts suppressed so the starter circle
  // (which usually resolves in well under a second) replaces it with no flash; a short grace
  // timer then re-enables it, so a slow geolocation fix shows the pulse as a "locating" state
  // instead of a dead empty map, and it also returns if the user later clears every circle.
  const [inviteAllowed, setInviteAllowed] = useState(!defaultCircleOnLoad);
  const [isDragging, setIsDragging] = useState(false);
  // Phase 2 UI state
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [toolInView, setToolInView] = useState(true);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);
  const [collapseSignal, setCollapseSignal] = useState(0); // ++ on map tap → sheet drops to peek
  const mapRef = useRef<L.Map | null>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useRef(0);

  const markInteracted = useCallback(() => setHasInteracted(true), []);

  const showToast = useCallback((msg: string) => {
    toastId.current += 1;
    setToast({ msg, id: toastId.current });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // Hide the mobile sheet + invitation once the tool scrolls out of view.
  useEffect(() => {
    const el = toolRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => setToolInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Parse URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const params = parseUrlParams(searchParams);

    if (params.circles.length > 0) {
      setHasUrlParams(true);
      const newCircles: RadiusCircle[] = params.circles.map((cp, index) => ({
        id: `circle-${Date.now()}-${index}`,
        lat: cp.lat,
        lng: cp.lng,
        radiusMeters: toMeters(cp.radius, cp.unit),
        color: cp.color,
        unit: cp.unit,
      }));
      setCircles(newCircles);
      setIsAddingCircle(false);
      markInteracted(); // a shared link already has a circle → stop the desktop search glow

      // Update UI to match first circle
      if (params.circles[0]) {
        setRadius(params.circles[0].radius);
        setUnit(params.circles[0].unit);
        setColor(params.circles[0].color);
        setSelectedCircleId(newCircles[0].id);
      }

      // Fit map to circles after a short delay
      setTimeout(() => {
        if (mapRef.current && newCircles.length > 0) {
          const bounds = new (window as unknown as { L: typeof L }).L.LatLngBounds(
            newCircles.map((c) => [c.lat, c.lng] as [number, number])
          );
          bounds.pad(0.2);
          mapRef.current.fitBounds(bounds);
        }
      }, 500);
    }

    // Handle locate param
    if (params.locate) {
      handleUseMyLocation();
    }

    // Fallback to initialCenter prop if no URL circles were provided
    if (params.circles.length === 0 && initialCenter) {
      const radiusMeters = toMeters(defaultRadius, defaultUnit);
      const newCircle: RadiusCircle = {
        id: `circle-${Date.now()}`,
        lat: initialCenter.lat,
        lng: initialCenter.lng,
        radiusMeters,
        color: '#4285F4',
        unit: defaultUnit,
      };
      setCircles([newCircle]);
      setSelectedCircleId(newCircle.id);
      setIsAddingCircle(false);
      markInteracted(); // prefilled center already has a circle → stop the desktop search glow
      setTimeout(() => fitToCircle(initialCenter.lat, initialCenter.lng, radiusMeters), 500);
    }

    // Homepage starter circle — only when nothing else supplied one (no share URL, no
    // initialCenter, no ?locate). Makes the tool immediately "alive" above the fold.
    if (defaultCircleOnLoad && params.circles.length === 0 && !initialCenter && !params.locate) {
      const place = (lat: number, lng: number, radiusInUnit: number) => {
        const radiusMeters = toMeters(radiusInUnit, defaultUnit);
        const newCircle: RadiusCircle = {
          id: `circle-${Date.now()}`,
          lat,
          lng,
          radiusMeters,
          color: '#4285F4',
          unit: defaultUnit,
        };
        setCircles([newCircle]);
        setSelectedCircleId(newCircle.id);
        setRadius(radiusInUnit);
        setIsAddingCircle(false);
        // Note: no markInteracted() — the default circle is auto-drawn, so the desktop
        // search glow keeps inviting the user to search/interact.
        setTimeout(() => fitToCircle(lat, lng, radiusMeters), 500);
      };

      // Permissions API ONLY — never prompt on load. Granted → a 1-unit circle at the
      // user's location (getCurrentPosition won't prompt once granted); prompt/denied/
      // unknown/unsupported → a defaultRadius circle at the default map center.
      const permissions = (navigator as Navigator & { permissions?: Permissions }).permissions;
      if (permissions?.query && navigator.geolocation) {
        permissions
          .query({ name: 'geolocation' as PermissionName })
          .then((status) => {
            if (status.state === 'granted') {
              navigator.geolocation.getCurrentPosition(
                (pos) => place(pos.coords.latitude, pos.coords.longitude, 1),
                () => place(DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng, defaultRadius),
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
              );
            } else {
              place(DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng, defaultRadius);
            }
          })
          .catch(() => place(DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng, defaultRadius));
      } else {
        place(DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng, defaultRadius);
      }
    }
  }, []);

  // Homepage: re-enable the radar-pulse invite shortly after mount. The starter circle
  // normally draws first (hiding the invite via circles.length), so this only surfaces the
  // pulse when geolocation is still resolving — a "locating" state, never a dead empty map.
  useEffect(() => {
    if (!defaultCircleOnLoad) return;
    const t = setTimeout(() => setInviteAllowed(true), 700);
    return () => clearTimeout(t);
  }, [defaultCircleOnLoad]);

  // Frame the map to a circle: comfortable ~4× context, but never so far out that the
  // drawn circle shrinks below the Phase-1 visibility floor of 60px across.
  const fitToCircle = useCallback((lat: number, lng: number, radiusMeters: number) => {
    if (!mapRef.current) return;

    const L = (window as unknown as { L: typeof import('leaflet') }).L;
    const map = mapRef.current;
    const center = L.latLng(lat, lng);

    // Comfortable 4× context, capped so a large circle doesn't slam to street level…
    const paddedBounds = center.toBounds(radiusMeters * 4);
    const fitZoom = Math.min(14, map.getBoundsZoom(paddedBounds, false, L.point(40, 40)));

    // …but zoom in further if needed so the circle is always ≥ 60px in diameter.
    // meters/pixel at zoom z = C / 2^z, so diameter_px = 2·r·2^z / C ≥ 60 ⇒ z ≥ log2(30·C/r).
    // Ceil to the next integer so zoom-snapping can't leave us a hair under the threshold.
    const C = (40075016.686 * Math.cos((lat * Math.PI) / 180)) / 256; // meters/pixel at zoom 0
    const minVisibleZoom = Math.ceil(Math.log2((30 * C) / radiusMeters));
    const zoom = Math.min(map.getMaxZoom(), Math.max(fitZoom, minVisibleZoom));

    map.setView(center, zoom, { animate: true, duration: 0.3 });
  }, []);

  // Update selected circle when radius/unit/color changes
  useEffect(() => {
    if (!selectedCircleId) return;

    const newRadiusMeters = toMeters(radius, unit);

    setCircles((prev) => {
      const selectedCircle = prev.find((c) => c.id === selectedCircleId);

      // Fit map to the updated circle - but NOT during drag operations
      if (selectedCircle && !isDragging) {
        setTimeout(() => {
          fitToCircle(selectedCircle.lat, selectedCircle.lng, newRadiusMeters);
        }, 0);
      }

      return prev.map((c) =>
        c.id === selectedCircleId
          ? {
              ...c,
              radiusMeters: newRadiusMeters,
              color,
              unit,
            }
          : c
      );
    });
  }, [radius, unit, color, selectedCircleId, fitToCircle, isDragging]);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      markInteracted();
      setCollapseSignal((s) => s + 1); // map-first: collapse the mobile sheet to peek

      if (isAddingCircle) {
        // Create a new circle
        const newCircle: RadiusCircle = {
          id: `circle-${Date.now()}`,
          lat,
          lng,
          radiusMeters: toMeters(radius, unit),
          color,
          unit,
        };

        showToast(circles.length === 0 ? 'Drag the white dot to resize' : `Circle ${circles.length + 1} added`);
        setCircles((prev) => [...prev, newCircle]);
        setSelectedCircleId(newCircle.id);
        setIsAddingCircle(false);

        fitToCircle(lat, lng, newCircle.radiusMeters);
      } else if (circles.length > 0) {
        // Move the existing circle (selected or first one)
        const targetId = selectedCircleId || circles[0].id;
        const targetCircle = circles.find((c) => c.id === targetId);

        setCircles((prev) =>
          prev.map((c) => (c.id === targetId ? { ...c, lat, lng } : c))
        );
        setSelectedCircleId(targetId);

        if (targetCircle) {
          fitToCircle(lat, lng, targetCircle.radiusMeters);
        }
      }
    },
    [isAddingCircle, radius, unit, color, circles, selectedCircleId, fitToCircle, markInteracted, showToast]
  );

  const handleCircleUpdate = useCallback((id: string, lat: number, lng: number, radiusMeters?: number) => {
    setCircles((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              lat,
              lng,
              radiusMeters: radiusMeters ?? c.radiusMeters,
            }
          : c
      )
    );
  }, []);

  const handleCircleSelect = useCallback(
    (id: string | null) => {
      setSelectedCircleId(id);
      setIsAddingCircle(false);
      markInteracted();

      if (id) {
        const circle = circles.find((c) => c.id === id);
        if (circle) {
          setRadius(Math.round(fromMeters(circle.radiusMeters, circle.unit) * 100) / 100);
          setUnit(circle.unit);
          setColor(circle.color);
        }
      }
    },
    [circles, markInteracted]
  );

  const handleDeleteCircle = useCallback(
    (id: string) => {
      const remaining = circles.filter((c) => c.id !== id);
      setCircles(remaining);
      // If we removed the active circle, fall back to another so the controls keep driving a real circle.
      if (selectedCircleId === id) {
        const next = remaining[remaining.length - 1] ?? null;
        setSelectedCircleId(next ? next.id : null);
        if (next) {
          setRadius(Math.round(fromMeters(next.radiusMeters, next.unit) * 100) / 100);
          setUnit(next.unit);
          setColor(next.color);
        }
      }
    },
    [circles, selectedCircleId]
  );

  const handleLocationSearch = useCallback(
    (lat: number, lng: number, displayName: string) => {
      markInteracted();

      if (selectedCircleId && !isAddingCircle) {
        const existingCircle = circles.find((c) => c.id === selectedCircleId);
        setCircles((prev) =>
          prev.map((c) => (c.id === selectedCircleId ? { ...c, lat, lng } : c))
        );
        if (existingCircle) {
          fitToCircle(lat, lng, existingCircle.radiusMeters);
        }
      } else {
        const newRadiusMeters = toMeters(radius, unit);
        const newCircle: RadiusCircle = {
          id: `circle-${Date.now()}`,
          lat,
          lng,
          radiusMeters: newRadiusMeters,
          color,
          unit,
        };
        setCircles((prev) => [...prev, newCircle]);
        setSelectedCircleId(newCircle.id);
        setIsAddingCircle(false);
        fitToCircle(lat, lng, newRadiusMeters);
      }
    },
    [selectedCircleId, isAddingCircle, radius, unit, color, circles, fitToCircle, markInteracted]
  );

  const handleUseMyLocation = useCallback(() => {
    markInteracted();
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleLocationSearch(latitude, longitude, 'Your location');
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please search for an address instead.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please search for an address.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('Unable to get your location. Please search for an address.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [handleLocationSearch, markInteracted]);

  const handleAddCircle = useCallback(() => {
    setIsAddingCircle(true);
    setSelectedCircleId(null);
    markInteracted();
  }, [markInteracted]);

  const handleClearAll = useCallback(() => {
    setCircles([]);
    setSelectedCircleId(null);
    setIsAddingCircle(true);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleCopyLink = useCallback(() => {
    const circleParams: CircleParams[] = circles.map((c) => ({
      lat: c.lat,
      lng: c.lng,
      radius: fromMeters(c.radiusMeters, c.unit),
      unit: c.unit,
      color: c.color,
    }));

    const url = generateShareUrl(circleParams);
    navigator.clipboard.writeText(url);
  }, [circles]);

  const handleDownloadPNG = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      // useCORS + tile crossOrigin keep the canvas untainted (no allowTaint) so
      // toBlob() succeeds; the blob routes through the iOS-safe share/download path.
      const canvas = await html2canvas(mapRef.current.getContainer(), {
        useCORS: true,
        logging: false,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      if (!blob) throw new Error('Canvas produced no image data');
      await shareOrDownloadFile(blob, 'radius-map.png');
    } catch (error) {
      console.error('PNG export failed:', error);
      alert('Unable to export PNG. Please try again.');
    }
  }, []);

  const handleExportKML = useCallback(() => {
    const kmlCircles = circles.map((c) => ({
      id: c.id,
      lat: c.lat,
      lng: c.lng,
      radiusMeters: c.radiusMeters,
      color: c.color,
    }));
    downloadKML(kmlCircles);
  }, [circles]);

  const handleSearchOpenChange = useCallback((open: boolean) => setIsMobileSearchOpen(open), []);

  // Get selected circle info for the desktop info card
  const selectedCircle = selectedCircleId ? circles.find((c) => c.id === selectedCircleId) : null;
  const infoCardCircle = selectedCircle || circles[0] || null;
  const circleInfo = infoCardCircle
    ? {
        radiusMiles: fromMeters(infoCardCircle.radiusMeters, 'miles'),
        radiusKm: fromMeters(infoCardCircle.radiusMeters, 'kilometers'),
        areaMiles: calculateCircleArea(fromMeters(infoCardCircle.radiusMeters, 'miles'), 'miles'),
        areaKm: calculateCircleArea(fromMeters(infoCardCircle.radiusMeters, 'kilometers'), 'kilometers'),
        color: infoCardCircle.color,
      }
    : null;

  // On the homepage the starter circle replaces the radar-pulse invite; it's suppressed
  // until the grace timer elapses (see inviteAllowed) so there's no flash before the circle,
  // yet a slow geolocation fix still surfaces the pulse and it returns after a "Clear all".
  const showInvite = circles.length === 0 && !isMobileSearchOpen && toolInView && inviteAllowed;

  return (
    // #radius-tool marks the whole interactive tool (map + controls/sheet) as a Raptive
    // ad-exclusion zone so units are never auto-inserted into the touch surface.
    <div id="radius-tool" ref={toolRef} className="relative">
      {/* Status / error message (top-center) */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg max-w-[90vw]">
          {locationError}
        </div>
      )}

      {/* Transient toast (replaces the old blocking intro tooltip) */}
      {toast && (
        <div
          key={toast.id}
          className="mwr-toast lg:hidden pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-[1100] bg-primary-900 text-white text-[14.5px] font-medium px-[18px] py-[11px] rounded-[14px] shadow-lg max-w-[86vw] text-center"
        >
          {toast.msg}
        </div>
      )}

      {/* Circle Info Card — desktop only (mobile uses the sheet's pill + stats + the map's persistent radius pill) */}
      {circleInfo && (
        <div className="hidden lg:block absolute left-4 bottom-20 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 text-sm min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-900 text-sm">Circle Info</span>
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: circleInfo.color }}
            />
          </div>
          <div className="space-y-1.5 text-slate-600 text-sm">
            <div className="flex justify-between gap-3">
              <span>Radius:</span>
              <span className="font-medium text-slate-900 text-right">
                {formatDistance(circleInfo.radiusMiles, 'miles')}
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-900">{formatDistance(circleInfo.radiusKm, 'kilometers')}</span>
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Area:</span>
              <span className="font-medium text-slate-900 text-right">
                {formatArea(circleInfo.areaMiles, 'miles')}
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-900">{formatArea(circleInfo.areaKm, 'kilometers')}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="relative">
        {/* Empty-state invitation — radar pulse + label (mobile + desktop) */}
        {showInvite && (
          <div className="mwr-invite pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[400] text-center">
            <div className="mwr-invite-rings">
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-ring" />
              <span className="mwr-invite-core" />
            </div>
            <div className="mwr-invite-label">
              <span className="lg:hidden">Tap anywhere to draw a radius</span>
              <span className="hidden lg:inline">Click anywhere on the map — or search for a place</span>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="w-full">
          <RadiusMap
            circles={circles}
            selectedCircleId={selectedCircleId}
            currentRadius={radius}
            currentUnit={unit}
            currentColor={color}
            onCircleUpdate={handleCircleUpdate}
            onCircleSelect={handleCircleSelect}
            onMapClick={handleMapClick}
            onRadiusChange={setRadius}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            mapRef={mapRef}
            // When the wrapper draws the starter circle it also owns load-time geolocation,
            // so skip the inner map's auto-locate (avoids a second request + marker overlap).
            skipAutoGeolocation={hasUrlParams || defaultCircleOnLoad}
          />
        </div>

        {/* Desktop Controls - Overlapping card */}
        <div className="hidden lg:block absolute top-4 right-4 w-80 z-[500]">
          <MapControls
            radius={radius}
            unit={unit}
            color={color}
            onRadiusChange={setRadius}
            onUnitChange={setUnit}
            onColorChange={setColor}
            onLocationSearch={handleLocationSearch}
            onUseMyLocation={handleUseMyLocation}
            onAddCircle={handleAddCircle}
            onClearAll={handleClearAll}
            onCopyLink={handleCopyLink}
            onDownloadPNG={handleDownloadPNG}
            onExportKML={handleExportKML}
            circleCount={circles.length}
            isLocating={isLocating}
            highlightSearch={!hasInteracted}
          />
        </div>

        {/* Mobile Bottom Sheet (self-gates below 1024px; hidden when tool scrolled away) */}
        {toolInView && (
          <MobileBottomSheet
            circles={circles}
            selectedCircleId={selectedCircleId}
            radius={radius}
            unit={unit}
            color={color}
            isLocating={isLocating}
            onRadiusChange={setRadius}
            onUnitChange={setUnit}
            onColorChange={setColor}
            onLocationSearch={handleLocationSearch}
            onUseMyLocation={handleUseMyLocation}
            onNewCircle={handleAddCircle}
            onSelectCircle={handleCircleSelect}
            onDeleteCircle={handleDeleteCircle}
            onClearAll={handleClearAll}
            onCopyLink={handleCopyLink}
            onDownloadPNG={handleDownloadPNG}
            onExportKML={handleExportKML}
            onToast={showToast}
            onSearchOpenChange={handleSearchOpenChange}
            onAdjustStart={handleDragStart}
            onAdjustEnd={handleDragEnd}
            collapseSignal={collapseSignal}
          />
        )}
      </div>
    </div>
  );
}
