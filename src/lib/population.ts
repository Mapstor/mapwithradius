// Population-within-radius estimates. Sums the 2020 Census ZCTA population (P1_001N,
// attached per ZIP in us-zip-points.json) for every ZIP whose point falls inside the
// circle. A ZIP-area sum is an ESTIMATE — a ZIP straddling the boundary is counted as
// wholly in or out — so callers must label results "estimate" and round appropriately.

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

const R_MILES = 3958.8;
function haversineMiles(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return R_MILES * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

export interface RingResult {
  /** Radius in the active display unit. */
  radius: number;
  radiusMiles: number;
  /** Population within this radius (raw, un-rounded). */
  cumulativePopulation: number;
  cumulativeZipCount: number;
  /** Population added by this ring's annulus (cumulative minus the inner ring). */
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
    .map((r) => ({ unitR: r, mi: toMiles(r, unit) }))
    .sort((a, b) => a.mi - b.mi);
  const cum = radii.map(() => ({ pop: 0, count: 0 }));

  for (const z of db.all) {
    const d = haversineMiles(centerLat, centerLng, z.lat, z.lng);
    for (let i = 0; i < radii.length; i++) {
      if (d <= radii[i].mi) {
        cum[i].pop += z.pop;
        cum[i].count += 1;
      }
    }
  }

  return radii.map((r, i) => {
    const inner = i > 0 ? cum[i - 1] : { pop: 0, count: 0 };
    return {
      radius: r.unitR,
      radiusMiles: r.mi,
      cumulativePopulation: cum[i].pop,
      cumulativeZipCount: cum[i].count,
      bandPopulation: cum[i].pop - inner.pop,
      bandZipCount: cum[i].count - inner.count,
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
  const mi = toMiles(radiusInUnit, unit);
  let population = 0;
  let zipCount = 0;
  for (const z of db.all) {
    if (haversineMiles(centerLat, centerLng, z.lat, z.lng) <= mi) {
      population += z.pop;
      zipCount += 1;
    }
  }
  return { population, zipCount, radiusMiles: mi };
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
