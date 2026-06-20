import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import zipDensity from '@/data/zip-density.json';

export const metadata: Metadata = {
  title: 'Zip Code Radius Map — Free Tool',
  description: 'Enter a zip code and distance to find all zip codes within that radius. Export the list as CSV. Free, no signup.',
  alternates: {
    canonical: '/zip-code-radius',
  },
  openGraph: {
    title: 'Zip Code Radius Map — Find Zip Codes Within a Radius (Free)',
    description: 'Enter a zip code and distance to find all zip codes within that radius. Export the list as CSV.',
    url: 'https://mapwithradius.com/zip-code-radius',
  },
};

// Dynamic import for the map component (client-side only)
const ZipCodeRadiusMap = dynamic(() => import('@/components/map/ZipCodeRadiusMap'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="h-[60vh] lg:h-[75vh] bg-slate-100 animate-pulse" />
      <div className="absolute top-4 right-4 w-80 lg:w-96 h-[400px] bg-white rounded-xl shadow-lg animate-pulse hidden lg:block" />
    </div>
  ),
});

export default function ZipCodeRadiusPage() {
  return (
    <>
      {/* JSON-LD Schema */}
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
                name: 'Zip Code Radius',
                item: 'https://mapwithradius.com/zip-code-radius',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Zip Code Radius Map',
            description: 'Enter a zip code and distance to find all zip codes within that radius. Export the list as CSV.',
            url: 'https://mapwithradius.com/zip-code-radius',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Find Zip Codes Within a Radius',
            description: 'Step-by-step guide to finding all zip codes within a specified radius of a central zip code.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Enter your center zip code',
                text: 'Type a US zip code in the search field to set the center point of your radius search.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Set your radius distance',
                text: 'Choose a radius distance in miles (5, 10, 25, 50, or custom). The tool will draw a circle on the map.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'View matching zip codes',
                text: 'All zip codes that fall within or overlap your radius will be highlighted on the map and listed in the results panel.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Sort and filter results',
                text: 'Sort results by distance, zip code number, city name, or state to find the exact zip codes you need.',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Export your list',
                text: 'Click Export CSV to download the complete list with zip codes, cities, states, and distances for use in marketing or analysis.',
              },
            ],
          }),
        }}
      />

      {/* Hero Section with Tool */}
      <section className="bg-slate-50">
        {/* Hero header band */}
        <div className="bg-primary-900 py-3 lg:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Zip Code Radius Map</h1>
            <p className="text-slate-300 hidden lg:block">
              Enter a zip code and distance — get a list of every zip code within that radius.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto map-tool-page">
          <ZipCodeRadiusMap />
        </div>
      </section>

      {/* How to Use - Step by Step */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">How to Find Zip Codes Within a Radius</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Enter Your Center Zip Code</h3>
                <p className="text-slate-600">
                  Type any US zip code (e.g., 90210, 10001, 60601) in the search field. The map will center on that
                  location and show the zip code boundary.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Set Your Radius Distance</h3>
                <p className="text-slate-600">
                  Choose from preset distances (5, 10, 25, 50, 100 miles) or enter a custom radius. The tool draws a
                  circle from the center of your zip code extending outward.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">View Matching Zip Codes</h3>
                <p className="text-slate-600">
                  All zip codes that fall within (or overlap) your radius are highlighted on the map and listed in the
                  results panel. The count updates in real-time as you adjust the radius.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Sort and Filter Results</h3>
                <p className="text-slate-600">
                  Sort results by distance from center, zip code number, city name, or state. Click on any zip code to
                  highlight it on the map and see its details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Export Your List</h3>
                <p className="text-slate-600">
                  Click &ldquo;Export CSV&rdquo; to download the complete list. The file includes zip code, city, state,
                  and distance from center — ready for mail merges, CRM imports, or ad targeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zip Code Statistics */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">US Zip Code Statistics</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Zip Codes by State Chart */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">States with Most Zip Codes</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Texas</span>
                    <span className="font-medium">1,675</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>California</span>
                    <span className="font-medium">1,516</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New York</span>
                    <span className="font-medium">1,596</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pennsylvania</span>
                    <span className="font-medium">1,458</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Illinois</span>
                    <span className="font-medium">1,243</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '74%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ohio</span>
                    <span className="font-medium">1,007</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Zip Code Density Chart */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Average Zip Codes per Radius</h3>
              <p className="text-sm text-slate-600 mb-4">
                Based on typical urban/suburban density:
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>5-mile radius</span>
                    <span className="font-medium">15-40 zip codes</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>10-mile radius</span>
                    <span className="font-medium">40-100 zip codes</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>25-mile radius</span>
                    <span className="font-medium">100-300 zip codes</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>50-mile radius</span>
                    <span className="font-medium">200-600 zip codes</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>100-mile radius</span>
                    <span className="font-medium">400-1,200 zip codes</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                * Density varies by region. Urban areas have more zip codes per square mile than rural areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Metro Areas Table */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Zip Code Density by Major Metro Area</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Metro Area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Center Zip</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">10-mi Radius</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">25-mi Radius</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">50-mi Radius</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {zipDensity.metros.map((m) => (
                  <tr key={m.centerZip} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900">{m.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{m.centerZip}</td>
                    <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">
                      {m.counts['10'].toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">
                      {m.counts['25'].toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">
                      {m.counts['50'].toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            Counts computed from this site&apos;s ZIP database ({zipDensity.source}). Distances are
            haversine from each metro&apos;s downtown ZIP centroid. Last verified{' '}
            {zipDensity.generated}.
          </p>
        </div>
      </section>

      {/* Zip Code vs. Straight-Line Radius */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Understanding Zip Code Boundaries</h2>

          <div className="prose prose-slate max-w-none">
            <h3>What is a ZCTA?</h3>
            <p>
              The US Census Bureau creates <strong>Zip Code Tabulation Areas (ZCTAs)</strong> to approximate
              zip code boundaries with polygons. Unlike USPS zip codes (which are delivery routes, not geographic
              areas), ZCTAs let researchers tie census data to zip codes. This tool uses the centroid (center
              point latitude/longitude) of each ZCTA — provided by the SimpleMaps US ZIPs Free dataset — to test
              whether a zip code falls within your radius.
            </p>

            <h3>How a ZIP gets included</h3>
            <p>
              Each ZIP in the database has a single center point. The radius test compares that point against
              your circle:
            </p>
            <ul>
              <li>If a ZIP&apos;s center point falls within the radius, the entire ZIP is included.</li>
              <li>If the center point sits outside the radius, the ZIP is excluded — even if part of its actual
                area would overlap the circle. We don&apos;t render polygon boundaries, so we can&apos;t test
                for partial overlap.</li>
              <li>For mailing or marketing use cases where any boundary overlap matters, draw your radius a
                little wider than the strict cutoff (1–2 miles in dense urban areas, more in rural ones).</li>
            </ul>

            <h3>When to Use Circular Radius Instead</h3>
            <p>
              For precise circular boundaries without zip code boundaries, use our main{' '}
              <Link href="/" className="content-link">
                radius map tool
              </Link>
              . This is better for:
            </p>
            <ul>
              <li>Defining service areas with exact distance limits</li>
              <li>Compliance with regulations requiring specific mile limits</li>
              <li>Geofencing applications</li>
              <li>International locations (zip codes are US-only)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Zip Code Quick Reference</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">33,784</div>
              <div className="text-slate-600 text-sm">US ZIPs in this tool&apos;s database</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">5</div>
              <div className="text-slate-600 text-sm">Digits in a standard zip code</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">9</div>
              <div className="text-slate-600 text-sm">Digits in ZIP+4 format</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">10</div>
              <div className="text-slate-600 text-sm">Zip code regions (0-9)</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">1963</div>
              <div className="text-slate-600 text-sm">Year ZIP codes introduced</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-accent mb-1">7,500</div>
              <div className="text-slate-600 text-sm">Avg. population per zip code</div>
            </div>
          </div>

          {/* Zip Code Region Map */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Zip Code Regions by First Digit</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">0</span>
                <span className="text-slate-600"> — Northeast (MA, ME, NH, VT, RI, CT, NJ)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">1</span>
                <span className="text-slate-600"> — Northeast (NY, PA)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">2</span>
                <span className="text-slate-600"> — Mid-Atlantic (DC, MD, VA, WV, NC)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">3</span>
                <span className="text-slate-600"> — Southeast (FL, GA, AL, TN, MS)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">4</span>
                <span className="text-slate-600"> — Midwest (IN, KY, MI, OH)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">5</span>
                <span className="text-slate-600"> — Upper Midwest (IA, MN, MT, ND, SD, WI)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">6</span>
                <span className="text-slate-600"> — Central (IL, KS, MO, NE)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">7</span>
                <span className="text-slate-600"> — South Central (AR, LA, OK, TX)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">8</span>
                <span className="text-slate-600"> — Mountain West (AZ, CO, ID, NM, NV, UT, WY)</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="font-bold text-accent">9</span>
                <span className="text-slate-600"> — Pacific (AK, CA, HI, OR, WA)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="faq-card">
              <summary>
                How many zip codes are in the database?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The database contains 33,784 ZIP code centroids covering all 50 states, DC, and US territories
                (American Samoa, Guam, Northern Marianas, Puerto Rico, US Virgin Islands). The source is the
                SimpleMaps US ZIPs Free dataset, built from the US Census Bureau&apos;s ZCTA file plus
                parent-ZCTA crosswalk entries. A small share of USPS ZIPs — single-recipient business ZIPs,
                some PO-box-only ZIPs, and retired ZIPs — lack a ZCTA and are not in the dataset. If you
                enter one of those, the tool tells you so rather than silently returning nothing.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I use postal codes outside the US?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Currently, this tool supports US zip codes only. For radius drawing in other countries (UK postcodes,
                Canadian postal codes, etc.), use our main{' '}
                <Link href="/" className="content-link">
                  radius map tool
                </Link>{' '}
                with an address search — it works worldwide but doesn&apos;t show postal code boundaries.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I export the zip code list?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. Click &ldquo;Export CSV&rdquo; to download a spreadsheet with all zip codes within your radius.
                The file includes: zip code, city name, state abbreviation, and distance from your center point. This
                format is compatible with Excel, Google Sheets, and most CRM/mailing platforms.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Why are some borderline ZIP codes excluded from my results?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Each ZIP has a single center point (centroid) in the dataset. The radius test uses that one
                point: if the center is inside the circle, the ZIP is included; if it&apos;s outside, the ZIP
                is excluded — even if part of its actual area would overlap your radius. To capture edge ZIPs,
                increase your radius by a small margin (1–2 miles in dense urban areas, more in rural ones).
              </div>
            </details>

            <details className="faq-card">
              <summary>
                How is the center of a zip code determined?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                The center point (centroid) comes from the SimpleMaps US ZIPs Free dataset, which derives it
                from the ZIP&apos;s ZCTA polygon (or, for ZIPs without their own ZCTA, the centroid of the
                parent ZCTA). For irregularly shaped ZIPs this may not align with the &ldquo;main&rdquo; town
                or commercial area, but it provides a consistent reference point for distance calculations.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                What&apos;s the difference between ZIP codes and ZCTAs?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                <strong>ZIP codes</strong> are USPS mail delivery routes — they define where mail carriers go, not
                specific areas. <strong>ZCTAs</strong> (Zip Code Tabulation Areas) are Census Bureau approximations
                that create boundary polygons around zip code areas. This tool uses ZCTA-derived center points (the
                latitude/longitude given to each zip code by the SimpleMaps US ZIPs Free dataset) for radius
                testing. In most cases, ZCTAs closely match ZIP codes; rural areas and dense urban cores have the
                most divergence.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Can I find zip codes within a drive time instead of distance?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                This tool uses straight-line (as-the-crow-flies) radius. For drive-time based zones, use our{' '}
                <Link href="/drive-time-map" className="content-link">
                  drive time map tool
                </Link>
                , which calculates actual driving isochrones. Note that the drive time tool shows the reachable area,
                not specific zip codes.
              </div>
            </details>

            <details className="faq-card">
              <summary>
                Is the data free to use commercially?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Yes. The underlying ZCTA data is from the US Census Bureau and is public domain; the centroids
                used by this tool come from the SimpleMaps US ZIPs Free release, which permits commercial use
                with attribution. You can export and use the zip code lists for marketing campaigns, sales
                territory planning, and business analysis.
              </div>
            </details>
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How many zip codes are in the database?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The database contains 33,784 ZIP code centroids covering all 50 states, DC, and US territories. Source: SimpleMaps US ZIPs Free, built from US Census ZCTAs plus parent-ZCTA crosswalk entries. Single-recipient business, some PO-box-only, and retired ZIPs are not included.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I use postal codes outside the US?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Currently, this tool supports US zip codes only. For radius drawing in other countries, use our main radius map tool with an address search.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I export the zip code list?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Click "Export CSV" to download a spreadsheet with all zip codes within your radius, including city, state, and distance from center.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why are some borderline ZIP codes excluded from my results?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Each ZIP has one center point in the dataset. The radius test uses that point: if it's inside the circle, the ZIP is included; if it's outside, the ZIP is excluded. To capture borderline ZIPs whose polygon partially overlaps your radius, increase the radius slightly.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How is the center of a zip code determined?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The center point (centroid) comes from the SimpleMaps US ZIPs Free dataset, derived from the ZIP's ZCTA polygon (or, for ZIPs without their own ZCTA, the centroid of the parent ZCTA).",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the difference between ZIP codes and ZCTAs?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'ZIP codes are USPS mail delivery routes. ZCTAs (Zip Code Tabulation Areas) are Census Bureau approximations that create boundary polygons around zip code areas. This tool uses ZCTA-derived center points (latitude/longitude) for radius testing.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I find zip codes within a drive time instead of distance?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'This tool uses straight-line radius. For drive-time based zones, use our drive time map tool which calculates actual driving isochrones.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is the data free to use commercially?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Underlying ZCTA data is from the US Census Bureau (public domain); centroids come from the SimpleMaps US ZIPs Free release, which permits commercial use with attribution.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* More Map Tools */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">More Map Tools</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth={2} />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Radius Map</h3>
              </div>
              <p className="text-sm text-slate-600">Draw circles on any map location worldwide</p>
            </Link>

            <Link href="/drive-time-map" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Drive Time Map</h3>
              </div>
              <p className="text-sm text-slate-600">See how far you can drive in X minutes</p>
            </Link>

            <Link href="/km-radius-map" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">KM Radius Map</h3>
              </div>
              <p className="text-sm text-slate-600">Metric distance circles in kilometers</p>
            </Link>

            <Link href="/walking-radius-map" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Walking Map</h3>
              </div>
              <p className="text-sm text-slate-600">Walking and cycling time radius</p>
            </Link>

            <Link href="/distance-calculator" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Distance Calculator</h3>
              </div>
              <p className="text-sm text-slate-600">Measure point-to-point distances</p>
            </Link>

            <Link href="/radius-on-google-maps" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Radius Guide</h3>
              </div>
              <p className="text-sm text-slate-600">Learn how to draw radius on maps</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
