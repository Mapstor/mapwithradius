'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MapControls from './MapControls';
import MobileBottomSheet from './MobileBottomSheet';
import { DistanceUnit, toMeters, fromMeters, calculateCircleArea, formatDistance, formatArea } from '@/lib/haversine';
import { downloadKML } from '@/lib/kmlExport';
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
  initialParams?: string;
}

export default function RadiusMapWrapper({ defaultUnit = 'miles', initialParams }: RadiusMapWrapperProps) {
  const [circles, setCircles] = useState<RadiusCircle[]>([]);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  const [radius, setRadius] = useState(10);
  const [unit, setUnit] = useState<DistanceUnit>(defaultUnit);
  const [color, setColor] = useState('#4285F4');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isAddingCircle, setIsAddingCircle] = useState(true); // Start in "add mode"
  const [hasUrlParams, setHasUrlParams] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileSheetExpanded, setIsMobileSheetExpanded] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

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
          // Extend bounds by the largest radius
          const maxRadius = Math.max(...newCircles.map((c) => c.radiusMeters));
          const paddingDegrees = maxRadius / 111000; // Rough conversion
          bounds.pad(0.2);
          mapRef.current.fitBounds(bounds);
        }
      }, 500);
    }

    // Handle locate param
    if (params.locate) {
      handleUseMyLocation();
    }
  }, []);

  // Helper to fit map to circle bounds - gentle zoom that shows context around the circle
  const fitToCircle = useCallback((lat: number, lng: number, radiusMeters: number) => {
    if (!mapRef.current) return;

    const L = (window as unknown as { L: typeof import('leaflet') }).L;
    const map = mapRef.current;
    const center = L.latLng(lat, lng);

    // Check if circle fits in current view
    const circleBounds = center.toBounds(radiusMeters * 2);
    const currentBounds = map.getBounds();
    const circleIsVisible = currentBounds.contains(circleBounds);

    if (circleIsVisible) {
      // Circle fits - just pan to center it, don't change zoom
      map.panTo(center, { animate: true, duration: 0.25 });
    } else {
      // Circle doesn't fit - zoom out to show it with generous padding
      const paddedBounds = center.toBounds(radiusMeters * 2.5);
      map.fitBounds(paddedBounds, {
        padding: [60, 60],
        animate: true,
        duration: 0.3
      });
    }
  }, []);

  // Update selected circle when radius/unit/color changes
  useEffect(() => {
    if (!selectedCircleId) return;

    const newRadiusMeters = toMeters(radius, unit);

    setCircles((prev) => {
      const selectedCircle = prev.find((c) => c.id === selectedCircleId);

      // Fit map to the updated circle - but NOT during drag operations
      if (selectedCircle && !isDragging) {
        // Use setTimeout to avoid calling during render
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
      // Dismiss tooltip permanently after first interaction
      setTooltipDismissed(true);
      // Collapse mobile sheet when interacting with map
      setIsMobileSheetExpanded(false);

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

        setCircles((prev) => [...prev, newCircle]);
        setSelectedCircleId(newCircle.id);
        setIsAddingCircle(false);

        // Zoom to fit the new circle
        fitToCircle(lat, lng, newCircle.radiusMeters);
      } else if (circles.length > 0) {
        // Move the existing circle (selected or first one)
        const targetId = selectedCircleId || circles[0].id;
        const targetCircle = circles.find((c) => c.id === targetId);

        setCircles((prev) =>
          prev.map((c) =>
            c.id === targetId
              ? { ...c, lat, lng }
              : c
          )
        );
        setSelectedCircleId(targetId);

        // Zoom to fit the moved circle
        if (targetCircle) {
          fitToCircle(lat, lng, targetCircle.radiusMeters);
        }
      }
    },
    [isAddingCircle, radius, unit, color, circles, selectedCircleId, fitToCircle]
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

      if (id) {
        const circle = circles.find((c) => c.id === id);
        if (circle) {
          setRadius(Math.round(fromMeters(circle.radiusMeters, circle.unit) * 100) / 100);
          setUnit(circle.unit);
          setColor(circle.color);
        }
      }
    },
    [circles]
  );

  const handleLocationSearch = useCallback(
    (lat: number, lng: number, displayName: string) => {
      // Collapse mobile sheet after search
      setIsMobileSheetExpanded(false);

      // If we have a selected circle, move it; otherwise create a new one
      if (selectedCircleId && !isAddingCircle) {
        const existingCircle = circles.find((c) => c.id === selectedCircleId);
        setCircles((prev) =>
          prev.map((c) =>
            c.id === selectedCircleId
              ? {
                  ...c,
                  lat,
                  lng,
                }
              : c
          )
        );
        // Zoom to fit the moved circle
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
        // Zoom to fit the new circle
        fitToCircle(lat, lng, newRadiusMeters);
      }
    },
    [selectedCircleId, isAddingCircle, radius, unit, color, circles, fitToCircle]
  );

  const handleUseMyLocation = useCallback(() => {
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
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [handleLocationSearch]);

  const handleAddCircle = useCallback(() => {
    setIsAddingCircle(true);
    setSelectedCircleId(null);
    setIsMobileSheetExpanded(false);
  }, []);

  const handleClearAll = useCallback(() => {
    setCircles([]);
    setSelectedCircleId(null);
    setIsAddingCircle(true);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setIsMobileSheetExpanded(false);
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
      // Use html2canvas to capture the map
      const html2canvas = (await import('html2canvas')).default;
      const mapContainer = mapRef.current.getContainer();

      const canvas = await html2canvas(mapContainer, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Download the image
      const link = document.createElement('a');
      link.download = 'radius-map.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
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

  // Get selected circle info for the info card
  const selectedCircle = selectedCircleId ? circles.find((c) => c.id === selectedCircleId) : null;
  const circleInfo = selectedCircle ? {
    radiusMiles: fromMeters(selectedCircle.radiusMeters, 'miles'),
    radiusKm: fromMeters(selectedCircle.radiusMeters, 'kilometers'),
    areaMiles: calculateCircleArea(fromMeters(selectedCircle.radiusMeters, 'miles'), 'miles'),
    areaKm: calculateCircleArea(fromMeters(selectedCircle.radiusMeters, 'kilometers'), 'kilometers'),
    color: selectedCircle.color,
  } : null;

  return (
    <div className="relative">
      {/* Status messages */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg max-w-[90vw]">
          {locationError}
        </div>
      )}

      {isAddingCircle && circles.length === 0 && !tooltipDismissed && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm max-w-[90vw] text-center">
          <span className="hidden sm:inline">Click on the map or search for a location to draw your radius</span>
          <span className="sm:hidden">Tap the map or search to draw radius</span>
        </div>
      )}

      {isAddingCircle && circles.length > 0 && !tooltipDismissed && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          <span className="hidden sm:inline">Click on the map to add another circle</span>
          <span className="sm:hidden">Tap to add another circle</span>
        </div>
      )}

      {/* Circle Info Card - Desktop: bottom-left, Mobile: top-left */}
      {circleInfo && (
        <div className="absolute top-4 left-3 lg:bottom-20 lg:top-auto z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 text-sm min-w-[180px] lg:min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-900">Circle Info</span>
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: circleInfo.color }}
            />
          </div>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between gap-3">
              <span>Radius:</span>
              <span className="font-medium text-slate-900 text-right">
                <span className="block lg:inline">{formatDistance(circleInfo.radiusMiles, 'miles')}</span>
                <span className="text-slate-400 mx-1 hidden lg:inline">/</span>
                <span className="block lg:inline text-slate-500 lg:text-slate-900">{formatDistance(circleInfo.radiusKm, 'kilometers')}</span>
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Area:</span>
              <span className="font-medium text-slate-900 text-right">
                <span className="block lg:inline">{formatArea(circleInfo.areaMiles, 'miles')}</span>
                <span className="text-slate-400 mx-1 hidden lg:inline">/</span>
                <span className="block lg:inline text-slate-500 lg:text-slate-900">{formatArea(circleInfo.areaKm, 'kilometers')}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="relative">
        {/* Map - Full height on mobile, fixed height on desktop */}
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
            skipAutoGeolocation={hasUrlParams}
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
          />
        </div>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden">
          <MobileBottomSheet
            isExpanded={isMobileSheetExpanded}
            onToggle={() => setIsMobileSheetExpanded(!isMobileSheetExpanded)}
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
          />
        </div>
      </div>
    </div>
  );
}
