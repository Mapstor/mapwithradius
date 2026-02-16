'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { geocodeAddress, searchLocations, GeocodingResult } from '@/lib/geocoding';
import { DistanceUnit } from '@/lib/haversine';

interface MapControlsProps {
  radius: number;
  unit: DistanceUnit;
  color: string;
  onRadiusChange: (radius: number) => void;
  onUnitChange: (unit: DistanceUnit) => void;
  onColorChange: (color: string) => void;
  onLocationSearch: (lat: number, lng: number, displayName: string) => void;
  onUseMyLocation: () => void;
  onAddCircle: () => void;
  onClearAll: () => void;
  onCopyLink: () => void;
  onDownloadPNG: () => void;
  onExportKML: () => void;
  circleCount: number;
  isLocating: boolean;
}

const PRESET_COLORS = [
  { color: '#3B82F6', name: 'Blue' },
  { color: '#EF4444', name: 'Red' },
  { color: '#22C55E', name: 'Green' },
  { color: '#F59E0B', name: 'Orange' },
  { color: '#8B5CF6', name: 'Purple' },
  { color: '#0F172A', name: 'Dark' },
];

const MILE_PRESETS = [1, 5, 10, 25, 50, 100];
const KM_PRESETS = [1, 5, 10, 50, 100];

// Format radius with dot separator, max 1 decimal place
function formatRadiusDisplay(value: number): string {
  // If it's a whole number or very close to one, show no decimals
  if (Math.abs(value - Math.round(value)) < 0.05) {
    return Math.round(value).toString();
  }
  // Otherwise show 1 decimal place
  return value.toFixed(1);
}

export default function MapControls({
  radius,
  unit,
  color,
  onRadiusChange,
  onUnitChange,
  onColorChange,
  onLocationSearch,
  onUseMyLocation,
  onAddCircle,
  onClearAll,
  onCopyLink,
  onDownloadPNG,
  onExportKML,
  circleCount,
  isLocating,
}: MapControlsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for autocomplete
  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
    setSearchError(null);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Don't search if query is too short
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce the search
    setIsLoadingSuggestions(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchLocations(value, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setIsLoadingSuggestions(false);
    }, 300);
  }, []);

  // Handle selecting a suggestion
  const handleSelectSuggestion = useCallback((suggestion: GeocodingResult) => {
    setSearchQuery(suggestion.displayName);
    setSuggestions([]);
    setShowSuggestions(false);
    onLocationSearch(suggestion.lat, suggestion.lng, suggestion.displayName);
  }, [onLocationSearch]);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;

      setShowSuggestions(false);
      setIsSearching(true);
      setSearchError(null);

      const result = await geocodeAddress(searchQuery);

      if (result) {
        onLocationSearch(result.lat, result.lng, result.displayName);
        setSearchError(null);
      } else {
        setSearchError('Location not found. Try a different search.');
      }

      setIsSearching(false);
    },
    [searchQuery, onLocationSearch]
  );

  const handleCopyLink = useCallback(() => {
    onCopyLink();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [onCopyLink]);

  return (
    <div className="controls-panel controls-overlay max-h-[calc(100vh-120px)] lg:max-h-none">
      {/* Location Section */}
      <div>
        <div className="control-section-label">Location</div>
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            {isSearching ? (
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
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
            )}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search address, city, or zip..."
              disabled={isSearching}
              className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={onUseMyLocation}
              disabled={isLocating || isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
              title="Use my location"
            >
              {isLocating ? (
                <svg className="w-4 h-4 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-slate-500 hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>

            {/* Autocomplete suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.lat}-${suggestion.lng}-${index}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-slate-700 line-clamp-2">{suggestion.displayName}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Loading indicator for suggestions */}
            {isLoadingSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 px-3 py-2.5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Searching...
                </div>
              </div>
            )}
          </div>
        </form>
        {/* Use My Location Button */}
        <button
          type="button"
          onClick={onUseMyLocation}
          disabled={isLocating || isSearching}
          className="w-full mt-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {searchError && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {searchError}
          </p>
        )}
      </div>

      {/* Radius Settings Section */}
      <div>
        <div className="control-section-label">Radius Settings</div>
        <div className="input-group mb-3">
          <input
            type="text"
            inputMode="decimal"
            value={formatRadiusDisplay(radius)}
            onChange={(e) => {
              // Replace comma with dot and parse
              const value = e.target.value.replace(',', '.');
              const parsed = parseFloat(value);
              if (!isNaN(parsed) && parsed >= 0.1) {
                onRadiusChange(parsed);
              } else if (value === '' || value === '0' || value === '0.') {
                onRadiusChange(0.1);
              }
            }}
            className="flex-1"
          />
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as DistanceUnit)}
            className="w-28"
          >
            <option value="miles">Miles</option>
            <option value="kilometers">Kilometers</option>
            <option value="meters">Meters</option>
            <option value="feet">Feet</option>
          </select>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-medium">Quick presets</div>
          <div className="flex flex-wrap gap-1.5">
            {MILE_PRESETS.map((preset) => (
              <button
                key={`mi-${preset}`}
                onClick={() => {
                  onRadiusChange(preset);
                  onUnitChange('miles');
                }}
                className="preset-button"
              >
                {preset} mi
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {KM_PRESETS.map((preset) => (
              <button
                key={`km-${preset}`}
                onClick={() => {
                  onRadiusChange(preset);
                  onUnitChange('kilometers');
                }}
                className="preset-button"
              >
                {preset} km
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div>
        <div className="control-section-label">Appearance</div>
        <div className="flex items-center gap-3">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset.color}
              onClick={() => onColorChange(preset.color)}
              className={`color-swatch ${color === preset.color ? 'selected' : ''}`}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Circle Management */}
      <div>
        <div className="control-section-label">Circles</div>
        <div className="flex gap-2">
          <button
            onClick={onAddCircle}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Circle
          </button>
          <button
            onClick={onClearAll}
            disabled={circleCount === 0}
            className="btn-secondary px-4"
          >
            Clear
          </button>
        </div>
        {circleCount > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            {circleCount} circle{circleCount > 1 ? 's' : ''} on map
          </p>
        )}
      </div>

      {/* Export Section */}
      <div className="border-t border-slate-200 pt-5">
        <div className="control-section-label">Share & Export</div>
        <div className="space-y-2">
          <button
            onClick={handleCopyLink}
            disabled={circleCount === 0}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            {copySuccess ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy Shareable Link
              </>
            )}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onDownloadPNG}
              disabled={circleCount === 0}
              className="flex-1 btn-secondary flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              PNG
            </button>
            <button
              onClick={onExportKML}
              disabled={circleCount === 0}
              className="flex-1 btn-secondary flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              KML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
