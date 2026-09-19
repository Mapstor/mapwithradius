'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { createTileLayer } from '@/lib/mapTiles';
import 'leaflet/dist/leaflet.css';
import {
  AreaUnit,
  OverlayShape,
  UNIT_LABEL,
  circleRadiusM,
  squareVertices,
  circleVertices,
  sphericalPolygonAreaSqM,
  destinationPoint,
  sqMToArea,
  fmtNum,
} from '@/lib/area';

interface AcreOverlayMapProps {
  /** Overlay centre, or null when nothing has been placed yet. */
  center: { lat: number; lng: number } | null;
  /** Real-world area of the overlay, in square metres. */
  areaSqM: number;
  shape: OverlayShape;
  /** Active area unit — drives the on-map label. */
  unit: AreaUnit;
  color?: string;
  /** Fired on a map tap (place / move the overlay). */
  onMapClick: (lat: number, lng: number) => void;
  /** Fired after the overlay is dragged to a new centre. */
  onCenterChange: (lat: number, lng: number) => void;
  /** Fired live while the resize handle is dragged (and on drag end). */
  onAreaSqMChange: (areaSqM: number) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
  skipAutoGeolocation?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DEFAULT_COLOR = '#16a34a';
const RESIZE_BEARING = Math.PI / 4; // NE — where the resize handle rests
const MIN_AREA_SQM = 20;            // ~4.5 m square; keeps the overlay grabbable
const MAX_AREA_SQM = 5e8;           // ~123k acres; a generous ceiling

// A drag handle: 20px visual dot inside a 56px invisible, draggable hit area. `move`
// is a hollow dot (like the radius tool's centre); `resize` is filled (grab to resize).
function acreHandleIcon(kind: 'move' | 'resize', color: string): L.DivIcon {
  const dotStyle = kind === 'resize' ? `background:${color}` : `border-color:${color}`;
  return L.divIcon({
    className: `acre-handle ${kind}`,
    html: `<div class="acre-handle-dot ${kind}" style="${dotStyle}"></div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
}

// Distance (m) from centre to the resize handle for a given area/shape, and its inverse
// (area from a dragged handle distance). Square: the handle sits at the NE corner, whose
// distance from centre is √(area/2); circle: on the boundary, distance = radius.
function handleDistanceM(areaSqM: number, shape: OverlayShape): number {
  return shape === 'square' ? Math.sqrt(Math.max(0, areaSqM) / 2) : circleRadiusM(areaSqM);
}
function areaFromHandleDistance(d: number, shape: OverlayShape): number {
  return shape === 'square' ? 2 * d * d : Math.PI * d * d;
}
function resizeHandlePoint(lat: number, lng: number, areaSqM: number, shape: OverlayShape) {
  return destinationPoint(lat, lng, handleDistanceM(areaSqM, shape), RESIZE_BEARING);
}

// The always-on area pill: primary area in the active unit, plus a secondary line with
// the square-foot (or m²) figure and the side/radius, in the matching unit system.
function acreLabelHtml(areaSqM: number, unit: AreaUnit, shape: OverlayShape): string {
  const primaryVal = sqMToArea(areaSqM, unit);
  const acresSingular = unit === 'acres' && Math.abs(primaryVal - 1) < 0.05;
  const unitWord = acresSingular ? 'acre' : UNIT_LABEL[unit];
  const primary = `${fmtNum(primaryVal)} ${unitWord}`;

  const metric = unit === 'hectares' || unit === 'sqm';
  const lenM = shape === 'square' ? Math.sqrt(Math.max(0, areaSqM)) : circleRadiusM(areaSqM);
  const lenVal = metric ? lenM : lenM / 0.3048;
  const lenUnit = metric ? 'm' : 'ft';
  const lenWord = shape === 'square' ? 'side' : 'radius';

  const areaSecondary = metric ? `${fmtNum(areaSqM)} m²` : `${fmtNum(sqMToArea(areaSqM, 'sqft'))} sq ft`;
  const alreadyShown = (unit === 'sqft' && !metric) || (unit === 'sqm' && metric);
  const sub = `${alreadyShown ? '' : areaSecondary + ' · '}${fmtNum(lenVal)} ${lenUnit} ${lenWord}`;
  return `<b>${primary}</b><span class="acre-area-sub">${sub}</span>`;
}

export default function AcreOverlayMap({
  center,
  areaSqM,
  shape,
  unit,
  color = DEFAULT_COLOR,
  onMapClick,
  onCenterChange,
  onAreaSqMChange,
  mapRef,
  skipAutoGeolocation = false,
  onDragStart,
  onDragEnd,
}: AcreOverlayMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeLayerRef = useRef<L.Polygon | L.Circle | null>(null);
  const shapeKindRef = useRef<OverlayShape | null>(null);
  const centerMarkerRef = useRef<L.Marker | null>(null);
  const resizeMarkerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Live refs so the long-lived Leaflet drag handlers never read stale props.
  const areaRef = useRef(areaSqM);
  const shapeRef = useRef(shape);
  const unitRef = useRef(unit);
  const colorRef = useRef(color);
  const onMapClickRef = useRef(onMapClick);
  const onCenterChangeRef = useRef(onCenterChange);
  const onAreaSqMChangeRef = useRef(onAreaSqMChange);
  const onDragStartRef = useRef(onDragStart);
  const onDragEndRef = useRef(onDragEnd);
  const isDraggingRef = useRef(false);   // centre (move) drag
  const isResizingRef = useRef(false);   // edge (resize) drag
  const skipNextFitRef = useRef(false);
  const skipGeoRef = useRef(skipAutoGeolocation);

  useEffect(() => { areaRef.current = areaSqM; }, [areaSqM]);
  useEffect(() => { shapeRef.current = shape; }, [shape]);
  useEffect(() => { unitRef.current = unit; }, [unit]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onCenterChangeRef.current = onCenterChange; }, [onCenterChange]);
  useEffect(() => { onAreaSqMChangeRef.current = onAreaSqMChange; }, [onAreaSqMChange]);
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

  const styleFor = (): L.PathOptions => ({
    color: colorRef.current,
    fillColor: colorRef.current,
    weight: 2.5,
    opacity: 0.9,
    fillOpacity: 0.2,
  });

  // Update just the shape geometry from a centre + area (the layer already exists and
  // matches shapeKindRef). Used by both React redraws and the live drag handlers.
  const setShapeGeometry = (lat: number, lng: number, area: number) => {
    if (shapeRef.current === 'square') {
      const ring = squareVertices(lat, lng, area).map((p) => [p.lat, p.lng]) as L.LatLngExpression[];
      (shapeLayerRef.current as L.Polygon | null)?.setLatLngs(ring);
    } else {
      const circ = shapeLayerRef.current as L.Circle | null;
      circ?.setLatLng([lat, lng]);
      circ?.setRadius(circleRadiusM(area));
    }
  };

  const updateLabel = (area: number) => {
    centerMarkerRef.current?.setTooltipContent(acreLabelHtml(area, unitRef.current, shapeRef.current));
  };

  const drawOverlay = (lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    const sh = shapeRef.current;

    // Recreate the shape layer if the shape kind changed (polygon <-> circle).
    if (shapeLayerRef.current && shapeKindRef.current !== sh) {
      shapeLayerRef.current.remove();
      shapeLayerRef.current = null;
      shapeKindRef.current = null;
    }

    if (!shapeLayerRef.current) {
      shapeLayerRef.current =
        sh === 'square'
          ? L.polygon(
              squareVertices(lat, lng, areaRef.current).map((p) => [p.lat, p.lng]) as L.LatLngExpression[],
              styleFor()
            ).addTo(map)
          : L.circle([lat, lng], { ...styleFor(), radius: circleRadiusM(areaRef.current) }).addTo(map);
      shapeKindRef.current = sh;
    } else {
      setShapeGeometry(lat, lng, areaRef.current);
    }

    // ---- Centre handle (move) + bound area label ----
    if (centerMarkerRef.current) {
      centerMarkerRef.current.setLatLng([lat, lng]);
      const dot = centerMarkerRef.current.getElement()?.querySelector('.acre-handle-dot.move') as HTMLElement | null;
      if (dot) dot.style.borderColor = colorRef.current;
    } else {
      const marker = L.marker([lat, lng], {
        icon: acreHandleIcon('move', colorRef.current),
        draggable: true,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);

      marker.bindTooltip(acreLabelHtml(areaRef.current, unitRef.current, sh), {
        permanent: true,
        direction: 'top',
        offset: L.point(0, -14),
        opacity: 1,
        className: 'acre-area-label',
        interactive: false,
      });

      marker.on('dragstart', () => {
        isDraggingRef.current = true;
        map.dragging.disable();
        onDragStartRef.current?.();
        marker.getElement()?.classList.add('dragging');
      });
      marker.on('drag', () => {
        const p = marker.getLatLng();
        setShapeGeometry(p.lat, p.lng, areaRef.current);
        const edge = resizeHandlePoint(p.lat, p.lng, areaRef.current, shapeRef.current);
        resizeMarkerRef.current?.setLatLng([edge.lat, edge.lng]);
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
    updateLabel(areaRef.current);

    // ---- Resize handle (edge) ----
    const edge = resizeHandlePoint(lat, lng, areaRef.current, sh);
    if (resizeMarkerRef.current) {
      resizeMarkerRef.current.setLatLng([edge.lat, edge.lng]);
      const dot = resizeMarkerRef.current.getElement()?.querySelector('.acre-handle-dot.resize') as HTMLElement | null;
      if (dot) dot.style.background = colorRef.current;
    } else {
      const rMarker = L.marker([edge.lat, edge.lng], {
        icon: acreHandleIcon('resize', colorRef.current),
        draggable: true,
        keyboard: false,
        zIndexOffset: 900,
      }).addTo(map);

      rMarker.on('dragstart', () => {
        isResizingRef.current = true;
        map.dragging.disable();
        onDragStartRef.current?.();
        rMarker.getElement()?.classList.add('dragging');
      });
      rMarker.on('drag', () => {
        const c = centerMarkerRef.current?.getLatLng();
        if (!c) return;
        const h = rMarker.getLatLng();
        const d = c.distanceTo(h);
        const area = Math.max(MIN_AREA_SQM, Math.min(MAX_AREA_SQM, areaFromHandleDistance(d, shapeRef.current)));
        areaRef.current = area;
        setShapeGeometry(c.lat, c.lng, area);
        // Snap the handle back onto the shape's NE edge for the new size.
        const p = resizeHandlePoint(c.lat, c.lng, area, shapeRef.current);
        rMarker.setLatLng([p.lat, p.lng]);
        updateLabel(area);
        publishArea(c.lat, c.lng);
        onAreaSqMChangeRef.current(area);
      });
      rMarker.on('dragend', () => {
        isResizingRef.current = false;
        // Deliberately do NOT arm skipNextFitRef: a resize keeps the centre fixed and the
        // committing setArea is a no-op (the last live frame already set that value), so the
        // draw effect never runs to consume the flag — arming it would leave it stuck true
        // and silently swallow the NEXT preset / "Show on map" re-frame.
        map.dragging.enable();
        rMarker.getElement()?.classList.remove('dragging');
        onAreaSqMChangeRef.current(areaRef.current);
      });
      rMarker.on('click', (e: L.LeafletMouseEvent) => L.DomEvent.stopPropagation(e));

      resizeMarkerRef.current = rMarker;
    }

    publishArea(lat, lng);
  };

  const clearOverlay = () => {
    shapeLayerRef.current?.remove();
    shapeLayerRef.current = null;
    shapeKindRef.current = null;
    centerMarkerRef.current?.remove();
    centerMarkerRef.current = null;
    resizeMarkerRef.current?.remove();
    resizeMarkerRef.current = null;
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
    createTileLayer(L).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!isDraggingRef.current && !isResizingRef.current) onMapClickRef.current(e.latlng.lat, e.latlng.lng);
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
      resizeMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Draw / update the overlay when inputs change. While a handle is mid-drag, the drag
  //      handlers own the live geometry/label — skip the React redraw so it never fights them. ----
  useEffect(() => {
    if (!isMapReady) return;
    if (isDraggingRef.current || isResizingRef.current) return;
    if (!center) {
      clearOverlay();
      return;
    }
    drawOverlay(center.lat, center.lng);
    if (skipNextFitRef.current) {
      skipNextFitRef.current = false;
      return;
    }
    fitToOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, areaSqM, shape, color, isMapReady]);

  // Refresh the on-map label when the active unit changes, WITHOUT re-fitting the view
  // (so toggling acres↔ha never yanks back a user who has panned or zoomed in).
  useEffect(() => {
    if (!isMapReady) return;
    updateLabel(areaRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, isMapReady]);

  // ---- Injected handle + label styles (scoped classes, distinct from the radius tool) ----
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
      /* Resize dot is filled (grab-to-resize affordance), inverse of the hollow move dot. */
      .acre-handle-dot.resize {
        background: ${DEFAULT_COLOR};
        border-color: #fff;
      }
      @media (pointer: coarse) {
        .acre-handle-dot { transition: transform 0.12s ease; }
        .acre-handle.dragging .acre-handle-dot { transform: scale(1.35); }
      }
      @media (prefers-reduced-motion: reduce) {
        .acre-handle-dot { transition: none; }
        .acre-handle.dragging .acre-handle-dot { transform: none; }
      }
      /* Always-on area pill anchored to the overlay centre. pointer-events:none so the
         handles underneath still receive touches. */
      .leaflet-tooltip.acre-area-label {
        background: #fff;
        border: none;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(15, 23, 42, 0.25);
        padding: 5px 11px;
        font-size: 12.5px;
        font-weight: 600;
        line-height: 1.25;
        color: #0f172a;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
      }
      .leaflet-tooltip.acre-area-label::before { display: none; }
      .acre-area-sub {
        display: block;
        font-size: 11px;
        font-weight: 500;
        color: #475569;
      }
      /* Keep scale bar + attribution above the mobile sheet (it publishes its height). */
      @media (max-width: 1023px) {
        #acre-tool .leaflet-bottom { bottom: min(var(--mwr-chrome-offset, 0px), 158px); }
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
