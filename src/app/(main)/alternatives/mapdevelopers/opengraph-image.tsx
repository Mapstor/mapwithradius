import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'MapDevelopers Alternative — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'MapDevelopers Alternative',
    subtitle: 'An OpenStreetMap-based alternative to MapDevelopers\' Google Maps Draw Circle Tool.',
    eyebrow: 'Map With Radius · Comparison',
  });
}
