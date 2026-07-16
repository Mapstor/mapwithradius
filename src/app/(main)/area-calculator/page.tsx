import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

const TITLE = 'Map Area Calculator: Draw & Measure Acres, Sq Ft (Free)';
const DESCRIPTION =
  'Draw any shape on a map and measure its area and perimeter — in acres, square feet, m², hectares, sq mi, or km². Geodesic (true-Earth) math, multiple areas, KML & PNG export. Free, no signup.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/area-calculator',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/area-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const AreaCalculatorWrapper = dynamic(() => import('@/components/map/AreaCalculatorWrapper'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 h-[420px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How do I measure an area on a map?',
    a: 'Tap the map to drop points around the shape you want to measure. After three points it closes into a polygon and shows the enclosed area and perimeter. Drag any point to adjust it, or use Undo to remove the last point.',
  },
  {
    q: 'How is the area calculated — is it accurate?',
    a: 'Area is computed geodesically, on Earth’s curved surface, rather than with flat lat/long math, so it stays accurate as shapes get larger or move away from the equator. Perimeter is the sum of the great-circle lengths of each edge.',
  },
  {
    q: 'What units can I measure in?',
    a: 'Acres, square feet, square metres, hectares, square miles, and square kilometres. Switch units at any time and every readout updates instantly.',
  },
  {
    q: 'Can I measure more than one area at once?',
    a: 'Yes. Tap "New area" to start another polygon; each one gets its own colour, and the panel lists every area plus a running total.',
  },
  {
    q: 'Can I export or save my measurement?',
    a: 'Export a KML file (which opens in Google Earth or Google Maps) or download a PNG snapshot of the map with your shapes drawn on it.',
  },
  {
    q: 'How is this different from the acre calculator?',
    a: 'The acre calculator drops a fixed, true-scale acre or hectare overlay that you place and drag to picture a size. This area calculator lets you trace the real outline of a field, roof, or lot and measures whatever irregular shape you draw.',
  },
];

export default function AreaCalculatorPage() {
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
              { '@type': 'ListItem', position: 2, name: 'Area Calculator', item: 'https://mapwithradius.com/area-calculator' },
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
            name: 'Map Area Calculator',
            description:
              'Draw polygons on a map to measure area and perimeter geodesically, in acres, square feet, m², hectares, square miles, or square kilometres.',
            url: 'https://mapwithradius.com/area-calculator',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Map Area Calculator</h1>
            <p className="text-slate-300 hidden lg:block">
              Click the map to drop points around any shape — the area and perimeter fill in as you go.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <AreaCalculatorWrapper />
        </div>
      </section>

      {/* Instant answer */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">What this tool measures</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-lg text-slate-800 leading-relaxed">
              The area calculator measures <strong>any shape you draw on the map</strong>. Tap to drop points around a
              field, roof, lot, or park; once you have three or more, it reports the <strong>enclosed area</strong> and
              the <strong>perimeter</strong>.
            </p>
            <p className="text-slate-700 mt-3">
              Area is calculated <strong>geodesically</strong> — on Earth&apos;s curved surface, not a flat grid — and you can
              read it in acres, square feet, m², hectares, square miles, or km². Drag any point to fine-tune, undo the
              last point, or start a second area.
            </p>
          </div>
          <p className="text-slate-600 text-sm mt-4">
            Want a fixed size instead of a traced shape? The{' '}
            <Link href="/acre-calculator" className="content-link">acre calculator</Link> drops a true-scale acre overlay
            you can place anywhere, and the <Link href="/" className="content-link">radius map</Link> draws distance circles.
          </p>
        </div>
      </section>

      {/* How to */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">How to measure an area</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: 1, title: 'Find the spot', desc: 'Search an address or pan the map' },
              { step: 2, title: 'Drop points', desc: 'Tap each corner of the shape' },
              { step: 3, title: 'Close it', desc: '3+ points → area & perimeter show' },
              { step: 4, title: 'Adjust', desc: 'Drag points; Undo to step back' },
              { step: 5, title: 'Export', desc: 'KML or PNG; add more areas' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-slate-200">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-3">{item.step}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Units reference */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Area unit reference</h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr><th>Unit</th><th>Equals</th></tr>
              </thead>
              <tbody>
                <tr><td className="font-semibold text-slate-900">1 acre</td><td>43,560 sq ft · 4,046.86 m² · 0.4047 hectares</td></tr>
                <tr><td className="font-semibold text-slate-900">1 hectare</td><td>10,000 m² · 2.471 acres · 107,639 sq ft</td></tr>
                <tr><td className="font-semibold text-slate-900">1 square mile</td><td>640 acres · 2.59 km² · 27,878,400 sq ft</td></tr>
                <tr><td className="font-semibold text-slate-900">1 km²</td><td>100 hectares · 247.1 acres · 0.3861 sq mi</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Conversions are exact/standard; the tool carries full precision internally and rounds only for display.</p>
        </div>
      </section>

      {/* Geodesic note */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Why geodesic, not flat, area</h2>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-3">
              Treating latitude and longitude as flat x/y coordinates overstates area, because a degree of longitude
              shrinks as you move toward the poles. This tool instead computes the <strong>geodesic</strong> area on a
              spherical Earth model, so a shape measures the same whether it sits near the equator or far north.
            </p>
            <p className="text-slate-600 text-sm">
              Perimeter uses the Haversine (great-circle) distance between consecutive points. For everyday parcels the
              spherical model is accurate to well under a percent; survey-grade work uses an ellipsoidal model, which is
              beyond what a quick map measurement needs.
            </p>
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
              { href: '/acre-calculator', title: 'Acre Calculator', desc: 'See how big 1–640 acres is, to scale' },
              { href: '/', title: 'Radius Map', desc: 'Draw circles on any map by distance' },
              { href: '/distance-calculator', title: 'Distance Calculator', desc: 'Measure between two points' },
              { href: '/zip-code-radius', title: 'Zip Code Radius', desc: 'Find all zip codes within a radius' },
              { href: '/geofence-map', title: 'Geofence Map', desc: 'Draw and label coverage zones' },
              { href: '/use-cases', title: 'Use Cases', desc: 'Real estate, land, delivery & more' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-accent hover:shadow-md transition-all duration-200">
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
            <Link href="/acre-calculator" className="content-link">Acre calculator</Link>
            <span className="text-slate-300">·</span>
            <Link href="/glossary#acre" className="content-link">What is an acre?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
