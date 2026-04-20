import type { FAQItem } from "./services";

/**
 * Hochatown-specific FAQs for /hochatown-property-management.
 *
 * Answers are kept deliberately hedged where numbers are regulatory or
 * ADR-based — those change. Anything quoted as a rate should be
 * re-verified before changing marketing language.
 */
export const hochatownFAQ: FAQItem[] = [
  {
    question: "Is Hochatown a good market for a short-term rental?",
    answer:
      "Hochatown sits at the gateway to Beavers Bend State Park and is one of the strongest cabin-rental markets in Oklahoma by occupancy and ADR. Demand is driven by drive-market guests from Dallas-Fort Worth, Oklahoma City, Houston, and Tulsa. Peak season runs spring through fall plus winter holidays, with steady weekend demand year-round. Exact revenue depends on bedroom count, amenities, and pricing strategy. Run the free audit to see real numbers for your specific cabin.",
  },
  {
    question: "Do I need a permit to operate a short-term rental in Hochatown?",
    answer:
      "Hochatown became Oklahoma's newest incorporated town in 2024 and is actively developing its short-term rental regulations. Current STR owners should watch for town-level permit requirements and plan for registration through the Granicus Host Compliance system used by many Oklahoma jurisdictions. Frontier tracks these changes and helps owners stay compliant. We are not legal advisors and recommend confirming current permit requirements with the Town of Hochatown directly.",
  },
  {
    question: "How does Hochatown compare to Broken Bow for cabin investment?",
    answer:
      "Both markets draw from the same visitor pool. Hochatown sits closer to Beavers Bend State Park, Hochatown Falls, and most of the restaurants and attractions, so cabins in Hochatown tend to command a small premium. Broken Bow proper has more lot variety, slightly lower land costs, and stronger lake access in the southern stretches. For pure vacation-rental ROI, Hochatown typically edges ahead on ADR while Broken Bow can edge ahead on cap rate. Neither is objectively better, it depends on your investment goals.",
  },
  {
    question: "What drives peak rates in Hochatown?",
    answer:
      "Peak nights are driven by fall foliage (mid-October through early November), winter holidays, Beavers Bend Marathon weekend, local fishing tournaments, spring break for Texas school districts, and long summer weekends. Our dynamic pricing software tracks these specifically rather than applying a national seasonality model. Missing even one event weekend can cost a typical cabin hundreds of dollars in revenue.",
  },
  {
    question: "What amenities book best for Hochatown cabins?",
    answer:
      "Hot tubs are nearly table stakes now. Beyond that, the amenities our data shows correlate with higher ADR and occupancy are: private pools (year-round demand has been trending up), fire pits, game rooms with arcades or pool tables, outdoor entertaining spaces with a grill, and pet-friendly policies. Our free audit will tell you which premium amenities top comps in your specific area have that your listing is missing.",
  },
  {
    question: "Do you work with owners outside of Hochatown?",
    answer:
      "Yes. We manage cabins throughout Broken Bow, Hochatown, and the surrounding McCurtain County area. Our local team and vendor network cover the full Broken Bow / Hochatown footprint. We also work with out-of-state investors, particularly the large cohort of Dallas and DFW owners. See the Dallas cabin owners page for that specific context.",
  },
];
