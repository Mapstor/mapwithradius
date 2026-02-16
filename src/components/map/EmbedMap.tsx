'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toMeters, fromMeters, DistanceUnit } from '@/lib/haversine';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface EmbedCircle {
  lat: number;
  lng: number;
  radius: number;
  unit: DistanceUnit;
  color: string;
}

function parseRadiusString(radiusStr: string): { radius: number; unit: DistanceUnit } | null {
  const match = radiusStr.match(/^([\d.]+)(mi|km|m|ft)?$/i);
  if (!match) return null;

  const radius = parseFloat(match[1]);
  if (isNaN(radius)) return null;

  let unit: DistanceUnit = 'miles';
  if (match[2]) {
    const unitStr = match[2].toLowerCase();
    switch (unitStr) {
      case 'mi':
        unit = 'miles';
        break;
      case 'km':
        unit = 'kilometers';
        break;
      case 'm':
        unit = 'meters';
        break;
      case 'ft':
        unit = 'feet';
        break;
    }
  }

  return { radius, unit };
}

function parseEmbedParams(searchParams: URLSearchParams): {
  circles: EmbedCircle[];
  zoom?: number;
  interactive: boolean;
  controls: boolean;
} {
  const result: {
    circles: EmbedCircle[];
    zoom?: number;
    interactive: boolean;
    controls: boolean;
  } = {
    circles: [],
    interactive: searchParams.get('interactive') !== 'false',
    controls: searchParams.get('controls') !== 'false',
  };

  // Parse zoom
  const zoomStr = searchParams.get('zoom');
  if (zoomStr) {
    const zoom = parseInt(zoomStr);
    if (!isNaN(zoom) && zoom >= 1 && zoom <= 19) {
      result.zoom = zoom;
    }
  }

  // Check for multiple circles format: ?c=lat,lng,radius,color&c=lat,lng,radius,color
  const circleParams = searchParams.getAll('c');
  if (circleParams.length > 0) {
    for (const c of circleParams) {
      const parts = c.split(',');
      if (parts.length >= 3) {
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        const radiusParsed = parseRadiusString(parts[2]);
        const color = parts[3] ? `#${parts[3].replace('#', '')}` : '#4285F4';

        if (!isNaN(lat) && !isNaN(lng) && radiusParsed) {
          result.circles.push({
            lat,
            lng,
            radius: radiusParsed.radius,
            unit: radiusParsed.unit,
            color,
          });
        }
      }
    }
    return result;
  }

  // Check for single circle format: ?lat=X&lng=Y&r=10mi&color=ff4444
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');
  const radiusStr = searchParams.get('r');
  const color = searchParams.get('color');

  if (!isNaN(lat) && !isNaN(lng)) {
    const radiusParsed = radiusStr ? parseRadiusString(radiusStr) : { radius: 10, unit: 'miles' as DistanceUnit };
    if (radiusParsed) {
      result.circles.push({
        lat,
        lng,
        radius: radiusParsed.radius,
        unit: radiusParsed.unit,
        color: color ? `#${color.replace('#', '')}` : '#4285F4',
      });
    }
  }

  return result;
}

export default function EmbedMap() {
  const searchParams = useSearchParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleLayersRef = useRef<L.Circle[]>([]);
  const markerLayersRef = useRef<L.Marker[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ReturnType<typeof parseEmbedParams> | null>(null);

  // Parse URL params
  useEffect(() => {
    setParams(parseEmbedParams(searchParams));
  }, [searchParams]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !params) return;

    const hasCircles = params.circles.length > 0;
    const firstCircle = params.circles[0];

    const map = L.map(mapContainer.current, {
      center: hasCircles ? [firstCircle.lat, firstCircle.lng] : [39.8283, -98.5795],
      zoom: params.zoom || (hasCircles ? 10 : 4),
      zoomControl: params.controls,
      dragging: params.interactive,
      scrollWheelZoom: params.interactive,
      doubleClickZoom: params.interactive,
      touchZoom: params.interactive,
    });

    if (params.controls) {
      L.control.zoom({ position: 'topleft' }).addTo(map);
      L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Add initial circles
    addCirclesToMap(params.circles);

    // Fit bounds if multiple circles
    if (params.circles.length > 1) {
      const bounds = L.latLngBounds(params.circles.map(c => [c.lat, c.lng]));
      // Extend bounds by radius
      params.circles.forEach(c => {
        const radiusMeters = toMeters(c.radius, c.unit);
        bounds.extend(L.latLng(c.lat, c.lng).toBounds(radiusMeters * 2));
      });
      map.fitBounds(bounds, { padding: [30, 30] });
    } else if (params.circles.length === 1 && !params.zoom) {
      // Fit to single circle
      const c = params.circles[0];
      const radiusMeters = toMeters(c.radius, c.unit);
      const circleBounds = L.latLng(c.lat, c.lng).toBounds(radiusMeters * 2);
      map.fitBounds(circleBounds, { padding: [30, 30] });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [params]);

  // Add circles to the map
  const addCirclesToMap = useCallback((circles: EmbedCircle[]) => {
    if (!mapRef.current) return;

    // Clear existing
    circleLayersRef.current.forEach(c => c.remove());
    markerLayersRef.current.forEach(m => m.remove());
    circleLayersRef.current = [];
    markerLayersRef.current = [];

    circles.forEach(circleData => {
      const radiusMeters = toMeters(circleData.radius, circleData.unit);

      const circle = L.circle([circleData.lat, circleData.lng], {
        radius: radiusMeters,
        color: circleData.color,
        fillColor: circleData.color,
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(mapRef.current!);

      const centerIcon = L.divIcon({
        className: 'custom-center-marker',
        html: `<div style="width: 14px; height: 14px; background-color: ${circleData.color}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([circleData.lat, circleData.lng], {
        icon: centerIcon,
      }).addTo(mapRef.current!);

      // Add popup with circle info
      const unitLabel = {
        miles: 'mi',
        kilometers: 'km',
        meters: 'm',
        feet: 'ft',
      };
      circle.bindPopup(`
        <div class="text-sm">
          <p><strong>Radius:</strong> ${circleData.radius} ${unitLabel[circleData.unit]}</p>
          <p><strong>Center:</strong> ${circleData.lat.toFixed(4)}, ${circleData.lng.toFixed(4)}</p>
        </div>
      `);

      circleLayersRef.current.push(circle);
      markerLayersRef.current.push(marker);
    });
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchValue.trim() || !mapRef.current) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}&limit=1`,
        {
          headers: {
            'User-Agent': 'MapWithRadius/1.0',
          },
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 12);
      } else {
        setError('Location not found');
      }
    } catch {
      setError('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  if (!params) {
    return <div className="w-screen h-screen bg-slate-100" />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Map */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Search bar (if controls enabled and no circles pre-defined) */}
      {params.controls && params.circles.length === 0 && (
        <div className="absolute top-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-72 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg p-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search location..."
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSearching ? '...' : 'Go'}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-1 px-1">{error}</p>
            )}
          </div>
        </div>
      )}

      {/* Powered by attribution */}
      <a
        href="https://mapwithradius.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 z-[1000] bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
      >
        Powered by <span className="font-medium">Map With Radius</span>
      </a>

      {/* Empty state message */}
      {params.circles.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] bg-white rounded-lg shadow-lg p-6 text-center max-w-sm mx-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">No Radius Defined</h2>
          <p className="text-sm text-slate-600 mb-4">
            Add parameters to the URL to display a radius circle.
          </p>
          <div className="text-left bg-slate-50 rounded p-3 text-xs font-mono text-slate-700">
            <p className="mb-1">?lat=40.7128&lng=-74.006&r=5mi</p>
            <p className="text-slate-500">or</p>
            <p className="mt-1">?lat=51.5&lng=-0.1&r=10km&color=ff4444</p>
          </div>
        </div>
      )}
    </div>
  );
}
