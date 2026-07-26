'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fromMeters, toMeters, DistanceUnit, calculateCircleArea, formatDistance, formatArea } from '@/lib/haversine';

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
const EARTH_RADIUS_M = 6371000;
const DEFAULT_EDGE_BEARING = 0; // radians, 0 = due north — the edge handle's rest position
const SNAP_THRESHOLD = 0.18;    // snap when within 0.18 of an integer in the active unit

// navigator.vibrate is a no-op on iOS Safari; guard for browsers without it.
const vibrate = (ms: number) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
};

export default function RadiusMap({
  circles,
  selectedCircleId,
  // currentRadius / currentColor are supplied by the parent for other tools but the
  // per-circle values on `circles` are authoritative here, so they are intentionally unused.
  currentUnit,
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
  // Bearing (radians, 0 = north) where each circle's edge handle currently sits. The handle
  // stays wherever the finger left it instead of snapping back to north between gestures.
  const edgeBearingsRef = useRef<Map<string, number>>(new Map());
  const userLocationMarkerRef = useRef<L.Marker | null>(null);
  const dragTooltipRef = useRef<L.Tooltip | null>(null);
  const lastSnapRef = useRef<number | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Drag state refs — which circle (if any) is having its center/edge dragged right now.
  const isDraggingCenterRef = useRef<string | null>(null);
  const isDraggingEdgeRef = useRef<string | null>(null);

  // Refs for callbacks to avoid stale closures inside long-lived Leaflet handlers
  const onMapClickRef = useRef(onMapClick);
  const onCircleUpdateRef = useRef(onCircleUpdate);
  const onCircleSelectRef = useRef(onCircleSelect);
  const onRadiusChangeRef = useRef(onRadiusChange);
  const onDragStartRef = useRef(onDragStart);
  const onDragEndRef = useRef(onDragEnd);
  const currentUnitRef = useRef(currentUnit);

  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onCircleUpdateRef.current = onCircleUpdate; }, [onCircleUpdate]);
  useEffect(() => { onCircleSelectRef.current = onCircleSelect; }, [onCircleSelect]);
  useEffect(() => { onRadiusChangeRef.current = onRadiusChange; }, [onRadiusChange]);
  useEffect(() => { onDragStartRef.current = onDragStart; }, [onDragStart]);
  useEffect(() => { onDragEndRef.current = onDragEnd; }, [onDragEnd]);
  useEffect(() => { currentUnitRef.current = currentUnit; }, [currentUnit]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter: L.LatLngExpression = [39.8283, -98.5795];
    const defaultZoom = 4;

    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
      // Render vector layers (the circles) into a <canvas> instead of SVG so html2canvas
      // can composite them into the PNG export — it cannot rasterize Leaflet's SVG pane.
      // Handles/popups are markers/HTML and click-select uses canvas hit-testing, both unaffected.
      preferCanvas: true,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      crossOrigin: 'anonymous', // keep the PNG-export canvas untainted (toBlob)
    }).addTo(map);

    // One reusable tooltip that rides the edge handle during a resize drag.
    dragTooltipRef.current = L.tooltip({
      direction: 'top',
      offset: L.point(0, -10),
      opacity: 1,
      className: 'radius-drag-tip',
      interactive: false,
    });

    // Map clicks create/move circles — but never while a handle is being dragged.
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!isDraggingCenterRef.current && !isDraggingEdgeRef.current) {
        onMapClickRef.current(e.latlng.lat, e.latlng.lng);
      }
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
      dragTooltipRef.current = null;
    };
  }, [mapRef, skipAutoGeolocation]);

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
        edgeBearingsRef.current.delete(id);
      }
    });

    // Add or update circles
    circles.forEach((circleData) => {
      const existing = circleLayersRef.current.get(circleData.id);
      const radiusMeters = circleData.radiusMeters > 0 ? circleData.radiusMeters : 16093.44;

      if (existing) {
        const isDraggingThis =
          isDraggingCenterRef.current === circleData.id || isDraggingEdgeRef.current === circleData.id;

        // Skip repositioning if this circle is mid-drag (its handles drive the map directly)
        if (!isDraggingThis) {
          existing.circle.setLatLng([circleData.lat, circleData.lng]);
          existing.circle.setRadius(radiusMeters);
          existing.centerMarker.setLatLng([circleData.lat, circleData.lng]);

          const bearing = edgeBearingsRef.current.get(circleData.id) ?? DEFAULT_EDGE_BEARING;
          const edge = destinationPoint(circleData.lat, circleData.lng, radiusMeters, bearing);
          existing.edgeMarker.setLatLng([edge.lat, edge.lng]);
        }

        existing.circle.setStyle({
          color: circleData.color,
          fillColor: circleData.color,
          weight: circleData.id === selectedCircleId ? 3 : 2,
          opacity: 0.7,
          fillOpacity: 0.15,
        });

        // Recolor the handle dots in place (avoids setIcon, which would re-init Draggable)
        setHandleColors(existing.centerMarker, existing.edgeMarker, circleData.color);
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

        const id = circleData.id;

        // ---- Center handle: 56px invisible hit area, native draggable → moves the circle ----
        // Center sits ABOVE the edge handle (1000 > 900) so that on a small on-screen circle,
        // where the two 56px hit areas overlap, a tap on the middle moves the circle (primary
        // intent) rather than being swallowed by the resize handle. The edge stays grabbable on
        // its outer side, and on any normally-sized circle the handles don't overlap at all.
        const centerMarker = L.marker([circleData.lat, circleData.lng], {
          icon: makeHandleIcon('center', circleData.color),
          draggable: true,
          keyboard: false,
          zIndexOffset: 1000,
        }).addTo(map);

        // ---- Edge handle: 56px invisible hit area, native draggable → resizes the radius ----
        const edgeBearing = edgeBearingsRef.current.get(id) ?? DEFAULT_EDGE_BEARING;
        edgeBearingsRef.current.set(id, edgeBearing);
        const edgePoint = destinationPoint(circleData.lat, circleData.lng, radiusMeters, edgeBearing);
        const edgeMarker = L.marker([edgePoint.lat, edgePoint.lng], {
          icon: makeHandleIcon('edge', circleData.color),
          draggable: true,
          keyboard: false,
          zIndexOffset: 900,
        }).addTo(map);

        // Center drag → move the whole circle, keeping the edge handle at its stored bearing.
        centerMarker.on('dragstart', () => {
          isDraggingCenterRef.current = id;
          map.dragging.disable();
          onCircleSelectRef.current(id);
          onDragStartRef.current?.();
          vibrate(8);
          centerMarker.getElement()?.classList.add('dragging');
        });
        centerMarker.on('drag', () => {
          const layers = circleLayersRef.current.get(id);
          if (!layers) return;
          const p = layers.centerMarker.getLatLng();
          const r = layers.circle.getRadius();
          layers.circle.setLatLng(p);
          const bearing = edgeBearingsRef.current.get(id) ?? DEFAULT_EDGE_BEARING;
          const edge = destinationPoint(p.lat, p.lng, r, bearing);
          layers.edgeMarker.setLatLng([edge.lat, edge.lng]);
          onCircleUpdateRef.current(id, p.lat, p.lng, r);
        });
        centerMarker.on('dragend', () => {
          const layers = circleLayersRef.current.get(id);
          if (layers) {
            const p = layers.circle.getLatLng();
            const r = layers.circle.getRadius();
            onCircleUpdateRef.current(id, p.lat, p.lng, r);
            layers.centerMarker.getElement()?.classList.remove('dragging');
          }
          isDraggingCenterRef.current = null;
          map.dragging.enable();
          onDragEndRef.current?.();
        });
        centerMarker.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          onCircleSelectRef.current(id);
        });

        // Edge drag → resize. Radius = haversine(center, handle); handle follows the finger.
        edgeMarker.on('dragstart', () => {
          isDraggingEdgeRef.current = id;
          lastSnapRef.current = null;
          map.dragging.disable();
          onCircleSelectRef.current(id);
          onDragStartRef.current?.();
          vibrate(8);
          edgeMarker.getElement()?.classList.add('dragging');
          const layers = circleLayersRef.current.get(id);
          const tip = dragTooltipRef.current;
          if (layers && tip) {
            tip
              .setLatLng(layers.edgeMarker.getLatLng())
              .setContent(edgeTooltipHtml(layers.circle.getRadius(), currentUnitRef.current))
              .openOn(map);
          }
        });
        edgeMarker.on('drag', () => {
          const layers = circleLayersRef.current.get(id);
          if (!layers) return;
          const center = layers.circle.getLatLng();
          const handle = layers.edgeMarker.getLatLng();
          const unit = currentUnitRef.current;

          let r = center.distanceTo(handle);
          const brg = bearingBetween(center.lat, center.lng, handle.lat, handle.lng);
          edgeBearingsRef.current.set(id, brg);

          // Gentle snap to a whole number in the active unit
          const rU = fromMeters(r, unit);
          const snapTo = Math.round(rU);
          let repositionHandle = false;
          if (snapTo >= 1 && Math.abs(rU - snapTo) < SNAP_THRESHOLD) {
            r = toMeters(snapTo, unit);
            repositionHandle = true;
            if (lastSnapRef.current !== snapTo) {
              vibrate(6);
              lastSnapRef.current = snapTo;
            }
          } else {
            lastSnapRef.current = null;
          }

          const clamped = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, r));
          if (clamped !== r) repositionHandle = true;
          layers.circle.setRadius(clamped);

          // On snap/clamp, pull the handle back onto the circle boundary along the drag bearing.
          if (repositionHandle) {
            const edge = destinationPoint(center.lat, center.lng, clamped, brg);
            layers.edgeMarker.setLatLng([edge.lat, edge.lng]);
          }

          const radiusInUnit = fromMeters(clamped, unit);
          const formatted = radiusInUnit >= 10 ? Math.round(radiusInUnit) : Math.round(radiusInUnit * 10) / 10;
          onRadiusChangeRef.current(formatted);
          onCircleUpdateRef.current(id, center.lat, center.lng, clamped);

          const tip = dragTooltipRef.current;
          if (tip) {
            tip.setLatLng(layers.edgeMarker.getLatLng());
            tip.setContent(edgeTooltipHtml(clamped, unit));
          }
        });
        edgeMarker.on('dragend', () => {
          const layers = circleLayersRef.current.get(id);
          if (layers) {
            const center = layers.circle.getLatLng();
            const r = layers.circle.getRadius();
            onCircleUpdateRef.current(id, center.lat, center.lng, r);
            layers.edgeMarker.getElement()?.classList.remove('dragging');
          }
          const tip = dragTooltipRef.current;
          if (tip) map.closeTooltip(tip);
          isDraggingEdgeRef.current = null;
          lastSnapRef.current = null;
          map.dragging.enable();
          onDragEndRef.current?.();
        });
        edgeMarker.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          onCircleSelectRef.current(id);
        });

        setHandleColors(centerMarker, edgeMarker, circleData.color);
        circleLayersRef.current.set(id, { circle, centerMarker, edgeMarker });
      }
    });
  }, [circles, selectedCircleId, isMapReady, createPopupContent, mapRef]);

  // Dev/script-only framing hook for the SERP hero-shot generator
  // (scripts/generate-hero-shots.ts). It fits the map to the drawn circle(s) with
  // asymmetric padding (extra reserve on the right so the top-right controls panel never
  // overlaps the shape) so a screenshot frames the whole circle deterministically.
  // Guarded to development so it is dead-code-eliminated from the production bundle and
  // never attaches on the live site; no application code calls it.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const w = window as unknown as {
      __mwrFitActiveShape?: (opts?: { pad?: number; reserveRight?: number }) => boolean;
    };
    w.__mwrFitActiveShape = (opts) => {
      const map = mapRef.current;
      if (!map) return false;
      const pad = opts?.pad ?? 70;
      const reserveRight = opts?.reserveRight ?? 360;
      const allBounds: L.LatLngBounds[] = [];
      circleLayersRef.current.forEach(({ circle }) => allBounds.push(circle.getBounds()));
      if (allBounds.length === 0) return false;
      const bounds = allBounds.reduce((acc, b) => acc.extend(b));
      map.fitBounds(bounds, {
        paddingTopLeft: L.point(pad, pad),
        paddingBottomRight: L.point(reserveRight + pad, pad),
        animate: false,
      });
      return true;
    };
    return () => {
      delete w.__mwrFitActiveShape;
    };
  }, [mapRef]);

  // Injected styles for the circle handles + the resize drag tooltip
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* 56px invisible hit area (WCAG/Apple >= 44px); touch-action:none so the browser
         never claims the gesture as a scroll before Leaflet's Draggable can. */
      .radius-handle {
        background: transparent !important;
        border: none !important;
        touch-action: none;
        display: grid;
        place-items: center;
      }
      .radius-handle-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.3);
      }
      .radius-handle.center { cursor: grab; }
      .radius-handle.center:active { cursor: grabbing; }
      .radius-handle.center .radius-handle-dot { background: #2563eb; border: 3.5px solid #fff; }
      .radius-handle.edge { cursor: ew-resize; }
      .radius-handle.edge .radius-handle-dot { background: #fff; border: 3.5px solid #2563eb; }
      /* Touch-only grab affordance: the dot swells under the finger. Kept off desktop
         (pointer: fine) so the desktop tool stays visually unchanged, and off for
         reduced-motion users. */
      @media (pointer: coarse) {
        .radius-handle-dot { transition: transform 0.12s ease; }
        .radius-handle.dragging .radius-handle-dot { transform: scale(1.35); }
      }
      @media (prefers-reduced-motion: reduce) {
        .radius-handle-dot { transition: none; }
        .radius-handle.dragging .radius-handle-dot { transform: none; }
      }

      .leaflet-tooltip.radius-drag-tip {
        background: #0f172a;
        color: #fff;
        border: 0;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.35);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.01em;
        padding: 7px 12px;
        border-radius: 12px;
        white-space: nowrap;
      }
      .leaflet-tooltip.radius-drag-tip b { font-weight: 800; }
      .leaflet-tooltip-top.radius-drag-tip::before { border-top-color: #0f172a; }

      /* Keep the scale bar + attribution above the mobile bottom sheet (they used to
         render through it). The sheet publishes its visible height as --mwr-chrome-offset. */
      @media (max-width: 1023px) {
        #radius-tool .leaflet-bottom { bottom: var(--mwr-chrome-offset, 0px); }
        /* Zoom control sits below the bottom sheet (z-[999]) instead of poking above it,
           and hides entirely once the sheet is expanded past peek. The sheet publishes its
           committed detent as data-mwr-detent on <html>. */
        #radius-tool .leaflet-top { z-index: 500; }
        :root[data-mwr-detent='mid'] #radius-tool .leaflet-control-zoom,
        :root[data-mwr-detent='full'] #radius-tool .leaflet-control-zoom { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-180px)] lg:h-[75vh] overflow-hidden"
      style={{ minHeight: '350px' }}
    />
  );
}

// A circle handle: a 20px visual dot centered inside a 56px invisible, draggable hit area.
function makeHandleIcon(kind: 'center' | 'edge', color: string): L.DivIcon {
  const dotStyle = kind === 'center' ? `background:${color}` : `border-color:${color}`;
  return L.divIcon({
    className: `radius-handle ${kind}`,
    html: `<div class="radius-handle-dot" style="${dotStyle}"></div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
}

// Recolor handle dots in the DOM without swapping the icon (which would tear down Draggable).
function setHandleColors(centerMarker: L.Marker, edgeMarker: L.Marker, color: string) {
  const cDot = centerMarker.getElement()?.querySelector('.radius-handle-dot') as HTMLElement | null;
  if (cDot) cDot.style.background = color;
  const eDot = edgeMarker.getElement()?.querySelector('.radius-handle-dot') as HTMLElement | null;
  if (eDot) eDot.style.borderColor = color;
}

// Tooltip content shown while resizing: both units, active unit bold. e.g. "12.4 mi · 20.0 km"
function edgeTooltipHtml(radiusMeters: number, unit: DistanceUnit): string {
  const mi = fromMeters(radiusMeters, 'miles');
  const km = fromMeters(radiusMeters, 'kilometers');
  const f = (v: number) => (v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1));
  return unit === 'kilometers'
    ? `<b>${f(km)} km</b> · ${f(mi)} mi`
    : `<b>${f(mi)} mi</b> · ${f(km)} km`;
}

// Initial bearing from point 1 to point 2, radians, 0 = north, clockwise positive.
function bearingBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const dLambda = ((lng2 - lng1) * Math.PI) / 180;
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  return Math.atan2(y, x);
}

// Point `distMeters` from (lat, lng) along `bearing` (radians, 0 = north). Inverse of bearingBetween.
function destinationPoint(
  lat: number,
  lng: number,
  distMeters: number,
  bearing: number
): { lat: number; lng: number } {
  const delta = distMeters / EARTH_RADIUS_M;
  const phi1 = (lat * Math.PI) / 180;
  const lambda1 = (lng * Math.PI) / 180;
  const phi2 = Math.asin(
    Math.sin(phi1) * Math.cos(delta) + Math.cos(phi1) * Math.sin(delta) * Math.cos(bearing)
  );
  const lambda2 =
    lambda1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(delta) * Math.cos(phi1),
      Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2)
    );
  return { lat: (phi2 * 180) / Math.PI, lng: (lambda2 * 180) / Math.PI };
}
