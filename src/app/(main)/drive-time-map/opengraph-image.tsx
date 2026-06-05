import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Drive Time Map — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Drive Time Map',
    subtitle: 'See how far you can drive in 10, 15, or 30 minutes — based on real roads, not straight-line distance.',
  });
}
