import { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Map With Radius for questions, bug reports, feature requests, or business inquiries. We typically respond within 48 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: 'https://mapwithradius.com/contact',
    title: 'Contact Us',
    description: 'Contact Map With Radius for questions, bug reports, feature requests, or business inquiries. We typically respond within 48 hours.',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    description: 'Contact Map With Radius for questions, bug reports, feature requests, or business inquiries. We typically respond within 48 hours.',
    images: OG_IMAGES,
  },
};

export default function ContactPage() {
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
                name: 'Contact',
                item: 'https://mapwithradius.com/contact',
              },
            ],
          }),
        }}
      />
      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Map With Radius',
            description: 'Contact page for Map With Radius mapping tools',
            url: 'https://mapwithradius.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'Map With Radius',
              email: 'contact@mapwithradius.com',
              url: 'https://mapwithradius.com',
            },
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
                name: 'Is Map With Radius free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes, all of our mapping tools are completely free. There are no hidden fees, no premium tiers, and no account required. We're supported by minimal, non-intrusive advertising.",
                },
              },
              {
                '@type': 'Question',
                name: 'How accurate are the distance calculations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our radius calculations use the Haversine formula, which accounts for the Earth's curvature and is accurate to within a few meters for most purposes. However, for critical applications, we recommend verifying measurements independently.",
                },
              },
              {
                '@type': 'Question',
                name: "Why isn't my location working?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Location access requires your browser's permission. Check that you've allowed location access for our site. If you're on a desktop without GPS, the location may be less accurate. You can always search for an address manually instead.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I embed the map on my website?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We\'re working on an embeddable widget. In the meantime, you can share maps using the "Copy Link" feature, which creates a URL that opens the map with your exact configuration.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I export my radius map?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can export your map in two ways: Download as PNG (image) for use in documents or presentations, or Export as KML for use in Google Earth, ArcGIS, and other mapping software. Both options are available in the controls panel.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you store my data?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "No. We don't require accounts, don't track your location, and don't store your map data. Everything happens in your browser. When you share a link, the coordinates are encoded directly in the URL — nothing is saved on our servers. See our Privacy Policy for details.",
                },
              },
            ],
          }),
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          We're here to help. Whether you have a question, found a bug, or want to suggest a new feature,
          we'd love to hear from you.
        </p>

        {/* Primary Contact */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h2>
          <p className="text-gray-700 mb-4">
            The best way to reach us is by email. We read every message and typically respond within 48 hours
            during business days.
          </p>
          <a
            href="mailto:contact@mapwithradius.com"
            className="inline-flex items-center gap-2 text-xl font-medium text-primary hover:text-primary-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@mapwithradius.com
          </a>
        </div>

        {/* Contact Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bug Reports</h3>
            <p className="text-gray-600 text-sm mb-3">
              Found something that's not working correctly? Please include:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>What you were trying to do</li>
              <li>What happened instead</li>
              <li>Your browser and device type</li>
              <li>Screenshots if possible</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Requests</h3>
            <p className="text-gray-600 text-sm mb-3">
              Have an idea for a new feature or improvement? Tell us:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>What feature you'd like to see</li>
              <li>How you would use it</li>
              <li>Why it would be helpful</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">General Questions</h3>
            <p className="text-gray-600 text-sm mb-3">
              Questions about using our tools? We're happy to help with:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>How to use specific features</li>
              <li>Understanding distance calculations</li>
              <li>Exporting and sharing options</li>
              <li>Browser compatibility issues</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Inquiries</h3>
            <p className="text-gray-600 text-sm mb-3">
              For business-related inquiries such as:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Partnership opportunities</li>
              <li>Press and media requests</li>
              <li>Advertising inquiries</li>
              <li>Enterprise solutions</li>
            </ul>
          </div>
        </div>

        {/* FAQ Before Contacting */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6">
            Before reaching out, check if your question is answered below:
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Is Map With Radius free to use?</h3>
              <p className="text-gray-600 text-sm">
                Yes, all of our mapping tools are completely free. There are no hidden fees, no premium tiers,
                and no account required. We're supported by minimal, non-intrusive advertising.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">How accurate are the distance calculations?</h3>
              <p className="text-gray-600 text-sm">
                Our radius calculations use the Haversine formula, which accounts for the Earth's curvature
                and is accurate to within a few meters for most purposes. However, for critical applications,
                we recommend verifying measurements independently.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Why isn't my location working?</h3>
              <p className="text-gray-600 text-sm">
                Location access requires your browser's permission. Check that you've allowed location access
                for our site. If you're on a desktop without GPS, the location may be less accurate.
                You can always search for an address manually instead.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Can I embed the map on my website?</h3>
              <p className="text-gray-600 text-sm">
                We're working on an embeddable widget. In the meantime, you can share maps using the
                "Copy Link" feature, which creates a URL that opens the map with your exact configuration.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">How do I export my radius map?</h3>
              <p className="text-gray-600 text-sm">
                You can export your map in two ways: Download as PNG (image) for use in documents or
                presentations, or Export as KML for use in Google Earth, ArcGIS, and other mapping software.
                Both options are available in the controls panel.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Do you store my data?</h3>
              <p className="text-gray-600 text-sm">
                No. We don't require accounts, don't track your location, and don't store your map data.
                Everything happens in your browser. When you share a link, the coordinates are encoded
                directly in the URL — nothing is saved on our servers. See our{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.
              </p>
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">24-48 hrs</div>
              <div className="text-sm text-gray-600">Typical response time for general inquiries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">Priority</div>
              <div className="text-sm text-gray-600">Bug reports affecting core functionality</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">Reviewed</div>
              <div className="text-sm text-gray-600">All feature requests are logged and considered</div>
            </div>
          </div>
        </div>

        {/* Social and Community */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Connect</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              While email is the best way to reach us directly, you can also find updates and community
              discussions through various channels. We're always looking for ways to improve our tools
              based on user feedback.
            </p>
            <p className="text-gray-600 mt-4">
              If you've created something interesting using Map With Radius — whether it's a blog post,
              tutorial, or creative project — we'd love to hear about it. User stories help us understand
              how our tools are being used in the real world.
            </p>
          </div>
        </div>

        {/* Link to other pages */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="text-primary hover:text-primary-700 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              className="text-primary hover:text-primary-700 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary hover:text-primary-700 hover:underline"
            >
              Terms of Use
            </Link>
            <Link
              href="/"
              className="text-primary hover:text-primary-700 hover:underline"
            >
              Back to Map Tool
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
