import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/embed', '/embed/'],
      },
    ],
    sitemap: 'https://mapwithradius.com/sitemap.xml',
    host: 'https://mapwithradius.com',
  };
}
