'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { searchLocations, GeocodingResult } from '@/lib/geocoding';

interface LocationSearchInputProps {
  /** Current input value (controlled). */
  value: string;
  /** Called when the user types. */
  onValueChange: (value: string) => void;
  /** Called when the user picks a suggestion from the dropdown. */
  onSelectLocation: (result: GeocodingResult) => void;
  /** Called when the user presses Enter (legacy form-submit fallback). */
  onSubmit?: () => void;
  placeholder?: string;
  /** Extra classes applied to the <input> (e.g., color overrides). The
   *  component already adds pl-10 (room for the left magnifier icon) — do not
   *  override that unless you also hide the icon. */
  inputClassName?: string;
  disabled?: boolean;
}

export default function LocationSearchInput({
  value,
  onValueChange,
  onSelectLocation,
  onSubmit,
  placeholder = 'Search address, city, or zip...',
  inputClassName = '',
  disabled = false,
}: LocationSearchInputProps) {
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when the user clicks outside the input + dropdown.
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

  const handleChange = useCallback(
    (next: string) => {
      onValueChange(next);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (next.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoadingSuggestions(false);
        return;
      }
      setIsLoadingSuggestions(true);
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchLocations(next, 5);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setIsLoadingSuggestions(false);
      }, 300);
    },
    [onValueChange]
  );

  const handleSelect = useCallback(
    (s: GeocodingResult) => {
      setSuggestions([]);
      setShowSuggestions(false);
      onSelectLocation(s);
    },
    [onSelectLocation]
  );

  return (
    <div className="relative">
      {/* Magnifier icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            setShowSuggestions(false);
            onSubmit();
          }
          if (e.key === 'Escape') {
            setShowSuggestions(false);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={`pl-10 ${inputClassName}`}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[1100] max-h-64 overflow-y-auto"
        >
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lng}-${i}`}
              type="button"
              onClick={() => handleSelect(s)}
              className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 active:bg-slate-100 border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-slate-700 line-clamp-2">{s.displayName}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isLoadingSuggestions && value.trim().length >= 2 && !showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[1100] px-3 py-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching…
          </div>
        </div>
      )}
    </div>
  );
}
