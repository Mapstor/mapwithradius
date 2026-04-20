import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Map With Radius — Free Online Radius Map Tool',
  description: 'Map With Radius — free privacy-first mapping tools built on Leaflet and OpenStreetMap. Our mission, full tool lineup, tech stack, and accuracy notes.',
  alternates: {
    canonical: '/about',
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
            description: 'Free online mapping tools for drawing radius circles, measuring distances, and visualizing geographic areas.',
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
              Map With Radius is a free, privacy-focused suite of online mapping tools designed to help
              people visualize distances, draw radius circles, and understand geographic areas. Whether
              you're a real estate professional, delivery business owner, urban planner, or someone
              simply trying to find what's within walking distance of your home, our tools are built
              to be fast, intuitive, and accessible to everyone.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that mapping tools should be free, easy to use, and respect your privacy.
              That's why we built Map With Radius from the ground up with these principles in mind.
              No account required. No personal data collected. No usage limits. Just open the tool
              and start mapping.
            </p>
          </section>

          {/* Our Mission */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to democratize geographic visualization by providing professional-grade
              mapping tools that are completely free and accessible to everyone. We're committed to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
              <li>
                <strong>Accessibility:</strong> No paywalls, no premium tiers, no feature restrictions.
                Every tool on our site is 100% free with full functionality.
              </li>
              <li>
                <strong>Privacy:</strong> We don't require accounts, don't track your location, and
                don't sell your data. Your mapping activities stay on your device.
              </li>
              <li>
                <strong>Simplicity:</strong> Our tools are designed to be intuitive. You shouldn't need
                a tutorial to draw a circle on a map.
              </li>
              <li>
                <strong>Performance:</strong> Fast loading, responsive design, and smooth interactions
                across all devices — from phones to desktops.
              </li>
              <li>
                <strong>Open Standards:</strong> We build on open-source technologies and open data
                (OpenStreetMap) to ensure our tools remain independent and sustainable.
              </li>
            </ul>
          </section>

          {/* Why We Built This */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why We Built This</h2>
            <p className="text-gray-700 mb-4">
              For years, drawing a simple radius circle on a map meant either paying for expensive
              software, dealing with clunky interfaces, or hitting API usage limits on tools that
              relied on paid map services.
            </p>
            <p className="text-gray-700 mb-4">
              We saw a gap: people needed a straightforward way to answer questions like "What's
              within 10 miles of this location?" or "How far can I drive in 30 minutes?" without
              signing up for anything or hitting a paywall.
            </p>
            <p className="text-gray-700 mb-6">
              Map With Radius was born from this frustration. By leveraging open-source mapping
              libraries (Leaflet) and open map data (OpenStreetMap), we created a sustainable,
              free alternative that doesn't compromise on features or user experience.
            </p>
          </section>

          {/* Who Uses Our Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who Uses Our Tools</h2>
            <p className="text-gray-700 mb-4">
              Map With Radius serves a diverse community of users across many industries and use cases:
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

          {/* Our Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Tools</h2>
            <p className="text-gray-700 mb-6">
              We offer a comprehensive suite of free mapping tools, each designed for specific use cases:
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Privacy Commitment</h2>
            <p className="text-gray-700 mb-4">
              Privacy is not an afterthought for us — it's a core design principle. Here's what
              makes Map With Radius different:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>No accounts:</strong> You never need to sign up, log in, or provide any
                personal information.
              </li>
              <li>
                <strong>No location tracking:</strong> When you use "My Location," your coordinates
                stay in your browser. We never see them.
              </li>
              <li>
                <strong>No advertising trackers:</strong> We don't use Google Analytics, Facebook
                Pixel, or any tracking cookies.
              </li>
              <li>
                <strong>Shareable links contain everything:</strong> When you share a map, the URL
                itself contains all the data. Nothing is stored on our servers.
              </li>
            </ul>
            <p className="text-gray-700">
              Read our full <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for
              complete details.
            </p>
          </section>

          {/* Future Development */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Development</h2>
            <p className="text-gray-700 mb-4">
              We're continuously working to improve Map With Radius. Some features on our roadmap include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>More export formats (GeoJSON, GPX, Shapefile)</li>
              <li>Custom map styles and color themes</li>
              <li>Embeddable widget for websites</li>
              <li>Measurement tools (area calculation, path distance)</li>
              <li>Multi-point route optimization</li>
              <li>Improved international address support</li>
            </ul>
            <p className="text-gray-700">
              Have a feature request? <Link href="/contact" className="text-primary hover:underline">Let us know</Link>.
              We read every message and prioritize based on user feedback.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              We love hearing from our users. Whether you have a question, found a bug, or want to
              suggest a feature, don't hesitate to reach out.
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@mapwithradius.com" className="text-primary hover:underline">
                contact@mapwithradius.com
              </a>
            </p>
            <p className="text-gray-700 mt-4">
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Visit our Contact page →
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
