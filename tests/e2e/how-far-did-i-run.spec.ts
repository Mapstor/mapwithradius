import { test, expect, Page } from '@playwright/test';

// /how-far-did-i-run road-snapping route tool. Seeds a fixed point list via ?route= and mocks the
// Valhalla /route call so snapping is deterministic offline. Checks the snapped distance (from the
// mocked response, NOT the haversine), the mode→costing switch, and the straight-line fallback when
// the routing server errors.
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

// Independent haversine (miles) — the straight-line cross-check for the fallback / snap-off paths.
function haversineMi(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
const straightMi = ROUTE.slice(1).reduce((sum, p, i) => sum + haversineMi(ROUTE[i], p), 0);

// Snapped distances the mock returns per costing (arbitrary, ≠ the haversine so we can tell them apart).
const SNAP_PED = 2.0; // pedestrian (run/walk)
const SNAP_BIKE = 2.5; // bicycle (cycle)

async function stateNum(page: Page, name: string): Promise<number> {
  const v = await page.getByTestId('hfdir-state').getAttribute(`data-${name}`);
  return v ? parseFloat(v) : NaN;
}

// Mock the FOSSGIS Valhalla /route call (GET ?json=). Distance depends on the costing in the
// request so the mode switch is observable. 'AAAA' is a valid precision-6 polyline (2 points).
async function mockValhalla(page: Page) {
  await page.route('**valhalla1.openstreetmap.de/route**', async (route) => {
    const json = new URL(route.request().url()).searchParams.get('json') || '';
    const miles = json.includes('"costing":"bicycle"') ? SNAP_BIKE : SNAP_PED;
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        trip: {
          status: 0,
          units: 'miles',
          legs: [{ shape: 'AAAA', summary: { length: miles, time: 600 } }],
          summary: { length: miles, time: 600 },
        },
      }),
    });
  });
}

async function seed(page: Page) {
  await page.goto(`/how-far-did-i-run?route=${routeParam}`);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-points', String(ROUTE.length));
}

// 1) Snapped distance comes from Valhalla (≠ the straight-line haversine), status = snapped.
test('seeded route snaps to Valhalla distance (not haversine)', async ({ page }) => {
  await mockValhalla(page);
  await seed(page);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'snapped');
  expect(await stateNum(page, 'distance-mi')).toBeCloseTo(SNAP_PED, 3);
  // The straight-line total is materially different, proving snapping (not haversine) drove the number.
  expect(Math.abs(SNAP_PED - straightMi)).toBeGreaterThan(0.2);
  await expect(page.getByTestId('hfdir-snap-note')).toContainText(/snapped/i);
});

// 2) Pace math runs off the snapped distance; mode default pace + custom pace override.
test('pace math uses the snapped distance', async ({ page }) => {
  await mockValhalla(page);
  await seed(page);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'snapped');
  const dist = await stateNum(page, 'distance-mi'); // SNAP_PED
  expect(await stateNum(page, 'active-pace')).toBe(10); // Run default
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 10));

  await page.getByTestId('hfdir-pace-input').fill('8');
  expect(await stateNum(page, 'active-pace')).toBe(8);
  expect(await stateNum(page, 'time-min')).toBe(Math.round(dist * 8));
});

// 3) Mode switch Run → Cycle sends costing=bicycle → different snapped distance.
test('mode switch re-snaps with the bicycle profile', async ({ page }) => {
  await mockValhalla(page);
  await seed(page);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'snapped');
  expect(await stateNum(page, 'distance-mi')).toBeCloseTo(SNAP_PED, 3);

  await page.getByTestId('hfdir-mode-cycle').tap();
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-mode', 'cycle');
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-distance-mi', SNAP_BIKE.toFixed(4));
  expect(await stateNum(page, 'active-pace')).toBe(4); // Cycle default pace
});

// 4) Routing error → graceful straight-line fallback (haversine) + a note; the tool never breaks.
test('API error falls back to a straight-line distance', async ({ page }) => {
  await page.route('**valhalla1.openstreetmap.de/route**', (route) =>
    route.fulfill({ status: 500, contentType: 'text/plain', body: 'err' })
  );
  await seed(page);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'error');
  const dist = await stateNum(page, 'distance-mi');
  expect(Math.abs(dist - straightMi) / straightMi).toBeLessThan(0.005); // straight-line haversine
  await expect(page.getByTestId('hfdir-snap-note')).toContainText(/couldn.t snap/i);
});

// 5) Snap toggle off AFTER a snap has landed → reverts to straight-line (distance + note + line).
test('snap toggle off reverts a landed snap to straight-line', async ({ page }) => {
  await mockValhalla(page);
  await seed(page);
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'snapped'); // land the snap first
  await page.getByTestId('hfdir-snap-toggle').uncheck();
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'straight');
  const dist = await stateNum(page, 'distance-mi');
  expect(Math.abs(dist - straightMi) / straightMi).toBeLessThan(0.005); // straight-line, not the snapped value
});

// 6) Switching to a profile whose request fails must fall back to straight-line — never keep the
//    previous mode's snapped distance while the note claims straight-line.
test('mode switch to a failing profile falls back (not the old snapped value)', async ({ page }) => {
  await page.route('**valhalla1.openstreetmap.de/route**', async (route) => {
    const json = new URL(route.request().url()).searchParams.get('json') || '';
    if (json.includes('"costing":"bicycle"')) {
      await route.fulfill({ status: 500, contentType: 'text/plain', body: 'err' });
    } else {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          trip: { status: 0, units: 'miles', legs: [{ shape: 'AAAA', summary: { length: SNAP_PED, time: 600 } }], summary: { length: SNAP_PED, time: 600 } },
        }),
      });
    }
  });
  await seed(page); // Run → pedestrian → snapped SNAP_PED
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'snapped');
  await page.getByTestId('hfdir-mode-cycle').tap();
  await expect(page.getByTestId('hfdir-state')).toHaveAttribute('data-snap-status', 'error');
  const dist = await stateNum(page, 'distance-mi');
  expect(Math.abs(dist - straightMi) / straightMi).toBeLessThan(0.005); // fell back, did NOT keep SNAP_PED
});

// 7) Undo removes the last point.
test('undo removes the last point', async ({ page }) => {
  await mockValhalla(page);
  await seed(page);
  await page.getByTestId('hfdir-undo').tap();
  expect(await stateNum(page, 'points')).toBe(ROUTE.length - 1);
});
