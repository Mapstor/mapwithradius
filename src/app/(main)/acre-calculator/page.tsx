import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

const TITLE = 'Acre Calculator: See How Big 1, 5, 10 Acres Is on a Map';
const DESCRIPTION =
  'See exactly how big an acre is. Draw a true-scale acre overlay on any real map — 1, 5, 10, 40, even 640 acres — as a square or circle, in acres, hectares, square feet, or m². Free, no signup.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/acre-calculator',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/acre-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const AcreCalculatorWrapper = dynamic(() => import('@/components/map/AcreCalculatorWrapper'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 h-[420px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

// Single source of truth: the visible FAQ and the FAQPage schema are both generated
// from this array, so they can never drift apart.
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How big is 1 acre?',
    a: 'One acre is 43,560 square feet — 4,046.86 m², or 0.4047 hectares. As a square that is about 208.7 feet on each side, and it covers roughly 76% of an American football field including the end zones.',
  },
  {
    q: 'What does 5 acres look like?',
    a: '5 acres is 217,800 square feet — a square about 467 feet on each side, or close to 3.8 American football fields laid side by side.',
  },
  {
    q: 'How big is 10 acres?',
    a: '10 acres is 435,600 square feet — a square roughly 660 feet on each side (an eighth of a mile), about 7.6 football fields.',
  },
  {
    q: 'How many acres are in a square mile?',
    a: 'There are 640 acres in one square mile — a block surveyors call a "section." The classic 40-acre "back forty" is one sixteenth of a section: a quarter-mile square.',
  },
  {
    q: 'How many acres is a football field?',
    a: 'An American football field including both end zones is 360 by 160 feet — 57,600 square feet, or about 1.32 acres. So a single acre covers roughly three-quarters of the field.',
  },
  {
    q: 'How do I measure acres on a map with this tool?',
    a: 'Search an address or tap the map to drop a true-scale overlay, then set the size in acres, hectares, square feet, or square metres. Switch the overlay between a square and a circle, drag it to line it up against a landmark you know, and copy a link to share the exact view.',
  },
];

// Verified conversions (1 acre = 43,560 sq ft = 4,046.86 m² = 0.4047 ha; a football
// field incl. end zones = 57,600 sq ft). All figures below derive from these constants.
const SIZE_ROWS = [
  { acres: '0.25', sqft: '10,890', sqm: '1,012', ha: '0.101', fields: '0.19' },
  { acres: '1', sqft: '43,560', sqm: '4,047', ha: '0.405', fields: '0.76' },
  { acres: '5', sqft: '217,800', sqm: '20,234', ha: '2.02', fields: '3.78' },
  { acres: '10', sqft: '435,600', sqm: '40,469', ha: '4.05', fields: '7.56' },
  { acres: '40', sqft: '1,742,400', sqm: '161,874', ha: '16.19', fields: '30.25' },
  { acres: '100', sqft: '4,356,000', sqm: '404,686', ha: '40.47', fields: '75.6' },
  { acres: '640', sqft: '27,878,400', sqm: '2,589,990', ha: '259', fields: '484' },
];

export default function AcreCalculatorPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mapwithradius.com' },
              { '@type': 'ListItem', position: 2, name: 'Acre Calculator', item: 'https://mapwithradius.com/acre-calculator' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Acre Calculator',
            description:
              'Draw a true-scale overlay of any number of acres — as a square or circle — on a real map, and convert between acres, hectares, square feet, and square metres.',
            url: 'https://mapwithradius.com/acre-calculator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Acre Calculator</h1>
            <p className="text-slate-300 hidden lg:block">
              See how big an acre really is — drop a true-scale acre overlay on any map, as a square or a circle.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <AcreCalculatorWrapper />
        </div>
      </section>

      {/* Instant answer (featured-snippet target) */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">How big is an acre?</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-lg text-slate-800 leading-relaxed">
              <strong>One acre = 43,560 square feet = 4,046.86 m² = 0.4047 hectares</strong> — about 76% of an
              American football field including end zones.
            </p>
            <p className="text-slate-700 mt-3">
              An acre has no required shape; it is simply an area. Laid out as a square it measures about
              208.7 feet on each side. And <strong>640 acres = 1 square mile</strong> (a survey &ldquo;section&rdquo;).
            </p>
          </div>
          <p className="text-slate-600 text-sm mt-4">
            The map above draws that area to true scale wherever you place it, so you can compare an acre against a
            block, a parking lot, or a field you already know. See the{' '}
            <Link href="/glossary#acre" className="content-link">acre glossary entry</Link> for the definition, or the{' '}
            <Link href="/use-cases" className="content-link">use cases</Link> for where this comes in handy.
          </p>
        </div>
      </section>

      {/* How to */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">How to visualize acres on the map</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: 1, title: 'Find a place', desc: 'Search an address or tap the map' },
              { step: 2, title: 'Set the size', desc: 'Type a value; pick acres, ha, ft² or m²' },
              { step: 3, title: 'Pick a shape', desc: 'Square or circle overlay' },
              { step: 4, title: 'Drag to compare', desc: 'Line it up against a known landmark' },
              { step: 5, title: 'Share it', desc: 'Copy a link that restores the view' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">What an acre compares to</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-accent mb-1">≈ 76%</div>
              <p className="text-slate-700 text-sm">of an American football field, including both end zones (a field is 57,600 sq ft ≈ 1.32 acres).</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-accent mb-1">≈ 15½</div>
              <p className="text-slate-700 text-sm">doubles tennis courts (each 78 × 36 ft = 2,808 sq ft) fit inside one acre.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-accent mb-1">640</div>
              <p className="text-slate-700 text-sm">acres make one square mile — the survey &ldquo;section&rdquo; that divides much of US farmland.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Acres</th>
                  <th>Square feet</th>
                  <th>Square meters</th>
                  <th>Hectares</th>
                  <th>≈ Football fields</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((r) => (
                  <tr key={r.acres}>
                    <td className="font-semibold text-slate-900">{r.acres}</td>
                    <td>{r.sqft}</td>
                    <td>{r.sqm}</td>
                    <td>{r.ha}</td>
                    <td>{r.fields}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Football-field comparisons use a full field including end zones (360 × 160 ft = 57,600 sq ft). Figures
            are rounded from 1 acre = 43,560 sq ft = 4,046.86 m² = 0.4047 hectares.
          </p>
        </div>
      </section>

      {/* Square vs circle */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Square or circle — the area is the same</h2>
          <p className="text-slate-700 mb-4">
            An acre is a measure of area, not a shape, so the overlay can be drawn either way and still cover the
            same 43,560 square feet:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border-l-4 border-green-500 pl-4 bg-white p-4 rounded-r-lg">
              <h3 className="font-semibold text-slate-900">Square</h3>
              <p className="text-slate-600 text-sm">
                A one-acre square is about 208.7 ft on each side. Squares line up naturally with parcels, city blocks,
                and the section grid, so they are easy to compare against property lines.
              </p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4 bg-white p-4 rounded-r-lg">
              <h3 className="font-semibold text-slate-900">Circle</h3>
              <p className="text-slate-600 text-sm">
                A one-acre circle has a radius of about 117.75 ft (117.75² × π ≈ 43,560 sq ft). Circles are handy for
                &ldquo;how far from this point&rdquo; framing, like a setback or a buffer around a building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details className="faq-card" key={f.q}>
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
      </section>

      {/* More tools */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">More Map Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/area-calculator', title: 'Area Calculator', desc: 'Draw a shape and measure its area' },
              { href: '/', title: 'Radius Map', desc: 'Draw circles on any map by distance' },
              { href: '/distance-calculator', title: 'Distance Calculator', desc: 'Measure between two points' },
              { href: '/zip-code-radius', title: 'Zip Code Radius', desc: 'Find all zip codes within a radius' },
              { href: '/km-radius-map', title: 'KM Radius Map', desc: 'Draw radius circles in kilometers' },
              { href: '/geofence-map', title: 'Geofence Map', desc: 'Draw and label coverage zones' },
              { href: '/use-cases', title: 'Use Cases', desc: 'Real estate, delivery, land & more' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-accent hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                <p className="text-sm text-slate-600">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom links */}
      <section className="section-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">&larr; Main radius tool</Link>
            <span className="text-slate-300">·</span>
            <Link href="/glossary#acre" className="content-link">What is an acre?</Link>
            <span className="text-slate-300">·</span>
            <Link href="/use-cases" className="content-link">Use cases</Link>
            <span className="text-slate-300">·</span>
            <Link href="/area-calculator" className="content-link">Measure any area &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
