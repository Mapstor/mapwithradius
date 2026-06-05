import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'CalcMaps Alternative — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'CalcMaps Alternative',
    subtitle: 'How Map With Radius compares to CalcMaps — features, pricing, and workflow tradeoffs.',
    eyebrow: 'Map With Radius · Comparison',
  });
}
