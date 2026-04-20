import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests for the audit funnel.
 *
 * Runs against the live production URL by default so we catch real
 * deploy regressions (AirROI auth, Redis, Resend). Override with:
 *   BASE_URL=http://localhost:3000 npx playwright test
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.BASE_URL || "https://rentwithfrontier.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
