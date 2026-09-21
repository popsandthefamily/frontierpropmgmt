import { expect, test, type Page } from "@playwright/test";

/**
 * Two-service launch coverage: routes, metadata, intent routing, the form,
 * and the technical SEO surfaces.
 *
 * Form submissions are mocked at the network layer so no test ever reaches
 * the real Formspree endpoint. Delivery to the inbox is verified once,
 * manually, with a clearly labelled test inquiry (see the status doc).
 */

const FORMSPREE = /formspree\.io/;

/**
 * Third-party widgets (Hospitable search, Cal.com, Google tag, Turnstile)
 * are not under test and a slow CDN must not turn into a page-load timeout,
 * so every request that leaves the site under test is aborted.
 */
test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL ?? "http://localhost:3000").host;
  await page.route("**/*", (route) => {
    const host = new URL(route.request().url()).host;
    if (host === origin || FORMSPREE.test(host)) return route.continue();
    return route.abort();
  });
});

async function canonicalOf(page: Page): Promise<string | null> {
  return page.locator('link[rel="canonical"]').getAttribute("href");
}

/**
 * The real gtag bootstrap in the root layout defines a global `gtag` that
 * pushes into `dataLayer`, so events are read from there rather than from
 * a stub that the bootstrap would overwrite.
 */
async function captureAnalytics(page: Page): Promise<void> {
  await page.addInitScript(() => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  });
}

async function readAnalytics(page: Page): Promise<unknown[][]> {
  return page.evaluate(() =>
    ((window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? []).map((entry) =>
      Array.from(entry),
    ),
  );
}

async function jsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.map((text) => JSON.parse(text) as Record<string, unknown>);
}

test.describe("homepage", () => {
  test("shows both services and keeps the guest path", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(/property management and home care/i);
    await expect(page.getByRole("link", { name: /manage my rental/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore Home Care", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: /which kind of owner are you/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /browse all cabins/i })).toBeVisible();
    expect(await canonicalOf(page)).toBe("https://www.rentwithfrontier.com");
  });

  test("works at phone width without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Explore Home Care", exact: true })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});

test.describe("home care concierge page", () => {
  test("renders with its own metadata, price, and boundaries", async ({ page }) => {
    const response = await page.goto("/home-care-concierge");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Broken Bow Home Care Concierge | Frontier");
    await expect(page.locator("h1")).toContainText(/home care concierge/i);
    expect(await canonicalOf(page)).toBe("https://www.rentwithfrontier.com/home-care-concierge");

    const body = page.locator("body");
    await expect(body).toContainText(/from \$500/i);
    await expect(body).toContainText(/one scheduled monthly care cycle/i);
    await expect(body).toContainText(/turnovers.*quoted separately/i);
    await expect(body).toContainText(/does my home have to be rented/i);
    await expect(body).toContainText(/illustrative example, not a customer report/i);
    // No listing or revenue requirement anywhere on the private-home path.
    await expect(body).not.toContainText(/run my free listing audit/i);
  });

  test("service schema matches the visible offer and shares the business id", async ({ page }) => {
    await page.goto("/home-care-concierge");
    const blocks = await jsonLd(page);
    const service = blocks.find((b) => b["@type"] === "Service") as
      | { offers?: { priceSpecification?: { minPrice?: number } }; provider?: { "@id"?: string } }
      | undefined;
    expect(service).toBeTruthy();
    expect(service?.offers?.priceSpecification?.minPrice).toBe(500);
    expect(service?.provider?.["@id"]).toBe("https://www.rentwithfrontier.com/#business");
    const business = blocks.find((b) => b["@type"] === "LocalBusiness") as { "@id"?: string } | undefined;
    expect(business?.["@id"]).toBe("https://www.rentwithfrontier.com/#business");
  });

  test("primary CTA carries concierge intent to the contact form", async ({ page }) => {
    await page.goto("/home-care-concierge");
    const cta = page.getByRole("link", { name: /request a property walkthrough/i }).first();
    await expect(cta).toHaveAttribute("href", "/contact?type=concierge#inquiry");
  });
});

test.describe("pricing", () => {
  test("states both services with consistent boundaries", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page).toHaveTitle("STR Management & Home Care Pricing | Frontier");
    const body = page.locator("body");
    await expect(body).toContainText(/20% of net rental revenue/i);
    await expect(body).toContainText(/from \$500/i);
    await expect(body).toContainText(/one scheduled maintenance clean in the base scope/i);
    await expect(body).toContainText(/additional turnovers quoted separately/i);
    // The old "no monthly minimum on either plan" claim must not survive.
    await expect(body).not.toContainText(/no monthly minimum on either/i);
  });
});

test.describe("contact intent routing", () => {
  test("concierge deep link opens the owner form with concierge selected", async ({ page }) => {
    await page.goto("/contact?type=concierge#inquiry");
    // The Cal.com embed renders its own h1, so scope to the page hero.
    await expect(page.locator("h1").first()).toContainText(/property walkthrough/i);
    const service = page.locator("#contact-service");
    await expect(service).toHaveValue("concierge");
    await expect(page.locator("#contact-cabin")).toHaveCount(0);
    expect(await canonicalOf(page)).toBe("https://www.rentwithfrontier.com/contact");

    await page.reload();
    await expect(page.locator("#contact-service")).toHaveValue("concierge");
  });

  test("management deep link stays distinct", async ({ page }) => {
    await page.goto("/contact?type=management");
    await expect(page.locator("#contact-service")).toHaveValue("management");
  });

  test("guest deep link opens the guest form", async ({ page }) => {
    await page.goto("/contact?type=guest");
    await expect(page.locator("#contact-cabin")).toBeVisible();
    await expect(page.locator("#contact-service")).toHaveCount(0);
  });

  test("invalid type falls back safely and is never reflected", async ({ page }) => {
    const evil = "<img src=x onerror=alert(1)>";
    await page.goto(`/contact?type=${encodeURIComponent(evil)}`);
    await expect(page.locator("#contact-service")).toHaveValue("");
    // Next.js serialises the URL into its router-state script with angle
    // brackets escaped, which is fine. What must never happen is the raw
    // value reaching the markup.
    const html = await page.content();
    expect(html).not.toContain("<img src=x");
    expect(await page.locator("img[onerror]").count()).toBe(0);
    await expect(page.locator("h1").first()).toContainText(/talk about your property/i);
  });
});

test.describe("contact form submission", () => {
  test("success carries service context and fires one lead event", async ({ page }) => {
    const sent: Record<string, string>[] = [];
    await page.route(FORMSPREE, async (route) => {
      const body = route.request().postData() ?? "";
      const fields: Record<string, string> = {};
      // multipart body: pull the simple text fields out of it
      for (const match of body.matchAll(/name="([^"]+)"\r?\n\r?\n([^\r\n]*)/g)) {
        fields[match[1]] = match[2];
      }
      sent.push(fields);
      await route.fulfill({ status: 200, contentType: "application/json", body: "{\"ok\":true}" });
    });

    await captureAnalytics(page);

    await page.goto("/contact?type=concierge");
    await page.fill("#contact-name", "Playwright Test");
    await page.fill("#contact-email", "test@example.com");
    await page.selectOption("#contact-property-use", "private");
    await page.getByLabel(/hot-tub attention/i).check();
    await page.fill("#contact-message", "Automated test, please ignore.");
    await page.getByRole("button", { name: /send my property details/i }).click();

    // The Cal.com embed lower on the page has its own role="status" while
    // it loads, so filter to the form's confirmation.
    await expect(page.getByRole("status").filter({ hasText: /thank you/i })).toBeVisible();
    expect(sent).toHaveLength(1);
    expect(sent[0].service_interest).toBe("concierge");
    expect(sent[0].property_use).toBe("private");
    expect(sent[0].form_type).toBe("Owner Inquiry");
    expect(sent[0]._subject).toMatch(/home care concierge/i);
    expect(sent[0].requested_services).toContain("hot-tub");

    const events = await readAnalytics(page);
    const leads = events.filter((e) => e[0] === "event" && e[1] === "generate_lead");
    expect(leads).toHaveLength(1);
    const leadParams = leads[0][2] as Record<string, unknown>;
    expect(leadParams.service_interest).toBe("concierge");
    expect(JSON.stringify(leadParams)).not.toContain("test@example.com");
    expect(JSON.stringify(leadParams)).not.toContain("Playwright Test");
    expect(events.filter((e) => e[1] === "form_start")).toHaveLength(1);
  });

  test("endpoint failure shows an error, keeps input, and fires no lead", async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: "nope" }));
    await captureAnalytics(page);

    await page.goto("/contact?type=management");
    await page.fill("#contact-name", "Playwright Test");
    await page.fill("#contact-email", "test@example.com");
    await page.fill("#contact-message", "Automated failure test.");
    await page.getByRole("button", { name: /send my property details/i }).click();

    // Next.js adds an empty route-announcer alert; filter to the banner.
    await expect(page.getByRole("alert").filter({ hasText: /was not sent/i })).toBeVisible();
    await expect(page.locator("#contact-message")).toHaveValue("Automated failure test.");
    const events = await readAnalytics(page);
    expect(events.filter((e) => e[1] === "generate_lead")).toHaveLength(0);
  });

  test("owner form requires a service choice with a readable error", async ({ page }) => {
    await page.goto("/contact");
    await page.fill("#contact-name", "Playwright Test");
    await page.fill("#contact-email", "test@example.com");
    await page.getByRole("button", { name: /send my property details/i }).click();
    await expect(page.locator("#contact-service-error")).toContainText(/which service/i);
    await expect(page.locator("#contact-service")).toHaveAttribute("aria-invalid", "true");
  });
});

test.describe("technical seo", () => {
  test("sitemap lists the concierge page on the www host and no private routes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("https://www.rentwithfrontier.com/home-care-concierge");
    expect(xml).not.toContain("<loc>https://rentwithfrontier.com");
    expect(xml).not.toMatch(/\/portal|\/admin|\/sign\/|\/api\/|\/audit\/result|\?type=/);
    // Drafts never reach the sitemap.
    expect(xml).not.toContain("what-second-home-care-includes-broken-bow");
  });

  test("robots points at the www sitemap and keeps private routes out", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const text = await res.text();
    expect(text).toContain("Sitemap: https://www.rentwithfrontier.com/sitemap.xml");
    expect(text).toContain("Disallow: /portal/");
    expect(text).toContain("Disallow: /admin/");
  });

  test("co-host still redirects permanently to local services", async ({ request }) => {
    const res = await request.get("/co-host", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toMatch(/\/local-services$/);
  });

  test("nested pages canonicalise to themselves and titles carry one brand suffix", async ({ page }) => {
    for (const [path, title] of [
      ["/local-services", "STR Cleaning & Local Support in Broken Bow | Frontier"],
      ["/management-services", "Broken Bow STR Management | Frontier"],
      ["/contact", "Discuss Your Broken Bow Property | Frontier"],
    ] as const) {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
      expect(await canonicalOf(page)).toBe(`https://www.rentwithfrontier.com${path}`);
    }
  });

  test("no public page renders the brand suffix twice", async ({ page }) => {
    // The root layout applies a "%s | Frontier" template, so any child page
    // whose own title already ends in the brand renders it twice. Pages that
    // need the brand inside the title use `title.absolute`.
    const paths = [
      "/",
      "/home-care-concierge",
      "/pricing",
      "/management-services",
      "/local-services",
      "/contact",
      "/faq",
      "/about",
      "/audit",
      "/blogs",
      "/hochatown-property-management",
      "/broken-bow-property-management",
      "/dallas-cabin-owners",
      "/airbnb-management-hochatown-ok",
      "/best-hochatown-property-management-company",
      "/broken-bow-cabin-management-fees",
      "/switch-property-managers-broken-bow",
    ];
    for (const path of paths) {
      await page.goto(path);
      const title = await page.title();
      expect(title, `${path} repeats the brand suffix`).not.toMatch(
        /\|\s*Frontier(\s+Property\s+Management)?\s*\|\s*Frontier/i,
      );
      expect(title.length, `${path} has no title`).toBeGreaterThan(10);
    }
  });

  test("every page states one management fee base", async ({ page }) => {
    // The owner-confirmed base is "net rental revenue" and it lives in
    // plans.manager. The management page once carried a second, conflicting
    // base on its own pricing card, so this walks the pages that quote the
    // fee and fails on any wording that is not the confirmed one.
    const paths = [
      "/",
      "/pricing",
      "/management-services",
      "/about",
      "/faq",
      "/hochatown-property-management",
      "/broken-bow-property-management",
      "/dallas-cabin-owners",
      "/airbnb-management-hochatown-ok",
      "/best-hochatown-property-management-company",
      "/broken-bow-cabin-management-fees",
      "/switch-property-managers-broken-bow",
    ];
    for (const path of paths) {
      await page.goto(path);
      const html = await page.content();
      expect(html, `${path} uses a retired fee base`).not.toMatch(
        /nightly[- ]rental revenue|net rental income/i,
      );
      if (/\b20%/.test(html)) {
        expect(html, `${path} quotes 20% without the confirmed base`).toMatch(
          /net rental revenue/i,
        );
      }
    }
  });

  test("llms.txt describes the concierge service consistently", async ({ request }) => {
    const text = await (await request.get("/llms.txt")).text();
    expect(text).toContain("Home Care Concierge");
    expect(text).toContain("from $500 per month");
    expect(text).toContain("https://www.rentwithfrontier.com/home-care-concierge");
  });

  test("draft articles are not served", async ({ request }) => {
    const res = await request.get("/blogs/what-second-home-care-includes-broken-bow");
    expect(res.status()).toBe(404);
  });
});
