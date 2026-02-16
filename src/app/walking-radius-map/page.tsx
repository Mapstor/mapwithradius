import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Walking & Cycling Radius Map — How Far Can You Walk or Bike? (Free)',
  description: 'See how far you can walk or cycle in 5, 10, 15, or 30 minutes. Shows real walking/biking area based on actual roads and paths.',
  keywords: ['walking radius map', 'walking distance calculator', 'bike radius map', 'cycling distance map', '15 minute walk', '15 minute city', 'walkability map', 'isochrone map'],
  openGraph: {
    title: 'Walking & Cycling Radius Map — How Far Can You Walk or Bike? (Free)',
    description: 'See how far you can actually walk or cycle in a given time — based on real roads and paths.',
    url: 'https://mapwithradius.com/walking-radius-map',
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

export default function WalkingRadiusMapPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Walking & Cycling Radius Map',
            description: 'See how far you can walk or cycle in a given time based on real roads and paths.',
            url: 'https://mapwithradius.com/walking-radius-map',
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
              { '@type': 'ListItem', position: 2, name: 'Walking Radius Map', item: 'https://mapwithradius.com/walking-radius-map' },
            ],
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
            name: 'How to Create a Walking or Cycling Radius Map',
            description: 'Generate a walking or cycling isochrone showing the real area reachable on foot or by bike within a given time.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Enter your starting location',
                text: 'Type an address, city, or landmark in the search box or click directly on the map to set your starting point.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Choose walking or cycling mode',
                text: 'Select pedestrian (walking) or cycling mode to calculate routes appropriate for your travel method.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Set the travel time',
                text: 'Choose a time limit: 5, 10, 15, 20, or 30 minutes. The map will calculate how far you can travel.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'View your reachable area',
                text: 'The isochrone polygon shows the actual area you can reach, following real roads, paths, and sidewalks.',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Analyze accessibility',
                text: 'Explore what amenities, transit stops, parks, and services fall within your walking or cycling range.',
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
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Walking & Cycling Radius Map</h1>
            <p className="text-slate-300">
              See how far you can actually walk or cycle in a given time — based on real roads and paths.
            </p>
          </div>
        </div>

        {/* Map section - defaults to pedestrian mode, no driving option */}
        <div className="max-w-[1600px] mx-auto">
          <DriveTimeMap defaultMode="pedestrian" showDrivingOption={false} />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-8">How to Use the Walking Radius Map</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: 'Enter Location', desc: 'Search for any address or click on the map' },
              { step: 2, title: 'Choose Mode', desc: 'Select walking or cycling travel' },
              { step: 3, title: 'Set Time', desc: 'Pick 5, 10, 15, 20, or 30 minutes' },
              { step: 4, title: 'View Area', desc: 'See the reachable zone polygon' },
              { step: 5, title: 'Explore', desc: 'Check what\'s within your range' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Below the Fold */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Walking vs Radius */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Walking Radius vs. Straight-Line Radius</h2>
            <p className="text-slate-700 mb-4">
              A walking radius map shows the area you can actually reach on foot within a time limit — it
              follows sidewalks, paths, crosswalks, and walkable streets. A{' '}
              <Link href="/" className="content-link">straight-line radius</Link> shows a perfect circle
              based on distance &ldquo;as the crow flies.&rdquo;
            </p>
            <p className="text-slate-700 mb-6">
              The difference can be dramatic: a 15-minute walk might cover only 0.7 miles in a grid-pattern
              city, but the straight-line distance is roughly 1.2 km in every direction.
            </p>

            {/* Visual comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Walking Isochrone</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Follows actual sidewalks and paths
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Accounts for road network
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Realistic reachable area
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Irregular polygon shape
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Straight-Line Radius</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Perfect circle shape
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    &ldquo;As the crow flies&rdquo; distance
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Ignores obstacles & roads
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Good for coverage analysis
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How Walking Distance Is Calculated */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How Walking Distance Is Calculated</h2>
            <p className="text-slate-700 mb-4">
              The tool uses a default walking speed of 5 km/h (3.1 mph), which is a moderate pace for an
              average adult. It routes along pedestrian-accessible paths from OpenStreetMap data, excluding
              highways, motorways, and roads without sidewalks where applicable.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              <strong>Factors that affect your actual walking radius:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Terrain and elevation changes</li>
                <li>Traffic signals and crosswalks (tool does not account for wait times)</li>
                <li>Weather conditions</li>
                <li>Personal walking speed and fitness level</li>
                <li>Carrying loads (groceries, backpack, etc.)</li>
              </ul>
            </div>
          </div>

          {/* How Cycling Distance Is Calculated */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How Cycling Distance Is Calculated</h2>
            <p className="text-slate-700 mb-4">
              The cycling mode uses a default speed of 15 km/h (9.3 mph) and prioritizes bike lanes,
              cycling paths, and bike-friendly roads. It avoids highways and roads typically closed to
              cyclists.
            </p>
            <p className="text-slate-700">
              This speed represents a comfortable cruising pace for most recreational cyclists. Commuters on
              road bikes may travel faster (20-25 km/h), while those on heavy city bikes with cargo may be
              slower (10-12 km/h).
            </p>
          </div>
        </div>
      </section>

      {/* Walking & Cycling Speed Reference */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-8">Walking & Cycling Speed Reference</h2>

          {/* Speed Comparison Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Walking Speeds */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Walking Speeds by Type
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Slow stroll', speed: '3.2 km/h', mph: '2.0 mph', pct: 40 },
                  { label: 'Casual walk', speed: '4.0 km/h', mph: '2.5 mph', pct: 50 },
                  { label: 'Normal pace', speed: '5.0 km/h', mph: '3.1 mph', pct: 63, highlight: true },
                  { label: 'Brisk walk', speed: '6.4 km/h', mph: '4.0 mph', pct: 80 },
                  { label: 'Power walk', speed: '8.0 km/h', mph: '5.0 mph', pct: 100 },
                ].map(({ label, speed, mph, pct, highlight }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={highlight ? 'font-semibold text-green-700' : 'text-slate-600'}>
                        {label} {highlight && '(default)'}
                      </span>
                      <span className="text-slate-500">{speed} / {mph}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${highlight ? 'bg-green-500' : 'bg-green-300'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cycling Speeds */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cycling Speeds by Type
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Casual city bike', speed: '12 km/h', mph: '7.5 mph', pct: 40 },
                  { label: 'Commuter pace', speed: '15 km/h', mph: '9.3 mph', pct: 50, highlight: true },
                  { label: 'Fitness cycling', speed: '20 km/h', mph: '12.4 mph', pct: 67 },
                  { label: 'Road bike', speed: '25 km/h', mph: '15.5 mph', pct: 83 },
                  { label: 'Fast road bike', speed: '30 km/h', mph: '18.6 mph', pct: 100 },
                ].map(({ label, speed, mph, pct, highlight }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={highlight ? 'font-semibold text-blue-700' : 'text-slate-600'}>
                        {label} {highlight && '(default)'}
                      </span>
                      <span className="text-slate-500">{speed} / {mph}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${highlight ? 'bg-blue-500' : 'bg-blue-300'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Distance by Time Table */}
          <h3 className="font-semibold text-slate-900 mb-4">Distance Covered by Time</h3>
          <div className="overflow-x-auto mb-8">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Walking (5 km/h)</th>
                  <th>Brisk Walk (6.4 km/h)</th>
                  <th>Cycling (15 km/h)</th>
                  <th>Fast Cycling (25 km/h)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">5 min</td>
                  <td>420 m (0.26 mi)</td>
                  <td>530 m (0.33 mi)</td>
                  <td>1.25 km (0.78 mi)</td>
                  <td>2.1 km (1.3 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">10 min</td>
                  <td>830 m (0.52 mi)</td>
                  <td>1.1 km (0.67 mi)</td>
                  <td>2.5 km (1.55 mi)</td>
                  <td>4.2 km (2.6 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">15 min</td>
                  <td>1.25 km (0.78 mi)</td>
                  <td>1.6 km (1.0 mi)</td>
                  <td>3.75 km (2.3 mi)</td>
                  <td>6.25 km (3.9 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">20 min</td>
                  <td>1.67 km (1.04 mi)</td>
                  <td>2.1 km (1.3 mi)</td>
                  <td>5.0 km (3.1 mi)</td>
                  <td>8.3 km (5.2 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">30 min</td>
                  <td>2.5 km (1.55 mi)</td>
                  <td>3.2 km (2.0 mi)</td>
                  <td>7.5 km (4.7 mi)</td>
                  <td>12.5 km (7.8 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">45 min</td>
                  <td>3.75 km (2.3 mi)</td>
                  <td>4.8 km (3.0 mi)</td>
                  <td>11.25 km (7.0 mi)</td>
                  <td>18.75 km (11.6 mi)</td>
                </tr>
                <tr>
                  <td className="font-medium">60 min</td>
                  <td>5.0 km (3.1 mi)</td>
                  <td>6.4 km (4.0 mi)</td>
                  <td>15 km (9.3 mi)</td>
                  <td>25 km (15.5 mi)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">5 km/h</div>
              <div className="text-sm text-green-600">Average walk speed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">15 km/h</div>
              <div className="text-sm text-blue-600">Average bike speed</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-700">1.25 km</div>
              <div className="text-sm text-amber-600">15-min walk distance</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">3x</div>
              <div className="text-sm text-purple-600">Cycling vs walking</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 15-Minute City Concept */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">The 15-Minute City Concept</h2>
          <p className="text-slate-700 mb-4">
            Urban planners frequently use the &ldquo;15-minute city&rdquo; concept — the idea that
            essential services (grocery, school, healthcare, transit) should be within a 15-minute walk
            or bike ride. This planning philosophy promotes walkable, sustainable neighborhoods.
          </p>
          <p className="text-slate-700 mb-6">
            A 15-minute walking isochrone from your home shows what you can access on foot and is a useful
            way to evaluate neighborhood walkability before moving or investing.
          </p>

          {/* 15-Minute City Amenities */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">What Should Be Within 15 Minutes?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🛒', name: 'Grocery store', importance: 'Essential' },
                { icon: '🏥', name: 'Pharmacy/Healthcare', importance: 'Essential' },
                { icon: '🚌', name: 'Public transit stop', importance: 'Essential' },
                { icon: '🏫', name: 'School (if applicable)', importance: 'Essential' },
                { icon: '🌳', name: 'Park or green space', importance: 'Important' },
                { icon: '☕', name: 'Coffee shop/Café', importance: 'Nice to have' },
                { icon: '🏋️', name: 'Gym or fitness', importance: 'Nice to have' },
                { icon: '🍕', name: 'Restaurants', importance: 'Nice to have' },
              ].map(({ icon, name, importance }) => (
                <div key={name} className="flex items-center gap-3 p-2">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-medium text-slate-900">{name}</div>
                    <div className={`text-xs ${importance === 'Essential' ? 'text-green-600' : importance === 'Important' ? 'text-blue-600' : 'text-slate-500'}`}>
                      {importance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-4">Real-World Examples</h2>
          <p className="text-center text-slate-600 mb-8">
            See how people use walking and cycling radius maps in practice
          </p>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Apartment Hunting Walkability Check</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Scenario:</strong> Sarah is moving to Chicago and doesn&apos;t own a car. She needs to find
                    an apartment where she can walk to work, grocery stores, and the L train.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2"><strong>How she uses the tool:</strong></p>
                    <ol className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                      <li>Enters potential apartment addresses one by one</li>
                      <li>Sets 15-minute walking radius for each</li>
                      <li>Checks if her office, Trader Joe&apos;s, and Clark/Lake station fall within range</li>
                      <li>Compares multiple apartments to find the most walkable option</li>
                    </ol>
                    <p className="text-sm text-green-700 mt-3 font-medium">
                      Result: Found a studio in Lincoln Park with all essentials within 12-minute walk
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Urban Planning: 15-Minute City Analysis</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Scenario:</strong> The Portland city planning department is evaluating which neighborhoods
                    meet 15-minute city criteria and which need more pedestrian-accessible amenities.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2"><strong>How they use the tool:</strong></p>
                    <ol className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                      <li>Generate 15-minute walking isochrones from residential block centers</li>
                      <li>Overlay with grocery stores, schools, parks, and transit stops</li>
                      <li>Identify &ldquo;service deserts&rdquo; where residents lack walkable access</li>
                      <li>Prioritize infrastructure investment in underserved areas</li>
                    </ol>
                    <p className="text-sm text-blue-700 mt-3 font-medium">
                      Result: Identified 12 census tracts needing walkable grocery access
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">School Commute Safety Planning</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Scenario:</strong> Parents in a Denver suburb want to determine if their elementary school
                    is within safe walking distance for their 8-year-old.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2"><strong>How they use the tool:</strong></p>
                    <ol className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                      <li>Enter their home address as the starting point</li>
                      <li>Set a 20-minute walking radius (conservative for a child)</li>
                      <li>Check if school is within the isochrone boundary</li>
                      <li>Trace the actual walking route along sidewalks and crosswalks</li>
                    </ol>
                    <p className="text-sm text-amber-700 mt-3 font-medium">
                      Result: School is 0.6 miles away, 14-minute walk with sidewalks the entire route
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 4 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Transit Accessibility Study</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Scenario:</strong> A transportation researcher in Boston is analyzing how many residents
                    can reach subway stations on foot versus needing a bus connection.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2"><strong>How they use the tool:</strong></p>
                    <ol className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                      <li>Generate 10-minute walking isochrones from each MBTA station</li>
                      <li>Overlay with census population data</li>
                      <li>Calculate percentage of population within walking distance</li>
                      <li>Compare coverage across different neighborhoods</li>
                    </ol>
                    <p className="text-sm text-purple-700 mt-3 font-medium">
                      Result: 62% of residents in the study area can walk to a subway station in 10 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 5 */}
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 border border-cyan-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Bike Commute Planning</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Scenario:</strong> Marcus lives in San Francisco and wants to know what job opportunities
                    are within a 20-minute bike commute from his apartment in the Mission District.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2"><strong>How he uses the tool:</strong></p>
                    <ol className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                      <li>Enters his apartment address on Valencia Street</li>
                      <li>Switches to cycling mode and sets 20-minute radius</li>
                      <li>Notes that downtown, SOMA, and Potrero Hill are all within range</li>
                      <li>Expands search to 30 minutes to include more tech campuses</li>
                    </ol>
                    <p className="text-sm text-cyan-700 mt-3 font-medium">
                      Result: 20-minute bike commute covers Financial District, SOMA, and most of downtown SF
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Walkability Comparison */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-4">Walkability by City Type</h2>
          <p className="text-center text-slate-600 mb-8">
            How far a 15-minute walk gets you varies dramatically by urban layout
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>City Type</th>
                  <th>Example Cities</th>
                  <th>15-Min Walk Covers</th>
                  <th>Walk Score Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Dense Grid</td>
                  <td>Manhattan, Chicago Loop, SF Downtown</td>
                  <td>~1.0 km (12+ blocks)</td>
                  <td>90-100</td>
                </tr>
                <tr>
                  <td className="font-medium">Mixed Urban</td>
                  <td>Boston, Seattle, Portland</td>
                  <td>~1.1 km</td>
                  <td>70-90</td>
                </tr>
                <tr>
                  <td className="font-medium">Traditional Suburbs</td>
                  <td>Older East Coast suburbs</td>
                  <td>~1.0 km</td>
                  <td>50-70</td>
                </tr>
                <tr>
                  <td className="font-medium">Car-Oriented Suburbs</td>
                  <td>Most Sun Belt suburbs</td>
                  <td>~0.8 km (limited paths)</td>
                  <td>25-50</td>
                </tr>
                <tr>
                  <td className="font-medium">Sprawl/Exurbs</td>
                  <td>Outer Phoenix, Houston sprawl</td>
                  <td>~0.6 km (few sidewalks)</td>
                  <td>0-25</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual Chart - Effective Walking Distance */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Effective 15-Minute Walking Distance by Layout</h3>
            <div className="space-y-4">
              {[
                { layout: 'Perfect grid (Manhattan)', distance: '1.25 km', pct: 100, color: 'bg-green-500' },
                { layout: 'Mixed grid (Boston)', distance: '1.1 km', pct: 88, color: 'bg-green-400' },
                { layout: 'Curved suburban streets', distance: '0.95 km', pct: 76, color: 'bg-yellow-400' },
                { layout: 'Cul-de-sac suburbs', distance: '0.7 km', pct: 56, color: 'bg-orange-400' },
                { layout: 'No sidewalks/highways', distance: '0.4 km', pct: 32, color: 'bg-red-400' },
              ].map(({ layout, distance, pct, color }) => (
                <div key={layout}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{layout}</span>
                    <span className="text-slate-500 font-medium">{distance}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              * Based on 5 km/h walking speed. Actual coverage varies by specific location and pedestrian infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Health Benefits of Walking & Cycling</h2>
          <p className="text-slate-700 mb-6">
            Understanding your walkable and bikeable range isn&apos;t just about convenience — it&apos;s about
            building sustainable exercise into daily life. Research shows that people in walkable neighborhoods
            get significantly more physical activity.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Walking Benefits</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Burns ~100 calories per mile</li>
                <li>• Reduces heart disease risk by 30%+</li>
                <li>• Improves mental health & mood</li>
                <li>• Zero equipment needed</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Cycling Benefits</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Burns ~50 calories per mile</li>
                <li>• Low-impact on joints</li>
                <li>• 3x faster than walking</li>
                <li>• Can replace short car trips</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-100 rounded-lg p-4 text-sm text-slate-700">
            <strong>Daily activity target:</strong> The CDC recommends 150 minutes of moderate activity per week.
            A 15-minute walk each way to work equals 150 minutes/week — meeting the entire recommendation just
            from your commute.
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
                Can I change the walking speed?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The default is 5 km/h (3.1 mph), which represents a moderate walking pace for an average adult.
                Speed adjustment may be added based on user feedback. For now, you can mentally adjust: a 20-minute
                walk at 5 km/h equals roughly a 15-minute walk at 6.5 km/h (brisk pace).
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this account for hills and elevation?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The routing follows real roads and paths, but uses flat-terrain speed estimates. In hilly cities
                like San Francisco or Seattle, your actual walking speed uphill may be 30-50% slower. Consider
                adding extra time for steep routes.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What paths does the walking mode include?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The walking mode includes sidewalks, pedestrian paths, crosswalks, parks, trails, and walkable
                streets from OpenStreetMap data. It excludes highways, motorways, and roads marked as
                non-pedestrian accessible. Coverage depends on how well-mapped your area is in OpenStreetMap.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is this useful for real estate or apartment hunting?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. A 15-minute walking radius from a potential home shows what amenities, transit stops,
                and services you can access on foot. This is one of the most practical ways to evaluate
                neighborhood walkability before signing a lease or making an offer.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How accurate is the cycling mode for e-bikes?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The default cycling speed (15 km/h) represents a regular bike at a comfortable pace. E-bikes
                typically travel at 20-25 km/h, meaning you&apos;d cover roughly 40-60% more distance in the same
                time. A 15-minute cycling isochrone for an e-bike would be closer to a 25-minute regular bike
                isochrone.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does this account for traffic signals and crosswalks?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No, the tool does not factor in wait times at traffic signals or crosswalks. In urban areas
                with many intersections, you may want to add 10-20% to your estimated walking time to account
                for waiting at lights.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the difference between walking isochrone and radius?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                A walking isochrone (this tool) shows the actual area reachable by walking along real streets
                and paths — it&apos;s an irregular polygon. A <Link href="/" className="content-link">straight-line radius</Link> is
                a perfect circle showing distance &ldquo;as the crow flies&rdquo; regardless of roads. The isochrone
                is more accurate for planning, while the radius is simpler for coverage analysis.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use this for running or jogging routes?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes, but you&apos;ll need to adjust for running speed. Average jogging is about 8-10 km/h,
                roughly 2x walking speed. So a 15-minute walking isochrone approximates a 7-8 minute jogging
                range, or use the cycling mode (15 km/h) for a faster estimate.
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
                    name: 'Can I change the walking speed?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The default is 5 km/h (3.1 mph), which represents a moderate walking pace. Speed adjustment may be added based on user feedback.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this account for hills and elevation?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The routing follows real roads and paths, but uses flat-terrain speed estimates. In hilly cities, your actual walking speed uphill may be 30-50% slower.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What paths does the walking mode include?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The walking mode includes sidewalks, pedestrian paths, crosswalks, parks, and walkable streets from OpenStreetMap data. It excludes highways and roads marked as non-pedestrian accessible.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is this useful for real estate or apartment hunting?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. A 15-minute walking radius from a potential home shows what amenities, transit stops, and services you can access on foot.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How accurate is the cycling mode for e-bikes?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The default cycling speed (15 km/h) represents a regular bike. E-bikes typically travel at 20-25 km/h, covering 40-60% more distance in the same time.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this account for traffic signals and crosswalks?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No, the tool does not factor in wait times at traffic signals or crosswalks. In urban areas, you may want to add 10-20% to your estimated walking time.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the difference between walking isochrone and radius?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A walking isochrone shows the actual area reachable by walking along real streets and paths. A straight-line radius is a perfect circle showing distance as the crow flies regardless of roads.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use this for running or jogging routes?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, but adjust for running speed. Average jogging is about 8-10 km/h, roughly 2x walking speed. A 15-minute walking isochrone approximates a 7-8 minute jogging range.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* More Map Tools */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-8">More Map Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">Radius Map</span>
              </div>
              <p className="text-sm text-slate-600">Draw circles on any map location</p>
            </Link>

            <Link
              href="/drive-time-map"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">Drive Time Map</span>
              </div>
              <p className="text-sm text-slate-600">See driving distance by time</p>
            </Link>

            <Link
              href="/zip-code-radius"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">Zip Code Radius</span>
              </div>
              <p className="text-sm text-slate-600">Find zip codes within distance</p>
            </Link>

            <Link
              href="/km-radius-map"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">KM Radius Map</span>
              </div>
              <p className="text-sm text-slate-600">Metric distance circles</p>
            </Link>

            <Link
              href="/distance-calculator"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">Distance Calculator</span>
              </div>
              <p className="text-sm text-slate-600">Measure between two points</p>
            </Link>

            <Link
              href="/radius-on-google-maps"
              className="block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-medium text-slate-900">Radius Guide</span>
              </div>
              <p className="text-sm text-slate-600">How to draw radius on maps</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Links */}
      <section className="section-gray py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/drive-time-map" className="content-link">
              Drive time map &rarr;
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/distance-calculator" className="content-link">
              Distance calculator &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
