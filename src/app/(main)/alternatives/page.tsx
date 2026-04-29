import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Radius Map Tool Alternatives Compared',
  description:
    'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
  alternates: {
    canonical: '/alternatives',
  },
  keywords: [
    'radius map alternatives',
    'best radius map tool',
    'free radius map',
    'map radius tool comparison',
  ],
  openGraph: {
    title: 'Radius Map Tool Alternatives — Compared Side by Side (2026)',
    description:
      'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
    url: 'https://mapwithradius.com/alternatives',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radius Map Tool Alternatives — Compared Side by Side (2026)',
    description:
      'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
    images: OG_IMAGES,
  },
};

export default function AlternativesIndexPage() {
  return (
    <>
      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Radius Map Tool Alternatives',
            description:
              'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
            url: 'https://mapwithradius.com/alternatives',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
            },
            hasPart: [
              {
                '@type': 'WebPage',
                name: 'FreeMapTools Radius Alternative',
                url: 'https://mapwithradius.com/alternatives/freemaptools',
              },
              {
                '@type': 'WebPage',
                name: 'MapDevelopers Alternative',
                url: 'https://mapwithradius.com/alternatives/mapdevelopers',
              },
              {
                '@type': 'WebPage',
                name: 'CalcMaps Alternative',
                url: 'https://mapwithradius.com/alternatives/calcmaps',
              },
              {
                '@type': 'WebPage',
                name: 'Smappen Alternative',
                url: 'https://mapwithradius.com/alternatives/smappen',
              },
              {
                '@type': 'WebPage',
                name: 'Maptive Alternative',
                url: 'https://mapwithradius.com/alternatives/maptive',
              },
            ],
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
            <li className="text-slate-900 font-medium">Alternatives</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Best Radius Map Tool Alternatives (2026)
          </h1>
          <p className="text-lg text-slate-600">
            Five radius-mapping tools are commonly compared online: FreeMapTools, MapDevelopers,
            CalcMaps, Smappen, and Maptive. Each is built for a different user, and Map With Radius
            sits against them as a free, no-signup option. Below is a side-by-side comparison, a
            decision matrix, and deep-dive links for each.
          </p>
        </header>

        {/* Section: Decision matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Which One Is Right for You?
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Your need</th>
                  <th>Recommended tool</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Free radius map, no signup</td>
                  <td className="text-green-700 font-medium">
                    <Link href="/" className="content-link">
                      Map With Radius
                    </Link>
                  </td>
                  <td>Zero friction — open and draw</td>
                </tr>
                <tr>
                  <td className="font-medium">Google Maps visual style, quick circles</td>
                  <td>
                    <Link href="/alternatives/mapdevelopers" className="content-link">
                      MapDevelopers
                    </Link>
                  </td>
                  <td>Free, simple, runs on Google Maps</td>
                </tr>
                <tr>
                  <td className="font-medium">Broader mapping suite (area, elevation, GPX)</td>
                  <td>
                    <Link href="/alternatives/calcmaps" className="content-link">
                      CalcMaps
                    </Link>
                  </td>
                  <td>Free site plus PRO prepaid credits</td>
                </tr>
                <tr>
                  <td className="font-medium">Territory planning with demographic data</td>
                  <td>
                    <Link href="/alternatives/smappen" className="content-link">
                      Smappen
                    </Link>
                  </td>
                  <td>Free tier plus $99–$199/month plans</td>
                </tr>
                <tr>
                  <td className="font-medium">Plotting large spreadsheet datasets</td>
                  <td>
                    <Link href="/alternatives/maptive" className="content-link">
                      Maptive
                    </Link>
                  </td>
                  <td>Paid-only, built for data-heavy teams</td>
                </tr>
                <tr>
                  <td className="font-medium">CSV bulk import of addresses for radius</td>
                  <td>
                    <Link href="/alternatives/freemaptools" className="content-link">
                      FreeMapTools
                    </Link>
                  </td>
                  <td>Established tool with a strong CSV feature</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: At-a-glance comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            The Tools Side by Side
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Price</th>
                  <th>Map Engine</th>
                  <th>Account Required</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-green-700">Map With Radius</td>
                  <td>Free</td>
                  <td>OpenStreetMap</td>
                  <td>No</td>
                  <td>Simple radius and drive-time, fully free</td>
                </tr>
                <tr>
                  <td className="font-medium">FreeMapTools</td>
                  <td>Free (ad-supported)</td>
                  <td>Google Maps</td>
                  <td>No</td>
                  <td>CSV bulk import of radius points</td>
                </tr>
                <tr>
                  <td className="font-medium">MapDevelopers</td>
                  <td>Free (ad-supported)</td>
                  <td>Google Maps</td>
                  <td>No</td>
                  <td>Google Maps style, quick circles</td>
                </tr>
                <tr>
                  <td className="font-medium">CalcMaps</td>
                  <td>Free + PRO prepaid credits</td>
                  <td>Google Maps</td>
                  <td>Free site: No / PRO: Yes</td>
                  <td>Broader mapping suite</td>
                </tr>
                <tr>
                  <td className="font-medium">Smappen</td>
                  <td>Free + $99–$199/month</td>
                  <td>Custom isochrone engine</td>
                  <td>Yes</td>
                  <td>Territory and demographic analysis</td>
                </tr>
                <tr>
                  <td className="font-medium">Maptive</td>
                  <td>$250+/user/year</td>
                  <td>Google Maps</td>
                  <td>Yes</td>
                  <td>Spreadsheet data mapping for teams</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Detailed comparisons (cards) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Detailed Comparisons
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/alternatives/freemaptools"
              className="block bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                FreeMapTools
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Long-running free web tool; CSV bulk import is its strongest unique feature. Free and
                ad-supported on Google Maps.
              </p>
              <p className="text-xs text-slate-500 mb-3">No account required</p>
              <span className="text-sm content-link">Read full comparison →</span>
            </Link>

            <Link
              href="/alternatives/mapdevelopers"
              className="block bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                MapDevelopers
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Popular free radius tool with multi-circle support. No KML or PNG export; runs on
                Google Maps.
              </p>
              <p className="text-xs text-slate-500 mb-3">Free, ad-supported, no account</p>
              <span className="text-sm content-link">Read full comparison →</span>
            </Link>

            <Link
              href="/alternatives/calcmaps"
              className="block bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                CalcMaps
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Free consumer suite plus a paid PRO product that uses prepaid credits — not an
                auto-renewing subscription.
              </p>
              <p className="text-xs text-slate-500 mb-3">
                PRO packages of 30, 90, 180, or 365 day-credits
              </p>
              <span className="text-sm content-link">Read full comparison →</span>
            </Link>

            <Link
              href="/alternatives/smappen"
              className="block bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                Smappen
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Geomarketing platform (formerly Oalley). Free tier plus $99 and $199/month plans for
                demographic analysis.
              </p>
              <p className="text-xs text-slate-500 mb-3">
                80,000+ active monthly users, business-focused
              </p>
              <span className="text-sm content-link">Read full comparison →</span>
            </Link>

            <Link
              href="/alternatives/maptive"
              className="block bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                Maptive
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Paid B2B data-mapping platform headquartered in Denver under CEO Brad Crisp. From
                $250/user/year.
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Every plan has every feature; tiers differ by user count and capacity
              </p>
              <span className="text-sm content-link">Read full comparison →</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Free, no account, no credit packages, no trial countdown. Open the tool, enter an
            address, draw a radius.
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
            <Link href="/alternatives/freemaptools" className="content-link">
              FreeMapTools
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/mapdevelopers" className="content-link">
              MapDevelopers
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/calcmaps" className="content-link">
              CalcMaps
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/smappen" className="content-link">
              Smappen
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/maptive" className="content-link">
              Maptive
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
