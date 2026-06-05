import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Kilometer Radius Map — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Kilometer Radius Map',
    subtitle: 'Draw radius circles in kilometers around any location worldwide. Metric units by default.',
  });
}
