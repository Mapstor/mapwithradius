#!/usr/bin/env node
// Reads data/uszips.csv (SimpleMaps free), emits public/data/us-zip-points.json.
// Run automatically via `prebuild` so the static asset stays in sync with the CSV.
//
// Output format (compact tuples to keep payload small after gzip):
//   {
//     "generated": "YYYY-MM-DD",
//     "source": "SimpleMaps US ZIPs Free",
//     "count": <number>,
//     "fields": ["zip","lat","lng","city","state"],
//     "rows": [["00601",18.18027,-66.75266,"Adjuntas","PR"], ...]
//   }

import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'data', 'uszips.csv');
const OUT_PATH = resolve(ROOT, 'public', 'data', 'us-zip-points.json');

// The CSV is gitignored as a local-only vendor file. On CI (Vercel) the CSV
// won't be present — that's expected. Skip cleanly and let the committed JSON
// from `public/data/` be used as-is.
if (!existsSync(CSV_PATH)) {
  if (existsSync(OUT_PATH)) {
    process.stderr.write(
      `build-uszips-json: ${CSV_PATH} not found; using existing ${OUT_PATH} (commit it before deploying).\n`
    );
    process.exit(0);
  }
  process.stderr.write(
    `build-uszips-json: ${CSV_PATH} not found AND ${OUT_PATH} not present. ` +
      `Download uszips.csv from simplemaps.com/data/us-zips into data/ and re-run.\n`
  );
  process.exit(1);
}

// CSV parser that handles RFC-4180 quoting (incl. embedded commas, escaped quotes,
// newlines inside quoted fields). The SimpleMaps CSV uses "" to escape quotes
// inside JSON-encoded fields like county_weights — a naive split-on-comma breaks.
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

function main() {
  const csvText = readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);
  if (rows.length === 0) {
    throw new Error('uszips.csv parsed to zero rows');
  }
  const header = rows[0];
  const idx = {
    zip: header.indexOf('zip'),
    lat: header.indexOf('lat'),
    lng: header.indexOf('lng'),
    city: header.indexOf('city'),
    state: header.indexOf('state_id'),
  };
  for (const [field, i] of Object.entries(idx)) {
    if (i < 0) throw new Error(`Missing required CSV column: ${field}`);
  }

  const out = [];
  const seenStates = new Set();
  let skipped = 0;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length < header.length) continue; // malformed trailing row
    const zip = row[idx.zip];
    const lat = Number(row[idx.lat]);
    const lng = Number(row[idx.lng]);
    const city = row[idx.city];
    const state = row[idx.state];
    if (!zip || !state || !Number.isFinite(lat) || !Number.isFinite(lng)) {
      skipped++;
      continue;
    }
    out.push([zip, lat, lng, city, state]);
    seenStates.add(state);
  }

  const today = new Date().toISOString().slice(0, 10);
  const payload = {
    generated: today,
    source: 'SimpleMaps US ZIPs Free',
    count: out.length,
    states: seenStates.size,
    fields: ['zip', 'lat', 'lng', 'city', 'state'],
    rows: out,
  };

  writeFileSync(OUT_PATH, JSON.stringify(payload));
  const stat = statSync(OUT_PATH);
  process.stderr.write(
    `build-uszips-json: ${out.length} ZIPs across ${seenStates.size} states/territories ` +
      `(skipped ${skipped} malformed rows) — ${(stat.size / 1024 / 1024).toFixed(2)} MB raw at ${OUT_PATH}\n`
  );
}

main();
