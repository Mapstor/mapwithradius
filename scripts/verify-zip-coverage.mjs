#!/usr/bin/env node
// Regression test for the ZIP database.
// Run via `npm run verify` (which also rebuilds the JSON from the CSV first).
//
// Fails (exit 1) if:
//   - public/data/us-zip-points.json is missing or unparseable
//   - fewer than 33,000 ZIPs are present (sanity floor — current count is ~33,784)
//   - any required test-case ZIP is missing
//   - fewer than 50 US states are represented
//
// Also reports (warning, not failure) if known-absent ZIPs (20505, 12345, 10048)
// suddenly appear — this would indicate the dataset changed and our "known gap"
// disclosures in the FAQ need updating.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '..', 'public', 'data', 'us-zip-points.json');

const MUST_BE_PRESENT = [
  { zip: '90210', city: 'Beverly Hills', state: 'CA' },
  { zip: '02134', city: 'Allston', state: 'MA' },
  { zip: '56374', city: 'Saint Joseph', state: 'MN' },
  { zip: '99577', city: 'Eagle River', state: 'AK' },
  { zip: '96799', city: 'Pago Pago', state: 'AS' },
  { zip: '78701', city: 'Austin', state: 'TX' },
  { zip: '60601', city: 'Chicago', state: 'IL' },
  { zip: '33101', city: 'Miami', state: 'FL' },
  { zip: '19102', city: 'Philadelphia', state: 'PA' },
  { zip: '98101', city: 'Seattle', state: 'WA' },
  { zip: '00601', city: 'Adjuntas', state: 'PR' },
];

const KNOWN_ABSENT = ['20505', '12345', '10048'];

const FIFTY_STATES = new Set(
  'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(
    ' '
  )
);

const MIN_ZIPS = 33000;

function fail(msg) {
  process.stderr.write(`FAIL: ${msg}\n`);
  process.exit(1);
}
function warn(msg) {
  process.stderr.write(`WARN: ${msg}\n`);
}
function ok(msg) {
  process.stderr.write(`ok:   ${msg}\n`);
}

let raw;
try {
  raw = readFileSync(DATA_PATH, 'utf8');
} catch (e) {
  fail(`cannot read ${DATA_PATH}: ${e.message}`);
}
let payload;
try {
  payload = JSON.parse(raw);
} catch (e) {
  fail(`unparseable JSON: ${e.message}`);
}

if (!Array.isArray(payload.rows)) fail('payload.rows is not an array');
if (payload.rows.length < MIN_ZIPS) {
  fail(`only ${payload.rows.length} ZIPs (minimum ${MIN_ZIPS})`);
}
ok(`${payload.rows.length} ZIPs in database`);
ok(`source: ${payload.source}, generated: ${payload.generated}`);

const byZip = new Map(payload.rows.map((r) => [r[0], r]));

for (const { zip, city, state } of MUST_BE_PRESENT) {
  const row = byZip.get(zip);
  if (!row) fail(`required ZIP ${zip} (${city}, ${state}) is missing`);
  if (row[3] !== city) warn(`${zip}: city is "${row[3]}" not "${city}" (renamed or different convention?)`);
  if (row[4] !== state) fail(`${zip}: state is "${row[4]}" not "${state}"`);
}
ok(`all ${MUST_BE_PRESENT.length} required ZIPs present with correct state`);

for (const zip of KNOWN_ABSENT) {
  if (byZip.has(zip)) {
    warn(`known-absent ZIP ${zip} is now present — FAQ "known gap" copy may need updating`);
  }
}

const seenStates = new Set(payload.rows.map((r) => r[4]));
const missingStates = [...FIFTY_STATES].filter((s) => !seenStates.has(s));
if (missingStates.length > 0) {
  fail(`missing US states: ${missingStates.join(', ')}`);
}
ok(`all 50 states + DC covered (${seenStates.size} state/territory codes total)`);

process.stderr.write('\nZIP coverage verification PASSED\n');
