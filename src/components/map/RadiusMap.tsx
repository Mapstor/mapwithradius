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
  onDragStart?: () => void;
  onDragEnd?: () => void;
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
  onDragStart,
  onDragEnd,
  mapRef,
  skipAutoGeolocation = false,
}: RadiusMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleLayersRef = useRef<Map<string, { circle: L.Circle; centerMarker: L.Marker; edgeMarker: L.Marker }>>(new Map());
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
  const onDragStartRef = useRef(onDragStart);
  const onDragEndRef = useRef(onDragEnd);
  const currentUnitRef = useRef(currentUnit);
  const circlesRef = useRef(circles);

  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onCircleUpdateRef.current = onCircleUpdate; }, [onCircleUpdate]);
  useEffect(() => { onCircleSelectRef.current = onCircleSelect; }, [onCircleSelect]);
  useEffect(() => { onRadiusChangeRef.current = onRadiusChange; }, [onRadiusChange]);
  useEffect(() => { onDragStartRef.current = onDragStart; }, [onDragStart]);
  useEffect(() => { onDragEndRef.current = onDragEnd; }, [onDragEnd]);
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

    // Global mousemove handler for drag operations (desktop)
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      handleMouseMove(e.latlng);
    });

    // Global mouseup handler to end drag operations (desktop)
    map.on('mouseup', () => {
      handleMouseUp();
    });

    // =========================================
    // MOBILE TOUCH HANDLING - Pure DOM events
    // =========================================
    // Using document-level touch events for smooth, unthrottled handling
    // Do NOT use Leaflet's touch events - they can be throttled/delayed

    // Helper: Convert touch coordinates to LatLng
    const touchToLatLng = (touch: Touch): L.LatLng => {
      const rect = map.getContainer().getBoundingClientRect();
      const point = L.point(touch.clientX - rect.left, touch.clientY - rect.top);
      return map.containerPointToLatLng(point);
    };

    // Helper: Check if touch is on a center marker
    const getCenterMarkerCircleId = (target: HTMLElement, touch: Touch): string | null => {
      const centerMarkerIcon = target.closest('.center-marker-icon') as HTMLElement;
      const centerMarkerInner = target.closest('.center-marker-inner') as HTMLElement;

      if (centerMarkerIcon || centerMarkerInner) {
        // Try data attribute first
        const circleId = centerMarkerInner?.getAttribute('data-circle-id') ||
                        centerMarkerIcon?.getAttribute('data-circle-id');
        if (circleId && circleLayersRef.current.has(circleId)) {
          return circleId;
        }

        // Fallback: find closest by position
        const touchLatLng = touchToLatLng(touch);
        let closestId: string | null = null;
        let closestDist = Infinity;
        circleLayersRef.current.forEach((layers, id) => {
          const pos = layers.centerMarker.getLatLng();
          const dist = touchLatLng.distanceTo(pos);
          if (dist < closestDist) {
            closestDist = dist;
            closestId = id;
          }
        });
        return closestId;
      }
      return null;
    };

    // Helper: Check if touch is on or near an edge marker (within 30px)
    const getEdgeMarkerCircleId = (target: HTMLElement, touch: Touch): string | null => {
      const edgeMarkerIcon = target.closest('.edge-marker-icon') as HTMLElement;
      const edgeMarkerInner = target.closest('.edge-marker-inner') as HTMLElement;

      // Direct hit on edge marker element
      if (edgeMarkerIcon || edgeMarkerInner) {
        const circleId = edgeMarkerInner?.getAttribute('data-circle-id') ||
                        edgeMarkerIcon?.getAttribute('data-circle-id');
        if (circleId && circleLayersRef.current.has(circleId)) {
          return circleId;
        }
      }

      // Proximity check: find edge marker within 30px of touch point
      const TOUCH_RADIUS = 30; // pixels
      const rect = map.getContainer().getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      let closestId: string | null = null;
      let closestDist = Infinity;

      circleLayersRef.current.forEach((layers, id) => {
        const edgeLatLng = layers.edgeMarker.getLatLng();
        const edgePoint = map.latLngToContainerPoint(edgeLatLng);
        const dx = edgePoint.x - touchX;
        const dy = edgePoint.y - touchY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < TOUCH_RADIUS && dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      return closestId;
    };

    // TOUCHSTART: Start drag operation
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const target = e.target as HTMLElement;
      const touch = e.touches[0];

      // Check for edge marker first (higher z-index, larger touch area)
      const edgeCircleId = getEdgeMarkerCircleId(target, touch);
      if (edgeCircleId) {
        e.preventDefault();
        e.stopPropagation();
        isDraggingEdgeRef.current = edgeCircleId;
        map.dragging.disable();
        onCircleSelectRef.current(edgeCircleId);
        onDragStartRef.current?.();
        return;
      }

      // Check for center marker
      const centerCircleId = getCenterMarkerCircleId(target, touch);
      if (centerCircleId) {
        e.preventDefault();
        e.stopPropagation();
        isDraggingCenterRef.current = centerCircleId;
        map.dragging.disable();
        onCircleSelectRef.current(centerCircleId);
        onDragStartRef.current?.();
        return;
      }
    };

    // TOUCHMOVE: Handle drag - called on EVERY touch move for smooth updates
    const handleTouchMove = (e: TouchEvent) => {
      // Only handle if we're dragging something
      if (!isDraggingCenterRef.current && !isDraggingEdgeRef.current) return;
      if (e.touches.length !== 1) return;

      // Prevent scrolling/zooming during drag
      e.preventDefault();

      const latlng = touchToLatLng(e.touches[0]);
      handleMouseMove(latlng);
    };

    // TOUCHEND: End drag operation
    const handleTouchEnd = (e: TouchEvent) => {
      if (isDraggingCenterRef.current || isDraggingEdgeRef.current) {
        e.preventDefault();
        handleMouseUp();
      }
    };

    // Add touch listeners with passive: false to allow preventDefault
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: false });

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
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
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

    const wasDragging = isDraggingCenterRef.current || isDraggingEdgeRef.current;

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

    // Notify parent that drag ended
    if (wasDragging) {
      onDragEndRef.current?.();
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

        // Update center marker icon with new color
        const newCenterIcon = L.divIcon({
          className: 'center-marker-icon cursor-grab',
          html: `<div class="center-marker-inner" data-circle-id="${circleData.id}" style="background-color: ${circleData.color}; border: 2px solid white; width: 16px; height: 16px; border-radius: 50%; cursor: grab;"></div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });
        existing.centerMarker.setIcon(newCenterIcon);
        const centerElement = existing.centerMarker.getElement();
        if (centerElement) {
          centerElement.setAttribute('data-circle-id', circleData.id);
        }

        // Update edge marker icon with new color
        const newEdgeIcon = L.divIcon({
          className: 'edge-marker-icon',
          html: `<div class="edge-marker-inner" data-circle-id="${circleData.id}" style="background-color: white; border: 2px solid ${circleData.color}; width: 16px; height: 16px; border-radius: 50%; cursor: ew-resize;"></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        existing.edgeMarker.setIcon(newEdgeIcon);
        // Set data attribute for circle ID after icon update
        const edgeElement = existing.edgeMarker.getElement();
        if (edgeElement) {
          edgeElement.setAttribute('data-circle-id', circleData.id);
        }

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

        // Create center marker using DivIcon for large touch target (like edge marker)
        const centerIcon = L.divIcon({
          className: 'center-marker-icon cursor-grab',
          html: `<div class="center-marker-inner" data-circle-id="${circleData.id}" style="background-color: ${circleData.color}; border: 2px solid white; width: 16px; height: 16px; border-radius: 50%; cursor: grab;"></div>`,
          iconSize: [44, 44],  // Large touch target (44pt recommended minimum)
          iconAnchor: [22, 22],
        });
        const centerMarker = L.marker([circleData.lat, circleData.lng], {
          icon: centerIcon,
          draggable: false,
          bubblingMouseEvents: false,
        }).addTo(map);

        // Set data attribute when added
        centerMarker.on('add', () => {
          const el = centerMarker.getElement();
          if (el) el.setAttribute('data-circle-id', circleData.id);
        });

        // Center marker: mousedown starts drag (touch handled at document level)
        centerMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          isDraggingCenterRef.current = circleData.id;
          map.dragging.disable();
          document.body.style.cursor = 'grabbing';
          onCircleSelectRef.current(circleData.id);
          onDragStartRef.current?.();
        });

        centerMarker.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          onCircleSelectRef.current(circleData.id);
        });

        // Create edge marker at north point - using DivIcon for better touch support
        const edgePoint = calculateNorthPoint(circleData.lat, circleData.lng, radiusMeters);
        const edgeIcon = L.divIcon({
          className: 'edge-marker-icon',
          html: `<div class="edge-marker-inner" data-circle-id="${circleData.id}" style="background-color: white; border: 2px solid ${circleData.color}; width: 16px; height: 16px; border-radius: 50%; cursor: ew-resize;"></div>`,
          iconSize: [40, 40],  // Large touch target
          iconAnchor: [20, 20],
        });
        const edgeMarker = L.marker([edgePoint.lat, edgePoint.lng], {
          icon: edgeIcon,
          draggable: false,
          bubblingMouseEvents: false,
        }).addTo(map);

        // Set data attribute on parent element when available
        edgeMarker.on('add', () => {
          const el = edgeMarker.getElement();
          if (el) el.setAttribute('data-circle-id', circleData.id);
        });

        // Edge marker: mousedown starts resize (touch handled at document level)
        edgeMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          isDraggingEdgeRef.current = circleData.id;
          map.dragging.disable();
          document.body.style.cursor = 'ew-resize';
          onCircleSelectRef.current(circleData.id);
          onDragStartRef.current?.();
        });

        circleLayersRef.current.set(circleData.id, {
          circle,
          centerMarker,
          edgeMarker,
        });
      }
    });
  }, [circles, selectedCircleId, isMapReady, createPopupContent, mapRef]);

  // Add CSS for custom cursors and touch support
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-grab { cursor: grab !important; touch-action: none; }
      .cursor-grab:active { cursor: grabbing !important; }
      .cursor-ew-resize { cursor: ew-resize !important; touch-action: none; }
      .leaflet-interactive.cursor-grab,
      .leaflet-interactive.cursor-ew-resize { touch-action: none; }
      .center-marker-icon {
        background: transparent !important;
        border: none !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        touch-action: none;
      }
      .center-marker-inner {
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        touch-action: none;
      }
      .edge-marker-icon {
        background: transparent !important;
        border: none !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        touch-action: none;
      }
      .edge-marker-inner {
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        touch-action: none;
      }
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
