import { plans } from "./site";

/**
 * Home Care Concierge: the second of Frontier's two primary services.
 *
 * Everything the homepage, the concierge page, the pricing comparison, the
 * FAQ hub, the structured data, and the llms files say about this service
 * reads from here, so the $500 figure, the monthly frequency, and the
 * exclusions cannot drift between pages.
 *
 * Two kinds of fact live in this file and they are labelled:
 *
 *   CONFIRMED  The owner has signed off. Safe to publish as policy.
 *   PROPOSED   A recommended operational default, built into the preview so
 *              it can be reviewed in context. Listed in
 *              docs/frontier-home-care-implementation-status.md for approval
 *              before production. If a proposed limit is not approved, the
 *              copy falls back to "defined in your written scope" rather
 *              than inventing a number.
 */

export const homeCare = {
  name: plans.concierge.name,
  href: plans.concierge.href,
  /** CONFIRMED: the starting price. */
  basePrice: plans.concierge.basePrice,
  priceLabel: `${plans.concierge.fee}/month`,
  priceLine: "A defined monthly care plan for your property. Scope confirmed after a walkthrough.",
  /** CONFIRMED: sits beside the price on every page that shows it. */
  priceQualifier:
    "The base plan includes one scheduled monthly care cycle and one interior maintenance cleaning. Additional visits, guest turnovers, repairs, materials, and higher-frequency service are quoted separately.",
  /** One-line lead used on the concierge hero. */
  lead: "Your place here, cared for while you're away.",
} as const;

/* ------------------------------------------------------------------ */
/*  Who it is for                                                      */
/* ------------------------------------------------------------------ */

export interface HomeCareAudience {
  key: "private" | "mixed" | "str";
  label: string;
  body: string;
}

export const HOME_CARE_AUDIENCES: HomeCareAudience[] = [
  {
    key: "private",
    label: "Private second homes",
    body: "A home you keep for yourselves. Never rented, and not going to be. It still needs someone local to clean it before you arrive, check on it after a storm, and tell you what needs attention.",
  },
  {
    key: "mixed",
    label: "Mixed-use vacation homes",
    body: "Used by the family most of the year, rented a few weekends when it suits you. We care for the house; you decide when and whether it rents.",
  },
  {
    key: "str",
    label: "Self-managed short-term rentals",
    body: "You run the listing, the pricing, and the guest messages. We handle the agreed physical care of the property between your bookings. Turnovers and extra visits are scoped separately.",
  },
];

/**
 * CONFIRMED: the distinction between the two primary services, stated once
 * and reused on the concierge page, the pricing comparison, and the form.
 */
export const HOME_CARE_STR_NOTE =
  "Own a short-term rental? Home Care Concierge can support a cabin you self-manage or use personally between bookings. You keep the listing, pricing, calendar, and guest communication. Turnovers, additional checks, restocking, and higher-frequency hot-tub service are scoped separately.";

/* ------------------------------------------------------------------ */
/*  Proposed operational limits (PROPOSED, owner approval required)    */
/* ------------------------------------------------------------------ */

/**
 * PROPOSED time caps. Set to `null` to publish the written-scope wording
 * instead of a number. Both values are listed in the release-approval
 * checklist and must not be treated as established policy until approved.
 */
export const HOME_CARE_LIMITS = {
  /** Person-minutes of light exterior care per monthly cycle. */
  exteriorMinutes: 60 as number | null,
  /** Person-minutes of concierge assistance during scheduled visits. */
  conciergeMinutes: 30 as number | null,
} as const;

function minutesOr(minutes: number | null, fallback: string): string {
  return minutes === null ? fallback : `up to ${minutes} minutes per month`;
}

/* ------------------------------------------------------------------ */
/*  What the base plan includes                                        */
/* ------------------------------------------------------------------ */

export interface HomeCareScopeBlock {
  id: string;
  title: string;
  icon: string;
  /** What is done. */
  body: string;
  /** The frequency or boundary. Every block states one. */
  boundary: string;
}

export const HOME_CARE_SCOPE: HomeCareScopeBlock[] = [
  {
    id: "cleaning",
    title: "Interior maintenance cleaning",
    icon: "Sparkles",
    body: "One standard maintenance clean of the rooms and square footage agreed at onboarding. Kitchen, bathrooms, floors, surfaces, and the beds you ask us to make.",
    boundary:
      "Once per month. Not a deep clean, a guest turnover, laundry service, dishes, or heavy-condition cleanup. Those are quoted separately.",
  },
  {
    id: "hot-tub",
    title: "Hot-tub attention",
    icon: "Waves",
    body: "One scheduled check within the agreed scope: test and document water condition, routine balancing, accessible cleaning, filter attention, and a visual check of operation and cover.",
    boundary:
      "Once per month. A monthly check is not continuous water management. Your written plan states the between-visit responsibilities and any routine chemical allowance. A filled, actively used tub usually needs more than one visit a month, and we say so in the quote.",
  },
  {
    id: "exterior",
    title: "Light exterior care",
    icon: "TreePine",
    body: "Blow off agreed decks, porches, and paths. Light ground-level shrub and bed tidying. Small-debris pickup.",
    boundary: `${minutesOr(HOME_CARE_LIMITS.exteriorMinutes, "A time allowance defined in your written scope")}. No mowing, tree work, pressure washing, gutters, or storm cleanup unless quoted.`,
  },
  {
    id: "checks",
    title: "Visual property check",
    icon: "ShieldCheck",
    body: "A walk through accessible areas with eyes open for obvious issues: leaks, pests, HVAC running, doors and windows secure, anything a homeowner would want to know about.",
    boundary:
      "Once per month during the scheduled visit. Observations, not a licensed inspection, a security patrol, an engineering evaluation, or a guarantee against damage.",
  },
  {
    id: "concierge",
    title: "Mail, packages, and small tasks",
    icon: "Package",
    body: "Owner-authorized mail and package retrieval during scheduled visits, placed in a designated secure spot inside the home. Swapping accessible owner-supplied filters, bulbs, and batteries.",
    boundary: `${minutesOr(HOME_CARE_LIMITS.conciergeMinutes, "A task allowance defined in your written scope")}, during scheduled visits. No daily collection, off-site storage, electrical work, or ladder work.`,
  },
  {
    id: "reporting",
    title: "Report and arrival coordination",
    icon: "ClipboardList",
    body: "After each care cycle: a dated checklist, useful photos, what was completed, what we noticed, and anything that needs your approval. When scheduling permits, the monthly service is timed to an agreed arrival date.",
    boundary:
      "One report per cycle. Arrival timing is coordinated, not guaranteed on demand, and it is not an extra clean or a separate walkthrough for every visit.",
  },
];

/* ------------------------------------------------------------------ */
/*  What is quoted separately                                          */
/* ------------------------------------------------------------------ */

export const HOME_CARE_NOT_INCLUDED: string[] = [
  "Additional visits or a higher-frequency schedule",
  "Guest turnover cleans, restocking, and linen service",
  "Repairs, parts, and materials",
  "Major pruning, mowing, tree work, and storm cleanup",
  "Pressure washing, gutter work, hauling, and pest treatment",
  "Pool service, and hot-tub drain and refills",
  "Deep cleaning and specialty cleaning",
  "Emergency or after-hours attendance",
  "Vendor waiting, delivery meets, grocery runs, and off-site storage",
];

/**
 * How pricing works, in the words the pricing page and the FAQ share.
 * Frontier's own labor is fixed-price inside the plan; third-party vendor
 * invoices pass through at cost. Neither statement means the plan is sold
 * without a margin.
 */
export const HOME_CARE_PRICING_NOTES: string[] = [
  "The base plan is a flat monthly figure for Frontier's own scheduled labor, confirmed in a written scope after the walkthrough.",
  "Extra visits, turnovers, and added services are quoted before they happen, at a rate you approve.",
  "When a licensed plumber, electrician, or hot-tub technician is needed, their invoice passes through to you at cost.",
  "Month to month, 30 days notice to cancel. Setup and cancellation terms are stated in the written scope.",
];

/* ------------------------------------------------------------------ */
/*  Onboarding                                                          */
/* ------------------------------------------------------------------ */

export interface HomeCareStep {
  step: number;
  title: string;
  body: string;
}

export const HOME_CARE_STEPS: HomeCareStep[] = [
  {
    step: 1,
    title: "Tell us about the property",
    body: "A short call or a message. Where it is, how you use it, whether there is a hot tub, and what has been falling through the cracks.",
  },
  {
    step: 2,
    title: "Walkthrough",
    body: "We visit the home with you or with your permission. Size, condition, access, the hot tub, and the exterior areas you want kept up.",
  },
  {
    step: 3,
    title: "Written scope",
    body: "A plain-language list of exactly what the monthly plan covers, what it costs, and what is quoted separately. Nothing starts until you approve it.",
  },
  {
    step: 4,
    title: "Scheduled care",
    body: "A monthly care cycle on the calendar, timed to your arrivals where scheduling permits, with a report after every visit.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sample report (illustrative only)                                   */
/* ------------------------------------------------------------------ */

/**
 * A stylised text-only example of the report an owner receives. Not a
 * customer report: no address, no access details, no real photos, and no
 * checked-off actual work.
 */
export const HOME_CARE_SAMPLE_REPORT = {
  label: "Illustrative example, not a customer report",
  fields: [
    { label: "Service date", value: "Scheduled monthly visit" },
    {
      label: "Work completed",
      value: "Interior maintenance clean of agreed rooms. Hot-tub water tested and balanced, filter rinsed, cover checked. Decks and front path blown off.",
    },
    {
      label: "Observations",
      value: "Slow drain in guest bathroom sink. Small wasp nest starting under the rear eave. HVAC running normally.",
    },
    {
      label: "Photos",
      value: "Attached where you have authorized them: hot-tub reading, deck after blow-off, the drain and the nest.",
    },
    {
      label: "Unresolved",
      value: "Drain not cleared; outside the plan scope.",
    },
    {
      label: "Approval requested",
      value: "Quote for drain service and nest removal on the next visit, or a licensed plumber if you prefer.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const HOME_CARE_FAQ = [
  {
    question: "Does my home have to be rented?",
    answer:
      "No. Private second homes are a core part of what Home Care Concierge is for. You do not need a listing, a rental history, or any plan to rent the house. If you never want a guest in it, that is fine with us.",
  },
  {
    question: "Can I use this for a short-term rental?",
    answer:
      "Yes. If you self-manage a cabin, we can provide the agreed physical care between your bookings without taking over the listing, the pricing, the calendar, or your guest communication. Guest turnovers and any schedule beyond the monthly base plan are quoted separately, because a rental that turns over every weekend needs a different plan than a home used once a month.",
  },
  {
    question: "What does the $500 base plan cover?",
    answer: `${homeCare.priceQualifier} The exact rooms, square footage, exterior areas, and hot-tub responsibilities are written into your property scope after the walkthrough, so what you are paying for is never a matter of interpretation.`,
  },
  {
    question: "Is every guest turnover included?",
    answer:
      "No. The base plan includes one scheduled maintenance clean a month. If you want that clean to land after a particular guest stay, we can schedule it that way, and it is never billed twice. Additional turnovers are quoted as their own line, either through this plan or through STR Cleaning & Local Support if you need turnovers on a booking calendar.",
  },
  {
    question: "How often do you visit?",
    answer:
      "The base plan is one coordinated care cycle per calendar month. It is not weekly, and it is not continuous monitoring. Cleaning and hot-tub work may be done by different team members on different days, which does not create extra on-demand visits. If your property needs more frequent attention, we agree that in writing and price it accordingly.",
  },
  {
    question: "Will you collect packages every day?",
    answer:
      "No. Mail and packages you have authorized us to handle are collected during scheduled visits and placed in a designated secure spot inside the home. Daily collection, waiting for deliveries, and off-site storage are not part of the base plan and would need a separate arrangement.",
  },
  {
    question: "Is monthly hot-tub attention enough?",
    answer:
      "Not necessarily. A monthly check is a good fit for a tub that sits covered and unused between your visits. A filled tub that is used often, or one at a rental with guests every weekend, needs more frequent testing and care than a monthly visit can provide. Your written plan states who handles what between visits, what the routine chemical allowance is, and when extra visits are needed. We will not tell you a monthly visit is enough when it is not.",
  },
  {
    question: "Will you handle emergencies?",
    answer:
      "The base plan does not include emergency or after-hours attendance, and we do not promise guaranteed emergency response. What we do agree in your written scope is how to reach us, what we can do when something urgent comes up, and how extra visits are approved and billed. For a burst pipe at 2 a.m. you still need a plumber; we can help you find a good one.",
  },
  {
    question: "Can you work alongside another property manager?",
    answer:
      "Yes, with your written authorization and a clear line between what they do and what we do. We coordinate with the existing arrangement rather than assuming their responsibilities, and we identify what is genuinely incremental before quoting anything, so you are never paying two companies for the same task.",
  },
  {
    question: "What area do you cover?",
    answer:
      "Broken Bow and Hochatown, Oklahoma, and nearby McCurtain County properties we can actually reach on a scheduled route. If your home is a little further out, ask. Access and travel are confirmed during quoting, and we would rather say no than serve a property badly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Service comparison, used by /pricing and the llms files            */
/* ------------------------------------------------------------------ */

export type ServiceComparisonKey = "manager" | "concierge";

export interface ServiceComparisonColumn {
  key: ServiceComparisonKey;
  label: string;
  highlight?: boolean;
}

export const SERVICE_COMPARISON_COLUMNS: ServiceComparisonColumn[] = [
  { key: "manager", label: "Full-Service STR Management", highlight: true },
  { key: "concierge", label: "Home Care Concierge" },
];

export const SERVICE_COMPARISON_ROWS: {
  key: string;
  label: string;
  values: Record<ServiceComparisonKey, string>;
}[] = [
  {
    key: "decision",
    label: "The decision you are making",
    values: {
      manager: "Run my short-term rental for me",
      concierge: "Take care of my property locally while I keep control",
    },
  },
  {
    key: "pricing",
    label: "Pricing",
    values: {
      manager: plans.manager.feeInline,
      concierge: `${plans.concierge.feeInline}, scope confirmed after a walkthrough`,
    },
  },
  {
    key: "propertyType",
    label: "Property type",
    values: {
      manager: "Rental cabins we operate for you",
      concierge: "Private second homes, owner-used vacation homes, and self-managed rentals",
    },
  },
  {
    key: "bookings",
    label: "Who manages bookings",
    values: { manager: "We do", concierge: "You do, or nobody, if it is not rented" },
  },
  {
    key: "guestComms",
    label: "Guest communication",
    values: { manager: "We handle", concierge: "You handle" },
  },
  {
    key: "listing",
    label: "Pricing and listings",
    values: { manager: "We handle", concierge: "Not included, you keep control" },
  },
  {
    key: "cleaning",
    label: "Cleaning frequency",
    values: {
      manager: "Turnover clean after every guest stay, charged to guests",
      concierge: "One scheduled maintenance clean in the base scope; additional turnovers quoted separately",
    },
  },
  {
    key: "checks",
    label: "Property checks",
    values: {
      manager: "Between bookings and through slow months, as part of operations",
      concierge: "Monthly visual check; extra visits by agreement",
    },
  },
  {
    key: "hotTub",
    label: "Hot-tub scope",
    values: {
      manager: "Scheduled around guest occupancy; service contracts billed direct",
      concierge: "One monthly check in the base scope; higher frequency quoted",
    },
  },
  {
    key: "exterior",
    label: "Exterior work",
    values: {
      manager: "Coordinated with vendors, billed at cost",
      concierge: "Light upkeep within the monthly allowance; larger jobs quoted",
    },
  },
  {
    key: "reporting",
    label: "Reporting",
    values: {
      manager: "Monthly owner statement and payout",
      concierge: "Dated checklist and photos after each care cycle",
    },
  },
  {
    key: "extra",
    label: "Extra work",
    values: {
      manager: "Management included; labor, parts, and vendor invoices billed at cost, over $300 with your approval",
      concierge: "Quoted before it happens, at a rate you approve; vendor invoices at cost",
    },
  },
  {
    key: "minimum",
    label: "Monthly minimum",
    values: {
      manager: "None; a percentage of income, so a $0 month costs $0",
      concierge: "The monthly plan fee; it is payment for scheduled work, not a share of income",
    },
  },
  {
    key: "contract",
    label: "Contract",
    values: {
      manager: "Month to month, 30-day exit",
      concierge: "Month to month, 30-day exit",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Owner journeys and the intent-aware CTA contract                    */
/* ------------------------------------------------------------------ */

/**
 * The `type` query parameter every owner CTA passes to /contact. Values are
 * service intent only, never names, addresses, or access details.
 */
export const CONTACT_INTENTS = [
  "management",
  "concierge",
  "local-support",
  "owner",
  "guest",
] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

export function isContactIntent(value: unknown): value is ContactIntent {
  return (
    typeof value === "string" &&
    (CONTACT_INTENTS as readonly string[]).includes(value)
  );
}

/** Safe fallback for a missing or unrecognised `type`. */
export const DEFAULT_CONTACT_INTENT: ContactIntent = "owner";

export function contactHref(intent: ContactIntent): string {
  return `/contact?type=${intent}#inquiry`;
}

export const CTA = {
  management: { label: "Discuss STR Management", href: contactHref("management") },
  concierge: { label: "Request a Property Walkthrough", href: contactHref("concierge") },
  localSupport: { label: "Build My Local Support Plan", href: contactHref("local-support") },
  owner: { label: "Talk About Your Property", href: contactHref("owner") },
  guest: { label: "Ask About a Stay", href: contactHref("guest") },
} as const;

export interface OwnerJourney {
  key: "private" | "str" | "handsOff";
  title: string;
  body: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** "Which kind of owner are you?" on the homepage. */
export const OWNER_JOURNEYS: OwnerJourney[] = [
  {
    key: "private",
    title: "I own a second home here and I do not rent it",
    body: "You want it clean when you arrive, checked while you are away, and someone local who notices the small things before they become expensive.",
    cta: { label: "Explore Home Care Concierge", href: plans.concierge.href },
  },
  {
    key: "str",
    title: "I rent my cabin out and run it myself",
    body: "You keep the listing, the pricing, and the guest messages. You need turnovers on your calendar or agreed monthly care between bookings, handled by someone fifteen minutes away.",
    cta: { label: "See local support options", href: plans.local.href },
    secondary: { label: "Or monthly home care", href: plans.concierge.href },
  },
  {
    key: "handsOff",
    title: "I want the rental run for me, end to end",
    body: "Pricing, listings, guests, cleaning, maintenance, taxes, and a monthly statement. You own the cabin; we operate it.",
    cta: { label: "Explore full management", href: plans.manager.href },
  },
];
