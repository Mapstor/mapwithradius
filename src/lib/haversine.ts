// Haversine formula for calculating distances on Earth's surface

const EARTH_RADIUS_METERS = 6371000;
const EARTH_RADIUS_MILES = 3958.8;
const EARTH_RADIUS_KM = 6371;

export type DistanceUnit = 'miles' | 'kilometers' | 'meters' | 'feet';

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculate the great-circle distance between two points using the Haversine formula
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  unit: DistanceUnit = 'miles'
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  switch (unit) {
    case 'miles':
      return EARTH_RADIUS_MILES * c;
    case 'kilometers':
      return EARTH_RADIUS_KM * c;
    case 'meters':
      return EARTH_RADIUS_METERS * c;
    case 'feet':
      return EARTH_RADIUS_MILES * c * 5280;
    default:
      return EARTH_RADIUS_MILES * c;
  }
}

/**
 * Convert a distance from one unit to meters (used by Leaflet)
 */
export function toMeters(distance: number, unit: DistanceUnit): number {
  switch (unit) {
    case 'miles':
      return distance * 1609.344;
    case 'kilometers':
      return distance * 1000;
    case 'meters':
      return distance;
    case 'feet':
      return distance * 0.3048;
    default:
      return distance * 1609.344;
  }
}

/**
 * Convert meters to a specified unit
 */
export function fromMeters(meters: number, unit: DistanceUnit): number {
  switch (unit) {
    case 'miles':
      return meters / 1609.344;
    case 'kilometers':
      return meters / 1000;
    case 'meters':
      return meters;
    case 'feet':
      return meters / 0.3048;
    default:
      return meters / 1609.344;
  }
}

/**
 * Calculate the area of a circle given its radius
 */
export function calculateCircleArea(radius: number, unit: DistanceUnit): number {
  // Returns area in square units of the input unit
  return Math.PI * radius * radius;
}

/**
 * Format distance with appropriate precision
 */
export function formatDistance(distance: number, unit: DistanceUnit): string {
  const unitLabels: Record<DistanceUnit, string> = {
    miles: 'mi',
    kilometers: 'km',
    meters: 'm',
    feet: 'ft',
  };

  if (distance < 0.1 && (unit === 'miles' || unit === 'kilometers')) {
    return `${distance.toFixed(3)} ${unitLabels[unit]}`;
  } else if (distance < 10) {
    return `${distance.toFixed(2)} ${unitLabels[unit]}`;
  } else {
    return `${distance.toFixed(1)} ${unitLabels[unit]}`;
  }
}

/**
 * Format area with appropriate precision
 */
export function formatArea(area: number, unit: DistanceUnit): string {
  const unitLabels: Record<DistanceUnit, string> = {
    miles: 'sq mi',
    kilometers: 'sq km',
    meters: 'sq m',
    feet: 'sq ft',
  };

  if (area < 1) {
    return `${area.toFixed(3)} ${unitLabels[unit]}`;
  } else if (area < 100) {
    return `${area.toFixed(2)} ${unitLabels[unit]}`;
  } else {
    return `${area.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unitLabels[unit]}`;
  }
}
