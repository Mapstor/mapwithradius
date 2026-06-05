import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Walking & Cycling Radius Map — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Walking & Cycling Radius',
    subtitle: 'See how far you can walk or cycle in a given time, based on real paths and pedestrian routes.',
  });
}
