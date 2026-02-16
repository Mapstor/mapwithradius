'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { haversineDistance, formatDistance } from '@/lib/haversine';
import { geocodeAddress } from '@/lib/geocoding';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Point {
  lat: number;
  lng: number;
  label: string;
}

interface RouteResult {
  distance: number; // in meters
  duration: number; // in seconds
  geometry: [number, number][]; // [lng, lat] pairs
}

export default function DistanceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [straightLineDistance, setStraightLineDistance] = useState<number | null>(null);
  const [roadDistance, setRoadDistance] = useState<RouteResult | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const markersRef = useRef<L.Marker[]>([]);
  const straightLineRef = useRef<L.Polyline | null>(null);
  const roadLineRef = useRef<L.Polyline | null>(null);

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

    map.on('click', (e: L.LeafletMouseEvent) => {
      addPoint(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const addPoint = useCallback((lat: number, lng: number) => {
    setPoints((prev) => {
      const nextLabel = String.fromCharCode(65 + prev.length); // A, B, C, etc.
      if (prev.length >= 10) return prev; // Max 10 points
      return [...prev, { lat, lng, label: nextLabel }];
    });
  }, []);

  // Update markers and lines when points change
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Clear existing lines
    if (straightLineRef.current) {
      straightLineRef.current.remove();
      straightLineRef.current = null;
    }
    if (roadLineRef.current) {
      roadLineRef.current.remove();
      roadLineRef.current = null;
    }

    // Add new markers
    points.forEach((point, index) => {
      const icon = L.divIcon({
        className: 'custom-point-marker',
        html: `<div style="
          width: 32px;
          height: 32px;
          background-color: ${index === 0 ? '#22C55E' : index === points.length - 1 ? '#EF4444' : '#3B82F6'};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">${point.label}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([point.lat, point.lng], {
        icon,
        draggable: true,
      }).addTo(map);

      marker.on('dragend', (e) => {
        const newPos = (e.target as L.Marker).getLatLng();
        setPoints((prev) =>
          prev.map((p, i) => (i === index ? { ...p, lat: newPos.lat, lng: newPos.lng } : p))
        );
      });

      marker.bindPopup(`
        <div class="text-sm">
          <p class="font-medium">Point ${point.label}</p>
          <p>${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}</p>
        </div>
      `);

      markersRef.current.push(marker);
    });

    // Draw straight line between all points
    if (points.length >= 2) {
      const latLngs = points.map((p) => [p.lat, p.lng] as [number, number]);

      straightLineRef.current = L.polyline(latLngs, {
        color: '#3B82F6',
        weight: 3,
        dashArray: '10, 10',
        opacity: 0.8,
      }).addTo(map);

      // Calculate total straight-line distance
      let totalDistance = 0;
      for (let i = 0; i < points.length - 1; i++) {
        totalDistance += haversineDistance(
          points[i].lat,
          points[i].lng,
          points[i + 1].lat,
          points[i + 1].lng,
          'miles'
        );
      }
      setStraightLineDistance(totalDistance);

      // Fit bounds to show all points
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50] });

      // Fetch road route
      fetchRoute(points);
    } else {
      setStraightLineDistance(null);
      setRoadDistance(null);
    }
  }, [points]);

  const fetchRoute = async (pts: Point[]) => {
    if (pts.length < 2) return;

    setIsLoadingRoute(true);

    try {
      // Build OSRM coordinates string
      const coords = pts.map((p) => `${p.lng},${p.lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const geometry = route.geometry.coordinates as [number, number][];

        setRoadDistance({
          distance: route.distance,
          duration: route.duration,
          geometry,
        });

        // Draw road route
        if (mapRef.current) {
          if (roadLineRef.current) {
            roadLineRef.current.remove();
          }

          // Convert [lng, lat] to [lat, lng] for Leaflet
          const latLngs = geometry.map(([lng, lat]) => [lat, lng] as [number, number]);

          roadLineRef.current = L.polyline(latLngs, {
            color: '#8B5CF6',
            weight: 4,
            opacity: 0.9,
          }).addTo(mapRef.current);
        }
      } else {
        setRoadDistance(null);
      }
    } catch (error) {
      console.error('Route fetch error:', error);
      setRoadDistance(null);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    const result = await geocodeAddress(searchQuery);

    if (result) {
      addPoint(result.lat, result.lng);
      setSearchQuery('');

      if (mapRef.current) {
        mapRef.current.setView([result.lat, result.lng], 12);
      }
    } else {
      setSearchError('Location not found. Try a different search.');
    }

    setIsSearching(false);
  };

  const handleClear = () => {
    setPoints([]);
    setStraightLineDistance(null);
    setRoadDistance(null);
  };

  const handleRemoveLastPoint = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        addPoint(latitude, longitude);
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 12);
        }
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        setSearchError(errorMessage);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="relative">
      {/* Instructions banner */}
      {points.length === 0 && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          Click on the map or search for a location to set Point A
        </div>
      )}
      {points.length === 1 && (
        <div className="absolute top-4 left-1/2 lg:left-1/3 -translate-x-1/2 z-[1000] bg-primary-900/95 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg backdrop-blur-sm">
          Click on the map to set Point B
        </div>
      )}

      <div className="relative">
        {/* Map */}
        <div className="w-full">
          <div
            ref={containerRef}
            className="w-full h-[60vh] lg:h-[75vh] overflow-hidden"
            style={{ minHeight: '300px' }}
          />
        </div>

        {/* Controls Panel */}
        <div className="lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:z-[500] mt-4 lg:mt-0 px-4 lg:px-0">
          <div className="controls-panel controls-overlay">
            {/* Search Section */}
            <div>
              <div className="control-section-label">Add Location</div>
              <form onSubmit={handleSearch} className="space-y-2">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search address, city, or zip..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 hover:border-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || isLocating}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Point {String.fromCharCode(65 + points.length)}
                    </>
                  )}
                </button>

                {/* Use My Location Button */}
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={isLocating || isSearching || points.length >= 10}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLocating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Detecting location...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" />
                      </svg>
                      Use My Location
                    </>
                  )}
                </button>
              </form>
              {searchError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {searchError}
                </p>
              )}
            </div>

            {/* Points List */}
            {points.length > 0 && (
              <div>
                <div className="control-section-label">Points ({points.length})</div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm bg-slate-50 rounded-lg px-3 py-2"
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{
                          backgroundColor: index === 0 ? '#22C55E' : index === points.length - 1 ? '#EF4444' : '#3B82F6',
                        }}
                      >
                        {point.label}
                      </span>
                      <span className="text-slate-600 truncate flex-1">
                        {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleRemoveLastPoint}
                    className="flex-1 btn-secondary text-sm"
                  >
                    Remove Last
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 btn-secondary text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Results Section */}
            {points.length >= 2 && (
              <div className="border-t border-slate-200 pt-5">
                <div className="control-section-label">Distance Results</div>
                <div className="space-y-3">
                  {/* Straight Line Distance */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-blue-500" style={{ borderBottom: '2px dashed #3B82F6' }} />
                      <span className="text-xs font-medium text-blue-700">Straight Line</span>
                    </div>
                    {straightLineDistance !== null && (
                      <div className="text-lg font-bold text-slate-900">
                        {formatDistance(straightLineDistance, 'miles')}
                        <span className="text-slate-500 font-normal text-sm ml-2">
                          ({formatDistance(straightLineDistance * 1.60934, 'kilometers')})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Road Distance */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-purple-500" />
                      <span className="text-xs font-medium text-purple-700">By Road</span>
                    </div>
                    {isLoadingRoute ? (
                      <div className="flex items-center gap-2 text-slate-500">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Calculating route...
                      </div>
                    ) : roadDistance ? (
                      <>
                        <div className="text-lg font-bold text-slate-900">
                          {formatDistance(roadDistance.distance / 1609.344, 'miles')}
                          <span className="text-slate-500 font-normal text-sm ml-2">
                            ({formatDistance(roadDistance.distance / 1000, 'kilometers')})
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDuration(roadDistance.duration)} drive
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-500">Route not available</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            {points.length >= 2 && (
              <div className="text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5" style={{ borderBottom: '2px dashed #3B82F6' }} />
                  <span>Straight-line distance (as the crow flies)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500" />
                  <span>Road distance (actual driving route)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
