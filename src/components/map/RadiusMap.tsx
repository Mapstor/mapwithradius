'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fromMeters, DistanceUnit, calculateCircleArea, formatDistance, formatArea } from '@/lib/haversine';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface RadiusCircle {
  id: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  color: string;
  unit: DistanceUnit;
}

interface RadiusMapProps {
  circles: RadiusCircle[];
  selectedCircleId: string | null;
  currentRadius: number;
  currentUnit: DistanceUnit;
  currentColor: string;
  onCircleUpdate: (id: string, lat: number, lng: number, radiusMeters?: number) => void;
  onCircleSelect: (id: string | null) => void;
  onMapClick: (lat: number, lng: number) => void;
  onRadiusChange: (radius: number) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
  skipAutoGeolocation?: boolean;
}

// Min/max radius constants (in meters)
const MIN_RADIUS = 160.934; // 0.1 miles
const MAX_RADIUS = 804672;  // 500 miles

export default function RadiusMap({
  circles,
  selectedCircleId,
  currentRadius,
  currentUnit,
  currentColor,
  onCircleUpdate,
  onCircleSelect,
  onMapClick,
  onRadiusChange,
  mapRef,
  skipAutoGeolocation = false,
}: RadiusMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleLayersRef = useRef<Map<string, { circle: L.Circle; centerMarker: L.CircleMarker; edgeMarker: L.CircleMarker }>>(new Map());
  const userLocationMarkerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Drag state refs
  const isDraggingCenterRef = useRef<string | null>(null);
  const isDraggingEdgeRef = useRef<string | null>(null);

  // Refs for callbacks to avoid stale closures
  const onMapClickRef = useRef(onMapClick);
  const onCircleUpdateRef = useRef(onCircleUpdate);
  const onCircleSelectRef = useRef(onCircleSelect);
  const onRadiusChangeRef = useRef(onRadiusChange);
  const currentUnitRef = useRef(currentUnit);
  const circlesRef = useRef(circles);

  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onCircleUpdateRef.current = onCircleUpdate; }, [onCircleUpdate]);
  useEffect(() => { onCircleSelectRef.current = onCircleSelect; }, [onCircleSelect]);
  useEffect(() => { onRadiusChangeRef.current = onRadiusChange; }, [onRadiusChange]);
  useEffect(() => { currentUnitRef.current = currentUnit; }, [currentUnit]);
  useEffect(() => { circlesRef.current = circles; }, [circles]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter: L.LatLngExpression = [39.8283, -98.5795];
    const defaultZoom = 4;

    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Handle map clicks - only if not dragging
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!isDraggingCenterRef.current && !isDraggingEdgeRef.current) {
        onMapClickRef.current(e.latlng.lat, e.latlng.lng);
      }
    });

    // Global mousemove handler for drag operations
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      handleMouseMove(e.latlng);
    });

    // Global mouseup handler to end drag operations
    map.on('mouseup', () => {
      handleMouseUp();
    });

    // Touch support
    map.on('touchmove', (e: L.LeafletEvent) => {
      const touchEvent = e as unknown as { touches: TouchList; originalEvent: TouchEvent };
      if (touchEvent.touches && touchEvent.touches.length === 1) {
        const touch = touchEvent.touches[0];
        const latlng = map.containerPointToLatLng(L.point(touch.clientX - map.getContainer().getBoundingClientRect().left, touch.clientY - map.getContainer().getBoundingClientRect().top));
        handleMouseMove(latlng);
      }
    });

    map.on('touchend', () => {
      handleMouseUp();
    });

    mapRef.current = map;
    setIsMapReady(true);

    // Auto-geolocation
    if (navigator.geolocation && !skipAutoGeolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!mapRef.current || !containerRef.current) return;
          const { latitude, longitude } = position.coords;
          mapRef.current.setView([latitude, longitude], 13);

          const pulsingIcon = L.divIcon({
            className: 'user-location-marker',
            html: `
              <div class="user-location-dot">
                <div class="user-location-pulse"></div>
                <div class="user-location-center"></div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          userLocationMarkerRef.current = L.marker([latitude, longitude], {
            icon: pulsingIcon,
            zIndexOffset: 500,
            interactive: false,
          }).addTo(mapRef.current);
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapRef, skipAutoGeolocation]);

  // Handle mouse move during drag
  const handleMouseMove = useCallback((latlng: L.LatLng) => {
    const map = mapRef.current;
    if (!map) return;

    // CENTER DRAG: Move the entire circle
    if (isDraggingCenterRef.current) {
      const layers = circleLayersRef.current.get(isDraggingCenterRef.current);
      if (layers) {
        const { circle, centerMarker, edgeMarker } = layers;
        const currentRadius = circle.getRadius();

        // Update circle position
        circle.setLatLng(latlng);

        // Update center marker position
        centerMarker.setLatLng(latlng);

        // Update edge marker to north point of circle
        const edgePoint = calculateNorthPoint(latlng.lat, latlng.lng, currentRadius);
        edgeMarker.setLatLng([edgePoint.lat, edgePoint.lng]);

        // Update state in real-time
        onCircleUpdateRef.current(isDraggingCenterRef.current, latlng.lat, latlng.lng, currentRadius);
      }
    }

    // EDGE DRAG: Resize the circle
    if (isDraggingEdgeRef.current) {
      const layers = circleLayersRef.current.get(isDraggingEdgeRef.current);
      if (layers) {
        const { circle, edgeMarker } = layers;
        const center = circle.getLatLng();

        // Calculate new radius from center to mouse position
        let newRadius = center.distanceTo(latlng);

        // Clamp radius
        newRadius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, newRadius));

        // Update circle radius
        circle.setRadius(newRadius);

        // Edge marker follows mouse exactly during drag
        edgeMarker.setLatLng(latlng);

        // Update radius input in real-time with proper formatting
        const radiusInUnit = fromMeters(newRadius, currentUnitRef.current);
        const formatted = radiusInUnit >= 10
          ? Math.round(radiusInUnit)
          : Math.round(radiusInUnit * 10) / 10;
        onRadiusChangeRef.current(formatted);

        // Update state
        onCircleUpdateRef.current(isDraggingEdgeRef.current, center.lat, center.lng, newRadius);
      }
    }
  }, []);

  // Handle mouse up to end drag
  const handleMouseUp = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // End center drag
    if (isDraggingCenterRef.current) {
      const layers = circleLayersRef.current.get(isDraggingCenterRef.current);
      if (layers) {
        const center = layers.circle.getLatLng();
        const radius = layers.circle.getRadius();
        onCircleUpdateRef.current(isDraggingCenterRef.current, center.lat, center.lng, radius);
      }
      isDraggingCenterRef.current = null;
      map.dragging.enable();
      document.body.style.cursor = '';
    }

    // End edge drag - snap edge marker to north point
    if (isDraggingEdgeRef.current) {
      const layers = circleLayersRef.current.get(isDraggingEdgeRef.current);
      if (layers) {
        const center = layers.circle.getLatLng();
        const radius = layers.circle.getRadius();

        // Snap edge marker to north point
        const edgePoint = calculateNorthPoint(center.lat, center.lng, radius);
        layers.edgeMarker.setLatLng([edgePoint.lat, edgePoint.lng]);

        onCircleUpdateRef.current(isDraggingEdgeRef.current, center.lat, center.lng, radius);
      }
      isDraggingEdgeRef.current = null;
      map.dragging.enable();
      document.body.style.cursor = '';
    }
  }, []);

  // Create popup content for a circle
  const createPopupContent = useCallback((circle: RadiusCircle) => {
    const radiusInUnit = fromMeters(circle.radiusMeters, circle.unit);
    const area = calculateCircleArea(radiusInUnit, circle.unit);

    return `
      <div class="text-sm">
        <p class="font-medium mb-1">Circle Info</p>
        <p>Center: ${circle.lat.toFixed(6)}, ${circle.lng.toFixed(6)}</p>
        <p>Radius: ${formatDistance(radiusInUnit, circle.unit)}</p>
        <p>Area: ${formatArea(area, circle.unit)}</p>
      </div>
    `;
  }, []);

  // Update circles on the map
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    const map = mapRef.current;
    const existingIds = new Set(circles.map((c) => c.id));

    // Remove circles that no longer exist
    circleLayersRef.current.forEach((layers, id) => {
      if (!existingIds.has(id)) {
        layers.circle.remove();
        layers.centerMarker.remove();
        layers.edgeMarker.remove();
        circleLayersRef.current.delete(id);
      }
    });

    // Add or update circles
    circles.forEach((circleData) => {
      const existing = circleLayersRef.current.get(circleData.id);
      const radiusMeters = circleData.radiusMeters > 0 ? circleData.radiusMeters : 16093.44;

      if (existing) {
        // Skip updates if currently being dragged
        if (isDraggingCenterRef.current !== circleData.id && isDraggingEdgeRef.current !== circleData.id) {
          existing.circle.setLatLng([circleData.lat, circleData.lng]);
          existing.circle.setRadius(radiusMeters);
          existing.centerMarker.setLatLng([circleData.lat, circleData.lng]);

          const edgePoint = calculateNorthPoint(circleData.lat, circleData.lng, radiusMeters);
          existing.edgeMarker.setLatLng([edgePoint.lat, edgePoint.lng]);
        }

        // Update styles
        existing.circle.setStyle({
          color: circleData.color,
          fillColor: circleData.color,
          weight: circleData.id === selectedCircleId ? 3 : 2,
          opacity: 0.7,
          fillOpacity: 0.15,
        });

        existing.centerMarker.setStyle({
          fillColor: circleData.color,
          color: 'white',
        });

        existing.edgeMarker.setStyle({
          fillColor: 'white',
          color: circleData.color,
        });

        existing.circle.setPopupContent(createPopupContent(circleData));
      } else {
        // Create new circle
        const circle = L.circle([circleData.lat, circleData.lng], {
          radius: radiusMeters,
          color: circleData.color,
          fillColor: circleData.color,
          fillOpacity: 0.15,
          weight: 2,
          opacity: 0.7,
        }).addTo(map);

        circle.bindPopup(createPopupContent(circleData));

        circle.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          onCircleSelectRef.current(circleData.id);
        });

        // Create center marker (using CircleMarker, NOT draggable marker)
        const centerMarker = L.circleMarker([circleData.lat, circleData.lng], {
          radius: 8,
          fillColor: circleData.color,
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
          className: 'cursor-grab',
        }).addTo(map);

        // Center marker: mousedown/touchstart starts drag
        centerMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          isDraggingCenterRef.current = circleData.id;
          map.dragging.disable();
          document.body.style.cursor = 'grabbing';
          onCircleSelectRef.current(circleData.id);
        });

        centerMarker.on('touchstart', (e: L.LeafletEvent) => {
          L.DomEvent.stopPropagation(e as unknown as L.LeafletMouseEvent);
          isDraggingCenterRef.current = circleData.id;
          map.dragging.disable();
          onCircleSelectRef.current(circleData.id);
        });

        centerMarker.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          onCircleSelectRef.current(circleData.id);
        });

        // Create edge marker at north point
        const edgePoint = calculateNorthPoint(circleData.lat, circleData.lng, radiusMeters);
        const edgeMarker = L.circleMarker([edgePoint.lat, edgePoint.lng], {
          radius: 6,
          fillColor: 'white',
          color: circleData.color,
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
          className: 'cursor-ew-resize',
        }).addTo(map);

        // Edge marker: mousedown/touchstart starts resize
        edgeMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          isDraggingEdgeRef.current = circleData.id;
          map.dragging.disable();
          document.body.style.cursor = 'ew-resize';
          onCircleSelectRef.current(circleData.id);
        });

        edgeMarker.on('touchstart', (e: L.LeafletEvent) => {
          L.DomEvent.stopPropagation(e as unknown as L.LeafletMouseEvent);
          isDraggingEdgeRef.current = circleData.id;
          map.dragging.disable();
          onCircleSelectRef.current(circleData.id);
        });

        circleLayersRef.current.set(circleData.id, {
          circle,
          centerMarker,
          edgeMarker,
        });
      }
    });
  }, [circles, selectedCircleId, isMapReady, createPopupContent, mapRef]);

  // Add CSS for custom cursors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-grab { cursor: grab !important; }
      .cursor-grab:active { cursor: grabbing !important; }
      .cursor-ew-resize { cursor: ew-resize !important; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[60vh] lg:h-[75vh] overflow-hidden"
      style={{ minHeight: '300px' }}
    />
  );
}

// Calculate north point of circle (for edge marker)
function calculateNorthPoint(lat: number, lng: number, radiusMeters: number): { lat: number; lng: number } {
  const earthRadius = 6371000; // meters
  const angularDistance = radiusMeters / earthRadius;
  const lat1 = (lat * Math.PI) / 180;

  // North direction: bearing = 0
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance)
  );

  return {
    lat: (lat2 * 180) / Math.PI,
    lng: lng, // Longitude stays the same for north direction
  };
}
