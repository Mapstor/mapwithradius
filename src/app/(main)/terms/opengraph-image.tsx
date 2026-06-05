import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Terms of Use — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Terms of Use',
    subtitle: 'Terms governing your use of Map With Radius.',
  });
}
