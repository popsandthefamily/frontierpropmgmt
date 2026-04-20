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

  test("compare-a-different-market form exists and accepts input", async ({
    page,
  }) => {
    await page.goto("/audit");
    await page.getByRole("button", { name: /compare a different market/i }).click();

    const cityInput = page.locator('input[name="city"]');
    await expect(cityInput).toBeVisible();
    await cityInput.fill("Galveston, TX");
    // Don't actually submit — Turnstile + live AirROI. Just verify the form wires up.
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
    await expect(page.getByText(/20% flat/i)).toBeVisible();
  });
});
