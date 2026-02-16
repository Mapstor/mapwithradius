import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distance Between Two Points on a Map — Free Calculator',
  description: 'Measure the straight-line or driving distance between any two points on a map. Shows both "as the crow flies" and road distance.',
  keywords: ['distance between two points', 'distance between two addresses', 'distance calculator', 'as the crow flies', 'road distance'],
  openGraph: {
    title: 'Distance Between Two Points on a Map — Free Calculator',
    description: 'Measure the straight-line or driving distance between any two points on a map.',
    url: 'https://mapwithradius.com/distance-calculator',
  },
};

// Dynamic import for the map component (client-side only)
const DistanceMap = dynamic(() => import('@/components/map/DistanceMap'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 h-[400px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

export default function DistanceCalculatorPage() {
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
                name: 'Distance Calculator',
                item: 'https://mapwithradius.com/distance-calculator',
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
            name: 'Distance Calculator',
            description: 'Measure the straight-line or driving distance between any two points on a map.',
            url: 'https://mapwithradius.com/distance-calculator',
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
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Measure Distance Between Two Points on a Map',
            description: 'Learn how to calculate both straight-line and road distance between any two locations.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Set Your First Point',
                text: 'Click anywhere on the map or type an address to set your starting point.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Your Second Point',
                text: 'Click another location on the map or enter a second address for your destination.',
              },
              {
                '@type': 'HowToStep',
                name: 'View Both Distances',
                text: 'See the straight-line distance (as the crow flies) and road distance calculated automatically.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add More Points (Optional)',
                text: 'Click additional points to create a multi-stop route with cumulative distance.',
              },
              {
                '@type': 'HowToStep',
                name: 'Share or Export',
                text: 'Copy a shareable link or export your distance measurement.',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Distance Between Two Points</h1>
            <p className="text-slate-300">
              Click two points on the map to measure the distance between them — straight line and by road.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
          <DistanceMap />
        </div>
      </section>

      {/* How to Measure Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">How to Measure Distance on the Map</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            {[
              { step: 1, title: 'Click First Point', desc: 'Click map or enter address' },
              { step: 2, title: 'Click Second Point', desc: 'Set your destination' },
              { step: 3, title: 'View Distances', desc: 'See straight-line & road' },
              { step: 4, title: 'Add More Points', desc: 'Create multi-stop route' },
              { step: 5, title: 'Share Result', desc: 'Copy link or export' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Straight-Line vs Road Distance */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Straight-Line vs. Road Distance</h2>
          <p className="text-slate-700 mb-6">
            This tool shows two measurements between your selected points:
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-blue-500 pl-4 bg-white p-4 rounded-r-lg">
              <h3 className="font-semibold text-slate-900">Straight-line distance</h3>
              <p className="text-slate-600">
                Also called &ldquo;as the crow flies,&rdquo; great-circle distance, or aerial distance — this is the
                shortest possible distance between two points on Earth&apos;s surface. It&apos;s calculated using the
                Haversine formula and ignores roads, terrain, and obstacles.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-white p-4 rounded-r-lg">
              <h3 className="font-semibold text-slate-900">Road distance</h3>
              <p className="text-slate-600">
                The actual distance you&apos;d travel by car following roads. This is always longer than straight-line
                distance — typically 20–40% longer, though it can be much more in mountainous areas or where roads
                take indirect routes.
              </p>
            </div>
          </div>

          {/* Visual Chart: Road vs Straight-Line Ratio */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Typical Road-to-Straight-Line Distance Ratios</h3>
            <p className="text-sm text-slate-600 mb-4">
              Road distance is typically 20-60% longer than straight-line distance, depending on terrain and road network:
            </p>
            <div className="space-y-4">
              {[
                { label: 'Urban Grid (Manhattan, Chicago)', ratio: '1.25x', percent: 62.5, color: 'bg-green-500', example: '10mi straight = ~12.5mi road' },
                { label: 'Suburban Areas (Most US cities)', ratio: '1.35x', percent: 67.5, color: 'bg-blue-500', example: '10mi straight = ~13.5mi road' },
                { label: 'Rural / Open Country', ratio: '1.20x', percent: 60, color: 'bg-teal-500', example: '10mi straight = ~12mi road' },
                { label: 'Mountainous Terrain (Alps, Rockies)', ratio: '1.80x', percent: 90, color: 'bg-orange-500', example: '10mi straight = ~18mi road' },
                { label: 'Coastal / Island Routes', ratio: '2.00x', percent: 100, color: 'bg-red-500', example: '10mi straight = ~20mi road' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-medium">{item.label}</span>
                    <span className="text-slate-900 font-bold">{item.ratio}</span>
                  </div>
                  <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${item.percent}%` }}
                    >
                      <span className="text-white text-xs font-medium">{item.example}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              * Ratios are typical averages. Actual distances vary based on specific routes and conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Real-World Examples */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">5 Real-World Distance Measurement Examples</h2>

          <div className="space-y-8">
            {/* Example 1: Road Trip Planning */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">1. Road Trip Planning (US Route 66)</h3>
                  <p className="text-slate-700 mb-4">
                    A family planning a road trip from <strong>Chicago, IL to Los Angeles, CA</strong> uses the distance calculator
                    to understand the journey scope.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="text-sm text-slate-500 mb-1">Straight-Line Distance</div>
                      <div className="text-2xl font-bold text-blue-600">1,745 miles</div>
                      <div className="text-sm text-slate-600">(2,809 km)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="text-sm text-slate-500 mb-1">Road Distance (I-40)</div>
                      <div className="text-2xl font-bold text-indigo-600">2,015 miles</div>
                      <div className="text-sm text-slate-600">(3,243 km) — 15% longer</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Use case:</strong> Calculate fuel budget (~100 gallons at 20 mpg), estimate 4-day driving time,
                    and plan overnight stops at approximately 500-mile intervals.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2: Flight Booking */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">2. Flight Distance & Frequent Flyer Miles (NYC to London)</h3>
                  <p className="text-slate-700 mb-4">
                    A business traveler calculates <strong>New York (JFK) to London (LHR)</strong> to understand
                    how many miles they&apos;ll earn on their frequent flyer account.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="text-sm text-slate-500 mb-1">Great Circle Distance</div>
                      <div className="text-2xl font-bold text-purple-600">3,459 miles</div>
                      <div className="text-sm text-slate-600">(5,567 km)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="text-sm text-slate-500 mb-1">Flight Time (Typical)</div>
                      <div className="text-2xl font-bold text-pink-600">7h 15m</div>
                      <div className="text-sm text-slate-600">Eastbound (~477 mph avg)</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Use case:</strong> Airlines calculate award miles using great-circle distance. This flight earns
                    ~3,459 base miles. With elite bonus, could be 5,200+ qualifying miles toward status.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3: Real Estate Commute */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">3. Home Buying: Commute Analysis (San Francisco Bay Area)</h3>
                  <p className="text-slate-700 mb-4">
                    A couple house-hunting compares commute distance from two different suburbs to their
                    office in <strong>San Francisco (Financial District)</strong>.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-green-200 rounded-lg overflow-hidden">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="px-4 py-2 text-left">From Location</th>
                          <th className="px-4 py-2 text-right">Straight-Line</th>
                          <th className="px-4 py-2 text-right">Road Distance</th>
                          <th className="px-4 py-2 text-right">Ratio</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-green-100">
                          <td className="px-4 py-2 font-medium">Walnut Creek, CA</td>
                          <td className="px-4 py-2 text-right">18 mi</td>
                          <td className="px-4 py-2 text-right">25 mi</td>
                          <td className="px-4 py-2 text-right text-green-600">1.39x</td>
                        </tr>
                        <tr className="border-t border-green-100">
                          <td className="px-4 py-2 font-medium">San Mateo, CA</td>
                          <td className="px-4 py-2 text-right">19 mi</td>
                          <td className="px-4 py-2 text-right">22 mi</td>
                          <td className="px-4 py-2 text-right text-green-600">1.16x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Insight:</strong> Despite similar straight-line distances, San Mateo has a shorter commute
                    because of direct highway access (US-101), while Walnut Creek requires crossing the Bay Bridge.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 4: Shipping & Logistics */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">4. Trucking Exemption: 150 Air-Mile Radius (FMCSA)</h3>
                  <p className="text-slate-700 mb-4">
                    A trucking company determines if drivers qualify for the DOT short-haul exemption
                    (150 air-mile radius from dispatch location in <strong>Dallas, TX</strong>).
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-100 text-center">
                      <div className="text-sm text-slate-500 mb-1">To: Oklahoma City, OK</div>
                      <div className="text-xl font-bold text-green-600">180 mi air</div>
                      <div className="text-xs text-red-500 mt-1">Outside exemption</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-100 text-center">
                      <div className="text-sm text-slate-500 mb-1">To: Waco, TX</div>
                      <div className="text-xl font-bold text-green-600">88 mi air</div>
                      <div className="text-xs text-green-500 mt-1">Within exemption</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-100 text-center">
                      <div className="text-sm text-slate-500 mb-1">To: Austin, TX</div>
                      <div className="text-xl font-bold text-orange-600">182 mi air</div>
                      <div className="text-xs text-red-500 mt-1">Outside exemption</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Regulatory note:</strong> The 150 air-mile radius uses straight-line distance, not road miles.
                    Drivers within this radius don&apos;t need electronic logging devices (ELDs) for short-haul operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 5: Marathon Training */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">5. Marathon Training Route Verification (Boston Marathon)</h3>
                  <p className="text-slate-700 mb-4">
                    A runner training for the <strong>Boston Marathon</strong> creates a point-to-point training route
                    from Hopkinton to Boston and verifies the distance.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-slate-500 mb-1">Official Course Distance</div>
                      <div className="text-2xl font-bold text-red-600">26.2 miles</div>
                      <div className="text-sm text-slate-600">42.195 km (marathon standard)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-slate-500 mb-1">Straight-Line Distance</div>
                      <div className="text-2xl font-bold text-rose-600">21.3 miles</div>
                      <div className="text-sm text-slate-600">34.3 km (as the crow flies)</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Training insight:</strong> The road distance is 23% longer than straight-line due to the
                    course&apos;s winding path. Runners use this to plan pickup locations for support crews at specific mileage points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When Each Measurement Matters */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">When Each Measurement Matters</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Straight-Line Distance Is Used For:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aviation and flight distance calculations
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Shipping regulations (FMCSA 150 air-mile exemption)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Insurance zone calculations and rates
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Military and defense planning
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quick approximate distance estimates
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Radio/wireless coverage radius planning
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Road Distance Is Used For:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Driving directions and navigation
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Delivery and logistics route planning
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fuel cost and consumption calculations
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  IRS mileage reimbursement (2024: $0.67/mi)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Vehicle lease mileage limits
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Travel time and ETA estimation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Distance Reference Tables */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Common Distance Reference Tables</h2>

          {/* Popular City-to-City Distances */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Major US City Distances</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Route</th>
                    <th className="px-4 py-3 text-right font-semibold">Straight-Line</th>
                    <th className="px-4 py-3 text-right font-semibold">Road Distance</th>
                    <th className="px-4 py-3 text-right font-semibold">Drive Time</th>
                    <th className="px-4 py-3 text-right font-semibold">Flight Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { route: 'New York to Los Angeles', straight: '2,451 mi', road: '2,790 mi', drive: '40-42 hrs', flight: '5h 30m' },
                    { route: 'New York to Chicago', straight: '713 mi', road: '790 mi', drive: '11-12 hrs', flight: '2h 15m' },
                    { route: 'Los Angeles to San Francisco', straight: '347 mi', road: '382 mi', drive: '5-6 hrs', flight: '1h 20m' },
                    { route: 'Miami to New York', straight: '1,090 mi', road: '1,280 mi', drive: '18-19 hrs', flight: '3h 00m' },
                    { route: 'Dallas to Houston', straight: '225 mi', road: '239 mi', drive: '3-4 hrs', flight: '1h 05m' },
                    { route: 'Seattle to Portland', straight: '145 mi', road: '174 mi', drive: '2.5-3 hrs', flight: '0h 50m' },
                    { route: 'Boston to Washington DC', straight: '394 mi', road: '440 mi', drive: '7-8 hrs', flight: '1h 30m' },
                    { route: 'Denver to Phoenix', straight: '586 mi', road: '602 mi', drive: '9-10 hrs', flight: '1h 50m' },
                  ].map((row) => (
                    <tr key={row.route} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{row.route}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{row.straight}</td>
                      <td className="px-4 py-3 text-right text-purple-600">{row.road}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.drive}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.flight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* International Distances */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">International Flight Distances</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Route</th>
                    <th className="px-4 py-3 text-right font-semibold">Distance</th>
                    <th className="px-4 py-3 text-right font-semibold">Flight Time</th>
                    <th className="px-4 py-3 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { route: 'New York (JFK) to London (LHR)', dist: '3,459 mi', time: '7h 15m', notes: 'Most popular transatlantic route' },
                    { route: 'Los Angeles (LAX) to Tokyo (NRT)', dist: '5,451 mi', time: '11h 30m', notes: 'Trans-Pacific hub' },
                    { route: 'New York (JFK) to Paris (CDG)', dist: '3,628 mi', time: '7h 30m', notes: 'Popular Europe gateway' },
                    { route: 'Miami (MIA) to São Paulo (GRU)', dist: '4,170 mi', time: '8h 15m', notes: 'South America connection' },
                    { route: 'San Francisco (SFO) to Sydney (SYD)', dist: '7,417 mi', time: '15h 00m', notes: 'One of longest routes' },
                    { route: 'London (LHR) to Dubai (DXB)', dist: '3,414 mi', time: '6h 45m', notes: 'Middle East hub' },
                  ].map((row) => (
                    <tr key={row.route} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{row.route}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{row.dist}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.time}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Distance Conversion Quick Reference */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Distance Conversion Quick Reference</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { mi: '1 mile', km: '1.609 km', m: '1,609 m', ft: '5,280 ft' },
                { mi: '5 miles', km: '8.05 km', m: '8,047 m', ft: '26,400 ft' },
                { mi: '10 miles', km: '16.09 km', m: '16,093 m', ft: '52,800 ft' },
                { mi: '100 miles', km: '160.9 km', m: '160,934 m', ft: '528,000 ft' },
              ].map((conv) => (
                <div key={conv.mi} className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="text-lg font-bold text-accent mb-2">{conv.mi}</div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div>= {conv.km}</div>
                    <div>= {conv.m}</div>
                    <div>= {conv.ft}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical: Haversine Formula */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">How We Calculate: The Haversine Formula</h2>

          <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
            <p className="text-slate-700 mb-4">
              Straight-line distances on Earth&apos;s curved surface are calculated using the <strong>Haversine formula</strong>,
              which accounts for the Earth&apos;s spherical shape:
            </p>

            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
              <pre>{`a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1-a))
d = R × c

Where:
  R = Earth's radius (3,959 miles / 6,371 km)
  lat₁, lat₂ = Latitude of points 1 and 2 (in radians)
  Δlat = Difference in latitude
  Δlon = Difference in longitude
  d = Great-circle distance`}</pre>
            </div>

            <p className="text-slate-600 text-sm">
              This formula gives accuracy within 0.5% for most practical purposes. For extremely precise geodetic calculations
              (surveying, GPS), more complex formulas like Vincenty&apos;s are used.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-slate-900 mb-2">Why &quot;Great Circle&quot;?</h3>
            <p className="text-slate-700 text-sm">
              A great circle is the largest circle that can be drawn on a sphere&apos;s surface. The shortest path between
              any two points on Earth follows a great circle arc. This is why flight paths on a flat map appear curved —
              they&apos;re actually following the shortest route on a sphere.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Is this more accurate than Google Maps?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                For road distance, accuracy is comparable — both use detailed road network data (OpenStreetMap in our case).
                For straight-line distance, our tool explicitly calculates and displays it using the Haversine formula,
                while Google Maps only shows driving distance by default. You&apos;d need to use Google Earth&apos;s ruler tool
                to measure straight-line distance there.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I measure distance between more than two points?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Click additional points to create a multi-stop route. The tool shows cumulative distance for
                all points in order. This is useful for planning delivery routes, road trips with multiple stops,
                or walking paths through several waypoints.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How is the driving time calculated?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Driving time is estimated using road speed limits and typical driving conditions from OpenStreetMap data.
                It assumes highway speeds of ~65 mph, urban roads at ~30-35 mph, and accounts for road types. It does not
                account for current traffic, construction, weather, or other real-time factors. For rush-hour accuracy,
                add 20-50% to the estimate.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the difference between &quot;as the crow flies&quot; and geodesic distance?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                They&apos;re the same thing with different names. &quot;As the crow flies&quot; is the colloquial term for the
                shortest distance between two points on Earth&apos;s surface. &quot;Geodesic distance&quot; and &quot;great-circle distance&quot;
                are the technical terms used in geography and navigation. All three refer to the calculation our tool
                displays as &quot;straight-line distance.&quot;
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use this for flight mile calculations?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes! Our straight-line distance uses the same great-circle calculation airlines use for frequent flyer miles.
                Enter your departure and arrival airports (or city centers) to see the distance. Note that actual award miles
                may vary slightly based on the airline&apos;s exact airport coordinates and any bonus multipliers.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this work for measuring distances overseas?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Straight-line distance works worldwide — you can measure from any point to any other point on Earth.
                Road distance requires a connected road network, so it works within continents but not across oceans.
                For example, you can get road distance from Madrid to Moscow, but not from New York to London.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What is the 150 air-mile exemption for trucking?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The FMCSA (Federal Motor Carrier Safety Administration) offers a &quot;short-haul exemption&quot; for commercial
                drivers who operate within 150 air miles of their work reporting location and meet other requirements.
                These drivers don&apos;t need electronic logging devices (ELDs). The key is that it&apos;s 150 <em>air miles</em>
                (straight-line distance), not road miles — our straight-line measurement shows exactly this.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How accurate is the distance measurement?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Straight-line distance is highly accurate (within 0.5%) using the Haversine formula on a WGS84 spheroid model.
                Road distance accuracy depends on OpenStreetMap data quality for your region — in well-mapped areas (US, Europe,
                major cities worldwide), it&apos;s typically accurate within 1-3% of actual driving distance.
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
                    name: 'Is this more accurate than Google Maps?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'For road distance, accuracy is comparable — both use detailed road network data. For straight-line distance, our tool explicitly calculates and displays it, while Google Maps only shows driving distance by default.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I measure distance between more than two points?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Click additional points to create a multi-stop route. The tool shows cumulative distance for all points in order.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How is the driving time calculated?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Driving time is estimated using road speed limits and typical driving conditions. It does not account for current traffic, construction, or other real-time factors.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the difference between 'as the crow flies' and geodesic distance?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "They're the same thing with different names. 'As the crow flies' is the colloquial term, while 'geodesic' and 'great-circle' are technical terms for the shortest distance on Earth's surface.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use this for flight mile calculations?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! Our straight-line distance uses the same great-circle calculation airlines use for frequent flyer miles.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this work for measuring distances overseas?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Straight-line distance works worldwide. Road distance requires a connected road network, so it works within continents but not across oceans.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the 150 air-mile exemption for trucking?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The FMCSA offers a short-haul exemption for drivers operating within 150 air miles (straight-line distance) of their work location. These drivers don\'t need electronic logging devices.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How accurate is the distance measurement?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Straight-line distance is accurate within 0.5% using the Haversine formula. Road distance accuracy depends on OpenStreetMap data quality, typically within 1-3% in well-mapped areas.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* More Map Tools Section */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">More Map Tools</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: '/',
                title: 'Radius Map',
                desc: 'Draw circles on any map by distance',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                ),
              },
              {
                href: '/drive-time-map',
                title: 'Drive Time Map',
                desc: 'See how far you can drive in X minutes',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                href: '/km-radius-map',
                title: 'KM Radius Map',
                desc: 'Draw radius circles in kilometers',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
                  </svg>
                ),
              },
              {
                href: '/zip-code-radius',
                title: 'Zip Code Radius',
                desc: 'Find all zip codes within a radius',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                href: '/walking-radius-map',
                title: 'Walking Radius Map',
                desc: 'Calculate walking distance coverage',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                href: '/radius-on-google-maps',
                title: 'How-To Guide',
                desc: 'Learn about radius mapping techniques',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-accent hover:shadow-md transition-all duration-200"
              >
                <span className="text-accent flex-shrink-0">{tool.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                  <p className="text-sm text-slate-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Links */}
      <section className="section-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool
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
