#!/usr/bin/env node
// Regression test for the city radius pages' "Inside the circle" / "Just outside"
// coverage lists in src/data/cities.ts.
//
// Each city in CITY_ASSERTIONS declares (anchor + named places with lat/lng).
// The script:
//   1. Computes haversine distance from the city anchor to each named place.
//   2. Locates the radius bucket in cities.ts (by `radius: N`).
//   3. Reads the includes[] and excludes[] arrays of that bucket.
//   4. Asserts the place name appears on the side consistent with the actual
//      distance (distance <= radius → includes; distance > radius → excludes).
//
// Place "name" is matched as a substring within the array text, so the assertion
// works regardless of how the author phrased the entry ("Stamford, CT" or
// "Stamford, CT (~31 mi northeast)" both contain "Stamford").
//
// Coverage so far: New York City. Extend by adding entries to CITY_ASSERTIONS
// — each (city, place) costs one geocode lookup once.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CITIES_PATH = resolve(ROOT, 'src', 'data', 'cities.ts');

// Haversine — caller picks unit by passing the right Earth radius.
const EARTH_MILES = 3958.8;
const EARTH_KM = 6371.0;

function haversine(lat1, lng1, lat2, lng2, R) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getCitySection(text, slug) {
  const marker = `slug: '${slug}'`;
  const start = text.indexOf(marker);
  if (start < 0) return null;
  const nextSlug = text.indexOf("slug: '", start + marker.length);
  return text.substring(start, nextSlug > 0 ? nextSlug : text.length);
}

function getRadiusBucket(citySection, radius) {
  // Find "radius: N," (the exact number, comma-anchored to avoid 5 matching 50)
  const startRe = new RegExp(`radius:\\s*${radius},`);
  const startMatch = startRe.exec(citySection);
  if (!startMatch) return null;
  const start = startMatch.index;
  // The bucket ends at the next "radius:" or the end of the coverage array.
  const tail = citySection.substring(start + startMatch[0].length);
  const nextRadius = /radius:\s*\d+/.exec(tail);
  const end = nextRadius ? start + startMatch[0].length + nextRadius.index : citySection.length;
  return citySection.substring(start, end);
}

function findPlaceSide(bucketText, place) {
  // includes/excludes arrays contain only string literals; find each.
  const incMatch = /includes:\s*\[([\s\S]*?)\],/m.exec(bucketText);
  const excMatch = /excludes:\s*\[([\s\S]*?)\],/m.exec(bucketText);
  if (!incMatch || !excMatch) return 'parse-error';
  const inInc = incMatch[1].includes(place);
  const inExc = excMatch[1].includes(place);
  if (inInc && inExc) return 'both';
  if (inInc) return 'includes';
  if (inExc) return 'excludes';
  return 'missing';
}

// Coords are decimal degrees (WGS-84). "radius" is the city-page bucket to
// check; unit must match what's in cities.ts for that city.
const CITY_ASSERTIONS = {
  'new-york-city': {
    anchor: { lat: 40.758, lng: -73.9855 }, // Times Square
    unit: 'miles',
    places: [
      // 10-mile bucket
      { name: 'Yonkers', lat: 40.9312, lng: -73.8987, radius: 10 },
      { name: 'Newark Liberty Airport', lat: 40.6925, lng: -74.1687, radius: 10 },
      { name: 'JFK Airport', lat: 40.6413, lng: -73.7781, radius: 10 },
      { name: 'LaGuardia Airport', lat: 40.7769, lng: -73.874, radius: 10 },
      // 25-mile bucket
      { name: 'Stamford', lat: 41.0534, lng: -73.5387, radius: 25 },
      { name: 'Morristown', lat: 40.7968, lng: -74.4815, radius: 25 },
      { name: 'Hempstead', lat: 40.7062, lng: -73.6187, radius: 25 },
      { name: 'White Plains', lat: 41.034, lng: -73.7629, radius: 25 },
      { name: 'Paterson', lat: 40.9168, lng: -74.1718, radius: 25 },
      { name: 'Princeton', lat: 40.3573, lng: -74.6672, radius: 25 },
      // 50-mile bucket
      { name: 'Bridgeport', lat: 41.1865, lng: -73.1952, radius: 50 },
      { name: 'Newburgh', lat: 41.5034, lng: -74.0104, radius: 50 },
      { name: 'Trenton', lat: 40.2206, lng: -74.7597, radius: 50 },
      { name: 'Easton', lat: 40.6884, lng: -75.2207, radius: 50 },
      { name: 'Princeton', lat: 40.3573, lng: -74.6672, radius: 50 },
      { name: 'New Haven', lat: 41.3083, lng: -72.928, radius: 50 },
      { name: 'Philadelphia', lat: 39.9526, lng: -75.1652, radius: 50 },
    ],
  },
  london: {
    anchor: { lat: 51.5074, lng: -0.1278 }, // Charing Cross
    unit: 'kilometers',
    places: [
      // 5 km
      { name: 'Greenwich', lat: 51.4779, lng: -0.0014, radius: 5 },
      { name: 'Stratford', lat: 51.5416, lng: 0.0042, radius: 5 },
      // 10 km
      { name: 'Greenwich', lat: 51.4779, lng: -0.0014, radius: 10 },
      { name: 'Stratford', lat: 51.5416, lng: 0.0042, radius: 10 },
      { name: 'Wembley', lat: 51.556, lng: -0.2796, radius: 10 },
      { name: 'Heathrow', lat: 51.47, lng: -0.4543, radius: 10 },
      { name: 'Croydon', lat: 51.376, lng: -0.0982, radius: 10 },
      { name: 'Romford', lat: 51.5754, lng: 0.183, radius: 10 },
      // 25 km
      { name: 'Heathrow', lat: 51.47, lng: -0.4543, radius: 25 },
      { name: 'Croydon', lat: 51.376, lng: -0.0982, radius: 25 },
      { name: 'Watford', lat: 51.6565, lng: -0.3903, radius: 25 },
      { name: 'Brighton', lat: 50.8225, lng: -0.1372, radius: 25 },
      { name: 'Reading', lat: 51.4543, lng: -0.9781, radius: 25 },
      // 50 km
      { name: 'Luton Airport', lat: 51.8747, lng: -0.3683, radius: 50 },
      { name: 'Guildford', lat: 51.2362, lng: -0.5704, radius: 50 },
      { name: 'Brighton', lat: 50.8225, lng: -0.1372, radius: 50 },
      { name: 'Reading', lat: 51.4543, lng: -0.9781, radius: 50 },
      { name: 'Cambridge', lat: 52.2053, lng: 0.1218, radius: 50 },
      { name: 'Oxford', lat: 51.752, lng: -1.2577, radius: 50 },
    ],
  },
  tokyo: {
    anchor: { lat: 35.6896, lng: 139.7006 }, // Shinjuku Station
    unit: 'kilometers',
    places: [
      // 5 km
      { name: 'Tokyo Skytree', lat: 35.7101, lng: 139.8107, radius: 5 },
      { name: 'Haneda Airport', lat: 35.5494, lng: 139.7798, radius: 5 },
      // 10 km
      { name: 'Tokyo Skytree', lat: 35.7101, lng: 139.8107, radius: 10 }, // ~10.2 km — borderline
      { name: 'Haneda Airport', lat: 35.5494, lng: 139.7798, radius: 10 },
      // 25 km
      { name: 'Haneda Airport', lat: 35.5494, lng: 139.7798, radius: 25 },
      { name: 'Tokyo Disneyland', lat: 35.6329, lng: 139.8804, radius: 25 },
      { name: 'Narita Airport', lat: 35.772, lng: 140.3929, radius: 25 },
      { name: 'Mt Fuji', lat: 35.3606, lng: 138.7274, radius: 25 },
      // 50 km
      { name: 'Yokohama', lat: 35.4659, lng: 139.6228, radius: 50 },
      { name: 'Narita Airport', lat: 35.772, lng: 140.3929, radius: 50 },
      { name: 'Mt Fuji', lat: 35.3606, lng: 138.7274, radius: 50 },
    ],
  },
};

// Borderline band — within this distance of the radius, accept either side.
// Real places have non-zero extent; centroids are approximations. 2% of radius
// (with a floor of 0.5 unit) leaves room for legitimate authorial judgment.
function tolerance(radius) {
  return Math.max(0.5, radius * 0.02);
}

let failures = 0;
let passed = 0;
let info = 0;
const citiesText = readFileSync(CITIES_PATH, 'utf8');

for (const [slug, { anchor, unit, places }] of Object.entries(CITY_ASSERTIONS)) {
  const section = getCitySection(citiesText, slug);
  if (!section) {
    process.stderr.write(`FAIL: ${slug}: city not found in cities.ts\n`);
    failures++;
    continue;
  }
  const earthR = unit === 'kilometers' ? EARTH_KM : EARTH_MILES;
  for (const p of places) {
    const distance = haversine(anchor.lat, anchor.lng, p.lat, p.lng, earthR);
    const expected = distance <= p.radius ? 'includes' : 'excludes';
    const bucket = getRadiusBucket(section, p.radius);
    if (!bucket) {
      process.stderr.write(`FAIL: ${slug} r=${p.radius}: bucket not found in cities.ts\n`);
      failures++;
      continue;
    }
    const actual = findPlaceSide(bucket, p.name);
    if (actual === 'parse-error') {
      process.stderr.write(
        `FAIL: ${slug} r=${p.radius}: could not parse includes/excludes\n`
      );
      failures++;
      continue;
    }
    if (actual === 'missing') {
      process.stderr.write(
        `info: ${slug} r=${p.radius}: "${p.name}" not mentioned (distance ${distance.toFixed(1)} ${unit === 'kilometers' ? 'km' : 'mi'}, would be ${expected})\n`
      );
      info++;
      continue;
    }
    if (actual === 'both') {
      process.stderr.write(
        `FAIL: ${slug} r=${p.radius}: "${p.name}" appears in BOTH includes and excludes — fix one\n`
      );
      failures++;
      continue;
    }
    const u = unit === 'kilometers' ? 'km' : 'mi';
    const tol = tolerance(p.radius);
    const borderline = Math.abs(distance - p.radius) <= tol;
    if (actual !== expected && !borderline) {
      process.stderr.write(
        `FAIL: ${slug} r=${p.radius}: "${p.name}" is in ${actual} but distance ${distance.toFixed(1)} ${u} → should be ${expected}\n`
      );
      failures++;
    } else {
      passed++;
      const note = borderline ? ` borderline ±${tol.toFixed(1)}${u}` : '';
      process.stderr.write(
        `ok:   ${slug} r=${p.radius}: "${p.name}" in ${actual} (${distance.toFixed(1)} ${u})${note}\n`
      );
    }
  }
}

process.stderr.write(
  `\nCity coverage: ${passed} passed, ${failures} failed, ${info} not-mentioned (informational)\n`
);
if (failures > 0) {
  process.stderr.write('City coverage verification FAILED\n');
  process.exit(1);
}
process.stderr.write('City coverage verification PASSED\n');
