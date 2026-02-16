import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Map With Radius',
  description: 'Map With Radius is a free set of online mapping tools for drawing radius circles, measuring distances, and visualizing travel time areas on a map.',
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
      <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Map With Radius</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Map With Radius is a free set of online mapping tools for drawing radius circles,
          measuring distances, and visualizing travel time areas on a map.
        </p>

        <p className="text-gray-700 mb-6">
          The tools are built with Leaflet (an open-source JavaScript mapping library) and
          OpenStreetMap data. There is no Google Maps dependency, no API usage limits, and
          no account required.
        </p>

        <p className="text-gray-700 mb-6">
          The site was created to provide a modern, fast, and mobile-friendly alternative to
          existing radius map tools — many of which rely on dated interfaces and paid Google
          Maps API access.
        </p>

        <p className="text-gray-700 mb-8">
          All tools on this site are free to use with no restrictions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tools Available</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>
            <Link href="/" className="text-primary hover:underline font-medium">
              Radius Map
            </Link>
            {' — Draw radius circles on a map by distance'}
          </li>
          <li>
            <Link href="/drive-time-map" className="text-primary hover:underline font-medium">
              Drive Time Map
            </Link>
            {' — See how far you can drive, walk, or cycle in a given time'}
          </li>
          <li>
            <Link href="/zip-code-radius" className="text-primary hover:underline font-medium">
              Zip Code Radius
            </Link>
            {' — Find all zip codes within a radius'}
          </li>
          <li>
            <Link href="/km-radius-map" className="text-primary hover:underline font-medium">
              KM Radius Map
            </Link>
            {' — Metric-first radius tool'}
          </li>
          <li>
            <Link href="/walking-radius-map" className="text-primary hover:underline font-medium">
              Walking & Cycling Map
            </Link>
            {' — Walking and cycling time radius'}
          </li>
          <li>
            <Link href="/distance-calculator" className="text-primary hover:underline font-medium">
              Distance Calculator
            </Link>
            {' — Measure distance between two points'}
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Map rendering:{' '}
            <a
              href="https://leafletjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Leaflet
            </a>
          </li>
          <li>
            Map tiles:{' '}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenStreetMap
            </a>
          </li>
          <li>
            Geocoding:{' '}
            <a
              href="https://nominatim.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Nominatim
            </a>
          </li>
          <li>Routing: Open Source Routing Machine (OSRM) / Valhalla</li>
        </ul>
      </div>
    </main>
    </>
  );
}
