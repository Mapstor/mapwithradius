import type { MetadataRoute } from 'next';

const BASE = 'https://mapwithradius.com';

const routes: Array<{
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}> = [
  { path: '',                                changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/km-radius-map',                  changeFrequency: 'monthly', priority: 0.9 },
  { path: '/drive-time-map',                 changeFrequency: 'monthly', priority: 0.9 },
  { path: '/zip-code-radius',                changeFrequency: 'monthly', priority: 0.9 },
  { path: '/distance-calculator',            changeFrequency: 'monthly', priority: 0.9 },
  { path: '/walking-radius-map',             changeFrequency: 'monthly', priority: 0.9 },
  { path: '/geofence-map',                   changeFrequency: 'monthly', priority: 0.8 },
  { path: '/radius-on-google-maps',          changeFrequency: 'monthly', priority: 0.8 },
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
