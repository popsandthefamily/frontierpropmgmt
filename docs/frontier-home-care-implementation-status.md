# Home Care Concierge: implementation status

Branch: `feat/home-care-concierge` (off `main` at `fe7709a`, merged with
`origin/main` at `3f633d3`).
Work dates: 2026-09-19 to 2026-09-21. Preview builds verified on Vercel;
merged to `main` for production on 2026-09-21 at the owner's request.
The release gates below were not individually signed off before launch;
they remain open items to reconcile on the live site.

This file records what was done for the two-service website update, the
decisions that were made along the way, what was tested and how, and the
items that still need the owner before production.

## Phase 0: preflight

Inventory of what was found before any change:

| Area | Finding |
| --- | --- |
| Package manager | Both `package-lock.json` and `pnpm-lock.yaml` exist and were last touched on the same day. `node_modules/.package-lock.json` is present, so npm produced the local install. npm was used for every command below. Neither lockfile was regenerated. |
| Canonical host | Production (Vercel) redirects `https://rentwithfrontier.com/*` to `https://www.rentwithfrontier.com/*` with a 307. Every canonical, sitemap URL, robots host, schema URL, and llms link in the repo said the non-www form. The rendered `<link rel="canonical">` on the live pricing page confirmed the mismatch. |
| `/co-host` | `next.config.ts` has a permanent redirect to `/local-services`; production returns 308. Left as is. |
| llms | Generated routes exist at `src/app/llms.txt/route.ts` and `src/app/llms-full.txt/route.ts`, both built from `src/data`. Production serves `/llms.txt` with 200. There is no `public/llms.txt`, and none is needed. |
| Title template | Root layout applies `%s \| Frontier`. Local Services, Pricing, FAQ, and three guide pages set a child title that already ended in `\| Frontier` or `\| Frontier Property Management`, producing a doubled suffix. |
| Sitemap | Every static entry used `new Date()` as `lastModified`. |
| Robots | Private routes `/portal/` and `/sign/` were not disallowed. All of them already carry `robots: { index: false }` metadata and real auth. The comment about Google-Extended said it governs AI Overviews, which is not what Google documents. |
| Schema | Root entity was `RealEstateAgent` with no `@id`; service pages each declared their own `LocalBusiness` or `RealEstateAgent` provider. The offer catalog contained a "best rate guaranteed" service description. `areaServed` included Dallas-Fort Worth. |
| Contact form | Single Formspree endpoint. Defaulted to the guest tab. No service intent field. |
| Management fee wording | `plans.manager` said net rental income. The management page's pricing card said "of nightly-rental revenue" and "Calculated on nightly rate (plus any extra-guest or premium-stay fees)". Resolved 2026-09-21: see decision 3. |
| Support-hour promises | "24/7 guest messaging" (services data, locality pages, Dallas page), "7am-10pm" (management page, twice), "9am–9pm, on-call after" (comparison data), "< 15min average response time" (management page), "20-min average" maintenance response (comparison data), "at your cabin in 20 minutes" (old homepage). |
| Tests | One Playwright spec (`audit.spec.ts`) that runs against production by default and costs AirROI credits on Tier 2. No local `webServer` in the config. |
| Environment | `.env.local` has Supabase and Resend keys. No AirROI or Redis keys, so the audit page's live paths are not exercisable locally. |

## Phase 1: offer data, homepage, navigation

Done.

- `src/data/site.ts`: `siteConfig.url` is now `https://www.rentwithfrontier.com`; new descriptor and tagline; `plans.concierge` added with `basePrice: 500`; `plans.local` renamed to "STR Cleaning & Local Support" (route unchanged) with a `shortName`. Existing plan keys (`manager`, `local`) are preserved; the portal statement page still reads `plans.manager` unchanged.
- `src/data/home-care.ts` (new): the single source for the concierge offer. Audiences, the STR note, the six scope blocks with their boundaries, exclusions, pricing notes, onboarding steps, the illustrative sample report, the ten FAQs, the management-vs-concierge comparison rows, the contact-intent allowlist, and the CTA contract. Proposed limits live in `HOME_CARE_LIMITS` and are labelled PROPOSED in the file.
- Homepage rebuilt in place: two-service hero with "Manage My Rental" and "Explore Home Care" and a quiet "Book a cabin" link; two-ways cards; "Which kind of owner are you?"; trust ledger and team block without the unverified 20-minute claim; "What care looks like"; a management block that keeps the listing audit and the market snapshot with an honest "as of" label; three-step how-it-works; owner FAQ mixing both services; final CTA offering walkthrough or management; compact guest booking section with the Hospitable widget retained.
- The national-operator comparison table moved from the homepage to the management page. The flagship case study is no longer on the homepage; it remains on the management page.
- Header "For Owners" menu reordered: Full-Service STR Management, Home Care Concierge, Compare Services & Pricing, STR Cleaning & Local Support, then FAQ, locality pages, Dallas, and the audit. Global CTA is "Talk About Your Property" to `/contact?type=owner#inquiry` on desktop and mobile. "Book a Cabin" remains as the ghost link. Footer descriptor and quick links updated; the pre-footer band now leads with the owner CTA and keeps the guest link.

## Phase 2: concierge page and supporting pages

Done.

- `/home-care-concierge` (new, server-rendered): hero, price band with the qualifier beside the price, "Your home does not have to be a rental" with three audience cards, six scope blocks each stating a boundary, "Keep your bookings" with the STR note and the turnover caveat, an illustrative sample report labelled as such, the shared package component, four-step onboarding, the ten FAQs, and a final CTA. Service schema references the root business `@id` and encodes `minPrice: 500` with the same qualifier text that is visible.
- `/pricing`: management and concierge headline cards; fee definitions; a management-vs-concierge table with the rows the brief asked for (who manages bookings, guest communication, pricing/listings, cleaning frequency, property checks, hot-tub scope, exterior work, reporting, extra work, monthly minimum, contract); the shared package block; the STR local-support option beneath the comparison as a custom-quoted supporting offer. The sentence "no monthly minimum on either plan" is gone; the page now says management has no minimum because it is a share of income, and the concierge plan fee is billed for scheduled work.
- `/local-services`: retitled "STR Cleaning & Local Support", same URL. Added a "Turnovers on a calendar, or one monthly care cycle?" section explaining the relationship to concierge; "usually inside two weeks" removed from the how-it-works lead; CTAs use the local-support intent. An FAQ entry explaining the difference from concierge was added to `LOCAL_SERVICES_FAQ`. The old two-column pricing rows were removed from `local-services.ts` and replaced by `SERVICE_COMPARISON_ROWS` in `home-care.ts`.
- `/management-services`: absolute title, canonical, and CTA updated; hero secondary keeps the audit; the national-operator comparison table added; a "Not renting?" cross-link block added. The pricing card's fee-base wording was left exactly as it was (see release gates).
- `/faq`: the plans group rewritten around the services, the retired "anything cheaper than these two plans" answer replaced, a "Home Care Concierge" group added from `HOME_CARE_FAQ`, and the "cabin earns nothing" answer extended to cover the concierge plan fee.
- `/about`: a "One local team, two services" section; the "Why choose" card that promised hands-off management now describes both services; Organization schema shares the root `@id`.
- **Hot-tub partner (owner-confirmed 2026-09-19).** Broken Bow Hot Tub Co. (`https://www.brokenbowhottub.com`) performs all hot-tub cleaning, service, and repair. Defined once in `partners.hotTub` in `site.ts` with the logo at `public/images/partners/broken-bow-hot-tub-co.webp` (fetched from the partner site). A shared `HotTubPartner` component renders a co-branded credit with logo and link wherever hot-tub work is described: concierge page (card), homepage care section, the shared package block on pricing, local services, management pass-through section, about page (card), and the footer. The scope block, comparison row, FAQ answer, Hot-Tub Program add-on, and both llms files name the partner.
- **Navigation regrouped (owner request 2026-09-19).** For Owners holds only the four service pages; FAQ, locality pages, Dallas, the audit, and the guide sit under a new About menu. The desktop CTA cluster is Owner Login, a divider, "Book a Cabin" as an outline pill, and the primary pill.
- Locality pages and `/dallas-cabin-owners`: each gets one `ConciergeCrossLink` block with page-specific copy. The Dallas copy states that Dallas is where owners live and Broken Bow is where the work happens.
- `src/data/blog-posts.ts`: `draft` flag added and honoured by `getBlogPosts` and `getBlogPostBySlug`. Two draft articles are in the file and are excluded from listings, static params, the sitemap, and the llms files. Direct requests to their slugs return 404.

## Phase 3: inquiry flow and analytics

Done.

- `/contact` reads `?type=` on the server, validates it against the allowlist in `home-care.ts`, falls back to `owner` for anything else, and never renders the raw value. Hero and form copy vary by intent. The form section has `id="inquiry"`, the discovery-call embed keeps `id="discovery"` so every existing `/contact#discovery` link still lands. Canonical is always the clean `/contact`.
- `ContactFormTabbed`: owner tab is now the default. Owner fields: service interest (required, with "not sure"), property use, phone (optional), town/area, bedrooms and approximate size (optional), hot tub, requested-services checkboxes, timing, notes. Guest tab retains dates and cabin. Payload adds `service_interest`, `property_use`, `requested_services`, `source_page`, and allowlisted `utm_*` values, plus a `_subject` so the Formspree notification states the intent. Length limits and value allowlists on every field. Honeypot preserved. Errors are associated with fields through `aria-describedby`; the failure banner is a `role="alert"` and input is not cleared.
- The inline form on the management page sends `service_interest=management` and the matching subject.
- Analytics: `service_select`, `form_start` (once per form session), `generate_lead` (only after Formspree returns 2xx), `contact_click` (phone and email links on the contact page), `schedule_call_click` (fired alongside the existing `discovery_call_cta_clicked` so historical reports keep working), and `home_care_page_viewed`. The Cal.com `bookingSuccessful` callback already fires `discovery_call_booked`; that is the only confirmed-appointment event. No names, emails, phone numbers, or free text go to analytics. No lead value is sent.
- No server-side handler was added: the provider is Formspree, whose spam filtering and field validation are account settings, not code. See the checklist.

## Phase 4: technical SEO

Done.

- Canonical host standardised on `https://www.rentwithfrontier.com` everywhere in `src` (45 hardcoded occurrences replaced, including email templates and social-post link text). `next.config.ts` image remote patterns accept both hosts. No application-level redirect was added because Vercel already performs the apex-to-www redirect; adding one would risk a loop.
- Root layout: no root-level canonical, so nested pages cannot inherit the homepage URL; every public page declares its own. Root default title and description updated.
- Doubled brand suffixes: the first pass fixed only the pages being edited for the launch (homepage, pricing, management, local services, contact, concierge). A production check on 2026-09-21 found five pages still rendering `| Frontier | Frontier`: `/faq`, `/airbnb-management-hochatown-ok`, `/best-hochatown-property-management-company`, `/broken-bow-cabin-management-fees`, and `/switch-property-managers-broken-bow`. All five now use `title.absolute`, and `home-care.spec.ts` has a regression test that walks 17 public routes and fails if any title repeats the brand.
- Structured data: one `LocalBusiness` entity with `@id` `https://www.rentwithfrontier.com/#business` (replacing `RealEstateAgent`, which implies a brokerage), `legalName`, an offer catalog with management, concierge (`minPrice: 500`), local support, and direct bookings without the "best rate guaranteed" text. `areaServed` no longer lists Dallas-Fort Worth. `WebSite` has an `@id` and `publisher`. The management, concierge, and local-support Service nodes each reference the business `@id` instead of declaring their own provider. Pricing page uses an `ItemList` of Offers tied to the same `@id`. FAQPage markup that already existed was left alone; none was added to the new page.
- Sitemap: reads the host from `siteConfig`; static pages carry hand-maintained `lastModified` dates seeded from each route's last content commit (or today's date for pages changed in this work); blog entries use their publish date; drafts excluded; `changeFrequency` and `priority` dropped.
- Robots: sitemap and host on www; `/portal/` and `/sign/` added to the disallow list (they already have noindex and auth); the Google-Extended comment corrected. The crawler allow-list itself is unchanged.
- llms.txt and llms-full.txt: describe both primary services and the supporting offer from the shared data, including the concierge scope, exclusions, STR note, and notes telling answer engines not to describe the plan as unlimited or as covering turnovers.

## Phase 5: QA

### Commands run

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Clean. |
| `npm run lint` | 0 errors in `src/` and `tests/`. The 6 errors and the bulk of the 1,574 warnings reported by the repo-wide run are inside the vendored `public/pdf.worker.min.mjs`, which is unchanged. Three pre-existing unused-import warnings remain in `src/app/blogs/[slug]/page.tsx` and `src/components/audit/report-view.tsx`. |
| `npm run build` | Succeeds. `/home-care-concierge` prerenders statically. `/contact` is now server-rendered on demand because it reads `searchParams`. |
| `PW_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" BASE_URL=http://localhost:3100 npx playwright test` | 24 passed, 0 failed (19 in the new `home-care.spec.ts`, 5 in `audit.spec.ts`), against `next start` on port 3100 from the production build. |

### Test results

Full suite: **24 passed, 0 failed**, run against the local production build (`npm run build` then `PORT=3100 npm start`).

Notes on the run:

- Playwright's own Chromium download stalled twice from the Playwright CDN on this machine. `playwright.config.ts` gained an optional `PW_EXECUTABLE_PATH` override so the suite can run in an installed Chrome (Google Chrome 153 was used). Without the variable, the config is unchanged apart from the default `baseURL` now being the www host.
- Two homepage smoke tests in the pre-existing `audit.spec.ts` were updated. One ("hero renders with owner CTA") asserted a heading string that does not exist on `main` either, so it was already failing before this work. The other ("comparison table is present") looked for the national-operator table on the homepage; that table was deliberately moved to `/management-services`, and the test now looks there. The three audit-page tests were not touched and pass locally because the market snapshot is static data.
- Both specs now abort requests that leave the site under test (Hospitable search widget, Cal.com, Google tag, Turnstile). Those widgets are not what the tests check, and on this connection a slow CDN was turning into page-load timeouts. Formspree remains routable because it is mocked in place.
- Screenshots at 1280px and 375px of the homepage, concierge page, pricing page, and the concierge-intent contact page are in `docs/screenshots/home-care-2026-09-19/`.

### What the new spec covers

`tests/e2e/home-care.spec.ts`: homepage shows both services and the guest path; no horizontal scroll at 375px; concierge page status, title, canonical, price, boundaries, sample-report label, and absence of a listing-audit requirement; service schema `minPrice` and shared business `@id`; concierge CTA href; pricing consistency and the removal of the old "no monthly minimum on either" claim; contact deep links for concierge, management, and guest, including reload; an invalid `type` value with script content falls back to the owner form and is not reflected; a mocked successful submission carries `service_interest`, `property_use`, `requested_services`, `form_type`, and `_subject`, fires exactly one `generate_lead` with no personal data, and one `form_start`; a mocked 500 shows the alert, keeps the message text, and fires no lead; the required service choice error; sitemap contents and host; robots sitemap and disallow lines; `/co-host` 308; nested canonicals and single brand suffix on three pages; llms.txt content; draft article slugs return 404.

Formspree is mocked with `page.route`; no test contacts the real endpoint.

### Not tested here

- Real delivery of a form to the Frontier inbox. This needs an owner-authorised, clearly labelled test submission against the live endpoint after deploy, then a check that `service_interest`, `property_use`, `requested_services`, and `source_page` appear in the email. Recorded in the launch checklist.
- The existing `audit.spec.ts` needs AirROI and Redis credentials that are not in `.env.local`, so it was not run locally. It was not modified.
- Google Analytics destination configuration for the new event names. The tag ID is unchanged; the events will appear in GA4 as custom events until marked as conversions in the property.

## Decisions

1. **www is canonical.** Production already redirects to it. Changing the app to match is a metadata fix, not a hostname migration.
2. **`LocalBusiness` replaces `RealEstateAgent`.** Frontier manages and cares for property; nothing verified says it is a licensed brokerage. `LocalBusiness` is supported by Google and truthful. If the owner holds a broker licence and wants the subtype back, it is a one-word change in `layout.tsx`.
3. **Management fee base: resolved 2026-09-21.** The owner confirmed **net rental revenue** as the source of truth. The phrase was changed from "net rental income" across 16 marketing files, and the management page's conflicting pricing card (which said "of nightly-rental revenue" and "Calculated on nightly rate") now renders `plans.manager.fee`, `feeSuffix`, and `feeBase` directly, so it cannot drift again. A regression test walks twelve fee-quoting pages and fails on any retired wording, or on any page quoting 20% without the confirmed base. The definition clause itself is unchanged: what is left after platform host fees and occupancy taxes.
4. **Homepage FAQPage schema removed.** The homepage FAQ now mixes two services and Google has retired the FAQ rich result; the visible answers stay. FAQPage markup already present on other pages was not touched.
5. **Proposed limits are shipped as numbers.** The 60-minute exterior and 30-minute concierge allowances render in the preview so they can be judged in context. Set either value to `null` in `HOME_CARE_LIMITS` to fall back to "defined in your written scope" wording before launch if they are not approved.
6. **No third table column for local support.** The pricing page compares the two primary services and presents local support beneath as a custom scope, per the brief.
7. **Comparison table moved, not deleted.** The national-operator comparison is management content and now lives on the management page.
8. **Draft articles ship as drafts.** They are in the content system with `draft: true` and are unreachable until the flag is removed.

## Owner release gates (approval required before production)

- ~~Management fee base~~ **confirmed 2026-09-21 as "20% of net rental revenue"**, reconciled site-wide including the owner portal statement label. Two follow-ups sit outside this repo: the applied Supabase migration `20260902220000_owner_portal.sql` still carries the retired phrase in an explanatory comment (migrations are history and were deliberately not edited; the columns and arithmetic are unaffected), and any signed management agreement worded "net rental income" should be checked so the contract and the website name the same base.
- Qualifying-home scope for the $500 base: rooms, square footage, and condition boundaries. The brief's 2,700 sq ft three-bedroom prospect is context; no square-footage promise was published.
- Exterior time cap (proposed 60 person-minutes per month) and concierge task cap (proposed 30 person-minutes during scheduled visits).
- Routine chemical allowance for the hot-tub check, and the between-visit responsibilities wording in the written scope.
- Cancellation and setup terms for the concierge plan. The site says month to month with 30 days notice and no setup fee, matching the other services.
- Billable extra-visit and turnover policy, including how an included monthly clean is allocated after a guest stay.
- Support hours and response promises. The site currently carries "24/7" guest messaging in several places, "7am-10pm" on the management page, "9am–9pm, on-call after" in the comparison table, "< 15min" average response, and "20-min average" maintenance response. None were changed; pick one set of true statements and the rest can be aligned in a follow-up.
- The Hot-Tub Program add-on on the management page promises weekly testing and "guest-ready year-round". It predates this work and is worth a read against the new concierge hot-tub wording.
- Insurance and vendor capability for the concierge activities as written (hot-tub handling, exterior work, package handling, filter and bulb swaps).
- Draft articles: facts, tone, author line, and publish date before removing `draft: true`.

## Files changed

New: `src/data/home-care.ts`, `src/app/home-care-concierge/page.tsx`, `src/components/sections/home-care-package.tsx`, `src/components/sections/concierge-crosslink.tsx`, `src/components/analytics/contact-link.tsx`, `tests/e2e/home-care.spec.ts`, this file, `docs/frontier-local-seo-launch-checklist.md`.

Modified: `src/data/site.ts`, `src/data/homepage-faq.ts`, `src/data/faq.ts`, `src/data/local-services.ts`, `src/data/blog-posts.ts`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/contact/page.tsx`, `src/app/pricing/page.tsx`, `src/app/local-services/page.tsx`, `src/app/management-services/page.tsx`, `src/app/about/page.tsx`, `src/app/broken-bow-property-management/page.tsx`, `src/app/hochatown-property-management/page.tsx`, `src/app/dallas-cabin-owners/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`, `src/components/forms/contact-form-tabbed.tsx`, `src/components/forms/contact-form.tsx`, `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`, `src/components/sections/two-ways-to-work.tsx`, `src/components/seo/breadcrumbs.tsx`, `src/components/audit/hero-snapshot.tsx`, `src/components/analytics/plan-cta.tsx`, `src/components/analytics/discovery-cta.tsx`, `src/lib/analytics.ts`, `next.config.ts`, plus host-only edits (`https://rentwithfrontier.com` to `https://www.rentwithfrontier.com`) in the remaining page, blog, and email files.

Untouched on purpose: `/portal`, `/sign`, `/admin`, `/audit` logic, API routes, Supabase, the booking widget and property routes, both lockfiles, `.env.local`.
