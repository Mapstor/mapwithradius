import { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Map With Radius privacy policy — no accounts, your location stays in your browser, GDPR and CCPA compliant. How we handle analytics, advertising, and your choices.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    type: 'website',
    url: 'https://mapwithradius.com/privacy',
    title: 'Privacy Policy',
    description: 'Map With Radius privacy policy — no accounts, your location stays in your browser, GDPR and CCPA compliant. How we handle analytics, advertising, and your choices.',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'Map With Radius privacy policy — no accounts, your location stays in your browser, GDPR and CCPA compliant. How we handle analytics, advertising, and your choices.',
    images: OG_IMAGES,
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
        <p className="text-sm text-gray-500 mb-8">Last updated: June 3, 2026</p>

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
                <span className="text-gray-700">No name, email, or payment info collected</span>
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
                <span className="text-gray-700">EEA/UK ads default to non-personalized</span>
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
              Map With Radius is designed so that the core tool — drawing a radius, searching an
              address, exporting a map — works without accounts and without any personal data
              reaching our servers. The processing happens in your browser.
            </p>
            <p className="text-gray-700 mb-3">
              To fund the service so it can stay free with no usage limits, we do two things that
              involve third-party cookies and require disclosure: we use Google Analytics 4 to
              measure aggregate traffic, and we&apos;ve integrated Google AdSense to display ads
              once the account is approved (the AdSense account is currently in review with
              Google). Sections 3, 4, 5, and 9 of this policy describe exactly what that means,
              what cookies are set, and how you can opt out or block them.
            </p>
            <p className="text-gray-700">
              In the EEA, UK, and Switzerland, Google Consent Mode v2 keeps non-essential
              cookies default-denied, so Google Analytics 4 runs in cookieless mode for those
              visitors. When Google AdSense begins serving ads on this site, those ads will be
              non-personalized (Limited) in these regions due to the default-denied state. We
              do not currently display a consent banner; we plan to add a Google-certified
              consent management platform (CMP) so visitors there can opt in to personalized
              analytics and advertising. See Section 14 for details on EU/UK rights.
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
                <strong>Google Analytics 4:</strong> We use Google Analytics 4 (GA4) to understand
                aggregate usage patterns — which pages get traffic, where users come from, what
                devices and browsers they use. GA4 uses cookies and assigns each browser an anonymous
                identifier. We have configured GA4 with Google Consent Mode v2 — for visitors in
                the EEA, UK, and Switzerland, &lsquo;analytics_storage&rsquo; is default-denied, so
                GA4 runs in cookieless mode and sets no analytics cookies for those visitors (a
                consent management platform is planned, which will let those visitors opt in to
                standard analytics). We do not link GA4 data to personally identifying information, because we
                don&apos;t collect any. See{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>{' '}
                for how Google handles this data, and{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Opt-out
                </a>{' '}
                to opt out across all sites.
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
              We keep cookie usage to the minimum needed to run the site, measure traffic, and fund
              the tools through advertising:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Essential/technical cookies:</strong> Cookies necessary for the website to
                function properly (e.g., session management, security tokens). These do not track you
                or store personal information.
              </li>
              <li>
                <strong>Preference storage:</strong> We may store your unit preferences (miles vs.
                kilometers) in browser local storage so your settings persist between visits. This
                data stays on your device and is not sent to our servers.
              </li>
              <li>
                <strong>Analytics cookies (Google Analytics 4):</strong> Cookies set by GA4 to
                distinguish unique browsers and produce aggregate site statistics. In the EEA, UK,
                and Switzerland these are default-denied via Google Consent Mode v2 — until a
                consent banner is added, GA4 stays in cookieless mode for those visitors and sets
                no analytics cookies (see &ldquo;Consent in the EEA, UK, and Switzerland&rdquo; below).
              </li>
              <li>
                <strong>Advertising cookies (Google AdSense and partners):</strong> Cookies used to
                serve and measure ads, including ads tailored to your interests based on your
                previous visits to this and other sites. In the EEA, UK, and Switzerland these are
                default-denied via Google Consent Mode v2 — until a consent banner is added, any
                AdSense ads served in those regions will be Limited (non-personalized). See
                Section 9 for full advertising details and the opt-out link for personalized
                advertising.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Cookies We Do NOT Use</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>No social-media tracking pixels:</strong> We do not embed Facebook Pixel,
                LinkedIn Insight Tag, TikTok Pixel, or any other social-media tracking script.
              </li>
              <li>
                <strong>No data brokers:</strong> We do not pass user data to data brokers, marketing
                data warehouses, or audience-aggregation networks.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Consent in the EEA, UK, and Switzerland</h3>
            <p className="text-gray-700 mb-3">
              For visitors in the European Economic Area, United Kingdom, and Switzerland, we run
              Google Consent Mode v2 with all non-essential cookie categories
              (&lsquo;ad_storage&rsquo;, &lsquo;ad_user_data&rsquo;, &lsquo;ad_personalization&rsquo;,
              &lsquo;analytics_storage&rsquo;) default-denied on every page load. We do not
              currently display a consent banner, so that default-denied state persists for the
              whole visit — Google Analytics 4 runs in cookieless mode, and once Google AdSense
              begins serving ads on this site, ads in these regions will be Limited
              (non-personalized). We plan to add a Google-certified consent management platform
              (CMP) so visitors in these regions can opt in to personalized analytics and
              advertising.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Managing Cookies</h3>
            <p className="text-gray-700">
              You can control cookies through your browser settings. Most browsers let you block or
              delete cookies, view a list of currently-set cookies, or refuse cookies from
              third-party domains. Blocking all cookies will not break the core radius tool, but
              some preferences (like your unit setting) may not persist between visits.
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

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Google Analytics 4</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We use Google Analytics 4 to measure aggregate traffic to the site. GA4 sets
                  cookies in your browser and sends pageview and basic interaction data to Google.
                  We do not link GA4 data to any personally identifying information, because we
                  don&apos;t collect any.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What it may collect:</strong> Anonymous client identifier, page URLs,
                  referrer, device/browser, approximate geographic region{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (Google Privacy Policy)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Opt out of Google Analytics
                  </a>
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Google AdSense</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We use Google AdSense to fund the tools. The AdSense account is currently in
                  review with Google; once approved, AdSense will serve ads on this site, and
                  Google and its advertising partners may use cookies to serve ads based on prior
                  visits to this and other websites. See Section 9 for the full advertising
                  disclosure and the personalized-advertising opt-out.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What it may collect:</strong> Cookie identifiers, IP address, ad
                  interactions, inferred interests{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (How Google uses advertising cookies)
                  </a>
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              When you load a page on Map With Radius, your browser may make requests directly to
              the third parties above. We do not share additional user data with them beyond what is
              transmitted through normal web requests and, for analytics and advertising, the
              standard signals their scripts collect on your device.
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
              We use Google AdSense to support the free operation of this service. The AdSense
              account is currently in review with Google; once approved, AdSense will serve ads
              on the site. The disclosures in this section are required by AdSense&apos;s program
              policies and describe how advertising cookies work on Map With Radius once ads
              are live.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">How third-party advertising cookies work here</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on your prior
                visits to this website and other websites on the internet.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to
                you based on your visits to this site and/or other sites on the internet.
              </li>
              <li>
                Some of these ads may be personalized based on inferred interests; others are
                contextual (matched to page content) and do not rely on profiling.
              </li>
              <li>
                We do not sell personal information, and we do not share user identifiers with
                advertisers beyond the standard signals Google&apos;s ad code transmits.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Your choices</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Ads Settings
                </a>
                . You will still see ads — they just won&apos;t be personalized to you.
              </li>
              <li>
                You may opt out of a third-party vendor&apos;s use of cookies for personalized
                advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutads.info
                </a>{' '}
                (US) or{' '}
                <a
                  href="https://www.youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.youronlinechoices.eu
                </a>{' '}
                (EU).
              </li>
              <li>
                You can block third-party cookies in your browser settings, which will prevent most
                ad-targeting cookies from being set in the first place.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">EEA, UK, and Switzerland consent</h3>
            <p className="text-gray-700 mb-3">
              For visitors in the European Economic Area, the United Kingdom, and Switzerland,
              advertising and analytics cookies are blocked by default through Google Consent
              Mode v2 — non-essential storage is set to denied on every page load. We do not
              currently display a consent banner, so that default-denied state persists for the
              whole visit, and any AdSense ads served in these regions will be Limited
              (non-personalized). We plan to add a Google-certified consent management platform
              (CMP) so visitors in these regions can opt in to personalized advertising; until
              that CMP is in place, there is no consent decision to record or change.
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
                <strong>Legal basis:</strong> Essential site operation and security rely on our
                legitimate interests. For analytics and advertising, we run Google Consent Mode v2
                with non-essential cookie categories default-denied for EEA/UK/Swiss visitors;
                until a Google-certified consent management platform is added, that default-denied
                state is maintained for the whole visit. Google Analytics 4 runs in cookieless
                mode for those visitors, and once Google AdSense begins serving ads on the site,
                ads in these regions will be Limited (non-personalized). We plan to add a CMP so
                visitors can grant consent and opt in to personalized analytics and advertising.
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
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. CCPA/CPRA Compliance (California Residents)</h2>
            <p className="text-gray-700 mb-3">
              For California residents, the California Consumer Privacy Act (as amended by the
              California Privacy Rights Act) provides additional rights regarding personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Right to know:</strong> You have the right to know what personal information
                we collect, use, disclose, sell, or share. We do not directly collect personal
                information beyond what is described in Section 3. The information collected by our
                third-party analytics and advertising providers is described in Section 5.
              </li>
              <li>
                <strong>Right to delete:</strong> You have the right to request deletion of personal
                information. Because we don&apos;t hold personal information directly, deletion
                requests for analytics or advertising identifiers should be directed to the relevant
                third party (Google) using the opt-out and account-management tools they provide.
              </li>
              <li>
                <strong>Right to opt out of selling:</strong> We do not sell personal information.
              </li>
              <li>
                <strong>Right to opt out of sharing:</strong> Under CPRA, the use of advertising
                cookies that enable cross-context behavioral advertising may constitute &ldquo;sharing&rdquo;.
                You can opt out of personalized advertising at{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Ads Settings
                </a>
                . We also honor the Global Privacy Control (GPC) browser signal: when GPC is present
                on a request, we treat it as a signal not to share personal information for
                cross-context behavioral advertising.
              </li>
              <li>
                <strong>Right to correct:</strong> You have the right to request correction of
                inaccurate personal information. We do not hold personal information directly.
              </li>
              <li>
                <strong>Right to limit use of sensitive information:</strong> We do not collect
                sensitive personal information as defined by CPRA.
              </li>
              <li>
                <strong>Right to non-discrimination:</strong> We will not discriminate against you
                for exercising your CCPA/CPRA rights.
              </li>
            </ul>
            <p className="text-gray-700">
              <strong>Do Not Sell or Share My Personal Information:</strong> We do not sell personal
              information. We participate in third-party advertising (Google AdSense) that may
              involve &ldquo;sharing&rdquo; under CPRA; the opt-out is the Google Ads Settings link above and the
              Global Privacy Control browser signal.
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
