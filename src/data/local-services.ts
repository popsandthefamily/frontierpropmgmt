/**
 * STR Cleaning & Local Support (the route is still /local-services): the
 * supporting offer for owners who keep control of their own bookings and
 * need turnovers on a booking calendar. It sits beside the two primary
 * services, full management and Home Care Concierge, rather than as a
 * third flagship plan.
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
 * The line between local support and full management. Anything involving
 * guests, money, or the listing itself belongs to Property Manager.
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
    question: "How much does STR Cleaning & Local Support cost?",
    answer:
      "It's quoted per property after a walkthrough. There's no published rate because the work isn't standard: a two-bedroom that needs turnover cleaning only and a five-bedroom with a pool, a hot tub, and a long gravel drive are genuinely different jobs. Recurring work is quoted as a flat monthly figure, and on-call work is quoted at a rate you approve before we start. No setup fee, no annual contract.",
  },
  {
    question: "Why not just publish a price list?",
    answer:
      "Because we'd be wrong for most owners. A published rate either overcharges the simple properties or quietly excludes half of what a complex one needs, and then the real number shows up later as a surprise. We'd rather look at the cabin first and give you a figure that holds.",
  },
  {
    question: "Can I use local support if another company manages my cabin?",
    answer:
      "Yes. This plan is built for it. You keep your manager, your listing, and your bookings, and we handle the on-the-ground work they're not doing well or not doing at all. We also work with owners who self-manage entirely.",
  },
  {
    question: "Do you take a percentage of my bookings?",
    answer:
      "No. Local support never touches your booking revenue. You're paying for work performed, not for a share of what the cabin earns. The percentage model is our Property Manager plan, which is a different service entirely.",
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
    question: "Can I start on local support and move to full management later?",
    answer:
      "Yes, and a fair number of owners do exactly that. It's a reasonable way to see how we work before handing over the whole property. Availability isn't guaranteed, though, since we cap how many cabins we manage.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Month to month, thirty days notice to cancel. No annual lock-in on any of our services.",
  },
  {
    question: "How is this different from Home Care Concierge?",
    answer:
      "Local support is scoped around a booking calendar: turnovers, restocking, and the maintenance that comes with guests, quoted per property. Home Care Concierge is a fixed monthly plan from $500 for one scheduled care cycle a month, built for private second homes and cabins that rent only occasionally. If you need turnovers every weekend, start here. If you need the house looked after once a month between your own visits, start with the concierge plan and add turnovers as a separate quoted line when you need them.",
  },
];
