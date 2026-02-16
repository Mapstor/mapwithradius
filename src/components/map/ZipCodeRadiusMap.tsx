'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getZipCode, findZipCodesWithinRadius, zipCodesToCsv, type ZipCodeWithDistance } from '@/lib/zipCodes';
import { toMeters, fromMeters, type DistanceUnit } from '@/lib/haversine';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type SortField = 'zip' | 'city' | 'state' | 'distance';
type SortDirection = 'asc' | 'desc';

export default function ZipCodeRadiusMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const centerMarkerRef = useRef<L.Marker | null>(null);
  const zipMarkersRef = useRef<L.Marker[]>([]);

  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(10);
  const [unit, setUnit] = useState<DistanceUnit>('miles');
  const [results, setResults] = useState<ZipCodeWithDistance[]>([]);
  const [centerZip, setCenterZip] = useState<{ zip: string; lat: number; lng: number; city: string; state: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('distance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isMapReady, setIsMapReady] = useState(false);

  // Convert radius to miles for calculations
  const radiusInMiles = useMemo(() => {
    if (unit === 'miles') return radius;
    if (unit === 'kilometers') return radius * 0.621371;
    if (unit === 'meters') return radius * 0.000621371;
    if (unit === 'feet') return radius / 5280;
    return radius;
  }, [radius, unit]);

  // Sorted results
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'zip':
          comparison = a.zip.localeCompare(b.zip);
          break;
        case 'city':
          comparison = a.city.localeCompare(b.city);
          break;
        case 'state':
          comparison = a.state.localeCompare(b.state);
          break;
        case 'distance':
          comparison = a.distance - b.distance;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [results, sortField, sortDirection]);

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

    mapRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Clear map overlays
  const clearMapOverlays = useCallback(() => {
    if (circleRef.current) {
      circleRef.current.remove();
      circleRef.current = null;
    }
    if (centerMarkerRef.current) {
      centerMarkerRef.current.remove();
      centerMarkerRef.current = null;
    }
    zipMarkersRef.current.forEach((marker) => marker.remove());
    zipMarkersRef.current = [];
  }, []);

  // Search for zip codes within radius
  const searchZipCodes = useCallback(async () => {
    if (!zipCode.trim()) {
      setError('Please enter a zip code');
      return;
    }

    if (!mapRef.current || !isMapReady) return;

    setIsSearching(true);
    setError(null);
    clearMapOverlays();

    // Try to find the zip code in our database
    const foundZip = getZipCode(zipCode.trim());

    if (foundZip) {
      setCenterZip(foundZip);

      // Find all zip codes within radius
      const nearbyZips = findZipCodesWithinRadius(foundZip.lat, foundZip.lng, radiusInMiles);
      setResults(nearbyZips);

      // Draw circle on map
      const radiusMeters = toMeters(radiusInMiles, 'miles');
      const circle = L.circle([foundZip.lat, foundZip.lng], {
        radius: radiusMeters,
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        weight: 2,
      }).addTo(mapRef.current);
      circleRef.current = circle;

      // Add center marker
      const centerIcon = L.divIcon({
        className: 'custom-center-marker',
        html: `<div style="width: 20px; height: 20px; background-color: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const centerMarker = L.marker([foundZip.lat, foundZip.lng], {
        icon: centerIcon,
        zIndexOffset: 1000,
      }).addTo(mapRef.current);
      centerMarker.bindPopup(`<strong>${foundZip.zip}</strong><br/>${foundZip.city}, ${foundZip.state}<br/><em>Search center</em>`);
      centerMarkerRef.current = centerMarker;

      // Add markers for each zip code found
      const zipIcon = L.divIcon({
        className: 'custom-zip-marker',
        html: `<div style="width: 10px; height: 10px; background-color: #8b5cf6; border: 2px solid white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      nearbyZips.forEach((zip) => {
        // Don't add marker for center zip code
        if (zip.zip === foundZip.zip) return;

        const marker = L.marker([zip.lat, zip.lng], {
          icon: zipIcon,
        }).addTo(mapRef.current!);
        marker.bindPopup(`<strong>${zip.zip}</strong><br/>${zip.city}, ${zip.state}<br/>${zip.distance} miles from center`);
        zipMarkersRef.current.push(marker);
      });

      // Fit map to circle bounds with padding
      mapRef.current.fitBounds(circle.getBounds(), { padding: [50, 50] });
    } else {
      setError('Zip code not found in database. Try a major US city zip code (e.g., 10001 for NYC, 90001 for LA, 60601 for Chicago).');
      setResults([]);
      setCenterZip(null);
    }

    setIsSearching(false);
  }, [zipCode, radiusInMiles, isMapReady, clearMapOverlays]);

  // Handle sort click
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  // Export to CSV
  const exportCsv = useCallback(() => {
    if (results.length === 0) return;

    const csv = zipCodesToCsv(sortedResults);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zip-codes-${centerZip?.zip || 'radius'}-${radiusInMiles}mi.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results, sortedResults, centerZip, radiusInMiles]);

  // Sort indicator
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-slate-300 ml-1">&#x25B2;&#x25BC;</span>;
    return <span className="ml-1">{sortDirection === 'asc' ? '&#x25B2;' : '&#x25BC;'}</span>;
  };

  return (
    <div className="relative">
      {/* Map */}
      <div
        ref={containerRef}
        className="w-full h-[60vh] lg:h-[75vh] overflow-hidden"
        style={{ minHeight: '400px' }}
      />

      {/* Controls Panel */}
      <div className="absolute top-4 right-4 w-80 lg:w-96 max-h-[calc(100%-2rem)] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col z-[1000]">
        {/* Search Form */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Find Zip Codes Within Radius</h3>

          {/* Zip Code Input */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">US Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              onKeyDown={(e) => e.key === 'Enter' && searchZipCodes()}
              placeholder="e.g., 10001"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={5}
            />
          </div>

          {/* Radius Input */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Radius</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Math.max(1, parseFloat(e.target.value) || 1))}
                onKeyDown={(e) => e.key === 'Enter' && searchZipCodes()}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={1}
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as DistanceUnit)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="miles">miles</option>
                <option value="kilometers">km</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={searchZipCodes}
            disabled={isSearching}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Results Panel */}
        {results.length > 0 && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Results Header */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {results.length} zip code{results.length !== 1 ? 's' : ''} found
              </span>
              <button
                onClick={exportCsv}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>

            {/* Results Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th
                      className="px-3 py-2 text-left font-medium text-slate-700 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('zip')}
                    >
                      Zip <SortIndicator field="zip" />
                    </th>
                    <th
                      className="px-3 py-2 text-left font-medium text-slate-700 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('city')}
                    >
                      City <SortIndicator field="city" />
                    </th>
                    <th
                      className="px-3 py-2 text-left font-medium text-slate-700 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('state')}
                    >
                      State <SortIndicator field="state" />
                    </th>
                    <th
                      className="px-3 py-2 text-right font-medium text-slate-700 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('distance')}
                    >
                      Mi <SortIndicator field="distance" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((zip, index) => (
                    <tr
                      key={zip.zip}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 cursor-pointer`}
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.setView([zip.lat, zip.lng], 13);
                        }
                      }}
                    >
                      <td className="px-3 py-2 font-mono">{zip.zip}</td>
                      <td className="px-3 py-2 truncate max-w-[100px]" title={zip.city}>{zip.city}</td>
                      <td className="px-3 py-2">{zip.state}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{zip.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && results.length === 0 && centerZip === null && (
          <div className="p-4 text-center text-slate-500 text-sm">
            Enter a US zip code and radius to find all zip codes within that area.
          </div>
        )}
      </div>

      {/* Mobile Controls Button */}
      <div className="lg:hidden absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="Zip code"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              maxLength={5}
            />
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              min={1}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as DistanceUnit)}
              className="px-2 py-2 border border-slate-300 rounded-lg text-sm bg-white"
            >
              <option value="miles">mi</option>
              <option value="kilometers">km</option>
            </select>
          </div>
          <button
            onClick={searchZipCodes}
            disabled={isSearching}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg text-sm"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
          {results.length > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-600">{results.length} zip codes found</span>
              <button onClick={exportCsv} className="text-blue-600 font-medium">
                Export CSV
              </button>
            </div>
          )}
          {error && (
            <div className="mt-2 text-sm text-red-600">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
