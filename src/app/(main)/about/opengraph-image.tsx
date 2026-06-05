import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'About Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'About Map With Radius',
    subtitle: 'Why this site exists, who runs it, and what it costs to keep the tool free.',
  });
}
