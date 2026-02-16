import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map With Radius — Draw a Radius Circle on Any Map (Free)',
    description:
      'Free radius map tool. Draw circles on a map by distance, find what\'s within your radius, and share your map.',
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
