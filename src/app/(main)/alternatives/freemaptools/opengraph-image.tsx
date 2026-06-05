import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'FreeMapTools Alternative — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'FreeMapTools Alternative',
    subtitle: 'A modern alternative to the classic FreeMapTools radius tool, with KML and PNG export.',
    eyebrow: 'Map With Radius · Comparison',
  });
}
