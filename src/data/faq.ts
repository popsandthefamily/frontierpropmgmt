import { managementFAQ, type FAQItem } from "./services";
import { hochatownFAQ } from "./hochatown-faq";
import { LOCAL_SERVICES_FAQ } from "./local-services";
import { HOME_CARE_FAQ } from "./home-care";
import { plans } from "./site";

/**
 * The consolidated answer hub behind /faq.
 *
 * FAQ content was scattered across four data files and several page-local
 * arrays, which meant the same question could be answered two different
 * ways depending on which page an owner landed on. That is bad for owners
 * and worse for answer engines, which have no way to tell which version is
 * current.
 *
 * So this file composes rather than copies: anything already answered in
 * managementFAQ, hochatownFAQ, or LOCAL_SERVICES_FAQ is pulled in by
 * reference, and only genuinely new questions are written inline. Editing
 * an answer at its source updates it everywhere.
 */

/** Pull one question out of a source list, loudly, by exact text. */
function pick(source: FAQItem[], question: string): FAQItem {
  const match = source.find((item) => item.question === question);
  if (!match) {
    throw new Error(`faq: missing question "${question}"`);
  }
  return match;
}

export interface FAQGroup {
  id: string;
  title: string;
  blurb: string;
  items: FAQItem[];
}

export const faqGroups: FAQGroup[] = [
  {
    id: "plans",
    title: "Choosing between the services",
    blurb:
      "Two primary services, and one supporting offer for self-managed rentals. The difference is who operates the rental business versus who performs agreed physical care of the property.",
    items: [
      {
        question: "What are the services, in one sentence each?",
        answer: `${plans.manager.name} is full-service short-term rental management at ${plans.manager.feeInline}: we run the listing, the pricing, the guests, the cleaning, the maintenance, and the taxes. ${plans.concierge.name} is ${plans.concierge.feeInline}: you keep control of the property and any bookings, and we perform one scheduled care cycle a month covering a maintenance clean, hot-tub attention, light exterior upkeep, a visual check, and a report. ${plans.local.name} is ${plans.local.feeInline}: turnovers on a booking calendar and local hands for a rental you run yourself.`,
      },
      {
        question: "Which service is right for my property?",
        answer:
          "If you want the rental run for you, take full management. If the property is a private second home, or a cabin you use yourself and rent only occasionally, take Home Care Concierge. If you run a rental yourself and need turnovers on a booking calendar, ask about STR Cleaning & Local Support. The honest test for the first choice is whether you want to keep answering guest messages. The test for the second is whether the property needs a monthly care cycle or a per-booking one.",
      },
      pick(HOME_CARE_FAQ, "Does my home have to be rented?"),
      pick(HOME_CARE_FAQ, "Can I use this for a short-term rental?"),
      pick(LOCAL_SERVICES_FAQ, "Can I use local support if another company manages my cabin?"),
      pick(LOCAL_SERVICES_FAQ, "Can I start on local support and move to full management later?"),
      {
        question: "Is Home Care Concierge a cheaper version of full management?",
        answer:
          "No. They answer different questions. Management is a share of rental income for operating the rental business. Home Care Concierge is a fixed monthly plan for agreed physical care of a property, whether or not it is rented. One is not a discount on the other, and a self-managed rental that needs weekly turnovers is not a fit for the monthly base plan without additional scoped visits.",
      },
      {
        question: "Why do you cap how many properties you take on?",
        answer:
          "Because the whole model depends on the person making decisions about your cabin having been inside it. That stops being true past a certain number of doors. We would rather turn away an owner than quietly become the kind of company where your cabin is a row in someone's queue.",
      },
    ],
  },
  {
    id: "fees",
    title: "Fees and how the money works",
    blurb:
      "The percentage matters less than what the percentage is calculated on. Both are stated here.",
    items: [
      pick(managementFAQ, "What is your management fee? Are there any markups on top?"),
      {
        question: "Is the 20% calculated before or after platform fees and taxes?",
        answer: `After. ${plans.manager.feeDefinition}`,
      },
      {
        question: "Is your 20% the same as another company's 20%?",
        answer: plans.manager.feeComparisonNote,
      },
      pick(HOME_CARE_FAQ, "What does the $500 base plan cover?"),
      pick(LOCAL_SERVICES_FAQ, "How much does STR Cleaning & Local Support cost?"),
      pick(LOCAL_SERVICES_FAQ, "Why not just publish a price list?"),
      pick(LOCAL_SERVICES_FAQ, "Do you mark up vendor invoices?"),
      {
        question: "What if my cabin earns nothing in a month?",
        answer:
          "On the Property Manager plan you owe us nothing. The fee is a percentage of income, and there is no monthly minimum and no setup fee, so a dead month costs you nothing in management. Home Care Concierge and local support are different: they are payment for scheduled work performed, so the monthly plan fee, or the work we did on a self-managed rental, is invoiced whether or not the property earned anything.",
      },
      pick(managementFAQ, "Is there a long-term contract?"),
    ],
  },
  {
    id: "switching",
    title: "Getting started and switching managers",
    blurb:
      "Most owners who call us already have a manager. Moving is less disruptive than it sounds.",
    items: [
      pick(managementFAQ, "Can I switch from my current management company?"),
      pick(managementFAQ, "What happens to my existing bookings if I switch to Frontier?"),
      pick(managementFAQ, "What kind of results can I expect?"),
      pick(managementFAQ, "What areas do you serve?"),
      pick(managementFAQ, "What makes Frontier different from other management companies?"),
    ],
  },
  {
    id: "operations",
    title: "How the cabin actually gets run",
    blurb: "Cleaning, guests, pricing, reporting, and your own stays.",
    items: [
      pick(managementFAQ, "How does cleaning work?"),
      pick(managementFAQ, "How do you set pricing for my property?"),
      pick(managementFAQ, "How is your pricing strategy different?"),
      pick(managementFAQ, "What is your policy on parties and events?"),
      pick(managementFAQ, "Can I still use my cabin for personal stays?"),
      pick(managementFAQ, "How do I see how my property is performing?"),
      pick(LOCAL_SERVICES_FAQ, "Will you talk to my guests?"),
    ],
  },
  {
    id: "home-care",
    title: "Home Care Concierge",
    blurb:
      "Monthly care for private second homes, owner-used vacation homes, and self-managed rentals. What the base plan covers, and what it does not.",
    items: [
      pick(HOME_CARE_FAQ, "Is every guest turnover included?"),
      pick(HOME_CARE_FAQ, "How often do you visit?"),
      pick(HOME_CARE_FAQ, "Is monthly hot-tub attention enough?"),
      pick(HOME_CARE_FAQ, "Will you collect packages every day?"),
      pick(HOME_CARE_FAQ, "Will you handle emergencies?"),
      pick(HOME_CARE_FAQ, "Can you work alongside another property manager?"),
      pick(HOME_CARE_FAQ, "What area do you cover?"),
    ],
  },
  {
    id: "compliance",
    title: "Taxes, permits, and insurance",
    blurb:
      "The parts that are boring right up until they are expensive. We are not attorneys or CPAs, and we say so.",
    items: [
      pick(managementFAQ, "Do you handle occupancy taxes and permits?"),
      pick(managementFAQ, "What insurance do I need?"),
      pick(hochatownFAQ, "Do I need a permit to operate a short-term rental in Hochatown?"),
    ],
  },
  {
    id: "market",
    title: "The Broken Bow and Hochatown market",
    blurb: "What drives demand here, and what actually books.",
    items: [
      pick(hochatownFAQ, "Is Hochatown a good market for a short-term rental?"),
      pick(hochatownFAQ, "How does Hochatown compare to Broken Bow for cabin investment?"),
      pick(hochatownFAQ, "What drives peak rates in Hochatown?"),
      pick(hochatownFAQ, "What amenities book best for Hochatown cabins?"),
      pick(hochatownFAQ, "Do you work with owners outside of Hochatown?"),
    ],
  },
];

/** Flat list, for FAQPage structured data. */
export const allFAQItems: FAQItem[] = faqGroups.flatMap((g) => g.items);
