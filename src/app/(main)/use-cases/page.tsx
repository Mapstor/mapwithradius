import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';
import { CITIES } from '@/data/cities';

export const metadata: Metadata = {
  title: 'Radius Map Use Cases',
  description:
    'How real estate agents, delivery teams, retailers, event planners, marketers, and sales managers use radius maps. Concrete examples, common pitfalls, and which tool fits each job.',
  alternates: {
    canonical: '/use-cases',
  },
  keywords: [
    'radius map use cases',
    'radius map real estate',
    'delivery zone map',
    'trade area radius',
    'sales territory radius map',
  ],
  openGraph: {
    title: 'Radius Map Use Cases',
    description:
      'How real estate agents, delivery teams, retailers, event planners, marketers, and sales managers use radius maps.',
    url: 'https://mapwithradius.com/use-cases',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radius Map Use Cases',
    description:
      'How real estate agents, delivery teams, retailers, event planners, marketers, and sales managers use radius maps.',
    images: OG_IMAGES,
  },
};

const useCases = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    audience: 'Buyers, sellers, agents, investors',
  },
  {
    id: 'delivery-zones',
    title: 'Delivery & Service Zones',
    audience: 'Restaurants, couriers, field services',
  },
  {
    id: 'retail-trade-area',
    title: 'Retail & Business Location',
    audience: 'Site selectors, franchise teams, market researchers',
  },
  {
    id: 'event-planning',
    title: 'Event & Wedding Planning',
    audience: 'Couples, planners, corporate offsites',
  },
  {
    id: 'marketing-local-seo',
    title: 'Marketing & Local SEO',
    audience: 'Local marketers, ad operators, agencies',
  },
  {
    id: 'sales-territory',
    title: 'Sales Territory Mapping',
    audience: 'Sales ops, regional managers, BD teams',
  },
];

const FAQS = [
  {
    question: "What's the difference between a radius and an isochrone?",
    answer:
      'A radius is a straight-line ("as the crow flies") distance from a point — a perfect circle. An isochrone shows how far you can actually travel in a given time, following real roads — usually an irregular shape. Use a radius for geometric questions ("what is within X distance of this point?") and an isochrone for travel questions ("where can I reach in 20 minutes?"). Our Drive Time Map and Walking Radius Map render isochrones; the main Radius Map renders straight-line circles.',
  },
  {
    question: 'When should I use a straight-line radius vs a drive-time isochrone?',
    answer:
      'Straight-line for: site selection (the customer is here, the store is X miles away), service zones quoted by distance ("we deliver within 5 miles"), trade-area screening, and the first cut of a commute filter. Drive-time for: actual staffing decisions, delivery promise time (45 min vs 90 min), customer-experience modeling, and any geography where terrain or water blocks travel. A useful rule: if the answer would change once you account for traffic or geography, use drive-time.',
  },
  {
    question: 'How do I share a radius map with my team or client?',
    answer:
      'Three ways. (1) Copy link — a URL with the radius encoded; recipients open it and see the exact same map. (2) Download PNG — a static screenshot for decks, PDFs, or email. (3) Export KML — a structured file your MLS, CRM, ArcGIS, Google Earth, or QGIS can import. All three options are on every tool on this site, and everything happens client-side: no account, no server-stored links.',
  },
  {
    question: 'Can I export radius data into my CRM, MLS, or GIS tool?',
    answer:
      'KML is your friend. KML files are the de-facto exchange format for radius and polygon data — readable by Google Earth, QGIS, ArcGIS, most CRM systems with mapping plug-ins, and major real-estate MLS systems. Drop the KML file in and the radius appears as a circular boundary or filter. For programmatic integrations, the share-link URL contains the radius as query parameters that any tool can parse.',
  },
  {
    question: "How do I pick a radius for a use case that isn't on this list?",
    answer:
      "Start with the question, not a round number. If you can articulate 'people within X distance of Y who do Z,' then X is your radius. Cross-check by drawing it on the map and asking whether the circle contains the right things. Adjust until it does. When data is available (POS records, order history, customer addresses), look at the customer-distance distribution — the radius that captures 70% of activity is your real primary zone, regardless of any rule of thumb.",
  },
  {
    question: "What's the standard for trade-area analysis?",
    answer:
      "The classic primary trade area captures ~70% of customers; the secondary picks up another ~20%. Reilly's Law (1929) and Huff's Model (1964) are the academic frameworks, but in practice most operators define the radius based on observed customer-distance distribution from their own data. If you don't have that yet, start with 1-3 miles for neighborhood retail, 10-30 miles for destination retail (furniture, big-box), and revise from real data after a few months of operation.",
  },
  {
    question: 'How do I handle radii that cross water, mountains, or other barriers?',
    answer:
      'The radius is geometrically correct ("within X distance of point Y"), but it can mislead for travel questions because half the circle may be unreachable. Two fixes: (1) Switch to a drive-time isochrone, which respects the road network. (2) Use the city pages — each documents the specific geographic quirks (water, mountains, density gradients) and the typical adjustment for that city. Coastal cities, mountain cities, and dense urban grids each have a different right answer.',
  },
  {
    question: 'Is there an industry standard for delivery or service radius?',
    answer:
      'Not universal — it depends on the industry. Food delivery typically uses 3-5 mi or 8-12 minute drive. Locksmiths and emergency-response services use 15-25 mi. HVAC, plumbing, and home services use 25-50 mi for non-urgent jobs. Restaurants on Uber Eats / DoorDash default to a 3-7 mi radius depending on density. The right number is the one your team can actually staff at peak demand, not the one a competitor advertises.',
  },
];

const QUICK_REFERENCE_ROWS: Array<{
  job: string;
  radius: string;
  tool: { label: string; href: string };
}> = [
  { job: 'Real estate comparable sales (1 mi appraiser standard)', radius: '1 mi', tool: { label: 'Radius Map', href: '/' } },
  { job: 'Commute filter (real driving time)', radius: '20-30 min', tool: { label: 'Drive Time Map', href: '/drive-time-map' } },
  { job: 'Food delivery zone', radius: '3-5 mi', tool: { label: 'Radius Map', href: '/' } },
  { job: 'Walking distance (hotel block, urban events)', radius: '0.5 mi / 10-min walk', tool: { label: 'Walking Radius Map', href: '/walking-radius-map' } },
  { job: 'Retail trade area (neighborhood)', radius: '1-3 mi', tool: { label: 'Radius Map', href: '/' } },
  { job: 'Retail trade area (destination retailer)', radius: '10-30 mi', tool: { label: 'Radius Map', href: '/' } },
  { job: 'Service-area zip code list (GBP, direct mail)', radius: 'per zone', tool: { label: 'Zip Code Radius', href: '/zip-code-radius' } },
  { job: 'Geofenced display advertising', radius: '0.1-0.5 mi', tool: { label: 'Geofence Map', href: '/geofence-map' } },
  { job: 'Sales territory (dense / urban)', radius: '15-25 mi', tool: { label: 'Drive Time Map', href: '/drive-time-map' } },
  { job: 'Sales territory (rural / sparse)', radius: '50-100 mi', tool: { label: 'Radius Map', href: '/' } },
];

export default function UseCasesPage() {
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
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mapwithradius.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Use Cases',
                item: 'https://mapwithradius.com/use-cases',
              },
            ],
          }),
        }}
      />

      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Radius Map Use Cases',
            description:
              'How real estate agents, delivery teams, retailers, event planners, marketers, and sales managers use radius maps. Worked examples in 25 cities.',
            url: 'https://mapwithradius.com/use-cases',
            isPartOf: {
              '@id': 'https://mapwithradius.com/#website',
            },
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
            <span className="text-slate-700">Use Cases</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Radius Map Use Cases
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            A radius circle on a map sounds simple, but the same primitive answers very
            different questions depending on the job. This page covers six fields that use
            radius maps daily — with concrete examples, common pitfalls, and which Map With
            Radius tool fits each scenario.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            If you&apos;re here to pick a number quickly, the quick-reference table below
            covers the typical radius and recommended tool for ten common jobs. For depth,
            read the detailed walkthroughs that follow.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-slate-900">{useCases.length}</div>
              <div className="text-sm text-slate-600">industries covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{CITIES.length}</div>
              <div className="text-sm text-slate-600">city walkthroughs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{FAQS.length}</div>
              <div className="text-sm text-slate-600">common questions</div>
            </div>
          </div>

          <nav aria-label="Use cases" className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-200">
            {useCases.map((u) => (
              <a
                key={u.id}
                href={`#${u.id}`}
                className="inline-flex items-center text-sm font-medium text-accent hover:underline"
              >
                {u.title}
              </a>
            )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`} className="text-slate-300">·</span>, el], [])}
          </nav>
        </div>
      </section>

      {/* Quick reference table */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">Quick reference: which radius for which job</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Scan the table for the typical radius and recommended tool by job. Skip to the
            detailed walkthroughs below for context, pitfalls, and city-specific examples.
          </p>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Typical radius</th>
                  <th>Best tool</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REFERENCE_ROWS.map((row) => (
                  <tr key={row.job}>
                    <td>{row.job}</td>
                    <td className="whitespace-nowrap">{row.radius}</td>
                    <td>
                      <Link href={row.tool.href} className="content-link">
                        {row.tool.label}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic mt-4">
            Ranges are typical starting points — calibrate against your own data
            (customer-distance distribution, on-time delivery rates, conversion rates) when
            possible.
          </p>
        </div>
      </section>

      <article className="section-white pb-16 pt-12 sm:pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Real Estate */}
          <section id="real-estate" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Real Estate</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Find homes that fit a real-world commute</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Buyers do not search by zip code — they search by what is reachable. A 20-mile
              radius around a workplace, school, or grandparent&apos;s house is a much better
              filter than a postal-code list, because it ignores administrative borders that
              do not match how people actually live.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Three concrete jobs:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Commute filter.</strong> Draw a 30-minute drive-time isochrone around the
                buyer&apos;s office. Anything outside is off the table; anything inside is a
                short list. Use the{' '}
                <Link href="/drive-time-map" className="content-link">Drive Time Map</Link> for
                this — a straight-line radius will mislead anyone living near a river or a
                large freeway gap.
              </li>
              <li>
                <strong>School-district overlap.</strong> Draw a radius around the desired school
                and intersect with current MLS listings. Agents can export the radius as KML
                and import it into their MLS or CRM.
              </li>
              <li>
                <strong>Comparable sales (comps).</strong> A 1-mile radius around the subject
                property is the standard appraiser definition for comparable sales. Use the{' '}
                <Link href="/" className="content-link">Radius Map</Link> with miles, drop a pin
                on the address, and screenshot or export.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> radius distance is not driving time. A 5-mile radius in
              suburban Houston covers 8 minutes of driving; the same radius in central
              Manhattan can mean 40 minutes. Show the isochrone where the difference matters.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/new-york-city" className="content-link">
                NYC radius map
              </Link>
              {' '}— mile-by-mile coverage from Times Square, including a comps radius walkthrough.
            </p>
          </section>

          {/* Delivery Zones */}
          <section id="delivery-zones" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Delivery & Service Zones</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Define a service radius your team can actually staff</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Restaurants, couriers, locksmiths, plumbers, mobile mechanics, and HVAC techs
              all face the same question: how far from the depot should we accept jobs? A
              radius gives a clear answer that a customer-service rep can quote in seconds:
              &quot;We deliver within 8 miles. Your address is 6.2 miles away — yes.&quot;
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Quote at point of order.</strong> Embed the radius circle on a website
                so customers see whether their address is in-zone before clicking buy.
              </li>
              <li>
                <strong>Tier pricing by ring.</strong> Define a 5-mile inner ring (free), a
                5–10-mile ring ($5 surcharge), and a 10–15-mile outer ring (delivery
                negotiated). The same address-to-distance math powers all three.
              </li>
              <li>
                <strong>Plan staffing by drive time, not radius.</strong> A 15-minute
                drive-time isochrone is a better staffing signal than a 5-mile circle, because
                it accounts for traffic. Use the{' '}
                <Link href="/drive-time-map" className="content-link">Drive Time Map</Link> for
                this; switch to{' '}
                <Link href="/walking-radius-map" className="content-link">Walking Radius Map</Link> for
                bicycle couriers.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> defining the zone in the office and never revisiting
              it. Re-draw your isochrone after major route changes (new bridge, road closure,
              new dispatch hub). The map that worked last year may quietly cost you on-time
              rates today.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/los-angeles" className="content-link">
                LA radius map
              </Link>
              {' '}— why a 10-mile radius in LA can mean 20 minutes off-peak or an hour at rush.
            </p>
          </section>

          {/* Retail Trade Area */}
          <section id="retail-trade-area" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Retail & Business Location</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Estimate market reach before you sign a lease</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Retailers, franchises, and gym operators rely on trade-area analysis: the area
              from which a location draws most of its customers. The classic primary trade
              area is roughly 70% of customers; the secondary trade area picks up another 20%.
              For a neighborhood store the primary radius might be 1 mile; for a destination
              retailer like a furniture warehouse it can be 30+ miles.
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Site selection.</strong> Stack candidate locations and draw the same
                radius around each. Compare overlap with the closest competitor, demographic
                pockets, and major employers.
              </li>
              <li>
                <strong>Market-size estimation.</strong> Pull population from the radius using
                a census-overlay tool (separate from this site), and you have a rough
                addressable population.
              </li>
              <li>
                <strong>Cannibalization check.</strong> If your existing store has a 5-mile
                trade area and the new candidate sits 4 miles away, you are dividing
                customers, not adding them. The visual overlap on a radius map makes the
                argument fast.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> picking a fixed radius without checking the actual
              customer-distance distribution. A 3-mile radius is a starting hypothesis, not a
              law. If the data shows 70% of customers come from within 2.1 miles, that is your
              real primary trade area.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/chicago" className="content-link">
                Chicago radius map
              </Link>
              {' '}— uses a lake-corrected radius math because half of any circle on the lakefront is open water.
            </p>
          </section>

          {/* Event Planning */}
          <section id="event-planning" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Event & Wedding Planning</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Find venues that work for everyone&apos;s travel</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Event planners use radius searches to constrain venue, hotel, and catering
              options around a center point — usually the ceremony location, the office, or
              the rough midpoint between the most distant guests.
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Hotel block within walking distance.</strong> A half-mile walking radius
                around the venue catches the hotels guests can leave on foot at the end of the
                evening — often the difference between a smooth night and ten Ubers at once.
              </li>
              <li>
                <strong>Reception within driving distance of ceremony.</strong> Most venues
                limit transit to 15–20 minutes between sites. Use a drive-time isochrone, not
                a radius, when the route crosses a bridge or highway.
              </li>
              <li>
                <strong>Corporate offsite midpoint.</strong> Map a radius around each
                attendee&apos;s home; the venues inside the intersection minimize total travel.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> measuring straight-line distance to a hotel that is
              physically across a river or highway. A 0.4-mile radius can hide a 1.2-mile walk
              in dense urban grids. Switch to walking distance for anything inside a city.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/paris" className="content-link">
                Paris radius map
              </Link>
              {' '}— compact-city geometry where a 1 km radius covers most central wedding venues.
            </p>
          </section>

          {/* Marketing & Local SEO */}
          <section id="marketing-local-seo" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Marketing & Local SEO</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Define a service area that matches how you actually market</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Local marketers use radii to scope geo-targeted ads, define service areas in
              Google Business Profile, and pick which neighborhoods to write local landing
              pages for. The radius is also the base unit of geofencing — see the{' '}
              <Link href="/geofence-map" className="content-link">Geofence Map Tool</Link> for
              that workflow.
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Google Ads geo targeting.</strong> Google lets you target a radius
                around a location. Drawing the same radius on a real map first prevents
                bidding on customers who are physically separated by a state line, water, or a
                highway you do not actually serve.
              </li>
              <li>
                <strong>Service-area Google Business Profile.</strong> Google asks for the cities
                or zip codes you serve. A radius map tells you which zip codes are inside
                your radius — which is what we built the{' '}
                <Link href="/zip-code-radius" className="content-link">Zip Code Radius</Link> for.
              </li>
              <li>
                <strong>Geofenced display advertising.</strong> A 0.5-mile geofence around a
                trade-show booth or competitor location triggers mobile ads only when devices
                physically enter that zone.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> assuming Google&apos;s radius targeting and your business
              radius are the same. Google&apos;s radius is bidder-side; it does not know your
              actual reach. Decide your zone first, then enter it into Ads.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/london" className="content-link">
                London radius map
              </Link>
              {' '}— Tube zones map almost 1:1 to radius bands, a useful trick for local SEO targeting.
            </p>
          </section>

          {/* Sales Territory */}
          <section id="sales-territory" className="scroll-mt-24">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Sales Territory Mapping</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Carve territories that balance opportunity with travel time</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Field-sales orgs split the country into territories. Done badly, one rep covers
              an empty rural area while another fights through dense urban traffic. Radius
              mapping is the first cut: every prospect within 60 miles of rep A, every other
              prospect to rep B.
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Round-robin assignment.</strong> Drop a center pin per rep, draw radii,
                resolve overlaps by closest distance. Quick and good enough for early-stage
                teams.
              </li>
              <li>
                <strong>Travel-time-balanced territory.</strong> Use a drive-time isochrone
                instead of a straight radius. Reps in dense metros need smaller territories;
                reps in low-density regions can cover much larger areas in the same hours.
              </li>
              <li>
                <strong>Customer-density correction.</strong> Shrink radii where prospects are
                concentrated and expand where they are sparse. The goal is equal pipeline per
                rep, not equal area.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Pitfall:</strong> assigning territories by zip code clumps without ever
              looking at the map. Zip codes have wildly different sizes — one rep with 50 zip
              codes in Manhattan can have less land than another with 5 zip codes in Wyoming.
              The radius view exposes that immediately.
            </p>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Worked example:</strong>{' '}
              <Link href="/radius-map/toronto" className="content-link">
                Toronto radius map
              </Link>
              {' '}— shows why a circular radius distorts the linear east-west GTA territory.
            </p>
          </section>
        </div>
      </article>

      {/* How to choose the right radius */}
      <section className="section-gray py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">How to choose the right radius for your use case</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            The right number is rarely &ldquo;5 miles&rdquo; or &ldquo;10 km&rdquo; — it depends on
            the question you&apos;re asking. Three quick rules cut through most of the
            decision:
          </p>
          <ol className="list-decimal list-outside pl-6 space-y-4 text-slate-700 mb-6">
            <li>
              <strong>Start with the question, not a round number.</strong> &ldquo;People
              within X distance of Y who do Z&rdquo; — X falls out of Z. A 30-minute commute
              is different from a 30-mile commute. Decide which constraint matters, then map.
            </li>
            <li>
              <strong>Straight-line for area, time-based for travel.</strong> Use a radius
              when the question is &ldquo;what fits inside this area?&rdquo; (trade area,
              comps, geofence). Use an isochrone when the question is &ldquo;how far can I
              travel?&rdquo; (commute, service response, delivery promise).
            </li>
            <li>
              <strong>Check the result visually.</strong> Draw the radius and ask: does the
              circle contain the things that belong (and exclude the things that don&apos;t)?
              If a 5-mile radius around your store includes a competitor&apos;s parking lot,
              the radius isn&apos;t wrong — your trade-area model is.
            </li>
          </ol>
          <p className="text-slate-700 leading-relaxed mb-6">
            Cross-check with data when possible. If you have order or POS records, plot the
            customer-distance distribution. The radius that captures 70% of activity is your
            real primary zone — regardless of what the rule of thumb says. If you don&apos;t
            have data yet, start with the table values above and revise after one quarter of
            real operations.
          </p>
          <p className="text-slate-700 leading-relaxed">
            And remember the city pages. A 10-mile radius isn&apos;t the same job in
            Manhattan as in Houston as in central London. Each{' '}
            <Link href="/radius-map" className="content-link">city radius map page</Link>{' '}
            documents the local quirks (water, mountains, density, transit) that change how
            a radius behaves there.
          </p>
        </div>
      </section>

      {/* Worked examples by city — RICH CARDS */}
      <section className="section-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-3">Worked examples by city</h2>
          <p className="text-slate-700 mb-8 max-w-2xl">
            Each city page applies the use cases above to a specific local geography —
            real-estate comp radii, delivery isochrones, trade-area math, transit-aware
            commute filters — calibrated to that city&apos;s scale and quirks.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/radius-map/${c.slug}`}
                className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
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
          <p className="text-sm text-slate-500 mt-8 text-center">
            <Link href="/radius-map" className="content-link">
              See the full city radius map index &rarr;
            </Link>
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
            Industry methodology and academic sources behind the use cases above.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Trade-area methodology</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Reilly%27s_law_of_retail_gravitation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Reilly&apos;s Law of Retail Gravitation
                  </a>{' '}
                  — 1929 foundational trade-area math.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Huff_model"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Huff Model
                  </a>{' '}
                  (David Huff, 1964) — gravity-based probabilistic trade-area estimation.
                </li>
                <li>
                  <a
                    href="https://www.icsc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    ICSC
                  </a>{' '}
                  — International Council of Shopping Centers; site-selection standards.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Demographic &amp; overlay data</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://www.census.gov/data.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    US Census Bureau
                  </a>{' '}
                  — population, housing, demographic counts by geography.
                </li>
                <li>
                  <a
                    href="https://ec.europa.eu/eurostat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Eurostat
                  </a>{' '}
                  — EU statistical office, equivalent data for European cities.
                </li>
                <li>
                  <a
                    href="https://www.statcan.gc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Statistics Canada
                  </a>{' '}
                  — Canadian census and economic data.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Geographic methodology</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Haversine_formula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Haversine formula
                  </a>{' '}
                  — math used to compute spherical distances on this site.
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/15-minute_city"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    15-minute city
                  </a>{' '}
                  — Carlos Moreno&apos;s chrono-urbanism framework, foundation for
                  walking-distance planning.
                </li>
                <li>
                  <a
                    href="https://www.walkscore.com/methodology.shtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Walk Score methodology
                  </a>{' '}
                  — distance-decay weighting and amenity-catchment standards.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Local marketing standards</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://support.google.com/business/answer/9157481"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    Google Business Profile — Service Areas
                  </a>{' '}
                  — official guidance for local SEO setup.
                </li>
                <li>
                  <a
                    href="https://iabtechlab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    IAB Tech Lab
                  </a>{' '}
                  — industry standards for geo-targeted advertising and geofencing.
                </li>
                <li>
                  <Link href="/glossary" className="content-link">
                    Map &amp; radius glossary
                  </Link>{' '}
                  — definitions of isochrone, geofence, trade area, KML, and related terms.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pick the tool</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Radius Map (Miles)</div>
              <div className="text-sm text-slate-600">Comps, trade area, service radius</div>
            </Link>
            <Link
              href="/km-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">KM Radius Map</div>
              <div className="text-sm text-slate-600">Same tool, kilometers</div>
            </Link>
            <Link
              href="/drive-time-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">Commute filter, staffing, territory balancing</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Bicycle couriers, urban events, walk-up retail</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Zip Code Radius</div>
              <div className="text-sm text-slate-600">Service-area zip lists for GBP and Ads</div>
            </Link>
            <Link
              href="/geofence-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Geofence Map Tool</div>
              <div className="text-sm text-slate-600">Define geofences for ads and triggers</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
