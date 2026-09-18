import { test, expect, Page } from '@playwright/test';

// /drive-time-map isochrone tool. The Valhalla /isochrone call (GET ?json=) is mocked so the
// tests are deterministic offline; a hidden data-testid="dt-state" element exposes the tool's
// state (mode / time / max-time / has-center / loading / error) layout-independently.
//
// The drive page seeds a start on load (autoComputeDefault) — geolocation is granted+pinned in
// the config, so a default drive isochrone fires without any click. The walking page renders the
// same component WITHOUT that prop and must NOT auto-fire. Mobile uses a tap-friendly time PRESET
// ladder (no slider); the desktop panel keeps the fine-grained slider + presets.
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/drive-time-map.spec.ts

interface IsoCall {
  costing: string;
  time: number;
  url: string;
}

// A small diamond isochrone centred on the requested origin, so fitBounds frames around the
// marker (lets us assert the origin ends up in the visible map area, not under the panel).
const isoFeatureCollection = (lat = 38.9072, lon = -77.0369) => {
  const d = 0.03;
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { contour: 30, metric: 'time' },
        geometry: {
          type: 'Polygon',
          coordinates: [[[lon - d, lat], [lon, lat + d], [lon + d, lat], [lon, lat - d], [lon - d, lat]]],
        },
      },
    ],
  };
};

/** Intercept the Valhalla isochrone call, record each request's costing+time, and fulfil it.
 *  opts.status → error path; opts.delayMs → simulate a slow (heavy) isochrone compute. */
async function mockIsochrone(page: Page, opts: { status?: number; delayMs?: number } = {}): Promise<IsoCall[]> {
  const calls: IsoCall[] = [];
  await page.route('**valhalla1.openstreetmap.de/isochrone**', async (route) => {
    const raw = new URL(route.request().url()).searchParams.get('json') || '';
    let costing = '';
    let time = 0;
    let lat: number | undefined;
    let lon: number | undefined;
    try {
      const p = JSON.parse(raw);
      costing = p.costing;
      time = p.contours?.[0]?.time;
      lat = p.locations?.[0]?.lat;
      lon = p.locations?.[0]?.lon;
    } catch {
      /* ignore */
    }
    calls.push({ costing, time, url: route.request().url() });
    if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
    if (opts.status && opts.status >= 400) {
      await route.fulfill({ status: opts.status, contentType: 'application/json', body: JSON.stringify({ error: 'server error' }) });
    } else {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify(isoFeatureCollection(lat, lon)) });
    }
  });
  return calls;
}

const state = (page: Page) => page.getByTestId('dt-state');

async function gotoTool(page: Page) {
  await page.goto('/drive-time-map');
  await expect(page.getByTestId('dt-map')).toBeVisible();
}

/** The drive page auto-seeds a start on load → wait until center is set (no click needed). */
async function waitForSeed(page: Page) {
  await expect(state(page)).toHaveAttribute('data-has-center', '1');
}

/** Fire N rapid slider input events (a synthetic "drag"), React-compatibly, on the visible slider
 *  (desktop panel only — mobile uses preset buttons). */
async function dragSlider(page: Page, values: number[]) {
  await page.evaluate((vals) => {
    const sliders = Array.from(document.querySelectorAll('[data-testid="dt-slider"]')) as HTMLInputElement[];
    const el = sliders.find((s) => s.offsetParent !== null) || sliders[0];
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    for (const v of vals) {
      setter.call(el, String(v));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, values);
}

// A) Default isochrone draws on load — no click. Users see a result, not an empty map.
test('a default drive isochrone is computed on load (drive page)', async ({ page }) => {
  const calls = await mockIsochrone(page);
  await gotoTool(page);

  // Carries the Raptive ad-exclusion root id (fix 1+5).
  await expect(page.getByTestId('dt-tool')).toHaveAttribute('id', 'drive-time-tool');

  // Seeded + a default DRIVE request fired, all without any interaction.
  await waitForSeed(page);
  await expect(state(page)).toHaveAttribute('data-mode', 'auto');
  await expect.poll(() => calls.filter((c) => c.costing === 'auto').length).toBeGreaterThan(0);
  // …and it rendered (no error, spinner cleared, polygon painted).
  await expect(state(page)).toHaveAttribute('data-loading', '0');
  await expect(state(page)).toHaveAttribute('data-error', '');
  await expect(page.locator('.leaflet-overlay-pane path').first()).toBeVisible();
  // The origin (center) marker renders on the map. (Pixel-perfect centering is a real
  // mobile-browser sizing artifact that headless Chromium doesn't reproduce — see device check.)
  await expect(page.locator('.custom-center-marker').first()).toBeVisible();
});

// B) The walking page reuses the component but must NOT auto-compute on load.
test('walking-radius-map does NOT auto-compute an isochrone on load', async ({ page }) => {
  const calls = await mockIsochrone(page);
  await page.goto('/walking-radius-map');
  await expect(page.getByTestId('dt-map')).toBeVisible();

  await page.waitForTimeout(1500); // give any (unwanted) auto-seed time to fire
  expect(calls.length).toBe(0);
  await expect(state(page)).toHaveAttribute('data-has-center', '0');
});

// C) A slow (>8s) isochrone still SUCCEEDS — the raised, cost-scaled timeout no longer aborts
//    valid heavy computes (this exact request would have errored under the old flat 8s timeout).
test('a slow isochrone (>8s) still resolves and renders', async ({ page }) => {
  const calls = await mockIsochrone(page, { delayMs: 9000 }); // 9s: over the old 8s, under the new timeout
  await gotoTool(page);
  await waitForSeed(page);

  await expect.poll(() => calls.length).toBeGreaterThan(0);
  await expect(state(page)).toHaveAttribute('data-loading', '0', { timeout: 20000 }); // must resolve, not abort
  await expect(state(page)).toHaveAttribute('data-error', '');
  await expect(page.locator('.leaflet-overlay-pane path').first()).toBeVisible();
});

// D) The mobile map is tall enough (~74vh) to give the isochrone room above the controls panel.
test('the mobile map is ~74vh tall (room above the panel)', async ({ page }) => {
  await mockIsochrone(page);
  await gotoTool(page);
  const vh = page.viewportSize()!.height;
  const box = await page.getByTestId('dt-map').boundingBox();
  expect(box).not.toBeNull();
  // ~74vh (clearly taller than the old 60vh), with slack for rounding.
  expect(box!.height).toBeGreaterThan(vh * 0.7);
  expect(box!.height).toBeLessThanOrEqual(vh * 0.78);
});

// E) After the default isochrone draws, the origin marker frames into the VISIBLE map area —
//    above the mobile controls panel — instead of being pushed under it (fitBounds bottom-padding).
test('the origin marker frames above the mobile controls panel', async ({ page }) => {
  await mockIsochrone(page);
  await gotoTool(page);
  await waitForSeed(page);
  await expect(state(page)).toHaveAttribute('data-loading', '0');

  const marker = page.locator('.custom-center-marker').first();
  await expect(marker).toBeVisible();
  // The marker's centre must settle ABOVE the panel's top edge → visible, not hidden under the
  // controls. Poll to ride out the fitBounds pan/zoom animation.
  await expect
    .poll(async () => {
      const mBox = await marker.boundingBox();
      const panelBox = await page.getByTestId('dt-mobile-panel').boundingBox();
      if (!mBox || !panelBox) return false;
      return mBox.y + mBox.height / 2 < panelBox.y;
    })
    .toBe(true);
});

// 1) Switching mode re-fetches the isochrone with the new costing — exactly one new request.
test('switching travel mode re-fetches the isochrone with the new costing', async ({ page }) => {
  const calls = await mockIsochrone(page);
  await gotoTool(page);
  await waitForSeed(page);
  await expect.poll(() => calls.filter((c) => c.costing === 'auto').length).toBeGreaterThan(0);

  const pedBefore = calls.filter((c) => c.costing === 'pedestrian').length; // 0 before the switch
  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');

  await expect.poll(() => calls.filter((c) => c.costing === 'pedestrian').length).toBe(pedBefore + 1);
  await page.waitForTimeout(500); // …and it stays one (no double-fire)
  expect(calls.filter((c) => c.costing === 'pedestrian').length).toBe(pedBefore + 1);
});

// 2) Mobile time PRESET ladder: exactly the 5–60 min buttons render (tap-friendly, no slider,
//    no 1.5hr/2hr), every mode caps at 60, and tapping a preset sets the time.
test('mobile time presets are 5-60 min only (no 1.5hr/2hr) for every mode', async ({ page }) => {
  await mockIsochrone(page);
  await gotoTool(page);

  // The ladder is exactly 5/10/15/30/45/60 — the 90 & 120 presets are gone entirely.
  for (const t of [5, 10, 15, 30, 45, 60]) {
    await expect(page.locator(`[data-testid="dt-time-${t}"]:visible`)).toBeVisible();
  }
  await expect(page.locator('[data-testid="dt-time-90"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="dt-time-120"]')).toHaveCount(0);

  // Every mode caps at 60 min.
  for (const m of ['auto', 'pedestrian', 'bicycle'] as const) {
    await page.locator(`[data-testid="dt-mode-${m}"]:visible`).click();
    await expect(state(page)).toHaveAttribute('data-mode', m);
    await expect(state(page)).toHaveAttribute('data-max-time', '60');
  }

  // Tapping the 1hr preset sets the time.
  await page.locator('[data-testid="dt-time-60"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-time', '60');
});

// 3) A server error surfaces a mode-specific, mobile-visible recovery banner (not a generic one).
test('a server error shows a walking-specific recovery banner', async ({ page }) => {
  await mockIsochrone(page, { status: 500 });
  await gotoTool(page);
  await waitForSeed(page); // the auto-seed (drive) already errored; switch to walk for its message

  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');

  const err = page.getByTestId('dt-error');
  await expect(err).toBeVisible();
  await expect(err).toContainText(/walking/i);
  await expect(state(page)).toHaveAttribute('data-error', /walking/i);
});

// Desktop panel keeps the fine-grained slider (+ the preset ladder). These run at a desktop width.
test.describe('desktop panel (slider + presets)', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  // A rapid slider "drag" collapses to ONE request on settle (debounce), not one per step.
  test('dragging the time slider fires exactly one request on settle', async ({ page }) => {
    const calls = await mockIsochrone(page);
    await gotoTool(page);
    await waitForSeed(page);
    await expect.poll(() => calls.length).toBeGreaterThan(0); // the seed request
    await expect(state(page)).toHaveAttribute('data-loading', '0'); // …settled
    const before = calls.length;

    await dragSlider(page, [35, 40, 45, 50, 55, 60]); // six steps within the debounce window
    await page.waitForTimeout(700); // past the 300ms debounce

    expect(calls.length - before).toBe(1); // one request, not six
    await expect(state(page)).toHaveAttribute('data-time', '60');
  });

  // The desktop ladder is 5–60 (no 1.5hr/2hr) and the fine-grained slider caps at 60.
  test('desktop time ladder is 5-60 and the slider caps at 60', async ({ page }) => {
    await mockIsochrone(page);
    await gotoTool(page);

    for (const t of [5, 10, 15, 30, 45, 60]) {
      await expect(page.locator(`[data-testid="dt-time-${t}"]:visible`)).toBeVisible();
    }
    await expect(page.locator('[data-testid="dt-time-90"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="dt-time-120"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="dt-slider"]:visible')).toHaveAttribute('max', '60');
  });
});
