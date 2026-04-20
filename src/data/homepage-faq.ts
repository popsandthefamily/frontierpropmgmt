import { managementFAQ } from "./services";

/**
 * Homepage FAQ, curated subset of the full management FAQ.
 *
 * Order and selection follows the redesign spec §3.9 (10 owner-aimed
 * questions). Answers live in `src/data/services.ts`, edits there
 * propagate here and to /management-services automatically.
 */
const QUESTION_ORDER = [
  "What is your management fee? Are there any markups on top?",
  "Is there a long-term contract?",
  "What happens to my existing bookings if I switch to Frontier?",
  "Can I still use my cabin for personal stays?",
  "How does cleaning work?",
  "How do I see how my property is performing?",
  "Do you handle occupancy taxes and permits?",
  "What insurance do I need?",
  "How is your pricing strategy different?",
  "What makes Frontier different from other management companies?",
] as const;

export const homepageOwnerFAQ = QUESTION_ORDER.map((q) => {
  const match = managementFAQ.find((item) => item.question === q);
  if (!match) {
    throw new Error(`homepage-faq: missing question "${q}" in managementFAQ`);
  }
  return match;
});
