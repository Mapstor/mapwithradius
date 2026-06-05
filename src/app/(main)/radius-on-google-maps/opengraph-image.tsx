import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Radius on Google Maps — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Radius on Google Maps',
    subtitle: 'How to draw a radius circle on Google Maps — and faster, free alternatives.',
  });
}
