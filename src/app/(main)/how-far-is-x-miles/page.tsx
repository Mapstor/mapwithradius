import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolHeroImage from '@/components/content/ToolHeroImage';
import { buildToolPageSchema } from '@/lib/toolSchema';

const TITLE = 'How Far Is 5, 10, 50 Miles From My Location? (See on Map)';
const DESCRIPTION =
  'See how far 1, 2, 3, 5, 10, 50, or 100 miles really is from your exact location on a map — with approximate drive and walk times for each distance. Free, no signup.';
const HERO = '/images/how-far-is-10-miles-chicago.png';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/how-far-is-x-miles' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/how-far-is-x-miles',
    images: [
      {
        url: HERO,
        width: 1600,
        height: 900,
        alt: 'A 10-mile circle centered on downtown Chicago showing how far 10 miles reaches from a point',
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

const HowFarMap = dynamic(() => import('@/components/map/HowFarMap'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
    </div>
  ),
});

// Single source of truth: the visible FAQ and the FAQPage schema both derive from this.
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How far is 10 miles from my house?',
    a: 'Set your point with "Use my location" or by searching your address, and the map draws everything within 10 miles as the crow flies. Straight-line, 10 miles is about a 24-minute drive on city streets (at 25 mph), 9 minutes on the highway (65 mph), or a 3-hour-20-minute walk (3 mph). Real door-to-door time depends on the route.',
  },
  {
    q: 'How long does it take to walk 10 miles?',
    a: 'At an average adult walking pace of about 3 mph, 10 miles takes roughly 3 hours 20 minutes of continuous walking, not counting breaks, terrain, or hills. Five miles is about 1 hour 40 minutes and one mile is about 20 minutes.',
  },
  {
    q: 'Is 10 miles far to drive?',
    a: 'Usually not. In free-flowing traffic 10 miles is about 24 minutes at a 25 mph city average and about 9 minutes at 65 mph on the highway. Congestion, lights, and turns push the real number up — for time-based reachability along actual roads, use the drive time map.',
  },
  {
    q: 'Does this show straight-line distance or driving distance?',
    a: 'Straight-line ("as the crow flies") distance from the point you set. For distance and time along real roads, use the drive time map; to measure the distance between two specific points, use the distance calculator.',
  },
  {
    q: 'How do I see the distance from my exact location?',
    a: 'Tap "Use my location" to center the circle on where you are (your browser asks permission first), or search an address. Then pick a distance preset, or drag the white dot to resize and the blue dot to move the point.',
  },
];

function Times({ city, highway, walk }: { city: string; highway: string; walk: string }) {
  return (
    <ul className="mt-3 grid gap-1.5 text-slate-700 sm:grid-cols-3">
      <li>🚗 <strong>{city}</strong> <span className="text-slate-500 text-sm">drive, 25 mph</span></li>
      <li>🛣️ <strong>{highway}</strong> <span className="text-slate-500 text-sm">highway, 65 mph</span></li>
      <li>🚶 <strong>{walk}</strong> <span className="text-slate-500 text-sm">walk, 3 mph</span></li>
    </ul>
  );
}

export default function HowFarIsXMilesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageSchema({
              path: '/how-far-is-x-miles',
              name: 'How Far Is X Miles',
              description: DESCRIPTION,
              breadcrumbName: 'How Far Is X Miles',
              image: HERO,
              imageCaption: 'A 10-mile circle centered on downtown Chicago, showing how far 10 miles reaches.',
              featureList: [
                'Draw 1–100 mile (or km) distances from your exact location',
                'Approximate city, highway, and walking times for each distance',
                'Use my location or search any address',
                'Drag to move the point or resize the distance',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">How Far Is 5, 10, 50 Miles From My Location?</h1>
            <p className="text-slate-300 hidden lg:block">
              See how far any distance reaches from your exact location — with approximate drive and walk times.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <HowFarMap />
        </div>
      </section>

      {/* Content */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolHeroImage
            src={HERO}
            alt="A 10-mile circle centered on downtown Chicago showing how far 10 miles reaches from a point"
            caption="A 10-mile circle centered on downtown Chicago — everything inside is within 10 miles as the crow flies."
          />

          {/* Instant answer */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How far is 10 miles?</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-lg text-slate-800 leading-relaxed">
                Ten miles is about a <strong>24-minute drive</strong> on city streets (25 mph),
                <strong> 9 minutes</strong> at highway speed (65 mph), and roughly a{' '}
                <strong>3-hour-20-minute walk</strong> (3 mph). On the map above it&apos;s the distance from
                your point out to the edge of the circle — set your location and see exactly what falls
                within 10 miles of you.
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Every time here is straight-line distance ÷ speed, labeled with the speed it assumes — a
                planning estimate, not a routed drive time.
              </p>
            </div>
          </div>

          {/* 5 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How far is 5 miles?</h2>
            <p className="text-slate-700">
              Five miles is half of ten — close enough to cross most mid-size cities. Tap the{' '}
              <strong>5</strong> preset above to snap the circle to five miles and see which neighborhoods,
              towns, or landmarks fall inside from where you are.
            </p>
            <Times city="12 min" highway="5 min" walk="1 h 40 min" />
          </div>

          {/* 3 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">3 miles from my location</h2>
            <p className="text-slate-700">
              Three miles is a common errand distance and the classic &ldquo;primary trade area&rdquo; retailers
              plan around. Set the circle to <strong>3</strong> miles to see what sits a short hop from your
              point.
            </p>
            <Times city="7 min" highway="3 min" walk="1 h" />
          </div>

          {/* 2 miles */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How far is 2 miles?</h2>
            <p className="text-slate-700">
              Two miles is a distance most people cover on a bike in roughly 10–12 minutes. Use the{' '}
              <strong>2</strong> preset to check what&apos;s in easy reach around you.
            </p>
            <Times city="5 min" highway="2 min" walk="40 min" />
          </div>

          {/* 1 mile + kilometer */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How far is a mile?</h2>
            <p className="text-slate-700">
              One mile is the standard &ldquo;20-minute neighborhood&rdquo; distance — a short walk end to end.
              Drop the circle to <strong>1</strong> mile to see your immediate surroundings.
            </p>
            <Times city="2 min" highway="1 min" walk="20 min" />
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How far is a kilometer?</h3>
            <p className="text-slate-700">
              A kilometer is about <strong>0.62 miles</strong> — roughly a 12-minute walk (3 mph). Switch the
              units from <strong>mi</strong> to <strong>km</strong> in the tool and the presets and travel
              times update to match.
            </p>
          </div>

          {/* Distance from my location + cross-links */}
          <div className="mb-12">
            <h2 className="section-heading mb-3">Distance from my location</h2>
            <p className="text-slate-700 mb-4">
              Every distance above is measured straight-line from the point you set. Tap <strong>Use my
              location</strong> to center the circle on where you are, then drag the blue dot to move it or the
              white dot to resize.
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700">
              <li>
                To convert a distance into driving and walking minutes on one screen, see{' '}
                <Link href="/miles-to-minutes" className="content-link">miles to minutes</Link>.
              </li>
              <li>
                To turn a time limit into the real area you can reach by car — following actual roads, not a
                straight line — use the{' '}
                <Link href="/drive-time-map" className="content-link">drive time map</Link>.
              </li>
              <li>
                To measure the straight-line or road distance between two specific points, use the{' '}
                <Link href="/distance-calculator" className="content-link">distance calculator</Link>.
              </li>
              <li>
                Want to draw and resize a <Link href="/" className="content-link">mile radius from me</Link> on
                a full-screen map? Start on the home tool.
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
