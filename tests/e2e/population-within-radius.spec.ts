import { test, expect } from '@playwright/test';

// Population Within a Radius. Runs at the config's mobile viewports (all hasTouch).
// Center is set deterministically via URL params (no Nominatim), so the population is a
// fixed function of the committed 2020 Census ZCTA data — a true known-fixture assertion.
//
// Local run: npm i -D @playwright/test && npx playwright install chromium
//            npx playwright test tests/e2e/population-within-radius.spec.ts

// Chicago Loop. Expected cumulative population within each ring, computed directly from
// public/data/us-zip-points.json (2020 Census ZCTA sums): 1 mi 69,115 · 3 mi 392,943 · 5 mi 903,250.
const FIXTURE = '/population-within-radius?lat=41.8781&lng=-87.6298';
const EXPECT: Record<number, number> = { 1: 69115, 3: 392943, 5: 903250 };
const TOL = 0.02; // 2% — deterministic, but tolerant of a minor data refresh

async function gotoReady(page: import('@playwright/test').Page) {
  await page.goto(FIXTURE);
  await expect(page.getByTestId('population-map')).toHaveAttribute('data-ready', 'true', { timeout: 30_000 });
}

test('population within 1/3/5-mile rings matches the Census fixture', async ({ page }) => {
  await gotoReady(page);
  const cumJson = await page.getByTestId('population-map').getAttribute('data-cumulative');
  expect(cumJson).toBeTruthy();
  const cum = JSON.parse(cumJson as string) as Record<string, number>;

  for (const r of [1, 3, 5]) {
    const val = cum[String(r)];
    expect(val).toBeGreaterThan(0);
    expect(Math.abs(val - EXPECT[r]) / EXPECT[r]).toBeLessThan(TOL);
  }
  // Cumulative circles must be monotonically increasing.
  expect(cum['5']).toBeGreaterThan(cum['3']);
  expect(cum['3']).toBeGreaterThan(cum['1']);
});

test('ring table renders one row per ring', async ({ page }) => {
  await gotoReady(page);
  await expect(page.getByTestId('ring-table')).toBeVisible();
  for (const r of [1, 3, 5]) {
    await expect(page.getByTestId(`ring-row-${r}`)).toBeVisible();
  }
});

test('export CSV downloads the ring table', async ({ page }) => {
  await gotoReady(page);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('export-csv').click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/population-rings.*\.csv/);
});
