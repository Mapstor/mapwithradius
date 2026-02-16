import type { Metadata } from 'next';

export const metadata: Metadata = {
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
