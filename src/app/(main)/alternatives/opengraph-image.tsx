import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Radius Map Alternatives — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Radius Map Alternatives',
    subtitle: 'Side-by-side comparisons with FreeMapTools, MapDevelopers, Maptive, CalcMaps, and Smappen.',
  });
}
