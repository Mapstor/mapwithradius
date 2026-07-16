import { test, expect, Page } from '@playwright/test';

// Area Calculator mobile gate. Runs at 360×780, 390×844, 834×1194 (all hasTouch).
// Verifies: a drawn triangle's area matches an independent geodesic computation within
// 0.5%; dragging a vertex changes the area; unit switching changes the readout.
//
// Local run: npm i -D @playwright/test && npx playwright install chromium
//            npx playwright test tests/e2e/area-calculator.spec.ts

const EARTH_R = 6371000;
const toRad = (d: number) => (d * Math.PI) / 180;

// Independent geodesic (spherical-excess) area of a ring, in m² — mirrors the app util
// with separate code so a wiring bug (wrong vertices, planar math) would show up.
function sphericalArea(points: Array<[number, number]>): number {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [lat1, lng1] = points[i];
    const [lat2, lng2] = points[(i + 1) % points.length];
    sum += (toRad(lng2) - toRad(lng1)) * (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }
  return Math.abs((sum * EARTH_R * EARTH_R) / 2);
}

async function touchDrag(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
  { steps = 18, delay = 24 }: { steps?: number; delay?: number } = {}
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

async function tap(page: Page, fx: number, fy: number) {
  const s = page.viewportSize()!;
  await page.touchscreen.tap(s.width * fx, s.height * fy);
  await page.waitForTimeout(150);
}

/** Drop a 3-vertex triangle in the upper (map) area, clear of the sheet + zoom control. */
async function drawTriangle(page: Page) {
  await tap(page, 0.5, 0.22);
  await tap(page, 0.3, 0.42);
  await tap(page, 0.7, 0.42);
  await expect(page.getByTestId('area-map')).toHaveAttribute('data-active-vertices', '3');
}

async function activeAreaSqM(page: Page): Promise<number> {
  const v = await page.getByTestId('area-map').getAttribute('data-active-area-sqm');
  return v ? parseFloat(v) : NaN;
}

async function activeLatLngs(page: Page): Promise<Array<[number, number]>> {
  const v = await page.getByTestId('area-map').getAttribute('data-active-latlngs');
  return v ? JSON.parse(v) : [];
}

test.beforeEach(async ({ page }) => {
  await page.goto('/area-calculator');
  await expect(page.getByTestId('area-sheet')).toBeVisible();
});

// 1) A drawn triangle's reported area matches an independent geodesic computation (< 0.5%).
test('triangle area matches the geodesic value within 0.5%', async ({ page }) => {
  await drawTriangle(page);
  const verts = await activeLatLngs(page);
  expect(verts.length).toBe(3);
  const expected = sphericalArea(verts);
  const actual = await activeAreaSqM(page);
  expect(expected).toBeGreaterThan(0);
  expect(Math.abs(actual - expected) / expected).toBeLessThan(0.005);
});

// 2) Dragging a vertex changes the measured area.
test('vertex drag updates the area', async ({ page }) => {
  await drawTriangle(page);
  const before = await activeAreaSqM(page);

  const box = await page.locator('.measure-vertex.active').first().boundingBox();
  expect(box).not.toBeNull();
  const from = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
  await touchDrag(page, from, { x: from.x + 55, y: from.y - 45 });
  await page.waitForTimeout(250);

  const after = await activeAreaSqM(page);
  expect(Math.abs(after - before) / before).toBeGreaterThan(0.02);
});

// 3) Switching the unit changes the readout (acres → m² grows by ~4047×).
test('unit switching changes the readout', async ({ page }) => {
  await drawTriangle(page);
  const acresText = (await page.getByTestId('area-sheet-value').textContent()) ?? '';
  const acres = parseFloat(acresText.replace(/,/g, ''));

  await page.getByTestId('area-unit-cycle').tap(); // acres → sqft (next in order)
  // Open the sheet and pick m² explicitly for a deterministic assertion.
  await page.getByLabel('Drag to expand controls').tap();
  await expect(page.getByTestId('area-sheet')).toHaveAttribute('data-detent', 'mid');
  await page.getByTestId('area-unit-sqm').tap();

  const sqmText = (await page.getByTestId('area-sheet-value').textContent()) ?? '';
  const sqm = parseFloat(sqmText.replace(/,/g, ''));
  expect(sqm).toBeGreaterThan(acres); // m² value is far larger than the acre value
  // 1 acre = 4046.86 m² — sanity that it's a real conversion, not a relabel.
  expect(sqm / acres).toBeGreaterThan(3000);
});
