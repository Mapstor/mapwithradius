import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
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

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Tool */}
      <section className="bg-slate-50">
        {/* Compact header band */}
        <div className="bg-primary-900 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-white">Radius Map Tool</h1>
              <p className="text-slate-400 text-sm hidden sm:block">
                Haversine-accurate circles on OpenStreetMap
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="hidden md:inline">WGS84 coordinates</span>
              <span className="hidden lg:inline">|</span>
              <span className="hidden lg:inline">Export KML/PNG</span>
            </div>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
          <RadiusMapWrapper defaultUnit="miles" />
        </div>
      </section>

      {/* Content Below the Fold */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How to Draw a Radius */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How to Draw a Radius on a Map</h2>
            <p className="text-slate-700 mb-6">Drawing a radius on a map takes three steps:</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="font-semibold text-slate-900 mb-2">Choose your center point</h3>
                <p className="text-slate-600 text-sm">
                  Type an address, city, or zip code in the search bar — or click &ldquo;Use My Location&rdquo; to center
                  the radius on your current GPS position.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="font-semibold text-slate-900 mb-2">Set your distance</h3>
                <p className="text-slate-600 text-sm">
                  Enter the radius distance and select your unit (miles, km, meters, or feet). Use quick presets for
                  common distances.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="font-semibold text-slate-900 mb-2">Adjust and share</h3>
                <p className="text-slate-600 text-sm">
                  Drag to reposition, resize by dragging the edge. Copy the shareable link so anyone can see your map.
                </p>
              </div>
            </div>

            <p className="text-slate-700 mt-6">
              <Link href="/radius-on-google-maps" className="content-link">
                Need to draw a radius on Google Maps specifically? Read our guide &rarr;
              </Link>
            </p>
          </div>

          {/* What Can You Do */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">What Can You Do With This Radius Map Tool?</h2>
            <p className="text-slate-700 mb-4">
              This tool draws a circle on a map at a specific distance from any point. That circle represents every
              location within that straight-line distance from your center point — also known as an &ldquo;as the crow
              flies&rdquo; radius.
            </p>

            <p className="text-slate-700 mb-4">Here are some common ways people use it:</p>

            <div className="space-y-4">
              <div className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">Check what&apos;s within a distance from you.</h3>
                <p className="text-slate-600">
                  Enter your home address, set a 10-mile radius, and see exactly how far 10 miles extends in every
                  direction. This helps with commute planning, understanding delivery zones, or answering &ldquo;how far is
                  10 miles from me?&rdquo; visually.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">Compare multiple locations.</h3>
                <p className="text-slate-600">
                  Add circles around two or more addresses to see where they overlap. Useful for finding a meeting
                  point, comparing service areas, or choosing between apartments based on proximity to work.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">Define a service or delivery area.</h3>
                <p className="text-slate-600">
                  Businesses use radius maps to establish coverage zones. Draw a 25-mile radius around your office to
                  define where you&apos;ll accept service calls, or set a 5 km radius for food delivery.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">Visualize specific distances.</h3>
                <p className="text-slate-600">
                  It&apos;s difficult to picture what &ldquo;50 miles&rdquo; actually looks like on a map. Drawing a radius makes it
                  immediately clear — you can see which cities, highways, and landmarks fall within that distance.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-semibold text-slate-900">Plan travel and relocation.</h3>
                <p className="text-slate-600">
                  Moving to a new city? Draw a radius around your workplace to see which neighborhoods are within a
                  comfortable commute distance. Pair this with our{' '}
                  <Link href="/drive-time-map" className="content-link">
                    drive time map tool
                  </Link>{' '}
                  for more accurate travel-time estimates.
                </p>
              </div>
            </div>

            <p className="text-slate-700 mt-6">
              <Link href="/zip-code-radius" className="content-link">
                Looking for radius by zip code? Use our zip code radius tool &rarr;
              </Link>
            </p>
          </div>

          {/* Radius Coverage Statistics - Visual Charts */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Radius Coverage: Area vs Distance</h2>
            <p className="text-slate-700 mb-6">
              Radius area grows exponentially with distance. Doubling the radius quadruples the area covered.
              This chart shows how quickly coverage expands.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Area Covered by Radius (in square miles)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">1 mile radius</span>
                    <span className="text-slate-600">3.14 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '1%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">5 mile radius</span>
                    <span className="text-slate-600">78.5 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '2.5%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">10 mile radius</span>
                    <span className="text-slate-600">314 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">25 mile radius</span>
                    <span className="text-slate-600">1,963 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">50 mile radius</span>
                    <span className="text-slate-600">7,854 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">100 mile radius</span>
                    <span className="text-slate-600">31,416 sq mi</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Formula: Area = π × radius². A 100-mile radius covers the same area as the state of South Carolina.
              </p>
            </div>
          </div>

          {/* Common Radius Use Cases by Industry */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Common Starting Radii by Use Case</h2>
            <p className="text-slate-700 mb-6">
              If you&apos;re not sure what radius to draw, these are rules of thumb people often
              start with for common tasks. They aren&apos;t industry standards — adjust to your
              actual location, traffic, and product before treating any of them as a real boundary.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Typical starting points</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">Food Delivery</span>
                    <span className="text-slate-600">3-5 miles</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">Retail Store Catchment</span>
                    <span className="text-slate-600">5-10 miles</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">Home Services (HVAC, Plumbing)</span>
                    <span className="text-slate-600">15-25 miles</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">Healthcare (Hospital Service Area)</span>
                    <span className="text-slate-600">25-50 miles</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">Regional Sales Territory</span>
                    <span className="text-slate-600">50-100 miles</span>
                  </div>
                  <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Radius Quick Reference Table - Gray Section */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading mb-6">Radius Quick Reference</h2>
            <p className="text-slate-700 mb-6">
              The table below shows common radius distances and what they typically cover. Use the presets in the tool
              above to draw any of these instantly.
            </p>

            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Radius</th>
                    <th>Approx. Area</th>
                    <th>Typical Coverage</th>
                    <th>Common Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 mile (1.6 km)</td>
                    <td>3.1 sq mi</td>
                    <td>A neighborhood</td>
                    <td>Walking distance, small delivery zones</td>
                  </tr>
                  <tr>
                    <td>5 miles (8 km)</td>
                    <td>78 sq mi</td>
                    <td>A city section</td>
                    <td>Commute radius, restaurant delivery</td>
                  </tr>
                  <tr>
                    <td>10 miles (16 km)</td>
                    <td>314 sq mi</td>
                    <td>A metro area</td>
                    <td>Service area, daily commute</td>
                  </tr>
                  <tr>
                    <td>25 miles (40 km)</td>
                    <td>1,963 sq mi</td>
                    <td>A region</td>
                    <td>Regional sales territory</td>
                  </tr>
                  <tr>
                    <td>50 miles (80 km)</td>
                    <td>7,854 sq mi</td>
                    <td>Multiple cities</td>
                    <td>Day trip planning, logistics</td>
                  </tr>
                  <tr>
                    <td>100 miles (161 km)</td>
                    <td>31,416 sq mi</td>
                    <td>A large region</td>
                    <td>Freight radius, weekend trips</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-500 text-sm mt-4">
              <em>
                Note: Area values assume a perfect circle. Actual reachable area depends on roads, terrain, and natural
                barriers. For real-world travel distances, use our{' '}
                <Link href="/drive-time-map" className="content-link">
                  drive time map
                </Link>{' '}
                instead.
              </em>
            </p>
          </div>

          {/* How This Tool Works */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How This Tool Works</h2>
            <p className="text-slate-700 mb-4">
              Map With Radius uses{' '}
              <a
                href="https://leafletjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Leaflet
              </a>
              , an open-source mapping library, with map tiles from{' '}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                OpenStreetMap
              </a>
              . Unlike tools that depend on Google Maps, this means:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>
                <strong className="text-slate-900">No usage limits.</strong> Google Maps API charges per load after a free tier. Our tool has no
                API costs, so there are no restrictions on how many circles you draw or how often you use it.
              </li>
              <li>
                <strong className="text-slate-900">No API key required.</strong> You don&apos;t need an account, API key, or any setup. Open the page
                and start drawing.
              </li>
              <li>
                <strong className="text-slate-900">Fast loading.</strong> Leaflet is lightweight (~40KB) compared to the Google Maps JavaScript
                API (~200KB+). The map loads faster, especially on mobile.
              </li>
              <li>
                <strong className="text-slate-900">Tool-side privacy.</strong> Map tiles come from OpenStreetMap, not Google Maps, so the map itself doesn&apos;t send your location or search queries to Google. (For analytics, ads, and EEA/UK consent, see our <Link href="/privacy" className="content-link">Privacy Policy</Link>.)
              </li>
            </ul>

            <p className="text-slate-700 mb-4">
              The radius circles are calculated using the{' '}
              <a
                href="https://en.wikipedia.org/wiki/Haversine_formula"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Haversine formula
              </a>
              , which accounts for the Earth&apos;s curvature. This means the circles are geographically accurate — a
              50-mile radius really is 50 miles from the center point in every direction.
            </p>

            <p className="text-slate-700">
              Address search is powered by{' '}
              <a
                href="https://nominatim.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                Nominatim
              </a>
              , OpenStreetMap&apos;s free geocoding service. It supports addresses, cities, zip/postal codes, landmarks, and
              coordinates.
            </p>
          </div>

        </div>
      </section>

      {/* Comparison Table - White Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading mb-6">What Map With Radius Includes</h2>

            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Map With Radius</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Map provider</td>
                    <td>OpenStreetMap (free)</td>
                  </tr>
                  <tr>
                    <td>Multiple circles</td>
                    <td className="text-green-600 font-medium">&#10003; Unlimited</td>
                  </tr>
                  <tr>
                    <td>Address search</td>
                    <td className="text-green-600 font-medium">&#10003; Full address, zip, city, landmark, or coordinates</td>
                  </tr>
                  <tr>
                    <td>Share via URL</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                  </tr>
                  <tr>
                    <td>Export KML</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                  </tr>
                  <tr>
                    <td>Export PNG</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                  </tr>
                  <tr>
                    <td>Mobile friendly</td>
                    <td className="text-green-600 font-medium">&#10003; Responsive, touch-optimised</td>
                  </tr>
                  <tr>
                    <td>Usage limits</td>
                    <td className="font-medium">None</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td className="font-medium">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-700 mt-6">
              <Link href="/alternatives/freemaptools" className="content-link">
                Detailed comparison: FreeMapTools alternative
              </Link>{' '}
              &middot;{' '}
              <Link href="/alternatives/mapdevelopers" className="content-link">
                MapDevelopers alternative
              </Link>
            </p>
          </div>

          {/* More Map Tools */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">More Map Tools</h2>
            <p className="text-slate-700 mb-4">
              Depending on what you need, one of our other tools might be a better fit:
            </p>

            <ul className="space-y-3 text-slate-600">
              <li>
                <Link href="/drive-time-map" className="content-link font-medium">
                  Drive Time Map
                </Link>{' '}
                — Shows how far you can actually drive (or walk, or cycle) in a given time. Uses real road data instead
                of straight-line distance.
              </li>
              <li>
                <Link href="/zip-code-radius" className="content-link font-medium">
                  Zip Code Radius
                </Link>{' '}
                — Enter a zip code and distance to find all zip codes within that radius. Returns a list you can
                export.
              </li>
              <li>
                <Link href="/km-radius-map" className="content-link font-medium">
                  KM Radius Map
                </Link>{' '}
                — Same tool, metric-first. Defaults to kilometers for users outside the US and UK.
              </li>
              <li>
                <Link href="/walking-radius-map" className="content-link font-medium">
                  Walking Radius Map
                </Link>{' '}
                — See how far you can walk or cycle in a set time. Shows realistic walking/biking areas based on actual
                roads and paths.
              </li>
              <li>
                <Link href="/distance-calculator" className="content-link font-medium">
                  Distance Calculator
                </Link>{' '}
                — Measure the straight-line or driving distance between any two points on a map.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* City Radius Maps Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">Try a Radius on a Popular City</h2>
          <p className="text-slate-600 mb-8">
            Skip the address search. Each link opens this tool already centered on the city,
            with a starting radius that fits the city&apos;s scale and a deep guide to what&apos;s
            within each radius.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/radius-map/new-york-city" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">New York City</div>
              <div className="text-sm text-slate-600">United States · 5 mi default</div>
            </Link>
            <Link href="/radius-map/london" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">London</div>
              <div className="text-sm text-slate-600">United Kingdom · 10 km default</div>
            </Link>
            <Link href="/radius-map/los-angeles" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">Los Angeles</div>
              <div className="text-sm text-slate-600">United States · 10 mi default</div>
            </Link>
            <Link href="/radius-map/paris" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">Paris</div>
              <div className="text-sm text-slate-600">France · 10 km default</div>
            </Link>
            <Link href="/radius-map/tokyo" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">Tokyo</div>
              <div className="text-sm text-slate-600">Japan · 10 km default</div>
            </Link>
            <Link href="/radius-map/sydney" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="font-semibold text-slate-900">Sydney</div>
              <div className="text-sm text-slate-600">Australia · 15 km default</div>
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            <Link href="/radius-map" className="content-link">
              See all 25 city radius maps &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ Section - Gray Section */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <details className="faq-card">
                <summary>
                  Can I draw a radius on Google Maps?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Google Maps does not have a built-in radius tool. You cannot draw a circle directly in Google Maps or
                  Google My Maps without workarounds involving KML files. Use our tool instead — it works with
                  OpenStreetMap and lets you draw radius circles instantly.{' '}
                  <Link href="/radius-on-google-maps" className="content-link">
                    Read our full guide on radius on Google Maps &rarr;
                  </Link>
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  How do I find what&apos;s within a 10-mile radius of my location?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Click &ldquo;Use My Location&rdquo; in the tool above, then set the radius to 10 miles. The circle shows
                  everything within 10 miles of your current position. You can zoom in to see specific streets,
                  landmarks, and neighborhoods within the radius.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  Is this tool really free?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Yes. Map With Radius is completely free with no limits. There&apos;s no account to create, no premium
                  tier, and no usage cap. The tool runs on open-source technology (Leaflet + OpenStreetMap) which has no
                  per-use costs.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  What&apos;s the difference between a radius and drive time?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  A radius shows straight-line distance from a point — &ldquo;as the crow flies.&rdquo; Drive time shows how far
                  you can actually travel by road in a given time. A 10-mile radius is a perfect circle, but a
                  10-minute drive is an irregular shape that follows roads. We offer both: this tool for radius circles,
                  and our{' '}
                  <Link href="/drive-time-map" className="content-link">
                    drive time map
                  </Link>{' '}
                  for travel-time areas.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  Can I share my radius map with someone?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Yes. Click &ldquo;Copy Link&rdquo; to get a URL that contains your exact map settings — center point, radius
                  distance, and circle positions. Anyone who opens the link sees your map exactly as you set it up.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  How accurate is the radius?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  The radius uses the Haversine formula, which accounts for the Earth&apos;s curvature. It is highly
                  accurate for typical radius sizes; the spherical-Earth approximation introduces sub-percent error
                  only at continental distances. The circles represent straight-line distance, not road distance.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  Can I add multiple radius circles?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Yes. Click &ldquo;Add Another Circle&rdquo; to place additional circles on the same map. Each circle can have
                  its own center point, radius distance, and color. This is useful for comparing coverage areas or
                  finding overlap between locations.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  Does this work on my phone?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  Yes. The tool is fully responsive and works on all modern browsers, including Safari on iOS and Chrome
                  on Android. Touch and drag to pan the map, pinch to zoom, and tap to place circles.
                </div>
              </details>

              <details className="faq-card">
                <summary>
                  Can I export the map?
                  <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">
                  You can export in three ways: (1) Copy a shareable URL link, (2) Download a PNG screenshot of your
                  current map view, (3) Export circle data as a KML file that you can open in Google Earth or other GIS
                  software.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
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
            '@id': 'https://mapwithradius.com/',
            url: 'https://mapwithradius.com/',
            name: 'Map With Radius — Draw a Radius Circle on Any Map (Free)',
            isPartOf: { '@id': 'https://mapwithradius.com/#website' },
            author: { '@id': 'https://mapwithradius.com/about#marko' },
            publisher: { '@id': 'https://mapwithradius.com/#organization' },
            dateModified: '2026-06-10',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Map With Radius',
            url: 'https://mapwithradius.com/',
            description:
              'Free tool to draw radius circles on a map. Enter an address and distance to visualize coverage areas instantly.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
            softwareVersion: '1.0',
            creator: {
              '@type': 'Organization',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
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
            name: 'How to Draw a Radius on a Map',
            description: 'Draw a radius circle on any map in three steps using the free Map With Radius tool.',
            totalTime: 'PT1M',
            tool: { '@type': 'HowToTool', name: 'Map With Radius' },
            step: [
              {
                '@type': 'HowToStep',
                name: 'Choose your center point',
                text: 'Type an address, city, or zip code in the search bar — or click Use My Location to center the radius on your current GPS position.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set your distance',
                text: 'Enter the radius distance you need and select your unit (miles, kilometers, meters, or feet). The circle appears instantly on the map.',
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust and share',
                text: 'Drag the circle to reposition it. Drag the edge to resize. Copy the shareable link so anyone can see your exact map.',
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can I draw a radius on Google Maps?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Google Maps does not have a built-in radius tool. You cannot draw a circle directly in Google Maps or Google My Maps without workarounds involving KML files. Use Map With Radius instead — it works with OpenStreetMap and lets you draw radius circles instantly.',
                },
              },
              {
                '@type': 'Question',
                name: "How do I find what's within a 10-mile radius of my location?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Click "Use My Location" in the tool, then set the radius to 10 miles. The circle shows everything within 10 miles of your current position.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this tool really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Map With Radius is completely free with no limits. There is no account to create, no premium tier, and no usage cap.',
                },
              },
              {
                '@type': 'Question',
                name: "What's the difference between a radius and drive time?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A radius shows straight-line distance from a point ("as the crow flies"). Drive time shows how far you can actually travel by road in a given time.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I share my radius map with someone?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Click "Copy Link" to get a URL that contains your exact map settings. Anyone who opens the link sees your map exactly as you set it up.',
                },
              },
              {
                '@type': 'Question',
                name: 'How accurate is the radius?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "The radius uses the Haversine formula, which accounts for the Earth's curvature. It is highly accurate for typical radius sizes; the spherical-Earth approximation introduces sub-percent error only at continental distances.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I add multiple radius circles?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Click "Add Another Circle" to place additional circles on the same map. Each circle can have its own center point, radius distance, and color.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does this work on my phone?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The tool is fully responsive and works on all modern browsers, including Safari on iOS and Chrome on Android.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
