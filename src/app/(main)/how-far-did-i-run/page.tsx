import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolHeroImage from '@/components/content/ToolHeroImage';
import { buildToolPageSchema } from '@/lib/toolSchema';

const TITLE = 'How Far Did I Run? Draw a Route to Measure the Distance';
const DESCRIPTION =
  'How far did you run? Tap your route on the map to measure the distance point by point — plus run, walk, or cycle time at your pace. Free, no signup.';
const HERO = '/images/how-far-did-i-run-central-park-loop.png';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/how-far-did-i-run' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/how-far-did-i-run',
    images: [
      {
        url: HERO,
        width: 1600,
        height: 900,
        alt: 'A running route traced point by point around Central Park, with the measured distance',
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

const RouteDistanceMap = dynamic(() => import('@/components/map/RouteDistanceMap'), {
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
    q: 'How do I figure out how far I ran without a watch?',
    a: 'Retrace your route on the map: tap your start, then tap each turn and your finish. The tool adds up the straight-line distance between the points as you go, so the total is the length of the route you traced. Drag any point to fix it if you tapped slightly off.',
  },
  {
    q: 'How far did I walk or cycle?',
    a: 'The same way — trace the route you took. The distance is identical whether you ran, walked, or cycled it; only the time differs. Pick Walk (about 20 minutes per mile) or Cycle (about 4 minutes per mile) to estimate the time, or enter your own pace.',
  },
  {
    q: 'Is this the same as my GPS or watch distance?',
    a: 'Close, but not identical. A GPS watch samples your exact path continuously; here you approximate the route with straight segments between the points you tap, so the more points you place on curves the closer it gets. For a rough "how far did I go", a handful of points is usually within a few percent.',
  },
  {
    q: 'How accurate is tracing a route on a map?',
    a: 'The distance between two points is exact (great-circle / haversine on the WGS 84 spheroid). The approximation is only in how well your tapped points follow the real path — straight segments cut corners, so add points on bends. Road-snapping that follows the streets is coming next.',
  },
  {
    q: 'Can I measure the route in kilometers?',
    a: 'Yes — the distance shows in both miles and kilometers at once, so you can read whichever you need.',
  },
];

export default function HowFarDidIRunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageSchema({
              path: '/how-far-did-i-run',
              name: 'How Far Did I Run — Route Distance Tool',
              description: DESCRIPTION,
              breadcrumbName: 'How Far Did I Run',
              image: HERO,
              imageCaption: 'A running route traced point by point around Central Park, with its measured distance.',
              featureList: [
                'Tap to trace a running, walking, or cycling route',
                'Live cumulative distance in miles and kilometers',
                'Run, walk, cycle, or custom pace → time estimate',
                'Drag points to adjust; undo or clear',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">How Far Did I Run?</h1>
            <p className="text-slate-300 hidden lg:block">
              Tap your route on the map to measure the distance — and the run, walk, or cycle time.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <RouteDistanceMap />
        </div>
      </section>

      {/* Content */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolHeroImage
            src={HERO}
            alt="A running route traced point by point around Central Park, with the measured distance"
            caption="A route traced around Central Park — tap each turn and the distance adds up as you go."
          />

          {/* Instant answer */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How far did I run?</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-lg text-slate-800 leading-relaxed">
                Tap the route you ran on the map above — your start, each turn, then your finish. The tool adds up
                the distance between the points as you go, so the running total is <strong>how far you ran</strong>,
                shown in <strong>miles and kilometers</strong>. Pick <strong>Run</strong>, <strong>Walk</strong>,
                or <strong>Cycle</strong> (or type your own pace) and it estimates the time too.
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Distance is measured straight-line between the points you tap — add a point on each bend so the
                trace follows your real path.
              </p>
            </div>
          </div>

          {/* How to */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How to measure how far you ran</h2>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-slate-700">
              <li>Tap your start (or use <strong>Start at my location</strong>).</li>
              <li>Tap each corner and turn along the way, then your finish.</li>
              <li>Drag any point to nudge it onto the real path; tap <strong>Undo point</strong> to remove the last one.</li>
              <li>Read the total distance, and set a pace for the time.</li>
            </ol>
          </div>

          {/* Walk */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How far did I walk?</h2>
            <p className="text-slate-700">
              Exactly the same route measures the same distance whether you ran or walked it — only the time
              changes. Trace your walk and choose <strong>Walk</strong> (about <strong>20 minutes per mile</strong>,
              a 3 mph pace) to see roughly how long it took.
            </p>
          </div>

          {/* Cycle */}
          <div className="mb-10">
            <h2 className="section-heading mb-3">How far did I cycle?</h2>
            <p className="text-slate-700">
              Same idea for a ride: trace the route and pick <strong>Cycle</strong> (about{' '}
              <strong>4 minutes per mile</strong>, a 15 mph pace). For a faster or slower ride, switch to{' '}
              <strong>Custom</strong> and enter your own minutes-per-mile.
            </p>
          </div>

          {/* Route distance calculator */}
          <div className="mb-12">
            <h2 className="section-heading mb-3">Route distance calculator</h2>
            <p className="text-slate-700 mb-4">
              This is a multi-point <strong>route</strong> distance calculator — it measures a path with as many
              turns as you like. Distances between points are exact (great-circle / haversine); the only
              approximation is how closely your tapped points follow the real route, so add points on curves.
              Road-snapping that follows the streets is coming next.
            </p>
            <p className="text-slate-700">
              Just measuring between <strong>two exact points</strong> instead of a route? The{' '}
              <Link href="/distance-calculator" className="content-link">distance calculator</Link> is built for
              A-to-B, with both straight-line and road distance.
            </p>
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
