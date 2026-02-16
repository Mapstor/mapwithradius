'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MiniRadiusMapProps {
  center?: [number, number];
  radiusMiles?: number;
  height?: string;
}

export default function MiniRadiusMap({
  center = [40.7128, -74.006], // New York City
  radiusMiles = 10,
  height = '400px',
}: MiniRadiusMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [radius, setRadius] = useState(radiusMiles);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainer.current, {
      center,
      zoom: 10,
      zoomControl: true,
      attributionControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add circle
    const circle = L.circle(center, {
      radius: radiusMiles * 1609.34, // Convert miles to meters
      color: '#4285F4',
      fillColor: '#4285F4',
      fillOpacity: 0.15,
      weight: 2,
    }).addTo(map);

    // Add center marker
    L.marker(center, {
      icon: L.divIcon({
        className: 'bg-transparent',
        html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    }).addTo(map);

    // Fit map to circle
    map.fitBounds(circle.getBounds(), { padding: [20, 20] });

    mapRef.current = map;
    circleRef.current = circle;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update circle radius
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radius * 1609.34);
      if (mapRef.current) {
        mapRef.current.fitBounds(circleRef.current.getBounds(), { padding: [20, 20] });
      }
    }
  }, [radius]);

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim() || !mapRef.current) return;

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
        const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];

        if (circleRef.current) {
          circleRef.current.setLatLng(newCenter);
        }

        // Remove old marker and add new one
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            layer.remove();
          }
        });

        L.marker(newCenter, {
          icon: L.divIcon({
            className: 'bg-transparent',
            html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          }),
        }).addTo(mapRef.current);

        mapRef.current.fitBounds(circleRef.current!.getBounds(), { padding: [20, 20] });
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [searchValue]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg">
      {/* Mini controls */}
      <div className="bg-slate-50 p-3 border-b border-slate-200">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search address..."
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600">Radius:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-medium text-slate-700 w-16">{radius} mi</span>
        </div>
      </div>

      {/* Map */}
      <div ref={mapContainer} style={{ height }} />
    </div>
  );
}
