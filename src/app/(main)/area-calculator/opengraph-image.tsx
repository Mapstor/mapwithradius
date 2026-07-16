import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Map Area Calculator — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Map Area Calculator',
    subtitle: 'Draw any shape on a map and measure its area & perimeter — acres, sq ft, hectares & more.',
  });
}
