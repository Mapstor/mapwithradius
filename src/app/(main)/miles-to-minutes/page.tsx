import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolHeroImage from '@/components/content/ToolHeroImage';
import { buildToolPageSchema } from '@/lib/toolSchema';

const TITLE = 'Miles to Minutes: How Many Minutes Is 5, 10, 20, 100 Miles?';
const DESCRIPTION =
  'Convert miles to minutes: how long 1 to 100 miles takes to drive on city streets or the highway, or to walk — at a speed you choose. Live calculator with a map. Free.';
const HERO = '/images/miles-to-minutes-10-miles-chicago.png';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/miles-to-minutes' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/miles-to-minutes',
    images: [
      {
        url: HERO,
        width: 1600,
        height: 900,
        alt: 'A 10-mile distance shown on a map next to a miles-to-minutes driving and walking time calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO],
  },
};

const MilesToMinutes = dynamic(() => import('@/components/map/MilesToMinutes'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
    </div>
  ),
});

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How many minutes is 10 miles driving?',
    a: 'About 24 minutes at a 25 mph city average, or roughly 9 minutes at 65 mph on the highway. Real driving time is usually somewhere between, plus time lost to lights, turns, and traffic. Set your own speed in the calculator to get the exact figure.',
  },
  {
    q: 'How long does it take to drive 5 miles?',
    a: 'Roughly 12 minutes at a 25 mph city average, or about 5 minutes at 65 mph on the highway. Short urban trips skew toward the city figure because stops and turns eat most of the time.',
  },
  {
    q: 'How many minutes is 20 miles?',
    a: 'About 48 minutes at 25 mph or roughly 18 minutes at 65 mph. Twenty miles is where highway vs city speed makes the biggest difference — nearly half an hour either way.',
  },
  {
    q: 'How long does it take to walk a mile?',
    a: 'About 20 minutes at an average adult walking pace of 3 mph. Five miles is roughly 1 hour 40 minutes and ten miles is about 3 hours 20 minutes of continuous walking.',
  },
  {
    q: 'Is this the real drive time along roads?',
    a: 'No. These are distance ÷ speed estimates at the speed you pick — a quick planning number, not a routed drive time. For time along actual roads, accounting for the road network, use the drive time map.',
  },
];

export default function MilesToMinutesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageSchema({
              path: '/miles-to-minutes',
              name: 'Miles to Minutes Calculator',
              description: DESCRIPTION,
              breadcrumbName: 'Miles to Minutes',
              image: HERO,
              imageCaption: 'A 10-mile distance on a map alongside its driving and walking times.',
              featureList: [
                'Convert 1–100 miles to minutes at a speed you choose',
                'City (25 mph), highway (65 mph), walking (3 mph), or custom speed',
                'Driving and walking times side by side',
                'Companion map ring for the distance',
              ],
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Hero + Tool */}
      <section className="bg-slate-50">
        <div className="bg-primary-900 py-3 lg:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">How Many Minutes Is 5, 10, 20, 100 Miles?</h1>
            <p className="text-slate-300 hidden lg:block">
              Turn any distance into driving and walking minutes — at a speed you choose.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <MilesToMinutes />
        </div>
      </section>

      {/* Content */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolHeroImage
            src={HERO}
            alt="A 10-mile distance shown on a map next to a miles-to-minutes driving and walking time calculator"
            caption="Ten miles on the map, with its driving and walking times — enter any distance to update both."
          />

          {/* Instant answer */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How many minutes is 10 miles?</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-lg text-slate-800 leading-relaxed">
                Ten miles takes roughly <strong>9 minutes</strong> at highway speed (65 mph) up to about{' '}
                <strong>24 minutes</strong> on city streets (25 mph) — and about a{' '}
                <strong>3-hour-20-minute walk</strong> (3 mph). Type any distance and pick a speed in the tool
                above to see the exact minutes.
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Each figure is distance ÷ speed, rounded to whole minutes and labeled with the speed it assumes
                — a planning estimate, not a routed drive time.
              </p>
            </div>
          </div>

          {/* 5 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How many minutes is 5 miles?</h2>
            <p className="text-slate-700">
              Five miles is about a <strong>12-minute</strong> drive at a 25 mph city average, or roughly{' '}
              <strong>5 minutes</strong> at 65 mph on the highway. On foot it&apos;s about{' '}
              <strong>1 hour 40 minutes</strong> (3 mph). Tap <strong>5</strong> in the calculator to check it.
            </p>
          </div>

          {/* Drive 10 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How long does it take to drive 10 miles?</h2>
            <p className="text-slate-700">
              At a steady 25 mph city average, 10 miles is about <strong>24 minutes</strong>; at 65 mph on the
              highway it&apos;s roughly <strong>9 minutes</strong>. Real trips land in between once you add
              lights and turns. Switch the speed selector to <strong>Custom</strong> to enter the average speed
              you actually expect.
            </p>
          </div>

          {/* 20 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">20 miles in minutes</h2>
            <p className="text-slate-700">
              Twenty miles is about <strong>48 minutes</strong> at 25 mph or roughly <strong>18 minutes</strong>{' '}
              at 65 mph — the distance where highway versus city speed makes the biggest difference. Walking, it
              is about <strong>6 hours 40 minutes</strong> (3 mph).
            </p>
          </div>

          {/* Walking times */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">Walking times</h2>
            <p className="text-slate-700">
              At an average <strong>3 mph</strong> walking pace: a mile is about 20 minutes, 5 miles about
              1 hour 40 minutes, and 10 miles about 3 hours 20 minutes of continuous walking — before breaks,
              hills, or terrain. Choose <strong>Walking</strong> in the speed selector to read any distance as a
              walk.
            </p>
          </div>

          {/* Cross-links */}
          <div className="mb-12">
            <h2 className="section-heading mb-3">Distance, time, and reachable area</h2>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700">
              <li>
                Want to see the distance on a map from where you are?{' '}
                <Link href="/how-far-is-x-miles" className="content-link">How far is X miles</Link> draws it from
                your location.
              </li>
              <li>
                Want the reverse — how far you can actually reach in a set time by car, along real roads instead
                of a straight line? Use the{' '}
                <Link href="/drive-time-map" className="content-link">drive time map</Link>.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <h2 className="section-heading mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="faq-card">
                  <summary>
                    {f.q}
                    <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="faq-content">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
