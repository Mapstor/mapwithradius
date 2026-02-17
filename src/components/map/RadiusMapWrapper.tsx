'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MapControls from './MapControls';
import { DistanceUnit, toMeters, fromMeters, calculateCircleArea, formatDistance, formatArea } from '@/lib/haversine';
import { downloadKML } from '@/lib/kmlExport';
import { generateShareUrl, parseUrlParams, CircleParams } from '@/lib/urlParams';
import type { RadiusCircle } from './RadiusMap';
import type L from 'leaflet';

// Dynamic import for RadiusMap (Leaflet doesn't work with SSR)
const RadiusMap = dynamic(() => import('./RadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] lg:h-[75vh] bg-slate-100 flex items-center justify-center">
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
      // If we have a selected circle, move it; otherwise create a new one
      if (selectedCircleId && !isAddingCircle) {
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
      } else {
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
      }

      // Center map on location
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], 12);
      }
    },
    [selectedCircleId, isAddingCircle, radius, unit, color]
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
  }, []);

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

  return (
    <div className="relative">
      {/* Status messages */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg">
          {locationError}
        </div>
      )}

      {isAddingCircle && circles.length === 0 && !tooltipDismissed && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          Click on the map or search for a location to draw your radius
        </div>
      )}

      {isAddingCircle && circles.length > 0 && !tooltipDismissed && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          Click on the map to add another circle
        </div>
      )}

      {/* Circle Info Box */}
      {selectedCircleId && (() => {
        const selectedCircle = circles.find((c) => c.id === selectedCircleId);
        if (!selectedCircle) return null;

        const radiusMiles = fromMeters(selectedCircle.radiusMeters, 'miles');
        const radiusKm = fromMeters(selectedCircle.radiusMeters, 'kilometers');
        const areaMiles = calculateCircleArea(radiusMiles, 'miles');
        const areaKm = calculateCircleArea(radiusKm, 'kilometers');

        return (
          <div className="absolute bottom-20 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 text-sm min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-900">Circle Info</span>
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: selectedCircle.color }}
              />
            </div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Radius:</span>
                <span className="font-medium text-slate-900">
                  {formatDistance(radiusMiles, 'miles')} / {formatDistance(radiusKm, 'kilometers')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="font-medium text-slate-900">
                  {formatArea(areaMiles, 'miles')} / {formatArea(areaKm, 'kilometers')}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Map container with overlapping controls */}
      <div className="relative">
        {/* Map - Full width on desktop */}
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

        {/* Controls - Overlapping card on desktop, below on mobile */}
        <div className="lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:z-[500] mt-4 lg:mt-0 px-4 lg:px-0">
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
      </div>
    </div>
  );
}
