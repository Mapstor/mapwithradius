#!/usr/bin/env node
// Emits public/data/us-zip-points.json — ZIP points + an integer 2020 Census
// population per ZIP — from two vendored inputs. Runs via `prebuild`/`predev` so the
// static asset stays in sync. Fully offline/deterministic once both inputs are vendored.
//
// INPUTS
//   data/uszips.csv                 SimpleMaps US ZIPs Free — ZIP coords, city/state, ZIP->ZCTA.
//                                   Gitignored local vendor file (absent on CI: see skip logic).
//   data/census-zcta-pop-2020.csv   US Census 2020 population by ZCTA (this task's addition).
//
// POPULATION SOURCE (public domain)
//   US Census Bureau — 2020 Census Demographic and Housing Characteristics File (DHC),
//   Table P1 "Total Population", variable P1_001N, by ZIP Code Tabulation Area (ZCTA).
//   Vintage: 2020 Decennial Census — actual enumerated counts (NOT ACS survey estimates).
//   Dataset API: https://api.census.gov/data/2020/dec/dhc
//   Vendored to data/census-zcta-pop-2020.csv. Fetched: 2026-07-27 (keyed request).
//   NOTE: the Census API now requires a free API key (get one at
//   https://api.census.gov/data/key_signup.html). Re-fetch (one line; requires curl + jq;
//   export CENSUS_KEY=<your key> first):
//     curl -s "https://api.census.gov/data/2020/dec/dhc?get=P1_001N&for=zip%20code%20tabulation%20area:*&key=$CENSUS_KEY" \
//       | jq -r '(["zcta","pop"], (.[1:][] | [.[1], .[0]])) | @csv' > data/census-zcta-pop-2020.csv
//
// LAND-AREA SOURCE (public domain) — used for area-overlap population weighting
//   US Census Bureau — 2020 Census ZCTA Gazetteer file, column ALAND (land area, m²).
//   Vendored to data/census-zcta-area-2020.csv (zcta,aland_sqm). Optional input: if
//   absent, rzm is 0 and the tool falls back to centroid inclusion.
//   NOTE: www2.census.gov returns 403 to scripted / non-US clients, so DOWNLOAD
//   2020_Gaz_zcta_national.zip in a BROWSER (the "ZIP Code Tabulation Areas" file at
//   https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2020.html),
//   then run this extract snippet on the local zip (GEOID col 1, ALAND col 2, tab-delimited):
//     { echo 'zcta,aland_sqm'; unzip -p 2020_Gaz_zcta_national.zip | tail -n +2 \
//         | awk -F'\t' '{gsub(/^[ \t]+|[ \t]+$/,"",$1); gsub(/^[ \t]+|[ \t]+$/,"",$2); \
//                        if($1 ~ /^[0-9]{5}$/) print $1","$2}'; } > data/census-zcta-area-2020.csv
//   From ALAND we precompute rzm = round(sqrt(ALAND/π)) — the radius (m) of the equal-area
//   circle for the ZCTA — stored per ZIP (smaller + no runtime sqrt).
//
// PROVENANCE / LICENSING (two sources, kept distinct)
//   - Population + land area: US Census Bureau — PUBLIC DOMAIN (no attribution required).
//   - ZIP coordinates, city/state, and ZIP->ZCTA mapping: SimpleMaps US ZIPs Free —
//     CC BY 4.0 (already attributed site-wide as the ZIP points source).
//
// JOIN
//   Each ZIP joins to its ZCTA's Census population on the 5-digit code. In SimpleMaps
//   Free every ZIP is itself a ZCTA (zcta=TRUE, empty parent_zcta) so the join is 1:1.
//   Defensive: a non-ZCTA child ZIP (zcta!=TRUE, has parent_zcta) is left population 0 so
//   the parent ZCTA's count is never double-attributed across the ZIPs that share it.
//
// OUTPUT (compact tuples, small after gzip)
//   { generated, source, populationSource, count, states, fields:[...,"pop"], rows:[[...,pop]] }

import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'data', 'uszips.csv');
const CENSUS_PATH = resolve(ROOT, 'data', 'census-zcta-pop-2020.csv');
const CENSUS_AREA_PATH = resolve(ROOT, 'data', 'census-zcta-area-2020.csv');
const OUT_PATH = resolve(ROOT, 'public', 'data', 'us-zip-points.json');

// Census API now requires a free key (https://api.census.gov/data/key_signup.html);
// export CENSUS_KEY=<your key> before running.
const FETCH_HINT =
  'curl -s "https://api.census.gov/data/2020/dec/dhc?get=P1_001N&for=zip%20code%20tabulation%20area:*&key=$CENSUS_KEY" ' +
  '| jq -r \'(["zcta","pop"], (.[1:][] | [.[1], .[0]])) | @csv\' > data/census-zcta-pop-2020.csv';

const FETCH_AREA_HINT =
  'download 2020_Gaz_zcta_national.zip in a browser (www2.census.gov 403s scripted/non-US clients) ' +
  'from census.gov gazetteer-files.2020, then run the extract snippet in this script header ' +
  '> data/census-zcta-area-2020.csv';

// The vendored CSVs may be absent on CI (Vercel) — the committed JSON is used as-is.
// Regenerate only when BOTH inputs are present; otherwise reuse the existing JSON.
{
  const haveCsv = existsSync(CSV_PATH);
  const haveCensus = existsSync(CENSUS_PATH);
  if (!haveCsv || !haveCensus) {
    const missing = [
      !haveCsv && 'data/uszips.csv (SimpleMaps US ZIPs Free)',
      !haveCensus && 'data/census-zcta-pop-2020.csv (US Census 2020 DHC P1_001N by ZCTA)',
    ]
      .filter(Boolean)
      .join(' + ');
    if (existsSync(OUT_PATH)) {
      process.stderr.write(
        `build-uszips-json: missing ${missing}; reusing existing ${OUT_PATH} as-is.\n` +
          (!haveCensus ? `  Fetch population with:\n    ${FETCH_HINT}\n` : '')
      );
      process.exit(0);
    }
    process.stderr.write(
      `build-uszips-json: missing ${missing} AND no existing ${OUT_PATH}.\n` +
        `  Place uszips.csv in data/ and fetch population with:\n    ${FETCH_HINT}\n`
    );
    process.exit(1);
  }
}

// RFC-4180 CSV parser (handles quoting, embedded commas/quotes/newlines). The SimpleMaps
// CSV uses "" to escape quotes inside JSON-encoded fields like county_weights.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cur);
        cur = '';
      } else if (c === '\n') {
        row.push(cur);
        rows.push(row);
        cur = '';
        row = [];
      } else if (c === '\r') {
        // skip — handled by next \n
      } else {
        cur += c;
      }
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

const zpad5 = (v) => String(v).trim().padStart(5, '0');

// Parse the Census ZCTA population CSV into a Map<zcta5, population:int>.
// Column detection is tolerant of header naming/order so a slightly different fetch
// (e.g. GEOID/P1_001N headers) still works.
function loadCensusPopulation() {
  const rows = parseCSV(readFileSync(CENSUS_PATH, 'utf8'));
  if (rows.length < 2) throw new Error(`${CENSUS_PATH} parsed to <2 rows`);
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const zctaCol = header.findIndex((h) => /^zcta$|zcta|geoid|zip.*tab/.test(h));
  const popCol = header.findIndex((h) => /^pop$|population|p1_001n/.test(h));
  if (zctaCol < 0 || popCol < 0) {
    throw new Error(`census CSV: could not find zcta + population columns in header [${header.join(', ')}]`);
  }
  const map = new Map();
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length <= Math.max(zctaCol, popCol)) continue;
    const zcta = zpad5(row[zctaCol]);
    const pop = Math.round(Number(row[popCol]));
    if (!/^\d{5}$/.test(zcta) || !Number.isFinite(pop)) continue;
    map.set(zcta, pop);
  }
  if (map.size === 0) throw new Error('census CSV produced zero ZCTA population rows');
  return map;
}

// Parse the Census ZCTA land-area CSV into Map<zcta5, aland_sqm:int>. Optional input:
// returns an empty map (with a hint) when the file is absent → rzm falls back to 0.
function loadCensusArea() {
  if (!existsSync(CENSUS_AREA_PATH)) {
    process.stderr.write(
      `build-uszips-json: ${CENSUS_AREA_PATH} not found — ZCTA land area omitted (rzm=0 → centroid fallback).\n` +
        `  For area-overlap accuracy, fetch it with:\n    ${FETCH_AREA_HINT}\n`
    );
    return new Map();
  }
  const rows = parseCSV(readFileSync(CENSUS_AREA_PATH, 'utf8'));
  if (rows.length < 2) return new Map();
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const zctaCol = header.findIndex((h) => /^zcta$|zcta|geoid/.test(h));
  const areaCol = header.findIndex((h) => /aland|area|sqm/.test(h));
  if (zctaCol < 0 || areaCol < 0) {
    throw new Error(`area CSV: could not find zcta + land-area columns in [${header.join(', ')}]`);
  }
  const map = new Map();
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length <= Math.max(zctaCol, areaCol)) continue;
    const zcta = zpad5(row[zctaCol]);
    const aland = Math.round(Number(row[areaCol]));
    if (!/^\d{5}$/.test(zcta) || !Number.isFinite(aland) || aland < 0) continue;
    map.set(zcta, aland);
  }
  return map;
}

const R_MILES = 3958.7613;
function milesBetween(aLat, aLng, bLat, bLng) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R_MILES * Math.asin(Math.min(1, Math.sqrt(s)));
}

function main() {
  const censusPop = loadCensusPopulation();
  const censusArea = loadCensusArea();

  const rows = parseCSV(readFileSync(CSV_PATH, 'utf8'));
  if (rows.length === 0) throw new Error('uszips.csv parsed to zero rows');
  const header = rows[0];
  const idx = {
    zip: header.indexOf('zip'),
    lat: header.indexOf('lat'),
    lng: header.indexOf('lng'),
    city: header.indexOf('city'),
    state: header.indexOf('state_id'),
    zcta: header.indexOf('zcta'),
    parent: header.indexOf('parent_zcta'),
  };
  for (const field of ['zip', 'lat', 'lng', 'city', 'state']) {
    if (idx[field] < 0) throw new Error(`Missing required CSV column: ${field}`);
  }

  const out = [];
  const seenStates = new Set();
  let skipped = 0;
  // Join accounting
  let primaryCount = 0; // ZIPs that are their own ZCTA (population bearer)
  let matched = 0; // primaries found in the Census pop file
  let areaMatched = 0; // primaries found in the Census area file
  let zeroPop = 0;
  const unmatchedExamples = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length < header.length) {
      skipped++;
      continue;
    }
    const zip = row[idx.zip];
    const lat = Number(row[idx.lat]);
    const lng = Number(row[idx.lng]);
    const city = row[idx.city];
    const state = row[idx.state];
    if (!zip || !state || !Number.isFinite(lat) || !Number.isFinite(lng)) {
      skipped++;
      continue;
    }

    const zctaFlag = idx.zcta >= 0 ? row[idx.zcta] : 'TRUE';
    const parentZcta = idx.parent >= 0 ? String(row[idx.parent] || '').trim() : '';
    const isPrimary = zctaFlag === 'TRUE' || parentZcta === '';

    let pop = 0;
    let rzm = 0;
    if (isPrimary) {
      primaryCount++;
      const key = zpad5(zip);
      const p = censusPop.get(key);
      if (p !== undefined) {
        pop = p;
        matched++;
      } else if (unmatchedExamples.length < 25) {
        unmatchedExamples.push(`${zip} (${city}, ${state})`);
      }
      const aland = censusArea.get(key);
      if (aland && aland > 0) {
        rzm = Math.round(Math.sqrt(aland / Math.PI)); // equal-area circle radius (m)
        areaMatched++;
      }
    }
    // Non-primary child ZIPs keep pop 0 (their ZCTA is counted on its primary ZIP).

    if (pop === 0) zeroPop++;
    out.push([zip, lat, lng, city, state, pop, rzm]);
    seenStates.add(state);
  }

  const today = new Date().toISOString().slice(0, 10);
  const payload = {
    generated: today,
    source: 'SimpleMaps US ZIPs Free (CC BY 4.0)',
    populationSource: 'US Census 2020 DHC P1_001N by ZCTA (public domain)',
    areaSource: 'US Census 2020 ZCTA Gazetteer ALAND → rzm equal-area radius (public domain)',
    count: out.length,
    states: seenStates.size,
    fields: ['zip', 'lat', 'lng', 'city', 'state', 'pop', 'rzm'],
    rows: out,
  };

  const prevSize = existsSync(OUT_PATH) ? statSync(OUT_PATH).size : 0;
  writeFileSync(OUT_PATH, JSON.stringify(payload));
  const newSize = statSync(OUT_PATH).size;

  // ---- Phase 0 gates ----
  const nationalSum = out.reduce((s, row) => s + row[5], 0);
  const REF_2020 = 331_449_281; // 2020 US resident population (50 states + DC)
  const pctVsRef = ((nationalSum - REF_2020) / REF_2020) * 100;
  const joinRate = primaryCount ? (matched / primaryCount) * 100 : 0;
  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
  const delta = newSize - prevSize;

  const spotCenters = ['10001', '60601', '90001', '77002', '94102'];
  const byZip = new Map(out.map((row) => [row[0], row]));
  const spotChecks = spotCenters.map((z) => {
    const c = byZip.get(z);
    if (!c) return `  ${z}: (not in dataset)`;
    let sum = 0;
    let n = 0;
    for (const row of out) {
      if (milesBetween(c[1], c[2], row[1], row[2]) <= 10) {
        sum += row[5];
        n++;
      }
    }
    return `  ${z} (${c[3]}, ${c[4]}): ${sum.toLocaleString()} people across ${n} ZIPs within 10 mi`;
  });

  const e = process.stderr;
  e.write(`\nbuild-uszips-json: ${out.length} ZIPs across ${seenStates.size} states/territories (skipped ${skipped} malformed)\n`);
  e.write(`  output ${OUT_PATH}\n`);
  e.write(`\n===== PHASE 0 GATES =====\n`);
  e.write(`[size]        ${mb(newSize)} (was ${mb(prevSize)}, delta ${delta >= 0 ? '+' : ''}${mb(delta)})  — budget < +1 MB\n`);
  e.write(`[join rate]   ${joinRate.toFixed(2)}% of ${primaryCount} ZCTA ZIPs matched Census pop`);
  e.write(joinRate < 95 ? `  <<< BELOW 95% — FLAG\n` : `  (>= 95% OK)\n`);
  const areaRate = primaryCount ? (areaMatched / primaryCount) * 100 : 0;
  e.write(`[area rate]   ${areaRate.toFixed(2)}% of ${primaryCount} ZCTA ZIPs have land area (rzm)`);
  e.write(
    areaMatched === 0
      ? `  <<< NO AREA — overlap weighting inactive (fetch the Gazetteer)\n`
      : areaRate < 95
        ? `  <<< BELOW 95% — FLAG\n`
        : `  (>= 95% OK)\n`
  );
  if (unmatchedExamples.length) e.write(`              unmatched e.g.: ${unmatchedExamples.slice(0, 12).join('; ')}\n`);
  e.write(`[national]    ${nationalSum.toLocaleString()} vs ${REF_2020.toLocaleString()} ref = ${pctVsRef >= 0 ? '+' : ''}${pctVsRef.toFixed(2)}%`);
  e.write(Math.abs(pctVsRef) <= 3 ? `  (within +/-3% OK)\n` : `  <<< OUTSIDE +/-3% — FLAG\n`);
  e.write(`[zero-pop]    ${zeroPop.toLocaleString()} ZIPs have pop 0 (preserved, not dropped)\n`);
  e.write(`[spot checks] population within 10 mi (eyeball vs known metros):\n${spotChecks.join('\n')}\n`);
  e.write(`=========================\n`);
}

main();
