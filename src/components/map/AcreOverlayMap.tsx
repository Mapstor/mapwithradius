'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  OverlayShape,
  circleRadiusM,
  squareVertices,
  circleVertices,
  sphericalPolygonAreaSqM,
} from '@/lib/area';

interface AcreOverlayMapProps {
  /** Overlay centre, or null when nothing has been placed yet. */
  center: { lat: number; lng: number } | null;
  /** Real-world area of the overlay, in square metres. */
  areaSqM: number;
  shape: OverlayShape;
  color?: string;
  /** Fired on a map tap (place / move the overlay). */
  onMapClick: (lat: number, lng: number) => void;
  /** Fired after the overlay is dragged to a new centre. */
  onCenterChange: (lat: number, lng: number) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
  skipAutoGeolocation?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DEFAULT_COLOR = '#16a34a';

// A drag handle: 20px visual dot inside a 56px invisible, draggable hit area.
function acreHandleIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: 'acre-handle',
    html: `<div class="acre-handle-dot" style="border-color:${color}"></div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
}

export default function AcreOverlayMap({
  center,
  areaSqM,
  shape,
  color = DEFAULT_COLOR,
  onMapClick,
  onCenterChange,
  mapRef,
  skipAutoGeolocation = false,
  onDragStart,
  onDragEnd,
}: AcreOverlayMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeLayerRef = useRef<L.Polygon | L.Circle | null>(null);
  const shapeKindRef = useRef<OverlayShape | null>(null);
  const centerMarkerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Live refs so the long-lived Leaflet drag handlers never read stale props.
  const areaRef = useRef(areaSqM);
  const shapeRef = useRef(shape);
  const colorRef = useRef(color);
  const onMapClickRef = useRef(onMapClick);
  const onCenterChangeRef = useRef(onCenterChange);
  const onDragStartRef = useRef(onDragStart);
  const onDragEndRef = useRef(onDragEnd);
  const isDraggingRef = useRef(false);
  const skipNextFitRef = useRef(false);
  const skipGeoRef = useRef(skipAutoGeolocation);

  useEffect(() => { areaRef.current = areaSqM; }, [areaSqM]);
  useEffect(() => { shapeRef.current = shape; }, [shape]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onCenterChangeRef.current = onCenterChange; }, [onCenterChange]);
  useEffect(() => { onDragStartRef.current = onDragStart; }, [onDragStart]);
  useEffect(() => { onDragEndRef.current = onDragEnd; }, [onDragEnd]);
  useEffect(() => { skipGeoRef.current = skipAutoGeolocation; }, [skipAutoGeolocation]);

  // Write the *rendered* geodesic area onto the container so the UI (and the
  // Playwright scale test) can verify what was actually drawn.
  const publishArea = (lat: number | null, lng: number | null) => {
    const el = containerRef.current;
    if (!el) return;
    if (lat == null || lng == null) {
      el.removeAttribute('data-overlay-area-sqm');
      el.dataset.overlayPresent = 'false';
      return;
    }
    const verts =
      shapeRef.current === 'square'
        ? squareVertices(lat, lng, areaRef.current)
        : circleVertices(lat, lng, areaRef.current, 180);
    el.dataset.overlayAreaSqm = String(Math.round(sphericalPolygonAreaSqM(verts)));
    el.dataset.overlayShape = shapeRef.current;
    el.dataset.overlayPresent = 'true';
  };

  const drawOverlay = (lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    const sh = shapeRef.current;

    // Recreate the layer if the shape kind changed (polygon <-> circle).
    if (shapeLayerRef.current && shapeKindRef.current !== sh) {
      shapeLayerRef.current.remove();
      shapeLayerRef.current = null;
      shapeKindRef.current = null;
    }

    const style: L.PathOptions = {
      color: colorRef.current,
      fillColor: colorRef.current,
      weight: 2.5,
      opacity: 0.9,
      fillOpacity: 0.2,
    };

    if (sh === 'square') {
      const ring = squareVertices(lat, lng, areaRef.current).map((p) => [p.lat, p.lng]) as L.LatLngExpression[];
      const poly = shapeLayerRef.current as L.Polygon | null;
      if (poly) poly.setLatLngs(ring);
      else {
        shapeLayerRef.current = L.polygon(ring, style).addTo(map);
        shapeKindRef.current = 'square';
      }
    } else {
      const r = circleRadiusM(areaRef.current);
      const circ = shapeLayerRef.current as L.Circle | null;
      if (circ) {
        circ.setLatLng([lat, lng]);
        circ.setRadius(r);
      } else {
        shapeLayerRef.current = L.circle([lat, lng], { ...style, radius: r }).addTo(map);
        shapeKindRef.current = 'circle';
      }
    }

    // Centre drag handle.
    if (centerMarkerRef.current) {
      centerMarkerRef.current.setLatLng([lat, lng]);
      const dot = centerMarkerRef.current.getElement()?.querySelector('.acre-handle-dot') as HTMLElement | null;
      if (dot) dot.style.borderColor = colorRef.current;
    } else {
      const marker = L.marker([lat, lng], {
        icon: acreHandleIcon(colorRef.current),
        draggable: true,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      marker.on('dragstart', () => {
        isDraggingRef.current = true;
        map.dragging.disable();
        onDragStartRef.current?.();
        marker.getElement()?.classList.add('dragging');
      });
      marker.on('drag', () => {
        const p = marker.getLatLng();
        // Redraw the shape under the finger without going through React state.
        if (shapeRef.current === 'square') {
          (shapeLayerRef.current as L.Polygon | null)?.setLatLngs(
            squareVertices(p.lat, p.lng, areaRef.current).map((v) => [v.lat, v.lng]) as L.LatLngExpression[]
          );
        } else {
          (shapeLayerRef.current as L.Circle | null)?.setLatLng(p);
        }
        publishArea(p.lat, p.lng);
      });
      marker.on('dragend', () => {
        isDraggingRef.current = false;
        skipNextFitRef.current = true; // don't yank the viewport after a manual drag
        map.dragging.enable();
        marker.getElement()?.classList.remove('dragging');
        const p = marker.getLatLng();
        onCenterChangeRef.current(p.lat, p.lng);
      });

      centerMarkerRef.current = marker;
    }

    publishArea(lat, lng);
  };

  const clearOverlay = () => {
    shapeLayerRef.current?.remove();
    shapeLayerRef.current = null;
    shapeKindRef.current = null;
    centerMarkerRef.current?.remove();
    centerMarkerRef.current = null;
    publishArea(null, null);
  };

  const fitToOverlay = () => {
    const map = mapRef.current;
    const layer = shapeLayerRef.current;
    if (!map || !layer) return;
    map.fitBounds(layer.getBounds().pad(0.6), { padding: [40, 40], animate: true, duration: 0.3, maxZoom: 18 });
  };

  // ---- Init the map EXACTLY once. Empty deps so no prop change (e.g. skipAutoGeolocation
  //      flipping to true when a shared URL loads) can tear down and recreate the map; later
  //      container/viewport size changes only call invalidateSize. ----
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const container = containerRef.current;

    const map = L.map(container, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });
    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!isDraggingRef.current) onMapClickRef.current(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;
    setIsMapReady(true);

    if (navigator.geolocation && !skipGeoRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!mapRef.current) return;
          mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 15);
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    }

    // Fix the first-paint sizing race (grey/blank map) and keep the map sized on any later
    // container resize (mobile URL bar, sheet detents, rotation) WITHOUT recreating it.
    let sizeRaf: number | null = null;
    const invalidate = () => {
      sizeRaf = null;
      map.invalidateSize();
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
      shapeLayerRef.current = null;
      shapeKindRef.current = null;
      centerMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Draw / update the overlay when inputs change ----
  useEffect(() => {
    if (!isMapReady) return;
    if (!center) {
      clearOverlay();
      return;
    }
    drawOverlay(center.lat, center.lng);
    if (isDraggingRef.current) return;
    if (skipNextFitRef.current) {
      skipNextFitRef.current = false;
      return;
    }
    fitToOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, areaSqM, shape, color, isMapReady]);

  // ---- Injected handle styles (scoped classes, distinct from the radius tool) ----
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .acre-handle {
        background: transparent !important;
        border: none !important;
        touch-action: none;
        display: grid;
        place-items: center;
        cursor: grab;
      }
      .acre-handle:active { cursor: grabbing; }
      .acre-handle-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        border: 3.5px solid ${DEFAULT_COLOR};
        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.3);
      }
      @media (pointer: coarse) {
        .acre-handle-dot { transition: transform 0.12s ease; }
        .acre-handle.dragging .acre-handle-dot { transform: scale(1.35); }
      }
      @media (prefers-reduced-motion: reduce) {
        .acre-handle-dot { transition: none; }
        .acre-handle.dragging .acre-handle-dot { transform: none; }
      }
      /* Keep scale bar + attribution above the mobile sheet (it publishes its height). */
      @media (max-width: 1023px) {
        #acre-tool .leaflet-bottom { bottom: var(--mwr-chrome-offset, 0px); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="acre-overlay"
      data-overlay-present="false"
      className="w-full h-[calc(100vh-180px)] lg:h-[75vh] overflow-hidden"
      style={{ minHeight: '350px' }}
    />
  );
}
