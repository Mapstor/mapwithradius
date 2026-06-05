import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Distance Calculator — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Distance Calculator',
    subtitle: 'Measure the straight-line or driving distance between any two locations on a map.',
  });
}
