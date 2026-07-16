import { test, expect, Page } from '@playwright/test';

// Acre Calculator mobile gate. Runs at 360×780, 390×844, 834×1194 (all hasTouch), same
// pinned geolocation as the radius sheet tests. Verifies the true-scale overlay, preset
// updates, unit conversion, and that the bottom sheet opens.
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/acre-calculator.spec.ts

const SQM_PER_ACRE = 4046.86;

/** Real touch drag through Chromium's input pipeline. */
async function touchDrag(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
  { steps = 20, delay = 30 }: { steps?: number; delay?: number } = {}
) {
  const client = await page.context().newCDPSession(page);
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: from.x, y: from.y }] });
  for (let i = 1; i <= steps; i++) {
    const x = from.x + ((to.x - from.x) * i) / steps;
    const y = from.y + ((to.y - from.y) * i) / steps;
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
    if (delay) await page.waitForTimeout(delay);
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await client.detach();
}

/** Tap an empty part of the map, well above the peek sheet and clear of the zoom control. */
async function tapMap(page: Page, fx = 0.5, fy = 0.3) {
  const size = page.viewportSize()!;
  await page.touchscreen.tap(size.width * fx, size.height * fy);
}

/** Place the overlay by tapping the map, then wait for it to be drawn + the fit animation. */
async function placeOverlay(page: Page) {
  await tapMap(page);
  await expect(page.getByTestId('acre-overlay')).toHaveAttribute('data-overlay-present', 'true');
  await page.waitForTimeout(900);
}

/** The rendered geodesic area of the overlay, in square metres. */
async function overlayAreaSqM(page: Page): Promise<number> {
  const v = await page.getByTestId('acre-overlay').getAttribute('data-overlay-area-sqm');
  return v ? parseFloat(v) : NaN;
}

/** The numeric value shown in the peek pill. */
async function pillValue(page: Page): Promise<number> {
  const t = (await page.getByTestId('acre-value').textContent()) ?? '';
  return parseFloat(t.replace(/,/g, ''));
}

/** Expand the sheet from peek to mid by tapping the grab zone. */
async function openSheet(page: Page) {
  await page.getByLabel('Drag to expand controls').tap();
  await expect(page.getByTestId('acre-sheet')).toHaveAttribute('data-detent', 'mid');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/acre-calculator');
  await expect(page.getByTestId('acre-sheet')).toBeVisible();
});

// 1) The overlay is drawn at true scale — default 1 acre within 0.5% of 4,046.86 m².
test('overlay renders at correct scale (1 acre)', async ({ page }) => {
  await placeOverlay(page);
  const sqm = await overlayAreaSqM(page);
  expect(Math.abs(sqm - SQM_PER_ACRE) / SQM_PER_ACRE).toBeLessThan(0.005);
});

// 2) Tapping a preset resizes the overlay to true scale and updates the readout.
test('preset tap updates the overlay to 40 acres', async ({ page }) => {
  await placeOverlay(page);
  await openSheet(page);
  await page.locator('[data-testid="acre-preset"][data-value="40"]').tap();

  await expect(page.getByTestId('acre-value')).toHaveText('40');
  const expected = 40 * SQM_PER_ACRE;
  const sqm = await overlayAreaSqM(page);
  expect(Math.abs(sqm - expected) / expected).toBeLessThan(0.005);
});

// 3) Switching units converts the value and preserves the physical area (within 0.5%).
test('unit conversion is correct (acres → hectares)', async ({ page }) => {
  await placeOverlay(page);
  expect(await pillValue(page)).toBeCloseTo(1, 2);
  const before = await overlayAreaSqM(page);

  await page.getByTestId('acre-unit-hectares').tap();

  // 1 acre = 0.4047 hectares (rounded to 0.405 for display).
  expect(await pillValue(page)).toBeCloseTo(0.405, 2);
  const after = await overlayAreaSqM(page);
  expect(Math.abs(after - before) / before).toBeLessThan(0.005);
});

// 4) A single upward drag from the peek row opens the sheet to mid.
test('mobile sheet opens with one upward drag', async ({ page }) => {
  await expect(page.getByTestId('acre-sheet')).toHaveAttribute('data-detent', 'peek');
  const box = await page.getByTestId('acre-peek').boundingBox();
  expect(box).not.toBeNull();
  const from = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
  await touchDrag(page, from, { x: from.x, y: from.y - 260 }, { steps: 20, delay: 30 });
  await page.waitForTimeout(500);
  await expect(page.getByTestId('acre-sheet')).toHaveAttribute('data-detent', 'mid');
});
