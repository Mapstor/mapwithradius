import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smappen Alternative — Free Radius Map Without a Subscription (2026)',
  description:
    'Smappen alternative for simple radius maps — free forever, no signup, no $99-$199 monthly plan. Draw circles, export KML and PNG, share URLs instantly.',
  alternates: {
    canonical: '/alternatives/smappen',
  },
  keywords: [
    'smappen alternative',
    'oalley alternative',
    'free radius map no signup',
    'smappen free alternative',
  ],
  openGraph: {
    title: 'Smappen Alternative — Free Radius Map Without a Subscription (2026)',
    description:
      'Smappen alternative for simple radius maps — free forever, no signup, no $99-$199 monthly plan. Draw circles, export KML and PNG, share URLs instantly.',
    url: 'https://mapwithradius.com/alternatives/smappen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smappen Alternative — Free Radius Map Without a Subscription (2026)',
    description:
      'Smappen alternative for simple radius maps — free forever, no signup, no $99-$199 monthly plan. Draw circles, export KML and PNG, share URLs instantly.',
  },
};

export default function SmappenAlternativePage() {
  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Smappen Alternative',
            description:
              'Smappen alternative for simple radius maps — free forever, no signup, no $99-$199 monthly plan. Draw circles, export KML and PNG, share URLs instantly.',
            url: 'https://mapwithradius.com/alternatives/smappen',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mapwithradius.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Alternatives',
                item: 'https://mapwithradius.com/alternatives',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Smappen',
                item: 'https://mapwithradius.com/alternatives/smappen',
              },
            ],
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is Smappen free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Smappen has a genuinely free-forever tier that lets you draw catchment areas and isochrones. An account is required. Paid plans (Essential at $99 per month, Pro at $199 per month) add demographic data, city and zip-code extracts, and deeper analysis.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was Smappen previously called Oalley?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. Oalley was the product's original name; it was rebranded to Smappen. The company positioning shifted toward geomarketing and territory analysis over time.",
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need an account to use Smappen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Even the free tier requires signing up. Map With Radius does not require an account — you land on the tool and start drawing.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can Map With Radius replace Smappen for business territory planning?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Smappen offers demographic overlays, competitor analysis, and territory management that we do not replicate. If you need those business-grade features, Smappen is the right tool. Map With Radius is focused on the radius-drawing and drive-time use case.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a free alternative to Smappen for drive-time maps?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. Our drive-time tool at /drive-time-map generates isochrones (drive-time or walking polygons) without an account, subscription, or credit. It does not include demographic data; for that, Smappen's paid tiers are necessary.",
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb navigation */}
      <nav className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/alternatives" className="hover:text-slate-900">
                Alternatives
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">Smappen</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Smappen Alternative — Free Radius Maps Without a Subscription
          </h1>
          <p className="text-lg text-slate-600">
            Smappen is a geomarketing platform built for businesses doing territory planning,
            catchment-area analysis, and demographic lookups. If you need a free radius map without
            a $99-to-$199 monthly subscription, here&apos;s how Map With Radius compares.
          </p>
        </header>

        {/* Section 2: What Smappen Is */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What Smappen Is
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Smappen is a business-focused geomarketing platform, previously known as Oalley before
              rebranding. It offers catchment-area analysis, drive-time and walking isochrones,
              demographic overlays, and territory-management tools. It has over 80,000 active
              monthly users and 700+ paying customers, mostly businesses doing market analysis,
              retail site selection, and sales territory planning.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.smappen.com/radius-map/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Smappen — Radius Map
              </a>
            </p>
          </div>
        </section>

        {/* Section 3: Pricing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Pricing &amp; Access
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              Smappen has three tiers. The Free plan is genuinely free forever — not a seven-day
              trap — and lets you draw catchment areas and isochrones after signing up for an
              account. The Essential plan is $99 per month and adds city and zip-code extracts. The
              Pro plan is $199 per month and unlocks deeper area analysis. Smappen also offers free
              access for students on request. All paid plans require an account and credit-card
              billing.
            </p>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How Smappen Compares
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Smappen</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Price for basic radius</td>
                  <td>Free tier (account required)</td>
                  <td className="text-green-700 font-medium">Free, no account</td>
                </tr>
                <tr>
                  <td className="font-medium">Price for demographic data</td>
                  <td>$99–$199/month</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Account required</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">No</td>
                </tr>
                <tr>
                  <td className="font-medium">Radius circle drawing</td>
                  <td>Yes (free tier)</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Drive-time isochrones</td>
                  <td>Yes (free tier)</td>
                  <td className="text-green-700 font-medium">
                    <Link href="/drive-time-map" className="content-link font-medium">
                      Yes, on /drive-time-map
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Public-transit isochrones</td>
                  <td>Yes</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Demographic overlays</td>
                  <td>Paid plans</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Territory / catchment analysis</td>
                  <td>Yes (business focus)</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">KML / PNG export</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes, free</td>
                </tr>
                <tr>
                  <td className="font-medium">Map engine</td>
                  <td>Custom isochrone engine</td>
                  <td className="text-green-700 font-medium">OpenStreetMap</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Where MWR wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Where Map With Radius Wins
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Map With Radius targets users who want to draw a radius circle and leave. There is no
              account, no email verification, and no dashboard — the tool loads, you enter an
              address, and you draw.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Smappen&apos;s free tier is genuinely usable but is built around their
              catchment-analysis workflow, which adds steps if you are not doing market sizing or
              demographic lookups. We run on OpenStreetMap via Leaflet, which avoids the API gating
              and credential management that come with proprietary or Google-based stacks.
            </p>
          </div>
        </section>

        {/* Section 6: When competitor wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            When Smappen Is Still the Right Choice
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              Smappen is a genuinely capable geomarketing tool, and Map With Radius does not replace
              it. If you need demographic data layered over a catchment area, competitor-location
              analysis, multi-zone territory planning, or public-transit isochrones, Smappen&apos;s
              paid tiers are purpose-built for that work. We handle radius drawing and drive-time
              isochrones only — we do not offer demographics, population overlays, or territory
              management.
            </p>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Is Smappen free?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes, Smappen has a genuinely free-forever tier that lets you draw catchment areas
                and isochrones. An account is required. Paid plans (Essential at $99 per month, Pro
                at $199 per month) add demographic data, city and zip-code extracts, and deeper
                analysis.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Was Smappen previously called Oalley?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Oalley was the product&apos;s original name; it was rebranded to Smappen. The
                company positioning shifted toward geomarketing and territory analysis over time.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Do I need an account to use Smappen?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Even the free tier requires signing up. Map With Radius does not require an
                account — you land on the tool and start drawing.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can Map With Radius replace Smappen for business territory planning?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. Smappen offers demographic overlays, competitor analysis, and territory
                management that we do not replicate. If you need those business-grade features,
                Smappen is the right tool. Map With Radius is focused on the radius-drawing and
                drive-time use case.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is there a free alternative to Smappen for drive-time maps?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Our{' '}
                <Link href="/drive-time-map" className="content-link">
                  drive-time tool at /drive-time-map
                </Link>{' '}
                generates isochrones (drive-time or walking polygons) without an account,
                subscription, or credit. It does not include demographic data; for that,
                Smappen&apos;s paid tiers are necessary.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Free, no signup, no monthly plan. Draw a circle, export KML, share the URL.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Open the radius tool
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Footer link row */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives" className="content-link">
              All alternatives
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/calcmaps" className="content-link">
              CalcMaps &rarr;
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/maptive" className="content-link">
              Maptive &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
