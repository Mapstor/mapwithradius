import { generateOgImage, size, contentType } from '@/lib/og-image';
import { getCityBySlug } from '@/data/cities';

export { size, contentType };
export const alt = 'City Radius Map — Map With Radius';

export default function Image({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) {
    return generateOgImage({ title: 'City Radius Map' });
  }
  const unit = city.defaultUnit === 'miles' ? 'mile' : 'km';
  return generateOgImage({
    title: `${city.name} Radius Map`,
    subtitle: `Draw a ${city.defaultRadius}-${unit} radius around ${city.centralLandmark}. ${city.country}.`,
    eyebrow: `Map With Radius · ${city.region}`,
  });
}
