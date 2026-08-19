import { managementFAQ, type FAQItem } from "./services";
import { hochatownFAQ } from "./hochatown-faq";
import { LOCAL_SERVICES_FAQ } from "./local-services";
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
    title: "Choosing between the two plans",
    blurb:
      "Frontier runs two plans and nothing in between. The difference is who holds the guest relationship.",
    items: [
      {
        question: "What are the two plans, in one sentence each?",
        answer: `${plans.manager.name} is full-service management at ${plans.manager.feeInline}: we run the listing, the pricing, the guests, the cleaning, the maintenance, and the taxes. ${plans.local.name} is ${plans.local.feeInline}: you keep the listing and the bookings, and we handle the cleaning turns, maintenance, seasonal checks, and logistics that need somebody physically on site.`,
      },
      {
        question: "Which plan is right for my cabin?",
        answer:
          "If you do not want to think about the cabin, take the Property Manager plan. If you enjoy running the listing and pricing it yourself but keep getting burned on cleaners and maintenance from three hours away, take Local Services. The honest test is whether you want to keep answering guest messages: that single question sorts almost every owner correctly.",
      },
      pick(LOCAL_SERVICES_FAQ, "Can I use Local Services if another company manages my cabin?"),
      pick(LOCAL_SERVICES_FAQ, "Can I start on Local Services and move to full management later?"),
      {
        question: "Do you have anything cheaper than these two plans?",
        answer:
          "No. We used to sell a flat-fee marketing and listing plan and retired it, because it sat awkwardly between the two things owners actually need: someone running the property, or someone on the ground. Adding a third tier would have made all three worse.",
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
      pick(LOCAL_SERVICES_FAQ, "How much does Local Services cost?"),
      pick(LOCAL_SERVICES_FAQ, "Why not just publish a price list?"),
      pick(LOCAL_SERVICES_FAQ, "Do you mark up vendor invoices?"),
      {
        question: "What if my cabin earns nothing in a month?",
        answer:
          "On the Property Manager plan you owe us nothing. The fee is a percentage of income, and there is no monthly minimum and no setup fee, so a dead month costs you nothing in management. Local Services is different: it is payment for work performed, so if we cleaned and serviced the cabin during a month with no bookings, that work is still invoiced.",
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
