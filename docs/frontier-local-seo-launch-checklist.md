# Home Care Concierge: local visibility launch checklist

Everything on this list is an **owner or account task**. None of it is done
by deploying the code. Work through it after the release gates in
`frontier-home-care-implementation-status.md` are approved and the branch
is deployed.

## Before deploy

- [ ] Approve or amend every item under "Owner release gates" in the status doc. In particular, decide the exterior and concierge time caps; if either is not approved, set it to `null` in `src/data/home-care.ts` so the site says "defined in your written scope" instead of a number.
- [ ] Read the concierge page, the pricing page, and the homepage once as a private-home owner and once as a self-managed STR owner. Both should see themselves included and nothing should read as unlimited.
- [ ] Confirm the Formspree form is set to forward to the inbox that should receive owner inquiries, and that its spam filtering is on. Field validation and allowlists live in the browser; Formspree's own filtering is the server-side layer.

## Immediately after deploy

- [ ] Send one clearly labelled test inquiry through `/contact?type=concierge#inquiry` (name it "TEST, ignore"). Confirm the email arrives with `service_interest`, `property_use`, `requested_services`, `source_page`, and a subject line naming the service. Delete the test lead from Formspree afterwards.
- [ ] Open `https://rentwithfrontier.com/home-care-concierge` and confirm it lands on the www host with a 200 and a canonical of `https://www.rentwithfrontier.com/home-care-concierge`. Check one nested page (`/pricing`) does not canonicalise to the homepage.
- [ ] Run `/home-care-concierge`, `/pricing`, and `/` through Google's Rich Results Test and the Schema.org validator. A general `Service` node not being eligible for a rich result is expected and is not an error. Fix only actual JSON errors.
- [ ] Confirm `https://www.rentwithfrontier.com/robots.txt` and `/sitemap.xml` render and that the sitemap contains the concierge URL and no `?type=` variants.

## Google Search Console

- [ ] Verification is by the static file `public/google39354f42bb809440.html`, which is unchanged. Confirm the www property is verified; if only the apex property exists, add a domain property so both hosts are covered.
- [ ] Record a baseline before the change is indexed: Performance report for the last 3 months, filtered to brand queries, STR-management queries, and any property-care queries. Save the export.
- [ ] Submit `https://www.rentwithfrontier.com/sitemap.xml` (the www URL) and remove any stale apex sitemap entry.
- [ ] URL Inspection and "Request indexing" for `/home-care-concierge`, `/`, `/pricing`, `/local-services`, `/contact`. This is a signal, not a guarantee; do not use the Indexing API.
- [ ] After 2 to 4 weeks, check the Pages report for the concierge URL and for any "Duplicate, Google chose different canonical" entries caused by the host change.

## Google Business Profile

- [ ] Keep the existing profile and business name exactly as they are. Do not add "Home Care" or any keyword to the name.
- [ ] Review the primary category. Keep the one that best describes short-term rental management. Add a secondary category only if one exists that truthfully describes property or home-watch services; do not choose any category that reads as medical or personal home care.
- [ ] Add a service entry for Home Care Concierge using the description below, plus the service area actually worked (Broken Bow, Hochatown, nearby McCurtain County). Keep the existing management services.
- [ ] Add the concierge page URL as the service link where the profile supports it.
- [ ] Photos: upload real, authorised photos of actual care work as it happens. No stock imagery, no client properties without written permission.
- [ ] Reviews: ask real concierge clients for honest reviews after service has been delivered, with no incentive and no script. Do not screen out unhappy customers.

Suggested service description for owner review:

> Frontier Property Management provides full-service short-term rental management and Home Care Concierge in Broken Bow and Hochatown, Oklahoma. We support private second homes and rental cabins with agreed cleaning, hot-tub attention, light exterior upkeep, scheduled property checks, and local coordination. Owners can choose rental management or retain control of their bookings while using our property-care services.

## Analytics

- [ ] In GA4, mark `generate_lead` and `discovery_call_booked` as key events. Leave `contact_click`, `form_start`, `service_select`, and `schedule_call_click` as ordinary events; they are not conversions.
- [ ] Do not assign a value to `generate_lead`. A form submission is not $500 of revenue.
- [ ] Confirm the existing Google Ads tag (`AW-17777139722`) still receives page views and that no second page-view tag was introduced. Nothing in the tag setup changed.
- [ ] Verify the Google tag itself. A plain request to `https://www.googletagmanager.com/gtag/js?id=GT-K4TS7SM2` returned 404 on 2026-09-19. That can be a request-context quirk, but it is also what an unpublished or mistyped tag ID looks like. Open the tag in Google Tag Manager or GA4 Admin, confirm the ID, and check the realtime report for a page view from the preview.
- [ ] Ask Broken Bow Hot Tub Co. to add a reciprocal line and link on brokenbowhottub.com describing the Frontier partnership; the Frontier side is live in the footer and on every hot-tub mention.
- [ ] Build one exploration: `generate_lead` by `service_interest` and `source_page`, so concierge and management inquiries can be counted separately.

## Lead log

Keep a simple spreadsheet, no CRM needed. One row per inquiry:

| Date | Service asked about | Property use | Source (form, call, referral) | Qualified? | Walkthrough date | Quote sent | Signed? | If lost, why |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

For the first concierge clients, also log actual labour minutes, travel, materials, extra requests, and renewal decisions per month. That is the data that says whether $500 holds.

## Local relationships

- [ ] List the real-estate agents, builders, cleaners, and home-service vendors already in Frontier's network who meet second-home buyers. Tell each of them the concierge service exists and what it costs. A referral is worth more than a backlink.
- [ ] Where Frontier controls a related site (for example the Hocha.Town guide already linked from the footer), add one short, honest sentence and a link describing the relationship. No keyword blocks, no reciprocal link schemes.
- [ ] Do not buy directory listings or citations in bulk.

## Content

- [ ] Review the two draft articles in `src/data/blog-posts.ts` (`what-second-home-care-includes-broken-bow` and `self-managing-hochatown-cabin-what-local-team-handles`). Correct anything that is not true of how Frontier will actually operate, set the real author and date, then remove `draft: true`.
- [ ] After the first care cycles are delivered and a client has given written permission, consider a short, anonymised "what a month of care looked like" article. Do not name the initial prospect or present anyone as signed without consent.

## 30 / 60 / 90 day review

At each mark, compare against the saved baseline and note seasonality:

- Indexing status of the changed pages and any canonical or duplicate issues.
- Impressions and clicks by intent group: brand, STR management, property care.
- Owner inquiries by service, and how many were qualified.
- Walkthroughs completed, quotes sent, clients signed.
- Reasons inquiries were lost.
- For concierge clients: actual cost to serve against the plan fee.

Small numbers are small numbers. Report them as such.
