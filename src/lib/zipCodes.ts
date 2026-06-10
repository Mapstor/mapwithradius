// US ZIP code database — lazy-loaded from /public/data/us-zip-points.json
// (generated at build time by scripts/build-uszips-json.mjs from data/uszips.csv).
//
// Coverage: ~33,800 ZIPs spanning all 50 states + DC + AS + GU + MP + PR + VI.
// Source: SimpleMaps US ZIPs Free (Census ZCTAs + parent-ZCTA crosswalk entries).
// Known gaps: single-recipient business ZIPs (e.g., 20505), PO-box-only ZIPs
// without a Census ZCTA, and retired ZIPs (e.g., 10048). These return null from
// getZipCode and the caller is expected to surface a "may be business/PO-box/retired"
// hint rather than a generic "not found."

export interface ZipCodeData {
  zip: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export interface ZipDatabase {
  byZip: Map<string, ZipCodeData>;
  all: ZipCodeData[];
  count: number;
  states: number;
  generated: string;
  source: string;
}

export interface ZipCodeWithDistance extends ZipCodeData {
  distance: number;
}

interface RawPayload {
  generated: string;
  source: string;
  count: number;
  states: number;
  fields: string[];
  rows: [string, number, number, string, string][];
}

const DATA_URL = '/data/us-zip-points.json';

let cachedDb: ZipDatabase | null = null;
let inflight: Promise<ZipDatabase> | null = null;

export function loadZipDatabase(): Promise<ZipDatabase> {
  if (cachedDb) return Promise.resolve(cachedDb);
  if (inflight) return inflight;
  inflight = fetch(DATA_URL, { cache: 'force-cache' })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load ZIP database: ${res.status} ${res.statusText}`);
      }
      return res.json() as Promise<RawPayload>;
    })
    .then((payload) => {
      const all: ZipCodeData[] = payload.rows.map(([zip, lat, lng, city, state]) => ({
        zip,
        lat,
        lng,
        city,
        state,
      }));
      const byZip = new Map<string, ZipCodeData>();
      for (const z of all) byZip.set(z.zip, z);
      cachedDb = {
        byZip,
        all,
        count: payload.count,
        states: payload.states,
        generated: payload.generated,
        source: payload.source,
      };
      inflight = null;
      return cachedDb;
    })
    .catch((err) => {
      inflight = null;
      throw err;
    });
  return inflight;
}

export function getZipCode(zip: string, db: ZipDatabase): ZipCodeData | null {
  return db.byZip.get(zip.trim()) ?? null;
}

// Returns the lexically nearest ZIP in the database to `target`. Used when a
// search ZIP is missing (e.g. unique/PO-box ZIPs like 06101 Hartford or 20505
// CIA HQ that lack a ZCTA): show the user a clickable suggestion so they get
// to a meaningful result instead of a dead-end. Strategy: pad to 5 digits,
// then find the entry with the smallest |numeric difference|. ZIP codes are
// roughly geographically ordered by USPS Sectional Center (first 3 digits),
// so numeric nearness tracks real-world nearness well enough for a fallback.
export function findNearestZip(rawInput: string, db: ZipDatabase): ZipCodeData | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;
  const padded = trimmed.padStart(5, '0');
  // Exact match (handles short input like "601" → "00601")
  const exact = db.byZip.get(padded);
  if (exact) return exact;
  const target = parseInt(padded, 10);
  if (!Number.isFinite(target)) return null;
  let best: ZipCodeData | null = null;
  let bestDiff = Infinity;
  for (const z of db.all) {
    const diff = Math.abs(parseInt(z.zip, 10) - target);
    if (diff < bestDiff) {
      best = z;
      bestDiff = diff;
    }
  }
  return best;
}

function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Geographic nearest neighbour (haversine, all 33K+ ZIPs scanned). Used when
// the user drags the ZIP-tool centre marker to a new spot on the map and the
// search has to snap back to an actual ZIP centroid — different from
// findNearestZip (numeric ZIP-code distance, used for typo fallback like
// 06101 → 06103 in the same prefix).
export function findNearestZipByLocation(
  lat: number,
  lng: number,
  db: ZipDatabase
): ZipCodeData | null {
  let best: ZipCodeData | null = null;
  let bestDistMi = Infinity;
  for (const z of db.all) {
    const d = haversineMiles(lat, lng, z.lat, z.lng);
    if (d < bestDistMi) {
      best = z;
      bestDistMi = d;
    }
  }
  return best;
}

export function findZipCodesWithinRadius(
  centerLat: number,
  centerLng: number,
  radiusMiles: number,
  db: ZipDatabase
): ZipCodeWithDistance[] {
  const results: ZipCodeWithDistance[] = [];
  for (const z of db.all) {
    const d = haversineMiles(centerLat, centerLng, z.lat, z.lng);
    if (d <= radiusMiles) {
      results.push({ ...z, distance: Math.round(d * 10) / 10 });
    }
  }
  results.sort((a, b) => a.distance - b.distance);
  return results;
}

export function getAllZipCodes(db: ZipDatabase): ZipCodeData[] {
  return db.all;
}

export function zipCodesToCsv(zipCodes: ZipCodeWithDistance[]): string {
  const headers = ['Zip Code', 'City', 'State', 'Distance (miles)'];
  const rows = zipCodes.map((z) => [z.zip, z.city, z.state, z.distance.toString()]);
  return [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join(
    '\n'
  );
}
