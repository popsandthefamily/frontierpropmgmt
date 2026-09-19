import { managementFAQ, type FAQItem } from "./services";
import { HOME_CARE_FAQ } from "./home-care";
import { plans } from "./site";

/**
 * Homepage FAQ: the questions an owner asks before choosing between full
 * management and Home Care Concierge. Answers are pulled by reference from
 * their source lists so editing them there updates the homepage too.
 */
function pick(source: FAQItem[], question: string): FAQItem {
  const match = source.find((item) => item.question === question);
  if (!match) {
    throw new Error(`homepage-faq: missing question "${question}"`);
  }
  return match;
}

export const homepageOwnerFAQ: FAQItem[] = [
  {
    question: "What is the difference between the two services?",
    answer: `${plans.manager.name} means we operate the rental business: pricing, listings, guests, cleaning turns, maintenance, taxes, and a monthly statement, for ${plans.manager.feeInline}. ${plans.concierge.name} means you keep control and we perform agreed physical care of the property once a month, ${plans.concierge.feeInline}. One is not a cheaper version of the other; they answer different questions.`,
  },
  pick(HOME_CARE_FAQ, "Does my home have to be rented?"),
  pick(HOME_CARE_FAQ, "Can I use this for a short-term rental?"),
  pick(HOME_CARE_FAQ, "What does the $500 base plan cover?"),
  pick(HOME_CARE_FAQ, "Is every guest turnover included?"),
  pick(managementFAQ, "What is your management fee? Are there any markups on top?"),
  pick(managementFAQ, "Is there a long-term contract?"),
  pick(managementFAQ, "Can I still use my cabin for personal stays?"),
  pick(HOME_CARE_FAQ, "What area do you cover?"),
];
