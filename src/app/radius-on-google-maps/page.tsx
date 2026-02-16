import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Draw a Radius on Google Maps (2026 Guide + Free Tool)',
  description:
    "Google Maps has no built-in radius tool. Here are 3 ways to draw a radius circle on Google Maps — plus a free alternative that works instantly.",
  keywords: [
    'radius on google maps',
    'google maps radius',
    'how to draw a radius on google maps',
    'draw radius on google maps',
    'google maps circle tool',
  ],
  openGraph: {
    title: 'How to Draw a Radius on Google Maps (2026 Guide + Free Tool)',
    description:
      "Google Maps has no built-in radius tool. Here are 3 ways to draw a radius circle on Google Maps.",
    url: 'https://mapwithradius.com/radius-on-google-maps',
  },
};

// Dynamic import for the mini map component
const MiniRadiusMap = dynamic(() => import('@/components/map/MiniRadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-slate-100 animate-pulse rounded-xl" />
  ),
});

export default function RadiusOnGoogleMapsPage() {
  const currentDate = '2026-02-16';

  return (
    <>
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
                name: 'Guides',
                item: 'https://mapwithradius.com/guides',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Radius on Google Maps',
                item: 'https://mapwithradius.com/radius-on-google-maps',
              },
            ],
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Draw a Radius on Google Maps',
            description:
              "Google Maps has no built-in radius tool. Here are 3 ways to draw a radius circle on Google Maps — plus a free alternative.",
            datePublished: '2026-01-15',
            dateModified: currentDate,
            author: {
              '@type': 'Organization',
              name: 'Map With Radius',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
            },
          }),
        }}
      />

      {/* HowTo Schema for Method 1 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Draw a Radius Circle Using a Third-Party Tool',
            description: 'The simplest way to get a radius on a map without Google Maps.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Open the radius tool',
                text: 'Open Map With Radius or any radius tool.',
              },
              {
                '@type': 'HowToStep',
                name: 'Search for a location',
                text: 'Type your address, city, or zip code in the search bar.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set your radius',
                text: 'Enter your desired radius distance (e.g., 10 miles, 5 km).',
              },
              {
                '@type': 'HowToStep',
                name: 'View the circle',
                text: 'The circle appears instantly on the map.',
              },
            ],
          }),
        }}
      />

      {/* HowTo Schema for Method 2 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Import a Radius Circle into Google My Maps via KML',
            description: 'Import a KML circle file into Google My Maps to display a radius.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Generate a KML circle',
                text: 'Use a radius tool to draw your circle, then click Export KML to download the file.',
              },
              {
                '@type': 'HowToStep',
                name: 'Open Google My Maps',
                text: 'Go to mymaps.google.com and sign in with your Google account. Click "Create a new map."',
              },
              {
                '@type': 'HowToStep',
                name: 'Import the KML file',
                text: 'Click "Import" in the left panel, then upload your KML file.',
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust styling',
                text: 'Click the circle to change its fill color, border color, and opacity.',
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
              <span className="text-slate-400">Guides</span>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">Radius on Google Maps</li>
          </ol>
        </div>
      </nav>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            How to Draw a Radius on Google Maps
          </h1>
          <p className="text-lg text-slate-600">
            Updated {new Date(currentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        {/* Introduction */}
        <section className="prose prose-slate max-w-none mb-12">
          <p className="text-lg text-slate-700 leading-relaxed">
            Google Maps is the most popular mapping platform in the world, but it&apos;s missing one
            feature that millions of people search for: the ability to draw a radius circle on the
            map.
          </p>

          <p className="text-slate-700 leading-relaxed">
            There is no built-in radius tool in Google Maps. You cannot click a point and draw a
            circle at a specific distance around it — not in the web version, not in the mobile app,
            and not in Google My Maps. Google has never added this feature despite years of user
            requests.
          </p>

          {/* Google Maps screenshot */}
          <div className="my-8 rounded-xl overflow-hidden border border-slate-200">
            <Image
              src="/images/google-maps-no-radius.png"
              alt="Google Maps interface showing no built-in radius tool"
              width={1200}
              height={750}
              className="w-full h-auto"
            />
          </div>

          <p className="text-slate-700 leading-relaxed">
            This guide covers three workarounds that people use to get a radius onto Google Maps, the
            limitations of each approach, and a faster alternative using our{' '}
            <Link href="/" className="content-link font-medium">
              free radius map tool
            </Link>{' '}
            that works instantly without any setup.
          </p>
        </section>

        {/* Method 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Method 1: Use a Third-Party Radius Tool (Recommended)
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              The simplest way to get a radius on a map is to skip Google Maps entirely and use a
              tool built specifically for this purpose.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">How to do it:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 mb-6">
              <li>
                Open{' '}
                <Link href="/" className="content-link font-medium">
                  Map With Radius
                </Link>{' '}
                (or any radius tool — we explain why we built ours below).
              </li>
              <li>Type your address, city, or zip code in the search bar.</li>
              <li>Enter your desired radius distance (e.g., 10 miles, 5 km).</li>
              <li>The circle appears instantly on the map.</li>
            </ol>
          </div>

          {/* Embedded mini radius tool */}
          <div className="my-8">
            <MiniRadiusMap center={[40.7128, -74.006]} radiusMiles={10} height="400px" />
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open full tool
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              <strong>Why this works best:</strong> The tool is purpose-built for radius drawing. You
              get address search, adjustable circles, multiple radii, and shareable links — all the
              features Google Maps doesn&apos;t offer. The map uses OpenStreetMap tiles, which show the
              same streets, landmarks, and geographic detail you&apos;d see on Google Maps.
            </p>

            <p className="text-slate-700 leading-relaxed mt-4">
              <strong>Limitation:</strong> The map tiles look different from Google Maps. If you
              specifically need the Google Maps visual style or satellite imagery, see Methods 2 and 3
              below.
            </p>
          </div>
        </section>

        {/* Method 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Method 2: KML File Import via Google My Maps
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              This method creates a circle in a KML file and imports it into Google My Maps. It&apos;s
              the only way to display a radius directly on a Google Map.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">How to do it:</h3>
            <ol className="list-decimal list-inside space-y-4 text-slate-700 mb-6">
              <li>
                <strong>Generate a KML circle.</strong> You need a KML file containing a circle
                polygon. You can create one using our tool (draw your radius → click Export KML) or
                use a KML circle generator.
              </li>
              <li>
                <strong>Open Google My Maps.</strong> Go to{' '}
                <a
                  href="https://mymaps.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                  mymaps.google.com
                </a>{' '}
                and sign in with your Google account. Click &ldquo;Create a new map.&rdquo;
              </li>
              <li>
                <strong>Import the KML file.</strong> Click &ldquo;Import&rdquo; in the left panel, then upload
                your KML file. The circle will appear on the Google Map.
              </li>
              <li>
                <strong>Adjust styling.</strong> Click the circle to change its fill color, border
                color, and opacity.
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Limitations:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Requires a Google account.</li>
              <li>
                You must generate the KML file externally first — Google My Maps cannot create circles
                from scratch.
              </li>
              <li>
                The circle is a polygon approximation (typically 360 points), not a true geometric
                circle. At small scales this is indistinguishable, but at very small radii the edges
                may appear slightly angular.
              </li>
              <li>
                You cannot easily resize the circle after import. To change the radius, you need to
                generate a new KML file and re-import it.
              </li>
              <li>Google My Maps has a limit of 10 layers and 2,000 features per layer.</li>
            </ul>
          </div>
        </section>

        {/* Method 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Method 3: Google Maps JavaScript API (Developers Only)
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              If you&apos;re a developer building a web application, the Google Maps JavaScript API has a{' '}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">google.maps.Circle</code>{' '}
              class that renders a radius circle programmatically.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Example code:</h3>

            {/* Code block */}
            <div className="bg-slate-900 rounded-xl overflow-hidden my-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 text-sm">
                <span>JavaScript</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">{`const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 40.7128, lng: -74.0060 },
  zoom: 11,
});

new google.maps.Circle({
  map: map,
  center: { lat: 40.7128, lng: -74.0060 },
  radius: 16093, // radius in meters (10 miles ≈ 16,093 m)
  fillColor: "#4285F4",
  fillOpacity: 0.2,
  strokeColor: "#4285F4",
  strokeWeight: 2,
});`}</code>
              </pre>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Limitations:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Requires a Google Cloud account and API key.</li>
              <li>Requires JavaScript coding knowledge.</li>
              <li>
                Google Maps Platform charges $7 per 1,000 map loads after a $200 monthly free credit.
                For a personal project this may be free, but for a public website it adds up quickly.
              </li>
              <li>
                This is a development tool, not an end-user solution. Regular users searching
                &ldquo;how to draw a radius on Google Maps&rdquo; are looking for a ready-made tool, not a code
                snippet.
              </li>
            </ul>

            <p className="text-slate-700 leading-relaxed mt-4">
              For reference, Google&apos;s official documentation on the Circle class:{' '}
              <a
                href="https://developers.google.com/maps/documentation/javascript/shapes#circles"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Google Maps JavaScript API — Circles
              </a>
            </p>
          </div>
        </section>

        {/* Why Google Maps Doesn't Have This */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Why Google Maps Doesn&apos;t Have a Radius Tool
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Google Maps is designed primarily for navigation — getting directions from A to B.
              Features like radius drawing, area measurement, and zone visualization fall outside its
              core use case.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              Google My Maps (the customization layer) supports markers, lines, and polygons, but not
              circles. The Google Maps mobile app has a basic distance measurement tool (tap and hold
              to drop a pin, then select &ldquo;Measure distance&rdquo;), but this only measures point-to-point
              distance, not a radius in all directions.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Google has not publicly commented on why a radius feature has not been added.
              Third-party tools have filled this gap for over a decade —{' '}
              <Link href="/alternatives/freemaptools" className="content-link">
                FreeMapTools
              </Link>{' '}
              has offered radius drawing since 2011, and{' '}
              <Link href="/alternatives/mapdevelopers" className="content-link">
                MapDevelopers
              </Link>{' '}
              has been another popular option. Our tool,{' '}
              <Link href="/" className="content-link font-medium">
                Map With Radius
              </Link>
              , is a more modern alternative built on open-source mapping technology.
            </p>
          </div>
        </section>

        {/* Radius vs Drive Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Radius vs. Drive Time: Which Do You Need?
          </h2>

          <div className="prose prose-slate max-w-none mb-6">
            <p className="text-slate-700 leading-relaxed">
              A common mistake is using a radius circle when you actually need a drive-time map.
              These serve different purposes:
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-6">
            <table className="styled-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Radius Circle</th>
                  <th>Drive Time Map</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">What it shows</td>
                  <td>Straight-line distance from a point</td>
                  <td>Actual travel distance by road</td>
                </tr>
                <tr>
                  <td className="font-medium">Shape</td>
                  <td>Perfect circle</td>
                  <td>Irregular polygon following roads</td>
                </tr>
                <tr>
                  <td className="font-medium">Best for</td>
                  <td>Quick distance estimates, coverage zones</td>
                  <td>Commute planning, delivery routing</td>
                </tr>
                <tr>
                  <td className="font-medium">Example</td>
                  <td>&ldquo;Everything within 10 miles&rdquo;</td>
                  <td>&ldquo;Everything within a 20-minute drive&rdquo;</td>
                </tr>
                <tr>
                  <td className="font-medium">Accounts for roads?</td>
                  <td>No</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td className="font-medium">Accounts for traffic?</td>
                  <td>No</td>
                  <td>Depends on tool</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              A 10-mile radius draws a perfect circle, but you can&apos;t actually reach every point
              inside that circle by road. Mountains, rivers, highways, and one-way streets all affect
              real-world accessibility. If you need to know what you can realistically reach, use our{' '}
              <Link href="/drive-time-map" className="content-link font-medium">
                drive time map
              </Link>{' '}
              instead.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Can you draw a radius on Google Maps without any tools?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. Google Maps does not have a built-in radius or circle drawing feature. The
                distance measurement tool only measures point-to-point distance, not a radius area.
                You need either a third-party tool or a KML file import to display a radius on a map.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How do I show a mile radius on Google Maps?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The fastest way is to use a{' '}
                <Link href="/" className="content-link">
                  radius map tool
                </Link>{' '}
                to draw your circle, then export it as a KML file and import it into Google My Maps.
                Or simply use the third-party tool directly — it shows the same geographic information
                without the extra steps.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is there a radius feature in Google Maps mobile app?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. The Google Maps app for iOS and Android does not support radius drawing. The
                &ldquo;Measure distance&rdquo; feature only measures straight-line distance between tapped points,
                not a radius circle.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I draw a radius in Google Earth?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Google Earth Pro (desktop version) supports circle drawing through the &ldquo;Add Polygon&rdquo;
                and &ldquo;Circle&rdquo; measurement tools. This works for visualization but is limited to
                Google Earth — you cannot transfer the radius back to Google Maps without exporting as
                KML. Google Earth Web does not support circle drawing.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the best free alternative to Google Maps for radius drawing?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                <Link href="/" className="content-link font-medium">
                  Map With Radius
                </Link>{' '}
                provides instant radius drawing with address search, multiple circles, shareable
                links, and KML export — all free with no account required. Other options include{' '}
                <Link href="/alternatives/freemaptools" className="content-link">
                  FreeMapTools
                </Link>{' '}
                (established but dated UI),{' '}
                <a
                  href="https://www.calcmaps.com/map-radius/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                  CalcMaps
                </a>{' '}
                (clean but limited free tier), and{' '}
                <Link href="/alternatives/mapdevelopers" className="content-link">
                  MapDevelopers
                </Link>{' '}
                (simple and reliable).
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How do I draw a 5 km radius on Google Maps?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Use our{' '}
                <Link href="/" className="content-link font-medium">
                  radius map tool
                </Link>
                . Enter your address, set the radius to 5 km, and the circle appears instantly. To get
                this onto Google Maps specifically, export the KML file from our tool and import it
                into Google My Maps.
              </div>
            </details>
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Can you draw a radius on Google Maps without any tools?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. Google Maps does not have a built-in radius or circle drawing feature. The distance measurement tool only measures point-to-point distance, not a radius area. You need either a third-party tool or a KML file import to display a radius on a map.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do I show a mile radius on Google Maps?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The fastest way is to use a radius map tool to draw your circle, then export it as a KML file and import it into Google My Maps. Or simply use the third-party tool directly — it shows the same geographic information without the extra steps.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is there a radius feature in Google Maps mobile app?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. The Google Maps app for iOS and Android does not support radius drawing. The "Measure distance" feature only measures straight-line distance between tapped points, not a radius circle.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I draw a radius in Google Earth?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Google Earth Pro (desktop version) supports circle drawing through the "Add Polygon" and "Circle" measurement tools. This works for visualization but is limited to Google Earth — you cannot transfer the radius back to Google Maps without exporting as KML. Google Earth Web does not support circle drawing.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the best free alternative to Google Maps for radius drawing?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Map With Radius provides instant radius drawing with address search, multiple circles, shareable links, and KML export — all free with no account required. Other options include FreeMapTools (established but dated UI), CalcMaps (clean but limited free tier), and MapDevelopers (simple and reliable).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do I draw a 5 km radius on Google Maps?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Use the Map With Radius tool. Enter your address, set the radius to 5 km, and the circle appears instantly. To get this onto Google Maps specifically, export the KML file from the tool and import it into Google My Maps.',
                    },
                  },
                ],
              }),
            }}
          />
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to draw your radius?</h2>
          <p className="text-slate-300 mb-6">
            Skip the workarounds. Draw a radius circle in seconds with our free tool.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Open Radius Map Tool
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </article>
    </>
  );
}
