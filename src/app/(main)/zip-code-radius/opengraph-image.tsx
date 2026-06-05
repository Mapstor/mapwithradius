import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'ZIP Code Radius Map — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'ZIP Code Radius Map',
    subtitle: 'Find every US ZIP code within a radius of any address. Export results to CSV.',
  });
}
