import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Maptive Alternative — Free Radius Map, No $250 Plan (2026)',
  description:
    'Maptive alternative for radius mapping — free forever, no 10-day trial, no $250-per-user annual plan. Draw circles on OpenStreetMap, export KML, no account.',
  alternates: {
    canonical: '/alternatives/maptive',
  },
  keywords: [
    'maptive alternative',
    'maptive free alternative',
    'free radius map no trial',
    'radius map without subscription',
  ],
  openGraph: {
    title: 'Maptive Alternative — Free Radius Map, No $250 Plan (2026)',
    description:
      'Maptive alternative for radius mapping — free forever, no 10-day trial, no $250-per-user annual plan. Draw circles on OpenStreetMap, export KML, no account.',
    url: 'https://mapwithradius.com/alternatives/maptive',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maptive Alternative — Free Radius Map, No $250 Plan (2026)',
    description:
      'Maptive alternative for radius mapping — free forever, no 10-day trial, no $250-per-user annual plan. Draw circles on OpenStreetMap, export KML, no account.',
    images: OG_IMAGES,
  },
};

export default function MaptiveAlternativePage() {
  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Maptive Alternative',
            description:
              'Maptive alternative for radius mapping — free forever, no 10-day trial, no $250-per-user annual plan. Draw circles on OpenStreetMap, export KML, no account.',
            url: 'https://mapwithradius.com/alternatives/maptive',
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
                name: 'Maptive',
                item: 'https://mapwithradius.com/alternatives/maptive',
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
                name: 'Is Maptive free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Maptive is a paid product with a 10-day free trial. After the trial ends, the account reverts to a limited free state rather than a genuine free tier. Plans start at $250 per user per year.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does Maptive cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Maptive has four to five pricing editions, starting at $250 per user per year and rising to $2,500+ per year for team tiers. Every plan includes every feature; tiers differ only by user count, data capacity, and support level.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can Map With Radius replace Maptive?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Not for Maptive's core use case of spreadsheet data mapping and territory management. Map With Radius handles radius drawing and drive-time isochrones only. If you just need those features without the broader data-mapping platform, Map With Radius is free and needs no account.",
                },
              },
              {
                '@type': 'Question',
                name: 'Does Maptive offer a free tier?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not in the consumer sense. The 10-day trial is free, but continued access requires a paid plan starting at $250 per user per year. Map With Radius is free forever, with no trial countdown and no account required.',
                },
              },
              {
                '@type': 'Question',
                name: 'What map engine does Maptive use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Maptive runs on Google Maps. Map With Radius runs on OpenStreetMap via Leaflet, which removes Google Maps API pricing and quota considerations for anyone embedding the tool.',
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
            <li className="text-slate-900 font-medium">Maptive</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Maptive Alternative — Free Radius Maps Without a $250 Plan
          </h1>
          <p className="text-lg text-slate-600">
            Maptive is a paid data-mapping platform used by sales teams and territory managers. If
            you need a free radius map without a $250-per-user annual plan or a 10-day trial
            countdown, here&apos;s how Map With Radius compares.
          </p>
        </header>

        {/* Section 2: What Maptive Is */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What Maptive Is
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Maptive is a paid B2B mapping platform headquartered in Denver, Colorado, under CEO
              Brad Crisp. Its core value proposition is plotting spreadsheet data (CSV, Excel, or
              Google Sheets) onto a map for sales territory management, route optimization,
              heatmaps, and clustering. It runs on Google Maps. Radius mapping is one feature inside
              a broader data-visualization product aimed at business teams.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.maptive.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Maptive
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
              Maptive is paid-only. There are four to five pricing editions, starting at $250 per
              user per year and rising to $2,500+ per year for team tiers. A 10-day free trial is
              available; after it ends, the account reverts to a limited free state rather than a
              genuine free tier. Every plan includes every feature — tiers differ only by user
              count, data capacity, and support level. An account is required.
            </p>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How Maptive Compares
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Maptive</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Price for radius mapping</td>
                  <td>From $250/user/year</td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">Trial</td>
                  <td>10-day, reverts to limited post-trial</td>
                  <td className="text-green-700 font-medium">Not applicable (fully free)</td>
                </tr>
                <tr>
                  <td className="font-medium">Account required</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">No</td>
                </tr>
                <tr>
                  <td className="font-medium">Map engine</td>
                  <td>Google Maps</td>
                  <td className="text-green-700 font-medium">OpenStreetMap</td>
                </tr>
                <tr>
                  <td className="font-medium">Spreadsheet data plotting</td>
                  <td>Yes (core feature)</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Territory management</td>
                  <td>Yes (core feature)</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Heatmaps and clustering</td>
                  <td>Yes</td>
                  <td>Not available</td>
                </tr>
                <tr>
                  <td className="font-medium">Radius circle drawing</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Drive-time isochrones</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">
                    <Link href="/drive-time-map" className="content-link font-medium">
                      Yes, on /drive-time-map
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">KML / PNG export</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes, free</td>
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
              Maptive assumes you have spreadsheet data to plot and a team to share it with. Map
              With Radius assumes you have an address and a distance, and is shaped accordingly.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              There is no account creation, no trial countdown, and no per-user annual billing. For
              one-off or occasional radius tasks, no billing commitment is necessary.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We run on OpenStreetMap via Leaflet rather than Google Maps. For anyone embedding the
              tool on their own site, that removes the Google Maps API pricing and quota concerns
              entirely.
            </p>
          </div>
        </section>

        {/* Section 6: When competitor wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            When Maptive Is Still the Right Choice
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              Maptive is the right tool when radius mapping is only part of the job. If you need to
              upload a spreadsheet of customers, plot them on a map, segment them into territories,
              assign territories to sales reps, and share the result with a team, Maptive&apos;s
              paid plans are built for that workflow. We do not plot spreadsheet data, do not manage
              territories, and do not offer team collaboration.
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
                Is Maptive free?
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
                Maptive is a paid product with a 10-day free trial. After the trial ends, the
                account reverts to a limited free state rather than a genuine free tier. Plans start
                at $250 per user per year.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What does Maptive cost?
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
                Maptive has four to five pricing editions, starting at $250 per user per year and
                rising to $2,500+ per year for team tiers. Every plan includes every feature; tiers
                differ only by user count, data capacity, and support level.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can Map With Radius replace Maptive?
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
                Not for Maptive&apos;s core use case of spreadsheet data mapping and territory
                management. Map With Radius handles radius drawing and drive-time isochrones only.
                If you just need those features without the broader data-mapping platform, Map With
                Radius is free and needs no account.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does Maptive offer a free tier?
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
                Not in the consumer sense. The 10-day trial is free, but continued access requires a
                paid plan starting at $250 per user per year. Map With Radius is free forever, with
                no trial countdown and no account required.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What map engine does Maptive use?
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
                Maptive runs on Google Maps. Map With Radius runs on OpenStreetMap via Leaflet,
                which removes Google Maps API pricing and quota considerations for anyone embedding
                the tool.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Free forever, no per-user billing, no trial countdown.
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
            <Link href="/alternatives/smappen" className="content-link">
              Smappen &rarr;
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/calcmaps" className="content-link">
              CalcMaps &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
