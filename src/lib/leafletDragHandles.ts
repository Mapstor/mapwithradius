// Interactive drag handles for a Leaflet L.Circle: a draggable centre marker
// (move the whole circle) and a draggable edge marker (resize the radius).
//
// This is the reusable layer behind the same UX the homepage radius tool ships
// — white edge dot on the north side, grab cursor on the centre, map pan
// disabled while a handle is held — but factored so secondary tools (the ZIP
// tool, the embed view) can adopt it without forking the multi-circle
// machinery in RadiusMap.tsx.
//
// Usage: the caller creates the L.Circle, calls attachCircleDragHandles({map,
// circle, callbacks}), and gets back {centerMarker, edgeMarker, destroy}.
// destroy() must be called when the circle is removed (or component unmounts)
// to detach document-level event listeners.

import L from 'leaflet';

const DEFAULT_MIN_RADIUS_METERS = 100; // 100 m floor — finer than the radius UI normally exposes
const DEFAULT_MAX_RADIUS_METERS = 804_672; // 500 mi ceiling, matches RadiusMap

export interface CircleDragHandlesOptions {
  map: L.Map;
  circle: L.Circle;
  /** Border color of the edge marker + fill of the centre dot. Default Tailwind blue-500. */
  color?: string;
  enableCenterDrag?: boolean;
  enableEdgeResize?: boolean;
  minRadiusMeters?: number;
  maxRadiusMeters?: number;
  /** Live during edge drag — fire once per pointer move with the in-progress radius. */
  onResize?: (newRadiusMeters: number) => void;
  /** Once on pointer-up after edge drag. */
  onResizeEnd?: (newRadiusMeters: number) => void;
  /** Live during centre drag. */
  onMove?: (newCenter: L.LatLng) => void;
  /** Once on pointer-up after centre drag. */
  onMoveEnd?: (newCenter: L.LatLng) => void;
}

export interface CircleDragHandles {
  centerMarker: L.Marker;
  edgeMarker: L.Marker;
  /** Detach event listeners + remove markers from the map. */
  destroy: () => void;
}

/**
 * Returns the lat/lng `radiusMeters` due north of (lat, lng). The edge handle
 * sits here when nothing is being dragged. Approximates Earth's curvature with
 * the WGS-84 equatorial radius; accurate to <0.1% at the scales this tool
 * draws (under 500 mi).
 */
function northPointOfCircle(lat: number, lng: number, radiusMeters: number): L.LatLng {
  const R = 6378137; // metres
  const dLat = (radiusMeters / R) * (180 / Math.PI);
  return L.latLng(lat + dLat, lng);
}

export function attachCircleDragHandles(opts: CircleDragHandlesOptions): CircleDragHandles {
  const {
    map,
    circle,
    color = '#3b82f6',
    enableCenterDrag = true,
    enableEdgeResize = true,
    minRadiusMeters = DEFAULT_MIN_RADIUS_METERS,
    maxRadiusMeters = DEFAULT_MAX_RADIUS_METERS,
    onResize,
    onResizeEnd,
    onMove,
    onMoveEnd,
  } = opts;

  const initialCenter = circle.getLatLng();
  const initialRadius = circle.getRadius();

  // ---- Centre marker (drag to move the whole circle) ----
  const centerIcon = L.divIcon({
    className: 'mwr-center-marker',
    html: `<div style="width: 20px; height: 20px; background-color: ${color}; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3); cursor: ${enableCenterDrag ? 'grab' : 'default'};"></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
  const centerMarker = L.marker(initialCenter, {
    icon: centerIcon,
    draggable: false, // we handle drag ourselves so we can disable map pan during it
    zIndexOffset: 1000,
  }).addTo(map);

  // ---- Edge marker (drag to resize) ----
  const edgeIcon = L.divIcon({
    className: 'mwr-edge-marker',
    html: `<div style="width: 16px; height: 16px; background-color: white; border: 2px solid ${color}; border-radius: 50%; cursor: ${enableEdgeResize ? 'ew-resize' : 'default'}; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  const edgeMarker = L.marker(
    northPointOfCircle(initialCenter.lat, initialCenter.lng, initialRadius),
    { icon: edgeIcon, draggable: false, zIndexOffset: 1000 }
  ).addTo(map);

  // ---- Drag state ----
  let dragMode: 'none' | 'center' | 'edge' = 'none';

  const eventToLatLng = (clientX: number, clientY: number): L.LatLng => {
    const rect = map.getContainer().getBoundingClientRect();
    return map.containerPointToLatLng(L.point(clientX - rect.left, clientY - rect.top));
  };

  const startEdgeDrag = () => {
    if (!enableEdgeResize) return;
    dragMode = 'edge';
    map.dragging.disable();
    document.body.style.cursor = 'ew-resize';
  };

  const startCenterDrag = () => {
    if (!enableCenterDrag) return;
    dragMode = 'center';
    map.dragging.disable();
    document.body.style.cursor = 'grabbing';
  };

  const updateFromPointer = (latlng: L.LatLng) => {
    if (dragMode === 'edge') {
      const center = circle.getLatLng();
      let r = center.distanceTo(latlng);
      r = Math.max(minRadiusMeters, Math.min(maxRadiusMeters, r));
      circle.setRadius(r);
      edgeMarker.setLatLng(latlng);
      onResize?.(r);
    } else if (dragMode === 'center') {
      const r = circle.getRadius();
      circle.setLatLng(latlng);
      centerMarker.setLatLng(latlng);
      edgeMarker.setLatLng(northPointOfCircle(latlng.lat, latlng.lng, r));
      onMove?.(latlng);
    }
  };

  const finishDrag = () => {
    if (dragMode === 'none') return;
    const center = circle.getLatLng();
    const radius = circle.getRadius();

    if (dragMode === 'edge') {
      // Snap the edge handle back to true north at rest.
      edgeMarker.setLatLng(northPointOfCircle(center.lat, center.lng, radius));
      onResizeEnd?.(radius);
    } else if (dragMode === 'center') {
      onMoveEnd?.(center);
    }

    dragMode = 'none';
    map.dragging.enable();
    document.body.style.cursor = '';
  };

  // ---- Leaflet marker handlers (mouse) ----
  edgeMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e);
    startEdgeDrag();
  });
  centerMarker.on('mousedown', (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e);
    startCenterDrag();
  });

  // ---- Document-level handlers (so drag continues if cursor leaves the marker) ----
  const onDocMouseMove = (e: MouseEvent) => {
    if (dragMode === 'none') return;
    updateFromPointer(eventToLatLng(e.clientX, e.clientY));
  };
  const onDocMouseUp = () => finishDrag();
  document.addEventListener('mousemove', onDocMouseMove);
  document.addEventListener('mouseup', onDocMouseUp);

  // ---- Touch handlers (mirror RadiusMap's pattern) ----
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement;
    if (target.closest('.mwr-edge-marker') && enableEdgeResize) {
      e.preventDefault();
      startEdgeDrag();
    } else if (target.closest('.mwr-center-marker') && enableCenterDrag) {
      e.preventDefault();
      startCenterDrag();
    }
  };
  const onTouchMove = (e: TouchEvent) => {
    if (dragMode === 'none' || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    updateFromPointer(eventToLatLng(t.clientX, t.clientY));
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (dragMode !== 'none') {
      e.preventDefault();
      finishDrag();
    }
  };
  document.addEventListener('touchstart', onTouchStart, { passive: false });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { passive: false });
  document.addEventListener('touchcancel', onTouchEnd, { passive: false });

  // ---- Cleanup ----
  const destroy = () => {
    document.removeEventListener('mousemove', onDocMouseMove);
    document.removeEventListener('mouseup', onDocMouseUp);
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('touchcancel', onTouchEnd);
    centerMarker.remove();
    edgeMarker.remove();
    map.dragging.enable();
    document.body.style.cursor = '';
  };

  return { centerMarker, edgeMarker, destroy };
}
