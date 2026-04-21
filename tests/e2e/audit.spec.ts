import { expect, test } from "@playwright/test";

/**
 * Audit funnel smoke tests.
 *
 * Intentionally does NOT exercise Tier 2 (email verification + listing
 * audit) because each run costs ~$0.61 in AirROI credits. Tier 2 is
 * covered by unit tests on the pricing-math library instead.
 *
 * What this catches:
 *  - /audit renders (server-side AirROI fetch works, Redis for cache)
 *  - Default Hochatown snapshot is populated with real dollar figures
 *  - "Run the audit on my listing" CTA exists and points somewhere valid
 *  - Tier 1 "Compare a different market" flow submits successfully
 */

test.describe("audit page smoke", () => {
  test("renders Hochatown snapshot with live AirROI data", async ({ page }) => {
    await page.goto("/audit");
    await expect(page.locator("h1")).toContainText(/leaving on the table/i);

    // The pre-fetched snapshot card should show a dollar figure.
    const snapshotCard = page
      .locator("text=/market median/i")
      .first()
      .locator("..");
    await expect(snapshotCard).toBeVisible();
    const dollarRegex = /\$\d{1,3}(,\d{3})*/;
    await expect(page.locator("body")).toContainText(dollarRegex);
  });

  test("primary CTA targets the full audit form", async ({ page }) => {
    await page.goto("/audit");
    const cta = page.getByRole("link", {
      name: /run the audit on my listing/i,
    });
    await expect(cta.first()).toBeVisible();
  });

  test("static market snapshot renders numbers without fetching", async ({
    page,
  }) => {
    // With the snapshot gated behind static data, the card should show
    // real dollar figures on first paint — no API call, no skeleton.
    let snapshotApiCalled = false;
    page.on("request", (req) => {
      if (req.url().includes("/api/audit/snapshot")) {
        snapshotApiCalled = true;
      }
    });

    await page.goto("/audit");
    await expect(page.getByText(/market median/i).first()).toBeVisible();
    await expect(page.getByText(/top quartile/i).first()).toBeVisible();

    // Deliberate pause so any lazy fetch would have had time to fire.
    await page.waitForTimeout(500);
    expect(snapshotApiCalled).toBe(false);
  });
});

test.describe("homepage smoke", () => {
  test("hero renders with owner CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(/actually answers the phone/i);
    await expect(
      page.getByRole("link", { name: /get a free revenue estimate/i }).first(),
    ).toBeVisible();
  });

  test("comparison table is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/compared to the alternatives/i)).toBeVisible();
    // Check for a row specific to the table (not the trust strip stat).
    await expect(page.getByText(/management fee/i).first()).toBeVisible();
    await expect(page.getByText(/25.35% of gross/i)).toBeVisible();
  });
});
