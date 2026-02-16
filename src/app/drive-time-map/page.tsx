import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drive Time Map — See How Far You Can Drive, Walk, or Cycle (Free)',
  description: 'Free drive time radius map. Enter a location and time limit to see how far you can actually travel by car, foot, or bike. Uses real road data.',
  keywords: ['drive time radius map', 'isochrone map', 'travel time map', 'commute time map', 'driving distance map', 'drive time map'],
  openGraph: {
    title: 'Drive Time Map — See How Far You Can Drive, Walk, or Cycle (Free)',
    description: 'Enter a location and time limit to see how far you can actually travel.',
    url: 'https://mapwithradius.com/drive-time-map',
  },
};

// Dynamic import for the map component (client-side only)
const DriveTimeMap = dynamic(() => import('@/components/map/DriveTimeMap'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 lg:w-96 h-[400px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

export default function DriveTimeMapPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Drive Time Map',
            description: 'Enter a location and time limit to see how far you can actually travel by car, foot, or bike.',
            url: 'https://mapwithradius.com/drive-time-map',
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
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mapwithradius.com' },
              { '@type': 'ListItem', position: 2, name: 'Drive Time Map', item: 'https://mapwithradius.com/drive-time-map' },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Create a Drive Time Map',
            description: 'Create an isochrone map showing how far you can travel by car, bike, or foot within a specific time limit.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Enter Your Starting Location', text: 'Type an address or click directly on the map to set your starting point' },
              { '@type': 'HowToStep', position: 2, name: 'Select Travel Mode', text: 'Choose between Drive, Walk, or Cycle to match your transportation method' },
              { '@type': 'HowToStep', position: 3, name: 'Set Travel Time', text: 'Use the slider or input field to set your time limit (5 to 120 minutes)' },
              { '@type': 'HowToStep', position: 4, name: 'Generate Isochrone', text: 'Click Generate to calculate the reachable area based on actual road networks' },
              { '@type': 'HowToStep', position: 5, name: 'Analyze and Export', text: 'Review the coverage area and export as PNG or share the link' },
            ],
          }),
        }}
      />

      {/* Hero Section with Tool */}
      <section className="bg-slate-50">
        {/* Hero header band */}
        <div className="bg-primary-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Drive Time Map</h1>
            <p className="text-slate-300">
              Enter a location and time — see how far you can travel by car, foot, or bike.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
          <DriveTimeMap />
        </div>
      </section>

      {/* How to Use This Tool */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">How to Use This Drive Time Map</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Enter Location', desc: 'Type an address or click on the map' },
              { step: '2', title: 'Select Mode', desc: 'Choose Drive, Walk, or Cycle' },
              { step: '3', title: 'Set Time', desc: 'Select 5 to 120 minutes' },
              { step: '4', title: 'Generate', desc: 'Click to calculate the area' },
              { step: '5', title: 'Export', desc: 'Save as PNG or share link' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Below the Fold */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What Is a Drive Time Map */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">What Is a Drive Time Map?</h2>
            <p className="text-slate-700 mb-4">
              A drive time map — also called an isochrone map — shows the area you can reach from a location
              within a specific time by car, foot, or bicycle. Unlike a{' '}
              <Link href="/" className="content-link">radius circle</Link> which draws a perfect circle
              based on straight-line distance, a drive time map follows actual roads and paths to create
              a realistic boundary.
            </p>
            <p className="text-slate-700 mb-4">
              The word &ldquo;isochrone&rdquo; comes from Greek: <em>iso</em> (equal) + <em>chronos</em> (time).
              Every point on the boundary of an isochrone represents the same travel time from the center.
            </p>
            <p className="text-slate-700">
              A 30-minute drive time area from a city center is not a circle. It extends further along
              highways and shorter in areas with few roads, hills, or one-way streets. The resulting shape
              reveals the real-world accessibility of a location — something a simple radius cannot show.
            </p>
          </div>

          {/* Drive Time vs Radius Visual Comparison */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Drive Time vs. Straight-Line Radius</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Drive Time (Isochrone)</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Follows actual roads and paths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Accounts for road speed limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Considers one-way streets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Shows realistic travel coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">~</span>
                    <span>Irregular shape (accurate)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Radius Circle</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Perfect geometric circle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Easy to understand and measure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Great for compliance/regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">~</span>
                    <span>Ignores terrain and roads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">~</span>
                    <span>May include unreachable areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Use */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">When to Use Drive Time vs. Radius</h2>
            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Drive Time</th>
                    <th>Radius</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&ldquo;How far can I drive in 30 minutes?&rdquo;</td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&ldquo;What&apos;s within 10 miles of this address?&rdquo;</td>
                    <td></td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                  </tr>
                  <tr>
                    <td>&ldquo;Is this apartment close enough to work?&rdquo;</td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&ldquo;Define a rough service coverage zone&rdquo;</td>
                    <td></td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                  </tr>
                  <tr>
                    <td>&ldquo;Plan a delivery area based on drive time&rdquo;</td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&ldquo;Estimate area for insurance or compliance&rdquo;</td>
                    <td></td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                  </tr>
                  <tr>
                    <td>&ldquo;Find customers reachable in under an hour&rdquo;</td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&ldquo;Emergency response coverage planning&rdquo;</td>
                    <td className="text-green-600 font-medium">✓ Best</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 text-sm mt-4">
              <strong>Rule of thumb:</strong> If your question involves time (&ldquo;how long to get there?&rdquo;),
              use drive time. If it involves distance (&ldquo;how far is it?&rdquo;), use a{' '}
              <Link href="/" className="content-link">radius circle</Link>.
            </p>
          </div>

          {/* How to Read */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How to Read an Isochrone Map</h2>
            <p className="text-slate-700 mb-4">
              The colored area on the map represents everywhere you can reach within your specified time.
              The boundary edge is the furthest you can travel in that time.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                <span><strong>Highway corridors extend the shape.</strong> The isochrone stretches along major highways because you can cover more distance at highway speeds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                <span><strong>Dense urban areas shrink the shape.</strong> Traffic lights, one-way streets, and lower speed limits mean less distance per minute.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                <span><strong>Natural barriers cut off access.</strong> Rivers, mountains, and bodies of water create sharp boundaries.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                <span><strong>Sparse road networks limit reach.</strong> Rural areas with few roads may show smaller isochrones despite highway access.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Drive Time Reference Data */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">Drive Time Distance Reference</h2>

          {/* Speed by Road Type */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Average Speeds by Road Type</h3>
            <div className="space-y-3">
              {[
                { type: 'Interstate/Highway', speed: '65 mph', width: '100%', color: 'bg-green-500' },
                { type: 'Divided Highway', speed: '55 mph', width: '85%', color: 'bg-green-400' },
                { type: 'Arterial Road', speed: '40 mph', width: '62%', color: 'bg-blue-500' },
                { type: 'Collector Street', speed: '30 mph', width: '46%', color: 'bg-blue-400' },
                { type: 'Residential Street', speed: '25 mph', width: '38%', color: 'bg-amber-500' },
                { type: 'Downtown/Urban Core', speed: '15 mph', width: '23%', color: 'bg-red-500' },
              ].map((row) => (
                <div key={row.type} className="flex items-center gap-4">
                  <span className="w-40 text-sm text-slate-700 flex-shrink-0">{row.type}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                    <div className={`${row.color} h-full rounded-full flex items-center justify-end pr-2`} style={{ width: row.width }}>
                      <span className="text-xs text-white font-medium">{row.speed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-3">
              Speeds based on typical US road conditions. Actual speeds vary by location, traffic, and time of day.
            </p>
          </div>

          {/* Comprehensive Distance Table */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Distance by Time and Travel Mode</h3>
            <div className="overflow-x-auto">
              <table className="styled-table text-sm">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Highway Drive</th>
                    <th>Mixed Drive</th>
                    <th>Urban Drive</th>
                    <th>Cycling</th>
                    <th>Walking</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">5 min</td>
                    <td>5.4 mi</td>
                    <td>3.3 mi</td>
                    <td>1.3 mi</td>
                    <td>1.0 mi</td>
                    <td>0.25 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">10 min</td>
                    <td>10.8 mi</td>
                    <td>6.7 mi</td>
                    <td>2.5 mi</td>
                    <td>2.0 mi</td>
                    <td>0.5 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">15 min</td>
                    <td>16.3 mi</td>
                    <td>10.0 mi</td>
                    <td>3.8 mi</td>
                    <td>3.0 mi</td>
                    <td>0.75 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">20 min</td>
                    <td>21.7 mi</td>
                    <td>13.3 mi</td>
                    <td>5.0 mi</td>
                    <td>4.0 mi</td>
                    <td>1.0 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">30 min</td>
                    <td>32.5 mi</td>
                    <td>20.0 mi</td>
                    <td>7.5 mi</td>
                    <td>6.0 mi</td>
                    <td>1.5 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">45 min</td>
                    <td>48.8 mi</td>
                    <td>30.0 mi</td>
                    <td>11.3 mi</td>
                    <td>9.0 mi</td>
                    <td>2.25 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">60 min</td>
                    <td>65.0 mi</td>
                    <td>40.0 mi</td>
                    <td>15.0 mi</td>
                    <td>12.0 mi</td>
                    <td>3.0 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">90 min</td>
                    <td>97.5 mi</td>
                    <td>60.0 mi</td>
                    <td>22.5 mi</td>
                    <td>18.0 mi</td>
                    <td>4.5 mi</td>
                  </tr>
                  <tr>
                    <td className="font-medium">120 min</td>
                    <td>130.0 mi</td>
                    <td>80.0 mi</td>
                    <td>30.0 mi</td>
                    <td>24.0 mi</td>
                    <td>6.0 mi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              Highway: 65 mph average. Mixed: 40 mph average. Urban: 15 mph with stops. Cycling: 12 mph. Walking: 3 mph.
            </p>
          </div>

          {/* Traffic Impact */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Traffic Impact on Drive Time</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                <div className="text-sm text-green-600 font-medium">Off-Peak Hours</div>
                <div className="text-xs text-slate-500 mt-1">10pm - 6am</div>
                <div className="text-xs text-slate-600 mt-2">Full distance achievable</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-700 mb-1">70-80%</div>
                <div className="text-sm text-amber-600 font-medium">Moderate Traffic</div>
                <div className="text-xs text-slate-500 mt-1">9am-4pm, 7pm-10pm</div>
                <div className="text-xs text-slate-600 mt-2">Plan 20-30% extra time</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-700 mb-1">40-60%</div>
                <div className="text-sm text-red-600 font-medium">Rush Hour</div>
                <div className="text-xs text-slate-500 mt-1">7am-9am, 4pm-7pm</div>
                <div className="text-xs text-slate-600 mt-2">Plan 50-100% extra time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">Real-World Examples</h2>

          <div className="space-y-6">
            {/* Example 1: Delivery Service */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Food Delivery Zone Planning — Chicago Restaurant</h3>
                  <p className="text-slate-600 mb-3">
                    Marco owns an Italian restaurant in Chicago&apos;s Lincoln Park and wants to define his delivery area.
                    He needs to ensure food arrives hot within 30 minutes of leaving the kitchen.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700">
                      <strong>Setup:</strong> Location at 2450 N Clark St, Chicago. Travel mode: Drive. Time: 20 minutes
                      (allowing 10 minutes buffer for parking and handoff).
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm">
                    <strong>Result:</strong> The 20-minute drive time isochrone covers approximately 5.2 square miles,
                    reaching Wrigleyville to the north, Old Town to the south, and Bucktown to the west. The eastern
                    boundary extends to Lake Shore Drive. Marco uses this map on his website to show customers the
                    delivery zone, reducing complaints about delivery availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2: Real Estate Site Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Retail Site Selection — Denver Franchise</h3>
                  <p className="text-slate-600 mb-3">
                    A fitness franchise wants to open a new location in Denver. Their market research shows members
                    typically won&apos;t drive more than 15 minutes to reach a gym during rush hour.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700">
                      <strong>Setup:</strong> Three potential sites evaluated with 15-minute drive time isochrones.
                      Sites at Cherry Creek, Highlands, and Stapleton.
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm">
                    <strong>Result:</strong> The Cherry Creek site shows the best coverage, with its 15-minute isochrone
                    capturing 187,000 residents in the target demographic. The Highlands location, while trendy, has
                    significant overlap with an existing location. Stapleton provides access to underserved markets
                    but with 40% less population density. The franchise selects Cherry Creek.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3: Sales Territory */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Sales Territory Planning — Medical Device Company</h3>
                  <p className="text-slate-600 mb-3">
                    A medical device sales rep based in Atlanta needs to plan her territory. The company policy
                    requires reps to be able to reach any hospital within 1 hour for emergency support calls.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700">
                      <strong>Setup:</strong> Home base in Midtown Atlanta. Travel mode: Drive. Time: 60 minutes.
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm">
                    <strong>Result:</strong> The 60-minute isochrone extends significantly along I-85 and I-75 corridors,
                    reaching Gainesville to the north and Newnan to the south. However, hospitals in Athens (despite being
                    only 65 miles away) fall outside the 1-hour boundary due to the lack of highway access. The rep
                    identifies 47 hospitals within her reachable zone and flags 3 accounts that need to be transferred
                    to the Augusta-based colleague.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 4: Emergency Response */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Emergency Response Coverage — Houston Fire District</h3>
                  <p className="text-slate-600 mb-3">
                    Houston Fire Department Station 51 needs to verify their response coverage meets the 4-minute
                    National Fire Protection Association (NFPA) standard for first-alarm responses.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700">
                      <strong>Setup:</strong> Station location at 1818 Dallas St. Travel mode: Drive. Time: 4 minutes.
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm">
                    <strong>Result:</strong> The 4-minute isochrone covers 1.2 square miles around Midtown Houston.
                    The analysis reveals coverage gaps in the Montrose area due to one-way street patterns and
                    railroad crossings. The department identifies that a new station at the intersection of
                    Westheimer and Montrose would eliminate 87% of the current response gap. The visualization
                    helps secure budget approval by clearly showing the problem and solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 5: Commute Analysis */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Home Search Commute Planning — Phoenix Couple</h3>
                  <p className="text-slate-600 mb-3">
                    Sarah and James are relocating to Phoenix. Sarah works in downtown Phoenix, James works at
                    the Intel campus in Chandler. They want to find neighborhoods where both commutes are under 30 minutes.
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <p className="text-sm text-slate-700">
                      <strong>Setup:</strong> Two 30-minute isochrones generated: one from Downtown Phoenix (1 N Central Ave)
                      and one from Intel Chandler (5000 W Chandler Blvd). Looking for overlap areas.
                    </p>
                  </div>
                  <p className="text-slate-700 text-sm">
                    <strong>Result:</strong> The overlap zone covers Tempe, Ahwatukee, and south Phoenix. Tempe
                    offers the best balance with 22 minutes to downtown and 18 minutes to Intel. Ahwatukee
                    provides more space but adds 8 minutes to the downtown commute. The couple focuses their
                    home search on Tempe near the I-10/US-60 interchange, ultimately finding a home that keeps
                    both commutes under 25 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Comparison and Urban vs Rural */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">30-Minute Drive Coverage by City Type</h2>

          <div className="overflow-x-auto mb-8">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>City Type</th>
                  <th>Typical 30-min Area</th>
                  <th>Max Distance</th>
                  <th>Key Factors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Rural / Small Town</td>
                  <td>100-200 sq mi</td>
                  <td>25-30 mi</td>
                  <td>Open highways, minimal traffic</td>
                </tr>
                <tr>
                  <td className="font-medium">Suburban</td>
                  <td>50-100 sq mi</td>
                  <td>15-25 mi</td>
                  <td>Highway access, some lights</td>
                </tr>
                <tr>
                  <td className="font-medium">Mid-Size City</td>
                  <td>25-50 sq mi</td>
                  <td>10-18 mi</td>
                  <td>Mixed roads, moderate traffic</td>
                </tr>
                <tr>
                  <td className="font-medium">Major Metro</td>
                  <td>10-25 sq mi</td>
                  <td>8-15 mi</td>
                  <td>Congestion, complex routing</td>
                </tr>
                <tr>
                  <td className="font-medium">Dense Urban Core</td>
                  <td>3-10 sq mi</td>
                  <td>3-8 mi</td>
                  <td>Traffic, one-ways, parking</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Relative Area Coverage (30 minutes)</h3>
            {[
              { city: 'Rural Montana', area: '180 sq mi', width: '100%', color: 'bg-green-500' },
              { city: 'Suburban Phoenix', area: '85 sq mi', width: '47%', color: 'bg-green-400' },
              { city: 'Austin, TX', area: '45 sq mi', width: '25%', color: 'bg-blue-500' },
              { city: 'Chicago Metro', area: '22 sq mi', width: '12%', color: 'bg-amber-500' },
              { city: 'Manhattan, NYC', area: '5 sq mi', width: '3%', color: 'bg-red-500' },
            ].map((row) => (
              <div key={row.city} className="flex items-center gap-4">
                <span className="w-36 text-sm text-slate-700 flex-shrink-0">{row.city}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                  <div className={`${row.color} h-full rounded-full flex items-center justify-end pr-2 min-w-[40px]`} style={{ width: row.width }}>
                    <span className="text-xs text-white font-medium">{row.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading mb-6">How This Tool Works</h2>
            <p className="text-slate-700 mb-4">
              The drive time map is powered by open-source routing technology using{' '}
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="content-link">
                OpenStreetMap
              </a>{' '}
              road data. When you set a location and time:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4">
              <li>The tool sends your coordinates and time limit to a routing engine.</li>
              <li>The engine calculates how far you can travel along every road from that point.</li>
              <li>It returns a polygon boundary connecting the furthest reachable points.</li>
              <li>The polygon is rendered on the Leaflet map as a colored area.</li>
            </ol>
            <p className="text-slate-700 mt-4">
              The routing considers road type (highway, residential, path), one-way restrictions, and turn restrictions.
              It does not currently factor in real-time traffic or road closures.
            </p>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Technical Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Map Data Source</dt>
                <dd className="text-slate-900 font-medium">OpenStreetMap</dd>
              </div>
              <div>
                <dt className="text-slate-500">Routing Engine</dt>
                <dd className="text-slate-900 font-medium">OSRM / Valhalla</dd>
              </div>
              <div>
                <dt className="text-slate-500">Update Frequency</dt>
                <dd className="text-slate-900 font-medium">Weekly road data</dd>
              </div>
              <div>
                <dt className="text-slate-500">Max Time Limit</dt>
                <dd className="text-slate-900 font-medium">120 minutes</dd>
              </div>
              <div>
                <dt className="text-slate-500">Travel Modes</dt>
                <dd className="text-slate-900 font-medium">Drive, Walk, Cycle</dd>
              </div>
              <div>
                <dt className="text-slate-500">Export Formats</dt>
                <dd className="text-slate-900 font-medium">PNG, Share Link</dd>
              </div>
            </div>
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
                Is this the same as Google Maps travel time?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. Google Maps calculates travel time between two specific points (A to B). A drive time map
                shows the area reachable from one point in all directions within a time limit — it answers
                &ldquo;everywhere I can get to in 30 minutes,&rdquo; not just one destination.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this account for traffic?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The current version uses average road speeds based on road type and does not include real-time
                traffic data. For a conservative estimate, reduce your time input by 20–30% to account for
                potential delays during rush hour.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I see drive time from multiple locations?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Currently, the tool shows one isochrone at a time. For comparing multiple starting points,
                you can generate one isochrone, note the area, then change the starting point. A future update
                may add multi-origin support.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the difference between isochrone and isodistance?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                An isochrone shows equal travel time (e.g., everything within 30 minutes). An isodistance
                shows equal travel distance along roads. This tool creates isochrones (time-based). For
                straight-line distance circles, use our{' '}
                <Link href="/" className="content-link">radius map tool</Link>.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How accurate is the drive time calculation?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The routing data comes from OpenStreetMap, which is continuously updated by a global community.
                Road speeds are based on road type averages. Accuracy is generally high for typical conditions
                but may differ during rush hour or unusual traffic situations.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use this for business planning and presentations?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. You can export the map as a PNG image and use it in presentations, reports, or marketing
                materials. The share link also allows you to send the exact isochrone view to colleagues. For
                commercial applications with higher volume needs, contact us about our API access.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Why does the isochrone have an irregular shape?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The irregular shape reflects reality. You can travel faster on highways than residential streets,
                so the isochrone extends further along highway corridors. Natural barriers like rivers, parks,
                and mountains create sharp cutoffs. One-way streets, dead ends, and no-turn zones all affect
                the final shape. A perfect circle would ignore all these real-world constraints.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this work for international locations?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. The tool uses OpenStreetMap data, which has global coverage. However, data quality varies
                by region. Major cities in North America, Europe, and developed Asia have excellent road data.
                Some developing regions may have less complete road networks mapped, which could affect accuracy.
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
                    name: 'Is this the same as Google Maps travel time?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. Google Maps calculates travel time between two specific points. A drive time map shows the area reachable from one point in all directions within a time limit.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this account for traffic?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The current version uses average road speeds based on road type and does not include real-time traffic data.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I see drive time from multiple locations?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Currently, the tool shows one isochrone at a time. For comparing multiple starting points, you can generate one isochrone, note the area, then change the starting point.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the difference between isochrone and isodistance?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'An isochrone shows equal travel time. An isodistance shows equal travel distance along roads. This tool creates isochrones (time-based).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How accurate is the drive time calculation?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The routing data comes from OpenStreetMap. Road speeds are based on road type averages. Accuracy is generally high for typical conditions.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use this for business planning and presentations?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. You can export the map as a PNG image and use it in presentations, reports, or marketing materials.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why does the isochrone have an irregular shape?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The irregular shape reflects reality. You can travel faster on highways than residential streets, and natural barriers create cutoffs.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this work for international locations?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. The tool uses OpenStreetMap data, which has global coverage. Data quality varies by region.',
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
          <h2 className="section-heading mb-8 text-center">More Map Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Radius Map</h3>
              </div>
              <p className="text-sm text-slate-600">Draw circles on any map by distance</p>
            </Link>

            <Link href="/walking-radius-map" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Walking Map</h3>
              </div>
              <p className="text-sm text-slate-600">Walking and cycling radius tool</p>
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

            <Link href="/radius-on-google-maps" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Radius Guide</h3>
              </div>
              <p className="text-sm text-slate-600">Complete how-to guide</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
