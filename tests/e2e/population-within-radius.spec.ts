import { test, expect } from '@playwright/test';

// Population Within a Radius. Runs at the config's mobile viewports (all hasTouch).
// Center is set deterministically via URL params (no Nominatim), so the population is a
// fixed function of the committed 2020 Census ZCTA data — a true known-fixture assertion.
//
// Local run: npm i -D @playwright/test && npx playwright install chromium
//            npx playwright test tests/e2e/population-within-radius.spec.ts

// Chicago Loop. Cumulative population within each ring, computed by the area-overlap method
// (lib/population.ts) over the committed 2020 Census ZCTA data: 1 mi 74,590 · 3 mi 365,664 ·
// 5 mi 793,730. (Re-baselined from the earlier centroid-in-circle values 69,115/392,943/903,250.)
const CENTER = 'lat=41.8781&lng=-87.6298';
const RINGS_URL = `/population-within-radius?${CENTER}&mode=rings`; // pin mode — tool now defaults to custom
const CUSTOM_URL = `/population-within-radius?${CENTER}`; // no mode → custom (the new default)
const EXPECT: Record<number, number> = { 1: 74590, 3: 365664, 5: 793730 };
const TOL = 0.02; // 2% — deterministic, but tolerant of a minor data refresh

async function gotoReady(page: import('@playwright/test').Page, url: string) {
  await page.goto(url);
  await expect(page.getByTestId('population-map')).toHaveAttribute('data-ready', 'true', { timeout: 30_000 });
}

test('rings mode: population within 1/3/5-mile rings matches the Census fixture', async ({ page }) => {
  await gotoReady(page, RINGS_URL);
  const map = page.getByTestId('population-map');
  await expect(map).toHaveAttribute('data-mode', 'rings'); // must not silently depend on the default
  const cum = JSON.parse((await map.getAttribute('data-cumulative')) as string) as Record<string, number>;
  for (const r of [1, 3, 5]) {
    expect(cum[String(r)]).toBeGreaterThan(0);
    expect(Math.abs(cum[String(r)] - EXPECT[r]) / EXPECT[r]).toBeLessThan(TOL);
  }
  expect(cum['5']).toBeGreaterThan(cum['3']);
  expect(cum['3']).toBeGreaterThan(cum['1']);
});

test('rings mode: ring table renders one row per ring', async ({ page }) => {
  await gotoReady(page, RINGS_URL);
  await expect(page.getByTestId('population-map')).toHaveAttribute('data-mode', 'rings');
  await expect(page.getByTestId('ring-table')).toBeVisible();
  for (const r of [1, 3, 5]) {
    await expect(page.getByTestId(`ring-row-${r}`)).toBeVisible();
  }
});

test('rings mode: export CSV downloads the ring table', async ({ page }) => {
  await gotoReady(page, RINGS_URL);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('export-csv').click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/population-rings.*\.csv/);
});

test('custom mode is the default; population within a typed radius matches the fixture', async ({ page }) => {
  await gotoReady(page, CUSTOM_URL);
  const map = page.getByTestId('population-map');
  await expect(map).toHaveAttribute('data-mode', 'custom'); // custom is the P1c default

  // Default radius is 5 mi → population within 5 mi.
  const p5 = Number(await page.getByTestId('single-population').getAttribute('data-raw'));
  expect(Math.abs(p5 - EXPECT[5]) / EXPECT[5]).toBeLessThan(TOL);

  // Set the radius via the input to 3 mi (commit with Enter) → population within 3 mi.
  await page.getByTestId('radius-input').fill('3');
  await page.getByTestId('radius-input').press('Enter');
  await expect
    .poll(
      async () => {
        const v = Number(await page.getByTestId('single-population').getAttribute('data-raw'));
        return Math.abs(v - EXPECT[3]) / EXPECT[3];
      },
      { timeout: 5_000 }
    )
    .toBeLessThan(TOL);
});

// NOTE: no drag-resize smoke test. Per the P1c spec it is added only if it can reuse a
// proven pointer approach from a PASSING suite — this population suite has no pointer test,
// and the marker-drag helper lives in the acre/area specs which are currently failing
// (test-code debt). Drag-resize is covered by the device checklist instead.
