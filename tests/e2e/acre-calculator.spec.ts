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

/** Place the overlay by tapping the map, then wait for it to be drawn + the fit animation.
 *  The dimensions calculator now sits above the map, so scroll the map into view first and
 *  tap its upper-centre — clear of the top-left zoom control and the fixed bottom sheet. */
async function placeOverlay(page: Page) {
  const map = page.getByTestId('acre-overlay');
  await map.scrollIntoViewIfNeeded();
  const box = await map.boundingBox();
  expect(box).not.toBeNull();
  const vp = page.viewportSize()!;
  const x = box!.x + box!.width / 2;
  const y = Math.min(Math.max(box!.y + 90, 90), vp.height * 0.35);
  await page.touchscreen.tap(x, y);
  await expect(map).toHaveAttribute('data-overlay-present', 'true');
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
  // The dimensions calculator now sits above the map, so on short viewports the map can
  // start below the fold. The mobile sheet only mounts while the map is on-screen (by
  // design — it is the map's control surface), so bring the map into view before
  // asserting the sheet is present.
  await page.getByTestId('acre-overlay').scrollIntoViewIfNeeded();
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

// 5) Sheet-scroll regression gate: at FULL detent the last control (Copy link — this sheet
//    has no KML) must scroll fully into view and be clickable (body must not overflow off-screen).
test('full-detent body scrolls to the last control (reachable + clickable)', async ({ page }) => {
  await placeOverlay(page);
  const box = await page.getByTestId('acre-peek').boundingBox();
  expect(box).not.toBeNull();
  const from = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
  // Slow, long drag up → snaps to the nearest detent = full.
  await touchDrag(page, from, { x: from.x, y: 50 }, { steps: 25, delay: 30 });
  await expect(page.getByTestId('acre-sheet')).toHaveAttribute('data-detent', 'full');

  const copy = page.getByRole('button', { name: /Copy link/ });
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toBeInViewport({ ratio: 1 });
  await copy.click({ trial: true });
});

// --- Dimensions calculator: the primary "acre calculator" intent (length × width). ---

test.describe('dimensions calculator', () => {
  // 6) Length × width converts to the correct acreage across units.
  test('length × width computes correct acres', async ({ page }) => {
    const len = page.getByTestId('acre-dims-length');
    const wid = page.getByTestId('acre-dims-width');
    const out = page.getByTestId('acre-dims-acres');

    // 43,560 sq ft is exactly 1 acre.
    await len.fill('43560');
    await wid.fill('1');
    await expect(out).toHaveText('1 acres');
    await expect(page.getByTestId('acre-dims-breakdown')).toContainText('43,560 sq ft');

    // 660 × 660 ft = 435,600 sq ft = 10 acres.
    await len.fill('660');
    await wid.fill('660');
    await expect(out).toHaveText('10 acres');

    // Metres: 100 × 100 m = 10,000 m² = 1 hectare ≈ 2.471 acres.
    await page.getByTestId('acre-dims-unit-m').tap();
    await len.fill('100');
    await wid.fill('100');
    await expect(out).toHaveText('2.471 acres');
  });

  // 7) Empty / non-positive input shows a dash rather than a bogus number.
  test('invalid dimensions show a dash', async ({ page }) => {
    const len = page.getByTestId('acre-dims-length');
    const out = page.getByTestId('acre-dims-acres');
    await len.fill('');
    await expect(out).toHaveText('—');
    await len.fill('200');
    await expect(out).not.toHaveText('—');
  });

  // 8) The "Show N acres on the map" button reflects the computed size onto the overlay.
  test('reflects the computed size onto the map overlay', async ({ page }) => {
    // Default 200 × 300 ft = 60,000 sq ft = 5,574.18 m².
    await page.getByTestId('acre-dims-show').tap();
    const map = page.getByTestId('acre-overlay');
    await expect(map).toHaveAttribute('data-overlay-present', 'true');
    await page.waitForTimeout(900);
    const sqm = await overlayAreaSqM(page);
    const expected = 60000 * 0.09290304; // sq ft → m²
    expect(Math.abs(sqm - expected) / expected).toBeLessThan(0.01);
  });
});

// --- Map interactions: drag-to-resize + on-map labels. ---

test.describe('map interactions', () => {
  // 9) Dragging the resize handle outward grows the acreage.
  test('drag the resize handle changes the acreage', async ({ page }) => {
    await placeOverlay(page);
    const before = await overlayAreaSqM(page);

    const handle = page.locator('.acre-handle.resize');
    await expect(handle).toBeVisible();
    const box = await handle.boundingBox();
    expect(box).not.toBeNull();
    const from = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
    // Pull the NE handle further out (up + right) to grow the square.
    await touchDrag(page, from, { x: from.x + 80, y: from.y - 80 }, { steps: 22, delay: 25 });
    await page.waitForTimeout(300);

    const after = await overlayAreaSqM(page);
    expect(after).toBeGreaterThan(before * 1.15);
  });

  // 10) The on-map area label renders and updates when the size changes.
  test('on-map area label renders and updates', async ({ page }) => {
    await placeOverlay(page);
    const label = page.locator('.acre-area-label');
    await expect(label).toBeVisible();
    await expect(label).toContainText('acre'); // default overlay is ~1 acre

    await openSheet(page);
    await page.locator('[data-testid="acre-preset"][data-value="40"]').tap();
    await expect(label).toContainText('40 acres');
  });
});
