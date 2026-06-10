#!/usr/bin/env node
// Computes the metro ZIP-density table used on /zip-code-radius.
// Reads public/data/us-zip-points.json (created by build-uszips-json.mjs first)
// and writes src/data/zip-density.json with counts per metro at 10/25/50 mi.
//
// Replaces the previously-hardcoded numbers that the audit flagged as
// invented-precision (NYC 187 / 412 / 892 etc.) with values computed from the
// actual loaded ZIP dataset.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ZIP_JSON = resolve(ROOT, 'public', 'data', 'us-zip-points.json');
const OUT_PATH = resolve(ROOT, 'src', 'data', 'zip-density.json');

if (!existsSync(ZIP_JSON)) {
  process.stderr.write(
    `build-zip-density: ${ZIP_JSON} not found. Run scripts/build-uszips-json.mjs first ` +
      `(or skip if you only have the committed density JSON).\n`
  );
  process.exit(0);
}

const METROS = [
  { name: 'New York City', centerZip: '10001' },
  { name: 'Los Angeles', centerZip: '90012' },
  { name: 'Chicago', centerZip: '60601' },
  { name: 'Houston', centerZip: '77002' },
  { name: 'Phoenix', centerZip: '85004' },
  { name: 'Philadelphia', centerZip: '19102' },
  { name: 'San Antonio', centerZip: '78205' },
  { name: 'Dallas', centerZip: '75201' },
];

const RADII_MI = [10, 25, 50];

function haversineMi(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const payload = JSON.parse(readFileSync(ZIP_JSON, 'utf8'));
const byZip = new Map(payload.rows.map((r) => [r[0], r]));

const metros = [];
for (const m of METROS) {
  const center = byZip.get(m.centerZip);
  if (!center) {
    process.stderr.write(
      `build-zip-density: center ZIP ${m.centerZip} (${m.name}) not in dataset — skipping\n`
    );
    continue;
  }
  const [, lat, lng] = center;
  const counts = {};
  for (const r of RADII_MI) {
    let count = 0;
    for (const row of payload.rows) {
      if (haversineMi(lat, lng, row[1], row[2]) <= r) count++;
    }
    counts[r] = count;
  }
  metros.push({ name: m.name, centerZip: m.centerZip, counts });
}

const out = {
  generated: payload.generated,
  source: `Computed from ${payload.source} (${payload.count} ZIPs)`,
  radiiMi: RADII_MI,
  metros,
};
writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
process.stderr.write(
  `build-zip-density: wrote ${metros.length} metros × ${RADII_MI.length} radii to ${OUT_PATH}\n`
);
for (const m of metros) {
  process.stderr.write(
    `  ${m.name.padEnd(20)} ${m.centerZip}  10mi=${m.counts[10]}  25mi=${m.counts[25]}  50mi=${m.counts[50]}\n`
  );
}
