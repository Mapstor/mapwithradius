import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'CalcMaps Alternative — Free Radius Map, No Prepaid Credits (2026)',
  description:
    'CalcMaps alternative — draw radius circles, export KML and PNG, no prepaid credits, no ads, no account. Free on OpenStreetMap with mobile-first design.',
  alternates: {
    canonical: '/alternatives/calcmaps',
  },
  keywords: [
    'calcmaps alternative',
    'calcmaps pro alternative',
    'free radius map without credits',
    'calcmaps free version',
  ],
  openGraph: {
    title: 'CalcMaps Alternative — Free Radius Map, No Prepaid Credits (2026)',
    description:
      'CalcMaps alternative — draw radius circles, export KML and PNG, no prepaid credits, no ads, no account. Free on OpenStreetMap with mobile-first design.',
    url: 'https://mapwithradius.com/alternatives/calcmaps',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcMaps Alternative — Free Radius Map, No Prepaid Credits (2026)',
    description:
      'CalcMaps alternative — draw radius circles, export KML and PNG, no prepaid credits, no ads, no account. Free on OpenStreetMap with mobile-first design.',
    images: OG_IMAGES,
  },
};

export default function CalcMapsAlternativePage() {
  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'CalcMaps Alternative',
            description:
              'CalcMaps alternative — draw radius circles, export KML and PNG, no prepaid credits, no ads, no account. Free on OpenStreetMap with mobile-first design.',
            url: 'https://mapwithradius.com/alternatives/calcmaps',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
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
                name: 'Alternatives',
                item: 'https://mapwithradius.com/alternatives',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'CalcMaps',
                item: 'https://mapwithradius.com/alternatives/calcmaps',
              },
            ],
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
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is CalcMaps free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The consumer site at calcmaps.com is free and ad-supported, with no account needed. The paid product CalcMaps PRO (calcmapspro.com) uses prepaid credits — one credit equals one day of access, sold in packs of 30, 90, 180, or 365 days.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does CalcMaps use a subscription?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. CalcMaps PRO uses prepaid credits, not a subscription. Plans never auto-renew, which avoids the recurring-charge trap common in SaaS tools.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I export KML from CalcMaps without paying?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'KML export is a PRO-only feature, so you need to purchase credits. Map With Radius exports KML for free, with no account, no credits, and no ads.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best free alternative to CalcMaps PRO?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Map With Radius offers unlimited free radius drawing, KML and PNG export, multiple circles, and mobile support — with no prepaid credits, no ads, and no account. It does not replicate CalcMaps' broader tool suite (area, elevation, GPX) but covers the radius use case in full.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is CalcMaps or Map With Radius better for commercial use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CalcMaps PRO grants commercial-use rights as part of its paid packages. Map With Radius is free for commercial use as well, and the tool can be embedded into your own site via the /embed endpoint without any Google Maps API key.',
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb navigation */}
      <nav className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/alternatives" className="hover:text-slate-900">
                Alternatives
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">CalcMaps</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            CalcMaps Alternative — Free Radius Maps Without Prepaid Credits
          </h1>
          <p className="text-lg text-slate-600">
            CalcMaps runs a free consumer site and a separate paid product (CalcMaps PRO) built on
            prepaid credit packages. If you want to draw radius circles without buying credits or
            subscribing to anything, here&apos;s how Map With Radius compares.
          </p>
        </header>

        {/* Section 2: What CalcMaps Is */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            What CalcMaps Is
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              CalcMaps (calcmaps.com) is a free, ad-supported suite of browser-based mapping tools —
              radius, area, distance, and elevation calculators — running on Google Maps. It is
              aimed at casual consumer users. A separate paid product, CalcMaps PRO
              (calcmapspro.com), launched in 2021 under the Portuguese company Emptydrops LDA and
              targets users who need exports, custom icons, and commercial-use rights.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Source:{' '}
              <a
                href="https://www.calcmaps.com/map-radius/"
                target="_blank"
                rel="noopener noreferrer"
                className="content-link"
              >
                CalcMaps — Map Radius
              </a>
            </p>
          </div>
        </section>

        {/* Section 3: Pricing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Pricing &amp; Access
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              The free calcmaps.com site is ad-supported and requires no account. CalcMaps PRO uses
              a prepaid credits model, not a subscription — one credit equals one day of access,
              and you buy packages of 30, 90, 180, or 365 credits (larger packs have a lower
              per-day cost). A 7-day free trial is available without a credit card. All paid
              packages include the same feature set: 100 projects, 5 location stores, 200 objects
              per project, import/export, elevation, GPX export, custom icons, and commercial-use
              rights. Plans never auto-renew.
            </p>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            How CalcMaps Compares
          </h2>
          <div className="overflow-x-auto">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>CalcMaps</th>
                  <th>Map With Radius</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Price model</td>
                  <td>Free (ads) + PRO prepaid credits</td>
                  <td className="text-green-700 font-medium">Free forever</td>
                </tr>
                <tr>
                  <td className="font-medium">Account required</td>
                  <td>Free site: no / PRO: yes</td>
                  <td className="text-green-700 font-medium">No</td>
                </tr>
                <tr>
                  <td className="font-medium">Ads</td>
                  <td>Yes (free site)</td>
                  <td className="text-green-700 font-medium">None</td>
                </tr>
                <tr>
                  <td className="font-medium">Map engine</td>
                  <td>Google Maps</td>
                  <td className="text-green-700 font-medium">OpenStreetMap</td>
                </tr>
                <tr>
                  <td className="font-medium">KML export</td>
                  <td>PRO only (credits)</td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">PNG export</td>
                  <td>PRO only (credits)</td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">Multiple radius circles</td>
                  <td>PRO only (credits)</td>
                  <td className="text-green-700 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="font-medium">Commercial-use rights</td>
                  <td>PRO only (credits)</td>
                  <td className="text-green-700 font-medium">Permitted, no gating</td>
                </tr>
                <tr>
                  <td className="font-medium">Auto-renewing subscription</td>
                  <td>No (credits, one-time)</td>
                  <td className="text-green-700 font-medium">None required</td>
                </tr>
                <tr>
                  <td className="font-medium">Mobile-friendly</td>
                  <td>Partial</td>
                  <td className="text-green-700 font-medium">Responsive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Where MWR wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Where Map With Radius Wins
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Map With Radius is free without any credit packages or subscription terms. CalcMaps
              PRO&apos;s prepaid model is fairer than a surprise auto-renewal, but you still pay per
              day of access — if you draw a radius twice a month, you are paying for days you did
              not use. Our tool has no metering, no expiry, and no per-use billing.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The free calcmaps.com site is ad-supported. Map With Radius runs without ads. For
              someone drawing a radius on a phone during a commute, a property search, or a site
              visit, ad interruptions add friction to what should be a ten-second task.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We also run on OpenStreetMap via Leaflet rather than Google Maps. That removes Google
              Maps API quota risk for anyone embedding the tool, avoids Google account prompts for
              end users, and means the tool continues to work regardless of Google&apos;s API
              pricing changes.
            </p>
          </div>
        </section>

        {/* Section 6: When competitor wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            When CalcMaps Is Still the Right Choice
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              CalcMaps is broader than a pure radius tool. If you need area calculation, elevation
              profiles, or GPX route work alongside radius mapping, the paid CalcMaps PRO package
              covers the whole suite under one purchase. Map With Radius focuses exclusively on
              radius and drive-time mapping — we do not offer elevation profiles or GPX-route
              workflows.
            </p>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                Is CalcMaps free?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The consumer site at calcmaps.com is free and ad-supported, with no account needed.
                The paid product CalcMaps PRO (calcmapspro.com) uses prepaid credits — one credit
                equals one day of access, sold in packs of 30, 90, 180, or 365 days.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Does CalcMaps use a subscription?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                No. CalcMaps PRO uses prepaid credits, not a subscription. Plans never auto-renew,
                which avoids the recurring-charge trap common in SaaS tools.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I export KML from CalcMaps without paying?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                KML export is a PRO-only feature, so you need to purchase credits. Map With Radius
                exports KML for free, with no account, no credits, and no ads.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What is the best free alternative to CalcMaps PRO?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Map With Radius offers unlimited free radius drawing, KML and PNG export, multiple
                circles, and mobile support — with no prepaid credits, no ads, and no account. It
                does not replicate CalcMaps&apos; broader tool suite (area, elevation, GPX) but
                covers the radius use case in full.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is CalcMaps or Map With Radius better for commercial use?
                <svg
                  className="w-5 h-5 faq-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                CalcMaps PRO grants commercial-use rights as part of its paid packages. Map With
                Radius is free for commercial use as well, and the tool can be embedded into your
                own site via the /embed endpoint without any Google Maps API key.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try Map With Radius</h2>
          <p className="text-slate-300 mb-6">
            Free, no credit packages, no account, no ads.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Open the radius tool
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Footer link row */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="content-link">
              &larr; Main radius tool
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives" className="content-link">
              All alternatives
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/mapdevelopers" className="content-link">
              MapDevelopers &rarr;
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/alternatives/smappen" className="content-link">
              Smappen &rarr;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
