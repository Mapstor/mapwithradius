import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'KM Radius Map — Free Metric Radius Tool',
  description: 'Draw a radius in kilometers on any map. Free metric radius tool — enter an address and distance in km. No signup, no limits.',
  alternates: {
    canonical: '/km-radius-map',
  },
  keywords: ['km radius map', 'kilometer radius tool', '5 km radius from me', '10 km radius map', 'metric radius', 'radius map europe', 'radius map australia'],
  openGraph: {
    title: 'KM Radius Map — Draw a Kilometer Radius Circle on a Map (Free)',
    description: 'Draw a radius in kilometers on any map. Free metric radius tool — enter an address and distance in km.',
    url: 'https://mapwithradius.com/km-radius-map',
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

export default function KMRadiusMapPage() {
  return (
    <>
      {/* JSON-LD Schema */}
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
                name: 'KM Radius Map',
                item: 'https://mapwithradius.com/km-radius-map',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'KM Radius Map',
            description: 'Draw a radius in kilometers on any map. Free metric radius tool.',
            url: 'https://mapwithradius.com/km-radius-map',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Hero Section with Tool */}
      <section className="bg-slate-50">
        {/* Hero header band */}
        <div className="bg-primary-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">KM Radius Map</h1>
            <p className="text-slate-300">
              Draw a radius in kilometers on any map. Metric-first for users outside the US and UK.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
          <RadiusMapWrapper defaultUnit="kilometers" />
        </div>
      </section>

      {/* Content Below the Fold */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Radius Map in Kilometers */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Radius Map in Kilometers</h2>
            <p className="text-slate-700">
              Draw a kilometer-radius circle on any map worldwide. This tool is built for metric-system users — Europeans, Australians, Canadians, and anyone outside the US or UK who thinks in kilometers rather than miles. Enter an address in any language, set a distance in km, and the circle appears instantly. Address search works globally; the map tiles and geocoding cover every country.
            </p>
          </div>

          {/* Why Kilometers Matter */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Why Kilometers Are the Global Standard</h2>
            <p className="text-slate-700 mb-4">
              Over 95% of the world&apos;s population lives in countries that use the metric system. Only three countries
              — the United States, Liberia, and Myanmar — officially use miles as their primary unit of distance.
            </p>

            {/* Visual chart showing metric adoption */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Global Distance Unit Usage</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Metric (kilometers)</span>
                    <span className="font-medium text-slate-900">95.5%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '95.5%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Imperial (miles)</span>
                    <span className="font-medium text-slate-900">4.5%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '4.5%' }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">Based on country population and official measurement systems</p>
            </div>

            <p className="text-slate-700">
              This tool is designed for users in Europe, Australia, Canada, Asia, Africa, and South America — anywhere
              the metric system is standard. If you need miles,{' '}
              <Link href="/" className="content-link">switch to the miles version</Link>.
            </p>
          </div>

          {/* How Different Regions Use KM Radius Maps */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How Different Regions Use KM Radius Maps</h2>
            <p className="text-slate-600 mb-6">
              Distance conventions vary by country and regulatory regime. Below are the kilometer radii that appear most
              often in local planning, compliance, and everyday use:
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">EU (European Union)</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>5 km:</strong> COVID-era lockdown travel limits (many countries); still referenced in mobility studies</li>
                  <li><strong>10 km:</strong> Air quality enforcement zones in major German cities (Umweltzone)</li>
                  <li><strong>50 km:</strong> Cross-border commuter tax-relief eligibility in several EU states</li>
                  <li><strong>150 km:</strong> EU short-haul flight ban threshold being debated in France and Austria</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">United Kingdom</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>1.6 km (1 mile):</strong> &ldquo;15-minute neighborhood&rdquo; planning threshold</li>
                  <li><strong>8 km:</strong> Average UK commute distance (ONS 2024 data)</li>
                  <li><strong>40 km (25 mi):</strong> Travel-to-work area definition (UK ONS)</li>
                  <li><strong>100 km:</strong> London Low Emission Zone outer reference</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Australia</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>5 km:</strong> COVID lockdown limit (Victoria 2020&ndash;2021, widely referenced in property searches)</li>
                  <li><strong>10 km:</strong> Typical school zone radius in metro areas</li>
                  <li><strong>25 km:</strong> Metropolitan planning zone (Sydney, Melbourne)</li>
                  <li><strong>100 km:</strong> Regional development boundary for grant eligibility</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Canada</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>2 km:</strong> Walk Score &ldquo;walkable neighborhood&rdquo; threshold</li>
                  <li><strong>5 km:</strong> Common school catchment area</li>
                  <li><strong>25 km:</strong> Commuter rail service area (GO Transit, AMT)</li>
                  <li><strong>100 km:</strong> Statistics Canada metropolitan area definition</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Germany</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>10 km:</strong> Fire department response radius standard</li>
                  <li><strong>20 km:</strong> Rural medical coverage obligation</li>
                  <li><strong>50 km:</strong> Pendlerpauschale (commuter tax allowance) effective range</li>
                  <li><strong>500 km:</strong> High-speed rail &ldquo;short-haul&rdquo; definition</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Japan</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>500 m:</strong> Standard station walking radius for property listings</li>
                  <li><strong>2 km:</strong> School walking zone (tsugakku)</li>
                  <li><strong>30 km:</strong> Tokyo 23-ku outer boundary approximation</li>
                  <li><strong>100 km:</strong> Shinkansen station coverage threshold</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common KM Radius Distances - with Real-World Equivalent column */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Common Kilometer Radius Reference</h2>
            <p className="text-slate-600 mb-4">
              Use this table to understand what different kilometer radii look like in practice:
            </p>
            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Radius</th>
                    <th>Area</th>
                    <th>Real-World Equivalent</th>
                    <th>Common Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">1 km</td>
                    <td>3.14 km²</td>
                    <td>10&ndash;12 city blocks in a grid layout</td>
                    <td>Walking distance, neighborhood scale</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2 km</td>
                    <td>12.6 km²</td>
                    <td>Central Paris within the 6th arrondissement</td>
                    <td>Cycling radius, primary school zones</td>
                  </tr>
                  <tr>
                    <td className="font-medium">5 km</td>
                    <td>78.5 km²</td>
                    <td>From Central Park&apos;s south end to Battery Park</td>
                    <td>Urban delivery, parkrun coverage</td>
                  </tr>
                  <tr>
                    <td className="font-medium">10 km</td>
                    <td>314 km²</td>
                    <td>Diameter of central Paris within the Périphérique</td>
                    <td>Daily commuting zone, metro service area</td>
                  </tr>
                  <tr>
                    <td className="font-medium">15 km</td>
                    <td>707 km²</td>
                    <td>Central Barcelona plus inner suburbs</td>
                    <td>Emergency response, suburban coverage</td>
                  </tr>
                  <tr>
                    <td className="font-medium">25 km</td>
                    <td>1,963 km²</td>
                    <td>Roughly the area of Hong Kong Island region</td>
                    <td>Regional retail catchment, commuter rail</td>
                  </tr>
                  <tr>
                    <td className="font-medium">50 km</td>
                    <td>7,854 km²</td>
                    <td>Half the distance London to Oxford</td>
                    <td>Day-trip range, regional distribution</td>
                  </tr>
                  <tr>
                    <td className="font-medium">100 km</td>
                    <td>31,416 km²</td>
                    <td>Roughly the area of Belgium</td>
                    <td>Sales territories, national media markets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Walking Time Equivalents */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How Far Is That? Walking Time Reference</h2>
            <p className="text-slate-600 mb-4">
              To put kilometer distances in perspective, here&apos;s how long it takes to walk each distance at an average
              pace of 5 km/h (a comfortable walking speed):
            </p>
            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Distance</th>
                    <th>Walking Time</th>
                    <th>Cycling Time (15 km/h)</th>
                    <th>Driving Time (City)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>500 m</td>
                    <td>6 minutes</td>
                    <td>2 minutes</td>
                    <td>2 minutes</td>
                  </tr>
                  <tr>
                    <td>1 km</td>
                    <td>12 minutes</td>
                    <td>4 minutes</td>
                    <td>3 minutes</td>
                  </tr>
                  <tr>
                    <td>2 km</td>
                    <td>24 minutes</td>
                    <td>8 minutes</td>
                    <td>5 minutes</td>
                  </tr>
                  <tr>
                    <td>5 km</td>
                    <td>60 minutes</td>
                    <td>20 minutes</td>
                    <td>12 minutes</td>
                  </tr>
                  <tr>
                    <td>10 km</td>
                    <td>2 hours</td>
                    <td>40 minutes</td>
                    <td>20-30 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Note: Actual travel times vary based on terrain, traffic, and route. For accurate travel time analysis,
              use our <Link href="/drive-time-map" className="content-link">drive time map</Link> or{' '}
              <Link href="/walking-radius-map" className="content-link">walking radius map</Link>.
            </p>
          </div>

          {/* Converting KM to Miles - compressed to H3 */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Converting KM to Miles</h3>
            <p className="text-slate-700 mb-4">
              If you need to communicate distances with US or UK colleagues, multiply kilometers by 0.62 to get miles, or divide by 1.6.
            </p>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-accent">1 km</div>
                  <div className="text-sm text-slate-600">≈ 0.62 mi</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">5 km</div>
                  <div className="text-sm text-slate-600">≈ 3.1 mi</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">10 km</div>
                  <div className="text-sm text-slate-600">≈ 6.2 mi</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">100 km</div>
                  <div className="text-sm text-slate-600">≈ 62 mi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Can I embed this tool in a European website? Is it GDPR compliant?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Map With Radius sets no tracking cookies, stores no personal data on our servers, and uses OpenStreetMap
                tiles rather than Google Maps — which means no user data is sent to Google when the map loads. The tool is
                GDPR-compliant out of the box. For embedding, you can link to any configuration via URL (coordinates and radius
                are encoded in the address), so your users don&apos;t leave your site until they click through.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does address search work outside the US?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. The search is powered by OpenStreetMap&apos;s Nominatim, which supports addresses worldwide in any
                language. You can search in German, Japanese, Arabic, or any other language — the system will find
                the location.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How accurate is a kilometer radius over long distances?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                For radii under 100 km, the circle is accurate to within a few meters using the Haversine formula. For larger
                radii (500 km or more), the Earth&apos;s curvature causes the drawn circle on a flat map to diverge slightly
                from a true geodesic circle — the visual shape will look oval on Web Mercator projection, but the underlying
                distance calculation remains correct. If you need true geodesic accuracy for aviation or maritime planning,
                consult a specialized GIS tool.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use this for COVID lockdown radius checks?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. This tool was heavily used during 2020-2021 lockdowns when many countries imposed 5 km or
                10 km travel limits. The radius shows straight-line (&ldquo;as the crow flies&rdquo;) distance, which is
                typically how these regulations were defined.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does the tool work in countries with slow internet or mobile data?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The map loads progressively — the tile requests are small (around 10 KB each) and the app works on 3G
                connections common in rural EU and developing markets. Once the map has loaded, drawing and adjusting
                the radius happens entirely in your browser with zero server round-trips, so a weak connection doesn&apos;t
                slow down the interaction.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I export the circle for use in local GIS software?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. The KML export works with Google Earth, QGIS (popular in EU academic and municipal GIS), ArcGIS, and
                Mapbox Studio. The PNG export is a flat image suitable for reports or presentations. Coordinates in the
                exported KML are in standard WGS84 — the same datum used by OpenStreetMap, Google Maps, and most national
                mapping agencies in Europe (including INSPIRE-compliant data).
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I switch between km and miles without losing my circle?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Changing the unit converts the radius value automatically — a 10 km circle becomes 6.2 miles when you
                toggle to imperial, and the visible circle on the map stays the same size. This is handy for sharing maps
                with US or UK colleagues without recreating the search.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Why does my circle look oval-shaped when I zoom out?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                This is due to the Web Mercator map projection, which distorts shapes and sizes increasingly as
                you move away from the equator. The circle is actually accurate on Earth&apos;s surface — it just
                appears distorted on the flat map. This effect is most noticeable for very large radii or at
                high latitudes.
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
                    name: 'Can I embed this tool in a European website? Is it GDPR compliant?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. Map With Radius sets no tracking cookies, stores no personal data on our servers, and uses OpenStreetMap tiles rather than Google Maps — which means no user data is sent to Google when the map loads. The tool is GDPR-compliant out of the box. For embedding, you can link to any configuration via URL (coordinates and radius are encoded in the address), so your users don't leave your site until they click through.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does address search work outside the US?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. The search is powered by OpenStreetMap's Nominatim, which supports addresses worldwide in any language.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How accurate is a kilometer radius over long distances?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "For radii under 100 km, the circle is accurate to within a few meters using the Haversine formula. For larger radii (500 km or more), the Earth's curvature causes the drawn circle on a flat map to diverge slightly from a true geodesic circle — the visual shape will look oval on Web Mercator projection, but the underlying distance calculation remains correct. If you need true geodesic accuracy for aviation or maritime planning, consult a specialized GIS tool.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use this for COVID lockdown radius checks?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. This tool was heavily used during 2020-2021 lockdowns when many countries imposed 5 km or 10 km travel limits.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does the tool work in countries with slow internet or mobile data?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The map loads progressively — the tile requests are small (around 10 KB each) and the app works on 3G connections common in rural EU and developing markets. Once the map has loaded, drawing and adjusting the radius happens entirely in your browser with zero server round-trips, so a weak connection doesn't slow down the interaction.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I export the circle for use in local GIS software?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. The KML export works with Google Earth, QGIS (popular in EU academic and municipal GIS), ArcGIS, and Mapbox Studio. The PNG export is a flat image suitable for reports or presentations. Coordinates in the exported KML are in standard WGS84 — the same datum used by OpenStreetMap, Google Maps, and most national mapping agencies in Europe (including INSPIRE-compliant data).",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I switch between km and miles without losing my circle?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. Changing the unit converts the radius value automatically — a 10 km circle becomes 6.2 miles when you toggle to imperial, and the visible circle on the map stays the same size. This is handy for sharing maps with US or UK colleagues without recreating the search.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why does my circle look oval-shaped when I zoom out?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "This is due to the Web Mercator map projection distortion. The circle is accurate on Earth's surface but appears distorted on the flat map.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Radius Map (Miles)</div>
              <div className="text-sm text-slate-600">Same tool with miles as default</div>
            </Link>
            <Link
              href="/drive-time-map"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">See how far you can drive in X minutes</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Calculate actual walking distances</div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Distance Calculator</div>
              <div className="text-sm text-slate-600">Measure between two points</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="section-gray py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool (miles)
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/drive-time-map" className="content-link">
              Drive time map &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
