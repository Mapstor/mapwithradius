import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, getCityBySlug, getNearbyCitiesByRegion } from '@/data/cities';

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getCityBySlug(params.city);
  if (!city) {
    return { title: 'City Radius Map' };
  }
  const title = `Radius Map of ${city.name}`;
  const description = `What's within a radius of ${city.name}, ${city.country}. Mile-by-mile (or kilometer-by-kilometer) coverage from ${city.centralLandmark}, plus city-specific use cases, geographic quirks, and FAQs. Free interactive map.`;
  const url = `https://mapwithradius.com/radius-map/${city.slug}`;
  const altNames = city.alternateNames.join(', ').toLowerCase();
  return {
    title,
    description,
    alternates: { canonical: `/radius-map/${city.slug}` },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
  const unitWord = city.defaultUnit === 'miles' ? 'miles' : 'kilometers';
  const nearby = getNearbyCitiesByRegion(city.slug, 4);

  const lastUpdatedDisplay = new Date(city.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* BreadcrumbList */}
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

      {/* WebPage with Place mainEntity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Radius Map of ${city.name}`,
            description: `What's within a radius of ${city.name}, ${city.country}.`,
            url: `https://mapwithradius.com/radius-map/${city.slug}`,
            isPartOf: { '@id': 'https://mapwithradius.com/#website' },
            dateModified: city.lastUpdated,
            mainEntity: {
              '@type': 'Place',
              name: city.name,
              alternateName: city.alternateNames,
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

      {/* Article — editorial content authored by Marko Visic */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `https://mapwithradius.com/radius-map/${city.slug}#article`,
            headline: `Radius Map of ${city.name}`,
            description: `Hand-authored radius coverage for ${city.name}, ${city.country} — mile-by-mile (or km-by-km) lists of what's inside and just outside the most-searched circle sizes from ${city.centralLandmark}.`,
            datePublished: city.lastUpdated,
            dateModified: city.lastUpdated,
            author: { '@id': 'https://mapwithradius.com/about#marko' },
            publisher: { '@id': 'https://mapwithradius.com/#organization' },
            mainEntityOfPage: { '@id': `https://mapwithradius.com/radius-map/${city.slug}` },
          }),
        }}
      />

      {/* FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: city.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          }),
        }}
      />

      {/* Map widget — full bleed */}
      <div className="w-full map-tool-page">
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
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/radius-map" className="hover:text-slate-700">City Radius Maps</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{city.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Radius Map of {city.name}
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            The map above is centered on <strong>{city.name}</strong>, {city.country}, near
            {' '}{city.centralLandmark}, with a default {city.defaultRadius} {unitDisplay} radius.
            Drag to move it, search for a different address, or change the radius and unit
            using the controls.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">{city.intro}</p>

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

          <div className="border-l-4 border-accent pl-4 py-2 bg-slate-50 rounded-r mt-6">
            <p className="text-sm text-slate-700 italic">{city.fact}</p>
          </div>

          {city.alternateNames.length > 0 && (
            <p className="text-sm text-slate-500 mt-4">
              <strong>Also known as:</strong> {city.alternateNames.join(', ')}.
            </p>
          )}
        </div>
      </section>

      {/* Coverage table — what's within each radius */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            What&apos;s within each radius from {city.centralLandmark}
          </h2>
          <p className="text-slate-600 mb-8">
            Real coverage at the most-searched radii, including notable places that fall just
            outside the circle. Use these as ground truth before relying on a circle for
            real-estate, retail, or service-area decisions.
          </p>
          <div className="space-y-8">
            {city.coverage.map((c) => (
              <article key={c.label} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {c.label} from {city.centralLandmark}
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">{c.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                      Inside the circle
                    </h4>
                    <ul className="space-y-1 text-slate-700">
                      {c.includes.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Just outside
                    </h4>
                    <ul className="space-y-1 text-slate-700">
                      {c.excludes.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-400 mt-1">✗</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            How {city.name} radius maps get used
          </h2>
          <p className="text-slate-600 mb-8">
            City-specific scenarios where a radius is the right tool — and the typical radius
            sizes professionals use.
          </p>
          <div className="space-y-6">
            {city.useCases.map((u, i) => (
              <article key={i} className="border-l-4 border-accent pl-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{u.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-2">{u.description}</p>
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-700">Typical radius:</strong> {u.recommendedRadius}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic quirks */}
      <section className="section-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Geographic quirks of {city.name} radius mapping
          </h2>
          <p className="text-slate-600 mb-8">
            Local geography and infrastructure that change how a radius behaves here. Skipping
            these is the most common reason a radius decision goes sideways.
          </p>
          <div className="space-y-6">
            {city.quirks.map((q, i) => (
              <article key={i} className="bg-white p-5 rounded-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{q.title}</h3>
                <p className="text-slate-700 leading-relaxed">{q.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
            FAQ — Radius mapping in {city.name}
          </h2>
          <div className="space-y-6">
            {city.faqs.map((f, i) => (
              <article key={i}>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.question}</h3>
                <p className="text-slate-700 leading-relaxed">{f.answer}</p>
              </article>
            ))}
          </div>

          {/* See also */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">See also</h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                <Link href="/use-cases" className="content-link">
                  Radius Map Use Cases
                </Link>
                {' '}— how real estate, delivery, retail, event planning, marketing, and sales-ops teams use radius maps in practice.
              </li>
              <li>
                <Link href="/glossary" className="content-link">
                  Map &amp; Radius Glossary
                </Link>
                {' '}— plain-English definitions of isochrone, geofence, geocoding, KML, and 40+ other terms used on this page.
              </li>
              <li>
                <Link href="/radius-map" className="content-link">
                  All city radius maps
                </Link>
                {' '}— the index of all {CITIES.length} city pages.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="section-gray py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Other cities in {city.region}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/radius-map/${n.slug}`}
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
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
      <section className="section-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/drive-time-map"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Drive Time Map</div>
              <div className="text-sm text-slate-600">Real-roads isochrone instead of a circle</div>
            </Link>
            <Link
              href="/walking-radius-map"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Walking Radius Map</div>
              <div className="text-sm text-slate-600">Pedestrian and cyclist isochrones</div>
            </Link>
            <Link
              href="/distance-calculator"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Distance Calculator</div>
              <div className="text-sm text-slate-600">Distance between any two points</div>
            </Link>
            <Link
              href="/zip-code-radius"
              className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="font-semibold text-slate-900">Zip Code Radius</div>
              <div className="text-sm text-slate-600">Find every zip code within a radius</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Last updated */}
      <section className="section-gray py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-500 text-center">
          Last updated <time dateTime={city.lastUpdated}>{lastUpdatedDisplay}</time>
        </div>
      </section>
    </>
  );
}
