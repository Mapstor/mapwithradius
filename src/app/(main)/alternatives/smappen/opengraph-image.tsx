import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Smappen Alternative — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Smappen Alternative',
    subtitle: 'How Map With Radius compares to Smappen\'s catchment and territory tooling.',
    eyebrow: 'Map With Radius · Comparison',
  });
}
