import { test, expect, Page } from '@playwright/test';

// /drive-time-map isochrone tool. The Valhalla /isochrone call (GET ?json=) is mocked so the
// tests are deterministic offline; a hidden data-testid="dt-state" element exposes the tool's
// state (mode / time / max-time / has-center / loading / error) layout-independently.
//
// Gates: mode-switch re-fetches with the new costing; a slider "drag" debounces to ONE request;
// time is capped per mode (Walk ≤ 60, Cycle ≤ 90) with over-limit presets disabled; a server
// error surfaces a mode-specific recovery banner (mobile-visible).
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

/** Intercept the Valhalla isochrone call, record each request's costing+time, and fulfil it
 *  (200 + a minimal polygon FeatureCollection, or `status` when given for the error path). */
async function mockIsochrone(page: Page, opts: { status?: number } = {}): Promise<IsoCall[]> {
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
    if (opts.status && opts.status >= 400) {
      await route.fulfill({ status: opts.status, contentType: 'application/json', body: JSON.stringify({ error: 'server error' }) });
    } else {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify(isoFeatureCollection()) });
    }
  });
  return calls;
}

const state = (page: Page) => page.getByTestId('dt-state');
const visibleSlider = (page: Page) => page.locator('[data-testid="dt-slider"]:visible');

async function gotoTool(page: Page) {
  await page.goto('/drive-time-map');
  await expect(page.getByTestId('dt-map')).toBeVisible();
}

/** Tap the bare map (clear of the top status overlay and the bottom mobile panel) to set a start. */
async function setStart(page: Page) {
  const box = await page.getByTestId('dt-map').boundingBox();
  if (!box) throw new Error('no map box');
  await page.touchscreen.tap(box.x + box.width / 2, box.y + Math.min(120, box.height * 0.28));
  await expect(state(page)).toHaveAttribute('data-has-center', '1');
}

/** Fire N rapid slider input events (a synthetic "drag"), React-compatibly, on the visible slider. */
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

// 1) Switching mode (mobile) re-fetches the isochrone with the new costing. This is the mobile
//    mode-switch regression gate — the buttons drive state and the single effect re-fetches.
test('switching travel mode re-fetches the isochrone with the new costing', async ({ page }) => {
  const calls = await mockIsochrone(page);
  await gotoTool(page);

  // The tool carries the Raptive ad-exclusion root id (fix 1+5) — the missing id was what let
  // the mobile ad overlay intercept mode-button taps. Every other tool root has one.
  await expect(page.getByTestId('dt-tool')).toHaveAttribute('id', 'drive-time-tool');

  await setStart(page);
  // First request uses the default Drive costing.
  await expect.poll(() => calls.filter((c) => c.costing === 'auto').length).toBeGreaterThan(0);
  const pedBefore = calls.filter((c) => c.costing === 'pedestrian').length; // 0 before the switch

  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');

  // Exactly ONE new pedestrian request fires — re-fetch on switch, and no double-fire.
  await expect.poll(() => calls.filter((c) => c.costing === 'pedestrian').length).toBe(pedBefore + 1);
  await page.waitForTimeout(500); // …and it stays one (no delayed second request)
  expect(calls.filter((c) => c.costing === 'pedestrian').length).toBe(pedBefore + 1);
});

// 2) A rapid slider "drag" collapses to ONE request on settle (debounce), not one per step.
test('dragging the time slider fires exactly one request on settle', async ({ page }) => {
  const calls = await mockIsochrone(page);
  await gotoTool(page);

  await setStart(page);
  await expect.poll(() => calls.length).toBeGreaterThan(0); // initial settle
  const before = calls.length;

  await dragSlider(page, [35, 40, 45, 50, 55, 60]); // six steps within the debounce window
  await page.waitForTimeout(700); // past the 300ms debounce

  expect(calls.length - before).toBe(1); // one request, not six
  await expect(state(page)).toHaveAttribute('data-time', '60');
});

// 3) Time is capped per mode and clamps on switch (mobile slider max + value).
test('travel time is capped per mode and clamps when switching down', async ({ page }) => {
  await mockIsochrone(page);
  await gotoTool(page);

  // Drive: max 120.
  await expect(state(page)).toHaveAttribute('data-mode', 'auto');
  await expect(state(page)).toHaveAttribute('data-max-time', '120');
  await expect(visibleSlider(page)).toHaveAttribute('max', '120');

  await dragSlider(page, [120]);
  await expect(state(page)).toHaveAttribute('data-time', '120');

  // Walk: max 60 → the 120 clamps to 60.
  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-max-time', '60');
  await expect(visibleSlider(page)).toHaveAttribute('max', '60');
  await expect(state(page)).toHaveAttribute('data-time', '60');

  // Cycle: max 90 (time stays 60, no clamp up).
  await page.locator('[data-testid="dt-mode-bicycle"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-max-time', '90');
  await expect(visibleSlider(page)).toHaveAttribute('max', '90');
  await expect(state(page)).toHaveAttribute('data-time', '60');
});

// 4) A server error surfaces a mode-specific, mobile-visible recovery banner (not a generic one).
test('a server error shows a walking-specific recovery banner', async ({ page }) => {
  await mockIsochrone(page, { status: 500 });
  await gotoTool(page);

  await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
  await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');
  await setStart(page);

  const err = page.getByTestId('dt-error');
  await expect(err).toBeVisible();
  await expect(err).toContainText(/walking/i);
  await expect(state(page)).toHaveAttribute('data-error', /walking/i);
});

// 5) Desktop presets: over-limit time buttons are disabled per mode (needs the desktop panel).
test.describe('desktop time presets', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('over-limit time presets are disabled per mode', async ({ page }) => {
    await mockIsochrone(page);
    await gotoTool(page);

    // Walk (≤ 60): 90 and 120 disabled, 60 enabled.
    await page.locator('[data-testid="dt-mode-pedestrian"]:visible').click();
    await expect(state(page)).toHaveAttribute('data-mode', 'pedestrian');
    await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-60"]:visible')).toBeEnabled();

    // Cycle (≤ 90): 120 disabled, 90 enabled.
    await page.locator('[data-testid="dt-mode-bicycle"]:visible').click();
    await expect(page.locator('[data-testid="dt-time-120"]:visible')).toBeDisabled();
    await expect(page.locator('[data-testid="dt-time-90"]:visible')).toBeEnabled();
  });
});
