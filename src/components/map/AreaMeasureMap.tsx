'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng, polygonAreaSqM, polygonPerimeterM } from '@/lib/measure';

export interface MeasurePolygon {
  id: string;
  color: string;
  vertices: LatLng[];
}

export interface LiveMeasure {
  areaSqM: number;
  perimeterM: number;
}

interface AreaMeasureMapProps {
  polygons: MeasurePolygon[];
  activeId: string | null;
  /** Map tap → append a vertex to the active polygon. */
  onMapClick: (lat: number, lng: number) => void;
  /** A vertex was dragged to a new position (fired on drag end). */
  onMoveVertex: (polyId: string, index: number, lat: number, lng: number) => void;
  onSelectPolygon: (id: string) => void;
  /** Live area/perimeter while a vertex is being dragged (null clears it). */
  onLiveMeasure: (m: LiveMeasure | null) => void;
  onVertexDragStart?: () => void;
  onVertexDragEnd?: () => void;
  mapRef: React.MutableRefObject<L.Map | null>;
  skipAutoGeolocation?: boolean;
}

function vertexIcon(color: string, active: boolean): L.DivIcon {
  return L.divIcon({
    className: `measure-vertex${active ? ' active' : ''}`,
    html: `<div class="measure-vertex-dot" style="border-color:${color}"></div>`,
    iconSize: active ? [44, 44] : [16, 16],
    iconAnchor: active ? [22, 22] : [8, 8],
  });
}

export default function AreaMeasureMap({
  polygons,
  activeId,
  onMapClick,
  onMoveVertex,
  onSelectPolygon,
  onLiveMeasure,
  onVertexDragStart,
  onVertexDragEnd,
  mapRef,
  skipAutoGeolocation = false,
}: AreaMeasureMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const layersRef = useRef<L.Layer[]>([]);
  const activeShapeRef = useRef<L.Polygon | L.Polyline | null>(null);
  const activeVertsRef = useRef<LatLng[]>([]);
  const isDraggingRef = useRef(false);
  const liveRafRef = useRef<number | null>(null);
  const skipGeoRef = useRef(skipAutoGeolocation);

  // Callback + data refs to avoid stale closures inside long-lived Leaflet handlers.
  const onMapClickRef = useRef(onMapClick);
  const onMoveVertexRef = useRef(onMoveVertex);
  const onSelectPolygonRef = useRef(onSelectPolygon);
  const onLiveMeasureRef = useRef(onLiveMeasure);
  const onVertexDragStartRef = useRef(onVertexDragStart);
  const onVertexDragEndRef = useRef(onVertexDragEnd);
  const polygonsRef = useRef(polygons);
  const activeRef = useRef(activeId);

  useEffect(() => { onMapClickRef.current = onMapClick; }, [onMapClick]);
  useEffect(() => { onMoveVertexRef.current = onMoveVertex; }, [onMoveVertex]);
  useEffect(() => { onSelectPolygonRef.current = onSelectPolygon; }, [onSelectPolygon]);
  useEffect(() => { onLiveMeasureRef.current = onLiveMeasure; }, [onLiveMeasure]);
  useEffect(() => { onVertexDragStartRef.current = onVertexDragStart; }, [onVertexDragStart]);
  useEffect(() => { onVertexDragEndRef.current = onVertexDragEnd; }, [onVertexDragEnd]);
  useEffect(() => { polygonsRef.current = polygons; }, [polygons]);
  useEffect(() => { activeRef.current = activeId; }, [activeId]);
  useEffect(() => { skipGeoRef.current = skipAutoGeolocation; }, [skipAutoGeolocation]);

  const publishActive = (verts: LatLng[]) => {
    const el = containerRef.current;
    if (!el) return;
    el.dataset.activeAreaSqm = String(Math.round(polygonAreaSqM(verts)));
    el.dataset.activePerimeterM = String(Math.round(polygonPerimeterM(verts)));
    el.dataset.activeVertices = String(verts.length);
    el.dataset.activeLatlngs = JSON.stringify(verts.map((v) => [Number(v.lat.toFixed(6)), Number(v.lng.toFixed(6))]));
  };

  const scheduleLive = (ring: LatLng[]) => {
    publishActive(ring);
    if (liveRafRef.current != null) return;
    liveRafRef.current = requestAnimationFrame(() => {
      liveRafRef.current = null;
      onLiveMeasureRef.current({ areaSqM: polygonAreaSqM(ring), perimeterM: polygonPerimeterM(ring) });
    });
  };

  const redraw = () => {
    const map = mapRef.current;
    if (!map) return;

    layersRef.current.forEach((l) => l.remove());
    layersRef.current = [];
    activeShapeRef.current = null;
    activeVertsRef.current = [];

    polygonsRef.current.forEach((poly) => {
      const isActive = poly.id === activeRef.current;
      const latlngs = poly.vertices.map((v) => [v.lat, v.lng]) as L.LatLngExpression[];

      let shape: L.Polygon | L.Polyline | null = null;
      if (poly.vertices.length >= 3) {
        shape = L.polygon(latlngs, {
          color: poly.color,
          fillColor: poly.color,
          weight: isActive ? 3 : 2,
          opacity: isActive ? 0.95 : 0.6,
          fillOpacity: isActive ? 0.2 : 0.12,
        }).addTo(map);
      } else if (poly.vertices.length === 2) {
        shape = L.polyline(latlngs, {
          color: poly.color,
          weight: isActive ? 3 : 2,
          opacity: 0.9,
          dashArray: '6 6',
        }).addTo(map);
      }
      if (shape) {
        if (!isActive) {
          shape.on('click', (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e);
            onSelectPolygonRef.current(poly.id);
          });
        }
        layersRef.current.push(shape);
        if (isActive) activeShapeRef.current = shape;
      }
      if (isActive) activeVertsRef.current = poly.vertices.slice();

      poly.vertices.forEach((v, idx) => {
        const marker = L.marker([v.lat, v.lng], {
          icon: vertexIcon(poly.color, isActive),
          draggable: isActive,
          keyboard: false,
          zIndexOffset: isActive ? 1000 : 500,
        }).addTo(map);

        if (isActive) {
          marker.on('dragstart', () => {
            isDraggingRef.current = true;
            map.dragging.disable();
            onVertexDragStartRef.current?.();
            marker.getElement()?.classList.add('dragging');
          });
          marker.on('drag', () => {
            const p = marker.getLatLng();
            const ring = activeVertsRef.current.map((vv, i) => (i === idx ? { lat: p.lat, lng: p.lng } : vv));
            activeShapeRef.current?.setLatLngs(ring.map((r) => [r.lat, r.lng]) as L.LatLngExpression[]);
            scheduleLive(ring);
          });
          marker.on('dragend', () => {
            isDraggingRef.current = false;
            map.dragging.enable();
            marker.getElement()?.classList.remove('dragging');
            const p = marker.getLatLng();
            onLiveMeasureRef.current(null);
            onMoveVertexRef.current(poly.id, idx, p.lat, p.lng);
          });
        } else {
          marker.on('click', (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e);
            onSelectPolygonRef.current(poly.id);
          });
        }
        layersRef.current.push(marker);
      });
    });

    const active = polygonsRef.current.find((p) => p.id === activeRef.current);
    publishActive(active ? active.vertices : []);
  };

  // ---- Init the map EXACTLY once. Empty deps so no prop change can re-run this; later
  //      container/viewport/sheet size changes only call invalidateSize — never recreate. ----
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const container = containerRef.current;

    const map = L.map(container, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
      // Render vector layers (polygons/polylines) into a <canvas> instead of SVG so
      // html2canvas can composite them into the PNG export — it cannot rasterize Leaflet's
      // SVG pane. Vertex handles are markers/HTML and click-select uses canvas hit-testing.
      preferCanvas: true,
    });
    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      crossOrigin: 'anonymous', // keep the PNG-export canvas untainted (toBlob)
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
          mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 16);
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
      if (liveRafRef.current != null) cancelAnimationFrame(liveRafRef.current);
      map.remove();
      mapRef.current = null;
      layersRef.current = [];
      activeShapeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Redraw on state change (not during a vertex drag; that updates imperatively) ----
  useEffect(() => {
    if (!isMapReady || isDraggingRef.current) return;
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polygons, activeId, isMapReady]);

  // ---- Injected vertex styles ----
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .measure-vertex {
        background: transparent !important;
        border: none !important;
        touch-action: none;
        display: grid;
        place-items: center;
      }
      .measure-vertex.active { cursor: grab; }
      .measure-vertex.active:active { cursor: grabbing; }
      .measure-vertex-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid #2563eb;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.35);
      }
      .measure-vertex:not(.active) .measure-vertex-dot { width: 10px; height: 10px; border-width: 2.5px; }
      @media (pointer: coarse) {
        .measure-vertex.active .measure-vertex-dot { transition: transform 0.12s ease; }
        .measure-vertex.active.dragging .measure-vertex-dot { transform: scale(1.3); }
      }
      @media (prefers-reduced-motion: reduce) {
        .measure-vertex.active .measure-vertex-dot { transition: none; }
      }
      @media (max-width: 1023px) {
        #area-tool .leaflet-bottom { bottom: var(--mwr-chrome-offset, 0px); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="area-map"
      data-active-vertices="0"
      className="w-full h-[calc(100vh-180px)] lg:h-[75vh] overflow-hidden"
      style={{ minHeight: '350px' }}
    />
  );
}
