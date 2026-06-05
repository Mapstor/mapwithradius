import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Use Cases — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Radius Map Use Cases',
    subtitle: 'How real teams use radius maps for sales territory, real-estate comps, catchment, and delivery zones.',
  });
}
