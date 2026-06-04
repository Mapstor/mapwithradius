import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OG_IMAGES } from '@/lib/og';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mapwithradius.com'),
  title: {
    default: 'Map With Radius — Draw a Radius Circle on Any Map (Free)',
    template: '%s | Map With Radius',
  },
  description:
    'Free radius map tool. Draw circles on a map by distance, find what\'s within your radius, and share your map. No signup, no limits. Works on mobile.',
  keywords: [
    'radius on map',
    'radius map tool',
    'draw radius on map',
    'circle on map',
    'radius from my location',
  ],
  authors: [{ name: 'Map With Radius' }],
  creator: 'Map With Radius',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mapwithradius.com',
    siteName: 'Map With Radius',
    title: 'Map With Radius — Draw a Radius Circle on Any Map (Free)',
    description:
      'Free radius map tool. Draw circles on a map by distance, find what\'s within your radius, and share your map.',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map With Radius — Draw a Radius Circle on Any Map (Free)',
    description:
      'Free radius map tool. Draw circles on a map by distance, find what\'s within your radius, and share your map.',
    images: OG_IMAGES,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-adsense-account': 'ca-pub-3093026304369835',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen bg-white`}>
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // EEA/UK/Switzerland — default-deny non-essential storage until a CMP is added
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB','CH','IS','LI','NO'],
              wait_for_update: 500,
            });
            // Rest of world — default-grant so GA4 records standard analytics and AdSense can serve personalized ads once approved
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H8ZRCLN1TK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H8ZRCLN1TK');
          `}
        </Script>
        <Script
          id="adsense-auto-ads"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3093026304369835"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://mapwithradius.com/#organization',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://mapwithradius.com/apple-icon',
                width: 180,
                height: 180,
              },
              description: 'Free online tool to draw radius circles on a map. No signup required, no limits.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://mapwithradius.com/#website',
              name: 'Map With Radius',
              url: 'https://mapwithradius.com',
              description: 'Free online tool to draw radius circles on a map. No signup required, no limits.',
              inLanguage: 'en-US',
              publisher: {
                '@id': 'https://mapwithradius.com/#organization',
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
