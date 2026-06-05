import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Contact Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Contact',
    subtitle: 'Get in touch with the Map With Radius team for feedback, bug reports, or feature requests.',
  });
}
