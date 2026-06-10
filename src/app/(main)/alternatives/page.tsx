import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radius Map Tool Alternatives Compared',
  description:
    'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
  alternates: {
    canonical: '/alternatives',
  },
  openGraph: {
    title: 'Radius Map Tool Alternatives — Compared Side by Side (2026)',
    description:
      'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
    url: 'https://mapwithradius.com/alternatives',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radius Map Tool Alternatives — Compared Side by Side (2026)',
    description:
      'Compare six radius map tools — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive, and Map With Radius. Pricing, features, and which fits your use case.',
  },
};

const FAQS = [
  {
    question: 'Why are most "free" radius tools ad-supported and run on Google Maps?',
    answer:
      "Most free tools you'll find online run on the Google Maps Platform, which charges per-request fees once you exceed the free monthly tier. Tool operators show ads to cover those API costs. Map With Radius runs on OpenStreetMap instead — open data with no per-request fees — so we can stay free without aggressive monetization.",
  },
  {
    question: 'Do I need a paid radius tool for casual use?',
    answer:
      "Almost certainly not. If you're drawing a few circles on a map, exporting one or two for a slide deck or a CRM, or screening neighborhoods for a home search, any free tool is fine. Paid plans start to pay off when you're (1) mapping spreadsheet datasets of hundreds of points, (2) needing demographic overlays integrated with the map, or (3) collaborating with a team where saved-map state and access control matter.",
  },
  {
    question: 'When does a paid plan actually pay off?',
    answer:
      'Three scenarios. (1) Sales-ops teams building territory plans where the cost of bad territory > $99/month. (2) Site-selection consultants charging clients for trade-area analysis — demographic overlays save hours per project. (3) Field-service ops mapping hundreds of jobs daily where CSV bulk import + saved layers compound. Below those bars, free tools are usually enough.',
  },
  {
    question: 'Is it cheaper to build my own with the Google Maps API?',
    answer:
      "Probably not for radius tooling alone. The Google Maps Platform has free-tier credits monthly, but you'll burn through them quickly once real users hit the tool. Adding the cost of developer time to build and maintain the integration, you're usually better off with an existing tool than rolling your own. If you need a custom integration with internal data, the calculation changes — but for pure radius work, off-the-shelf wins.",
  },
  {
    question: 'How do these tools handle export to my CRM, MLS, or GIS?',
    answer:
      "KML is the universal exchange format. Most tools (Map With Radius, FreeMapTools, CalcMaps) export KML, which imports cleanly into Google Earth, QGIS, ArcGIS, most CRMs with mapping modules, and major MLS systems. Maptive and Smappen lean toward their own dashboards rather than file export. Always check the export options before committing — fewer formats means more lock-in.",
  },
  {
    question: 'Why does one tool show different radii than another for the same input?',
    answer:
      "The underlying geometry should match — a 10 km radius is 10 km regardless of tool. What can differ: (1) which projection is used for display (Web Mercator distorts visual size), (2) whether the tool uses Haversine on a spherical Earth or Vincenty's formulae on the WGS 84 ellipsoid (differences are < 0.3% at 1,000 km), (3) where the center is anchored. Cross-check by entering identical lat/lng and radius; if numbers diverge, it's a tool bug.",
  },
  {
    question: "What's the difference between a paid tool and a paid plan within a free tool?",
    answer:
      "Smappen and CalcMaps have free tiers and paid upgrades. Maptive is paid-only. The free tiers usually limit map saves, demographic overlays, or simultaneous map count — useful for trying the workflow before committing. If you only need basic radius drawing, you'll likely never hit the free-tier limits and won't need to upgrade.",
  },
  {
    question: 'Are any of these tools likely to disappear or change pricing soon?',
    answer:
      "Hard to predict, but the long-running free tools (FreeMapTools dating to 2011, MapDevelopers) have shown durability. Newer or paid ones (Smappen — formerly Oalley — and Maptive) are commercial products with ongoing operations risk. Map With Radius is the youngest entrant; the bet on OpenStreetMap means cost structure stays low even at scale. Your safest insurance: pick a tool with good KML or CSV export, so you can switch later without re-creating work.",
  },
];

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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
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
            Radius Map Tool Alternatives Compared
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Five radius-mapping tools are commonly compared online: FreeMapTools, MapDevelopers,
            CalcMaps, Smappen, and Maptive. Each is built for a different user, and Map With
            Radius sits against them as a free, no-signup option. Below is a side-by-side
            comparison, a decision matrix, an evaluation framework, and deep-dive links for each.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            If you&apos;re here to pick a tool quickly, the decision matrix below points you to
            the right one in two clicks. If you&apos;re comparing options for a team purchase or
            an evaluation, the &ldquo;how to evaluate&rdquo; section walks through the six
            criteria that actually matter, and the FAQ answers the questions buyers usually
            ask in evaluation calls.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-slate-900">6</div>
              <div className="text-sm text-slate-600">tools compared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">6</div>
              <div className="text-sm text-slate-600">evaluation criteria</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{FAQS.length}</div>
              <div className="text-sm text-slate-600">buying questions</div>
            </div>
          </div>
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

        {/* Section: How to evaluate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How to Evaluate a Radius Mapping Tool
          </h2>
          <p className="text-slate-700 leading-relaxed mb-5">
            Most radius-tool reviews focus on look and feel — the actual buying decision usually
            comes down to six concrete questions. Run any tool through these and you&apos;ll
            know whether it fits.
          </p>
          <ol className="list-decimal list-outside pl-6 space-y-3 text-slate-700 mb-5">
            <li>
              <strong>What&apos;s the price model?</strong> Free, ad-supported, free-with-paid-upgrade,
              prepaid credits, monthly subscription, or per-user annual. Pricing tier depends on
              your usage frequency more than feature set.
            </li>
            <li>
              <strong>What&apos;s the map engine?</strong> Google Maps (familiar visual style with
              per-request API costs that the tool operator absorbs) or OpenStreetMap (open, no
              per-request fees). Performance differences are negligible for radius tooling; visual
              style is mostly preference.
            </li>
            <li>
              <strong>What can you export?</strong> KML is the universal exchange format — works
              with Google Earth, QGIS, ArcGIS, most CRMs with mapping modules, and major MLS
              systems. PNG for slide decks, CSV for spreadsheet workflows. The fewer formats
              supported, the more lock-in into a vendor&apos;s dashboard.
            </li>
            <li>
              <strong>Does it support bulk import?</strong> If you&apos;re mapping 50+ points from
              a spreadsheet, CSV import is a hard requirement. Without it, manual entry kills the
              workflow. FreeMapTools is strong here; several others lack it entirely.
            </li>
            <li>
              <strong>Drive-time isochrones, not just radii?</strong> For commute, delivery, or
              service-area work, an isochrone (irregular shape following roads) is more honest than
              a straight-line radius. Some tools lock isochrones behind a paid plan; some don&apos;t
              have them at all. If your workflow needs travel-time analysis, confirm this before
              committing.
            </li>
            <li>
              <strong>Account required for basic use?</strong> A signup-wall on a free tool usually
              signals it&apos;s a lead-generation entry point for a paid product. That can be fine,
              but check whether the workflow you actually want is accessible without an account.
            </li>
          </ol>
          <p className="text-sm text-slate-500 italic">
            Beyond these six, secondary considerations: collaborative editing, demographic-data
            overlays, API access, mobile UX, and customer support. These matter less unless you
            have a specific workflow that demands them.
          </p>
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

        {/* Section: FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.question} className="faq-card">
                <summary>
                  {f.question}
                  <svg
                    className="w-5 h-5 faq-chevron"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">{f.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Section: Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Resources and references
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Tool pricing pages, documentation, and the underlying technology each option relies
            on.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Tool homepages</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://www.freemaptools.com/radius-around-point.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    FreeMapTools — Radius Around Point
                  </a>{' '}
                  (CSV bulk import).
                </li>
                <li>
                  <a
                    href="https://www.mapdevelopers.com/draw-circle-tool.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    MapDevelopers — Draw Circle Tool
                  </a>
                  .
                </li>
                <li>
                  <a
                    href="https://www.calcmaps.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    CalcMaps
                  </a>{' '}
                  (broader mapping suite, PRO credits).
                </li>
                <li>
                  <a
                    href="https://www.smappen.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Smappen
                  </a>{' '}
                  (geomarketing, formerly Oalley).
                </li>
                <li>
                  <a
                    href="https://www.maptive.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Maptive
                  </a>{' '}
                  (B2B data mapping).
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Underlying technology</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://mapsplatform.google.com/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Google Maps Platform pricing
                  </a>{' '}
                  — the cost structure most &ldquo;free&rdquo; tools absorb.
                </li>
                <li>
                  <a
                    href="https://www.openstreetmap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OpenStreetMap
                  </a>{' '}
                  — open data alternative to Google Maps.
                </li>
                <li>
                  <a
                    href="https://operations.osmfoundation.org/policies/tiles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OSM tile usage policy
                  </a>{' '}
                  — the constraints any OSM-based tool operates under.
                </li>
                <li>
                  <a
                    href="https://leafletjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Leaflet
                  </a>{' '}
                  — open-source JavaScript map library used by Map With Radius.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Haversine_formula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Haversine formula
                  </a>{' '}
                  — the math behind every radius circle.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Exchange formats</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Keyhole_Markup_Language"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    KML standard (OGC)
                  </a>{' '}
                  — the de-facto exchange format for radius and polygon data.
                </li>
                <li>
                  <a
                    href="https://geojson.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    GeoJSON
                  </a>{' '}
                  — open format for geographic features.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Shapefile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Shapefile
                  </a>{' '}
                  — Esri&apos;s legacy format, still used in professional GIS.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">On this site</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/" className="content-link">
                    Main radius tool
                  </Link>{' '}
                  — what we&apos;re comparing against.
                </li>
                <li>
                  <Link href="/use-cases" className="content-link">
                    Use cases
                  </Link>{' '}
                  — concrete examples by industry with worked city walkthroughs.
                </li>
                <li>
                  <Link href="/glossary" className="content-link">
                    Glossary
                  </Link>{' '}
                  — definitions of every term used here.
                </li>
                <li>
                  <Link href="/radius-on-google-maps" className="content-link">
                    Radius on Google Maps
                  </Link>{' '}
                  — for users who specifically want a Google Maps workflow.
                </li>
              </ul>
            </div>
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
