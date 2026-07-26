import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolHeroImage from '@/components/content/ToolHeroImage';

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
    images: [
      {
        url: '/images/area-calculator-farmland-polygon.png',
        width: 1600,
        height: 900,
        alt: 'Irregular polygon drawn over farmland with the measured acreage shown by the area calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/area-calculator-farmland-polygon.png'],
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
  {
    q: 'How do I measure square footage from a map?',
    a: 'Trace the outline of the area and set the unit to square feet (ft²). The readout updates as you drop each point, and you can switch to m², acres, or hectares afterward without redrawing. Zoom in before placing points for a tighter trace, since each point lands exactly where you tap.',
  },
  {
    q: 'Can I measure a roof for solar panels?',
    a: 'Yes. Trace each roof plane from satellite view and read the total in ft² or m². A standard residential panel is roughly 1.7 m² (about 18 ft²), so a rough panel count is your usable roof area divided by 1.7 m² — but derate for shading, vents, and fire setbacks, and treat the drawn area as the maximum rather than the installed size.',
  },
  {
    q: 'Why doesn’t my measurement match the county or GIS parcel figure?',
    a: 'Two reasons. You trace what is visible from above (fences, hedges, pavement), which may not match the surveyed legal boundary; and this tool uses a spherical Earth model, while official GIS uses an ellipsoid and a local projection — a sub-percent difference on a normal lot. For anything legal, rely on the recorded survey, not a map trace.',
  },
  {
    q: 'Can I measure area on Google Maps instead?',
    a: 'On the Google Maps desktop website you can: use Measure distance and click back on your first point to close the shape. The mobile app does not do closed-shape area (as of 2026), and the measure tool cannot save the outline, keep several labelled areas, switch between all six units, or export KML/PNG. This tool adds those and works on phones too.',
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
          <ToolHeroImage
            src="/images/area-calculator-farmland-polygon.png"
            alt="Irregular polygon drawn over farmland with the measured acreage shown by the area calculator"
            caption="Measuring a field by tracing its edges — the area calculator above reports the acres and square feet."
          />

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

      {/* What can you measure */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">What can you measure?</h2>
          <p className="text-slate-700 mb-8">
            Anything you can trace from above. Each job below reads a specific number off the tool — square
            feet, acres, or the perimeter line — so pick the readout that answers your question.
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-1">Roof area for solar</h3>
              <p className="text-slate-600 text-sm">
                Trace each roof plane from satellite view and read the total in ft² or m². A standard residential
                panel is roughly 1.7 m² (about 18 ft²), so a rough panel count is usable roof area divided by
                1.7 m². Derate for shading, vents, and fire setbacks, and treat the drawn area as the ceiling,
                not the installed size.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-1">Lawn: sod, seed, and fertilizer</h3>
              <p className="text-slate-600 text-sm">
                Trace the grass and read ft² or m². Sod, seed, and fertilizer are sold by a coverage rate printed
                on the bag or pallet, so multiply your measured area by that rate instead of pacing the yard off
                by foot. Draw beds and the driveway as separate areas if you want to subtract them.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-1">Lot and parcel size</h3>
              <p className="text-slate-600 text-sm">
                Trace the property boundary and read it in acres, ft², or hectares. It is a fast sanity check
                against a listing&apos;s stated lot size, or a way to compare two lots before you pull the plat.
                The trace follows what you can see — fences, hedges, pavement — which may not match the legal
                parcel (see below).
              </p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-4">
              <h3 className="font-semibold text-slate-900 mb-1">Fence line — use the perimeter readout</h3>
              <p className="text-slate-600 text-sm">
                For fencing you do not want the area, you want the <strong>perimeter</strong>. Trace the run and
                read the perimeter figure the tool shows next to the area: that is your linear feet or metres of
                fence, minus gate openings. The same number gives a retaining-wall run, bed edging, or the lap
                distance around a track.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-1">Garden, field, or paddock</h3>
              <p className="text-slate-600 text-sm">
                Trace a raised bed, a paddock, or an irregular field and read m²/ft² for planting and compost
                math, or acres/hectares for grazing and yield. Drop extra points along the curves — the geodesic
                area handles any shape, not just rectangles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Square footage */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Measure square footage from a map</h2>
          <p className="text-slate-700 mb-4">
            To get square footage, trace the outline and set the unit to <strong>ft²</strong>. The readout
            updates as you drop each point, and switching to m², acres, or hectares afterward changes only the
            number, never the shape you drew. It is the fastest way to size a roof, patio, parking lot, or
            building footprint from above without a tape measure.
          </p>
          <p className="text-slate-600 text-sm">
            Two tips for a tight number: zoom in before placing points, since each point lands exactly where you
            tap; and remember satellite view shows the building footprint, not interior rooms — for indoor floor
            area you would trace the outer walls, then adjust for wall thickness.
          </p>
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

      {/* Why measurements differ from official records */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Why your measurement may differ from official records</h2>
          <p className="text-slate-700 mb-4">
            A map trace is an estimate, not a survey. Two things make it read differently from a county
            assessor, deed, or land-registry figure:
          </p>
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-1">Drawn outline vs. legal parcel</h3>
              <p className="text-slate-600 text-sm">
                You trace what is visible from above — fences, hedges, pavement — which often does not match the
                surveyed legal boundary. Fences get built off the line, easements and setbacks are invisible from
                the sky, and old boundaries drift. The recorded parcel comes from a licensed survey and the
                official plat; treat a trace as a picture of it, not a replacement.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-1">Spherical model and imagery offset</h3>
              <p className="text-slate-600 text-sm">
                This tool models Earth as a sphere; professional GIS typically uses an ellipsoid (WGS 84) and a
                local projected coordinate system, a difference well under a percent on a normal lot. Satellite
                imagery can also sit slightly off true ground position, and your point placement adds a little
                more. For anything legal — a sale, permit, or dispute — use the recorded survey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Can I calculate area on Google Maps? */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Can I calculate area on Google Maps?</h2>
          <p className="text-slate-700 mb-4">
            Yes — on the Google Maps website. Right-click a spot, choose <strong>Measure distance</strong>, click
            around the shape, and click your first point again to close it; the panel at the bottom shows the
            distance and the enclosed area. For a one-off check, that is often all you need.
          </p>
          <p className="text-slate-700 mb-4">
            Two limits are worth knowing. The Google Maps <strong>mobile app does not</strong> offer closed-shape
            area (as of 2026) — you need a desktop browser, or Google Earth, which shows area and perimeter in its
            side panel. And the measure tool is built for a quick look, not for keeping work: there is no way to
            save the outline, hold several labelled areas with a running total, switch the same shape between
            acres, hectares, ft², m², sq mi, and km², or export it as a KML or PNG file.
          </p>
          <p className="text-slate-700">
            That is the gap this tool fills. It runs on your phone as well as desktop, keeps every area you draw
            with its own colour and a running total, flips between all six units on tap, and exports KML (for
            Google Earth, QGIS, or a CRM) or a PNG snapshot. Use Google Maps for a five-second check; use this
            when the measurement has to travel. See Google&apos;s{' '}
            <a href="https://support.google.com/maps/answer/1628031" target="_blank" rel="noopener noreferrer" className="content-link">Measure distance</a>{' '}
            help page for their current steps.
          </p>
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
