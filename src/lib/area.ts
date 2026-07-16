// Area-unit conversions + true-scale polygon geometry for the Acre Calculator.
//
// Self-contained on purpose: this module is only consumed by the /acre-calculator
// components, so it cannot affect the live radius tool. The canonical internal unit
// is square metres; every UI unit converts to/from m².

export type AreaUnit = 'acres' | 'hectares' | 'sqft' | 'sqm';
export type OverlayShape = 'square' | 'circle';

// Square metres per 1 unit. 1 acre = 4,046.86 m² — the exact figure shown in the
// page's instant-answer block, so the overlay scale and the copy never disagree.
// 1 hectare = 10,000 m²; 1 sq ft = 0.09290304 m² (exact); 1 m² = 1 m².
export const SQM_PER_ACRE = 4046.86;
export const SQFT_PER_ACRE = 43560; // exact, definitional
export const ACRES_PER_SQMI = 640; // 1 square mile = 640 acres (a "section")

export const SQM_PER_UNIT: Record<AreaUnit, number> = {
  acres: SQM_PER_ACRE,
  hectares: 10000,
  sqft: 0.09290304,
  sqm: 1,
};

// Canonical ordering used by every unit toggle.
export const UNITS_ALL: AreaUnit[] = ['acres', 'hectares', 'sqft', 'sqm'];

// Long label (readouts) and short label (segmented controls / share URL suffix).
export const UNIT_LABEL: Record<AreaUnit, string> = {
  acres: 'acres',
  hectares: 'hectares',
  sqft: 'sq ft',
  sqm: 'm²',
};
export const UNIT_SHORT: Record<AreaUnit, string> = {
  acres: 'ac',
  hectares: 'ha',
  sqft: 'ft²',
  sqm: 'm²',
};
const UNIT_URL: Record<AreaUnit, string> = {
  acres: 'ac',
  hectares: 'ha',
  sqft: 'sqft',
  sqm: 'sqm',
};
const URL_TO_UNIT: Record<string, AreaUnit> = {
  ac: 'acres',
  ha: 'hectares',
  sqft: 'sqft',
  sqm: 'sqm',
};

export function areaToSqM(value: number, unit: AreaUnit): number {
  return value * SQM_PER_UNIT[unit];
}

export function sqMToArea(sqm: number, unit: AreaUnit): number {
  return sqm / SQM_PER_UNIT[unit];
}

// Compact, human number: thousands-separated, up to 3 decimals, trailing zeros trimmed.
export function fmtNum(v: number): string {
  if (!isFinite(v)) return '0';
  const r = Math.round(v * 1000) / 1000;
  return r.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

// A value in one unit rendered as its own unit's short label, e.g. "0.5 ac".
export function formatArea(value: number, unit: AreaUnit): string {
  return `${fmtNum(value)} ${UNIT_SHORT[unit]}`;
}

// ---- Geometry (spherical Earth; identical model to the radius tool's handles) ----

const EARTH_RADIUS_M = 6371000;
const toRad = (deg: number) => (deg * Math.PI) / 180;

// Point `distMeters` from (lat,lng) along `bearing` (radians, 0 = north, clockwise).
export function destinationPoint(
  lat: number,
  lng: number,
  distMeters: number,
  bearing: number
): { lat: number; lng: number } {
  const delta = distMeters / EARTH_RADIUS_M;
  const phi1 = toRad(lat);
  const lambda1 = toRad(lng);
  const phi2 = Math.asin(
    Math.sin(phi1) * Math.cos(delta) + Math.cos(phi1) * Math.sin(delta) * Math.cos(bearing)
  );
  const lambda2 =
    lambda1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(delta) * Math.cos(phi1),
      Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2)
    );
  return { lat: (phi2 * 180) / Math.PI, lng: (lambda2 * 180) / Math.PI };
}

// Radius (metres) of a circle whose area is `areaSqM`.
export function circleRadiusM(areaSqM: number): number {
  return Math.sqrt(Math.max(0, areaSqM) / Math.PI);
}

// The four corners of an axis-aligned square of area `areaSqM` centred at (lat,lng),
// ordered NE, SE, SW, NW. Side = √area; each corner sits at the circumradius
// (side·√2⁄2) along a 45°/135°/225°/315° bearing.
export function squareVertices(
  lat: number,
  lng: number,
  areaSqM: number
): Array<{ lat: number; lng: number }> {
  const side = Math.sqrt(Math.max(0, areaSqM));
  const diag = (side / 2) * Math.SQRT2;
  return [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((b) =>
    destinationPoint(lat, lng, diag, b)
  );
}

// An n-gon approximating the circle of area `areaSqM` (used for scale verification).
export function circleVertices(
  lat: number,
  lng: number,
  areaSqM: number,
  n = 72
): Array<{ lat: number; lng: number }> {
  const r = circleRadiusM(areaSqM);
  const pts: Array<{ lat: number; lng: number }> = [];
  for (let i = 0; i < n; i++) pts.push(destinationPoint(lat, lng, r, (2 * Math.PI * i) / n));
  return pts;
}

// Geodesic area (m²) of a lat/lng ring via the spherical-excess formula. Used to
// verify that what we actually drew is at true scale (see the Playwright suite).
export function sphericalPolygonAreaSqM(points: Array<{ lat: number; lng: number }>): number {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    sum += (toRad(p2.lng) - toRad(p1.lng)) * (2 + Math.sin(toRad(p1.lat)) + Math.sin(toRad(p2.lat)));
  }
  return Math.abs((sum * EARTH_RADIUS_M * EARTH_RADIUS_M) / 2);
}

// The vertices of whatever shape we render, for area verification / KML later.
export function overlayVertices(
  lat: number,
  lng: number,
  areaSqM: number,
  shape: OverlayShape
): Array<{ lat: number; lng: number }> {
  return shape === 'square'
    ? squareVertices(lat, lng, areaSqM)
    : circleVertices(lat, lng, areaSqM);
}

// ---- Shareable URL (?lat=..&lng=..&a=1ac&sh=square) ----

export interface AcreParams {
  lat: number;
  lng: number;
  area: number;
  unit: AreaUnit;
  shape: OverlayShape;
}

function parseAreaString(s: string): { area: number; unit: AreaUnit } | null {
  const m = s.match(/^([\d.]+)(ac|ha|sqft|sqm)?$/i);
  if (!m) return null;
  const area = parseFloat(m[1]);
  if (isNaN(area) || area <= 0) return null;
  const unit = m[2] ? URL_TO_UNIT[m[2].toLowerCase()] ?? 'acres' : 'acres';
  return { area, unit };
}

export function parseAcreParams(
  searchParams: URLSearchParams
): { params: AcreParams | null; locate: boolean } {
  const locate = searchParams.get('locate') === 'true';
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');
  if (isNaN(lat) || isNaN(lng)) return { params: null, locate };

  const parsed = parseAreaString(searchParams.get('a') || '1ac') ?? { area: 1, unit: 'acres' as AreaUnit };
  const shParam = (searchParams.get('sh') || 'square').toLowerCase();
  const shape: OverlayShape = shParam === 'circle' ? 'circle' : 'square';

  return { params: { lat, lng, area: parsed.area, unit: parsed.unit, shape }, locate };
}

export function generateAcreShareUrl(p: AcreParams, baseUrl: string): string {
  const url = new URL(baseUrl);
  url.search = '';
  url.searchParams.set('lat', p.lat.toFixed(6));
  url.searchParams.set('lng', p.lng.toFixed(6));
  url.searchParams.set('a', `${fmtNum(p.area).replace(/,/g, '')}${UNIT_URL[p.unit]}`);
  url.searchParams.set('sh', p.shape);
  return url.toString();
}
