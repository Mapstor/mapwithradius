import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, getCityBySlug, getNearbyCitiesByRegion } from '@/data/cities';
import { OG_IMAGES } from '@/lib/og';

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) {
    return {
      title: 'City Radius Map',
    };
  }
  const unitWord = city.defaultUnit === 'miles' ? 'Mile' : 'Kilometer';
  const title = `Radius Map of ${city.name}`;
  const description = `Draw a radius circle on a map centered on ${city.name}, ${city.country}. Free tool — enter any distance in ${city.defaultUnit}, drag to resize, export KML or PNG.`;
  const url = `https://mapwithradius.com/radius-map/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/radius-map/${city.slug}` },
    keywords: [
      `radius map ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} radius`,
      `${city.defaultRadius} ${city.defaultUnit} radius ${city.name.toLowerCase()}`,
      `${unitWord.toLowerCase()} radius map ${city.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url,
      images: OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: OG_IMAGES,
    },
  };
}

const RadiusMapWrapper = dynamic(() => import('@/components/map/RadiusMapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
    </div>
  ),
});

export default function CityRadiusMapPage({ params }: { params: Params }) {
  const city = getCityBySlug(params.city);
  if (!city) {
    notFound();
  }

  const unitDisplay = city.defaultUnit === 'miles' ? 'mi' : 'km';
  const nearby = getNearbyCitiesByRegion(city.slug, 4);
  const radiusOptions = city.defaultUnit === 'miles' ? [1, 5, 10, 25, 50] : [1, 5, 10, 25, 50];

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
              {
                '@type': 'ListItem',
                position: 3,
                name: city.name,
                item: `https://mapwithradius.com/radius-map/${city.slug}`,
              },
            ],
          }),
        }}
      />

      {/* WebPage with mainEntity = Place */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Radius Map of ${city.name}`,
            description: `Free radius map tool centered on ${city.name}, ${city.country}.`,
            url: `https://mapwithradius.com/radius-map/${city.slug}`,
            isPartOf: { '@id': 'https://mapwithradius.com/#website' },
            mainEntity: {
              '@type': 'Place',
              name: city.name,
              address: {
                '@type': 'PostalAddress',
                addressLocality: city.name,
                addressCountry: city.countryCode,
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: city.lat,
                longitude: city.lng,
              },
            },
          }),
        }}
      />

      {/* Map widget — full bleed */}
      <div className="w-full">
        <RadiusMapWrapper
          defaultUnit={city.defaultUnit}
          defaultRadius={city.defaultRadius}
          initialCenter={{ lat: city.lat, lng: city.lng }}
        />
      </div>

      {/* Hero / Intro */}
      <section className="section-white py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/radius-map" className="hover:text-slate-700">
              City Radius Maps
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{city.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Radius Map of {city.name}
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            The map above is centered on <strong>{city.name}</strong>, {city.country}, with a
            default {city.defaultRadius} {unitDisplay} radius. Drag to move it, search for a
            different address, or change the radius and unit using the controls.
          </p>

          {/* City facts */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-200">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Population</dt>
              <dd className="text-base font-semibold text-slate-900 mt-1">{city.populationLabel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Country</dt>
              <dd className="text-base font-semibold text-slate-900 mt-1">{city.country}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Coordinates</dt>
              <dd className="text-base font-semibold text-slate-900 mt-1">
                {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Time zone</dt>
              <dd className="text-base font-semibold text-slate-900 mt-1">{city.timezone}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Intro paragraph + fact */}
      <section className="section-white pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-slate-700 leading-relaxed">{city.intro}</p>
          <div className="border-l-4 border-accent pl-4 py-2 bg-slate-50 rounded-r">
            <p className="text-sm text-slate-700 italic">{city.fact}</p>
          </div>
        </div>
      </section>

      {/* Common radii */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Common radii from {city.name}
          </h2>
          <p className="text-slate-700 mb-6">
            Pick a starting radius. The tool above defaults to {city.defaultRadius} {unitDisplay} —
            tap a chip to set a different value, or type any number.
          </p>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((r) => (
              <span
                key={r}
                className="inline-flex items-center px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-full border border-slate-200"
              >
                {r} {unitDisplay}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="section-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Other cities in {city.region}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/radius-map/${n.slug}`}
                  className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="font-semibold text-slate-900">{n.name}</div>
                  <div className="text-sm text-slate-600">{n.country}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Tools */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/drive-time-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">Real-roads isochrone instead of a circle</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Pedestrian and cyclist isochrones</div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Distance Calculator</div>
              <div className="text-sm text-slate-600">Distance between any two points</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-slate-900">Zip Code Radius</div>
              <div className="text-sm text-slate-600">Find every zip code within a radius</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
