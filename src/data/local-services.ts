/**
 * Local Services is the smaller of Frontier's two plans: on-the-ground
 * cleaning, maintenance, and logistics for owners who keep control of their
 * own bookings.
 *
 * There is no price list here on purpose. Scope varies enough between a
 * two-bedroom that needs turns only and a five-bedroom with a pool, a hot
 * tub, and a gravel drive that a published rate would be wrong for almost
 * everyone. Pricing happens after a walkthrough.
 */

export interface LocalServiceGroup {
  id: string;
  title: string;
  icon: string;
  summary: string;
  items: string[];
}

export const LOCAL_SERVICE_GROUPS: LocalServiceGroup[] = [
  {
    id: "turnovers",
    title: "Turnovers & cleaning",
    icon: "Sparkles",
    summary:
      "The part that has to happen the same way every single time, whether or not you're in town.",
    items: [
      "Departure and arrival cleans on your booking calendar",
      "Linen laundering, swap, and par-level tracking",
      "Consumable restock: paper, soap, coffee, filters, firewood",
      "Post-clean photo set so you can see the cabin without driving to it",
      "Damage and wear reporting with photos, same day",
      "Mid-stay refresh cleans for longer bookings",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & repairs",
    icon: "Wrench",
    summary:
      "Someone fifteen minutes away who can actually get inside the cabin and look at it.",
    items: [
      "Same-day triage on guest-reported issues you send us",
      "Hot tub draining, chemical balance, and filter service",
      "HVAC filter changes and seasonal system checks",
      "Plumbing, electrical, and appliance troubleshooting",
      "Licensed contractor coordination and on-site meets",
      "Vendor invoices passed through at cost, never marked up",
    ],
  },
  {
    id: "checks",
    title: "Property & seasonal checks",
    icon: "ShieldCheck",
    summary:
      "The unglamorous work that decides whether a cold snap costs you nothing or costs you a season.",
    items: [
      "Hard-freeze prep and post-freeze walkthroughs",
      "Storm prep and damage assessment with photo report",
      "Vacancy checks between bookings and through slow months",
      "Deck, gutter, and driveway condition monitoring",
      "Pest and wildlife management scheduling",
      "Smoke, CO, and safety equipment verification",
    ],
  },
  {
    id: "logistics",
    title: "Logistics & errands",
    icon: "Truck",
    summary:
      "Everything that needs a person physically present in McCurtain County.",
    items: [
      "Furniture, appliance, and hot tub delivery meets",
      "Package receiving and installation of owner-shipped items",
      "Lock, keypad, and smart-device service",
      "Trash and recycling service coordination",
      "Supply runs so you're not shipping paper towels from Dallas",
      "Owner-stay prep when you or your family come down",
    ],
  },
];

/**
 * The line between the two plans. Anything involving guests, money, or the
 * listing itself belongs to Property Manager.
 */
export const LOCAL_SERVICES_NOT_INCLUDED = [
  "Guest communication and booking management",
  "Dynamic pricing and revenue strategy",
  "Listing creation, optimization, or channel management",
  "Occupancy tax filing and owner payouts",
  "Monthly P&L reporting",
];

export interface LocalServicesStep {
  step: number;
  title: string;
  body: string;
}

export const LOCAL_SERVICES_STEPS: LocalServicesStep[] = [
  {
    step: 1,
    title: "Scoping call",
    body: "Thirty minutes, free. What's breaking, what's falling through, and how often you're driving down to fix it yourself.",
  },
  {
    step: 2,
    title: "Walkthrough",
    body: "We walk the property in person. Hot tub, HVAC, well and septic, access, and the condition of everything a guest touches.",
  },
  {
    step: 3,
    title: "Written scope and quote",
    body: "You get a plain-language list of exactly what we'll handle and what it costs. Recurring work is a flat monthly figure; on-call work is a rate you approve in advance.",
  },
  {
    step: 4,
    title: "Handoff",
    body: "Access, vendor contacts, supply preferences, and your escalation rules. We build the checklist around how you want the cabin run.",
  },
  {
    step: 5,
    title: "Ongoing",
    body: "Month to month. Photo reports after every visit, one invoice, and a real person answering the phone.",
  },
];

export const LOCAL_SERVICES_FAQ = [
  {
    question: "How much does Local Services cost?",
    answer:
      "It's quoted per property after a walkthrough. There's no published rate because the work isn't standard: a two-bedroom that needs turnover cleaning only and a five-bedroom with a pool, a hot tub, and a long gravel drive are genuinely different jobs. Recurring work is quoted as a flat monthly figure, and on-call work is quoted at a rate you approve before we start. No setup fee, no annual contract.",
  },
  {
    question: "Why not just publish a price list?",
    answer:
      "Because we'd be wrong for most owners. A published rate either overcharges the simple properties or quietly excludes half of what a complex one needs, and then the real number shows up later as a surprise. We'd rather look at the cabin first and give you a figure that holds.",
  },
  {
    question: "Can I use Local Services if another company manages my cabin?",
    answer:
      "Yes. This plan is built for it. You keep your manager, your listing, and your bookings, and we handle the on-the-ground work they're not doing well or not doing at all. We also work with owners who self-manage entirely.",
  },
  {
    question: "Do you take a percentage of my bookings?",
    answer:
      "No. Local Services never touches your booking revenue. You're paying for work performed, not for a share of what the cabin earns. The percentage model is our Property Manager plan, which is a different plan entirely.",
  },
  {
    question: "Do you mark up vendor invoices?",
    answer:
      "No. When we bring in a licensed plumber, electrician, or contractor, their invoice passes through to you at cost. You see the actual bill. We charge for the coordination, not for the privilege of hiring someone.",
  },
  {
    question: "Will you talk to my guests?",
    answer:
      "Only if you ask us to for a specific issue. By default you stay the point of contact and you dispatch us. If you'd rather never field a midnight message about a hot tub again, that's the Property Manager plan.",
  },
  {
    question: "Do you take one-off jobs?",
    answer:
      "Sometimes, but ongoing clients come first. If you need a single freeze check or a one-time deep clean, ask and we'll tell you honestly whether we can fit it.",
  },
  {
    question: "What area do you cover?",
    answer:
      "Broken Bow, Hochatown, and the surrounding McCurtain County area. Same footprint as our full management, because the whole plan depends on being close enough to actually show up.",
  },
  {
    question: "Can I start on Local Services and move to full management later?",
    answer:
      "Yes, and a fair number of owners do exactly that. It's a reasonable way to see how we work before handing over the whole property. Availability isn't guaranteed, though, since we cap how many cabins we manage.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Month to month, thirty days notice to cancel. No annual lock-in on either plan.",
  },
];

/* ------------------------------------------------------------------ */
/*  Two-plan comparison, used by /pricing                             */
/* ------------------------------------------------------------------ */

export interface PricingComparisonColumn {
  key: "manager" | "local";
  label: string;
  highlight?: boolean;
}

export const PRICING_COLUMNS: PricingComparisonColumn[] = [
  { key: "manager", label: "Property Manager", highlight: true },
  { key: "local", label: "Local Services" },
];

export const PRICING_ROWS: {
  key: string;
  label: string;
  values: Record<PricingComparisonColumn["key"], string>;
}[] = [
  {
    key: "pricing",
    label: "Pricing",
    values: {
      manager: "20% of net rental income",
      local: "Custom quote, per property",
    },
  },
  {
    key: "bestFor",
    label: "Best for",
    values: {
      manager: "Owners who want the cabin fully run for them",
      local: "Owners who keep their own bookings but need local hands",
    },
  },
  {
    key: "setup",
    label: "Setup fee",
    values: { manager: "None", local: "None" },
  },
  {
    key: "contract",
    label: "Contract",
    values: {
      manager: "Month-to-month, 30-day exit",
      local: "Month-to-month, 30-day exit",
    },
  },
  {
    key: "bookings",
    label: "Who controls the listing and bookings",
    values: { manager: "We do", local: "You do" },
  },
  {
    key: "guestComms",
    label: "Guest communication",
    values: { manager: "We handle", local: "Owner handles" },
  },
  {
    key: "pricingStrategy",
    label: "Dynamic pricing & revenue strategy",
    values: { manager: "We handle", local: "Not included" },
  },
  {
    key: "listing",
    label: "Listing build, SEO & channel management",
    values: { manager: "We handle", local: "Not included" },
  },
  {
    key: "cleaning",
    label: "Turnover cleaning",
    values: { manager: "We handle", local: "We handle" },
  },
  {
    key: "maintenance",
    label: "Maintenance & repairs",
    values: { manager: "We handle", local: "We handle" },
  },
  {
    key: "checks",
    label: "Freeze, storm & vacancy checks",
    values: { manager: "We handle", local: "We handle" },
  },
  {
    key: "vendors",
    label: "Vendor coordination",
    values: { manager: "We handle, at cost", local: "We handle, at cost" },
  },
  {
    key: "taxes",
    label: "Occupancy tax filing",
    values: { manager: "We handle", local: "Owner handles" },
  },
  {
    key: "reporting",
    label: "Reporting",
    values: {
      manager: "Monthly P&L + payout statement",
      local: "Photo report after every visit",
    },
  },
];
