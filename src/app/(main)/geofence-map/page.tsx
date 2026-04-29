import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Geofence Map Tool — Create a Radius Geofence (Free)',
  description:
    'What is a geofence and how to visualize one on a map. Plan geofence boundaries with our free radius tool, then export KML for your geofencing platform.',
  alternates: {
    canonical: '/geofence-map',
  },
  keywords: ['geofence map tool', 'google map geofencing', 'geofence radius', 'create geofence'],
  openGraph: {
    title: 'Geofence Map Tool — Create a Radius Geofence (Free)',
    description:
      'What is a geofence and how to visualize one on a map. Plan geofence boundaries with our free radius tool, then export KML for your geofencing platform.',
    url: 'https://mapwithradius.com/geofence-map',
    images: OG_IMAGES,
  },
};

// Dynamic import for the map wrapper (client-side only)
const RadiusMapWrapper = dynamic(() => import('@/components/map/RadiusMapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 h-[500px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

export default function GeofenceMapPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Geofence Map Tool',
            description:
              'Plan a geofence visually, then export as KML or extract the coordinates for Radar, Google Geofencing API, Braze, or any geofencing platform.',
            url: 'https://mapwithradius.com/geofence-map',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Visualize circle geofences on an interactive map',
              'Adjust radius from meters to hundreds of kilometers',
              'Export as KML for Radar.io, Google Earth, QGIS',
              'Export as PNG for design mocks and documentation',
              'Shareable URL with encoded coordinates',
              'WGS84 coordinate datum — universal standard',
              'No tracking cookies, GDPR compliant by design',
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Geofence Map Tool',
            description:
              'What is a geofence and how to visualize one on a map. Plan geofence boundaries with our free radius tool, then export KML for your geofencing platform.',
            url: 'https://mapwithradius.com/geofence-map',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mapwithradius.com' },
              { '@type': 'ListItem', position: 2, name: 'Geofence Map', item: 'https://mapwithradius.com/geofence-map' },
            ],
          }),
        }}
      />

      {/* Hero Section with Tool */}
      <section className="bg-slate-50">
        {/* Hero header band */}
        <div className="bg-primary-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Geofence Map Tool</h1>
            <p className="text-slate-300">
              Plan a geofence visually, then export as KML or extract the coordinates for Radar, Google Geofencing API, Braze, or any geofencing platform.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
          <RadiusMapWrapper defaultUnit="kilometers" />
        </div>
      </section>

      {/* Section B — Plan a Geofence in Under 60 Seconds */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Plan a Geofence in Under 60 Seconds</h2>
          <p className="text-slate-700 mb-6">
            Geofence planning doesn&apos;t need to happen inside your app&apos;s SDK. Design the boundary here first — where it sits, how large it should be, what it should cover — then export the coordinates to your production geofencing platform. This separates the planning step from the implementation step, which is usually how product and engineering teams collaborate.
          </p>
          <ol className="space-y-4 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">1</span>
              <span>Search for the center point. Type the address, postal code, or landmark at the center of your geofence. Address search works globally — city, street, or coordinates all work.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">2</span>
              <span>Set your radius in kilometers. Common sizes: 500 m for a single store, 2 km for a neighborhood campaign, 10 km for a metro-level trigger, 50 km for a regional event.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">3</span>
              <span>Position and resize. Drag the center pin to fine-tune placement. Adjust the radius field or drag the circle edge. The boundary updates in real time.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">4</span>
              <span>Export. Click Export KML to download a file ready for Radar.io, Google Earth, QGIS, or any tool that accepts KML. Use Export PNG for design mocks or documentation.</span>
            </li>
          </ol>
          <p className="text-slate-600 text-sm mt-6">
            The exported KML uses standard WGS84 coordinates, which is what all major geofencing platforms expect. No coordinate conversion needed.
          </p>
        </div>
      </section>

      {/* Sections C, D, E — What Is / How It Works / Circle vs Polygon */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section C — What Is a Geofence? */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">What Is a Geofence?</h2>
            <p className="text-slate-700 mb-4">
              A geofence is a virtual boundary around a real-world location. When a mobile device (or any GPS-equipped asset) enters, exits, or dwells inside the boundary, software triggers an event — a push notification, a database update, a workflow step, an analytics log.
            </p>
            <p className="text-slate-700 mb-4">
              Circle geofences are the most common type. They&apos;re defined by a center point (latitude and longitude) and a radius measured in meters or kilometers. Polygon geofences — which trace an arbitrary shape — are supported by most major platforms but require more work to author.
            </p>
            <p className="text-slate-700 mb-4">
              Geofences are enforced in two ways. On-device geofences live inside a mobile SDK and trigger events locally when the device crosses the boundary. Server-side geofences query the user&apos;s reported location against a stored boundary on your backend. The first is more efficient for battery; the second is more flexible for complex logic.
            </p>
            <p className="text-slate-700">
              Geofencing is widely used in retail proximity marketing, fleet management, workforce clock-in automation, asset tracking, and compliance zones.
            </p>
          </div>

          {/* Section D — How Geofencing Works Under the Hood */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How Geofencing Works Under the Hood</h2>
            <p className="text-slate-700 mb-4">
              Three things happen when a geofence triggers an event: the device determines its location, the system compares that location to the boundary, and software executes a response.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Location sources.</strong> Most geofences rely on GPS when outdoors. Indoors or in dense urban areas (where GPS signal reflects off buildings), systems fall back to Wi-Fi positioning, cellular triangulation, or Bluetooth beacons for sub-meter accuracy. Accuracy ranges from under 5 meters in ideal GPS conditions to 50+ meters in urban canyons.
            </p>
            <p className="text-slate-700 mb-2">
              <strong>Trigger types.</strong> Platforms distinguish three event types:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 mb-4 ml-4">
              <li><strong>Entry:</strong> fires when the device crosses the boundary into the geofence.</li>
              <li><strong>Exit:</strong> fires when it crosses the boundary going out.</li>
              <li><strong>Dwell:</strong> fires when the device has stayed inside the boundary for a specified time (usually 1–30 minutes).</li>
            </ul>
            <p className="text-slate-700 mb-4">
              Dwell events are the quiet workhorse of geofencing. Retail attribution, workforce clock-in, and anti-fraud systems all depend on dwell rather than raw entry, because a drive-by crossing at 80 km/h is noise, not signal.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Battery impact.</strong> Circle geofences on iOS and Android run at the OS level, which means they&apos;re battery-efficient — the radio doesn&apos;t have to poll GPS constantly. Polygon geofences, custom triggers, and high-frequency proximity queries run at the application level and drain the battery faster.
            </p>
            <p className="text-slate-700">
              <strong>Platform limits.</strong> iOS caps apps at 20 active geofences per app. Android allows 100 per app. Most production systems get around this with dynamic geofence loading — swapping active fences based on current location — but this adds complexity.
            </p>
          </div>

          {/* Section E — Geofence Types: Circle vs Polygon */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Geofence Types: Circle vs Polygon</h2>
            <p className="text-slate-700 mb-4">
              Most geofences are circles. They&apos;re simple to author (one point, one distance), efficient to evaluate (is this GPS coordinate inside this radius?), and supported natively by every major SDK. They work well when the triggering zone is symmetric — a store location, a stadium, a workplace.
            </p>
            <p className="text-slate-700 mb-4">
              Polygon geofences trace an arbitrary shape. They&apos;re the right choice when the boundary follows a real-world feature: a city-center district, a shopping mall&apos;s actual footprint, a warehouse perimeter, a park. Polygons take more work to author (you draw each vertex) and cost more CPU to evaluate, but they eliminate the dead zones and false positives that circles produce in irregular spaces.
            </p>
            <p className="text-slate-700 mb-4">
              Our tool produces circle geofences. For polygon planning, you&apos;ll want a dedicated GIS editor like QGIS or a purpose-built tool like geojson.io. We export KML, which both tools accept.
            </p>
            <p className="text-slate-700">
              Practical rule: start with a circle. 80% of geofencing use cases are well-served by a well-placed circle. Upgrade to polygon only when the circle produces obvious false triggers at the boundary or misses obvious real-world zones.
            </p>
          </div>
        </div>
      </section>

      {/* Section F — Geofencing Platforms Comparison */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Geofencing Platforms Comparison</h2>
          <p className="text-slate-700 mb-6">
            If you&apos;ve planned your geofence here, your next step is implementing it in a production platform. Below is how the major geofencing platforms compare on the dimensions that matter for most teams.
          </p>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Type</th>
                  <th>Geofence Limit</th>
                  <th>Polygon Support</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Radar.io</td>
                  <td>Standalone SaaS</td>
                  <td>Unlimited (paid plans)</td>
                  <td>Yes</td>
                  <td>Product teams wanting a managed geofencing layer without SDK overhead</td>
                </tr>
                <tr>
                  <td className="font-medium">Google Geofencing API</td>
                  <td>Mobile SDK (Android)</td>
                  <td>100 per app</td>
                  <td>Circle only (native); polygon via server</td>
                  <td>Android-only apps, cost-sensitive teams (free with Google Play Services)</td>
                </tr>
                <tr>
                  <td className="font-medium">Apple Core Location</td>
                  <td>Mobile SDK (iOS)</td>
                  <td>20 per app</td>
                  <td>Circle only</td>
                  <td>iOS-native apps; hard limit forces dynamic geofence management</td>
                </tr>
                <tr>
                  <td className="font-medium">PlotProjects</td>
                  <td>Marketing platform</td>
                  <td>Plan-based</td>
                  <td>Yes</td>
                  <td>Marketing teams running proximity campaigns at scale</td>
                </tr>
                <tr>
                  <td className="font-medium">Braze</td>
                  <td>Customer engagement</td>
                  <td>Plan-based</td>
                  <td>Yes</td>
                  <td>Consumer brands with existing Braze messaging infrastructure</td>
                </tr>
                <tr>
                  <td className="font-medium">OneSignal</td>
                  <td>Push notifications</td>
                  <td>Paid tier</td>
                  <td>Limited</td>
                  <td>SMB teams wanting geofenced push without a dedicated location stack</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Limits and features change frequently — verify each platform&apos;s current docs before committing. This comparison reflects publicly documented capabilities as of early 2026.
          </p>
        </div>
      </section>

      {/* Section G — Common Geofence Sizes and Use Cases */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Common Geofence Sizes and Use Cases</h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Radius</th>
                  <th>Area Covered</th>
                  <th>Typical Use</th>
                  <th>Business Scenarios</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">100 m</td>
                  <td>0.03 km²</td>
                  <td>Single storefront or venue</td>
                  <td>In-store proximity offers, loyalty check-ins, foot-traffic counting</td>
                </tr>
                <tr>
                  <td className="font-medium">500 m</td>
                  <td>0.78 km²</td>
                  <td>City block or shopping center</td>
                  <td>Mall-level retargeting, event venue entry triggers</td>
                </tr>
                <tr>
                  <td className="font-medium">1 km</td>
                  <td>3.14 km²</td>
                  <td>Small neighborhood</td>
                  <td>Competitor conquesting (e.g. targeting shoppers near a rival store), hyper-local delivery zones</td>
                </tr>
                <tr>
                  <td className="font-medium">2 km</td>
                  <td>12.6 km²</td>
                  <td>Urban district</td>
                  <td>Walkable commute zone campaigns, university campus coverage</td>
                </tr>
                <tr>
                  <td className="font-medium">5 km</td>
                  <td>78.5 km²</td>
                  <td>Small city or metro core</td>
                  <td>Ride-share driver deployment zones, local news alerts</td>
                </tr>
                <tr>
                  <td className="font-medium">10 km</td>
                  <td>314 km²</td>
                  <td>Urban metro area</td>
                  <td>Fleet dispatch zones, regional retail attribution</td>
                </tr>
                <tr>
                  <td className="font-medium">25 km</td>
                  <td>1,963 km²</td>
                  <td>Metropolitan region</td>
                  <td>Sales territory boundaries, weather alerts</td>
                </tr>
                <tr>
                  <td className="font-medium">50 km</td>
                  <td>7,854 km²</td>
                  <td>State-level coverage</td>
                  <td>Regional distribution, franchise territory enforcement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section H — Accuracy, Privacy, and Platform Limitations */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Accuracy, Privacy, and Platform Limitations</h2>
          <p className="text-slate-700 mb-4">
            Honest caveats for anyone implementing geofencing in production:
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Accuracy isn&apos;t uniform.</strong> Outdoor GPS typically gets you within 5–10 meters. Urban canyons and dense cities can drift to 20–50 meters. Indoor accuracy without Wi-Fi positioning is unreliable — often 50 meters or worse. Plan your geofence boundary with the worst-case drift in mind, or you&apos;ll get false triggers at the edges.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Small geofences are noisy.</strong> Radii under 100 meters frequently produce false positives (users triggered who weren&apos;t actually in the zone) and false negatives (users missed who were). For critical use cases — compliance, payments, clock-in — use 200 meters minimum and supplement with secondary signals.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Privacy regulations apply.</strong> In the EU, geofencing that stores or transmits user location data falls under GDPR. In California, CCPA applies. In both jurisdictions, you need explicit consent, a data retention policy, and a way for users to opt out. Platform SDKs handle the mechanics, but the policy and consent UI are your responsibility.
          </p>
          <p className="text-slate-700">
            <strong>Platform limits bite at scale.</strong> iOS allows 20 geofences per app — hard limit. Android allows 100. Production apps that need more use dynamic geofence loading: activate the 20 closest to the user, swap them as the user moves. This is non-trivial to implement.
          </p>
        </div>
      </section>

      {/* Section I — FAQ */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                How do I export my geofence to my platform?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Click Export KML in the tool controls and you&apos;ll download a .kml file containing your geofence&apos;s center coordinates and radius. For platforms that accept KML import directly — Radar.io dashboard, Google Earth, QGIS — upload the file as-is. For SDK-based platforms like Google Geofencing API (Android) or Apple Core Location (iOS), open the KML in a text editor, grab the latitude, longitude, and radius values, and pass them to your SDK&apos;s geofence constructor. The coordinates are in WGS84 datum, which every major platform uses.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the difference between a geofence and a radius map?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                A radius map is a visualization. A geofence is an enforceable boundary tied to a software event. This tool draws the visualization — you use it to plan and communicate a boundary before implementing it. The geofence itself — the thing that actually triggers notifications or workflow events — lives inside your mobile SDK or geofencing platform, not here.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use this tool for polygon geofences?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. This tool draws circular geofences only (center point plus radius). For polygon planning, use geojson.io for quick shapes or QGIS for precision work — both are free. Most geofencing platforms accept both circle and polygon geofences, so you can mix shapes in production. Start with circles where possible; they&apos;re simpler to author and cheaper to evaluate at runtime.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How accurate is the planning here vs. what my platform will enforce?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                You can draw to sub-meter precision here, but real-world GPS triggers within a 5–10 meter drift window outdoors, and 20–50 meters in dense urban areas. Indoors without Wi-Fi positioning, accuracy falls off entirely. Rule of thumb: draw your geofence with at least 100 meters of margin for reliable triggering, and don&apos;t design sub-100-meter geofences for critical use cases — they produce too many false positives and negatives on consumer GPS.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this tool send my geofence data anywhere?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. Everything happens in your browser. The coordinates and radius are encoded in the URL when you share a link — nothing is sent to our servers or stored anywhere. We use OpenStreetMap tiles, so no data goes to Google either. GDPR and CCPA compliant by design.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What file format does the export use?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                KML (Keyhole Markup Language) for geographic data and PNG for design mocks. KML is directly supported by Google Earth, QGIS, ArcGIS, Radar.io, and most geospatial tools. GeoJSON is an emerging alternative preferred by some modern platforms — if your target tool requires GeoJSON, any online KML-to-GeoJSON converter (like mapshaper.org) handles the conversion in seconds. All exports use the WGS84 coordinate datum, the universal standard for consumer GPS and every major geofencing platform.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I plan multiple geofences at once?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Not in the current tool — it draws one geofence at a time. For multi-geofence planning, the common pattern is to plan each one separately, export each to KML, then merge the KML files (they&apos;re just XML) or import them one by one into your target platform. For complex multi-zone planning, a full GIS editor like QGIS is better suited.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Why does my geofence look distorted on the world map?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The map uses Web Mercator projection, which stretches areas near the poles. A 100 km radius circle drawn in Stockholm looks much larger than the same radius drawn in Nairobi, even though they cover identical ground distance. This is a visual artifact of the flat-map projection, not a calculation error — the underlying radius value and the geofence boundary your platform enforces are identical regardless of where you place it.
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
                    name: 'How do I export my geofence to my platform?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Click Export KML in the tool controls and you'll download a .kml file containing your geofence's center coordinates and radius. For platforms that accept KML import directly — Radar.io dashboard, Google Earth, QGIS — upload the file as-is. For SDK-based platforms like Google Geofencing API (Android) or Apple Core Location (iOS), open the KML in a text editor, grab the latitude, longitude, and radius values, and pass them to your SDK's geofence constructor. The coordinates are in WGS84 datum, which every major platform uses.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the difference between a geofence and a radius map?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A radius map is a visualization. A geofence is an enforceable boundary tied to a software event. This tool draws the visualization — you use it to plan and communicate a boundary before implementing it. The geofence itself — the thing that actually triggers notifications or workflow events — lives inside your mobile SDK or geofencing platform, not here.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use this tool for polygon geofences?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "No. This tool draws circular geofences only (center point plus radius). For polygon planning, use geojson.io for quick shapes or QGIS for precision work — both are free. Most geofencing platforms accept both circle and polygon geofences, so you can mix shapes in production. Start with circles where possible; they're simpler to author and cheaper to evaluate at runtime.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How accurate is the planning here vs. what my platform will enforce?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "You can draw to sub-meter precision here, but real-world GPS triggers within a 5–10 meter drift window outdoors, and 20–50 meters in dense urban areas. Indoors without Wi-Fi positioning, accuracy falls off entirely. Rule of thumb: draw your geofence with at least 100 meters of margin for reliable triggering, and don't design sub-100-meter geofences for critical use cases — they produce too many false positives and negatives on consumer GPS.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this tool send my geofence data anywhere?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. Everything happens in your browser. The coordinates and radius are encoded in the URL when you share a link — nothing is sent to our servers or stored anywhere. We use OpenStreetMap tiles, so no data goes to Google either. GDPR and CCPA compliant by design.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What file format does the export use?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'KML (Keyhole Markup Language) for geographic data and PNG for design mocks. KML is directly supported by Google Earth, QGIS, ArcGIS, Radar.io, and most geospatial tools. GeoJSON is an emerging alternative preferred by some modern platforms — if your target tool requires GeoJSON, any online KML-to-GeoJSON converter (like mapshaper.org) handles the conversion in seconds. All exports use the WGS84 coordinate datum, the universal standard for consumer GPS and every major geofencing platform.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I plan multiple geofences at once?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Not in the current tool — it draws one geofence at a time. For multi-geofence planning, the common pattern is to plan each one separately, export each to KML, then merge the KML files (they're just XML) or import them one by one into your target platform. For complex multi-zone planning, a full GIS editor like QGIS is better suited.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why does my geofence look distorted on the world map?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The map uses Web Mercator projection, which stretches areas near the poles. A 100 km radius circle drawn in Stockholm looks much larger than the same radius drawn in Nairobi, even though they cover identical ground distance. This is a visual artifact of the flat-map projection, not a calculation error — the underlying radius value and the geofence boundary your platform enforces are identical regardless of where you place it.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* Section J — Related Tools */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Main Radius Map Tool</h3>
              </div>
              <p className="text-sm text-slate-600">Draw circles on any map by distance</p>
            </Link>

            <Link href="/drive-time-map" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Drive Time Map</h3>
              </div>
              <p className="text-sm text-slate-600">Isochrone maps by travel time</p>
            </Link>

            <Link href="/km-radius-map" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">KM Radius Map</h3>
              </div>
              <p className="text-sm text-slate-600">Metric distance circles</p>
            </Link>

            <Link href="/distance-calculator" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Distance Calculator</h3>
              </div>
              <p className="text-sm text-slate-600">Measure between two points</p>
            </Link>

            <Link href="/walking-radius-map" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Walking Radius Map</h3>
              </div>
              <p className="text-sm text-slate-600">Walking and cycling radius tool</p>
            </Link>

            <Link href="/zip-code-radius" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Zip Code Radius</h3>
              </div>
              <p className="text-sm text-slate-600">Find zip codes within range</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
