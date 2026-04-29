import type { Metadata } from 'next';

export const OG_IMAGES: NonNullable<Metadata['openGraph']>['images'] = [
  {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Map With Radius — Draw radius circles on any map for free',
  },
];
