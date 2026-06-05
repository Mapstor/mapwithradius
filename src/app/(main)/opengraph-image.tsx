import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Map With Radius — Draw radius circles on any map for free';

export default function Image() {
  return generateOgImage({
    title: 'Draw radius circles on any map',
    subtitle: 'Free tool. No login, no API key. Works on any address worldwide.',
  });
}
