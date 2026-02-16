import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Map With Radius',
  description: 'Privacy policy for Map With Radius. We do not collect personal data or require user accounts.',
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-sm text-gray-500">Last updated: February 2026</p>

        <p className="text-lg text-gray-700">
          Map With Radius is committed to protecting your privacy. This policy explains what
          data we collect (and don't collect) when you use our mapping tools.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What We Do NOT Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>No user accounts:</strong> We do not require registration or login.
              There are no usernames, passwords, or profiles.
            </li>
            <li>
              <strong>No personal information:</strong> We do not collect names, email
              addresses, or any personally identifiable information.
            </li>
            <li>
              <strong>No location data stored:</strong> When you use the "Use My Location"
              feature, your coordinates are processed entirely in your browser. Your location
              is never transmitted to or stored on our servers.
            </li>
            <li>
              <strong>No tracking cookies:</strong> We do not use advertising cookies or
              third-party tracking services.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What We May Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Basic server logs:</strong> Like most websites, our hosting provider may
              log basic request information (IP addresses, timestamps, pages visited) for
              security and operational purposes. These logs are not used for tracking or
              marketing.
            </li>
            <li>
              <strong>Anonymous analytics:</strong> We may use privacy-respecting analytics
              (such as Plausible Analytics) to understand aggregate usage patterns. These
              services do not use cookies and do not track individual users.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
          <p className="text-gray-700 mb-3">
            Our tools use the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>OpenStreetMap tile servers:</strong> When you view the map, tiles are
              loaded from OpenStreetMap's servers. These requests may be logged per{' '}
              <a
                href="https://wiki.openstreetmap.org/wiki/Tile_usage_policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenStreetMap's tile usage policy
              </a>
              .
            </li>
            <li>
              <strong>Nominatim geocoding:</strong> When you search for an address, the query
              is sent to OpenStreetMap's Nominatim service. See{' '}
              <a
                href="https://nominatim.org/release-docs/latest/api/Overview/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Nominatim's documentation
              </a>{' '}
              for their privacy practices.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Browser Geolocation</h2>
          <p className="text-gray-700">
            When you click "Use My Location," your browser asks for permission to access your
            device's location. This permission is controlled by your browser settings. If you
            grant permission, your coordinates are used locally in your browser to center the
            map — they are never sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Shareable Links</h2>
          <p className="text-gray-700">
            When you create a shareable link, the map coordinates and settings are encoded in
            the URL itself. Anyone with the link can see these coordinates. No data is stored
            on our servers — the link contains all the information needed to recreate the map.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h2>
          <p className="text-gray-700">
            Since we do not collect personal data, there is no personal data to retain or delete.
            Server logs are automatically deleted after 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-700">
            If you have questions about this privacy policy, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
    </>
  );
}
