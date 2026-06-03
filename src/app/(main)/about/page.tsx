import { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'About Our Free Radius Map Tools',
  description: 'Map With Radius — free, privacy-respecting mapping tools built on Leaflet and OpenStreetMap. Our mission, full tool lineup, tech stack, and accuracy notes.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: 'https://mapwithradius.com/about',
    title: 'About Our Free Radius Map Tools',
    description: 'Map With Radius — free, privacy-respecting mapping tools built on Leaflet and OpenStreetMap. Our mission, full tool lineup, tech stack, and accuracy notes.',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Free Radius Map Tools',
    description: 'Map With Radius — free, privacy-respecting mapping tools built on Leaflet and OpenStreetMap. Our mission, full tool lineup, tech stack, and accuracy notes.',
    images: OG_IMAGES,
  },
};

export default function AboutPage() {
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
                name: 'About',
                item: 'https://mapwithradius.com/about',
              },
            ],
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Map With Radius',
            url: 'https://mapwithradius.com',
            logo: 'https://mapwithradius.com/apple-icon',
            description:
              'Free, privacy-respecting radius mapping tools. Built by an avid traveler who uses maps a lot — no signup, no API keys, no usage limits. Powered by OpenStreetMap and Leaflet.',
            sameAs: [],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@mapwithradius.com',
              contactType: 'customer support',
            },
          }),
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Map With Radius</h1>

        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              I&apos;m an avid traveler who uses maps a lot. Map With Radius started because I
              wanted a fast, free way to draw a circle on a map — &ldquo;what&apos;s within 5 miles
              of this hostel?&rdquo;, &ldquo;how far can I get from this Airbnb on foot?&rdquo;,
              &ldquo;which neighborhoods are within 20 minutes of the office?&rdquo; — and every
              existing tool either wanted me to sign up, sold an API plan, or buried the feature
              behind a paywall.
            </p>
            <p className="text-gray-700 mb-6">
              So I built one. No account, no usage limits, no location tracking. It runs on
              OpenStreetMap and Leaflet, which means there are no Google Maps API fees to recoup
              from you. Whether you&apos;re a real estate agent comparing comps, a planner defining
              a delivery zone, a couple picking a wedding venue, or just someone curious about a
              30-minute walk from home — these tools are yours, free.
            </p>
          </section>

          {/* Principles */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What this site is and isn&apos;t</h2>
            <p className="text-gray-700 mb-4">
              A few non-negotiables I held to when building it:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
              <li>
                <strong>Free with full functionality.</strong> No paywalls, no premium tiers, no
                feature gates. Every tool here is the full tool.
              </li>
              <li>
                <strong>No account, ever.</strong> You shouldn&apos;t need to hand over an email
                address to draw a circle on a map.
              </li>
              <li>
                <strong>Your location stays in your browser.</strong> If you click &ldquo;Use My
                Location,&rdquo; the GPS lookup happens locally. The coordinates never leave the
                page.
              </li>
              <li>
                <strong>Mobile-first.</strong> A surprising number of map tools online are still
                broken on phones. This one isn&apos;t.
              </li>
              <li>
                <strong>Built on open data.</strong> OpenStreetMap and Leaflet, not a paid Google
                or Mapbox API. That&apos;s what makes &ldquo;free forever&rdquo; sustainable.
              </li>
            </ul>
          </section>

          {/* Why I built this */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why I built this</h2>
            <p className="text-gray-700 mb-4">
              For years, drawing a simple radius circle on a map meant either paying for expensive
              software, dealing with clunky 2010-era interfaces, or hitting API usage limits on
              tools that relied on paid map services. Most of the existing &ldquo;free radius
              map&rdquo; sites are built on Google Maps under the hood — which means they pay
              per-request fees and either show ads aggressively or limit usage.
            </p>
            <p className="text-gray-700 mb-4">
              The frustrating part: the underlying technology has been free and open-source for
              over a decade. Leaflet was first released in 2011. OpenStreetMap has full global
              coverage. Nobody had wrapped them in a clean, mobile-first tool that respects
              your time.
            </p>
            <p className="text-gray-700 mb-6">
              So that&apos;s what this is. A focused wrapper around open-source mapping that
              answers one question really well — &ldquo;what&apos;s inside this circle?&rdquo; —
              plus a few related ones (drive time, walking time, distance between two points,
              zip codes within a radius, geofence planning). I use it constantly when I travel.
              You should too.
            </p>
          </section>

          {/* Who uses these tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who actually uses these tools</h2>
            <p className="text-gray-700 mb-4">
              Beyond travelers like me, the tool has found its way into a few specific
              communities. The deeper guides on{' '}
              <Link href="/use-cases" className="text-primary hover:underline">use cases</Link>{' '}
              go into each in detail; here&apos;s the short version.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Real Estate Professionals</h3>
                <p className="text-gray-600 text-sm">
                  Agents and property developers use our radius tools to show clients what amenities,
                  schools, and services are within a certain distance of a property. The drive time
                  map helps illustrate commute possibilities.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Delivery & Logistics</h3>
                <p className="text-gray-600 text-sm">
                  Restaurants, retailers, and logistics companies use radius maps to define delivery
                  zones, calculate service areas, and plan distribution coverage from warehouses.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Urban Planners & Researchers</h3>
                <p className="text-gray-600 text-sm">
                  City planners, academics, and researchers use our tools to analyze accessibility,
                  study walkability, and visualize the reach of public services and infrastructure.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Sales & Marketing Teams</h3>
                <p className="text-gray-600 text-sm">
                  Territory mapping, market analysis, and identifying potential customers within a
                  geographic radius are common use cases for sales and marketing professionals.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Event Organizers</h3>
                <p className="text-gray-600 text-sm">
                  Event planners use radius maps to understand venue accessibility, identify potential
                  attendees within driving distance, and plan parking and transportation logistics.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Everyday People</h3>
                <p className="text-gray-600 text-sm">
                  Home buyers checking neighborhood walkability, job seekers evaluating commutes,
                  parents finding activities near home, or anyone curious about what's nearby.
                </p>
              </div>
            </div>
          </section>

          {/* The Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The tools</h2>
            <p className="text-gray-700 mb-6">
              Each tool below answers a specific question. They share the same map engine, geocoder,
              and export formats, so muscle memory carries between them.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/" className="text-lg font-semibold text-primary hover:underline">
                  Radius Map Tool
                </Link>
                <p className="text-gray-600 mt-1">
                  Our flagship tool. Draw one or multiple radius circles on any map. Customize the
                  radius in miles, kilometers, meters, or feet. Drag to reposition, resize by
                  dragging the edge, and export as PNG or KML. Perfect for visualizing coverage
                  areas, delivery zones, and geographic reach.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/drive-time-map" className="text-lg font-semibold text-primary hover:underline">
                  Drive Time Map
                </Link>
                <p className="text-gray-600 mt-1">
                  See how far you can actually travel in a given time, accounting for real roads and
                  traffic patterns. Unlike simple radius circles, drive time isochrones show realistic
                  travel boundaries for driving, walking, or cycling.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/distance-calculator" className="text-lg font-semibold text-primary hover:underline">
                  Distance Calculator
                </Link>
                <p className="text-gray-600 mt-1">
                  Measure the straight-line (as-the-crow-flies) distance between any two points on
                  Earth. Click two locations or enter addresses to get instant distance calculations
                  in multiple units.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/km-radius-map" className="text-lg font-semibold text-primary hover:underline">
                  KM Radius Map
                </Link>
                <p className="text-gray-600 mt-1">
                  The same powerful radius tool with kilometers as the default unit. Designed for
                  users in countries that use the metric system, with quick presets in common
                  kilometer distances.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/zip-code-radius" className="text-lg font-semibold text-primary hover:underline">
                  ZIP Code Radius Finder
                </Link>
                <p className="text-gray-600 mt-1">
                  Find all ZIP codes within a specified radius of a location. Essential for direct
                  mail campaigns, market research, and defining service areas based on postal codes.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <Link href="/walking-radius-map" className="text-lg font-semibold text-primary hover:underline">
                  Walking & Cycling Radius Map
                </Link>
                <p className="text-gray-600 mt-1">
                  Visualize how far you can walk or cycle from a location. Perfect for walkability
                  analysis, urban planning, real estate listings, and finding what's accessible
                  without a car.
                </p>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology & Open Source</h2>
            <p className="text-gray-700 mb-4">
              Map With Radius is built entirely on open-source technologies and open data. This
              approach ensures we're not dependent on expensive commercial APIs and can offer our
              tools for free indefinitely.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Our Technology Stack</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-medium min-w-[140px]">Map Rendering:</span>
                  <span>
                    <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline">Leaflet</a> —
                    A lightweight, open-source JavaScript library for interactive maps
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium min-w-[140px]">Map Data:</span>
                  <span>
                    <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline">OpenStreetMap</a> —
                    Free, editable map of the world built by a community of mappers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium min-w-[140px]">Geocoding:</span>
                  <span>
                    <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline">Nominatim</a> —
                    OpenStreetMap's address search and reverse geocoding service
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium min-w-[140px]">Routing:</span>
                  <span>
                    <a href="https://project-osrm.org/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline">OSRM</a> /
                    <a href="https://valhalla.github.io/valhalla/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline ml-1">Valhalla</a> —
                    Open-source routing engines for drive time calculations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium min-w-[140px]">Framework:</span>
                  <span>
                    <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"
                       className="text-primary hover:underline">Next.js</a> —
                    React framework for fast, SEO-friendly web applications
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700">
              By choosing open-source alternatives to proprietary services like Google Maps API,
              we avoid per-request costs that would force us to implement usage limits or charge
              for access. This is why Map With Radius can remain completely free.
            </p>
          </section>

          {/* Accuracy & Limitations */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accuracy & Limitations</h2>
            <p className="text-gray-700 mb-4">
              While we strive for accuracy, it's important to understand the limitations of our tools:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Radius circles</strong> are mathematically accurate but represent straight-line
                distance, not actual travel distance along roads.
              </li>
              <li>
                <strong>Drive time maps</strong> provide estimates based on typical conditions. Actual
                travel times vary with traffic, weather, and road conditions.
              </li>
              <li>
                <strong>Geocoding results</strong> depend on OpenStreetMap data quality, which varies
                by region. Some addresses may not be found or may be imprecisely located.
              </li>
              <li>
                <strong>Map data</strong> is contributed by volunteers and may contain errors or be
                outdated in some areas.
              </li>
            </ul>
            <p className="text-gray-700">
              For critical applications (legal, safety, financial), always verify our results with
              authoritative sources. Our tools are designed for planning and visualization, not as
              a replacement for professional surveys or official data.
            </p>
          </section>

          {/* Privacy Commitment */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and how I keep this free</h2>
            <p className="text-gray-700 mb-4">
              The tool side of this is privacy-respecting by design — the things that matter most for
              a mapping tool (where you searched, where you are) never leave your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>No accounts.</strong> You never need to sign up, log in, or provide any
                personal information.
              </li>
              <li>
                <strong>Your location stays on your device.</strong> When you use &ldquo;My Location,&rdquo;
                the GPS lookup happens in your browser. Coordinates never reach our servers.
              </li>
              <li>
                <strong>No map data stored.</strong> The circles you draw, the addresses you search,
                and the maps you export aren&apos;t saved anywhere on our side. Shareable links
                encode everything in the URL itself.
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              To keep the tool free with no usage limits, I do two things that any honest privacy
              page should disclose:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Aggregate analytics.</strong> I use Google Analytics 4 to understand which
                pages are useful and where the tool is struggling. It uses cookies.
              </li>
              <li>
                <strong>Advertising.</strong> I&apos;ve integrated Google AdSense to fund the site
                — the account is currently in review with Google, so no live ads are serving yet.
                Once approved, AdSense will display ads and ad partners may set cookies. For
                visitors in the EEA, UK, and Switzerland, Google Consent Mode v2 keeps
                non-essential cookies default-denied, so any AdSense ads there will default to
                Limited (non-personalized); a consent management platform is planned.
              </li>
            </ul>
            <p className="text-gray-700">
              Full details in the{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> —
              including the opt-out link for personalized advertising.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-gray-700 mb-4">
              Questions, bug reports, feature requests, or interesting use cases — all welcome.
              I read everything that comes in.
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@mapwithradius.com" className="text-primary hover:underline">
                contact@mapwithradius.com
              </a>
            </p>
            <p className="text-gray-700 mt-4">
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Or use the contact form &rarr;
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
