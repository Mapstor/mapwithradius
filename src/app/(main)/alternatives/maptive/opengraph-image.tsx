import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Maptive Alternative — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Maptive Alternative',
    subtitle: 'A free, no-login alternative to Maptive\'s paid radius and territory mapping.',
    eyebrow: 'Map With Radius · Comparison',
  });
}
