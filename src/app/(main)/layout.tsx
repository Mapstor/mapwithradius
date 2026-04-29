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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen bg-white`}>
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w0wdmpg7av");
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
