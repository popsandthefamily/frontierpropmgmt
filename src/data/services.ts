/* ------------------------------------------------------------------ */
/*  Service Pillars (Homepage, 4 cards)                              */
/* ------------------------------------------------------------------ */

export interface ServicePillar {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const servicePillars: ServicePillar[] = [
  {
    title: "Listing & Marketing",
    description:
      "Professional photography, optimized listings across Airbnb, Vrbo, and Booking.com, and dynamic pricing to maximize your bookings year-round.",
    icon: "Megaphone",
    features: [
      "Professional photography & copywriting",
      "Multi-platform listing syndication",
      "Dynamic pricing optimization",
      "SEO-driven direct booking site",
    ],
  },
  {
    title: "Reservations & Guest Support",
    description:
      "24/7 guest communication, instant booking confirmations, and a seamless check-in experience that earns 5-star reviews.",
    icon: "CalendarCheck",
    features: [
      "24/7 guest messaging",
      "Automated check-in/check-out",
      "Review management & response",
      "Guest vetting & screening",
    ],
  },
  {
    title: "Cleaning & Maintenance",
    description:
      "Reliable turnover cleaning teams, linen programs, and proactive maintenance to keep your cabin guest-ready at all times.",
    icon: "Sparkles",
    features: [
      "Professional turnover cleaning",
      "Linen & supply management",
      "Hot tub maintenance",
      "Preventive maintenance schedules",
    ],
  },
  {
    title: "Admin & Reporting",
    description:
      "Transparent monthly reporting, tax document preparation, and full compliance with local STR regulations so you can relax.",
    icon: "BarChart3",
    features: [
      "Monthly owner statements",
      "Tax document preparation",
      "STR license & permit compliance",
      "Expense tracking & invoicing",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Detailed Services (Management Services page, 6 items)            */
/* ------------------------------------------------------------------ */

export interface DetailedService {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const detailedServices: DetailedService[] = [
  {
    title: "Pricing & Revenue",
    description:
      "We use data-driven dynamic pricing tools to adjust nightly rates in real time based on demand, seasonality, local events, and competitor analysis. Our goal is simple: maximize your revenue on every booking.",
    icon: "TrendingUp",
    features: [
      "Dynamic nightly rate adjustments",
      "Seasonal & event-based pricing",
      "Competitor rate monitoring",
      "Minimum-stay optimization",
      "Revenue performance tracking",
    ],
  },
  {
    title: "Listing Optimization",
    description:
      "Your cabin gets professional photography, compelling copywriting, and optimized listings across Airbnb, Vrbo, Booking.com, and our direct booking website to capture every possible guest.",
    icon: "Search",
    features: [
      "Professional HDR photography",
      "SEO-optimized listing copy",
      "Multi-platform syndication",
      "Direct booking website",
      "Listing performance analytics",
    ],
  },
  {
    title: "Guest Communication",
    description:
      "From first inquiry to post-checkout review, we handle all guest communication with fast, professional responses. Our team is available 24/7 to handle questions, issues, and emergencies.",
    icon: "MessageSquare",
    features: [
      "24/7 guest messaging & support",
      "Automated booking confirmations",
      "Digital guidebook & check-in instructions",
      "Review management & responses",
      "Emergency guest support line",
    ],
  },
  {
    title: "Cleaning & Turnover",
    description:
      "Our trusted cleaning teams follow a detailed checklist for every turnover, ensuring your cabin is spotless and guest-ready. We manage linens, restock supplies, and conduct quality inspections.",
    icon: "Sparkles",
    features: [
      "Professional turnover cleaning",
      "Quality inspection after every clean",
      "Linen & towel program",
      "Supply restocking (toiletries, coffee, etc.)",
      "Deep cleaning scheduling",
    ],
  },
  {
    title: "Maintenance Coordination",
    description:
      "We coordinate all routine and emergency maintenance with vetted local vendors. From hot tub servicing to HVAC repairs, we handle it so you do not have to.",
    icon: "Wrench",
    features: [
      "24/7 emergency maintenance response",
      "Vetted local vendor network",
      "Hot tub & pool maintenance",
      "Preventive maintenance schedules",
      "Project coordination for upgrades",
    ],
  },
  {
    title: "Owner Reporting",
    description:
      "Full financial transparency with monthly owner statements, year-end tax documents, and a real-time owner portal. You always know exactly how your property is performing.",
    icon: "FileText",
    features: [
      "Monthly owner statements",
      "Real-time owner portal access",
      "Year-end 1099 tax documents",
      "Expense tracking & receipts",
      "Occupancy & revenue dashboards",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Add-Ons (4 optional services)                                     */
/* ------------------------------------------------------------------ */

export interface AddOn {
  name: string;
  description: string;
  features: string[];
}

export const addOns: AddOn[] = [
  {
    name: "Launch Accelerator",
    description:
      "Get your cabin booking-ready fast with our white-glove onboarding package designed for new owners or cabins switching management companies.",
    features: [
      "Professional photography session",
      "Listing creation on all platforms",
      "Interior styling consultation",
      "Initial supply & linen setup",
      "Launch pricing strategy",
    ],
  },
  {
    name: "Tech & Compliance Kit",
    description:
      "Smart home tech installation and full STR compliance setup to ensure your cabin meets all local regulations and runs efficiently.",
    features: [
      "Smart lock installation & setup",
      "Noise monitoring device",
      "STR permit & license filing",
      "Occupancy tax registration",
      "Wi-Fi optimization",
    ],
  },
  {
    name: "Ads & Gap-Fill Sprint",
    description:
      "Targeted digital advertising campaigns and last-minute pricing strategies to fill calendar gaps and boost occupancy during slower periods.",
    features: [
      "Google Ads campaign management",
      "Social media advertising",
      "Last-minute deal automation",
      "Gap-night pricing strategies",
      "Performance reporting",
    ],
  },
  {
    name: "Hot-Tub Program",
    description:
      "Comprehensive hot tub maintenance program to keep your hot tub sparkling clean, chemically balanced, and guest-ready year-round.",
    features: [
      "Weekly chemical testing & balancing",
      "Filter cleaning & replacement",
      "Drain, clean & refill scheduling",
      "Equipment inspection & repair",
      "Winter freeze protection",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Onboarding Steps (6 steps)                                        */
/* ------------------------------------------------------------------ */

export interface OnboardingStep {
  number: number;
  title: string;
  description: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    number: 1,
    title: "Discovery & Quote",
    description:
      "We start with a call to learn about your property, goals, and expectations. You will receive a customized management proposal within 48 hours.",
  },
  {
    number: 2,
    title: "Agreement & Access",
    description:
      "Once you are ready, we sign the management agreement and you provide us access to your property, existing listings, and any vendor contacts.",
  },
  {
    number: 3,
    title: "Launch Work",
    description:
      "Our team handles professional photography, listing creation, pricing setup, and ensures your cabin is guest-ready with a thorough walkthrough.",
  },
  {
    number: 4,
    title: "Vendors & Turnover",
    description:
      "We onboard our trusted cleaning and maintenance teams, set up your turnover schedule, and stock your cabin with guest essentials.",
  },
  {
    number: 5,
    title: "Devices & Compliance",
    description:
      "Smart locks, noise monitors, and Wi-Fi are configured. We handle STR permits, occupancy tax registration, and any local compliance requirements.",
  },
  {
    number: 6,
    title: "Go Live",
    description:
      "Your listings go live across all platforms with optimized pricing. We start accepting bookings and you start earning, it is that simple.",
  },
];

/* ------------------------------------------------------------------ */
/*  Management FAQ (11 items)                                         */
/* ------------------------------------------------------------------ */

export interface FAQItem {
  question: string;
  answer: string;
}

export const managementFAQ: FAQItem[] = [
  {
    question: "What is your management fee? Are there any markups on top?",
    answer:
      "20% of the gross nightly-rental revenue. That is the entire management fee, no markups on cleaning, no marketing add-ons, no admin charges. Frontier fronts the cost of guest-reimbursable items (cleaning fee, pet fee, occupancy taxes) and gets paid back directly from the matching fees your guests pay at booking. Optional services like professional photography, firewood, hot tub chemicals, deep cleans, and vendor repairs are billed at cost, no markup, with the original receipt on your monthly statement. The only way Frontier makes money is the 20%.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. We believe in earning your business every month. Our management agreements can be cancelled with 30 days written notice. No early termination fees, no penalties.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Results vary by property, location, and amenities, but our owners typically see a 15-30% increase in revenue within the first 6 months through better pricing, listing optimization, and increased occupancy. We are happy to share performance data from comparable properties.",
  },
  {
    question: "Can I switch from my current management company?",
    answer:
      "Absolutely. We handle the transition process to make it as smooth as possible. This includes transferring existing listings and reviews, setting up new systems, and coordinating with your current company on the handoff timeline.",
  },
  {
    question: "How do you set pricing for my property?",
    answer:
      "We use dynamic pricing tools that analyze real-time market data, competitor rates, local events, seasonality, and demand trends to set optimal nightly rates. Pricing is adjusted daily to maximize your revenue. You can set minimum rate floors if you prefer.",
  },
  {
    question: "How does cleaning work?",
    answer:
      "We coordinate all turnover cleaning with our trusted local cleaning teams. Each clean follows a detailed checklist and is inspected for quality. Cleaning fees are charged to guests as part of their booking and do not come out of your management fee.",
  },
  {
    question: "What is your policy on parties and events?",
    answer:
      "We have a strict no-party policy at all properties. We use guest screening, noise monitoring devices, and occupancy limits to enforce this. If a guest violates the policy, we handle the situation immediately and pursue damage claims on your behalf.",
  },
  {
    question: "How do I see how my property is performing?",
    answer:
      "You will receive a detailed monthly owner statement showing all bookings, revenue, expenses, and net payouts. You also have access to a real-time owner portal where you can check performance at any time.",
  },
  {
    question: "Can I still use my cabin for personal stays?",
    answer:
      "Of course! It is your cabin. Simply block off the dates you want in our shared calendar. We recommend giving at least 2 weeks notice for peak season dates to avoid displacing bookings, but off-season dates can usually be blocked on shorter notice.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We manage vacation rental cabins in Broken Bow, Hochatown, and the surrounding McCurtain County area of southeast Oklahoma. If your property is in this region, we would love to talk.",
  },
  {
    question: "What makes Frontier different from other management companies?",
    answer:
      "We are a locally-owned, owner-operated company, not a franchise or remote management firm. Our team lives and works in Broken Bow, and we treat every property like it is our own. We combine local expertise with modern technology, data-driven pricing, and genuine hospitality to deliver better results for our owners and guests.",
  },
  {
    question: "Do you handle occupancy taxes and permits?",
    answer:
      "Yes. Oklahoma lodging tax and McCurtain County occupancy tax are collected through the booking platforms and remitted on your behalf. We also track short-term rental permit requirements and help renew them as regulations change. Any city-specific permits are your responsibility to hold in your name, but we help you stay on top of what is due and when.",
  },
  {
    question: "What insurance do I need?",
    answer:
      "You should carry a short-term rental policy (not just a standard homeowner policy, most exclude STR use). Carriers we see owners use include Proper Insurance, Safely, and CBIZ. Airbnb's AirCover and Vrbo's Liability Insurance add a layer on top of bookings through those platforms, but are not substitutes for a dedicated policy. We are not licensed insurance advisors, confirm coverage details with a broker.",
  },
  {
    question: "What happens to my existing bookings if I switch to Frontier?",
    answer:
      "Existing bookings transfer with the listing. We honor the rates and house rules your guests already agreed to, then optimize everything from your go-live date forward. In most switches we have zero cancellations, guests see a smoother experience, not a disruption.",
  },
  {
    question: "How is your pricing strategy different?",
    answer:
      "We use dynamic pricing software that adjusts your nightly rate daily based on real booking pace, local events, weekend demand, and comp activity in Broken Bow specifically, not a national model. We also hand-review rates for event weekends (Beavers Bend marathon, Choctaw rodeo, etc.) that automated tools miss, and adjust minimum-stay rules around high-demand dates.",
  },
];
