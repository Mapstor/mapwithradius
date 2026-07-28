/**
 * generate-hero-shots.ts — deterministic SERP hero screenshots of the live tools.
 *
 * WHY: Bing/Google mobile pull a thumbnail from a crawlable content <img>. Our tools
 * are live Leaflet canvases (nothing static to index), so we render each tool in a
 * controlled state and save a real PNG under public/images. Those PNGs get embedded as
 * content <img> + og:image in a later step.
 *
 * HOW TO RUN (on YOUR machine — this needs a real browser + internet for OSM tiles):
 *
 *   1. One-time browser install (Playwright is already in node_modules):
 *        npx playwright install chromium
 *
 *   2. Start the dev server in one terminal:
 *        npm run dev
 *
 *   3. In another terminal, run the generator:
 *        npx tsx scripts/generate-hero-shots.ts
 *
 *      Options (env vars):
 *        HERO_BASE_URL=http://localhost:3000   # dev server origin (default)
 *        HERO_SCALE=2                           # deviceScaleFactor for retina PNGs (default 1 => exact 1600x900)
 *        HERO_ONLY=homepage,area-calculator     # comma list of keys to (re)generate a subset
 *        HERO_HEADED=1                          # watch the browser drive the tools
 *
 * Output: public/images/*.png at 1600x900 (CSS px; multiply by HERO_SCALE for the file).
 *
 * This file is intentionally excluded from tsc/next build (see tsconfig "exclude"),
 * exactly like tests/ and playwright.config.ts — it imports the untyped-in-package.json
 * `playwright` lib and is never bundled into the app.
 */

import { chromium } from 'playwright';
import type { Browser, BrowserContext, Page } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------
const BASE_URL = (process.env.HERO_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const OUT_DIR = resolve(process.cwd(), 'public', 'images');
const SHOT_W = 1600;
const SHOT_H = 900;
const DPR = Number(process.env.HERO_SCALE ?? 1);
// Playwright viewport: width == shot width; height 1200 makes the tools' `lg:h-[75vh]`
// map exactly 900px tall, and >=1024 keeps every tool in its DESKTOP layout (no mobile
// bottom sheet covering the map). forceMapSize() then pins the exact 1600x900 box.
const VIEWPORT = { width: SHOT_W, height: 1200 };

// Real coordinates for each scene. Tweak these if a shot's imagery isn't ideal, then
// re-run with HERO_ONLY=<key>. (lat, lng are WGS84 decimal degrees.)
const PLACES = {
  lasVegas: { lat: 36.1699, lng: -115.1398 }, // homepage — mirrors the SERP-winning visual
  london: { lat: 51.5074, lng: -0.1278 }, // km-radius-map
  dallasZip: '75201', // zip-code-radius — downtown Dallas ZIP (guaranteed in the local DB)
  suburbanGrid: { lat: 33.311, lng: -111.755 }, // acre-calculator — Gilbert, AZ residential grid (APPROVED)
  farmland: { lat: 42.2, lng: -93.45 }, // area-calculator — rural Iowa cropland, well N of Ames (field grid, no industry)
  geofenceZone: { lat: 30.2672, lng: -97.7431 }, // geofence-map — Austin, TX delivery zone
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Shot {
  key: string;
  /** Output filename under public/images. */
  outputName: string;
  /** Route + query. For URL-drivable tools this is the share-state URL; for the two
   *  tools with no URL state it is just the path and `prepare` sets the state. */
  path: string;
  /** CSS selector of the Leaflet map viewport to screenshot. */
  container: string;
  /** Pin browser geolocation (area-calculator centers the map from geolocation). */
  geolocation?: { latitude: number; longitude: number };
  /** Optional interaction to reach the desired state (zip search, polygon draw). */
  prepare?: (page: Page, sel: string, box: () => Promise<Box>) => Promise<void>;
  /** Wait until tiles AND the shape are actually rendered. */
  ready: (page: Page, sel: string) => Promise<void>;
  /**
   * Frame the drawn shape before capture via the dev-only window.__mwrFitActiveShape hook
   * (RadiusMap / AreaMeasureMap). Set on tools whose own load logic leaves the map zoomed
   * in on the center point instead of fitting the shape. `pad` is the margin in px on the
   * left/top/bottom; the right always reserves `reserveRight` px so the controls panel
   * never overlaps the shape. Omit for tools that already frame themselves (zip, acre).
   */
  fit?: { pad?: number; reserveRight?: number };
  /** CSS selectors to hide (display:none) just before the screenshot, e.g. vertex handles. */
  hideForShot?: string[];
  /** Extra settle after framing (fit/zoom animations, canvas paint). */
  settleMs?: number;
  /** Metadata reused by the later embed/sitemap/og steps (single source of truth). */
  meta: { alt: string; caption: string; heroFor: string };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Count of fully-loaded OSM tiles inside the map container. */
async function tileCount(page: Page, sel: string): Promise<number> {
  return page.evaluate((s) => document.querySelectorAll(`${s} img.leaflet-tile-loaded`).length, sel);
}

async function waitForTiles(page: Page, sel: string, min: number, timeout = 25000): Promise<void> {
  await page.waitForFunction(
    ({ s, min }) => document.querySelectorAll(`${s} img.leaflet-tile-loaded`).length >= min,
    { s: sel, min },
    { timeout }
  );
}

/**
 * Confirm the map has actually zoomed in to a close scene (not still at the US-center
 * zoom-4 default). Reads the z of any loaded tile URL (/{z}/{x}/{y}.png). Used by the
 * geolocation-centered area-calculator so we never draw the polygon on the wrong map.
 */
async function waitForTileZoom(page: Page, sel: string, minZoom: number, timeout = 25000): Promise<void> {
  await page.waitForFunction(
    ({ s, minZoom }) => {
      const imgs = Array.from(document.querySelectorAll(`${s} img.leaflet-tile-loaded`)) as HTMLImageElement[];
      return imgs.some((img) => {
        const m = img.src.match(/\/(\d+)\/\d+\/\d+\.png/);
        return m ? Number(m[1]) >= minZoom : false;
      });
    },
    { s: sel, minZoom },
    { timeout }
  );
}

/** Wait until the tile count stops growing (fit/zoom animation finished re-tiling). */
async function waitForTilesStable(page: Page, sel: string, quietMs = 700, timeout = 20000): Promise<void> {
  const start = Date.now();
  let last = -1;
  let stableSince = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const n = await tileCount(page, sel);
    if (n === last) {
      if (Date.now() - stableSince >= quietMs) return;
    } else {
      last = n;
      stableSince = Date.now();
    }
    if (Date.now() - start > timeout) return; // best-effort; don't hang forever
    await sleep(150);
  }
}

/**
 * Force the map viewport to exactly SHOT_W x SHOT_H and make Leaflet re-measure.
 * Guarantees precise dimensions regardless of page padding/max-width, and (for the
 * click-drawn area tool) gives a stable box to compute pixel taps against.
 */
async function forceMapSize(page: Page, sel: string, w: number, h: number): Promise<void> {
  await page.evaluate(
    ({ s, w, h }) => {
      const el = document.querySelector(s) as HTMLElement | null;
      if (!el) return;
      el.style.setProperty('width', `${w}px`, 'important');
      el.style.setProperty('height', `${h}px`, 'important');
      el.style.setProperty('max-width', 'none', 'important');
      // Leaflet (trackResize:true) + the tools' ResizeObserver both call invalidateSize().
      window.dispatchEvent(new Event('resize'));
    },
    { s: sel, w, h }
  );
}

async function boxOf(page: Page, sel: string): Promise<Box> {
  const b = await page.locator(sel).boundingBox();
  if (!b) throw new Error(`No bounding box for ${sel}`);
  return b;
}

/**
 * Frame the drawn shape via the dev-only window.__mwrFitActiveShape hook exposed by
 * RadiusMap / AreaMeasureMap. Deterministic fitBounds to the real shape bounds with
 * asymmetric padding (right reserve keeps the controls panel off the shape).
 */
async function fitActiveShape(page: Page, shot: Shot): Promise<void> {
  const opts = { pad: shot.fit?.pad ?? 70, reserveRight: shot.fit?.reserveRight ?? 360 };
  const ok = await page.evaluate((o) => {
    const w = window as unknown as {
      __mwrFitActiveShape?: (opts?: { pad?: number; reserveRight?: number }) => boolean;
    };
    return typeof w.__mwrFitActiveShape === 'function' ? w.__mwrFitActiveShape(o) : false;
  }, opts);
  if (!ok) {
    throw new Error(
      `__mwrFitActiveShape did not fit a shape for "${shot.key}". The hook is dev-only — make sure the server is \`npm run dev\` (development), not a production build.`
    );
  }
}

// Wait for BOTH of the radius tool's circle handle markers (proves the canvas circle
// exists — the fill itself is on a <canvas>, so there is no SVG path to wait on).
async function waitRadiusReady(page: Page, sel: string): Promise<void> {
  await waitForTiles(page, sel, 10);
  await page.waitForSelector('.leaflet-marker-icon.radius-handle.center', { timeout: 15000 });
  await page.waitForSelector('.leaflet-marker-icon.radius-handle.edge', { timeout: 15000 });
  await waitForTilesStable(page, sel);
}

// ---------------------------------------------------------------------------
// Scene config — one entry per target page
// ---------------------------------------------------------------------------
const SHOTS: Shot[] = [
  {
    key: 'homepage',
    outputName: 'radius-map-10-mile-las-vegas.png',
    path: `/?lat=${PLACES.lasVegas.lat}&lng=${PLACES.lasVegas.lng}&r=10mi&color=4285f4`,
    container: '#radius-tool .leaflet-container',
    ready: waitRadiusReady,
    // Flagship shot: a bit more breathing room so surrounding city labels read (CalcMaps-style).
    fit: { pad: 100 },
    settleMs: 600,
    meta: {
      heroFor: '/',
      alt: '10 mile radius circle drawn around Las Vegas with the free radius map tool',
      caption: 'A 10-mile radius drawn around Las Vegas, NV using the radius map tool above.',
    },
  },
  {
    key: 'km-radius-map',
    outputName: 'km-radius-map-10-km-london.png',
    path: `/km-radius-map?lat=${PLACES.london.lat}&lng=${PLACES.london.lng}&r=10km&color=4285f4`,
    container: '#radius-tool .leaflet-container',
    ready: waitRadiusReady,
    fit: { pad: 85 }, // frame the 10 km ring with the Thames + central London visible
    settleMs: 600,
    meta: {
      heroFor: '/km-radius-map',
      alt: '10 kilometer radius circle drawn around central London on the km radius map',
      caption: 'A 10-kilometer radius centered on London, drawn with the km radius map tool above.',
    },
  },
  {
    key: 'zip-code-radius',
    outputName: 'zip-code-radius-map-dallas.png',
    path: '/zip-code-radius',
    container: '.leaflet-container',
    // No URL state — search a Dallas ZIP so the circle + purple ZIP pins render.
    prepare: async (page, _sel) => {
      // Wait for the local ZIP database to finish loading (the "N ZIPs across …" line
      // renders only after it does; the Search button is disabled until then).
      await page.getByText(/ZIPs across/i).first().waitFor({ timeout: 30000 });
      await page.locator('input[placeholder="e.g., 10001"]').fill(PLACES.dallasZip);
      await page.getByRole('button', { name: 'Search', exact: true }).first().click();
    },
    ready: async (page, sel) => {
      await waitForTiles(page, sel, 8);
      await page.waitForSelector('path.leaflet-interactive', { timeout: 15000 }); // SVG circle
      await page.waitForFunction(() => document.querySelectorAll('.custom-zip-marker').length >= 5, undefined, {
        timeout: 15000,
      });
      await waitForTilesStable(page, sel); // fitBounds re-tiles after the search
    },
    settleMs: 500,
    meta: {
      heroFor: '/zip-code-radius',
      alt: 'ZIP codes within a 10 mile radius of Dallas shown as pins inside the radius circle',
      caption: 'Every ZIP code within 10 miles of downtown Dallas, mapped with the ZIP code radius tool above.',
    },
  },
  {
    key: 'acre-calculator',
    outputName: '5-acre-lot-overlay-suburban.png',
    path: `/acre-calculator?lat=${PLACES.suburbanGrid.lat}&lng=${PLACES.suburbanGrid.lng}&a=5ac&sh=square`,
    container: '[data-testid="acre-overlay"]',
    ready: async (page, sel) => {
      await waitForTiles(page, sel, 10);
      await page.waitForSelector('[data-testid="acre-overlay"][data-overlay-present="true"]', { timeout: 15000 });
      await page.waitForSelector('.leaflet-marker-icon.acre-handle', { timeout: 15000 });
      await waitForTilesStable(page, sel); // fitToOverlay zooms to ~17-18 then re-tiles
    },
    settleMs: 600,
    meta: {
      heroFor: '/acre-calculator',
      alt: '5 acre square overlay placed over a suburban street grid to show how big 5 acres is',
      caption: 'A 5-acre square overlaid on a suburban lot grid — sized to scale with the acre calculator above.',
    },
  },
  {
    key: 'area-calculator',
    outputName: 'area-calculator-farmland-polygon.png',
    path: '/area-calculator',
    container: '[data-testid="area-map"]',
    // No URL state and no exposed map handle: pin geolocation to the farmland so the map
    // auto-centers there (setView zoom 16), then click-draw the field polygon.
    geolocation: { latitude: PLACES.farmland.lat, longitude: PLACES.farmland.lng },
    prepare: async (page, sel) => {
      // The geolocation callback runs setView([farm], 16); wait until we're actually
      // zoomed in there before computing pixel taps.
      await waitForTileZoom(page, sel, 14, 30000);
      await waitForTilesStable(page, sel);
      await sleep(400);
      const box = await boxOf(page, sel);
      // Fractional taps of the 1600x900 map box — all kept left of the right controls
      // panel (~x>0.78) and clear of the top-left zoom control.
      const verts: Array<[number, number]> = [
        [0.30, 0.30],
        [0.55, 0.24],
        [0.72, 0.42],
        [0.64, 0.66],
        [0.40, 0.70],
        [0.24, 0.50],
      ];
      for (const [fx, fy] of verts) {
        await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
        await sleep(160);
      }
      // Ground-truth: the container publishes vertex count + area on every add.
      await page.waitForFunction(
        ({ s, n }) => {
          const el = document.querySelector(s) as HTMLElement | null;
          return !!el && el.getAttribute('data-active-vertices') === String(n) && Number(el.dataset.activeAreaSqm) > 0;
        },
        { s: sel, n: verts.length },
        { timeout: 10000 }
      );
    },
    ready: async (page, sel) => {
      await waitForTiles(page, sel, 10);
      await page.waitForSelector('.leaflet-marker-icon.measure-vertex', { timeout: 15000 });
      await waitForTilesStable(page, sel);
    },
    fit: { pad: 70 }, // fit the field polygon (drawn at zoom 16, then zoomed out to frame it)
    hideForShot: ['.measure-vertex'], // drop the vertex-handle clutter for a clean field shot
    settleMs: 500,
    meta: {
      heroFor: '/area-calculator',
      alt: 'Irregular polygon drawn over farmland with the measured acreage shown by the area calculator',
      caption: 'Measuring a field by tracing its edges — the area calculator above reports the acres and square feet.',
    },
  },
  {
    key: 'population-within-radius',
    outputName: 'population-within-radius-chicago-rings.png',
    // Chicago Loop — 1/3/5-mile rings render from URL lat/lng; the map auto-fits the 5-mi ring.
    // mode=rings is explicit now that the tool defaults to custom single-radius (P1c).
    path: '/population-within-radius?lat=41.8781&lng=-87.6298&mode=rings',
    container: '[data-testid="population-map"]',
    ready: async (page, sel) => {
      await waitForTiles(page, sel, 8);
      await page.waitForSelector('[data-testid="population-map"][data-ready="true"]', { timeout: 20000 });
      await page.waitForSelector('path.leaflet-interactive', { timeout: 15000 }); // the ring circles (SVG)
      await waitForTilesStable(page, sel);
    },
    settleMs: 500,
    meta: {
      heroFor: '/population-within-radius',
      alt: 'Estimated population within 1, 3, and 5 mile rings around downtown Chicago',
      caption:
        'Estimated population within 1, 3, and 5 miles of downtown Chicago — the standard site-selection rings.',
    },
  },
  {
    key: 'geofence-map',
    outputName: 'geofence-map-delivery-zone-austin.png',
    path: `/geofence-map?lat=${PLACES.geofenceZone.lat}&lng=${PLACES.geofenceZone.lng}&r=5km&color=e11d48`,
    container: '#radius-tool .leaflet-container',
    ready: waitRadiusReady,
    fit: { pad: 85 }, // frame the 5 km ring with the downtown Austin grid visible
    settleMs: 600,
    meta: {
      heroFor: '/geofence-map',
      alt: 'A 5 kilometer circular geofence zone drawn around Austin on the geofence map tool',
      caption: 'A 5-km geofence zone around Austin, TX — draw and label service areas with the geofence map above.',
    },
  },
];

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------
async function preflight(): Promise<void> {
  try {
    const res = await fetch(BASE_URL, { method: 'HEAD' });
    if (!res.ok && res.status >= 500) throw new Error(`status ${res.status}`);
  } catch (e) {
    throw new Error(
      `Dev server not reachable at ${BASE_URL}. Start it with \`npm run dev\` (or set HERO_BASE_URL). Cause: ${
        (e as Error).message
      }`
    );
  }
}

async function captureShot(browser: Browser, shot: Shot): Promise<void> {
  const context: BrowserContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
    geolocation: shot.geolocation,
    permissions: shot.geolocation ? ['geolocation'] : [],
  });
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    // The map is a dynamic (ssr:false) import — wait for the Leaflet root to attach.
    await page.waitForSelector(shot.container, { timeout: 30000 });
    await forceMapSize(page, shot.container, SHOT_W, SHOT_H);
    await sleep(300); // let invalidateSize + first re-tile kick off

    if (shot.prepare) await shot.prepare(page, shot.container, () => boxOf(page, shot.container));
    await shot.ready(page, shot.container);

    // Frame the shape (after the tool's own load logic has settled, so it can't re-fit
    // back over us), then let the new zoom's tiles load.
    if (shot.fit) {
      await fitActiveShape(page, shot);
      await waitForTiles(page, shot.container, 8);
      await waitForTilesStable(page, shot.container);
    }
    // Hide clutter (e.g. polygon vertex handles) right before the shot.
    if (shot.hideForShot?.length) {
      await page.addStyleTag({ content: shot.hideForShot.map((s) => `${s}{display:none !important}`).join('\n') });
    }
    await sleep(shot.settleMs ?? 700);

    const outPath = join(OUT_DIR, shot.outputName);
    await page.locator(shot.container).screenshot({ path: outPath });
    // eslint-disable-next-line no-console
    console.log(`  ✓ ${shot.key.padEnd(18)} → public/images/${shot.outputName}`);
  } finally {
    await context.close();
  }
}

async function main(): Promise<void> {
  const only = (process.env.HERO_ONLY ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const shots = only.length ? SHOTS.filter((s) => only.includes(s.key)) : SHOTS;
  if (only.length && shots.length !== only.length) {
    const known = SHOTS.map((s) => s.key).join(', ');
    throw new Error(`HERO_ONLY had unknown keys. Valid keys: ${known}`);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  await preflight();

  // eslint-disable-next-line no-console
  console.log(`\nGenerating ${shots.length} hero shot(s) at ${SHOT_W}x${SHOT_H} (DPR ${DPR}) from ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: process.env.HERO_HEADED !== '1' });
  const failures: string[] = [];
  try {
    for (const shot of shots) {
      try {
        await captureShot(browser, shot);
      } catch (e) {
        failures.push(shot.key);
        // eslint-disable-next-line no-console
        console.error(`  ✗ ${shot.key.padEnd(18)} FAILED: ${(e as Error).message}`);
      }
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    // eslint-disable-next-line no-console
    console.error(`\nDone with ${failures.length} failure(s): ${failures.join(', ')}. Re-run with HERO_ONLY=${failures.join(',')} after checking the dev server.\n`);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(`\nAll shots saved to public/images. Review them, then I'll wire the embeds + sitemap + og:image.\n`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
