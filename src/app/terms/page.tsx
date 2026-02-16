import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use — Map With Radius',
  description: 'Terms of use for Map With Radius mapping tools.',
};

export default function TermsPage() {
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
                name: 'Terms of Use',
                item: 'https://mapwithradius.com/terms',
              },
            ],
          }),
        }}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-sm text-gray-500">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using Map With Radius ("the Service"), you accept and agree to be
            bound by these Terms of Use. If you do not agree to these terms, please do not use
            the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p className="text-gray-700">
            Map With Radius provides free online mapping tools for drawing radius circles,
            measuring distances, and visualizing geographic areas. The Service is provided
            "as is" without any warranties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. No Warranty</h2>
          <p className="text-gray-700">
            The Service is provided without warranty of any kind, express or implied. We do not
            guarantee the accuracy, completeness, or reliability of any map data, distance
            calculations, or geographic information displayed by the tools. Users are responsible
            for verifying any critical measurements independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Responsibility</h2>
          <p className="text-gray-700">
            You are solely responsible for how you use the results from our tools. The Service
            should not be used as the sole basis for decisions involving safety, legal compliance,
            or financial matters without independent verification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Attribution</h2>
          <p className="text-gray-700">
            Map data is provided by{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenStreetMap
            </a>{' '}
            contributors and is available under the Open Database License (ODbL). When sharing
            or publishing maps created with this tool, you must provide appropriate attribution
            to OpenStreetMap.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. No Account or Personal Data</h2>
          <p className="text-gray-700">
            The Service does not require user accounts and does not collect personal data.
            Any location data used by the tools remains in your browser and is not transmitted
            to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Modifications to Service</h2>
          <p className="text-gray-700">
            We reserve the right to modify, suspend, or discontinue the Service at any time
            without notice. We shall not be liable to you or any third party for any modification,
            suspension, or discontinuance of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
          <p className="text-gray-700">
            In no event shall Map With Radius be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p className="text-gray-700">
            If you have questions about these Terms of Use, please{' '}
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
