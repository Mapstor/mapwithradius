// Polygon area + perimeter measurement for the Area Calculator.
//
// Area is GEODESIC (spherical), never planar lat/lng — it reuses the shared
// spherical-excess helper. Perimeter is a sum of great-circle edge lengths.
// Self-contained beyond those two shared, generic helpers.

import { sphericalPolygonAreaSqM } from './area';
import { haversineDistance } from './haversine';

export type MeasureUnit = 'acres' | 'sqft' | 'sqm' | 'hectares' | 'sqmi' | 'sqkm';
export type LatLng = { lat: number; lng: number };

export const MEASURE_UNITS: MeasureUnit[] = ['acres', 'sqft', 'sqm', 'hectares', 'sqmi', 'sqkm'];

export const MEASURE_UNIT_LABEL: Record<MeasureUnit, string> = {
  acres: 'acres',
  sqft: 'sq ft',
  sqm: 'm²',
  hectares: 'hectares',
  sqmi: 'sq mi',
  sqkm: 'km²',
};
export const MEASURE_UNIT_SHORT: Record<MeasureUnit, string> = {
  acres: 'ac',
  sqft: 'ft²',
  sqm: 'm²',
  hectares: 'ha',
  sqmi: 'mi²',
  sqkm: 'km²',
};

// Precise conversions — a measurement tool should be exact, not display-rounded.
const SQM_PER: Record<MeasureUnit, number> = {
  acres: 4046.8564224, // 43,560 ft² × 0.09290304 m²/ft²
  sqft: 0.09290304, // exact
  sqm: 1,
  hectares: 10000,
  sqmi: 2589988.110336, // 1609.344² m
  sqkm: 1000000,
};

const IMPERIAL: Record<MeasureUnit, boolean> = {
  acres: true,
  sqft: true,
  sqmi: true,
  sqm: false,
  hectares: false,
  sqkm: false,
};

// Geodesic area (m²) of a ring — spherical, NOT planar. 0 for < 3 vertices.
export function polygonAreaSqM(vertices: LatLng[]): number {
  return vertices.length < 3 ? 0 : sphericalPolygonAreaSqM(vertices);
}

// Geodesic perimeter (m). Closes the ring (last → first) once there are ≥ 3 points;
// a 2-point path returns the single segment length.
export function polygonPerimeterM(vertices: LatLng[]): number {
  const n = vertices.length;
  if (n < 2) return 0;
  const edges = n >= 3 ? n : n - 1;
  let sum = 0;
  for (let i = 0; i < edges; i++) {
    const a = vertices[i];
    const b = vertices[(i + 1) % n];
    sum += haversineDistance(a.lat, a.lng, b.lat, b.lng, 'meters');
  }
  return sum;
}

export function sqMToUnit(sqm: number, unit: MeasureUnit): number {
  return sqm / SQM_PER[unit];
}

export function isImperial(unit: MeasureUnit): boolean {
  return IMPERIAL[unit];
}

function fmt(v: number): string {
  if (!isFinite(v) || v === 0) return '0';
  if (v < 1) return v.toLocaleString(undefined, { maximumFractionDigits: 4 });
  if (v < 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function formatAreaInUnit(sqm: number, unit: MeasureUnit): string {
  return `${fmt(sqMToUnit(sqm, unit))} ${MEASURE_UNIT_SHORT[unit]}`;
}

export function areaValueInUnit(sqm: number, unit: MeasureUnit): string {
  return fmt(sqMToUnit(sqm, unit));
}

// Perimeter formatted in the measurement system that matches the chosen area unit.
export function formatPerimeter(meters: number, unit: MeasureUnit): string {
  if (isImperial(unit)) {
    const ft = meters / 0.3048;
    return ft < 5280
      ? `${fmt(ft)} ft`
      : `${(ft / 5280).toLocaleString(undefined, { maximumFractionDigits: 2 })} mi`;
  }
  return meters < 1000
    ? `${fmt(meters)} m`
    : `${(meters / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} km`;
}
