import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES } from '@/data/cities';

const CityIndexMap = dynamic(() => import('@/components/map/CityIndexMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[480px] bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
      <div className="text-slate-500 text-sm">Loading world map…</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'City Radius Maps — Pre-Centered Tools for 25 Cities',
  description:
    'Pre-centered radius maps for 25 major cities across 4 continents. Hand-authored coverage, local use cases, and city-specific quirks for New York, London, Paris, Tokyo, Sydney, and more.',
  alternates: {
    canonical: '/radius-map',
  },
  openGraph: {
    title: 'City Radius Maps — Pre-Centered Tools for 25 Cities',
    description:
      'Pre-centered radius maps for 25 major cities across 4 continents — New York, London, Paris, Tokyo, Sydney, and more.',
    url: 'https://mapwithradius.com/radius-map',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Radius Maps — 25 Cities Across 4 Continents',
    description:
      'Pre-centered radius maps for major cities. Hand-authored coverage, local use cases, and city-specific quirks.',
  },
};

const REGIONS = ['North America', 'Europe', 'Asia', 'Oceania'];

const FAQS = [
  {
    question: 'Why isn’t my city listed?',
    answer:
      'We hand-author each city page — coverage tables, local quirks, recommended radii for specific use cases. That takes work to do well, so we expand the roster deliberately rather than auto-generating filler pages. If you want a specific city added, contact us. In the meantime, the main radius tool works for any address worldwide — enter your city in the search box and you’ll get the same drawing functionality without the local context.',
  },
  {
    question: 'Why a circle instead of the city’s actual administrative boundary?',
    answer:
      'A circle is a geometric primitive that’s comparable across cities — a 10 km radius is always 10 km. Administrative boundaries are useful when you actually need the city’s defined limits (for census stats, voting districts, school zoning), but for most planning questions — “how far is X from Y?” “how much area does my delivery zone cover?” “what’s within walking distance?” — a circle is simpler and more honest about the geometry. Each city page links to local boundary resources where they’re relevant.',
  },
  {
    question: 'How is the default radius chosen for each city?',
    answer:
      'Manually, based on the city’s typical “scale.” Manhattan is dense, so 5 mi from Times Square reaches most of the meaningful interior. Los Angeles is sprawling, so 10 mi is the starting point. London goes metric with 10 km because that’s the convention there. The default is just a sensible starting point — you can change it freely once the map opens.',
  },
  {
    question: 'How accurate is a radius drawn on these maps?',
    answer:
      'The geometry is exact — we use the Haversine formula on the WGS 84 spheroid (the same coordinate system used by GPS), so a 10 km radius really is 10 km in every direction from the center. Visual size on screen varies slightly with latitude due to the Web Mercator projection (a 10 km circle in Stockholm looks larger than a 10 km circle in Nairobi), but the underlying distance is correct. For radii under 100 km, accuracy is within a few meters.',
  },
  {
    question: 'Does the radius account for terrain, water, or roads?',
    answer:
      'No. A radius is straight-line (“as the crow flies”) distance only. Half of a 10 km radius drawn from coastal cities (Sydney, Vancouver, Miami) is water; mountain cities like Vancouver have ridges that block actual travel. That’s deliberate — each city page documents the geographic quirks that change how a radius behaves locally. For road-following distance or travel time, use the drive time map.',
  },
  {
    question: 'Can I export the radius from a city page?',
    answer:
      'Yes. Each city map has the same export controls as the main tool: copy a shareable URL (encodes the exact center, radius, and unit), download a PNG screenshot, or export KML for use in Google Earth or any GIS tool. Everything happens client-side — the URLs you generate work indefinitely without any server keeping records.',
  },
  {
    question: 'Where do the population numbers and landmarks come from?',
    answer:
      'Hand-curated from public sources — each city’s metropolitan-area or city-proper population (whichever is more useful for radius planning), and a centrally located, widely recognized landmark as the default anchor. Population figures are approximate (rounded to one or two significant digits) since exact numbers fluctuate and the “city” definition varies. The map respects only the actual GPS coordinates of the landmark, which are precise.',
  },
];

const USE_CASES = [
  {
    title: 'Real estate and relocation',
    body: 'Agents and house-hunters use city radius maps to show “what’s within X miles of this property” — schools, transit, hospitals, parks. Different cities need different default radii (3 mi in Manhattan, 10 mi in Houston) for the same lifestyle question. The city pages spell out which radius is meaningful where.',
  },
  {
    title: 'Delivery and service zones',
    body: 'Restaurants, retailers, and logistics teams define zones around a depot or storefront. Coastal cities lose half of any radius to water; sprawling cities need bigger radii than dense ones. The city pages list typical local conventions — a 3 mi food-delivery radius in Brooklyn means something different than 3 mi in Atlanta.',
  },
  {
    title: 'Urban planning and accessibility analysis',
    body: 'Planners use straight-line radii as a screening tool before more expensive isochrone work — “is this park within a 1 km radius of every census block?”, “does this hospital cover a 25 km service area?” Each city page documents whether straight-line is realistic or whether terrain/water makes it misleading.',
  },
  {
    title: 'Event logistics and venue siting',
    body: 'Event organizers test “how many residents live within a 5 km radius of this venue?” as a first-pass attendance estimate. Marketing teams use radius maps to define direct-mail or geo-targeted ad audiences. The defaults on each city page reflect the radii actually used by professionals in that market.',
  },
  {
    title: 'Travel and trip planning',
    body: 'Visitors use radius maps to scope a city before arriving — “how far is the airport from downtown?”, “what’s walkable from my hotel?” Each city page is pre-centered on a known landmark, so you can change the radius in seconds without first finding coordinates.',
  },
];

export default function RadiusMapIndexPage() {
  const uniqueCountries = Array.from(new Set(CITIES.map((c) => c.country)));

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mapwithradius.com' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'City Radius Maps',
                item: 'https://mapwithradius.com/radius-map',
              },
            ],
          }),
        }}
      />

      {/* CollectionPage Schema with hasPart for each city */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'City Radius Maps',
            description:
              'Pre-centered radius maps for major cities worldwide, each with hand-authored coverage tables, local use cases, and geographic quirks.',
            url: 'https://mapwithradius.com/radius-map',
            isPartOf: { '@id': 'https://mapwithradius.com/#website' },
            hasPart: CITIES.map((c) => ({
              '@type': 'WebPage',
              name: `Radius Map of ${c.name}`,
              url: `https://mapwithradius.com/radius-map/${c.slug}`,
            })),
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">City Radius Maps</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">City Radius Maps</h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Pre-centered radius maps for {CITIES.length} major cities across {REGIONS.length}{' '}
            continents and {uniqueCountries.length} countries. Skip the address search — each link
            opens the radius tool already focused on a known landmark, with a starting radius that
            fits the city&apos;s scale.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Every city page is hand-authored: real coverage tables (what falls inside a 5&nbsp;km
            or 10&nbsp;mi radius from a named anchor), local use cases used by professionals in that
            market, and geographic quirks (water, mountains, density gradients) that change how a
            radius behaves there.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-slate-900">{CITIES.length}</div>
              <div className="text-sm text-slate-600">cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{REGIONS.length}</div>
              <div className="text-sm text-slate-600">continents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{uniqueCountries.length}</div>
              <div className="text-sm text-slate-600">countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="section-white pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityIndexMap />
          <p className="text-sm text-slate-500 mt-3 text-center">
            Tap a marker to jump to that city&apos;s dedicated radius map. Pinch to zoom; the
            scroll-wheel is disabled so the page itself stays scrollable.
          </p>
        </div>
      </section>

      {/* What is a city radius map */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">What is a city radius map?</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              A city radius map is the standard &ldquo;everything within X distance of point Y&rdquo;
              tool, but pre-configured for a specific city. Instead of typing an address into a
              generic mapping tool, you land on a page that&apos;s already centered on the
              city&apos;s most recognizable anchor (Times Square, the Loop, Charing Cross,
              Alexanderplatz, Shinjuku Station) with a sensible starting radius. From there you can
              move the center, change the radius, and export — same controls as the main tool, just
              without the &ldquo;find the address first&rdquo; step.
            </p>
            <p>
              The reason to maintain per-city pages instead of one generic interface is that what
              makes a radius useful is heavily local. A 10-mile radius from downtown Phoenix covers
              suburban sprawl that&apos;s functionally one continuous market; a 10-mile radius from
              downtown Manhattan covers five distinct boroughs, two rivers, and three different
              transit-system catchment areas. The geometry is identical; the meaning isn&apos;t.
              City pages give you a starting frame that already reflects the local meaning, plus
              hand-authored content describing what does and doesn&apos;t fit inside the typical
              radii local planners and professionals actually use.
            </p>
            <p>
              Each page is intentionally small in scope: one tool, one city, one set of coverage
              examples. You won&apos;t find auto-generated filler. If a city is listed here, someone
              looked at the geography, picked a landmark, ran through the common use cases, and
              wrote the page by hand.
            </p>
          </div>
        </div>
      </section>

      {/* Why radii differ across cities */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Why a radius means different things in different cities</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              The math is universal — a 10 km radius covers π · 10² ≈ 314 km² in every city on
              Earth. What changes is what fills that 314 km² of land area, and crucially, how much
              of it is even land.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Coastal cities</strong> lose up to half of any radius to water. A 10 km
                radius from Sydney Harbour has the harbour and Pacific Ocean on three sides;
                Miami&apos;s 25 km radius is mostly Atlantic and Everglades. The page for each
                coastal city notes how much of the typical radius is actually navigable land.
              </li>
              <li>
                <strong>Mountain cities</strong> have hard boundaries at specific bearings. The
                North Shore Mountains rise sharply 5 km north of downtown Vancouver; the radii
                drawn here read very differently to the north (mountains, no roads) versus south
                (continuous metro all the way to the US border).
              </li>
              <li>
                <strong>Density gradients</strong> change what &ldquo;X miles from the center&rdquo;
                means demographically. A 10-mile radius from Manhattan touches roughly four million
                residents; the same radius from downtown Houston might cover one million across a
                much larger physical area. Both are correct radii; they describe completely
                different markets.
              </li>
              <li>
                <strong>Cultural conventions</strong> dictate which radius value people actually
                use. Japanese real-estate listings use station-walking radii of 500&nbsp;m and
                800&nbsp;m almost universally; UK trade-area work clusters around 5 mi and 25 mi;
                German emergency-response standards are codified at 10 km. Picking the radius the
                local market expects matters more than picking a mathematically &ldquo;clean&rdquo;
                number.
              </li>
              <li>
                <strong>Web Mercator distortion</strong> makes radii drawn at high latitudes
                <em> look</em> bigger on the screen than ones at the equator, even when the
                actual ground distance is identical. The math is correct; the visual size isn&apos;t a
                fair comparison.
              </li>
            </ul>
            <p>
              The city pages document the specific quirk that matters for that city, so you don&apos;t
              have to learn each one the hard way.
            </p>
          </div>
        </div>
      </section>

      {/* All cities by region */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">Browse all cities by region</h2>
          <p className="text-slate-700 mb-8 max-w-2xl">
            All {CITIES.length} cities, grouped by continent. Each card carries the
            hand-authored note about what makes that city&apos;s radius behave the way it does —
            tap any card to open its full page.
          </p>
          <div className="space-y-12">
            {REGIONS.map((region) => {
              const regionCities = CITIES.filter((c) => c.region === region);
              if (regionCities.length === 0) return null;
              return (
                <div key={region}>
                  <h3 className="text-xl font-bold text-slate-900 mb-5">
                    {region}{' '}
                    <span className="text-sm font-normal text-slate-500">
                      ({regionCities.length} {regionCities.length === 1 ? 'city' : 'cities'})
                    </span>
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {regionCities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/radius-map/${c.slug}`}
                        className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-accent hover:shadow-md transition-all"
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-2">
                          <h4 className="text-xl font-bold text-slate-900">{c.name}</h4>
                          <span className="text-xs text-slate-500 uppercase tracking-wide whitespace-nowrap">
                            {c.country}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 italic mb-3 line-clamp-4">{c.fact}</p>
                        <div className="text-sm text-slate-500 border-t border-slate-100 pt-3 mt-3">
                          <div>
                            Default:{' '}
                            <strong className="text-slate-900">
                              {c.defaultRadius} {c.defaultUnit === 'miles' ? 'mi' : 'km'}
                            </strong>{' '}
                            from {c.centralLandmark}
                          </div>
                          <div className="mt-1 text-xs">Population: {c.populationLabel}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to choose a radius */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">How to choose a radius for your city</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            The default on each city page is a reasonable starting point, but the right radius
            depends on what you&apos;re trying to learn. A rough guide:
          </p>

          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">
                500&nbsp;m – 1&nbsp;km / 0.3 – 0.6 mi · &ldquo;Within a few blocks&rdquo;
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Foot-traffic radius for a specific storefront, station-walking distance, single
                neighborhood block analysis. Japanese station-walking listings use 500&nbsp;m and
                800&nbsp;m as the de-facto property-search anchors.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">
                1.5 – 3&nbsp;km / 1 – 2 mi · &ldquo;Walkable&rdquo;
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                15-minute-city screening radius (1.2&nbsp;km at 5&nbsp;km/h walking pace),
                food-delivery zones in dense areas, neighborhood-level trade areas. Most useful in
                cities with continuous walkable street grids.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">
                5 – 10&nbsp;km / 5 – 10 mi · &ldquo;The city center and inner suburbs&rdquo;
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Default for most European capitals (London uses 10 km from Charing Cross), inner
                US metros (NYC 5 mi from Times Square covers most of Manhattan plus the closest
                outer-borough ringland), and typical commute analysis. This is the
                most-commonly-useful range for &ldquo;city-scale&rdquo; questions.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">
                15 – 25&nbsp;km / 10 – 20 mi · &ldquo;The metro area&rdquo;
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Sprawling US metros (Los Angeles 10 mi just covers downtown plus adjacent
                neighborhoods, but 25 mi catches most of the metro), Sydney&apos;s full inner-area
                radius from the CBD, regional planning zones. Common for service-area and
                franchise-territory work.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">
                50 – 100&nbsp;km / 30 – 60 mi · &ldquo;Regional&rdquo;
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Day-trip planning, regional sales territories, hospital service areas, freight
                short-haul. At this scale, terrain and road networks dominate over straight-line
                distance — check the city&apos;s drive-time map for an honest view.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-500 italic mt-6">
            When in doubt, open a city page, click a few preset values, and visually check what
            falls inside each circle. The right radius is almost always the one where the circle
            looks &ldquo;about right&rdquo; for the question you&apos;re asking.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Who uses city radius maps</h2>
          <div className="space-y-6">
            {USE_CASES.map((uc) => (
              <article key={uc.title} className="border-l-4 border-accent pl-4">
                <h3 className="font-bold text-slate-900 mb-1">{uc.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm">{uc.body}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            For deeper guides on industry-specific use cases, see the{' '}
            <Link href="/use-cases" className="content-link">
              full use cases page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.question} className="faq-card">
                <summary>
                  {f.question}
                  <svg
                    className="w-5 h-5 faq-chevron"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="faq-content">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & references */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Resources and references</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            What this site is built on and what we read while building it.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Underlying data &amp; tools</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://www.openstreetmap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OpenStreetMap
                  </a>{' '}
                  — open data behind every map tile on this site.
                </li>
                <li>
                  <a
                    href="https://leafletjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Leaflet
                  </a>{' '}
                  — the JavaScript map library rendering each radius circle.
                </li>
                <li>
                  <a
                    href="https://nominatim.openstreetmap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Nominatim
                  </a>{' '}
                  — the open geocoder behind the address-search feature.
                </li>
                <li>
                  <a
                    href="https://operations.osmfoundation.org/policies/tiles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    OpenStreetMap tile usage policy
                  </a>{' '}
                  — what we&apos;re bound by when loading tiles.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Math &amp; geodesy</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Haversine_formula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Haversine formula (Wikipedia)
                  </a>{' '}
                  — how spherical distances are computed.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/World_Geodetic_System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    WGS 84 (Wikipedia)
                  </a>{' '}
                  — the coordinate system used by GPS and every map on this site.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Web_Mercator_projection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Web Mercator projection
                  </a>{' '}
                  — why a 10&nbsp;km circle looks bigger in Stockholm than in Nairobi.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Vincenty&apos;s formulae
                  </a>{' '}
                  — the ellipsoidal alternative for sub-meter geodetic work.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Urban planning &amp; standards</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/15-minute_city"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    15-minute city
                  </a>{' '}
                  (Carlos Moreno) — the chrono-urbanism framework behind 1.2 km walk-radius
                  planning.
                </li>
                <li>
                  <a
                    href="https://population.un.org/wup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    UN World Urbanization Prospects
                  </a>{' '}
                  — primary source for cross-country urban-population context.
                </li>
                <li>
                  <a
                    href="https://inspire.ec.europa.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    INSPIRE Directive (EU)
                  </a>{' '}
                  — interoperable spatial-data standards for European GIS work.
                </li>
                <li>
                  <a
                    href="https://www.epsg-registry.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    EPSG Geodetic Parameter Registry
                  </a>{' '}
                  — authoritative source for coordinate-reference-system codes.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">On this site</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/glossary" className="content-link">
                    Glossary
                  </Link>{' '}
                  — definitions of radius, isochrone, geofence, KML, WGS 84, and 40+ other terms.
                </li>
                <li>
                  <Link href="/use-cases" className="content-link">
                    Use cases
                  </Link>{' '}
                  — concrete examples by industry (real estate, delivery, retail, events).
                </li>
                <li>
                  <Link href="/radius-on-google-maps" className="content-link">
                    Radius on Google Maps
                  </Link>{' '}
                  — workarounds + comparison for Google Maps users.
                </li>
                <li>
                  <Link href="/alternatives" className="content-link">
                    Tool alternatives compared
                  </Link>{' '}
                  — FreeMapTools, MapDevelopers, CalcMaps, Smappen, Maptive.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Or pick a different tool</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Main radius map</div>
              <div className="text-sm text-slate-600">Any address, any radius. Miles default.</div>
            </Link>
            <Link
              href="/km-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">KM radius map</div>
              <div className="text-sm text-slate-600">Same tool, kilometers as default.</div>
            </Link>
            <Link
              href="/drive-time-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Drive time map</div>
              <div className="text-sm text-slate-600">
                Real-road isochrones (how far you can <em>actually</em> travel).
              </div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Walking radius map</div>
              <div className="text-sm text-slate-600">
                Pedestrian and cycling isochrones for walkability analysis.
              </div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Distance calculator</div>
              <div className="text-sm text-slate-600">Between any two points on Earth.</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Zip code radius</div>
              <div className="text-sm text-slate-600">All zip codes within a US radius.</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
