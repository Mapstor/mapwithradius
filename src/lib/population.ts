// Population-within-radius estimates via AREA-OVERLAP WEIGHTING. Each ZCTA is approximated
// as an equal-area circle of radius `rzm` (metres) at its point (rzm = sqrt(ALAND/π), from
// the 2020 Census Gazetteer land area, precomputed per ZIP in us-zip-points.json). A ZCTA
// contributes pop × (fraction of its disk inside the user circle) using the standard
// circle-circle intersection area: full containment = 1, tangent/disjoint = 0. This fixes
// the centroid-in-circle failure where a large rural ZCTA whose centre sits just outside a
// moderate circle contributed 0 even though the circle clearly covered part of it.
//
// It remains an ESTIMATE (ZCTAs are not really circles) — callers label results accordingly
// and round for display. A ZIP with no area (rzm=0, e.g. a territory ZIP) falls back to
// centroid inclusion.

import { ZipDatabase } from './zipCodes';

export type Unit = 'miles' | 'kilometers';
export const MILES_PER_KM = 0.621371;
export const RING_PRESET = [1, 3, 5]; // the flagship site-selection rings, in the active unit

export function unitShort(unit: Unit): string {
  return unit === 'kilometers' ? 'km' : 'mi';
}

export function toMiles(value: number, unit: Unit): number {
  return unit === 'kilometers' ? value * MILES_PER_KM : value;
}

const MILES_TO_M = 1609.344;
const EARTH_R_M = 6371008.8;

function haversineMeters(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_R_M * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

/** Intersection area of two circles (radii r0, r1; centre distance d). */
function circleIntersectionArea(r0: number, r1: number, d: number): number {
  if (d >= r0 + r1) return 0; // disjoint
  if (d <= Math.abs(r0 - r1)) return Math.PI * Math.min(r0, r1) ** 2; // one inside the other
  const r0s = r0 * r0;
  const r1s = r1 * r1;
  const a0 = r0s * Math.acos((d * d + r0s - r1s) / (2 * d * r0));
  const a1 = r1s * Math.acos((d * d + r1s - r0s) / (2 * d * r1));
  const a2 = 0.5 * Math.sqrt(Math.max(0, (-d + r0 + r1) * (d + r0 - r1) * (d - r0 + r1) * (d + r0 + r1)));
  return a0 + a1 - a2;
}

/** Fraction (0..1) of a ZCTA's disk inside the user circle. rzm≤0 → centroid inclusion. */
function overlapWeight(userRm: number, rzm: number, d: number): number {
  if (rzm <= 0) return d <= userRm ? 1 : 0;
  const frac = circleIntersectionArea(userRm, rzm, d) / (Math.PI * rzm * rzm);
  return frac <= 0 ? 0 : frac >= 1 ? 1 : frac;
}

// A ZIP whose disk overlaps the circle by more than this counts toward the ZIP tally
// (a small floor so slivers don't inflate the count). Population uses the exact fraction.
const COUNT_THRESHOLD = 0.005;

export interface RingResult {
  radius: number; // in the active display unit
  radiusMiles: number;
  cumulativePopulation: number;
  cumulativeZipCount: number;
  bandPopulation: number;
  bandZipCount: number;
}

/** Concentric-ring populations (each cumulative circle + its incremental band). */
export function computeRings(
  centerLat: number,
  centerLng: number,
  radiiInUnit: number[],
  unit: Unit,
  db: ZipDatabase
): RingResult[] {
  const radii = radiiInUnit
    .map((r) => ({ unitR: r, m: toMiles(r, unit) * MILES_TO_M }))
    .sort((a, b) => a.m - b.m);
  const cum = radii.map(() => ({ pop: 0, count: 0 }));

  for (const z of db.all) {
    if (z.pop === 0) continue;
    const d = haversineMeters(centerLat, centerLng, z.lat, z.lng);
    for (let i = 0; i < radii.length; i++) {
      const w = overlapWeight(radii[i].m, z.rzm, d);
      if (w > 0) {
        cum[i].pop += z.pop * w;
        if (w > COUNT_THRESHOLD) cum[i].count += 1;
      }
    }
  }

  return radii.map((r, i) => {
    const inner = i > 0 ? cum[i - 1] : { pop: 0, count: 0 };
    return {
      radius: r.unitR,
      radiusMiles: r.m / MILES_TO_M,
      cumulativePopulation: Math.round(cum[i].pop),
      cumulativeZipCount: cum[i].count,
      bandPopulation: Math.round(cum[i].pop - inner.pop),
      bandZipCount: Math.max(0, cum[i].count - inner.count),
    };
  });
}

/** Population within a single custom radius. */
export function computeSingle(
  centerLat: number,
  centerLng: number,
  radiusInUnit: number,
  unit: Unit,
  db: ZipDatabase
): { population: number; zipCount: number; radiusMiles: number } {
  const rm = toMiles(radiusInUnit, unit) * MILES_TO_M;
  let population = 0;
  let zipCount = 0;
  for (const z of db.all) {
    if (z.pop === 0) continue;
    const w = overlapWeight(rm, z.rzm, haversineMeters(centerLat, centerLng, z.lat, z.lng));
    if (w > 0) {
      population += z.pop * w;
      if (w > COUNT_THRESHOLD) zipCount += 1;
    }
  }
  return { population: Math.round(population), zipCount, radiusMiles: rm / MILES_TO_M };
}

/** Round to avoid false precision: <1k→nearest 10, <100k→nearest 100, else nearest 1,000. */
export function roundPop(n: number): number {
  if (n < 1000) return Math.round(n / 10) * 10;
  if (n < 100000) return Math.round(n / 100) * 100;
  return Math.round(n / 1000) * 1000;
}

export function formatPop(n: number): string {
  return roundPop(n).toLocaleString('en-US');
}

/** CSV of the ring table (values rounded like the on-screen table). */
export function ringsToCsv(rings: RingResult[], unit: Unit): string {
  const u = unitShort(unit);
  const header = [`Ring (${u})`, 'Ring population (est.)', 'Cumulative population (est.)', 'Cumulative ZIPs'];
  const body = rings.map((r) => [
    String(r.radius),
    String(roundPop(r.bandPopulation)),
    String(roundPop(r.cumulativePopulation)),
    String(r.cumulativeZipCount),
  ]);
  return [header, ...body].map((row) => row.join(',')).join('\n');
}
