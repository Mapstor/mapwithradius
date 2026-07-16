import { test, expect, Page } from '@playwright/test';

// The 7 mobile touch tests from MOBILE-REDESIGN-SPEC.md §4, run at 360×780, 390×844 and
// 834×1194 (iPad portrait), all hasTouch:true. Test #1 is the bug-1a regression gate.
//
// NOTE: these drive real Leaflet touch interactions via CDP Input.dispatchTouchEvent.
// Coordinates/timings may need light tuning on first local run; the assertions encode the
// spec's acceptance criteria.

// --- helpers -----------------------------------------------------------------

/** Real touch drag through Chromium's input pipeline (drives Leaflet's pointer handlers). */
async function touchDrag(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
  { steps = 16, delay = 24 }: { steps?: number; delay?: number } = {}
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

async function center(page: Page, testid: string) {
  const box = await page.getByTestId(testid).boundingBox();
  if (!box) throw new Error(`no box for ${testid}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** Tap an empty part of the map (above the peek sheet, clear of the zoom control). */
async function tapMap(page: Page, fx = 0.5, fy = 0.32) {
  const size = page.viewportSize()!;
  await page.touchscreen.tap(size.width * fx, size.height * fy);
}

/** Create the first circle by tapping the map, then wait for the fit-to-circle zoom. */
async function createCircle(page: Page, fx = 0.5, fy = 0.32) {
  await tapMap(page, fx, fy);
  await page.locator('.radius-handle.edge').first().waitFor({ state: 'visible' });
  await page.waitForTimeout(900); // fitBounds animation + marker settle
}

async function radiusValue(page: Page): Promise<number> {
  const txt = (await page.getByTestId('mwr-radius-value').textContent()) ?? '';
  return parseFloat(txt.replace(/,/g, ''));
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Sheet is client-only; wait for it to mount at the peek detent.
  await expect(page.getByTestId('mwr-sheet')).toBeVisible();
});

// 1) First touchscreen drag on the edge handle changes the radius (bug-1a regression gate).
test('edge handle resizes on the first touch drag', async ({ page }) => {
  await createCircle(page);
  const before = await radiusValue(page);

  const edge = await page.locator('.radius-handle.edge').first().boundingBox();
  expect(edge).not.toBeNull();
  const from = { x: edge!.x + edge!.width / 2, y: edge!.y + edge!.height / 2 };
  // The north handle sits above the centre; dragging it further up enlarges the radius.
  await touchDrag(page, from, { x: from.x, y: from.y - 80 }, { delay: 12 });
  await page.waitForTimeout(200);

  const after = await radiusValue(page);
  expect(Math.abs(after - before)).toBeGreaterThan(0.2);
});

// 2) A single upward drag from the peek row opens the sheet and snaps to mid.
test('one upward drag opens the sheet to mid', async ({ page }) => {
  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-detent', 'peek');
  const peek = await center(page, 'mwr-peek');
  // Slow, controlled drag (below the 0.55 px/ms fling threshold) → snaps to nearest = mid.
  await touchDrag(page, peek, { x: peek.x, y: peek.y - 260 }, { steps: 20, delay: 30 });
  await page.waitForTimeout(500);
  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-detent', 'mid');
});

// 3) Tap the radius pill → type 7 → Enter → circle radius = 7.
test('radius pill accepts direct numeric entry', async ({ page }) => {
  await createCircle(page);
  await page.getByTestId('mwr-radius-pill').tap();
  const input = page.getByTestId('mwr-radius-input');
  await expect(input).toBeFocused();
  await input.fill('7');
  await input.press('Enter');
  await expect(page.getByTestId('mwr-radius-value')).toHaveText('7.0');
});

// 4) mi/km toggle converts the pill, stats and presets (preserves physical size).
test('mi/km toggle converts every readout', async ({ page }) => {
  await createCircle(page); // 10 mi default
  await expect(page.getByTestId('mwr-radius-value')).toHaveText('10.0');

  await page.getByTestId('mwr-unit-km').tap();
  // 10 mi ≈ 16.09 km
  await expect(page.getByTestId('mwr-radius-value')).toHaveText('16.1');
  // open the body so presets/stats are on screen, then check labels
  const peek = await center(page, 'mwr-peek');
  await touchDrag(page, peek, { x: peek.x, y: peek.y - 260 }, { steps: 20, delay: 30 });
  await expect(page.getByTestId('mwr-preset').first()).toContainText('km');
  await expect(page.getByTestId('mwr-stat-diameter')).toContainText('km');
});

// 5) Nothing overlaps the reserved ad region and the tool section holds CLS ≈ 0.
test('reserved ad slot is fixed height and layout stays stable', async ({ page }) => {
  await page.evaluate(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        const ls = e as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!ls.hadRecentInput) (window as unknown as { __cls: number }).__cls += ls.value ?? 0;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await createCircle(page);
  // Expand + collapse the sheet — the reserved slot must not shift layout.
  const peek = await center(page, 'mwr-peek');
  await touchDrag(page, peek, { x: peek.x, y: peek.y - 260 }, { steps: 20, delay: 30 });
  await page.waitForTimeout(400);

  const ad = await page.locator('#mwr-sheet-ad').boundingBox();
  expect(ad).not.toBeNull();
  expect(ad!.height).toBeGreaterThanOrEqual(110);

  const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls || 0);
  expect(cls).toBeLessThan(0.1);
});

// 6) Search: focus → sheet full → pick a result → circle placed, sheet returns to peek.
test('search flow places a circle and returns the sheet to peek', async ({ page }) => {
  await page.route('**nominatim.openstreetmap.org/**', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([{ lat: '40.7128', lon: '-74.0060', display_name: 'New York, NY, USA' }]),
    })
  );

  await page.getByTestId('mwr-search-btn').tap();
  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-search-open', 'true');
  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-detent', 'full');

  await page.getByTestId('mwr-search-input').fill('New York');
  const result = page.getByText('New York, NY, USA');
  await result.waitFor({ state: 'visible' });
  await result.tap();

  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-search-open', 'false');
  await expect(page.getByTestId('mwr-sheet')).toHaveAttribute('data-detent', 'peek');
  await expect(page.locator('.radius-handle.edge').first()).toBeVisible();
});

// 7) With a second circle added, selecting the first highlights its list row.
test('selecting the first circle highlights its row', async ({ page }) => {
  await createCircle(page, 0.4, 0.3); // circle 1; map tap leaves the sheet at peek

  // The '+ New circle' button lives in the body, so expand the sheet first (fling to full).
  const expand = async () => {
    const peek = await center(page, 'mwr-peek');
    await touchDrag(page, peek, { x: peek.x, y: peek.y - 400 }, { steps: 10, delay: 20 });
    await expect(page.getByTestId('mwr-sheet')).not.toHaveAttribute('data-detent', 'peek');
  };

  await expand();
  await page.getByRole('button', { name: /New circle/ }).tap();
  await tapMap(page, 0.62, 0.4); // circle 2; map-first collapses the sheet back to peek
  await page.waitForTimeout(900);

  await expand(); // re-open to reach the circle list
  const rows = page.getByTestId('mwr-circle-row');
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(1)).toHaveAttribute('data-active', 'true'); // circle 2 active after creation

  // Selecting the first circle's row highlights it (spec asserts the list-row highlight).
  await rows.nth(0).getByRole('button').first().tap();
  await expect(rows.nth(0)).toHaveAttribute('data-active', 'true');
  await expect(rows.nth(1)).toHaveAttribute('data-active', 'false');
});
