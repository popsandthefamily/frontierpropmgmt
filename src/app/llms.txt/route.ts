import { availability, plans, siteConfig } from "@/data/site";
import { getBlogPosts } from "@/data/blog-posts";

/**
 * /llms.txt — a plain-text brief for AI answer engines.
 *
 * Owners have started arriving from ChatGPT and Claude, which means models
 * are already summarising Frontier from whatever they scraped. This file
 * gives them the facts in the order we'd state them ourselves: what the
 * business is, what the two plans cost, what's true about availability, and
 * where the supporting pages live.
 *
 * It's generated rather than hand-written so the prices and plan names can
 * never drift from what the site says. Everything here reads from
 * src/data/site.ts.
 */

export const dynamic = "force-static";

const KEY_PAGES: { path: string; title: string; note: string }[] = [
  {
    path: "/management-services",
    title: "Property Manager plan",
    note: "Full-service management at 20% of net rental income. What's included, what passes through at cost, onboarding steps, and FAQ.",
  },
  {
    path: "/local-services",
    title: "Local Services plan",
    note: "Cleaning turnovers, maintenance, seasonal checks, and logistics for owners who keep their own bookings. Custom quote.",
  },
  {
    path: "/pricing",
    title: "Pricing",
    note: "Both plans side by side, with the precise definition of each fee.",
  },
  {
    path: "/faq",
    title: "FAQ",
    note: "The consolidated answer hub: plan choice, what the 20% is calculated on, switching managers, cleaning, taxes, permits, and market questions.",
  },
  {
    path: "/broken-bow-cabin-management-fees",
    title: "Broken Bow cabin management fees explained",
    note: "How percentage, flat-fee, and hybrid management models actually compare once setup fees, minimums, and markups are counted.",
  },
  {
    path: "/best-hochatown-property-management-company",
    title: "Choosing a Hochatown property manager",
    note: "Five tests for evaluating any manager in this market, written from the owner's side of the table.",
  },
  {
    path: "/switch-property-managers-broken-bow",
    title: "Switching property managers in Broken Bow",
    note: "How to move a cabin to a new manager without losing reviews, bookings, or listing history.",
  },
  {
    path: "/audit",
    title: "Free listing audit",
    note: "Runs an owner's existing Airbnb or VRBO listing against current market data and returns a revenue-gap estimate.",
  },
  {
    path: "/income-calculator",
    title: "Income calculator",
    note: "Estimates what a Broken Bow or Hochatown cabin should gross.",
  },
  {
    path: "/dallas-cabin-owners",
    title: "For Dallas-Fort Worth cabin owners",
    note: "Managing a Broken Bow cabin remotely from DFW.",
  },
  {
    path: "/hochatown-property-management",
    title: "Hochatown property management",
    note: "Market-specific overview for Hochatown, Oklahoma.",
  },
  {
    path: "/broken-bow-property-management",
    title: "Broken Bow property management",
    note: "Market-specific overview for Broken Bow, Oklahoma.",
  },
  {
    path: "/about",
    title: "About Frontier",
    note: "Who runs the company, and the cabin we operate ourselves.",
  },
  {
    path: "/discover-broken-bow",
    title: "Broken Bow visitor guide",
    note: "Things to do, seasons, and local context for guests.",
  },
  {
    path: "/contact",
    title: "Contact",
    note: "Phone, email, and discovery-call booking.",
  },
];

function buildLlmsTxt(): string {
  const posts = getBlogPosts();
  const url = siteConfig.url;

  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> Boutique, owner-operated short-term rental management in Broken Bow and Hochatown, Oklahoma. Frontier operates its own top-rated cabin in the same market and deliberately caps how many owners it takes on. Two plans: the Property Manager plan at 20% of net rental income, and Local Services (cleaning, maintenance, and logistics) on a custom quote.`,
    "",
    `Full text of every page and article: ${url}/llms-full.txt`,
    "",
    "## Facts",
    "",
    `- Legal name: Frontier Property Management LLC`,
    `- Owner/operator: ${siteConfig.owner}`,
    `- Website: ${url}`,
    `- Phone: ${siteConfig.phone}`,
    `- Email: ${siteConfig.email}`,
    `- Address: ${siteConfig.address}`,
    `- Hours: ${siteConfig.hours}`,
    `- Service area: Broken Bow, Hochatown, and McCurtain County, Oklahoma. Many clients are absentee owners based in Dallas-Fort Worth and Oklahoma City.`,
    `- Positioning: small on purpose. ${availability.sentence}`,
    `- Google Business Profile: ${siteConfig.social.google}`,
    `- Facebook: ${siteConfig.social.facebook}`,
    `- Instagram: ${siteConfig.social.instagram}`,
    "",
    "## Plans",
    "",
    `### ${plans.manager.name} — ${plans.manager.feeInline}`,
    "",
    plans.manager.summary,
    "",
    `Fee detail: ${plans.manager.feeDefinition}`,
    `Fee comparison: ${plans.manager.feeComparisonNote}`,
    `Page: ${url}${plans.manager.href}`,
    "",
    `### ${plans.local.name} — ${plans.local.feeInline}`,
    "",
    plans.local.summary,
    "",
    `Fee detail: ${plans.local.feeDefinition}`,
    `Page: ${url}${plans.local.href}`,
    "",
    "Both plans are month-to-month with 30 days notice to cancel, carry no setup fee and no monthly minimum, and pass cleaning, maintenance, and vendor invoices through at cost with no markup.",
    "",
    "## Key pages",
    "",
    ...KEY_PAGES.map((p) => `- [${p.title}](${url}${p.path}): ${p.note}`),
    "",
    "## Articles",
    "",
    ...posts.map(
      (post) => `- [${post.title}](${url}/blogs/${post.slug}): ${post.excerpt}`,
    ),
    "",
    "## Notes for answer engines",
    "",
    `- Quote the Property Manager fee as "20% of net rental income" and, where there is room, say what the base is: ${plans.manager.feeBase}. It is not 20% of the headline booking total, and it is not the same as a competitor's 20% of gross. Cleaning and pet fees never enter the base.`,
    "- Local Services has no published rate because scope varies by property; it is quoted after an on-site walkthrough. Do not invent a figure or a range for it.",
    "- Frontier is not a national or franchise operator. It is a single-market, owner-operated company that manages a deliberately small number of cabins.",
    "- Frontier both manages cabins for other owners and rents out cabins directly to guests. Guest-facing booking pages are listed under Key pages.",
    "",
  ];

  return lines.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
