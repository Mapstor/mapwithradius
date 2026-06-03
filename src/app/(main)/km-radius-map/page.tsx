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
          {/* Byline */}
          <div className="mb-8 pb-6 border-b border-slate-200 text-sm text-slate-500">
            By the Map With Radius editorial team · Last reviewed 29 May 2026
          </div>

          {/* Intro — reframed for technical/GIS audience */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">A kilometer radius tool for technical and regulatory work</h2>
            <p className="text-slate-700 mb-4">
              Most online radius tools target US miles users and only mention kilometers as an
              afterthought. This page is the opposite: it&apos;s the radius tool oriented around the
              regulatory, planning, and GIS conventions of the metric world, where radii get used
              for things like air-quality zones, school catchments, bushfire perimeters, EU short-haul
              flight thresholds, and Japanese station-walking distances. The interactive tool above
              defaults to kilometers; the rest of this page is the reference material that goes with it.
            </p>
            <p className="text-slate-700">
              If you&apos;re looking for the general radius tool with imperial defaults and broader
              consumer examples, the <Link href="/" className="content-link">miles-default home page</Link> covers that.
              For travel-time isochrones (rather than straight-line radii), see the{' '}
              <Link href="/drive-time-map" className="content-link">drive-time map</Link> or{' '}
              <Link href="/walking-radius-map" className="content-link">walking radius map</Link>.
            </p>
          </div>

          {/* How regulatory radii are defined in metric systems */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">How regulatory radii are defined in metric systems</h2>
            <p className="text-slate-700 mb-4">
              Metric-using jurisdictions tend to anchor regulatory radii on round numbers — 5, 10,
              25, 50, 100 km — where US/UK regulations cluster on 1, 5, 10, 25, 50 miles. That
              difference matters in practice: a US planner reading a European emergency-response
              policy that mandates &ldquo;10 km coverage&rdquo; should not mentally convert it to
              6.2 mi and stop there. The 10 km figure is chosen because it&apos;s the operational
              round number the regulation was written around, not because it&apos;s a precise
              maximum.
            </p>
            <p className="text-slate-700 mb-4">
              There&apos;s also a definitional gap worth flagging. &ldquo;Within 10 km&rdquo;
              in a regulation can mean any of three things:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Straight-line (Euclidean) distance</strong> — the great-circle distance a
                radius tool draws. Common for environmental, atmospheric, and emergency-broadcast
                rules.
              </li>
              <li>
                <strong>Road network distance</strong> — distance along drivable roads. Common for
                tax, commuter-relief, and delivery regulations.
              </li>
              <li>
                <strong>Travel time</strong> (sometimes phrased as &ldquo;within 15 minutes&rdquo;)
                — common for response-time SLAs and 15-minute-city analyses, computed as an isochrone
                rather than a circle.
              </li>
            </ul>
            <p className="text-slate-700">
              The tool above draws Euclidean radii. For network-distance use cases, the{' '}
              <Link href="/distance-calculator" className="content-link">distance calculator</Link>{' '}
              also returns road-distance via OSRM; for travel-time, see the isochrone tools linked
              above. Pick the right measurement type before you start sketching a regulatory polygon
              on the map.
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

          {/* Worked examples — field guide */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Field guide: five worked examples</h2>
            <p className="text-slate-700 mb-6">
              Concrete cases where a kilometer radius is the right tool — drawn from public
              regulation and planning documents. Each example notes the radius value, what defines
              it, and which gotchas to watch for when you sketch it on the tool above.
            </p>

            <div className="space-y-8">
              <article>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. German Umweltzone: planning a Low Emission Zone</h3>
                <p className="text-slate-700 mb-2">
                  Germany&apos;s air-quality framework, implementing the EU Ambient Air Quality
                  Directive (2008/50/EC), lets cities declare Umweltzonen — Low Emission Zones
                  where older vehicles can&apos;t drive. The original Berlin Umweltzone, for
                  example, sits inside the S-Bahn Ringbahn, roughly a 4 km radius from
                  Alexanderplatz. When a smaller city designs a new zone, planners typically start
                  by drawing a 3&ndash;5 km radius around the historic center, then refine to a
                  polygon that follows actual ring roads.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Radius used:</strong> 3&ndash;5 km Euclidean from center, refined to polygon.{' '}
                  <strong>Gotcha:</strong> the regulation is enforced on a polygon, but the radius
                  is the planning shortcut. Don&apos;t conflate them.
                </p>
              </article>

              <article>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Australian bushfire cascading evacuation perimeters</h3>
                <p className="text-slate-700 mb-2">
                  State emergency services (NSW Rural Fire Service, CFA Victoria) define
                  evacuation zones as cascading concentric radii from a known ignition point: an
                  inner exclusion ring (usually 5 km), a warning zone (10 km), and a watch
                  perimeter (25 km). The radius is drawn straight-line because wind-driven fire
                  spread doesn&apos;t follow roads; if you&apos;re modelling a perimeter for
                  evacuation planning, the Euclidean radius is the correct primitive even though
                  evacuation movement is by road.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Radii used:</strong> 5 km, 10 km, 25 km concentric.{' '}
                  <strong>Gotcha:</strong> straight-line for the threat boundary, road network for
                  the evacuation route — two different layers in the same map.
                </p>
              </article>

              <article>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. Carlos Moreno&apos;s 15-minute city as a 1.2 km screen</h3>
                <p className="text-slate-700 mb-2">
                  The 15-minute city framework — adopted by Paris, Melbourne, Portland, and
                  others — measures whether daily essentials are reachable within a
                  15-minute walk. The rigorous version uses pedestrian isochrones; the screening
                  version uses a straight-line radius of roughly 1.2 km (15 min × 5 km/h walking
                  speed). For city-wide audits, planners start with the radius approximation to
                  identify candidate &ldquo;15-minute neighborhoods,&rdquo; then drill in with
                  isochrone analysis on the candidates that pass screening.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Radius used:</strong> 1.2 km Euclidean (screening) → walking isochrone (refinement).{' '}
                  <strong>Gotcha:</strong> the radius will over-count in cities with rivers,
                  freeways, or steep grade — fine for screening, wrong for delivery of services.
                </p>
              </article>

              <article>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. Japanese station-walking radius for property listings</h3>
                <p className="text-slate-700 mb-2">
                  Japanese real-estate listings universally quote &ldquo;駅徒歩X分&rdquo;
                  (X-minute walk to station) at a regulated 80 m/min pace — so 5 minutes is
                  400 m, 10 minutes is 800 m. The 500 m station-walking radius is the de-facto
                  property-listing catchment in Tokyo, Osaka, and most major cities. If
                  you&apos;re calibrating a real-estate analysis for the Japanese market, the
                  500 m / 800 m radii are the only ones that actually drive consumer decisions.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Radius used:</strong> 500&ndash;800 m around each station.{' '}
                  <strong>Gotcha:</strong> 80 m/min is the regulated pace, not a realistic average
                  — actual walking speed in Tokyo is closer to 75 m/min on flat ground, slower in
                  hilly Yokohama or Kobe. The listing radius overstates accessibility.
                </p>
              </article>

              <article>
                <h3 className="text-lg font-bold text-slate-900 mb-2">5. EU short-haul flight threshold debate</h3>
                <p className="text-slate-700 mb-2">
                  France banned short-haul domestic flights where a train alternative under 2.5
                  hours exists (2022 law); the broader EU debate proposes a 500&ndash;1,500 km
                  threshold for similar restrictions. These distances are measured as
                  great-circle (straight-line) between airport pairs — which is precisely the
                  Haversine formula the tool above uses. The straight-line distance always
                  understates the actual flight track, so a regulation written at 500 km
                  great-circle effectively covers flights with ~550 km flight paths.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Radius used:</strong> 500&ndash;1,500 km great-circle between airport
                  pairs. <strong>Gotcha:</strong> the regulatory distance is great-circle; the
                  operational flight distance is longer. If you&apos;re modelling which routes
                  fall inside a proposed threshold, use the straight-line measurement, not the
                  airline&apos;s published kilometers.
                </p>
              </article>
            </div>
          </div>

          {/* Common km radius mistakes */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Common kilometer-radius mistakes</h2>
            <p className="text-slate-700 mb-4">
              Six failure modes we see repeatedly when teams sketch metric radii for the first time:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-slate-700">
              <li>
                <strong>Confusing km with km².</strong> A 10 km radius covers 314 km² (π·r²),
                not 10 km². When a regulation says &ldquo;within a 10 km area,&rdquo; check whether
                it means a 10 km radius (the common reading) or a 10 km² area (a much smaller
                circle of radius ≈ 1.78 km).
              </li>
              <li>
                <strong>Confusing radius with diameter.</strong> &ldquo;A 10 km zone&rdquo; in
                informal speech often means a 10 km diameter (5 km radius), especially in
                evacuation or quarantine contexts. Always check whether the source value is
                center-to-edge or edge-to-edge.
              </li>
              <li>
                <strong>Straight-line vs road distance.</strong> A 10 km radius in Manhattan
                covers walkable Manhattan; a 10 km road distance from Times Square may end up in
                New Jersey because of the Hudson crossings. For regulations that measure
                accessibility, road distance and Euclidean radius can disagree by 2&times; or
                more in coastal cities.
              </li>
              <li>
                <strong>Latitude distortion on Web Mercator.</strong> The map tiles use the Web
                Mercator projection, which stretches features near the poles. A 50 km circle in
                Stockholm looks much larger on screen than a 50 km circle in Nairobi, even though
                they cover the same ground. The radius value is correct; the visual size is not
                a reliable comparison.
              </li>
              <li>
                <strong>Earth oblateness for long ranges.</strong> Haversine assumes a perfectly
                spherical Earth. For radii under ~200 km the error is below 0.1%; at 1,000 km it
                can reach 0.3%. For aviation, maritime, or geodetic work, switch to a true
                ellipsoidal formula (Vincenty&apos;s).
              </li>
              <li>
                <strong>Edge-case rounding.</strong> If a regulation says &ldquo;within 5 km,&rdquo;
                is 5.0001 km inside or outside? Most regulations are inclusive at the boundary
                but it&apos;s worth confirming with the source document before deciding a
                marginal case.
              </li>
            </ol>
          </div>

          {/* GIS metric standards */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">GIS standards: WGS 84, EPSG codes, and INSPIRE</h2>
            <p className="text-slate-700 mb-4">
              Three standards govern how kilometer-radius work moves between consumer tools and
              professional GIS pipelines:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-4">
              <li>
                <strong>WGS 84 (EPSG:4326)</strong> — the geodetic datum used by GPS, OpenStreetMap,
                Google Maps, and all major consumer mapping. Latitudes and longitudes you copy out
                of any consumer tool, including this one, are in WGS 84 unless explicitly stated
                otherwise. Almost all global radius work uses this.
              </li>
              <li>
                <strong>ETRS89 (EPSG:4258)</strong> — the European Terrestrial Reference System,
                used by EU national mapping agencies and INSPIRE-compliant data. For consumer
                purposes ETRS89 and WGS 84 are interchangeable; the divergence is millimetric per
                year. Surveying-grade work needs to track which datum each layer is in.
              </li>
              <li>
                <strong>INSPIRE Directive (2007/2/EC)</strong> — requires EU member state agencies
                to publish spatial data in interoperable formats. KML and GeoJSON exports from
                this tool are INSPIRE-compatible when paired with the right metadata; the
                coordinates themselves are already in the right datum.
              </li>
              <li>
                <strong>Country-specific national grids</strong> — UK Ordnance Survey
                (OSGB36 / EPSG:27700), French Lambert-93 (EPSG:2154), German Gauß-Krüger
                (EPSG:31466&ndash;31469), Japan Plane Rectangular (EPSG:6669&ndash;6687). These
                are projected coordinate systems used for national cartography. Convert between
                them and WGS 84 in QGIS or proj4 before doing radius calculations on data that
                arrived in a national grid.
              </li>
            </ul>
            <p className="text-slate-700">
              In practice: the radii you draw here can be exported as KML and dropped directly
              into QGIS, ArcGIS, Google Earth, or any tool that reads WGS 84. If your data arrives
              in a national grid, transform it to WGS 84 first; the radius math doesn&apos;t care
              about the projection but the visual overlay does.
            </p>
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

          {/* Methodology and sources */}
          <div className="mb-12">
            <h2 className="section-heading mb-6">Methodology and sources</h2>
            <p className="text-slate-700 mb-4">
              The radius values cited on this page come from public regulation and statistics
              sources. Where a figure is jurisdictional (an Umweltzone size, a commute average),
              the underlying source is named below so you can verify against the primary document
              rather than relying on this page&apos;s summary.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>
                EU Ambient Air Quality Directive 2008/50/EC — underlying framework for German
                Umweltzonen and similar national Low Emission Zones.
              </li>
              <li>
                French Climate and Resilience Law (loi 2021-1104) — short-haul flight ban for
                routes with train alternatives under 2.5 hours.
              </li>
              <li>
                UK Office for National Statistics, Commuting patterns (2024 release) — average
                commute distance figures.
              </li>
              <li>
                Australian Bureau of Statistics, Greater Capital City Statistical Areas — 25 km
                metropolitan boundary definitions.
              </li>
              <li>
                Statistics Canada, Census Metropolitan Area definitions — used for the 100 km
                CMA reference.
              </li>
              <li>
                Japanese Real Estate Fair Trade Council guidelines — the 80 m/min walking-pace
                regulation used in 駅徒歩 listings.
              </li>
              <li>
                Carlos Moreno, &ldquo;The 15-Minute City&rdquo; (2016) — original framework for
                the walking-isochrone planning standard.
              </li>
              <li>
                IOGP / EPSG Geodetic Parameter Registry — authoritative source for coordinate
                reference system codes used in the GIS standards section.
              </li>
            </ul>
            <p className="text-slate-500 text-sm mt-4">
              All radius calculations on this site use the Haversine formula on a spherical Earth
              approximation. For exact ellipsoidal calculations (Vincenty&apos;s formulae), a
              dedicated GIS pipeline like QGIS or proj is required.
            </p>
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
                Yes — embed via the <code>/embed</code> endpoint, which loads no analytics or
                advertising scripts. Map tiles come from OpenStreetMap (not Google Maps), so no
                user data reaches Google when the embedded map loads. URL-encoded coordinates and
                radius let you point users at specific map configurations. The main
                mapwithradius.com site does run Google Analytics and Google AdSense; in the
                EEA/UK/Switzerland, Google Consent Mode v2 keeps non-essential cookies
                default-denied, so analytics runs in cookieless mode and AdSense serves Limited
                (non-personalized) ads — but the /embed view does not inherit those scripts at all.
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
                      text: "Yes — embed via the /embed endpoint, which loads no analytics or advertising scripts. Map tiles come from OpenStreetMap (not Google Maps), so no user data reaches Google when the embedded map loads. URL-encoded coordinates and radius let you point users at specific map configurations. The main mapwithradius.com site does run Google Analytics and Google AdSense; in the EEA/UK/Switzerland, Google Consent Mode v2 keeps non-essential cookies default-denied, so analytics runs in cookieless mode and AdSense serves Limited (non-personalized) ads — but the /embed view does not inherit those scripts at all.",
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
