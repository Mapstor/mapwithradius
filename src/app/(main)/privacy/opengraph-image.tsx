import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Privacy Policy — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Privacy Policy',
    subtitle: 'How Map With Radius handles your data, including analytics, ads, and EEA/UK/CH consent.',
  });
}
