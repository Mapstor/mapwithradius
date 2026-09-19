import { test, expect, Page } from '@playwright/test';

// /distance-calculator A-to-B distance tool. Nominatim (geocode/autocomplete) and the OSRM road
// route are mocked so the tests are deterministic offline. The tool seeds a default Washington
// DC → New York City measurement on load; Point A / Point B address inputs are the primary way
// to set points; markers use a non-red palette.
//
// To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test tests/e2e/distance-calculator.spec.ts

/** Nominatim geocode + autocomplete → always resolve to Chicago (so a typed edit is observable). */
async function mockNominatim(page: Page) {
  await page.route('**nominatim.openstreetmap.org/**', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([{ lat: '41.8781', lon: '-87.6298', display_name: 'Chicago, IL, USA' }]),
    })
  );
}

/** OSRM driving route → a valid route so the "By road" result renders. */
async function mockOsrm(page: Page) {
  await page.route('**router.project-osrm.org/**', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        code: 'Ok',
        routes: [
          {
            distance: 361_000, // metres (~224 mi)
            duration: 14_400, // seconds (4 hr)
            geometry: { coordinates: [[-77.0369, 38.9072], [-74.006, 40.7128]] },
          },
        ],
      }),
    })
  );
}

async function gotoTool(page: Page) {
  await mockNominatim(page);
  await mockOsrm(page);
  await page.goto('/distance-calculator');
  await expect(page.getByTestId('dc-map')).toBeVisible();
}

const aInput = (page: Page) => page.getByTestId('dc-point-a').locator('input');
const bInput = (page: Page) => page.getByTestId('dc-point-b').locator('input');

/** Parse the miles value out of a "204.3 mi (328 km)" style readout. */
function milesOf(text: string | null): number {
  const m = (text || '').replace(/,/g, '').match(/([\d.]+)\s*mi/);
  return m ? parseFloat(m[1]) : 0;
}

// 1) Opens with a real A→B measurement (DC → NYC), not an empty US map.
test('opens with a default Washington DC → New York City measurement', async ({ page }) => {
  await gotoTool(page);

  await expect(aInput(page)).toHaveValue(/washington/i);
  await expect(bInput(page)).toHaveValue(/new york/i);

  const straight = page.getByTestId('dc-straight');
  await expect(straight).toBeVisible();
  const mi = milesOf(await straight.textContent());
  expect(mi).toBeGreaterThan(190); // DC→NYC ≈ 204 mi straight-line
  expect(mi).toBeLessThan(215);
});

// 2) The Point A / Point B address inputs are the primary way to set points.
test('typing a place in the Point A field updates the measurement', async ({ page }) => {
  await gotoTool(page);
  await expect(page.getByTestId('dc-straight')).toBeVisible(); // seeded DC→NYC

  await aInput(page).fill('Chicago');
  await aInput(page).press('Enter'); // onSubmit → geocode → Point A = Chicago

  await expect(aInput(page)).toHaveValue(/chicago/i);
  // Chicago → NYC (≈ 713 mi) is much farther than DC → NYC (≈ 204 mi).
  await expect
    .poll(async () => milesOf(await page.getByTestId('dc-straight').textContent()))
    .toBeGreaterThan(650);
});

// 3) The Point B marker is NOT red (red reads as error) — it's blue.
test('the Point B marker is not red', async ({ page }) => {
  await gotoTool(page);

  const bMarker = page.locator('[data-point-label="B"]').first();
  await expect(bMarker).toBeVisible();
  const bg = await bMarker.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).not.toBe('rgb(239, 68, 68)'); // not red (#EF4444)
  expect(bg).toBe('rgb(59, 130, 246)'); // blue (#3B82F6)
});

// 4) invalidateSize + ResizeObserver: the map survives a viewport resize and stays functional.
test('the map survives a viewport resize (invalidateSize/ResizeObserver)', async ({ page }) => {
  await gotoTool(page);
  await expect(page.locator('[data-point-label="A"]').first()).toBeVisible();

  await page.setViewportSize({ width: 800, height: 600 });
  await page.waitForTimeout(300); // let the ResizeObserver → invalidateSize run

  await expect(page.getByTestId('dc-map')).toBeVisible();
  await expect(page.locator('[data-point-label="A"]').first()).toBeVisible();
  await expect(page.getByTestId('dc-straight')).toBeVisible();
});
