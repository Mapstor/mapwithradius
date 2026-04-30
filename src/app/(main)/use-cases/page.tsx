import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

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
              'Concrete examples of how different professions use radius maps to make decisions.',
            url: 'https://mapwithradius.com/use-cases',
            isPartOf: {
              '@id': 'https://mapwithradius.com/#website',
            },
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
          <p className="text-lg text-slate-600 mb-6">
            A radius circle on a map sounds simple, but the same primitive answers very
            different questions depending on the job. Here is how six fields actually use
            them — with concrete examples, common pitfalls, and which Map With Radius tool
            fits each scenario.
          </p>
          <nav aria-label="Use cases" className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
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

      <article className="section-white pb-16">
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
          </section>
        </div>
      </article>

      {/* Related Tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pick the Tool</h2>
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
