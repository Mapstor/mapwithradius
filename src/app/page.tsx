import dynamic from 'next/dynamic';
import Link from 'next/link';

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

          {/* Real-World Examples Section */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">5 Real-World Examples: Using a Radius Map</h2>
            <p className="text-slate-700 mb-6">
              Here are specific scenarios where people use radius maps to solve real problems. Each example shows
              the exact steps and results you&apos;d get using this tool.
            </p>

            <div className="space-y-6">
              {/* Example 1: Real Estate Home Search */}
              <div className="rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">Real Estate: Home Search Near Work</h3>
                    <p className="text-slate-600 mb-3">
                      <strong>Scenario:</strong> A couple is relocating to Denver for work. The primary earner&apos;s
                      office is at 1700 Lincoln St, Denver, CO. They want to see all neighborhoods within a
                      15-mile commute radius.
                    </p>
                    <p className="text-slate-600 mb-3">
                      <strong>How to use:</strong> Enter &ldquo;1700 Lincoln St, Denver, CO&rdquo; in the search box,
                      set radius to 15 miles. The circle shows that Lakewood, Aurora, Englewood, Littleton, and
                      Westminster are all within range. Highlands Ranch falls just outside.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> The radius covers approximately <span className="font-semibold">706 square miles</span> and
                      includes 47 distinct neighborhoods and suburbs, giving them a clear visual of where to focus their home search.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2: Restaurant Delivery Zone */}
              <div className="rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">Restaurant: Defining a Delivery Zone</h3>
                    <p className="text-slate-600 mb-3">
                      <strong>Scenario:</strong> A pizza restaurant in Brooklyn at 86 Court St wants to establish
                      a delivery boundary. Food needs to arrive within 30 minutes, so they need a 3-mile radius
                      to keep deliveries feasible.
                    </p>
                    <p className="text-slate-600 mb-3">
                      <strong>How to use:</strong> Enter the restaurant address, set radius to 3 miles. The circle
                      reveals coverage of Downtown Brooklyn, Brooklyn Heights, DUMBO, Park Slope, Carroll Gardens,
                      Red Hook, and parts of Williamsburg.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> The delivery zone covers <span className="font-semibold">28.3 square miles</span> with
                      an estimated population of 450,000+ residents. They can share the map link on their website
                      so customers know if they&apos;re in range.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3: Emergency Evacuation Planning */}
              <div className="rounded-xl p-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">Emergency Planning: Evacuation Zone Visualization</h3>
                    <p className="text-slate-600 mb-3">
                      <strong>Scenario:</strong> A county emergency manager needs to visualize what a 10-mile
                      evacuation zone around a chemical plant in Pasadena, Texas would look like for community
                      preparedness meetings.
                    </p>
                    <p className="text-slate-600 mb-3">
                      <strong>How to use:</strong> Enter the facility address, set radius to 10 miles. Add a
                      second circle at 20 miles with a different color to show the secondary evacuation zone.
                      Export the map as PNG for the presentation.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> The 10-mile zone covers <span className="font-semibold">314 square miles</span> including
                      La Porte, Deer Park, Baytown, and parts of Houston. The visual helps residents understand
                      if they&apos;re in a primary or secondary zone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 4: Sales Territory Definition */}
              <div className="rounded-xl p-6 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">Sales: Territory Assignment for Field Reps</h3>
                    <p className="text-slate-600 mb-3">
                      <strong>Scenario:</strong> A medical device company has three sales reps in the Phoenix
                      metro area. They need to divide the region into fair territories based on each rep&apos;s
                      home location.
                    </p>
                    <p className="text-slate-600 mb-3">
                      <strong>How to use:</strong> Add three circles — one for each rep&apos;s home address — each
                      with a 25-mile radius in different colors. The overlapping areas become shared territories;
                      non-overlapping areas are exclusive zones.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> Rep 1 (Scottsdale) covers the northeast, Rep 2 (Tempe) covers
                      central/southeast, Rep 3 (Glendale) covers the west. Combined coverage is <span className="font-semibold">~5,800 square miles</span>.
                      The exported KML file can be imported into their CRM for territory tracking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 5: Running/Fitness Distance Planning */}
              <div className="rounded-xl p-6 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">Fitness: Half-Marathon Training Route Planning</h3>
                    <p className="text-slate-600 mb-3">
                      <strong>Scenario:</strong> A runner training for a half marathon (13.1 miles) in Portland, OR
                      wants to visualize how far they could run from home in a straight line to understand
                      which landmarks they could reach.
                    </p>
                    <p className="text-slate-600 mb-3">
                      <strong>How to use:</strong> Enter home address in NE Portland, set radius to 6.5 miles
                      (half of 13.1 for an out-and-back route). The circle shows potential turnaround points:
                      downtown, St. Johns Bridge, Mt. Tabor, and Sellwood.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> The 6.5-mile radius reveals <span className="font-semibold">132 square miles</span> of
                      options. They can see that running to the Hawthorne Bridge and back is achievable,
                      helping plan routes that hit specific landmarks at the halfway point.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Population Density Context */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">What&apos;s Inside Your Radius? Population Context</h2>
            <p className="text-slate-700 mb-6">
              The same radius covers vastly different populations depending on location. Here&apos;s what a
              10-mile radius typically contains in different settings:
            </p>

            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Location Type</th>
                    <th>10-Mile Radius Area</th>
                    <th>Approx. Population</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dense Urban Core</td>
                    <td>314 sq mi</td>
                    <td>2-4 million</td>
                    <td>Manhattan, NYC</td>
                  </tr>
                  <tr>
                    <td>Major City</td>
                    <td>314 sq mi</td>
                    <td>500K - 1.5 million</td>
                    <td>Chicago Loop</td>
                  </tr>
                  <tr>
                    <td>Suburban Metro</td>
                    <td>314 sq mi</td>
                    <td>200K - 500K</td>
                    <td>Plano, TX</td>
                  </tr>
                  <tr>
                    <td>Small City</td>
                    <td>314 sq mi</td>
                    <td>50K - 150K</td>
                    <td>Boise, ID</td>
                  </tr>
                  <tr>
                    <td>Rural Area</td>
                    <td>314 sq mi</td>
                    <td>5K - 25K</td>
                    <td>Rural Kansas</td>
                  </tr>
                  <tr>
                    <td>Wilderness</td>
                    <td>314 sq mi</td>
                    <td>&lt; 1,000</td>
                    <td>Rural Montana</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-500 text-sm mt-4">
              <em>
                Population estimates are approximations. For precise demographic data within a radius,
                use our{' '}
                <Link href="/zip-code-radius" className="content-link">
                  zip code radius tool
                </Link>{' '}
                to get specific zip codes you can cross-reference with census data.
              </em>
            </p>
          </div>

          {/* Common Radius Use Cases by Industry */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Radius Maps by Industry</h2>
            <p className="text-slate-700 mb-6">
              Different industries use radius maps for specific purposes. Here are the most common
              radius distances by sector:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Most Common Radius by Industry</h3>
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
                <strong className="text-slate-900">Privacy-first.</strong> No Google tracking. Your map interactions stay in your browser.
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
            <h2 className="section-heading mb-6">Map With Radius vs. Other Radius Tools</h2>

            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Map With Radius</th>
                    <th>MapDevelopers</th>
                    <th>FreeMapTools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Map provider</td>
                    <td>OpenStreetMap (free)</td>
                    <td>Google Maps</td>
                    <td>Google Maps</td>
                  </tr>
                  <tr>
                    <td>Multiple circles</td>
                    <td className="text-green-600 font-medium">&#10003; Unlimited</td>
                    <td className="text-green-600">&#10003; Unlimited</td>
                    <td className="text-green-600">&#10003; Unlimited</td>
                  </tr>
                  <tr>
                    <td>Address search</td>
                    <td className="text-green-600 font-medium">&#10003; Free</td>
                    <td className="text-green-600">&#10003;</td>
                    <td className="text-red-600">&#10007; Coords only</td>
                  </tr>
                  <tr>
                    <td>Share via URL</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                    <td className="text-green-600">&#10003;</td>
                    <td className="text-green-600">&#10003;</td>
                  </tr>
                  <tr>
                    <td>Export KML</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                    <td className="text-red-600">&#10007;</td>
                    <td className="text-green-600">&#10003;</td>
                  </tr>
                  <tr>
                    <td>Export PNG</td>
                    <td className="text-green-600 font-medium">&#10003;</td>
                    <td className="text-red-600">&#10007;</td>
                    <td className="text-red-600">&#10007;</td>
                  </tr>
                  <tr>
                    <td>Mobile friendly</td>
                    <td className="text-green-600 font-medium">&#10003; Responsive</td>
                    <td className="text-yellow-600">Partial</td>
                    <td className="text-red-600">&#10007;</td>
                  </tr>
                  <tr>
                    <td>Usage limits</td>
                    <td className="font-medium">None</td>
                    <td>Google API limits</td>
                    <td>Google API limits</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td className="font-medium">Free</td>
                    <td>Free</td>
                    <td>Free</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-500 text-sm mt-4">
              <em>Data based on publicly available information. Last verified February 2026.</em>
            </p>

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
                  The radius uses the Haversine formula, which accounts for the Earth&apos;s curvature. At typical scales
                  (1–500 miles), accuracy is within a few meters. The circles represent straight-line distance, not road
                  distance.
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
                  text: "The radius uses the Haversine formula, which accounts for the Earth's curvature. At typical scales (1–500 miles), accuracy is within a few meters.",
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
