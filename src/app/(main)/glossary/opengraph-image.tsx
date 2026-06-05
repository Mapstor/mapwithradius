import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Radius Map Glossary — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Radius Map Glossary',
    subtitle: '44 terms covering radius mapping, isochrones, geocoding, projections, and spatial analysis.',
  });
}
