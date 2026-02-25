'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { geocodeAddress, searchLocations, GeocodingResult } from '@/lib/geocoding';
import { DistanceUnit } from '@/lib/haversine';

interface MobileBottomSheetProps {
  isExpanded: boolean;
  onToggle: () => void;
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

const QUICK_PRESETS = [
  { value: 1, unit: 'miles' as DistanceUnit, label: '1 mi' },
  { value: 5, unit: 'miles' as DistanceUnit, label: '5 mi' },
  { value: 10, unit: 'miles' as DistanceUnit, label: '10 mi' },
  { value: 5, unit: 'kilometers' as DistanceUnit, label: '5 km' },
  { value: 10, unit: 'kilometers' as DistanceUnit, label: '10 km' },
];

function formatRadiusDisplay(value: number): string {
  if (Math.abs(value - Math.round(value)) < 0.05) {
    return Math.round(value).toString();
  }
  return value.toFixed(1);
}

export default function MobileBottomSheet({
  isExpanded,
  onToggle,
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
}: MobileBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [radiusInputValue, setRadiusInputValue] = useState(formatRadiusDisplay(radius));
  const [isRadiusInputFocused, setIsRadiusInputFocused] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Sync radius input with prop when not focused
  useEffect(() => {
    if (!isRadiusInputFocused) {
      setRadiusInputValue(formatRadiusDisplay(radius));
    }
  }, [radius, isRadiusInputFocused]);

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

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchLocations(value, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setIsLoadingSuggestions(false);
    }, 300);
  }, []);

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
        setSearchError('Location not found');
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

  const handleRadiusInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.');
    setRadiusInputValue(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0.1) {
      onRadiusChange(parsed);
    }
  }, [onRadiusChange]);

  const handleRadiusBlur = useCallback(() => {
    setIsRadiusInputFocused(false);
    const parsed = parseFloat(radiusInputValue);
    if (isNaN(parsed) || parsed < 0.1) {
      onRadiusChange(0.1);
      setRadiusInputValue('0.1');
    } else {
      setRadiusInputValue(formatRadiusDisplay(parsed));
    }
  }, [radiusInputValue, onRadiusChange]);

  return (
    <>
      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-[998] backdrop-blur-[2px]"
          onClick={onToggle}
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-[999] bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-140px)]'
        }`}
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center py-3 cursor-pointer active:bg-slate-50"
          onClick={onToggle}
        >
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Collapsed View - Always visible quick controls */}
        <div className="px-4 pb-3">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-3">
            <div className="relative">
              {isSearching ? (
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Search location..."
                disabled={isSearching}
                className="w-full pl-11 pr-14 py-3.5 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-slate-50"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={onUseMyLocation}
                disabled={isLocating || isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-accent/10 active:bg-accent/20 transition-colors"
                title="Use my location"
              >
                {isLocating ? (
                  <svg className="w-5 h-5 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>

              {/* Autocomplete suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.lat}-${suggestion.lng}-${index}`}
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-3.5 text-base hover:bg-slate-50 active:bg-slate-100 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-slate-700 line-clamp-2">{suggestion.displayName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Loading indicator */}
              {isLoadingSuggestions && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 px-4 py-3 text-base text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Searching...
                  </div>
                </div>
              )}
            </div>
            {searchError && (
              <p className="mt-2 text-sm text-red-600">{searchError}</p>
            )}
          </form>

          {/* Radius Input Row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl p-1">
              <input
                type="text"
                inputMode="decimal"
                value={radiusInputValue}
                onChange={handleRadiusInputChange}
                onFocus={() => setIsRadiusInputFocused(true)}
                onBlur={handleRadiusBlur}
                className="w-20 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-base text-center font-medium focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
              <select
                value={unit}
                onChange={(e) => onUnitChange(e.target.value as DistanceUnit)}
                className="flex-1 py-2.5 px-2 bg-white border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-accent focus:border-accent outline-none appearance-none"
              >
                <option value="miles">Miles</option>
                <option value="kilometers">Kilometers</option>
                <option value="meters">Meters</option>
                <option value="feet">Feet</option>
              </select>
            </div>
            <button
              onClick={onToggle}
              className="p-3 bg-slate-100 rounded-xl active:bg-slate-200 transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'More options'}
            >
              <svg
                className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

          {/* Quick presets - always visible */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {QUICK_PRESETS.map((preset) => (
              <button
                key={`${preset.value}-${preset.unit}`}
                onClick={() => {
                  onRadiusChange(preset.value);
                  onUnitChange(preset.unit);
                  setRadiusInputValue(String(preset.value));
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  radius === preset.value && unit === preset.unit
                    ? 'bg-accent text-white'
                    : 'bg-slate-100 text-slate-700 active:bg-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expanded View - Additional controls */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-6 pt-2 border-t border-slate-100">
            {/* Color Selection */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Circle Color</div>
              <div className="flex items-center gap-3">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.color}
                    onClick={() => onColorChange(preset.color)}
                    className={`w-9 h-9 rounded-full border-2 border-white shadow-md transition-all ${
                      color === preset.color ? 'ring-2 ring-accent ring-offset-2 scale-110' : 'active:scale-95'
                    }`}
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* Circle Actions */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Circles</div>
              <div className="flex gap-2">
                <button
                  onClick={onAddCircle}
                  className="flex-1 py-3 bg-accent text-white rounded-xl font-medium flex items-center justify-center gap-2 active:bg-accent-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Circle
                </button>
                <button
                  onClick={onClearAll}
                  disabled={circleCount === 0}
                  className="px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium active:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              </div>
              {circleCount > 0 && (
                <p className="mt-2 text-sm text-slate-500">
                  {circleCount} circle{circleCount > 1 ? 's' : ''} on map
                </p>
              )}
            </div>

            {/* Share & Export */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Share & Export</div>
              <button
                onClick={handleCopyLink}
                disabled={circleCount === 0}
                className="w-full mb-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 active:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {copySuccess ? (
                  <>
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Copy Share Link
                  </>
                )}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onDownloadPNG}
                  disabled={circleCount === 0}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 active:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  PNG
                </button>
                <button
                  onClick={onExportKML}
                  disabled={circleCount === 0}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 active:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  KML
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-safe-bottom bg-white" />
      </div>
    </>
  );
}
