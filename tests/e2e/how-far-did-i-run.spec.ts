import { test, expect, Page } from '@playwright/test';

// /how-far-did-i-run route tool. Seeds a fixed point list via ?route= and checks the cumulative
// distance (±0.5% of an independent haversine sum) and the pace math (time = distance × min/mile).
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/how-far-did-i-run.spec.ts

const ROUTE = [
  { lat: 41.8781, lng: -87.6298 },
  { lat: 41.8881, lng: -87.6298 },
  { lat: 41.8881, lng: -87.6198 },
];
const routeParam = ROUTE.map((p) => `${p.lat},${p.lng}`).join(';');

// Independent haversine (miles) — not the app's copy, so this is a real cross-check.
function haversineMi(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
const expectedMi = ROUTE.slice(1).reduce((sum, p, i) => sum + haversineMi(ROUTE[i], p), 0);

async function stateNum(page: Page, name: string): Promise<number> {
  const v = await page.getByTestId('hfdir-state').getAttribute(`data-${name}`);
  return v ? parseFloat(v) : NaN;
}
async function seed(page: Page) {
  await page.goto(`/how-far-did-i-run?route=${routeParam}`);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-points', String(ROUTE.length));
}

// 1) Seeded route → cumulative distance within 0.5%, and default Run pace (10 min/mi) time = dist × 10.
test('route distance within 0.5% + pace math at 10 min/mi', async ({ page }) => {
  await seed(page);
  const dist = await stateNum(page, 'distance-mi');
  expect(Math.abs(dist - expectedMi) / expectedMi).toBeLessThan(0.005);
  expect(await stateNum(page, 'active-pace')).toBe(10); // Run default
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 10));
});

// 2) Pace presets + custom recompute the time from the same distance.
test('pace presets and custom pace recompute time', async ({ page }) => {
  await seed(page);
  const dist = await stateNum(page, 'distance-mi');

  await page.getByTestId('hfdir-pace-walk').tap();
  expect(await stateNum(page, 'active-pace')).toBe(20);
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 20));

  await page.getByTestId('hfdir-pace-cycle').tap();
  expect(await stateNum(page, 'active-pace')).toBe(4);
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 4));

  await page.getByTestId('hfdir-pace-custom').tap();
  await page.getByTestId('hfdir-pace-input').fill('8');
  expect(await stateNum(page, 'active-pace')).toBe(8);
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 8));
});

// 3) Undo removes the last point.
test('undo removes the last point', async ({ page }) => {
  await seed(page);
  await page.getByTestId('hfdir-undo').tap();
  expect(await stateNum(page, 'points')).toBe(ROUTE.length - 1);
});
