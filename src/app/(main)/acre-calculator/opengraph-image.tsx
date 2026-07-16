import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Acre Calculator — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Acre Calculator',
    subtitle: 'See how big 1, 5, 10, or 640 acres really is — drawn to true scale on any map.',
  });
}
