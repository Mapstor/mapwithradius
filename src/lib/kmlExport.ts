// KML file generation for circle polygons

export interface Circle {
  id: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  color: string;
}

/**
 * Generate a 360-point polygon approximation of a circle for KML
 */
function generateCircleCoordinates(lat: number, lng: number, radiusMeters: number): string {
  const points: string[] = [];
  const earthRadius = 6371000; // meters

  for (let i = 0; i <= 360; i++) {
    const bearing = (i * Math.PI) / 180;

    // Calculate the point at this bearing
    const lat1 = (lat * Math.PI) / 180;
    const lng1 = (lng * Math.PI) / 180;
    const angularDistance = radiusMeters / earthRadius;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(angularDistance) +
        Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing)
    );

    const lng2 =
      lng1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
        Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
      );

    const pointLat = (lat2 * 180) / Math.PI;
    const pointLng = (lng2 * 180) / Math.PI;

    points.push(`${pointLng},${pointLat},0`);
  }

  return points.join(' ');
}

/**
 * Convert hex color to KML format (aaBBGGRR)
 */
function hexToKmlColor(hex: string, opacity: number = 0.3): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Ensure 6-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);

  // Convert opacity to hex (0-255)
  const a = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  // KML uses aaBBGGRR format
  return `${a}${b}${g}${r}`;
}

/**
 * Generate KML file content for a set of circles
 */
export function generateKML(circles: Circle[]): string {
  const placemarks = circles
    .map((circle, index) => {
      const coordinates = generateCircleCoordinates(circle.lat, circle.lng, circle.radiusMeters);
      const kmlFillColor = hexToKmlColor(circle.color, 0.15);
      const kmlStrokeColor = hexToKmlColor(circle.color, 0.7);
      const radiusMiles = (circle.radiusMeters / 1609.344).toFixed(2);

      return `
    <Placemark>
      <name>Circle ${index + 1}</name>
      <description>Center: ${circle.lat.toFixed(6)}, ${circle.lng.toFixed(6)}
Radius: ${radiusMiles} miles (${(circle.radiusMeters / 1000).toFixed(2)} km)</description>
      <Style>
        <LineStyle>
          <color>${kmlStrokeColor}</color>
          <width>2</width>
        </LineStyle>
        <PolyStyle>
          <color>${kmlFillColor}</color>
        </PolyStyle>
      </Style>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${coordinates}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
    <Placemark>
      <name>Center ${index + 1}</name>
      <Point>
        <coordinates>${circle.lng},${circle.lat},0</coordinates>
      </Point>
    </Placemark>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Map With Radius Export</name>
    <description>Radius circles exported from mapwithradius.com</description>
    ${placemarks}
  </Document>
</kml>`;
}

/**
 * Download KML file
 */
export function downloadKML(circles: Circle[]): void {
  const kmlContent = generateKML(circles);
  const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'radius-map.kml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
