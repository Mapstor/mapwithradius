import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Map With Radius privacy policy — no accounts, no tracking, no location data sent to servers. GDPR and CCPA compliant. How we handle server logs and analytics.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    type: 'website',
    url: 'https://mapwithradius.com/privacy',
    title: 'Privacy Policy',
    description: 'Map With Radius privacy policy — no accounts, no tracking, no location data sent to servers. GDPR and CCPA compliant. How we handle server logs and analytics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'Map With Radius privacy policy — no accounts, no tracking, no location data sent to servers. GDPR and CCPA compliant. How we handle server logs and analytics.',
  },
};

export default function PrivacyPage() {
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
                name: 'Privacy Policy',
                item: 'https://mapwithradius.com/privacy',
              },
            ],
          }),
        }}
      />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            At Map With Radius, we take your privacy seriously. This Privacy Policy explains what information
            we collect (and don't collect), how we use it, and your rights regarding your personal data.
            We believe in transparency and are committed to protecting your privacy while you use our
            free mapping tools.
          </p>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li><a href="#overview" className="text-primary hover:underline">Privacy Overview</a></li>
              <li><a href="#no-collect" className="text-primary hover:underline">Information We Do NOT Collect</a></li>
              <li><a href="#may-collect" className="text-primary hover:underline">Information We May Collect</a></li>
              <li><a href="#cookies" className="text-primary hover:underline">Cookies and Tracking Technologies</a></li>
              <li><a href="#third-party" className="text-primary hover:underline">Third-Party Services</a></li>
              <li><a href="#geolocation" className="text-primary hover:underline">Browser Geolocation</a></li>
              <li><a href="#shareable-links" className="text-primary hover:underline">Shareable Links</a></li>
              <li><a href="#exports" className="text-primary hover:underline">Map Exports</a></li>
              <li><a href="#advertising" className="text-primary hover:underline">Advertising</a></li>
              <li><a href="#data-retention" className="text-primary hover:underline">Data Retention</a></li>
              <li><a href="#data-security" className="text-primary hover:underline">Data Security</a></li>
              <li><a href="#children" className="text-primary hover:underline">Children's Privacy</a></li>
              <li><a href="#your-rights" className="text-primary hover:underline">Your Rights</a></li>
              <li><a href="#gdpr" className="text-primary hover:underline">GDPR Compliance (European Users)</a></li>
              <li><a href="#ccpa" className="text-primary hover:underline">CCPA Compliance (California Residents)</a></li>
              <li><a href="#international" className="text-primary hover:underline">International Data Transfers</a></li>
              <li><a href="#changes" className="text-primary hover:underline">Changes to This Policy</a></li>
              <li><a href="#contact" className="text-primary hover:underline">Contact Us</a></li>
            </ol>
          </div>

          {/* Privacy at a Glance */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Privacy at a Glance</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">No user accounts required</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">No personal information collected</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Location data stays in your browser</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">No tracking cookies</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">No data sold to third parties</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Map data processed locally</span>
              </div>
            </div>
          </div>

          <section id="overview" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Privacy Overview</h2>
            <p className="text-gray-700 mb-3">
              Map With Radius is designed with privacy as a core principle. Unlike many web services,
              we don't require you to create an account, sign in, or provide any personal information
              to use our tools.
            </p>
            <p className="text-gray-700 mb-3">
              Our mapping tools work primarily in your browser. When you draw a radius circle, calculate
              a distance, or export a map, the processing happens on your device. We don't store your
              maps, locations, or search history on our servers.
            </p>
            <p className="text-gray-700">
              This privacy-first approach means there's minimal data for us to collect, store, or protect —
              which is exactly how we designed it.
            </p>
          </section>

          <section id="no-collect" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Do NOT Collect</h2>
            <p className="text-gray-700 mb-3">
              We want to be explicit about what we don't collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>No user accounts:</strong> We don't require registration, login, or profile creation.
                There are no usernames, passwords, or account settings to store.
              </li>
              <li>
                <strong>No personal identifiers:</strong> We don't collect names, email addresses, phone
                numbers, physical addresses, or any other personally identifiable information.
              </li>
              <li>
                <strong>No location history:</strong> When you use the "Use My Location" feature, your
                GPS coordinates are processed entirely in your browser. We never receive, store, or
                transmit your location to our servers.
              </li>
              <li>
                <strong>No search history:</strong> Address searches are sent directly to OpenStreetMap's
                Nominatim service from your browser. We don't log, store, or have access to your search queries.
              </li>
              <li>
                <strong>No map configurations:</strong> The circles you draw, settings you choose, and
                maps you create are not stored on our servers. Everything exists only in your browser
                session (or in shareable links you create).
              </li>
              <li>
                <strong>No payment information:</strong> We don't sell anything, so there's no credit card
                numbers, billing addresses, or financial data to collect.
              </li>
            </ul>
          </section>

          <section id="may-collect" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information We May Collect</h2>
            <p className="text-gray-700 mb-3">
              While we minimize data collection, some information may be automatically collected through
              standard web technologies:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Server logs:</strong> Our hosting infrastructure (Vercel) automatically logs
                basic request information for security and operational purposes. This may include:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>IP addresses (may be anonymized or truncated)</li>
                  <li>Request timestamps</li>
                  <li>Pages visited</li>
                  <li>Browser user agent strings</li>
                  <li>Referring URLs</li>
                  <li>HTTP status codes</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600">
                  These logs are used for security monitoring, troubleshooting, and abuse prevention.
                  They are not used for tracking, profiling, or marketing purposes.
                </p>
              </li>
              <li>
                <strong>Anonymous analytics:</strong> We may use privacy-respecting analytics tools
                (such as Plausible Analytics or similar) to understand aggregate usage patterns. These services:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Do not use cookies</li>
                  <li>Do not collect personal information</li>
                  <li>Do not track individual users across sites</li>
                  <li>Provide only aggregate statistics (page views, popular pages, general geographic regions)</li>
                </ul>
              </li>
              <li>
                <strong>Error reports:</strong> If an error occurs while using the site, technical information
                about the error may be logged to help us fix bugs. This does not include personal information.
              </li>
            </ul>
          </section>

          <section id="cookies" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies and Tracking Technologies</h2>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Cookies We Use</h3>
            <p className="text-gray-700 mb-3">
              We minimize cookie usage. The cookies that may be present on our site include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Essential/Technical cookies:</strong> Cookies necessary for the website to function
                properly (e.g., session management, security tokens). These do not track you or store
                personal information.
              </li>
              <li>
                <strong>Preference cookies:</strong> We may store your unit preferences (miles vs. kilometers)
                in local storage or a cookie so your settings persist between visits. This data stays on
                your device and is not sent to our servers.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Cookies We Do NOT Use</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>No advertising cookies:</strong> We do not use cookies to track you for advertising
                purposes or to serve targeted ads.
              </li>
              <li>
                <strong>No cross-site tracking:</strong> We do not participate in cross-site tracking networks
                or use cookies that follow you across different websites.
              </li>
              <li>
                <strong>No social media tracking:</strong> We do not embed social media tracking pixels or
                buttons that would allow social networks to track your visit.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Managing Cookies</h3>
            <p className="text-gray-700">
              You can control cookies through your browser settings. Most browsers allow you to block
              or delete cookies. However, blocking all cookies may affect your ability to use certain
              features of the website. Since we use minimal cookies, most functionality will work even
              with cookies disabled.
            </p>
          </section>

          <section id="third-party" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p className="text-gray-700 mb-3">
              Our tools rely on the following third-party services. When you use our site, your browser
              may make requests directly to these services:
            </p>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">OpenStreetMap Tile Servers</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Map tiles (the images that make up the map) are loaded from OpenStreetMap's tile servers.
                  When you view the map, your browser requests tiles directly from OpenStreetMap.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What they may log:</strong> IP address, tile coordinates, timestamp{' '}
                  <a
                    href="https://wiki.openstreetmap.org/wiki/Tile_usage_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (Tile usage policy)
                  </a>
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Nominatim Geocoding</h3>
                <p className="text-gray-600 text-sm mb-2">
                  When you search for an address or location, the query is sent to OpenStreetMap's
                  Nominatim geocoding service. This service converts addresses to coordinates.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What they may log:</strong> IP address, search query, timestamp{' '}
                  <a
                    href="https://nominatim.org/release-docs/latest/api/Overview/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (Nominatim documentation)
                  </a>
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vercel (Hosting)</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Our website is hosted on Vercel. They provide the infrastructure that serves our
                  website to you.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What they may log:</strong> Standard server logs for security and operations{' '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (Vercel Privacy Policy)
                  </a>
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              We choose third-party services that respect user privacy and do not engage in invasive tracking.
              We do not share any user data with these services beyond what is automatically transmitted
              through normal web requests.
            </p>
          </section>

          <section id="geolocation" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Browser Geolocation</h2>
            <p className="text-gray-700 mb-3">
              When you click "Use My Location," your browser's geolocation API is used to determine your
              current position. Here's how this works:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
              <li>Your browser asks for your permission to access location</li>
              <li>If you grant permission, your device determines your coordinates using GPS, Wi-Fi,
                  cell towers, or other methods</li>
              <li>The coordinates are sent to JavaScript code running in your browser</li>
              <li>The map centers on your location</li>
            </ol>
            <p className="text-gray-700 mb-3">
              <strong>Important:</strong> Your coordinates never leave your browser. They are not sent
              to our servers or any third party. The geolocation happens entirely on your device and
              in your browser.
            </p>
            <p className="text-gray-700">
              You can revoke location permission at any time through your browser's settings. The site
              will continue to work — you'll just need to search for locations manually instead of using
              the "Use My Location" button.
            </p>
          </section>

          <section id="shareable-links" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Shareable Links</h2>
            <p className="text-gray-700 mb-3">
              When you create a shareable link using the "Copy Link" feature, the following information
              is encoded directly in the URL:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Circle center coordinates (latitude and longitude)</li>
              <li>Circle radius and unit</li>
              <li>Circle color</li>
              <li>Any other map settings</li>
            </ul>
            <p className="text-gray-700 mb-3">
              <strong>No server storage:</strong> Shareable links do not store anything on our servers.
              The link itself contains all the information needed to recreate the map. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We cannot see or access the links you create</li>
              <li>We cannot delete links (there's nothing to delete)</li>
              <li>Links work indefinitely (as long as our website exists)</li>
              <li>Anyone with the link can see the encoded coordinates</li>
            </ul>
            <p className="text-gray-700 mt-3">
              <strong>Privacy consideration:</strong> Only share links containing location information
              with people you trust. The coordinates in the link reveal the geographic location you've selected.
            </p>
          </section>

          <section id="exports" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Map Exports</h2>
            <p className="text-gray-700 mb-3">
              When you export maps as PNG images or KML files:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>The export is generated entirely in your browser</li>
              <li>The file is downloaded directly to your device</li>
              <li>No copy is sent to or stored on our servers</li>
              <li>We have no record of what maps you export</li>
            </ul>
            <p className="text-gray-700 mt-3">
              The exported files contain the geographic information you've input (coordinates, radius, etc.)
              and are under your control once downloaded.
            </p>
          </section>

          <section id="advertising" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Advertising</h2>
            <p className="text-gray-700 mb-3">
              To support the free operation of our service, we may display advertisements. Our approach
              to advertising prioritizes your privacy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>We prefer privacy-respecting ad networks that do not rely on tracking</li>
              <li>We do not sell or share your data with advertisers</li>
              <li>We do not show targeted ads based on your browsing history</li>
              <li>Ads are contextual (related to the page content) rather than behavioral (based on tracking)</li>
            </ul>
            <p className="text-gray-700">
              If we use any advertising services, they will be listed in this policy with links to their
              respective privacy policies.
            </p>
          </section>

          <section id="data-retention" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Data Retention</h2>
            <p className="text-gray-700 mb-3">
              Because we collect minimal data, our retention practices are straightforward:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Server logs:</strong> Automatically deleted after 30 days
              </li>
              <li>
                <strong>Analytics data:</strong> Aggregated and anonymized, retained for up to 2 years
                for trend analysis
              </li>
              <li>
                <strong>Error logs:</strong> Retained for up to 90 days for debugging purposes
              </li>
              <li>
                <strong>Personal data:</strong> Since we don't collect personal data, there is nothing
                to retain or delete
              </li>
            </ul>
          </section>

          <section id="data-security" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Data Security</h2>
            <p className="text-gray-700 mb-3">
              We implement appropriate technical and organizational measures to protect any data we process:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>HTTPS encryption:</strong> All connections to our website are encrypted using
                TLS (HTTPS), protecting data in transit
              </li>
              <li>
                <strong>Minimal data collection:</strong> The best protection is not collecting sensitive
                data in the first place
              </li>
              <li>
                <strong>Secure hosting:</strong> We use reputable hosting providers with strong security practices
              </li>
              <li>
                <strong>No database of user information:</strong> Without user accounts or stored personal
                data, there's no database that could be breached
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              While no system can guarantee absolute security, our privacy-by-design approach means that
              even in the unlikely event of a security incident, there would be minimal personal data at risk.
            </p>
          </section>

          <section id="children" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Children's Privacy</h2>
            <p className="text-gray-700 mb-3">
              Our Service is not directed at children under the age of 13 (or the applicable age of digital
              consent in your jurisdiction). We do not knowingly collect personal information from children.
            </p>
            <p className="text-gray-700 mb-3">
              Since we do not collect personal information from any users — regardless of age — and do not
              require account creation, our service can be used by people of all ages without privacy concerns.
            </p>
            <p className="text-gray-700">
              If you are a parent or guardian and believe your child has provided personal information to us,
              please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
              However, given that we do not collect personal information, it is unlikely that any such
              information exists in our systems.
            </p>
          </section>

          <section id="your-rights" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Your Rights</h2>
            <p className="text-gray-700 mb-3">
              Depending on your location, you may have certain rights regarding your personal data.
              These may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Right to access:</strong> The right to know what personal data we hold about you.
                Since we don't collect personal data, there is nothing to access.
              </li>
              <li>
                <strong>Right to rectification:</strong> The right to correct inaccurate data. Since we
                don't collect personal data, there is nothing to correct.
              </li>
              <li>
                <strong>Right to erasure:</strong> The right to have your data deleted. Since we don't
                store personal data, there is nothing to delete.
              </li>
              <li>
                <strong>Right to data portability:</strong> The right to receive your data in a portable
                format. Since we don't collect personal data, there is nothing to export.
              </li>
              <li>
                <strong>Right to object:</strong> The right to object to certain processing. Since we
                don't process personal data, there is nothing to object to.
              </li>
            </ul>
            <p className="text-gray-700">
              If you have questions about your rights or wish to make a request, please{' '}
              <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
              We will respond to legitimate requests even though, in most cases, we will not have any
              personal data to provide.
            </p>
          </section>

          <section id="gdpr" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. GDPR Compliance (European Users)</h2>
            <p className="text-gray-700 mb-3">
              For users in the European Economic Area (EEA), United Kingdom, and Switzerland, we comply
              with the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Legal basis:</strong> Our minimal data processing is based on legitimate interests
                (operating and securing our website) and, where applicable, your consent.
              </li>
              <li>
                <strong>Data minimization:</strong> We collect only what is technically necessary to
                provide our service.
              </li>
              <li>
                <strong>Purpose limitation:</strong> Any data we collect is used only for the purposes
                stated in this policy.
              </li>
              <li>
                <strong>Your rights:</strong> You have all rights described in Section 13 above, plus
                the right to lodge a complaint with your local data protection authority.
              </li>
            </ul>
            <p className="text-gray-700">
              <strong>Data Protection Authority:</strong> If you are in the EU and have concerns about
              our data practices, you may contact your local Data Protection Authority. A list of
              authorities can be found on the European Commission website.
            </p>
          </section>

          <section id="ccpa" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. CCPA Compliance (California Residents)</h2>
            <p className="text-gray-700 mb-3">
              For California residents, the California Consumer Privacy Act (CCPA) provides additional
              rights regarding personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Right to know:</strong> You have the right to know what personal information
                we collect, use, disclose, and sell. As stated throughout this policy, we do not
                collect personal information.
              </li>
              <li>
                <strong>Right to delete:</strong> You have the right to request deletion of personal
                information. Since we don't collect personal information, there is nothing to delete.
              </li>
              <li>
                <strong>Right to opt-out:</strong> You have the right to opt-out of the sale of personal
                information. We do not sell personal information.
              </li>
              <li>
                <strong>Right to non-discrimination:</strong> We will not discriminate against you for
                exercising your CCPA rights.
              </li>
            </ul>
            <p className="text-gray-700">
              <strong>Do Not Sell My Personal Information:</strong> We do not sell personal information
              as defined by the CCPA. We have not sold personal information in the preceding 12 months
              and do not intend to do so in the future.
            </p>
          </section>

          <section id="international" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">16. International Data Transfers</h2>
            <p className="text-gray-700 mb-3">
              Our website is hosted in the United States. If you access the Service from outside the
              United States, your connection data (IP address, request data) may be transferred to and
              processed in the United States.
            </p>
            <p className="text-gray-700 mb-3">
              Since we do not collect personal information, international data transfer concerns are
              minimal. The only data that crosses borders is:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Standard web requests (IP address, browser information) necessary to serve the website</li>
              <li>Requests to OpenStreetMap services (based in various locations globally)</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Our hosting provider (Vercel) maintains appropriate data protection agreements and
              safeguards for international data transfers.
            </p>
          </section>

          <section id="changes" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Changes to This Policy</h2>
            <p className="text-gray-700 mb-3">
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or other factors. When we make changes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>We will update the "Last updated" date at the top of this page</li>
              <li>For significant changes, we may provide additional notice (such as a banner on our website)</li>
              <li>The updated policy will be effective immediately upon posting</li>
            </ul>
            <p className="text-gray-700">
              We encourage you to review this Privacy Policy periodically to stay informed about how
              we protect your privacy.
            </p>
          </section>

          <section id="contact" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">18. Contact Us</h2>
            <p className="text-gray-700 mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@mapwithradius.com" className="text-primary hover:underline">
                contact@mapwithradius.com
              </a>
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Web:</strong>{' '}
              <Link href="/contact" className="text-primary hover:underline">
                mapwithradius.com/contact
              </Link>
            </p>
            <p className="text-gray-700">
              We will respond to privacy-related inquiries within 30 days.
            </p>
          </section>

          {/* Related Pages */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Use
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
              <Link href="/" className="text-primary hover:underline">
                Back to Map Tool
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
