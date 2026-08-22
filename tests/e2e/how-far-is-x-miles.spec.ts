import { test, expect, Page } from '@playwright/test';

// /how-far-is-x-miles comprehension tool. Runs at 360×780, 390×844, 834×1194 (all < 1024px,
// so the mobile control panel is the visible one). Verifies URL-state renders the ring, presets
// resize it, and the drive/walk minutes exactly match the labeled arithmetic (distance ÷ speed).
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/how-far-is-x-miles.spec.ts

const CHICAGO = 'lat=41.8781&lng=-87.6298';

// The canonical arithmetic the page and tool must agree with.
const minutesFor = (miles: number, mph: number) => Math.round((miles / mph) * 60);

/** Read a data-* attribute off the single canonical state element. */
async function stateNum(page: Page, name: string): Promise<number> {
  const v = await page.getByTestId('howfar-state').getAttribute(`data-${name}`);
  return v ? parseFloat(v) : NaN;
}

/** Wait until the ring's drag handles exist (proves the circle rendered). */
async function waitRing(page: Page) {
  await page.waitForSelector('.leaflet-marker-icon.radius-handle.center', { timeout: 20000 });
  await page.waitForSelector('.leaflet-marker-icon.radius-handle.edge', { timeout: 20000 });
}

/** Tap a distance preset in the visible (mobile) panel. */
async function tapPreset(page: Page, value: number) {
  await page.locator('[data-howfar-panel="mobile"]').getByTestId(`howfar-preset-${value}`).tap();
}

function expectTimes(driveCity: number, driveHighway: number, walk: number, miles: number) {
  expect(driveCity).toBe(minutesFor(miles, 25));
  expect(driveHighway).toBe(minutesFor(miles, 65));
  expect(walk).toBe(minutesFor(miles, 3));
}

// 1) URL state (?lat&lng&r=10mi) renders a 10-mile ring and the correct travel times.
test('URL state renders the ring and correct travel times', async ({ page }) => {
  await page.goto(`/how-far-is-x-miles?${CHICAGO}&r=10mi`);
  await waitRing(page);

  expect(await stateNum(page, 'radius-miles')).toBeCloseTo(10, 2);
  const city = await stateNum(page, 'drive-city-min');
  const hwy = await stateNum(page, 'drive-highway-min');
  const walk = await stateNum(page, 'walk-min');
  expectTimes(city, hwy, walk, 10);
  // Sanity on the exact published figures.
  expect(city).toBe(24);
  expect(hwy).toBe(9);
  expect(walk).toBe(200);
});

// 2) Tapping a preset resizes the ring and recomputes the arithmetic.
test('preset updates the distance and the arithmetic', async ({ page }) => {
  await page.goto(`/how-far-is-x-miles?${CHICAGO}&r=10mi`);
  await waitRing(page);

  await tapPreset(page, 5);
  await expect(page.getByTestId('howfar-state')).toHaveAttribute('data-radius-miles', '5.000');
  expectTimes(
    await stateNum(page, 'drive-city-min'),
    await stateNum(page, 'drive-highway-min'),
    await stateNum(page, 'walk-min'),
    5
  );

  await tapPreset(page, 25);
  await expect(page.getByTestId('howfar-state')).toHaveAttribute('data-radius-miles', '25.000');
  expectTimes(
    await stateNum(page, 'drive-city-min'),
    await stateNum(page, 'drive-highway-min'),
    await stateNum(page, 'walk-min'),
    25
  );
});

// 3) The km toggle keeps the numeric distance but recomputes times from the real mileage.
test('km toggle recomputes travel times from real mileage', async ({ page }) => {
  await page.goto(`/how-far-is-x-miles?${CHICAGO}&r=10mi`);
  await waitRing(page);

  await page.locator('[data-howfar-panel="mobile"]').getByTestId('howfar-unit-km').tap();
  // 10 km ≈ 6.214 mi → times computed off the real mileage, not the raw "10".
  const miles = await stateNum(page, 'radius-miles');
  expect(miles).toBeCloseTo(6.214, 2);
  expectTimes(
    await stateNum(page, 'drive-city-min'),
    await stateNum(page, 'drive-highway-min'),
    await stateNum(page, 'walk-min'),
    miles
  );
});
