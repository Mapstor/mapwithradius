import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Map With Radius terms of use — acceptable use, accuracy disclaimer, OpenStreetMap attribution requirements, and limitation of liability.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    type: 'website',
    url: 'https://mapwithradius.com/terms',
    title: 'Terms of Use',
    description: 'Map With Radius terms of use — acceptable use, accuracy disclaimer, OpenStreetMap attribution requirements, and limitation of liability.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use',
    description: 'Map With Radius terms of use — acceptable use, accuracy disclaimer, OpenStreetMap attribution requirements, and limitation of liability.',
  },
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            Welcome to Map With Radius. These Terms of Use govern your access to and use of our website
            and mapping tools. Please read these terms carefully before using our services.
          </p>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li><a href="#acceptance" className="text-primary hover:underline">Acceptance of Terms</a></li>
              <li><a href="#description" className="text-primary hover:underline">Description of Service</a></li>
              <li><a href="#eligibility" className="text-primary hover:underline">Eligibility</a></li>
              <li><a href="#acceptable-use" className="text-primary hover:underline">Acceptable Use Policy</a></li>
              <li><a href="#intellectual-property" className="text-primary hover:underline">Intellectual Property</a></li>
              <li><a href="#map-data" className="text-primary hover:underline">Map Data and Attribution</a></li>
              <li><a href="#exports" className="text-primary hover:underline">Exports and Downloads</a></li>
              <li><a href="#shareable-links" className="text-primary hover:underline">Shareable Links</a></li>
              <li><a href="#no-warranty" className="text-primary hover:underline">No Warranty</a></li>
              <li><a href="#accuracy" className="text-primary hover:underline">Accuracy Disclaimer</a></li>
              <li><a href="#user-responsibility" className="text-primary hover:underline">User Responsibility</a></li>
              <li><a href="#limitation" className="text-primary hover:underline">Limitation of Liability</a></li>
              <li><a href="#indemnification" className="text-primary hover:underline">Indemnification</a></li>
              <li><a href="#modifications" className="text-primary hover:underline">Modifications to Service</a></li>
              <li><a href="#termination" className="text-primary hover:underline">Termination</a></li>
              <li><a href="#governing-law" className="text-primary hover:underline">Governing Law</a></li>
              <li><a href="#severability" className="text-primary hover:underline">Severability</a></li>
              <li><a href="#entire-agreement" className="text-primary hover:underline">Entire Agreement</a></li>
              <li><a href="#contact" className="text-primary hover:underline">Contact Information</a></li>
            </ol>
          </div>

          <section id="acceptance" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-3">
              By accessing and using Map With Radius ("the Service," "our Service," "we," "us," or "our"),
              you ("User," "you," or "your") accept and agree to be bound by these Terms of Use and our{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>,
              which is incorporated herein by reference.
            </p>
            <p className="text-gray-700">
              If you do not agree to these terms, you must not access or use the Service. Your continued
              use of the Service following the posting of any changes to these Terms constitutes acceptance
              of those changes.
            </p>
          </section>

          <section id="description" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p className="text-gray-700 mb-3">
              Map With Radius provides free online mapping tools that allow users to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Draw radius circles on interactive maps to visualize distances from a central point</li>
              <li>Calculate straight-line (as-the-crow-flies) distances between locations</li>
              <li>Search for addresses and locations using geocoding services</li>
              <li>Export maps as images (PNG) or data files (KML)</li>
              <li>Create and share links to specific map configurations</li>
              <li>Use various distance units including miles, kilometers, meters, and feet</li>
            </ul>
            <p className="text-gray-700">
              The Service is provided free of charge and does not require user registration or account creation.
              We may display advertisements to support the operational costs of the Service.
            </p>
          </section>

          <section id="eligibility" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
            <p className="text-gray-700 mb-3">
              The Service is available to anyone with internet access. By using the Service, you represent that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You have the legal capacity to enter into these Terms of Use</li>
              <li>If you are using the Service on behalf of an organization, you have the authority to bind that organization to these Terms</li>
              <li>Your use of the Service complies with all applicable local, state, national, and international laws and regulations</li>
            </ul>
          </section>

          <section id="acceptable-use" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Acceptable Use Policy</h2>
            <p className="text-gray-700 mb-3">
              You agree to use the Service only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Use the Service for any illegal activity or to plan or facilitate illegal activities</li>
              <li>Attempt to interfere with, disrupt, or disable any part of the Service</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Use automated scripts, bots, or scrapers to access the Service in a manner that places undue burden on our infrastructure</li>
              <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service for commercial purposes without express written permission</li>
              <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices</li>
              <li>Use the Service to collect or harvest any personally identifiable information from other users</li>
              <li>Use the Service to transmit any viruses, malware, or other harmful code</li>
            </ul>
            <p className="text-gray-700">
              We reserve the right to terminate or restrict access to the Service for any user who violates
              these acceptable use policies, at our sole discretion and without prior notice.
            </p>
          </section>

          <section id="intellectual-property" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-3">
              The Service, including its original content (excluding map data from third parties), features,
              and functionality, is owned by Map With Radius and is protected by international copyright,
              trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 mb-3">
              You are granted a limited, non-exclusive, non-transferable license to access and use the
              Service for personal, non-commercial purposes, subject to these Terms.
            </p>
            <p className="text-gray-700">
              The "Map With Radius" name, logo, and all related names, logos, product and service names,
              designs, and slogans are trademarks of Map With Radius. You must not use such marks without
              our prior written permission.
            </p>
          </section>

          <section id="map-data" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Map Data and Attribution</h2>
            <p className="text-gray-700 mb-3">
              Map data displayed by the Service is provided by{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenStreetMap
              </a>{' '}
              contributors and is available under the Open Database License (ODbL).
            </p>
            <p className="text-gray-700 mb-3">
              When sharing, publishing, or distributing maps created with this tool, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Provide attribution to OpenStreetMap and its contributors</li>
              <li>Include a link to the OpenStreetMap copyright page or the ODbL license when practical</li>
              <li>Not claim ownership of the underlying map data</li>
            </ul>
            <p className="text-gray-700">
              Geocoding services are provided by Nominatim, subject to{' '}
              <a
                href="https://operations.osmfoundation.org/policies/nominatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Nominatim's usage policy
              </a>.
            </p>
          </section>

          <section id="exports" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Exports and Downloads</h2>
            <p className="text-gray-700 mb-3">
              The Service allows you to export maps and data in various formats:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>
                <strong>PNG Images:</strong> Screenshots of your map configuration, suitable for documents,
                presentations, and sharing on social media.
              </li>
              <li>
                <strong>KML Files:</strong> Keyhole Markup Language files compatible with Google Earth,
                ArcGIS, and other geographic information systems.
              </li>
            </ul>
            <p className="text-gray-700 mb-3">
              You are responsible for ensuring that your use of exported content complies with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>OpenStreetMap's attribution requirements</li>
              <li>Applicable laws regarding geographic data in your jurisdiction</li>
              <li>Any applicable export control regulations</li>
            </ul>
          </section>

          <section id="shareable-links" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Shareable Links</h2>
            <p className="text-gray-700 mb-3">
              The Service allows you to create shareable links that encode your map configuration directly
              in the URL. When you create and share these links:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>The geographic coordinates and settings are visible to anyone with the link</li>
              <li>You are responsible for the content and distribution of links you create</li>
              <li>No data is stored on our servers — the link itself contains all necessary information</li>
              <li>We cannot delete or modify links after they are created, as no server-side record exists</li>
            </ul>
            <p className="text-gray-700">
              Do not include sensitive location information in shareable links if you do not want that
              information to be accessible to recipients.
            </p>
          </section>

          <section id="no-warranty" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. No Warranty</h2>
            <p className="text-gray-700 mb-3">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Implied warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Freedom from viruses or other harmful components</li>
            </ul>
            <p className="text-gray-700">
              We do not warrant that the Service will meet your requirements or that any errors will be corrected.
            </p>
          </section>

          <section id="accuracy" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Accuracy Disclaimer</h2>
            <p className="text-gray-700 mb-3">
              While we strive to provide accurate distance calculations and map visualizations, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>
                Distance calculations are based on the Haversine formula using a spherical Earth model,
                which may introduce small errors (typically less than 0.3%) compared to calculations using
                the Earth's true ellipsoid shape
              </li>
              <li>
                Geocoding results depend on third-party data sources that may contain errors or be out of date
              </li>
              <li>
                Map tile data is crowdsourced and may not reflect current conditions
              </li>
              <li>
                Radius circles represent idealized straight-line distances and do not account for terrain,
                roads, or other obstacles
              </li>
            </ul>
            <p className="text-gray-700">
              The Service is intended for general reference and visualization purposes. For applications
              requiring high precision (such as surveying, legal boundaries, emergency response, or navigation),
              you must verify measurements using professional-grade equipment and authoritative data sources.
            </p>
          </section>

          <section id="user-responsibility" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. User Responsibility</h2>
            <p className="text-gray-700 mb-3">
              You are solely responsible for how you use the results from our tools. Specifically:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                The Service should not be used as the sole basis for decisions involving personal safety,
                emergency planning, or life-critical applications
              </li>
              <li>
                Do not rely on the Service for legal compliance without independent verification by qualified professionals
              </li>
              <li>
                Financial or business decisions based on Service output should be validated through
                appropriate due diligence
              </li>
              <li>
                Navigation or wayfinding should use dedicated GPS/navigation applications, not radius visualizations
              </li>
            </ul>
          </section>

          <section id="limitation" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Limitation of Liability</h2>
            <p className="text-gray-700 mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MAP WITH RADIUS, ITS
              AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Any loss of profits, revenue, data, or goodwill</li>
              <li>Any damages arising from your use or inability to use the Service</li>
              <li>Any damages arising from errors, inaccuracies, or omissions in Service content</li>
              <li>Any damages arising from unauthorized access to or alteration of your transmissions or data</li>
              <li>Any other damages arising out of or related to these Terms or the Service</li>
            </ul>
            <p className="text-gray-700">
              This limitation applies regardless of the legal theory (contract, tort, strict liability, or otherwise)
              and even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section id="indemnification" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify, defend, and hold harmless Map With Radius and its affiliates, officers,
              directors, employees, and agents from and against any claims, liabilities, damages, losses,
              costs, or expenses (including reasonable attorneys' fees) arising out of or related to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content you create, share, or distribute using the Service</li>
            </ul>
          </section>

          <section id="modifications" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Modifications to Service</h2>
            <p className="text-gray-700 mb-3">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof)
              at any time, with or without notice, for any reason. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Adding, removing, or changing features and functionality</li>
              <li>Updating the user interface or design</li>
              <li>Changing supported browsers or devices</li>
              <li>Adjusting usage limits or rate limits</li>
              <li>Introducing, modifying, or removing advertising</li>
            </ul>
            <p className="text-gray-700">
              We shall not be liable to you or any third party for any modification, suspension, or
              discontinuance of the Service.
            </p>
          </section>

          <section id="termination" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Termination</h2>
            <p className="text-gray-700 mb-3">
              We may terminate or suspend your access to the Service immediately, without prior notice
              or liability, for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Breach of these Terms of Use</li>
              <li>Conduct that we believe is harmful to other users, the Service, or third parties</li>
              <li>Conduct that violates applicable laws</li>
            </ul>
            <p className="text-gray-700">
              Upon termination, your right to use the Service will immediately cease. All provisions of
              these Terms which by their nature should survive termination shall survive, including
              ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section id="governing-law" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Governing Law</h2>
            <p className="text-gray-700 mb-3">
              These Terms of Use shall be governed by and construed in accordance with the laws of the
              United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-700">
              Any disputes arising under or in connection with these Terms shall be subject to the
              exclusive jurisdiction of the courts located in the United States. You waive any objection
              to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </section>

          <section id="severability" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Severability</h2>
            <p className="text-gray-700">
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court
              of competent jurisdiction, such provision shall be modified to the minimum extent necessary
              to make it valid, legal, and enforceable while preserving its intent. If such modification
              is not possible, the provision shall be severed, and the remaining provisions shall continue
              in full force and effect.
            </p>
          </section>

          <section id="entire-agreement" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">18. Entire Agreement</h2>
            <p className="text-gray-700 mb-3">
              These Terms of Use, together with our Privacy Policy, constitute the entire agreement between
              you and Map With Radius regarding your use of the Service.
            </p>
            <p className="text-gray-700">
              These Terms supersede any prior agreements, communications, or understandings, whether oral
              or written, between you and us regarding the subject matter hereof. Our failure to exercise
              or enforce any right or provision of these Terms shall not constitute a waiver of such right
              or provision.
            </p>
          </section>

          <section id="contact" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">19. Contact Information</h2>
            <p className="text-gray-700 mb-3">
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@mapwithradius.com" className="text-primary hover:underline">
                contact@mapwithradius.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Web:</strong>{' '}
              <Link href="/contact" className="text-primary hover:underline">
                mapwithradius.com/contact
              </Link>
            </p>
          </section>

          {/* Related Pages */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
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
