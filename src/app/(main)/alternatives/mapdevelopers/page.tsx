import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MapDevelopers Draw Circle Alternative',
  description:
    'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
  alternates: {
    canonical: '/alternatives/mapdevelopers',
  },
  openGraph: {
    title: 'MapDevelopers Draw Circle Alternative — Modern & KML-ready (2026)',
    description:
      'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
    url: 'https://mapwithradius.com/alternatives/mapdevelopers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapDevelopers Draw Circle Alternative — Modern & KML-ready (2026)',
    description:
      'MapDevelopers Draw Circle Tool alternative — KML and PNG export, drag-to-resize circles on OpenStreetMap. Free, no Google API, no account, mobile-first.',
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
          <p className="text-lg text-slate-600 mb-4">
            MapDevelopers&apos; Draw Circle Tool is one of the most-used radius tools online. It is
            free and fast, with no KML or PNG export and is built on Google Maps. Here&apos;s how
            Map With Radius compares.
          </p>
          <p className="text-sm text-slate-500">
            By the Map With Radius editorial team · Last reviewed 29 May 2026 · Based on
            MapDevelopers&apos; public tool as of May 2026
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

        {/* Technical deep-dive: Google Maps API tier exposure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What it means that MapDevelopers runs on the Google Maps API
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              MapDevelopers&apos; Draw Circle Tool renders its base map using the Google Maps
              JavaScript API. For a user just sketching a quick radius, that&apos;s invisible — the
              map loads, you draw a circle. For anyone considering embedding, scripting, or
              building a workflow on top, it&apos;s a structural fact worth understanding.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Google&apos;s 2018 pricing change moved the Google Maps API from a generous free tier
              to a pay-per-load model with $200/month of free credit (covers roughly 28,000 map
              loads). MapDevelopers absorbs that cost on the tool page and offsets it with display
              advertising. The implications for users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-4">
              <li>
                <strong>You can&apos;t embed the tool yourself for free.</strong> If you wanted to
                put a radius tool in an internal company app or a public-facing site, replicating
                MapDevelopers&apos; approach means provisioning a Google Cloud project, billing
                account, and API key — and absorbing the per-load cost above 28k/month yourself.
              </li>
              <li>
                <strong>Map style and POI labels follow Google&apos;s product roadmap.</strong> When
                Google changes how restaurants or transit stops are displayed, MapDevelopers
                changes with it. That&apos;s sometimes welcome (cleaner labels), sometimes not
                (removed features, deprecated map styles).
              </li>
              <li>
                <strong>Terms of service follow Google&apos;s.</strong> Saving Google Maps map
                tiles offline, bulk-scraping, or commercial redistribution of derived imagery is
                restricted by Google&apos;s Maps Platform terms. The same applies to anything you
                build on top of MapDevelopers.
              </li>
              <li>
                <strong>The data is Google&apos;s.</strong> Place names, road geometry, and POI
                listings are Google&apos;s proprietary dataset. That&apos;s often the most
                accurate option for North American businesses; it&apos;s sometimes thin for
                informal settlements, recent road changes in non-English-speaking markets, or
                niche POIs.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Map With Radius runs on OpenStreetMap via Leaflet. OSM is community-maintained and
              free to use commercially, with attribution. For embedding, you can iframe the tool
              into another site without provisioning anything. For accuracy, OSM matches Google
              closely in dense Western markets and sometimes outperforms it in regions where the
              local OSM community is active (much of Europe, parts of Asia and Africa).
            </p>
            <p className="text-slate-700 leading-relaxed">
              None of this is an argument that one is universally better. It&apos;s a structural
              tradeoff: Google&apos;s dataset and visual style versus OSM&apos;s openness and
              embeddability. Pick the one whose constraints don&apos;t bind on your use case.
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

        {/* Side-by-side decision summary — different visual from other alternative pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Choose by use case
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Choose MapDevelopers if…</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                <li>You want the Google Maps visual style (satellite, Street View, Google POI labels)</li>
                <li>You&apos;re already on mapdevelopers.com using their geocoding or zip-code tools</li>
                <li>You don&apos;t need KML or PNG export</li>
                <li>You&apos;re using a desktop browser and mobile UX isn&apos;t a priority</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-accent p-6 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Choose Map With Radius if…</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                <li>You need KML or PNG export for GIS, presentations, or documentation</li>
                <li>You&apos;re drawing on a phone or tablet (touch-optimised controls)</li>
                <li>You want to embed the tool elsewhere without provisioning a Google Cloud API key</li>
                <li>You also need drive-time, walking, or zip-code radius analysis from one site</li>
              </ul>
              <Link
                href="/"
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium content-link"
              >
                Open the radius tool →
              </Link>
            </div>
          </div>
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
