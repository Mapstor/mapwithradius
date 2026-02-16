// URL parameter parsing and generation for shareable links

import { DistanceUnit } from './haversine';

export interface CircleParams {
  lat: number;
  lng: number;
  radius: number;
  unit: DistanceUnit;
  color: string;
}

export interface MapParams {
  circles: CircleParams[];
  locate: boolean;
}

/**
 * Parse radius string like "10mi" or "5km" into value and unit
 */
function parseRadiusString(radiusStr: string): { radius: number; unit: DistanceUnit } | null {
  const match = radiusStr.match(/^([\d.]+)(mi|km|m|ft)?$/i);
  if (!match) return null;

  const radius = parseFloat(match[1]);
  if (isNaN(radius)) return null;

  let unit: DistanceUnit = 'miles';
  if (match[2]) {
    const unitStr = match[2].toLowerCase();
    switch (unitStr) {
      case 'mi':
        unit = 'miles';
        break;
      case 'km':
        unit = 'kilometers';
        break;
      case 'm':
        unit = 'meters';
        break;
      case 'ft':
        unit = 'feet';
        break;
    }
  }

  return { radius, unit };
}

/**
 * Parse URL search params into map configuration
 */
export function parseUrlParams(searchParams: URLSearchParams): MapParams {
  const params: MapParams = {
    circles: [],
    locate: false,
  };

  // Check for locate param
  if (searchParams.get('locate') === 'true') {
    params.locate = true;
  }

  // Check for multiple circles format: ?c=lat,lng,radius,color&c=lat,lng,radius,color
  const circleParams = searchParams.getAll('c');
  if (circleParams.length > 0) {
    for (const c of circleParams) {
      const parts = c.split(',');
      if (parts.length >= 3) {
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        const radiusParsed = parseRadiusString(parts[2]);
        const color = parts[3] ? `#${parts[3].replace('#', '')}` : '#4285F4';

        if (!isNaN(lat) && !isNaN(lng) && radiusParsed) {
          params.circles.push({
            lat,
            lng,
            radius: radiusParsed.radius,
            unit: radiusParsed.unit,
            color,
          });
        }
      }
    }
    return params;
  }

  // Check for single circle format: ?lat=X&lng=Y&r=10mi&color=ff4444
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');
  const radiusStr = searchParams.get('r');
  const color = searchParams.get('color');

  if (!isNaN(lat) && !isNaN(lng)) {
    const radiusParsed = radiusStr ? parseRadiusString(radiusStr) : { radius: 10, unit: 'miles' as DistanceUnit };
    if (radiusParsed) {
      params.circles.push({
        lat,
        lng,
        radius: radiusParsed.radius,
        unit: radiusParsed.unit,
        color: color ? `#${color.replace('#', '')}` : '#4285F4',
      });
    }
  }

  return params;
}

/**
 * Generate a shareable URL for the current map state
 */
export function generateShareUrl(circles: CircleParams[], baseUrl: string = window.location.origin): string {
  if (circles.length === 0) {
    return baseUrl;
  }

  const url = new URL(baseUrl);

  if (circles.length === 1) {
    // Single circle format
    const circle = circles[0];
    url.searchParams.set('lat', circle.lat.toFixed(6));
    url.searchParams.set('lng', circle.lng.toFixed(6));

    const unitShort: Record<DistanceUnit, string> = {
      miles: 'mi',
      kilometers: 'km',
      meters: 'm',
      feet: 'ft',
    };
    url.searchParams.set('r', `${circle.radius}${unitShort[circle.unit]}`);
    url.searchParams.set('color', circle.color.replace('#', ''));
  } else {
    // Multiple circles format
    for (const circle of circles) {
      const unitShort: Record<DistanceUnit, string> = {
        miles: 'mi',
        kilometers: 'km',
        meters: 'm',
        feet: 'ft',
      };
      const circleStr = `${circle.lat.toFixed(6)},${circle.lng.toFixed(6)},${circle.radius}${unitShort[circle.unit]},${circle.color.replace('#', '')}`;
      url.searchParams.append('c', circleStr);
    }
  }

  return url.toString();
}
