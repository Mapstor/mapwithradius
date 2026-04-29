import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'MapDevelopers Draw Circle Alternative',
  description:
    'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
  alternates: {
    canonical: '/alternatives/mapdevelopers',
  },
  keywords: [
    'mapdevelopers draw circle alternative',
    'mapdevelopers radius alternative',
    'draw circle on map',
    'radius map tool',
  ],
  openGraph: {
    title: 'MapDevelopers Draw Circle Alternative — Modern & KML-ready (2026)',
    description:
      'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
    url: 'https://mapwithradius.com/alternatives/mapdevelopers',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapDevelopers Draw Circle Alternative — Modern & KML-ready (2026)',
    description:
      'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
    images: OG_IMAGES,
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
            name: 'MapDevelopers Alternative',
            description:
              'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
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
                name: 'MapDevelopers',
                item: 'https://mapwithradius.com/alternatives/mapdevelopers',
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
                name: 'Is MapDevelopers free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. MapDevelopers is free and requires no account. The site displays ads on the tool page. There is no paid tier or subscription.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can MapDevelopers export KML?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The MapDevelopers Draw Circle Tool does not export KML or PNG. Map With Radius exports both formats for free.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does MapDevelopers work on mobile?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Partially. The tool loads on mobile, but the controls are not optimized for touch. Map With Radius is designed mobile-first with touch-friendly drag and resize.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is MapDevelopers or Map With Radius faster?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Both load quickly. MapDevelopers depends on the Google Maps JavaScript API, which adds bundle size and external script dependencies. Map With Radius uses Leaflet plus OpenStreetMap tiles, which is generally lighter.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I embed MapDevelopers on my own site?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MapDevelopers does not offer an official embed widget. Map With Radius provides an embed endpoint at /embed for integrating the tool into other sites, free of Google Maps API keys and billing.',
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
            <li className="text-slate-900 font-medium">MapDevelopers</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            MapDevelopers Alternative — Modern Radius Maps with KML Export
          </h1>
          <p className="text-lg text-slate-600">
            MapDevelopers&apos; Draw Circle Tool is one of the most-used radius tools online. It is
            free and fast, with no KML or PNG export and is built on Google Maps. Here&apos;s how
            Map With Radius compares.
          </p>
        </header>

        {/* Section 2: What MapDevelopers Is */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What MapDevelopers Is
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              MapDevelopers (mapdevelopers.com) is a long-running suite of free web tools for
              mapping, geocoding, and distance calculation. The Draw Circle Tool is one of its
              most-used utilities, offering quick radius circle drawing on a Google Maps base with
              address search, multiple circles, drag-to-reposition, and custom colors. The site is
              long-running and aimed at casual web users.
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

        {/* Section 3: Pricing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Pricing &amp; Access
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              MapDevelopers is free and requires no account. The site displays ads on the tool
              page. There is no paid tier, no trial, and no signup flow. The tool runs on the
              Google Maps JavaScript API, which means it depends on Google&apos;s terms of service
              and API availability.
            </p>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How MapDevelopers Compares
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MapDevelopers</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Free to use</td>
                  <td>Yes (ad-supported)</td>
                  <td className="text-green-700 font-medium">Yes, no ads</td>
                </tr>
                <tr>
                  <td className="font-medium">Map engine</td>
                  <td>Google Maps</td>
                  <td className="text-green-700 font-medium">OpenStreetMap</td>
                </tr>
                <tr>
                  <td className="font-medium">Multiple circles</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Address search</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Shareable URL</td>
                  <td>Yes</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">KML export</td>
                  <td>
                    <span className="text-red-600">No</span>
                  </td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">PNG export</td>
                  <td>
                    <span className="text-red-600">No</span>
                  </td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">Drive-time / isochrone</td>
                  <td>
                    <span className="text-red-600">No</span>
                  </td>
                  <td>
                    <Link href="/drive-time-map" className="content-link font-medium">
                      Yes, on /drive-time-map
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Mobile-friendly</td>
                  <td>Partial</td>
                  <td className="text-green-700 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Account required</td>
                  <td>No</td>
                  <td>No</td>
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
              Map With Radius exports KML and PNG for free. MapDevelopers does not export in either
              format, so anyone who needs to load their radius into Google Earth, a GIS tool, or a
              document has to screenshot or recreate the shape elsewhere.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We run on OpenStreetMap via Leaflet, not Google Maps. That matters for anyone
              embedding the tool into their own site — no Google API key, no quota, no per-load
              billing.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Our tool is designed mobile-first. MapDevelopers works on mobile, but the controls are
              cramped and the interaction patterns assume a cursor. Drawing a radius on a phone is
              smoother on Map With Radius.
            </p>
          </div>
        </section>

        {/* Section 6: When competitor wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            When MapDevelopers Is Still the Right Choice
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              MapDevelopers is simple, fast, and established. If you need the Google Maps visual
              style — satellite view, specific POI labels, Street View integration — MapDevelopers
              delivers it. It also pairs well with other MapDevelopers utilities if you are already
              mid-workflow on their site for geocoding, distance calculation, or zip-code lookup.
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
                Is MapDevelopers free?
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
                Yes. MapDevelopers is free and requires no account. The site displays ads on the
                tool page. There is no paid tier or subscription.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can MapDevelopers export KML?
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
                No. The MapDevelopers Draw Circle Tool does not export KML or PNG. Map With Radius
                exports both formats for free.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does MapDevelopers work on mobile?
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
                Partially. The tool loads on mobile, but the controls are not optimized for touch.
                Map With Radius is designed mobile-first with touch-friendly drag and resize.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is MapDevelopers or Map With Radius faster?
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
                Both load quickly. MapDevelopers depends on the Google Maps JavaScript API, which
                adds bundle size and external script dependencies. Map With Radius uses Leaflet
                plus OpenStreetMap tiles, which is generally lighter.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I embed MapDevelopers on my own site?
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
                MapDevelopers does not offer an official embed widget.{' '}
                <Link href="/embed" className="content-link">
                  Map With Radius provides an embed endpoint at /embed
                </Link>{' '}
                for integrating the tool into other sites, free of Google Maps API keys and
                billing.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Modern, mobile-first, no Google Maps dependency. Export KML and PNG for free.
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
            <Link href="/alternatives/freemaptools" className="content-link">
              FreeMapTools &rarr;
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
