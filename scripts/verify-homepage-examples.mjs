#!/usr/bin/env node
// Regression test for the worked examples on the homepage (and any future
// numbered worked-example sections that follow the same pattern).
//
// Each example block asserts:
//   1. Every place listed as "inside the radius" has a haversine distance
//      ≤ radius from the named anchor.
//   2. Every place listed as "outside" has distance > radius.
//   3. Each inside-place name must appear in the page source within the same
//      paragraph as the "inside" phrase (e.g. "within range" / "covers …").
//   4. Each outside-place name must appear with the "outside" phrase or not
//      appear at all.
//
// Catches the Highlands-Ranch / Baytown class of error where the prose makes
// a confident "X is inside / outside" claim that the haversine math disproves.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PAGE_PATH = resolve(ROOT, 'src', 'app', '(main)', 'page.tsx');

const R_MI = 3958.8;
const R_KM = 6371.0;

function hav(la1, lo1, la2, lo2, R) {
  const t = (x) => (x * Math.PI) / 180;
  const dLa = t(la2 - la1);
  const dLo = t(lo2 - lo1);
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(t(la1)) * Math.cos(t(la2)) * Math.sin(dLo / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const EXAMPLES = [
  {
    label: 'Denver / 1700 Lincoln / 15-mile commute radius',
    anchor: [39.7387, -104.9869], // 1700 Lincoln St, Denver, CO
    radius: 15,
    unit: 'mi',
    // Section to scan: the paragraph that says "set radius to 15 miles …"
    sectionStart: '1700 Lincoln St, Denver, CO',
    sectionEnd: 'inner ring',
    inside: ['Lakewood', 'Aurora', 'Englewood', 'Littleton', 'Westminster', 'Highlands Ranch'],
    outside: ['Parker'],
    coords: {
      Lakewood: [39.7047, -105.0814],
      Aurora: [39.7294, -104.8319],
      Englewood: [39.6478, -104.9877],
      Littleton: [39.6133, -105.0166],
      Westminster: [39.8366, -105.0372],
      'Highlands Ranch': [39.5417, -104.9647],
      Parker: [39.5186, -104.7614],
    },
    insidePhrase: 'within range',
    outsidePhrase: 'just outside',
  },
  {
    label: 'Pasadena, TX / 10-mile evacuation zone',
    anchor: [29.6911, -95.2091], // Pasadena, TX downtown
    radius: 10,
    unit: 'mi',
    sectionStart: 'Pasadena, Texas',
    sectionEnd: 'primary or secondary zone',
    inside: ['Deer Park'],
    outside: ['Baytown'],
    coords: {
      'Deer Park': [29.705, -95.1235],
      Baytown: [29.7355, -94.9774],
      'La Porte': [29.6658, -95.0188], // borderline (~11.6 mi) — not asserted, but available
    },
    insidePhrase: 'covers',
    outsidePhrase: 'outside',
  },
];

const pageSrc = readFileSync(PAGE_PATH, 'utf8');
let fails = 0;
let passed = 0;

for (const ex of EXAMPLES) {
  const R = ex.unit === 'km' ? R_KM : R_MI;
  process.stderr.write(`\n== ${ex.label} ==\n`);

  // Pull the section text for prose-context checks
  const sStart = pageSrc.indexOf(ex.sectionStart);
  if (sStart < 0) {
    process.stderr.write(`FAIL  section start "${ex.sectionStart}" not found in page.tsx\n`);
    fails++;
    continue;
  }
  const sEnd = pageSrc.indexOf(ex.sectionEnd, sStart);
  if (sEnd < 0) {
    process.stderr.write(`FAIL  section end "${ex.sectionEnd}" not found after start\n`);
    fails++;
    continue;
  }
  const section = pageSrc.substring(sStart, sEnd);

  const verifyOnSide = (placeName, declaredSide) => {
    const coords = ex.coords[placeName];
    if (!coords) {
      process.stderr.write(`FAIL  ${placeName}: no coords in script's master table\n`);
      fails++;
      return;
    }
    const d = hav(ex.anchor[0], ex.anchor[1], coords[0], coords[1], R);
    const tol = Math.max(0.5, ex.radius * 0.02);
    const distanceSide = d <= ex.radius ? 'inside' : 'outside';
    const borderline = Math.abs(d - ex.radius) <= tol;

    // (a) geographic check
    if (distanceSide !== declaredSide && !borderline) {
      process.stderr.write(
        `FAIL  ${placeName}: declared ${declaredSide}, distance ${d.toFixed(2)}${ex.unit} → actually ${distanceSide}\n`
      );
      fails++;
      return;
    }

    // (b) prose check — place must appear in the section
    if (!section.includes(placeName)) {
      process.stderr.write(
        `FAIL  ${placeName}: declared ${declaredSide} but not mentioned in section prose\n`
      );
      fails++;
      return;
    }

    // (c) prose-side check — sentence-aware. Find the sentence that mentions
    // the place, then look at which marker phrase appears in that sentence.
    // "X is closest to phrase Y" trips up on places at the boundary of two
    // sentences ("…within range. Parker sits just outside.") so split first.
    const sentences = section.split(/(?<=\.)\s+/);
    let proseSide = 'ambiguous';
    for (const sent of sentences) {
      if (!sent.includes(placeName)) continue;
      const hasInside = sent.includes(ex.insidePhrase);
      const hasOutside = sent.includes(ex.outsidePhrase);
      if (hasInside && !hasOutside) proseSide = 'inside';
      else if (hasOutside && !hasInside) proseSide = 'outside';
      else if (hasInside && hasOutside) proseSide = 'ambiguous';
      else proseSide = 'no-phrase'; // mentioned but with neither phrase
      break;
    }

    if (proseSide !== declaredSide && proseSide !== 'ambiguous') {
      process.stderr.write(
        `FAIL  ${placeName}: prose places it on ${proseSide} side but it should be ${declaredSide}\n`
      );
      fails++;
      return;
    }

    process.stderr.write(
      `ok    ${placeName}: ${declaredSide} (${d.toFixed(2)}${ex.unit}, prose ${proseSide})${borderline ? ' borderline' : ''}\n`
    );
    passed++;
  };

  for (const p of ex.inside) verifyOnSide(p, 'inside');
  for (const p of ex.outside) verifyOnSide(p, 'outside');
}

process.stderr.write(`\nHomepage examples: ${passed} passed, ${fails} failed\n`);
if (fails > 0) {
  process.stderr.write('Homepage example verification FAILED\n');
  process.exit(1);
}
process.stderr.write('Homepage example verification PASSED\n');
