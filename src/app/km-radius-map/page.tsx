import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KM Radius Map — Draw a Kilometer Radius Circle on a Map (Free)',
  description: 'Draw a radius in kilometers on any map. Free metric radius tool — enter an address and distance in km. No signup, no limits.',
  keywords: ['km radius map', 'kilometer radius tool', '5 km radius from me', '10 km radius map', 'metric radius', 'radius map europe', 'radius map australia'],
  openGraph: {
    title: 'KM Radius Map — Draw a Kilometer Radius Circle on a Map (Free)',
    description: 'Draw a radius in kilometers on any map. Free metric radius tool — enter an address and distance in km.',
    url: 'https://mapwithradius.com/km-radius-map',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Draw a Kilometer Radius on a Map',
            description: 'Step-by-step guide to drawing a radius circle in kilometers on any map.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Enter your location',
                text: 'Search for an address, city, or postal code. Or click directly on the map.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Set your radius in kilometers',
                text: 'Enter the distance in kilometers using the radius input or quick presets.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Adjust and export',
                text: 'Drag the circle to reposition. Export as PNG, KML, or copy a shareable link.',
              },
            ],
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
            <p className="text-slate-700 mb-4">
              This is the metric version of our{' '}
              <Link href="/" className="content-link">
                radius map tool
              </Link>
              . It defaults to kilometers for users who work in metric units — which is most of the world outside
              the United States and United Kingdom. All features are identical: address search, multiple circles,
              drag to resize, shareable links, and export.
            </p>
            <p className="text-slate-700">
              The tool supports addresses in any country and any language. Whether you&apos;re in Berlin, Sydney, Tokyo,
              or São Paulo, simply type your address and the search will find it. The map tiles come from OpenStreetMap,
              which has excellent coverage worldwide.
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

          {/* 5 Real-World Examples */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">5 Ways to Use a KM Radius Map</h2>
            <p className="text-slate-600 mb-6">
              Here are practical examples of how people use kilometer radius maps in their daily work and planning:
            </p>

            <div className="space-y-6">
              {/* Example 1 */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-slate-900 mb-2">1. Delivery Zone Planning (EU E-commerce)</h3>
                <p className="text-slate-600 mb-2">
                  An online grocery store in Amsterdam wants to offer same-day delivery. They draw a 15 km radius around
                  their warehouse to visualize which neighborhoods they can serve. The circle helps them see that they can
                  cover Haarlem (20 km away) but it would require expanding their delivery zone.
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-slate-700">Typical radius:</span>
                  <span className="text-slate-600"> 5-25 km for urban delivery, 50-100 km for regional</span>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-slate-900 mb-2">2. School Catchment Areas (Australia)</h3>
                <p className="text-slate-600 mb-2">
                  Parents in Melbourne use a 5 km radius around potential schools to see which suburbs fall within a
                  reasonable commute. Australian school zoning often follows distance-based rules, making radius maps
                  essential for families choosing where to live.
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-slate-700">Typical radius:</span>
                  <span className="text-slate-600"> 2-5 km for primary schools, 5-15 km for secondary</span>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-slate-900 mb-2">3. Emergency Response Planning (Germany)</h3>
                <p className="text-slate-600 mb-2">
                  Fire departments in Bavaria use radius maps to ensure all areas are within 10 km of a fire station —
                  the maximum distance for an effective emergency response. If a gap appears, it indicates where new
                  stations might be needed.
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-slate-700">Critical distances:</span>
                  <span className="text-slate-600"> 5 km (urban), 10 km (suburban), 15 km (rural)</span>
                </div>
              </div>

              {/* Example 4 */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-slate-900 mb-2">4. Running and Cycling Routes (France)</h3>
                <p className="text-slate-600 mb-2">
                  A runner in Lyon wants to find new 10K routes. By drawing a 5 km radius around their home (the furthest
                  point if running out and back), they can explore all the parks, trails, and paths within range on the
                  map before planning their route.
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-slate-700">Common running radii:</span>
                  <span className="text-slate-600"> 2.5 km (5K), 5 km (10K), 10 km (half marathon out-and-back)</span>
                </div>
              </div>

              {/* Example 5 */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-slate-900 mb-2">5. Retail Site Selection (Canada)</h3>
                <p className="text-slate-600 mb-2">
                  A franchise looking to open in Toronto draws 3 km radius circles around existing competitors to find
                  underserved areas. They also draw a 5 km radius around potential locations to estimate how many
                  potential customers live within a reasonable driving distance.
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                  <span className="font-medium text-slate-700">Retail trade areas:</span>
                  <span className="text-slate-600"> 1-3 km (convenience), 5-10 km (destination), 25+ km (specialty)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Common KM Radius Distances - Expanded */}
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
                    <th>Area Covered</th>
                    <th>Miles Equivalent</th>
                    <th>Common Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">1 km</td>
                    <td>3.14 km²</td>
                    <td>0.62 mi</td>
                    <td>Walking distance, neighborhood</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2 km</td>
                    <td>12.6 km²</td>
                    <td>1.24 mi</td>
                    <td>Cycling distance, school zones</td>
                  </tr>
                  <tr>
                    <td className="font-medium">5 km</td>
                    <td>78.5 km²</td>
                    <td>3.1 mi</td>
                    <td>Urban delivery, parkrun range</td>
                  </tr>
                  <tr>
                    <td className="font-medium">10 km</td>
                    <td>314 km²</td>
                    <td>6.2 mi</td>
                    <td>Commuting distance, service areas</td>
                  </tr>
                  <tr>
                    <td className="font-medium">15 km</td>
                    <td>707 km²</td>
                    <td>9.3 mi</td>
                    <td>Suburban coverage, emergency response</td>
                  </tr>
                  <tr>
                    <td className="font-medium">25 km</td>
                    <td>1,963 km²</td>
                    <td>15.5 mi</td>
                    <td>Regional retail, commuter rail</td>
                  </tr>
                  <tr>
                    <td className="font-medium">50 km</td>
                    <td>7,854 km²</td>
                    <td>31.1 mi</td>
                    <td>Day trip range, distribution zones</td>
                  </tr>
                  <tr>
                    <td className="font-medium">100 km</td>
                    <td>31,416 km²</td>
                    <td>62.1 mi</td>
                    <td>Sales territories, media markets</td>
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

          {/* Popular Kilometer Searches by Country */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Popular KM Radius Searches by Region</h2>
            <p className="text-slate-600 mb-4">
              Different regions have common radius distances based on local regulations, urban planning standards,
              and cultural norms:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">European Union</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>5 km:</strong> COVID lockdown limit (many countries)</li>
                  <li><strong>10 km:</strong> Air quality zones (Germany)</li>
                  <li><strong>20 km:</strong> GDPR &quot;local&quot; definition (case law)</li>
                  <li><strong>50 km:</strong> Cross-border commuter zone</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Australia</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>5 km:</strong> COVID lockdown limit (2020-2021)</li>
                  <li><strong>10 km:</strong> Urban growth boundary discussions</li>
                  <li><strong>25 km:</strong> Metropolitan planning area</li>
                  <li><strong>100 km:</strong> Regional development zone</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Canada</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>2 km:</strong> School catchment (typical)</li>
                  <li><strong>5 km:</strong> Walk Score &quot;walkable&quot; threshold</li>
                  <li><strong>25 km:</strong> Commuter rail coverage</li>
                  <li><strong>100 km:</strong> Census metropolitan area</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">United Kingdom</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>1.6 km (1 mi):</strong> &quot;15-minute neighborhood&quot;</li>
                  <li><strong>8 km:</strong> Average commute distance</li>
                  <li><strong>16 km (10 mi):</strong> Local area definition</li>
                  <li><strong>40 km:</strong> Travel-to-work area</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conversion Quick Reference */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">KM to Miles Quick Conversion</h2>
            <p className="text-slate-600 mb-4">
              If you need to communicate distances with colleagues in the US or UK, here&apos;s a quick reference:
            </p>
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1 km</div>
                  <div className="text-slate-600">≈ 0.62 mi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">5 km</div>
                  <div className="text-slate-600">≈ 3.1 mi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">10 km</div>
                  <div className="text-slate-600">≈ 6.2 mi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50 km</div>
                  <div className="text-slate-600">≈ 31 mi</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Quick formula: Multiply km by 0.62 to get miles, or divide km by 1.6
              </p>
            </div>
          </div>

          {/* How to Use This Tool */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How to Draw a KM Radius</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Enter your location</h3>
                  <p className="text-slate-600">
                    Type any address, city name, or postal code in the search box. The tool works in any country and
                    any language — try &quot;Paris&quot;, &quot;東京&quot;, or &quot;São Paulo&quot;.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Set your radius in kilometers</h3>
                  <p className="text-slate-600">
                    Use the radius input field or click a quick preset (1, 5, 10, 50, or 100 km). The circle updates
                    instantly as you type.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Drag to fine-tune</h3>
                  <p className="text-slate-600">
                    Drag the center marker to move the circle. Drag the edge marker to resize. The radius display
                    updates in real-time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Add more circles (optional)</h3>
                  <p className="text-slate-600">
                    Click &quot;Add Circle&quot; to draw multiple radius circles on the same map. Each can have a different
                    center, radius, and color.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Share or export</h3>
                  <p className="text-slate-600">
                    Copy a shareable link, download a PNG image, or export to KML for use in Google Earth or other
                    GIS software.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Expanded */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Is this different from the main radius tool?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No — it&apos;s the same tool with kilometers as the default unit. You can switch to miles, meters,
                or feet at any time using the unit dropdown. This page simply starts in kilometers for convenience.
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
                How accurate is the radius measurement?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The radius is calculated using the Haversine formula, which accounts for Earth&apos;s curvature. This
                gives you geodesic accuracy — the circle represents true surface distance, not Euclidean (flat)
                distance. For radii under 500 km, the accuracy is within a few meters.
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
                10 km travel limits. The radius shows straight-line (&quot;as the crow flies&quot;) distance, which is
                typically how these regulations were defined.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the maximum radius I can draw?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                There&apos;s no hard limit, but the map works best for radii up to about 1,000 km. Beyond that, the
                Web Mercator projection used by the map introduces visible distortion. For continental-scale
                distances, consider using GIS software with a different projection.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I export the circle to Google Earth?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Click the &quot;KML&quot; button to download a KML file. This file can be opened in Google Earth,
                Google My Maps, QGIS, ArcGIS, and most other GIS or mapping software. The circle will appear
                exactly as it does here.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does the radius represent driving distance?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No — this shows straight-line distance. Driving distance is typically 20-40% longer due to road
                networks. If you need to see how far you can drive in a certain time, use our{' '}
                <Link href="/drive-time-map" className="text-accent hover:underline">drive time map</Link> instead,
                which calculates actual travel distance along roads.
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
                    name: 'Is this different from the main radius tool?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "No — it's the same tool with kilometers as the default unit. You can switch to miles, meters, or feet at any time using the unit dropdown.",
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
                    name: 'How accurate is the radius measurement?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The radius is calculated using the Haversine formula, which accounts for Earth's curvature. For radii under 500 km, the accuracy is within a few meters.",
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
                    name: "What's the maximum radius I can draw?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "There's no hard limit, but the map works best for radii up to about 1,000 km. Beyond that, map projection distortion becomes visible.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I export the circle to Google Earth?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Yes. Click the 'KML' button to download a KML file that can be opened in Google Earth, Google My Maps, QGIS, ArcGIS, and most other mapping software.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does the radius represent driving distance?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "No — this shows straight-line distance. Driving distance is typically 20-40% longer. Use the drive time map for actual road distances.",
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

      {/* More Tools Section */}
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">More Map Tools</h2>
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
