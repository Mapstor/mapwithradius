import { generateOgImage, size, contentType } from '@/lib/og-image';

export { size, contentType };
export const alt = 'Geofence Map — Map With Radius';

export default function Image() {
  return generateOgImage({
    title: 'Geofence Map',
    subtitle: 'Build polygon and radius geofences for any business location. Export to KML or GeoJSON.',
  });
}
