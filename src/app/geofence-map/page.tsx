import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geofence Map Tool — Create a Radius Geofence (Free)',
  description:
    'Learn what geofencing is and use our free radius tool to create a basic geofence around any location. No coding or app required.',
  keywords: ['geofence map tool', 'google map geofencing', 'geofence radius', 'create geofence'],
  openGraph: {
    title: 'Geofence Map Tool — Create a Radius Geofence (Free)',
    description:
      'Learn what geofencing is and use our free radius tool to visualize and plan geofence boundaries.',
    url: 'https://mapwithradius.com/geofence-map',
  },
};

export default function GeofenceMapPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Geofence Map Tool',
            description:
              'Learn what geofencing is and use our free radius tool to create a basic geofence around any location.',
            url: 'https://mapwithradius.com/geofence-map',
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
                name: 'Geofence Map',
                item: 'https://mapwithradius.com/geofence-map',
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
            <li className="text-slate-900 font-medium">Geofence Map</li>
          </ol>
        </div>
      </nav>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Geofence Map Tool</h1>
          <p className="text-lg text-slate-600">
            Understand geofencing and visualize geofence boundaries with our free radius tool.
          </p>
        </header>

        {/* What Is a Geofence */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What Is a Geofence?
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              A geofence is a virtual boundary around a real-world location. When a device (usually a
              smartphone) enters or exits the geofence, it triggers an action — like sending a
              notification, logging the event, or adjusting app behavior. Geofences are typically
              circular, defined by a center point and a radius.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://en.wikipedia.org/wiki/Geo-fence"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Wikipedia — Geo-fence
              </a>
            </p>
          </div>
        </section>

        {/* How Geofencing Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How Geofencing Works
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              Geofencing uses GPS, Wi-Fi, cellular data, or Bluetooth to determine a device&apos;s
              location. When the device&apos;s coordinates fall within (or outside) the defined
              boundary, the geofence is &ldquo;triggered.&rdquo; Common geofence radius sizes range
              from 100 meters (for store-level targeting) to several kilometers (for regional
              boundaries).
            </p>
          </div>
        </section>

        {/* Creating a Basic Geofence */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Creating a Basic Geofence with Our Tool
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-6">
              While our{' '}
              <Link href="/" className="content-link">
                radius map tool
              </Link>{' '}
              isn&apos;t a full geofencing platform (it doesn&apos;t track devices or trigger
              actions), it&apos;s useful for the planning and visualization step:
            </p>

            <ol className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </span>
                <span>
                  Open the{' '}
                  <Link href="/" className="content-link">
                    radius tool
                  </Link>{' '}
                  and enter the center location of your desired geofence.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </span>
                <span>Set the radius to your desired geofence size.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </span>
                <span>Visualize the area and adjust as needed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                  4
                </span>
                <span>
                  Export as KML to import into your geofencing platform or development environment.
                </span>
              </li>
            </ol>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> For implementing actual geofencing (with device tracking and
                triggers), you&apos;ll need a development platform like Google&apos;s Geofencing API
                (Android), Apple&apos;s Core Location (iOS), or a third-party service like Radar.io
                or PlotProjects.
              </p>
            </div>
          </div>
        </section>

        {/* Common Geofence Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Common Geofence Sizes
          </h2>

          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Use Case</th>
                  <th>Typical Radius</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Retail store entry</td>
                  <td>50–200 m</td>
                  <td>Trigger when customer approaches</td>
                </tr>
                <tr>
                  <td className="font-medium">Restaurant / local business</td>
                  <td>200–500 m</td>
                  <td>Nearby notifications</td>
                </tr>
                <tr>
                  <td className="font-medium">Campus / facility</td>
                  <td>500 m – 2 km</td>
                  <td>Employee check-in</td>
                </tr>
                <tr>
                  <td className="font-medium">City-level targeting</td>
                  <td>5–25 km</td>
                  <td>Regional marketing</td>
                </tr>
                <tr>
                  <td className="font-medium">Compliance / regulatory</td>
                  <td>Varies</td>
                  <td>E.g., 150 air-mile radius for trucking</td>
                </tr>
              </tbody>
            </table>
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
                Can I use this tool for actual geofencing?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                This tool is for visualization and planning. To create a functioning geofence that
                triggers events on devices, you need a geofencing SDK or platform integrated into a
                mobile app.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What file format should I export for geofencing platforms?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                KML is the most widely supported format for geographic data. Most geofencing
                platforms and GIS tools can import KML files. Export your radius from our tool and
                import it into your development environment.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the minimum geofence size that works reliably?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                For GPS-based geofencing, 100 meters is generally the minimum for reliable
                triggering. Smaller geofences can work with Bluetooth beacons or Wi-Fi positioning.
                Urban areas with tall buildings may require larger geofences due to GPS signal
                interference.
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
                    name: 'Can I use this tool for actual geofencing?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'This tool is for visualization and planning. To create a functioning geofence that triggers events on devices, you need a geofencing SDK or platform integrated into a mobile app.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What file format should I export for geofencing platforms?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'KML is the most widely supported format for geographic data. Most geofencing platforms and GIS tools can import KML files.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the minimum geofence size that works reliably?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'For GPS-based geofencing, 100 meters is generally the minimum for reliable triggering. Smaller geofences can work with Bluetooth beacons or Wi-Fi positioning.',
                    },
                  },
                ],
              }),
            }}
          />
        </section>

        {/* Try Map With Radius CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Plan Your Geofence</h2>
          <p className="text-slate-300 mb-6">
            Use our free radius tool to visualize and plan geofence boundaries. Export as KML.
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
            <Link href="/drive-time-map" className="content-link">
              Drive time map &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
