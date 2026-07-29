import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolHeroImage from '@/components/content/ToolHeroImage';
import { buildToolPageSchema } from '@/lib/toolSchema';

const TITLE = 'Population Within a Radius: 1, 3, 5 Mile Rings (Free)';
const DESCRIPTION =
  'Estimate the population within a radius of any address — 1, 3, and 5-mile rings (the site-selection standard), a custom radius, mi/km, and CSV export. Based on official 2020 US Census counts. Free, no signup.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/population-within-radius' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mapwithradius.com/population-within-radius',
    images: [
      {
        url: '/images/population-within-radius-chicago-rings.png',
        width: 1600,
        height: 900,
        alt: 'Estimated population within 1, 3, and 5 mile rings around downtown Chicago',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/population-within-radius-chicago-rings.png'],
  },
};

const PopulationRadiusMap = dynamic(() => import('@/components/map/PopulationRadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[62vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-3 right-3 w-96 h-[300px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

// Single source of truth: the visible FAQ and the FAQPage schema both derive from this.
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How is the population within a radius estimated?',
    a: 'Each ZIP area (ZCTA) is approximated as a circle of the same land area at its location, and the tool counts its 2020 Census population in proportion to how much of that circle your radius covers — full overlap counts fully, a partial overlap counts partially, no overlap counts zero. This area-overlap weighting is why a large rural ZIP still contributes when a circle only clips its edge. Boundaries are approximated, so figures are estimates — most accurate at radii larger than the local ZIP areas.',
  },
  {
    q: 'Why is this different from an ESRI or commercial site-selection report?',
    a: 'The figures here come straight from official US Census 2020 counts (Demographic and Housing Characteristics table P1) — a 100% enumeration in the public domain — not modeled estimates or projections resold by a commercial data aggregator. Paid reports add apportionment (splitting partial ZIPs by area or address counts) and current-year projections; this free tool trades that refinement for transparency and an authoritative, citable source.',
  },
  {
    q: 'Can I export the ring populations?',
    a: 'Yes. In 1-3-5 ring mode, "Export CSV" downloads the ring table — each ring, its incremental population, the cumulative population, and the cumulative ZIP count — ready to drop into a site-selection deck or spreadsheet.',
  },
  {
    q: 'What radius should I use for site selection?',
    a: 'Retail and restaurant site selection conventionally uses 1, 3, and 5-mile rings (or 5/10/15-minute drive times) around a candidate site — 1 mile for the immediate trade area, 3 miles for the primary market, and 5 miles for the secondary market. Those three rings are the default here; switch to a custom radius for anything else.',
  },
  {
    q: 'Which areas are covered?',
    a: 'All 50 states, Washington DC, and Puerto Rico are covered from the 2020 Census ZCTA data. US island territories (US Virgin Islands, Guam, American Samoa, Northern Mariana Islands) have no 2020 ZCTA population and will read zero — a limitation of the source data, not the tool.',
  },
];

export default function PopulationWithinRadiusPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageSchema({
              path: '/population-within-radius',
              name: 'Population Within a Radius',
              description: DESCRIPTION,
              breadcrumbName: 'Population Within a Radius',
              image: '/images/population-within-radius-chicago-rings.png',
              imageCaption: 'Estimated population within 1, 3, and 5 miles of downtown Chicago.',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Population Within a Radius</h1>
            <p className="text-slate-300 hidden lg:block">
              Estimate how many people live within 1, 3, and 5 miles of any address — the site-selection standard.
            </p>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <PopulationRadiusMap />
        </div>
      </section>

      {/* Content */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolHeroImage
            src="/images/population-within-radius-chicago-rings.png"
            alt="Estimated population within 1, 3, and 5 mile rings around downtown Chicago"
            caption="Estimated population within 1, 3, and 5 miles of downtown Chicago — the standard site-selection rings."
          />

          {/* Instant answer */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Population within a radius, from official Census counts</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-lg text-slate-800 leading-relaxed">
                Drop a point and this tool estimates the <strong>2020 US Census population</strong> inside the circle —
                area-weighting each ZIP so partial ones count in proportion — with a single custom radius or{' '}
                <strong>1, 3, and 5-mile rings</strong>, the format retail and restaurant site-selection teams use.
              </p>
              <p className="text-slate-700 mt-3">
                The numbers are official <strong>2020 Census counts</strong> (a 100% enumeration), not modeled
                estimates from a commercial data vendor — so you can cite the source. Every figure is an
                <em> estimate</em> at the ZIP level and rounded accordingly.
              </p>
            </div>
          </div>

          {/* Rings explainer */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Why 1, 3, and 5-mile rings?</h2>
            <p className="text-slate-700 mb-4">
              Concentric 1/3/5-mile rings are the default trade-area geometry in retail site selection. The 1-mile
              ring is the immediate walk-in catchment; the 3-mile ring is the primary market that drives most visits;
              the 5-mile ring is the secondary market. Reading population as <strong>cumulative</strong> circles (and
              the incremental band each ring adds) is exactly how a store-location analyst sizes a candidate site.
            </p>
            <p className="text-slate-700">
              Need a different distance? Switch to <strong>custom radius</strong> for a single circle, toggle{' '}
              <strong>miles or kilometers</strong>, and <strong>export the ring table to CSV</strong> for your
              spreadsheet or deck. To see the specific ZIP codes inside a radius instead of a population total, use the{' '}
              <Link href="/zip-code-radius" className="content-link">ZIP code radius tool</Link>.
            </p>
          </div>

          {/* Method / accuracy */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Method, accuracy, and coverage</h2>
            <p className="text-slate-700 mb-4">
              Each ZIP area (ZCTA) is approximated as a circle of the same land area at its point, and its 2020
              population is counted by <strong>how much of that circle your radius overlaps</strong> — full overlap
              counts fully, partial overlap counts partially. This area-overlap weighting keeps a large rural ZIP from
              dropping to zero just because its center sits outside a moderate circle. Boundaries are still
              approximated, so figures are <strong>estimates — most accurate at radii larger than the local ZIP
              areas</strong>.
            </p>
            <p className="text-slate-700">
              Coverage is <strong>all 50 states, DC, and Puerto Rico</strong>. US island territories (US Virgin
              Islands, Guam, American Samoa, Northern Mariana Islands) have no 2020 ZCTA population and will read zero.
              For a straight distance circle without population, see the{' '}
              <Link href="/" className="content-link">radius map</Link>; to measure land area instead of population, the{' '}
              <Link href="/area-calculator" className="content-link">area calculator</Link> traces any shape.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <h2 className="section-heading mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
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
