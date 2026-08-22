// Plain arithmetic for the distance/time comprehension tools (/how-far-is-x-miles,
// /miles-to-minutes). Every figure shown on those pages comes from these pure functions
// with an explicitly-labeled speed assumption — no fabricated "average" statistics.

/** Reference speeds, labeled on-page next to every figure they produce. */
export const SPEEDS = {
  /** Typical city / surface-street driving. */
  cityMph: 25,
  /** Typical open-highway driving. */
  highwayMph: 65,
  /** Average adult walking pace. */
  walkMph: 3,
} as const;

const MILES_PER_KM = 0.621371;

/** Minutes to cover `miles` at `mph` (distance ÷ speed × 60). */
export function minutesFor(miles: number, mph: number): number {
  if (!(miles > 0) || !(mph > 0)) return 0;
  return (miles / mph) * 60;
}

/** Convert kilometers to miles (for driving/walking-time math stated in mph). */
export function kmToMiles(km: number): number {
  return km * MILES_PER_KM;
}

/**
 * Human duration from a raw minute count: "24 min", "1 h", "1 h 5 min", "3 h 20 min".
 * Rounds to whole minutes — these are approximations, not stopwatch figures.
 */
export function formatDuration(totalMinutes: number): string {
  const m = Math.round(totalMinutes);
  if (m <= 0) return '0 min';
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem === 0 ? `${h} h` : `${h} h ${rem} min`;
}

/** The three labeled travel times for a straight-line distance given in miles. */
export function travelTimesForMiles(miles: number) {
  return {
    driveCityMin: minutesFor(miles, SPEEDS.cityMph),
    driveHighwayMin: minutesFor(miles, SPEEDS.highwayMph),
    walkMin: minutesFor(miles, SPEEDS.walkMph),
  };
}
