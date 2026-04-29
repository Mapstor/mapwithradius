import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mapwithradius.com'),
  title: 'Map With Radius — Embed',
  description: 'Embeddable radius map tool',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
