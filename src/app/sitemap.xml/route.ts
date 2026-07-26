import { CITIES } from '@/data/cities';

// Hand-built sitemap so we can include Google image-sitemap entries
// (<image:image>). Next 14.2's MetadataRoute.Sitemap convention (app/sitemap.ts)
// does not support per-URL images, so this Route Handler emits the XML directly.
const BASE = 'https://mapwithradius.com';

const routes: Array<{
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  images?: string[];
}> = [
  { path: '',                                changeFrequency: 'weekly',  priority: 1.0, images: [`${BASE}/images/radius-map-10-mile-las-vegas.png`] },
  { path: '/km-radius-map',                  changeFrequency: 'monthly', priority: 0.9, images: [`${BASE}/images/km-radius-map-10-km-london.png`] },
  { path: '/drive-time-map',                 changeFrequency: 'monthly', priority: 0.9 },
  { path: '/zip-code-radius',                changeFrequency: 'monthly', priority: 0.9, images: [`${BASE}/images/zip-code-radius-map-dallas.png`] },
  { path: '/distance-calculator',            changeFrequency: 'monthly', priority: 0.9 },
  { path: '/acre-calculator',                changeFrequency: 'monthly', priority: 0.9, images: [`${BASE}/images/5-acre-lot-overlay-suburban.png`] },
  { path: '/area-calculator',                changeFrequency: 'monthly', priority: 0.9, images: [`${BASE}/images/area-calculator-farmland-polygon.png`] },
  { path: '/walking-radius-map',             changeFrequency: 'monthly', priority: 0.9 },
  { path: '/geofence-map',                   changeFrequency: 'monthly', priority: 0.8, images: [`${BASE}/images/geofence-map-delivery-zone-austin.png`] },
  { path: '/radius-on-google-maps',          changeFrequency: 'monthly', priority: 0.8 },
  { path: '/radius-map',                     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/glossary',                       changeFrequency: 'monthly', priority: 0.7 },
  { path: '/use-cases',                      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives',                   changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives/calcmaps',          changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives/freemaptools',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives/mapdevelopers',     changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives/maptive',           changeFrequency: 'monthly', priority: 0.7 },
  { path: '/alternatives/smappen',           changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about',                          changeFrequency: 'yearly',  priority: 0.5 },
  { path: '/contact',                        changeFrequency: 'yearly',  priority: 0.5 },
  { path: '/terms',                          changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/privacy',                        changeFrequency: 'yearly',  priority: 0.3 },
];

// Prerender once at build time (new Date() would otherwise make this dynamic).
export const dynamic = 'force-static';

interface UrlEntry {
  loc: string;
  changefreq: string;
  priority: number;
  images?: string[];
}

function urlXml({ loc, changefreq, priority, images }: UrlEntry, lastmod: string): string {
  const imageXml = (images ?? [])
    .map((img) => `\n    <image:image><image:loc>${img}</image:loc></image:image>`)
    .join('');
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageXml}
  </url>`;
}

export function GET(): Response {
  const lastmod = new Date().toISOString();
  const entries: UrlEntry[] = [
    ...routes.map((r) => ({ loc: `${BASE}${r.path}`, changefreq: r.changeFrequency, priority: r.priority, images: r.images })),
    ...CITIES.map((c) => ({ loc: `${BASE}/radius-map/${c.slug}`, changefreq: 'monthly', priority: 0.6 })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map((e) => urlXml(e, lastmod)).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
