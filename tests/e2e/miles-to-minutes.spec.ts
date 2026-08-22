import { test, expect, Page } from '@playwright/test';

// /miles-to-minutes calculator. Verifies the distance→time arithmetic (distance ÷ speed,
// rounded), the distance ladder (incl. 100 mi), the 25/45/65 mph speed chips, custom speed,
// and comma parsing.
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/miles-to-minutes.spec.ts

const minutesFor = (dist: number, speed: number) => Math.round((dist / speed) * 60);

async function stateNum(page: Page, name: string): Promise<number> {
  const v = await page.getByTestId('mtm-state').getAttribute(`data-${name}`);
  return v ? parseFloat(v) : NaN;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/miles-to-minutes');
  await expect(page.getByTestId('mtm-distance-input')).toBeVisible();
});

// 1) Default: 10 miles at the default 25 mph chip.
test('default distance and speed', async ({ page }) => {
  expect(await stateNum(page, 'distance')).toBe(10);
  expect(await stateNum(page, 'active-speed')).toBe(25);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(10, 25)); // 24
});

// 2) The 65 mph chip gives ~9 minutes for 10 miles.
test('65 mph chip → 10 mi ≈ 9 min', async ({ page }) => {
  await page.getByTestId('mtm-speed-65').tap();
  expect(await stateNum(page, 'active-speed')).toBe(65);
  expect(await stateNum(page, 'active-min')).toBe(9);
});

// 3) A custom speed of 30 mph gives 20 minutes for 10 miles.
test('custom 30 mph → 20 min', async ({ page }) => {
  await page.getByTestId('mtm-speed-custom').tap();
  await page.getByTestId('mtm-speed-input').fill('30');
  expect(await stateNum(page, 'active-speed')).toBe(30);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(10, 30)); // 20
});

// 4) Comma decimals parse in the distance field.
test('comma decimal parses (27,5)', async ({ page }) => {
  await page.getByTestId('mtm-distance-input').fill('27,5');
  expect(await stateNum(page, 'distance')).toBe(27.5);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(27.5, 25)); // 66
});

// 5) The distance ladder includes 100 miles and its math holds.
test('100-mile preset math holds', async ({ page }) => {
  await page.getByTestId('mtm-preset-100').tap();
  expect(await stateNum(page, 'distance')).toBe(100);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(100, 25)); // 240
  await page.getByTestId('mtm-speed-65').tap();
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(100, 65)); // 92
});

// 6) The walking chip switches to walking pace.
test('walking chip uses walking pace', async ({ page }) => {
  await page.getByTestId('mtm-speed-walk').tap();
  expect(await stateNum(page, 'active-speed')).toBe(3);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(10, 3)); // 200
});
