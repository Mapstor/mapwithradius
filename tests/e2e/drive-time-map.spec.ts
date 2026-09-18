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

const isoFeatureCollection = () => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { contour: 30, metric: 'time' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[-77.05, 38.90], [-77.03, 38.92], [-77.01, 38.90], [-77.03, 38.88], [-77.05, 38.90]]],
      },
    },
  ],
});

/** Intercept the Valhalla isochrone call, record each request's costing+time, and fulfil it.
 *  opts.status → error path; opts.delayMs → simulate a slow (heavy) isochrone compute. */
async function mockIsochrone(page: Page, opts: { status?: number; delayMs?: number } = {}): Promise<IsoCall[]> {
  const calls: IsoCall[] = [];
  await page.route('**valhalla1.openstreetmap.de/isochrone**', async (route) => {
    const raw = new URL(route.request().url()).searchParams.get('json') || '';
    let costing = '';
    let time = 0;
    try {
      const p = JSON.parse(raw);
      costing = p.costing;
      time = p.contours?.[0]?.time;
    } catch {
      /* ignore */
    }
    calls.push({ costing, time, url: route.request().url() });
    if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
    if (opts.status && opts.status >= 400) {
      await route.fulfill({ status: opts.status, contentType: 'application/json', body: JSON.stringify({ error: 'server error' }) });
    } else {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify(isoFeatureCollection()) });
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

// 2) Mobile time PRESET ladder: all 8 presets render (tap-friendly, no slider), respect per-mode
//    caps (Walk & Cycle max 60 → 90 and 120 disabled), a preset sets the time, and switching mode
//    clamps the time down. This is the mobile-presets + cycle-cap-60 gate.
test('mobile time presets render, respect per-mode caps (cycle 60), and clamp on switch', async ({ page }) => {
  await mockIsochrone(page);
  await gotoTool(page);

  // All 8 presets render on mobile (2-row ladder, no slider).
  for (const t of [5, 10, 15, 30, 45, 60, 90, 120]) {
    await expect(page.locator(`[data-testid="dt-time-${t}"]:visible`)).toBeVisible();
  }

  // Drive: max 120 — every preset enabled; tapping the 2hr preset sets the time.
  await expect(state(page)).toHaveAttribute('data-mode', 'auto');
  await expect(state(page)).toHaveAttribute('data-max-time', '120');
  await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeEnabled();
  await page.locator('[data-testid="dt-time-120"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-time', '120');

  // Walk: max 60 — 90 & 120 disabled; the 120 clamps down to 60.
  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-max-time', '60');
  await expect(state(page)).toHaveAttribute('data-time', '60');
  await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeDisabled();
  await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
  await expect(page.locator('[data-testid="dt-time-60"]:visible')).toBeEnabled();

  // Cycle: also max 60 now (lowered from 90 for free-server reliability) — 90 & 120 disabled.
  await page.locator('[data-testid="dt-mode-bicycle"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-max-time', '60');
  await expect(state(page)).toHaveAttribute('data-time', '60');
  await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeDisabled();
  await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
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

  // Over-cap time presets are disabled per mode (Walk & Cycle both cap at 60).
  test('over-cap time presets are disabled per mode', async ({ page }) => {
    await mockIsochrone(page);
    await gotoTool(page);

    // Walk (≤ 60): 90 and 120 disabled, 60 enabled.
    await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
    await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');
    await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-60"]:visible')).toBeEnabled();

    // Cycle (≤ 60 now): 90 and 120 disabled, 60 enabled.
    await page.locator('[data-testid="dt-mode-bicycle"]:visible').click();
    await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-60"]:visible')).toBeEnabled();
  });
});
