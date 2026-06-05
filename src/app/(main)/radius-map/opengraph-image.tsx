import { generateOgImage, size, contentType } from '@/lib/og-image';
import { CITIES } from '@/data/cities';

export { size, contentType };
export const alt = 'City Radius Maps — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'City Radius Maps',
    subtitle: `Pre-centered radius maps for ${CITIES.length} major cities across North America, Europe, Asia, and Australia.`,
  });
}
