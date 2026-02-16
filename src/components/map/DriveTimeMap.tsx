'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type TravelMode = 'auto' | 'pedestrian' | 'bicycle';

interface DriveTimeMapProps {
  defaultMode?: TravelMode;
  showDrivingOption?: boolean;
}

const TIME_PRESETS = [5, 10, 15, 30, 45, 60, 90, 120];

const MODE_CONFIG: Record<TravelMode, { label: string; icon: string; color: string }> = {
  auto: { label: 'Drive', icon: '🚗', color: '#3B82F6' },
  pedestrian: { label: 'Walk', icon: '🚶', color: '#F97316' },
  bicycle: { label: 'Cycle', icon: '🚴', color: '#22C55E' },
};

export default function DriveTimeMap({
  defaultMode = 'auto',
  showDrivingOption = true
}: DriveTimeMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const isochroneLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleLayerRef = useRef<L.Circle | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [time, setTime] = useState(30);
  const [mode, setMode] = useState<TravelMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRadiusCircle, setShowRadiusCircle] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = L.map(mapContainer.current, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Click on map to set center
    map.on('click', (e: L.LeafletMouseEvent) => {
      setCenter([e.latlng.lat, e.latlng.lng]);
      setLocationName(`${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fetch isochrone from Valhalla
  const fetchIsochrone = useCallback(async () => {
    if (!center || !mapRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const valhallaRequest = {
        locations: [{ lat: center[0], lon: center[1] }],
        costing: mode,
        contours: [{ time: time }],
        polygons: true,
        denoise: 0.5,
        generalize: 50,
      };

      const response = await fetch(
        `https://valhalla1.openstreetmap.de/isochrone?json=${encodeURIComponent(JSON.stringify(valhallaRequest))}`,
        {
          headers: {
            'User-Agent': 'MapWithRadius/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch isochrone');
      }

      const data = await response.json();

      // Clear existing isochrone
      if (isochroneLayerRef.current) {
        isochroneLayerRef.current.remove();
      }

      // Add new isochrone
      const color = MODE_CONFIG[mode].color;
      const isochroneLayer = L.geoJSON(data, {
        style: {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          weight: 2,
        },
      }).addTo(mapRef.current);

      isochroneLayerRef.current = isochroneLayer;

      // Fit bounds to isochrone
      mapRef.current.fitBounds(isochroneLayer.getBounds(), { padding: [50, 50] });
    } catch (err) {
      console.error('Isochrone fetch error:', err);
      setError('Unable to calculate travel time area. Try again or use the radius tool instead.');
    } finally {
      setIsLoading(false);
    }
  }, [center, time, mode]);

  // Update marker when center changes
  useEffect(() => {
    if (!mapRef.current || !center) return;

    if (markerRef.current) {
      markerRef.current.setLatLng(center);
    } else {
      const marker = L.marker(center, {
        icon: L.divIcon({
          className: 'custom-center-marker',
          html: `<div style="width: 20px; height: 20px; background-color: #1E40AF; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
      }).addTo(mapRef.current);
      markerRef.current = marker;
    }

    // Auto-fetch isochrone when center changes
    fetchIsochrone();
  }, [center, fetchIsochrone]);

  // Re-fetch when time or mode changes
  useEffect(() => {
    if (center) {
      fetchIsochrone();
    }
  }, [time, mode, center, fetchIsochrone]);

  // Handle radius circle overlay
  useEffect(() => {
    if (!mapRef.current || !center) return;

    if (circleLayerRef.current) {
      circleLayerRef.current.remove();
      circleLayerRef.current = null;
    }

    if (showRadiusCircle) {
      // Approximate radius based on mode and time
      const speeds: Record<TravelMode, number> = {
        auto: 50, // km/h average
        pedestrian: 5, // km/h
        bicycle: 15, // km/h
      };
      const distanceKm = (speeds[mode] * time) / 60;
      const radiusMeters = distanceKm * 1000;

      const circle = L.circle(center, {
        radius: radiusMeters,
        color: '#9CA3AF',
        fillColor: '#9CA3AF',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5',
      }).addTo(mapRef.current);

      circleLayerRef.current = circle;
    }
  }, [center, showRadiusCircle, time, mode]);

  // Search for address
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
        const { lat, lon, display_name } = data[0];
        const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setCenter(newCenter);
        setLocationName(display_name.split(',').slice(0, 2).join(','));
        mapRef.current.setView(newCenter, 12);
      } else {
        setError('Location not found. Try a different search.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Use current location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
        setCenter(newCenter);
        setLocationName('Your location');
        if (mapRef.current) {
          mapRef.current.setView(newCenter, 12);
        }
        setIsSearching(false);
      },
      () => {
        setError('Location access denied. Please search for an address instead.');
        setIsSearching(false);
      }
    );
  };

  const availableModes = showDrivingOption
    ? (['auto', 'pedestrian', 'bicycle'] as TravelMode[])
    : (['pedestrian', 'bicycle'] as TravelMode[]);

  return (
    <div className="relative h-[60vh] lg:h-[75vh]">
      {/* Map */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Controls Panel */}
      <div className="absolute top-4 right-4 w-80 lg:w-96 bg-white rounded-xl shadow-lg overflow-hidden z-[1000]">
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search address, city, or zip..."
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSearching ? '...' : 'Go'}
              </button>
            </div>
            <button
              onClick={handleUseLocation}
              disabled={isSearching}
              className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Detecting...
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
          </div>

          {/* Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Travel Mode</label>
            <div className="flex gap-2">
              {availableModes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    mode === m
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {MODE_CONFIG[m].icon} {MODE_CONFIG[m].label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Travel Time: <span className="text-blue-600">{time} min</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_PRESETS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    time === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t >= 60 ? `${t / 60}hr` : `${t}min`}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          {/* Show Radius Circle */}
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showRadiusCircle}
              onChange={(e) => setShowRadiusCircle(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Show straight-line radius for comparison
          </label>

          {/* Status */}
          {locationName && (
            <div className="text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
              <span className="font-medium">Center:</span> {locationName}
            </div>
          )}

          {isLoading && (
            <div className="text-sm text-blue-600 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Calculating travel area...
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Instructions */}
        {!center && (
          <div className="px-4 pb-4">
            <p className="text-sm text-slate-500">
              Search for an address or click on the map to set a starting point.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Controls (bottom panel) */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[1000]">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search address..."
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
          >
            Go
          </button>
        </div>
        <button
          onClick={handleUseLocation}
          disabled={isSearching}
          className="w-full mb-3 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Detecting...
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
        <div className="flex gap-2 mb-3">
          {availableModes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg ${
                mode === m ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {MODE_CONFIG[m].icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">{time} min</span>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
