import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MapDevelopers & CalcMaps Radius Tool — Best Alternatives (2026)',
  description:
    'Comparing MapDevelopers, CalcMaps, and Smappen radius tools. See how Map With Radius compares — free, modern, no API limits.',
  keywords: [
    'mapdevelopers draw circle tool',
    'calcmaps radius',
    'smappen map',
    'radius map alternative',
  ],
  openGraph: {
    title: 'MapDevelopers & CalcMaps Radius Tool — Best Alternatives (2026)',
    description:
      'Comparing MapDevelopers, CalcMaps, and Smappen radius tools. See how Map With Radius compares.',
    url: 'https://mapwithradius.com/alternatives/mapdevelopers',
  },
};

export default function MapDevelopersAlternativePage() {
  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'MapDevelopers & CalcMaps Radius Tool Alternatives',
            description: 'Comparing MapDevelopers, CalcMaps, and Smappen radius tools. See how Map With Radius compares — free, modern, no API limits.',
            url: 'https://mapwithradius.com/alternatives/mapdevelopers',
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
                name: 'MapDevelopers & CalcMaps',
                item: 'https://mapwithradius.com/alternatives/mapdevelopers',
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
              <span className="text-slate-400">Alternatives</span>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">MapDevelopers & CalcMaps</li>
          </ol>
        </div>
      </nav>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            MapDevelopers, CalcMaps & Smappen — Alternatives
          </h1>
          <p className="text-lg text-slate-600">
            Comparing popular radius map tools and how Map With Radius stacks up.
          </p>
        </header>

        {/* Quick Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Quick Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MapDevelopers</th>
                  <th>CalcMaps</th>
                  <th>Smappen</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Free to use</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td>Partial (PRO paywall)</td>
                  <td>Free trial only</td>
                  <td className="text-green-700 font-medium">✓ Fully free</td>
                </tr>
                <tr>
                  <td className="font-medium">Map provider</td>
                  <td>Google Maps</td>
                  <td>Google Maps</td>
                  <td>Proprietary</td>
                  <td className="text-green-700 font-medium">OpenStreetMap</td>
                </tr>
                <tr>
                  <td className="font-medium">Multiple circles</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td>PRO only</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td className="text-green-700 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="font-medium">Address search</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td className="text-green-700 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="font-medium">Shareable URL</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td className="text-green-700 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="font-medium">KML export</td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>PRO only</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td className="text-green-700 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="font-medium">Drive time / isochrone</td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>✓ (paid)</td>
                  <td>
                    <Link href="/drive-time-map" className="content-link font-medium">
                      ✓ Free
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Demographic data</td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                  <td>✓ (paid)</td>
                  <td>
                    <span className="text-red-600">✗</span>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Mobile friendly</td>
                  <td>Partial</td>
                  <td>Partial</td>
                  <td>
                    <span className="text-green-600">✓</span>
                  </td>
                  <td className="text-green-700 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="font-medium">Account required</td>
                  <td>No</td>
                  <td>No (PRO: Yes)</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* MapDevelopers Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            MapDevelopers
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              MapDevelopers&apos; Draw Circle Tool is one of the most popular radius tools online.
              It&apos;s simple, fast, and reliable. Multiple circles, drag-to-reposition, customizable
              colors. Its main limitations are the lack of KML export, no PNG download, and a dated
              visual design. It runs on Google Maps.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.mapdevelopers.com/draw-circle-tool.php"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                MapDevelopers — Draw a Circle
              </a>
            </p>
          </div>
        </section>

        {/* CalcMaps Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            CalcMaps
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              CalcMaps offers a clean interface with preset radius options (1 mi, 5 mi, 10 mi, etc.).
              The free version is limited — multiple circles, printing, and downloading require a PRO
              subscription at $9.99/month. Good for occasional single-circle use.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.calcmaps.com/map-radius/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                CalcMaps — Map Radius
              </a>
            </p>
          </div>
        </section>

        {/* Smappen Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Smappen
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Smappen is a business-focused geomarketing platform. It offers radius maps, isochrones,
              demographic data, and territory management. Excellent for businesses doing location
              analysis, but overkill for someone who just needs to draw a circle on a map. Requires an
              account and has paid plans for full features.
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

        {/* Try Map With Radius CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Free, modern, and no account required. No API limits or paywalls.
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

        {/* Links Section */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/freemaptools" className="content-link">
              FreeMapTools comparison &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
