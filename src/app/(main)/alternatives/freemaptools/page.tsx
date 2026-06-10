import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreeMapTools Radius Alternative',
  description:
    'FreeMapTools radius alternative — modern, mobile-friendly, with full address search and instant KML/PNG export. Free, no Google API, no account required.',
  alternates: {
    canonical: '/alternatives/freemaptools',
  },
  openGraph: {
    title: 'FreeMapTools Radius Alternative — Faster & Modern (2026)',
    description:
      'FreeMapTools radius alternative — modern, mobile-friendly, with full address search and instant KML/PNG export. Free, no Google API, no account required.',
    url: 'https://mapwithradius.com/alternatives/freemaptools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeMapTools Radius Alternative — Faster & Modern (2026)',
    description:
      'FreeMapTools radius alternative — modern, mobile-friendly, with full address search and instant KML/PNG export. Free, no Google API, no account required.',
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
            description:
              'FreeMapTools radius alternative — modern, mobile-friendly, with full address search and instant KML/PNG export. Free, no Google API, no account required.',
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
                name: 'Is FreeMapTools free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. FreeMapTools is a long-running free web tool and requires no account. The site displays ads.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can FreeMapTools import a CSV of points?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. FreeMapTools supports CSV bulk import, letting you upload hundreds of points and draw radius circles around each. This is its strongest unique feature. Map With Radius does not currently support CSV bulk import.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does FreeMapTools export KML?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. FreeMapTools offers KML export from its radius tool. Map With Radius also exports KML — the difference is in mobile UX and map engine, not export format.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why would I use Map With Radius over FreeMapTools?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Map With Radius is fully mobile-optimized and runs on OpenStreetMap rather than Google Maps. FreeMapTools' interface dates to 2011 and was not built for phones. If you are drawing a radius on mobile, Map With Radius handles it more cleanly.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is FreeMapTools or Map With Radius better for shareable URLs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Both support shareable URLs. Map With Radius encodes coordinates, radius, and unit directly in the URL query string (for example, ?lat=40.7&lng=-74&r=10mi), which is copy-paste friendly. FreeMapTools also generates a shareable URL from its interface.',
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
          <p className="text-lg text-slate-600 mb-4">
            A modern alternative to the classic FreeMapTools radius tool — written for the
            specific workflow tradeoffs between the two.
          </p>
          <p className="text-sm text-slate-500">
            By the Map With Radius editorial team · Last reviewed 29 May 2026 · Based on
            FreeMapTools&apos; public documentation as of May 2026
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

        {/* Technical deep-dive: CSV bulk import */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Technical deep-dive: the CSV bulk import workflow
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              The single feature where FreeMapTools genuinely outperforms most other radius tools
              is bulk CSV import. The workflow accepts a CSV with one row per point (latitude,
              longitude, and optionally radius, label, and color) and draws every circle at once.
              For teams plotting service-area radii around dozens or hundreds of locations — chain
              restaurants, retail stores, sales territories — this collapses an otherwise tedious
              one-circle-at-a-time process into a single upload.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The CSV import has known constraints worth understanding before you commit to it:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed mb-4">
              <li>
                <strong>No address geocoding.</strong> The CSV must contain pre-computed latitude
                and longitude — you can&apos;t upload &ldquo;123 Main St, Boston&rdquo; and let
                the tool geocode in bulk. If your source data is addresses, run them through a
                geocoder (Nominatim, the Google Geocoding API, or Mapbox) first.
              </li>
              <li>
                <strong>Practical row ceiling.</strong> FreeMapTools renders circles client-side
                in JavaScript, and browser performance starts to degrade past a few hundred
                circles on a single map. For 1,000+ point datasets, a desktop GIS tool (QGIS,
                ArcGIS) gives smoother interaction.
              </li>
              <li>
                <strong>No export back to CSV with computed fields.</strong> The import is
                one-way: CSV in, visual map out. If you want to compute &ldquo;which points fall
                within X km of point Y,&rdquo; that&apos;s a different analytical step the
                FreeMapTools tool doesn&apos;t do.
              </li>
              <li>
                <strong>Shared map only.</strong> Each upload produces a public visualisation; the
                tool doesn&apos;t persist your dataset across sessions, so re-running an analysis
                later means re-uploading the CSV.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Map With Radius doesn&apos;t support CSV bulk import today. The intended workflow for
              multiple radii is different: URL-encode each individual circle&apos;s coordinates
              and radius, then either share each URL separately or programmatically generate a
              batch. For three or four circles that&apos;s fine; for thirty, the CSV approach
              wins; for three hundred, neither tool is the right answer — that&apos;s a QGIS or
              ArcGIS workflow.
            </p>
          </div>
        </section>

        {/* Who Should Still Use FreeMapTools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Who Should Still Use FreeMapTools
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              FreeMapTools is the right choice when:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed">
              <li>You have a CSV of pre-geocoded points and need all radii on one map.</li>
              <li>You specifically want the Google Maps visual style for screenshots or
                  embeds.</li>
              <li>You need the in-radius area calculation feature (area in km² or mi² inside the
                  circle).</li>
              <li>You&apos;re comfortable with a 2011-era interface and aren&apos;t working from
                  a phone.</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Is FreeMapTools free?
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
                Yes. FreeMapTools is a long-running free web tool and requires no account. The site
                displays ads.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can FreeMapTools import a CSV of points?
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
                Yes. FreeMapTools supports CSV bulk import, letting you upload hundreds of points
                and draw radius circles around each. This is its strongest unique feature. Map With
                Radius does not currently support CSV bulk import.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does FreeMapTools export KML?
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
                Yes. FreeMapTools offers KML export from its radius tool. Map With Radius also
                exports KML — the difference is in mobile UX and map engine, not export format.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Why would I use Map With Radius over FreeMapTools?
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
                Map With Radius is fully mobile-optimized and runs on OpenStreetMap rather than
                Google Maps. FreeMapTools&apos; interface dates to 2011 and was not built for
                phones. If you are drawing a radius on mobile, Map With Radius handles it more
                cleanly.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is FreeMapTools or Map With Radius better for shareable URLs?
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
                Both support shareable URLs. Map With Radius encodes coordinates, radius, and unit
                directly in the URL query string (for example,
                {' '}?lat=40.7&amp;lng=-74&amp;r=10mi), which is copy-paste friendly. FreeMapTools
                also generates a shareable URL from its interface.
              </div>
            </details>
          </div>
        </section>

        {/* Switching from FreeMapTools — closing as a stepped guide, not a CTA box */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            If you&apos;re switching from FreeMapTools
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            For a single radius (no CSV bulk), the migration path is essentially zero-friction —
            the same coordinates and radius value produce the same circle. The change you&apos;ll
            notice is the address-search behaviour: you can type a street address in
            Map With Radius and it resolves directly, whereas FreeMapTools wants the coordinates
            or city name. Here&apos;s the practical hand-over:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700 leading-relaxed mb-4">
            <li>
              Note your existing radius value and center coordinates from the FreeMapTools URL
              (look for the lat, lng, and radius query parameters).
            </li>
            <li>
              Open <Link href="/" className="content-link">the main radius tool</Link> and either
              paste the coordinates into the search box or type the address. The map centers and
              draws the circle in one step.
            </li>
            <li>
              If you want a different unit, toggle miles ↔ kilometers in the controls — the
              radius value converts automatically.
            </li>
            <li>
              For a shareable link, click &ldquo;Copy link&rdquo;. The URL now encodes the
              coordinates and radius directly, which means recipients open the exact map you saw.
            </li>
          </ol>
          <p className="text-slate-700 leading-relaxed">
            If your FreeMapTools workflow depends on the CSV import — keep using it for that case.
            For everything else, the modern interface is the upgrade.
          </p>
        </section>

        {/* Links Section */}
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
            <Link href="/alternatives/mapdevelopers" className="content-link">
              MapDevelopers &rarr;
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
