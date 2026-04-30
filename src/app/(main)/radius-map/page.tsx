import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES } from '@/data/cities';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'City Radius Maps',
  description:
    'Pre-centered radius maps for major cities — New York, London, Paris, Tokyo, Sydney, and more. Pick a city to start drawing a radius without searching for the address.',
  alternates: {
    canonical: '/radius-map',
  },
  keywords: [
    'city radius map',
    'radius map by city',
    'london radius map',
    'new york radius map',
    'paris radius map',
  ],
  openGraph: {
    title: 'City Radius Maps',
    description:
      'Pre-centered radius maps for major cities — New York, London, Paris, Tokyo, Sydney, and more.',
    url: 'https://mapwithradius.com/radius-map',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Radius Maps',
    description:
      'Pre-centered radius maps for major cities — New York, London, Paris, Tokyo, Sydney, and more.',
    images: OG_IMAGES,
  },
};

const REGIONS = ['North America', 'Europe', 'Asia', 'Oceania'];

export default function RadiusMapIndexPage() {
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

      {/* CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'City Radius Maps',
            description: 'Pre-centered radius maps for major cities worldwide.',
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

      <section className="section-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">City Radius Maps</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            City Radius Maps
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Skip the address search. Each link opens the radius tool already centered on the
            city, with a starting radius that fits the city&apos;s scale. Currently
            covering {CITIES.length} cities across four continents.
          </p>
        </div>
      </section>

      <section className="section-white pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {REGIONS.map((region) => {
            const regionCities = CITIES.filter((c) => c.region === region);
            if (regionCities.length === 0) return null;
            return (
              <div key={region}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{region}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {regionCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/radius-map/${c.slug}`}
                      className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      <div className="text-sm text-slate-600">
                        {c.country} · default {c.defaultRadius}{' '}
                        {c.defaultUnit === 'miles' ? 'mi' : 'km'}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Or use the main tool</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Radius Map (Miles)</div>
              <div className="text-sm text-slate-600">Search any address, draw any radius</div>
            </Link>
            <Link
              href="/km-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">KM Radius Map</div>
              <div className="text-sm text-slate-600">Same tool, kilometers as default</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
