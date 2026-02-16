import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreeMapTools Radius Alternative — Faster & Modern (2026)',
  description:
    'Looking for a FreeMapTools radius alternative? Map With Radius offers the same features with a modern interface, mobile support, and no Google Maps dependency.',
  keywords: [
    'freemaptools radius',
    'free map tools radius',
    'freemaptools alternative',
    'radius around point tool',
  ],
  openGraph: {
    title: 'FreeMapTools Radius Alternative — Faster & Modern (2026)',
    description:
      'Looking for a FreeMapTools radius alternative? Map With Radius offers the same features with a modern interface.',
    url: 'https://mapwithradius.com/alternatives/freemaptools',
  },
};

export default function FreeMapToolsAlternativePage() {
  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'FreeMapTools Radius Alternative',
            description: 'Looking for a FreeMapTools radius alternative? Map With Radius offers the same features with a modern interface, mobile support, and no Google Maps dependency.',
            url: 'https://mapwithradius.com/alternatives/freemaptools',
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
                name: 'FreeMapTools',
                item: 'https://mapwithradius.com/alternatives/freemaptools',
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
            <li className="text-slate-900 font-medium">FreeMapTools</li>
          </ol>
        </div>
      </nav>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            FreeMapTools Radius — Alternative
          </h1>
          <p className="text-lg text-slate-600">
            A modern alternative to the classic FreeMapTools radius tool.
          </p>
        </header>

        {/* What FreeMapTools Does Well */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            FreeMapTools: What It Does Well
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              FreeMapTools&apos; &ldquo;Radius Around a Point&rdquo; tool has been online since 2011 and has a
              loyal user base. It offers KML export, CSV import for bulk radius creation,
              customizable circle colors, and shareable URLs. The tool is free and requires no
              account. It has accumulated over 2,000 user comments, reflecting genuine long-term
              utility.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.freemaptools.com/radius-around-point.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                FreeMapTools — Radius Around a Point
              </a>
            </p>
          </div>
        </section>

        {/* Where Map With Radius Improves */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Where Map With Radius Improves
          </h2>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>FreeMapTools</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Address search</td>
                  <td>Coordinates, city name, or &ldquo;use location&rdquo; only — no full address search</td>
                  <td className="text-green-700 font-medium">
                    Full address, zip code, city, landmark, or coordinates
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Mobile experience</td>
                  <td>Not optimized for mobile screens</td>
                  <td className="text-green-700 font-medium">Fully responsive, touch-friendly</td>
                </tr>
                <tr>
                  <td className="font-medium">Map technology</td>
                  <td>Google Maps (API costs for operators)</td>
                  <td className="text-green-700 font-medium">
                    OpenStreetMap + Leaflet (no API costs)
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">UI design</td>
                  <td>Functional but dated (2011-era interface)</td>
                  <td className="text-green-700 font-medium">Clean, modern interface</td>
                </tr>
                <tr>
                  <td className="font-medium">Circle interaction</td>
                  <td>Enter radius in text field + click &ldquo;Edit&rdquo;</td>
                  <td className="text-green-700 font-medium">Drag edge to resize, click to edit</td>
                </tr>
                <tr>
                  <td className="font-medium">PNG export</td>
                  <td>
                    <span className="text-red-600">Not available</span>
                  </td>
                  <td className="text-green-700 font-medium">Available</td>
                </tr>
                <tr>
                  <td className="font-medium">Drive time / isochrone</td>
                  <td>
                    <span className="text-red-600">Not available</span>
                  </td>
                  <td>
                    <Link href="/drive-time-map" className="content-link font-medium">
                      Available
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Who Should Still Use FreeMapTools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Who Should Still Use FreeMapTools
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              If you need CSV bulk import (uploading hundreds of radius points at once) or need the
              exact Google Maps visual style, FreeMapTools remains a solid option. Their tool also
              offers area calculation within the radius and static map URL generation.
            </p>
          </div>
        </section>

        {/* Try Map With Radius CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Modern, mobile-friendly, and free. No Google Maps API needed.
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
            <Link href="/alternatives/mapdevelopers" className="content-link">
              MapDevelopers comparison &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
