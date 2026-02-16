import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Map With Radius',
  description: 'Contact Map With Radius for questions, bug reports, or feature requests.',
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
      <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          For questions, bug reports, or feature requests:
        </p>

        <p className="text-xl mb-8">
          <strong>Email:</strong>{' '}
          <a
            href="mailto:contact@mapwithradius.com"
            className="text-primary hover:underline"
          >
            contact@mapwithradius.com
          </a>
        </p>

        <p className="text-gray-600">
          We read every message. Response times may vary.
        </p>
      </div>
    </main>
    </>
  );
}
