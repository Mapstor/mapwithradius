import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zip Code Radius Map — Find Zip Codes Within a Radius (Free)',
  description: 'Enter a zip code and distance to find all zip codes within that radius. Export the list as CSV. Free, no signup.',
  keywords: ['zip code radius tool', 'radius around zip code', 'zip radius map', 'zip code finder radius', 'zip codes within radius'],
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
        <div className="bg-primary-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Zip Code Radius Map</h1>
            <p className="text-slate-300">
              Enter a zip code and distance — get a list of every zip code within that radius.
            </p>
          </div>
        </div>

        {/* Map section */}
        <div className="max-w-[1600px] mx-auto">
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

      {/* Real-World Examples */}
      <section className="section-gray py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">5 Real-World Examples</h2>

          <div className="grid gap-6">
            {/* Example 1: Direct Mail Marketing */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Direct Mail Marketing Campaign</h3>
                  <p className="text-slate-700 mb-3">
                    A dental practice in zip code <strong>85251</strong> (Scottsdale, AZ) wants to send new patient
                    postcards to households within 15 miles.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Center zip code:</span>
                      <span className="font-medium">85251 (Scottsdale, AZ)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Radius:</span>
                      <span className="font-medium">15 miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Zip codes found:</span>
                      <span className="font-medium text-blue-600">87 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Est. households:</span>
                      <span className="font-medium">~425,000</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Export the list, upload to USPS EDDM or a direct mail provider, and target only zip codes with
                    demographics matching their ideal patient profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2: Sales Territory Assignment */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Sales Territory Assignment</h3>
                  <p className="text-slate-700 mb-3">
                    A medical device company assigns sales reps by zip code. Each rep covers a 50-mile radius from
                    their home office.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Rep 1 (Dallas):</span>
                      <span className="font-medium">75201 → 312 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Rep 2 (Houston):</span>
                      <span className="font-medium">77002 → 298 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Rep 3 (Austin):</span>
                      <span className="font-medium">78701 → 186 zip codes</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Export each territory list, import into CRM (Salesforce, HubSpot), and auto-assign leads based on
                    their zip code.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3: Food Delivery Zone */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Restaurant Delivery Zone Setup</h3>
                  <p className="text-slate-700 mb-3">
                    A new restaurant in <strong>02139</strong> (Cambridge, MA) needs to define their delivery radius
                    for DoorDash and Uber Eats integration.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Restaurant zip:</span>
                      <span className="font-medium">02139 (Cambridge, MA)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Delivery radius:</span>
                      <span className="font-medium">5 miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Zip codes covered:</span>
                      <span className="font-medium text-orange-600">42 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Includes:</span>
                      <span className="font-medium">Cambridge, Somerville, Boston, Brookline</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Use the exported list to configure delivery platforms and ensure drivers know the exact coverage area.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 4: Healthcare Network */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Healthcare Network Coverage Analysis</h3>
                  <p className="text-slate-700 mb-3">
                    A hospital system analyzes patient access by finding all zip codes within 30 miles of each facility
                    to identify coverage gaps.
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Main Hospital (Chicago):</span>
                      <span className="font-medium">60611 → 428 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Suburban Campus:</span>
                      <span className="font-medium">60515 → 312 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Overlap (both serve):</span>
                      <span className="font-medium">187 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Gap (neither serves):</span>
                      <span className="font-medium text-red-600">23 zip codes identified</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Export both lists, compare in Excel, and identify underserved communities for potential new urgent
                    care locations.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 5: Franchise Territory */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-rose-500 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Franchise Territory Protection</h3>
                  <p className="text-slate-700 mb-3">
                    A franchise agreement grants exclusive rights to all zip codes within 10 miles of the franchisee&apos;s
                    location in <strong>33139</strong> (Miami Beach, FL).
                  </p>
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Franchise location:</span>
                      <span className="font-medium">33139 (Miami Beach, FL)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Protected radius:</span>
                      <span className="font-medium">10 miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Protected zip codes:</span>
                      <span className="font-medium text-rose-600">67 zip codes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Est. population:</span>
                      <span className="font-medium">~1.2 million</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Export the list and attach it to the franchise agreement as Exhibit A, defining the exact territory
                    boundaries.
                  </p>
                </div>
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
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">New York City</td>
                  <td className="px-4 py-3 text-sm text-slate-600">10001</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">187</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">412</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">892</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Los Angeles</td>
                  <td className="px-4 py-3 text-sm text-slate-600">90012</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">156</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">387</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">612</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Chicago</td>
                  <td className="px-4 py-3 text-sm text-slate-600">60601</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">142</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">356</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">598</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Houston</td>
                  <td className="px-4 py-3 text-sm text-slate-600">77002</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">98</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">245</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">412</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Phoenix</td>
                  <td className="px-4 py-3 text-sm text-slate-600">85004</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">76</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">178</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">287</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Philadelphia</td>
                  <td className="px-4 py-3 text-sm text-slate-600">19102</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">134</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">312</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">567</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">San Antonio</td>
                  <td className="px-4 py-3 text-sm text-slate-600">78205</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">54</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">112</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">198</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900">Dallas</td>
                  <td className="px-4 py-3 text-sm text-slate-600">75201</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">112</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">278</td>
                  <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">456</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            Zip code counts are approximate and based on ZCTA boundaries. Density varies by urban development patterns.
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
              The US Census Bureau creates <strong>Zip Code Tabulation Areas (ZCTAs)</strong> to represent zip code
              boundaries. Unlike USPS zip codes (which are delivery routes), ZCTAs are geographic areas with defined
              boundaries. This tool uses ZCTA data to show zip code boundaries on the map.
            </p>

            <h3>Whole Zip Codes Only</h3>
            <p>
              A zip code radius search returns <strong>whole zip codes</strong> — it doesn&apos;t split a zip code in half.
              If any part of a zip code boundary falls within your radius, the entire zip code is included. This means:
            </p>
            <ul>
              <li>The actual covered area may extend slightly beyond your specified radius</li>
              <li>Border zip codes are included even if only a small portion overlaps</li>
              <li>This is intentional for mailing and marketing purposes (you can&apos;t mail to &ldquo;half&rdquo; a zip code)</li>
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
              <div className="text-3xl font-bold text-accent mb-1">41,700+</div>
              <div className="text-slate-600 text-sm">Active US zip codes</div>
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
                The tool includes all active US zip codes (approximately 41,700). Data is sourced from the US Census
                Bureau&apos;s ZCTA (Zip Code Tabulation Areas) dataset, which is updated periodically to reflect new
                developments and boundary changes.
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
                Why does my result include zip codes outside the circle?
                <svg className="w-5 h-5 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-content">
                Zip codes are included if <strong>any part</strong> of their boundary touches or overlaps your radius
                circle. Since zip codes can&apos;t be split, a zip code that straddles the edge of your radius will be
                fully included. The &ldquo;distance&rdquo; shown is from the zip code&apos;s center point, which may be
                inside or outside your radius.
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
                The center point (centroid) is calculated as the geographic center of the zip code&apos;s boundary
                polygon. For irregularly shaped zip codes, this may not align with the &ldquo;main&rdquo; town or
                commercial area, but it provides a consistent reference point for distance calculations.
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
                that create actual boundary polygons. This tool uses ZCTAs because they have defined boundaries that
                can be drawn on a map. In most cases, ZCTAs closely match ZIP codes, but some differences exist in
                rural and high-density urban areas.
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
                Yes. The ZCTA data is from the US Census Bureau and is public domain. You can export and use the zip
                code lists for commercial purposes including marketing campaigns, sales territory planning, and
                business analysis without any licensing fees.
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
                      text: "The tool includes all active US zip codes (approximately 41,700). Data is sourced from the US Census Bureau's ZCTA (Zip Code Tabulation Areas) dataset.",
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
                    name: 'Why does my result include zip codes outside the circle?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "Zip codes are included if any part of their boundary touches or overlaps your radius circle. Since zip codes can't be split, a zip code that straddles the edge will be fully included.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How is the center of a zip code determined?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: "The center point (centroid) is calculated as the geographic center of the zip code's boundary polygon.",
                    },
                  },
                  {
                    '@type': 'Question',
                    name: "What's the difference between ZIP codes and ZCTAs?",
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'ZIP codes are USPS mail delivery routes. ZCTAs (Zip Code Tabulation Areas) are Census Bureau approximations that create actual boundary polygons. This tool uses ZCTAs.',
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
                      text: 'Yes. The ZCTA data is from the US Census Bureau and is public domain. You can export and use the zip code lists for commercial purposes.',
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
