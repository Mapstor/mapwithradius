'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the embed map component (client-side only)
const EmbedMap = dynamic(() => import('@/components/map/EmbedMap'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-slate-100 animate-pulse flex items-center justify-center">
      <div className="text-slate-500 text-sm">Loading map...</div>
    </div>
  ),
});

export default function EmbedPage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-slate-100" />}>
      <EmbedMap />
    </Suspense>
  );
}
