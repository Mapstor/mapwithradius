import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Walking & Cycling Radius Map (Free)',
  description: 'See how far you can walk or cycle in 5, 10, 15, or 30 minutes. Shows real walking/biking area based on actual roads and paths.',
  alternates: {
    canonical: '/walking-radius-map',
  },
  keywords: ['walking radius map', 'walking distance calculator', 'bike radius map', 'cycling distance map', '15 minute walk', '15 minute city', 'walkability map', 'isochrone map'],
  openGraph: {
    title: 'Walking & Cycling Radius Map — How Far Can You Walk or Bike? (Free)',
    description: 'See how far you can actually walk or cycle in a given time — based on real roads and paths.',
    url: 'https://mapwithradius.com/walking-radius-map',
    images: OG_IMAGES,
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
        <div className="bg-primary-900 py-3 lg:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Walking & Cycling Radius Map</h1>
            <p className="text-slate-300 hidden lg:block">
              See how far you can actually walk or cycle in a given time — based on real roads and paths.
            </p>
          </div>
        </div>

        {/* Map section - defaults to pedestrian mode, no driving option */}
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <DriveTimeMap defaultMode="pedestrian" showDrivingOption={false} />
        </div>
      </section>

      {/* Byline + intro */}
      <section className="section-white py-10 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-slate-500 mb-6 pb-6 border-b border-slate-200">
            By the Map With Radius editorial team · Last reviewed 29 May 2026
          </div>
          <h2 className="section-heading mb-4">Why pedestrian and cycling isochrones are different</h2>
          <p className="text-slate-700 mb-4">
            A walking or cycling isochrone is not just a slower drive-time map. The way a
            pedestrian or cyclist experiences distance is governed by a different set of variables —
            sidewalk completeness, signal-crossing waits, hill grade, perceived safety, and the
            walker&apos;s own physical profile. A 15-minute walking radius drawn naively as
            &ldquo;5&nbsp;km/h × 15&nbsp;min = 1.25&nbsp;km&rdquo; overstates reachable area in most
            real cities by 20&ndash;40%. This page is the reference material for using the tool
            above with that nuance.
          </p>
          <p className="text-slate-700">
            For straight-line radii or driving isochrones, see the{' '}
            <Link href="/" className="content-link">main radius tool</Link>{' '}
            or <Link href="/drive-time-map" className="content-link">drive time map</Link>.
          </p>
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
            <h2 className="section-heading mb-6">How walking distance is calculated</h2>
            <p className="text-slate-700 mb-4">
              The tool uses a default walking speed of 5&nbsp;km/h (3.1&nbsp;mph) and routes along
              pedestrian-accessible paths from OpenStreetMap data — sidewalks, pedestrian streets,
              shared paths, and quiet residential streets where sidewalks are implied. It excludes
              motorways, highway shoulders, and roads explicitly tagged as foot-prohibited.
            </p>
            <p className="text-slate-700 mb-4">
              That 5&nbsp;km/h figure is the average from multiple international studies and is the
              speed embedded in most planning standards (the 15-minute city framework, the EU&apos;s
              urban accessibility metrics, the Japanese 80&nbsp;m/min property-listing pace). But
              the actual distance a real pedestrian covers in 15 minutes deviates from the
              theoretical 1.25&nbsp;km for at least five reasons that the tool can&apos;t model
              from OSM data alone:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Signal-crossing wait times.</strong> Manhattan&apos;s average pedestrian
                wait at a signalised crossing is 22&nbsp;seconds; central Tokyo&apos;s is
                15&nbsp;seconds; a sprawled US suburb with a single pedestrian-actuated signal
                can hit 90&nbsp;seconds. Across a 15-minute walk that&apos;s 5&ndash;10%
                effective time loss.
              </li>
              <li>
                <strong>Sidewalk completeness.</strong> OSM tags
                <code> sidewalk=*</code> when known, but coverage is uneven. In US car-oriented
                suburbs, missing-sidewalk segments force long detours; in dense European centres
                the network is effectively complete and the isochrone matches reality.
              </li>
              <li>
                <strong>Hill grade and Tobler&apos;s hiking function.</strong> Tobler&apos;s
                empirical function gives walking speed as 6·exp(&minus;3.5·|slope&nbsp;+&nbsp;0.05|)
                km/h. A 5% incline drops speed from 5&nbsp;km/h to ~3.5&nbsp;km/h; 10% drops it to
                ~2.5&nbsp;km/h. San Francisco isochrones drawn at flat 5&nbsp;km/h overstate reach
                up Russian Hill by 30&nbsp;m for every metre climbed.
              </li>
              <li>
                <strong>Perceived safety detours.</strong> Real pedestrians avoid unlit
                underpasses, freeway underbridges, and high-traffic arterials at night, even if
                they&apos;re technically walkable. Active Living Research surveys consistently
                show real route choice diverges 10&ndash;25% longer than shortest-path during
                evening hours.
              </li>
              <li>
                <strong>Personal speed.</strong> Studies of crowd-level pedestrian speed (Knoblauch
                1996, TRB) find the 15th-percentile walker is at 1.0&nbsp;m/s (3.6&nbsp;km/h) while
                the 85th-percentile is at 1.5&nbsp;m/s (5.4&nbsp;km/h). The 5&nbsp;km/h default is
                approximately the mean, not the lower bound.
              </li>
            </ul>
            <p className="text-slate-700">
              Practical implication: a 15-minute walking circle drawn here is best read as
              &ldquo;the area a healthy adult can reach in 15 minutes on a complete sidewalk
              network with no signals or hills.&rdquo; In real cities, subtract 20&ndash;40%
              from the radius value for a defensible accessibility estimate, especially for
              service-area or school-zone planning.
            </p>
          </div>

          {/* Pedestrian profiles */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Pedestrian profiles: not every walker is &ldquo;average&rdquo;</h2>
            <p className="text-slate-700 mb-4">
              The 5&nbsp;km/h default is the working assumption for healthy adult walkers. For
              accessibility, public-health, or school-catchment analysis, you usually want to model
              the slower walker, not the average one — because policy decisions made at the
              average speed exclude the people who most need the access. Reference values from the
              transportation-engineering and gerontology literature:
            </p>
            <div className="overflow-x-auto">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Walker profile</th>
                    <th>Typical speed</th>
                    <th>15-min reach</th>
                    <th>Source / context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Healthy adult (default)</td>
                    <td>5.0 km/h</td>
                    <td>1.25 km</td>
                    <td>WHO / 15-minute city</td>
                  </tr>
                  <tr>
                    <td>Older adult, 65+</td>
                    <td>3.6 km/h</td>
                    <td>900 m</td>
                    <td>Gerontology literature</td>
                  </tr>
                  <tr>
                    <td>Adult with stroller</td>
                    <td>3.8 km/h</td>
                    <td>950 m</td>
                    <td>Family-mobility studies</td>
                  </tr>
                  <tr>
                    <td>Child 5&ndash;10 with adult</td>
                    <td>3.2 km/h</td>
                    <td>800 m</td>
                    <td>Safe Routes to School</td>
                  </tr>
                  <tr>
                    <td>Manual wheelchair user, flat</td>
                    <td>3.6&ndash;5.4 km/h</td>
                    <td>900 m&ndash;1.35 km</td>
                    <td>Disability-mobility research</td>
                  </tr>
                  <tr>
                    <td>Adult with mobility aid (cane)</td>
                    <td>2.5&ndash;3.5 km/h</td>
                    <td>625&ndash;875 m</td>
                    <td>Pedestrian Signal Timing Guide (FHWA)</td>
                  </tr>
                  <tr>
                    <td>Brisk fitness walk</td>
                    <td>6.4 km/h</td>
                    <td>1.6 km</td>
                    <td>Cardiovascular target zone</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-700 mt-4">
              If you&apos;re designing for inclusive accessibility, use 3.6&nbsp;km/h as the
              planning value, not 5. The 0.9&nbsp;km/15&nbsp;min reach should be the standard
              against which you draw school catchments, senior-housing accessibility, and
              health-clinic walkable zones.
            </p>
          </div>

          {/* How Cycling Distance Is Calculated */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How cycling distance is calculated</h2>
            <p className="text-slate-700 mb-4">
              The cycling mode uses a default speed of 15&nbsp;km/h (9.3&nbsp;mph) and prefers
              OSM-tagged cycle infrastructure: protected lanes, cycle paths, bike-friendly
              residential streets. It avoids motorways and routes the cyclist around them rather
              than through them.
            </p>
            <p className="text-slate-700 mb-4">
              15&nbsp;km/h is the cruising pace of an unhurried commuter on a hybrid or city
              bike. The cycling-speed literature shows a much wider distribution than walking,
              driven by three factors:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Equipment.</strong> A heavy Dutch omafiets carrying groceries cruises at
                12&nbsp;km/h; a road bike with clipless pedals on the same route does 25&nbsp;km/h.
                E-bikes with pedal assist (legal limit 25&nbsp;km/h EU / 20&nbsp;mph US) effectively
                let any rider hit the upper end. The default isochrone is approximately the speed
                of a Class&nbsp;1 e-bike, which is becoming the modal urban bike in 2026 fleets.
              </li>
              <li>
                <strong>Infrastructure quality.</strong> Protected lanes raise average speed by
                20&ndash;30% because cyclists don&apos;t need to slow at every intersection.
                Painted-only bike lanes provide negligible speed benefit; sharrows provide none.
                Copenhagen and Amsterdam consistently model cyclist speed at 18&ndash;20&nbsp;km/h;
                US cities without protected infrastructure assume 13&ndash;15&nbsp;km/h.
              </li>
              <li>
                <strong>Gradient sensitivity.</strong> Cyclists lose more time to climbs than
                walkers (in relative terms). A 4% grade roughly halves a casual cyclist&apos;s
                speed; the same grade drops a walker by ~30%. For hilly cities like San Francisco,
                Lisbon, or Wellington, the cycling isochrone you draw at flat 15&nbsp;km/h is
                meaningfully optimistic.
              </li>
            </ul>
            <p className="text-slate-700">
              For analyses that need to distinguish commuter pace from e-bike pace from
              recreational pace, model three different speeds (12, 18, 25&nbsp;km/h) and compare
              their isochrones rather than relying on a single default.
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

          <p className="text-slate-700 mt-6 mb-3">
            The framework has critics worth taking seriously. Critics on the planning-research
            side argue 15 minutes is too permissive for genuine accessibility — Carlos
            Moreno&apos;s original work proposed a tighter 5-minute &ldquo;chrono-urbanism&rdquo;
            target for the core daily needs. Critics on the political side note that 15-minute
            cities have been mischaracterised online as movement-restriction schemes, which they
            are not; the framework is purely about co-locating amenities, not constraining
            travel. Both critiques are worth knowing before citing the framework in a planning
            document.
          </p>
        </div>
      </section>

      {/* Public health: 10-minute walk to park */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">The 10-minute-walk-to-park standard in public health</h2>
          <p className="text-slate-700 mb-4">
            Independent of the 15-minute city framework, the public-health and parks-policy
            literature has converged on a tighter walking-radius benchmark: every resident should
            live within a 10-minute walk (roughly 800&nbsp;m) of a public park or green space.
            This is the explicit policy goal of the Trust for Public Land&apos;s 10-Minute Walk
            Campaign, adopted by over 300 US mayors, and underpins the World Health
            Organization&apos;s urban green-space recommendations.
          </p>
          <p className="text-slate-700 mb-4">
            The 800&nbsp;m figure is grounded in epidemiological research. Studies in the
            <em> American Journal of Preventive Medicine</em> and similar journals consistently
            find that park usage drops sharply beyond a 10-minute walking radius — visitors who
            live within 800&nbsp;m use parks 4&times; as often as those living 1.5&nbsp;km away,
            controlling for income and demographics. The 800&nbsp;m radius is the operational
            threshold below which park access produces measurable cardiovascular and mental-health
            benefits at population scale.
          </p>
          <p className="text-slate-700 mb-4">
            Practical use of the tool: draw a walking isochrone or 800&nbsp;m straight-line
            radius around each park in a target neighbourhood. The fraction of the neighbourhood
            <em> outside</em> any of these circles is the park-access deficit. For an equity
            analysis, overlay the deficit map with demographics (which neighbourhoods have park
            access; which don&apos;t). This is the standard methodology used by the Trust for
            Public Land&apos;s ParkScore index, by the WHO&apos;s Urban Health Initiative, and
            by most municipal parks-strategic-plan documents in 2024&ndash;2026.
          </p>
          <p className="text-slate-700">
            Note the distinction from the 15-minute framework: the 10-minute-to-park standard
            applies <em>only</em> to green space, not to general amenities, and uses 800&nbsp;m
            (not 1.25&nbsp;km) as the threshold because health research is more sensitive to
            distance than amenity-co-location research.
          </p>
        </div>
      </section>

      {/* School walkability and Safe Routes */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">School walkability and Safe Routes to School</h2>
          <p className="text-slate-700 mb-4">
            School catchment analysis is the single most common use of walking radius tools by
            non-specialists. The questions parents and planners ask: how far can a 7-year-old
            actually walk to school? What proportion of the school district lives close enough
            to walk? Which crossings need investment to make walking viable?
          </p>
          <p className="text-slate-700 mb-4">
            The reference standards differ by country. US Safe Routes to School treats a half-mile
            (800&nbsp;m) as the &ldquo;walkable&rdquo; threshold for elementary, and a mile
            (1.6&nbsp;km) for middle school. Australian school-zone standards in most states use a
            1.6&nbsp;km radius. UK guidance from the Department for Education uses a tiered
            approach: 3&nbsp;km for primary, 4.8&nbsp;km for secondary, but these are
            transport-eligibility thresholds, not walkability assessments. Japan uses
            2&nbsp;km tsugakku (通学区) boundaries that are nearly always pedestrian.
          </p>
          <p className="text-slate-700 mb-4">
            When you use the tool for a school-walkability check, three modelling choices matter:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>
              <strong>Use child walking speed, not adult.</strong> 3.2&nbsp;km/h for elementary,
              not the default 5&nbsp;km/h. The 15-minute reach drops from 1.25&nbsp;km to 800&nbsp;m.
            </li>
            <li>
              <strong>Include the worst crossing in the route.</strong> Active-transport research
              shows parents&apos; decision to allow walking is dominated by the single worst
              intersection along the route, not the average. A walkable isochrone that crosses an
              unsignalised four-lane arterial is not effectively walkable for an 8-year-old, even
              if the total distance is acceptable.
            </li>
            <li>
              <strong>Layer in time-of-day constraints.</strong> Many school-walk routes are only
              accessible during daylight, which excludes morning starts in northern-latitude
              winters. The walking-radius tool draws a geometric isochrone; the operationally
              walkable subset is smaller during dark months.
            </li>
          </ul>
          <p className="text-slate-700">
            For municipal-scale Safe Routes planning, the walking radius is the screening step.
            Routes inside the radius are candidates; the next step is auditing each candidate
            route&apos;s intersection safety, sidewalk presence, and grade. Tools like this one
            don&apos;t replace that audit — they tell you which routes are worth auditing.
          </p>
        </div>
      </section>

      {/* Walk Score and Bike Score */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Walk Score, Bike Score, and what they measure</h2>
          <p className="text-slate-700 mb-4">
            Walk Score (and its siblings Bike Score and Transit Score) is the most widely cited
            third-party walkability metric in US real estate listings. Owned by Redfin since 2014,
            it produces a 0&ndash;100 score for any address by measuring walking distance to
            amenities across nine categories: grocery, restaurants, shopping, errands, parks,
            schools, culture/entertainment, coffee, and banks. Distances are decay-weighted: an
            amenity within 400&nbsp;m counts at full weight, dropping to zero at 1.6&nbsp;km.
          </p>
          <p className="text-slate-700 mb-4">
            What Walk Score does well: it&apos;s a standardised, comparable score that surfaces
            differences between neighbourhoods that would otherwise be hard to quantify. A score
            of 90+ (&ldquo;Walker&apos;s Paradise&rdquo;) reliably identifies dense, mixed-use
            urban cores; a score under 25 (&ldquo;Car-Dependent&rdquo;) reliably identifies
            exurban or rural patterns.
          </p>
          <p className="text-slate-700 mb-4">
            What it doesn&apos;t do: it treats every category as equally important, which
            doesn&apos;t match how individual households weight access (a family with school-age
            children weights school proximity much higher than a young couple does). It also
            assumes amenity density at the destination, not the quality of the walking
            infrastructure along the way — a Walk Score of 85 can describe a neighbourhood with
            many amenities but no sidewalks, which is not walkable in practice. The walking
            radius tool above is complementary: Walk Score answers &ldquo;what&apos;s near
            here?&rdquo;; the isochrone answers &ldquo;what can I actually reach on foot?&rdquo;
          </p>
          <p className="text-slate-700">
            Bike Score uses similar methodology over a longer radius, weighting protected
            infrastructure, hill grade, and amenity density. It correlates strongly with actual
            bike-commute mode share in cities where it&apos;s been validated against census data.
          </p>
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

      {/* Methodology and sources */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Methodology and sources</h2>
          <p className="text-slate-700 mb-4">
            Speed assumptions, walkability standards, and demographic figures on this page are
            drawn from publicly available planning and public-health literature. Where a specific
            value is cited, the underlying source is listed below so you can confirm the figure
            against the primary document.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
            <li>
              Tobler, W. (1993). <em>Three Presentations on Geographical Analysis and Modeling.</em>{' '}
              UCSB &mdash; source for the hiking function used in hill-grade modelling.
            </li>
            <li>
              Knoblauch, R. L., et&nbsp;al. (1996). <em>Field Studies of Pedestrian Walking
              Speed and Start-Up Time.</em> Transportation Research Record &mdash; source for the
              15th/85th percentile pedestrian speed distribution.
            </li>
            <li>
              Federal Highway Administration (US), <em>Pedestrian Signal Timing Guide</em> &mdash; source for
              walker-with-mobility-aid speed values.
            </li>
            <li>
              Trust for Public Land, <em>10-Minute Walk Campaign</em> and <em>ParkScore Index
              Methodology</em> &mdash; source for the 800&nbsp;m park-access threshold and equity overlay
              methodology.
            </li>
            <li>
              Carlos Moreno, <em>The 15-Minute City</em> (2016) and subsequent publications via
              the Sorbonne / IAE Paris &mdash; source for the chrono-urbanism framework.
            </li>
            <li>
              National Center for Safe Routes to School (US) and equivalent national programs
              (Living Streets UK, VicHealth Active Travel AU) &mdash; source for school-walking-distance
              standards by age group.
            </li>
            <li>
              Walk Score / Redfin, public methodology documentation &mdash; source for amenity-decay
              weighting and category coverage.
            </li>
            <li>
              World Health Organization, <em>Urban Green Spaces and Health</em> (2016, with 2024
              updates) &mdash; source for population-scale health benefits of park access.
            </li>
            <li>
              OpenStreetMap pedestrian and bicycle routing tag conventions, OSM Wiki &mdash; source for
              how the underlying isochrone engine interprets sidewalk and bike-infrastructure data.
            </li>
          </ul>
          <p className="text-slate-500 text-sm mt-4">
            Isochrone calculation uses OpenStreetMap data via OSRM/Valhalla routing engines.
            Routes are shortest-path approximations; they don&apos;t account for crossing wait
            times, real-time signal phases, or perceived-safety detours. Use the radius value as
            a planning input, not a guarantee of accessibility.
          </p>
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
                    name: "What's the difference between walking isochrone and radius?",
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
