'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CITIES } from '@/data/cities';

// Fix Leaflet default marker icon issue (same approach as RadiusMap)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// 100 miles in meters — visual radius rendered around each city
const HUNDRED_MILES_METERS = 160_934;

export default function CityIndexMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [30, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true,
      scrollWheelZoom: false,
      worldCopyJump: true,
      attributionControl: true,
    });

    // CartoDB Voyager — softer, lighter cartography than default OSM tiles.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    CITIES.forEach((city) => {
      // 100-mile radius circle around each city — subtle visual context.
      // interactive: false so marker click wins when they overlap.
      L.circle([city.lat, city.lng], {
        radius: HUNDRED_MILES_METERS,
        color: '#1e40af',
        weight: 1.25,
        opacity: 0.7,
        fillColor: '#3b82f6',
        fillOpacity: 0.14,
        interactive: false,
      }).addTo(map);

      // Marker with popup linking to the city's page.
      const marker = L.marker([city.lat, city.lng]).addTo(map);
      const html = `
        <div style="min-width: 200px;">
          <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px; font-size: 14px;">${city.name}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">${city.country}</div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 10px; line-height: 1.4;">
            Default radius: <strong>${city.defaultRadius} ${city.defaultUnit === 'miles' ? 'mi' : 'km'}</strong> from ${city.centralLandmark}
          </div>
          <a href="/radius-map/${city.slug}" style="color: #1e40af; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;">View ${city.name} radius map &rarr;</a>
        </div>
      `;
      marker.bindPopup(html);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[360px] sm:h-[480px] rounded-xl overflow-hidden border border-slate-200"
      aria-label="World map with 100-mile radius circles around 25 cities. Tap a marker to open that city's page."
    />
  );
}
