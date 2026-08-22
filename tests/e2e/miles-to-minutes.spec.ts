import { test, expect, Page } from '@playwright/test';

// /miles-to-minutes calculator. Verifies the distance→time arithmetic (distance ÷ speed,
// rounded), the distance ladder, the speed selector, custom mph, and comma parsing.
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/miles-to-minutes.spec.ts

const minutesFor = (miles: number, mph: number) => Math.round((miles / mph) * 60);

async function stateNum(page: Page, name: string): Promise<number> {
  const v = await page.getByTestId('mtm-state').getAttribute(`data-${name}`);
  return v ? parseFloat(v) : NaN;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/miles-to-minutes');
  await expect(page.getByTestId('mtm-miles-input')).toBeVisible();
});

// 1) Default 10 miles at the city speed gives the published figures.
test('default distance and travel times', async ({ page }) => {
  expect(await stateNum(page, 'miles')).toBe(10);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(10, 25)); // 24
  expect(await stateNum(page, 'city-min')).toBe(24);
  expect(await stateNum(page, 'highway-min')).toBe(9);
  expect(await stateNum(page, 'walk-min')).toBe(200);
});

// 2) The distance ladder updates the arithmetic.
test('preset ladder recomputes minutes', async ({ page }) => {
  await page.getByTestId('mtm-preset-20').tap();
  expect(await stateNum(page, 'miles')).toBe(20);
  expect(await stateNum(page, 'city-min')).toBe(minutesFor(20, 25)); // 48
  expect(await stateNum(page, 'highway-min')).toBe(minutesFor(20, 65)); // 18
  expect(await stateNum(page, 'walk-min')).toBe(minutesFor(20, 3)); // 400
});

// 3) Switching the speed selector changes the active figure.
test('speed selector switches the active speed', async ({ page }) => {
  await page.getByTestId('mtm-speed-highway').tap();
  expect(await stateNum(page, 'active-mph')).toBe(65);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(10, 65)); // 9
});

// 4) A custom speed is applied to the arithmetic.
test('custom mph drives the active figure', async ({ page }) => {
  await page.getByTestId('mtm-preset-20').tap();
  await page.getByTestId('mtm-speed-custom').tap();
  await page.getByTestId('mtm-mph-input').fill('30');
  expect(await stateNum(page, 'active-mph')).toBe(30);
  expect(await stateNum(page, 'active-min')).toBe(minutesFor(20, 30)); // 40
});

// 5) Comma decimals parse like dots.
test('comma decimal parses like a dot', async ({ page }) => {
  await page.getByTestId('mtm-miles-input').fill('12,5');
  expect(await stateNum(page, 'miles')).toBe(12.5);
  expect(await stateNum(page, 'city-min')).toBe(minutesFor(12.5, 25)); // 30
});
