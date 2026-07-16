import { defineConfig } from '@playwright/test';

// Phase 2 mobile touch tests. NOT wired into package.json (respects "no dependency
// changes"). To run locally:
//   npm i -D @playwright/test && npx playwright install chromium
//   npx playwright test                    # all viewports
//   npx playwright test -g "edge handle"   # just the bug-1a regression gate (test #1)
//
// The webServer block boots `npm run dev` automatically. Geolocation is granted + pinned
// so the map has a deterministic center; Nominatim is mocked per-test where search is used.

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 12_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    geolocation: { latitude: 39.8283, longitude: -98.5795 },
    permissions: ['geolocation'],
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: '360x780',
      use: { browserName: 'chromium', viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
    {
      name: '390x844',
      use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 },
    },
    {
      // iPad portrait — a touch device that stays on the sheet UI (< 1024px split).
      name: '834x1194',
      use: { browserName: 'chromium', viewport: { width: 834, height: 1194 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
  ],
});
