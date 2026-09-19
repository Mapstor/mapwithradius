'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import AcreDimensionsCalculator from './AcreDimensionsCalculator';

// The dimensions calculator is server-rendered (crawlable, primary intent). The map
// overlay stays client-only. This client parent holds the one-way "reflect the size
// onto the map" seed so the calculator and the visual connect.
const AcreCalculatorWrapper = dynamic(() => import('./AcreCalculatorWrapper'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 h-[420px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

export default function AcreCalculatorSection() {
  const [seed, setSeed] = useState<{ areaSqM: number; token: number } | null>(null);
  const tokenRef = useRef(0);
  const mapRef = useRef<HTMLDivElement>(null);

  const showOnMap = (areaSqM: number) => {
    tokenRef.current += 1;
    setSeed({ areaSqM, token: tokenRef.current });
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <AcreDimensionsCalculator onShowOnMap={showOnMap} />

        {/* Cross-link: length × width only works for rectangles. Irregular plots
            belong on the Area Calculator's point-by-point tool. */}
        <Link
          href="/area-calculator"
          className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:border-accent hover:bg-white transition-colors"
        >
          <span aria-hidden className="text-lg leading-none">📐</span>
          <span>
            <span className="font-semibold text-slate-900">Irregular or multi-sided plot?</span>{' '}
            Draw it point-by-point on our Area Calculator <span aria-hidden>→</span>
          </span>
        </Link>
      </div>

      <div ref={mapRef} className="max-w-[1600px] mx-auto map-tool-page scroll-mt-4">
        <AcreCalculatorWrapper seed={seed} />
      </div>
    </>
  );
}
