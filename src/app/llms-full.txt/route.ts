import { availability, partners, plans, siteConfig } from "@/data/site";
import { getBlogPosts } from "@/data/blog-posts";
import { faqGroups } from "@/data/faq";
import {
  addOns,
  detailedServices,
  onboardingSteps,
  servicePillars,
} from "@/data/services";
import { COMPARISON_FOOTNOTE, comparisonRows } from "@/data/comparison";
import {
  LOCAL_SERVICE_GROUPS,
  LOCAL_SERVICES_NOT_INCLUDED,
  LOCAL_SERVICES_STEPS,
} from "@/data/local-services";
import {
  HOME_CARE_AUDIENCES,
  HOME_CARE_FAQ,
  HOME_CARE_NOT_INCLUDED,
  HOME_CARE_PRICING_NOTES,
  HOME_CARE_SCOPE,
  HOME_CARE_STEPS,
  HOME_CARE_STR_NOTE,
  SERVICE_COMPARISON_COLUMNS,
  SERVICE_COMPARISON_ROWS,
  homeCare,
} from "@/data/home-care";
import { flagshipCaseStudy } from "@/data/flagship-case-study";
import {
  sublimeAtAGlance,
  sublimeGoodFit,
  sublimeGuestFAQ,
  sublimeNotAFit,
  sublimeSummary,
} from "@/data/sublime";

/**
 * /llms-full.txt — the whole substance of the site as plain text.
 *
 * Where /llms.txt is an index, this is the corpus: every service, every FAQ
 * answer, the full comparison table, and the complete text of every
 * article. A model that fetches this file has no reason to guess at
 * anything, which is the point — the failure mode we care about is an
 * answer engine inventing a Frontier price or policy because the real one
 * was behind three clicks of JavaScript.
 *
 * Generated from the same data the pages render, so it cannot go stale
 * independently of the site.
 */

export const dynamic = "force-static";

/** Blog bodies are HTML strings. Flatten them to readable plain text. */
function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|h[1-6]|li|ul|ol|blockquote|div)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

function buildLlmsFullTxt(): string {
  const url = siteConfig.url;
  const posts = getBlogPosts();
  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines);

  push(
    `# ${siteConfig.name} — full site content`,
    "",
    `> Complete plain-text content for Frontier Property Management, an owner-operated company in Broken Bow and Hochatown, Oklahoma. ${siteConfig.description} The index version of this file is at /llms.txt.`,
    "",
    "## Business facts",
    "",
    `- Legal name: Frontier Property Management LLC`,
    `- Owner and operator: ${siteConfig.owner}`,
    `- Website: ${url}`,
    `- Phone: ${siteConfig.phone}`,
    `- Email: ${siteConfig.email}`,
    `- Address: ${siteConfig.address}`,
    `- Hours: ${siteConfig.hours}`,
    `- Service area: Broken Bow, Hochatown, and nearby McCurtain County, Oklahoma. Many owners are absentee, based in Dallas-Fort Worth or Oklahoma City; Frontier does not operate in those cities.`,
    `- Hot-tub partner: ${partners.hotTub.name}, ${partners.hotTub.url}, ${partners.hotTub.phone}. ${partners.hotTub.sentence}`,
    `- Google Business Profile: ${siteConfig.social.google}`,
    `- Facebook: ${siteConfig.social.facebook}`,
    `- Instagram: ${siteConfig.social.instagram}`,
    "",
    "## Positioning",
    "",
    availability.long,
    "",
    "## Services",
    "",
    "Two primary services, full-service STR management and Home Care Concierge, plus a supporting local-support offer for self-managed rentals. The distinction is who operates the rental business versus who performs agreed physical property care.",
    "",
  );

  for (const plan of [plans.manager, plans.concierge, plans.local]) {
    push(
      `### ${plan.name} — ${plan.feeInline}`,
      "",
      plan.tagline,
      "",
      plan.summary,
      "",
      `Fee detail: ${plan.feeDefinition}`,
      `Page: ${url}${plan.href}`,
      "",
    );
  }

  push(
    "### How a competitor's percentage compares",
    "",
    plans.manager.feeComparisonNote,
    "",
    "### Management vs. Home Care Concierge",
    "",
    `| Feature | ${SERVICE_COMPARISON_COLUMNS.map((c) => c.label).join(" | ")} |`,
    `| --- | ${SERVICE_COMPARISON_COLUMNS.map(() => "---").join(" | ")} |`,
    ...SERVICE_COMPARISON_ROWS.map(
      (row) =>
        `| ${row.label} | ${SERVICE_COMPARISON_COLUMNS.map((c) => row.values[c.key]).join(" | ")} |`,
    ),
    "",
    "## Property Manager plan, in detail",
    "",
    "### Service pillars",
    "",
  );

  for (const pillar of servicePillars) {
    push(`**${pillar.title}.** ${pillar.description}`, "", ...pillar.features.map((f) => `- ${f}`), "");
  }

  push("### Detailed services", "");
  for (const service of detailedServices) {
    push(`**${service.title}.** ${service.description}`, "", ...service.features.map((f) => `- ${f}`), "");
  }

  push("### Onboarding", "");
  for (const step of onboardingSteps) {
    push(`${step.number}. **${step.title}** — ${step.description}`);
  }
  push("");

  push("### Optional add-ons", "");
  for (const addon of addOns) {
    push(
      `**${addon.name}.** ${addon.description}`,
      "",
      ...addon.features.map((f) => `- ${f}`),
      "",
    );
  }

  push(
    "## Home Care Concierge, in detail",
    "",
    `${homeCare.priceLine} ${homeCare.priceQualifier}`,
    "",
    "### Who it is for",
    "",
    ...HOME_CARE_AUDIENCES.map((a) => `**${a.label}.** ${a.body}`),
    "",
    HOME_CARE_STR_NOTE,
    "",
    "### What the base plan includes",
    "",
    ...HOME_CARE_SCOPE.map((b) => `**${b.title}.** ${b.body} Boundary: ${b.boundary}`),
    "",
    "### Quoted separately",
    "",
    ...HOME_CARE_NOT_INCLUDED.map((i) => `- ${i}`),
    "",
    "### How pricing works",
    "",
    ...HOME_CARE_PRICING_NOTES.map((n) => `- ${n}`),
    "",
    "### How Home Care Concierge starts",
    "",
    ...HOME_CARE_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.body}`),
    "",
    "### Home Care Concierge FAQ",
    "",
    ...HOME_CARE_FAQ.flatMap((f) => [`**${f.question}**`, "", f.answer, ""]),
  );

  push("## STR Cleaning & Local Support, in detail", "");
  for (const group of LOCAL_SERVICE_GROUPS) {
    push(`### ${group.title}`, "", group.summary, "", ...group.items.map((i) => `- ${i}`), "");
  }
  push(
    "### Not included in local support",
    "",
    ...LOCAL_SERVICES_NOT_INCLUDED.map((i) => `- ${i}`),
    "",
    "### How local support starts",
    "",
    ...LOCAL_SERVICES_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.body}`),
    "",
  );

  push(
    "## How Frontier compares to other management options",
    "",
    "| | Self-manage | Vacasa | Evolve | Frontier |",
    "| --- | --- | --- | --- | --- |",
    ...comparisonRows.map(
      (row) =>
        `| ${row.label} | ${row.selfManage} | ${row.vacasa} | ${row.evolve} | ${row.frontier} |`,
    ),
    "",
    COMPARISON_FOOTNOTE,
    "",
    "## The cabin Frontier operates itself",
    "",
    `${flagshipCaseStudy.name}, ${flagshipCaseStudy.location}. ${flagshipCaseStudy.headline}.`,
    "",
    flagshipCaseStudy.summary,
    "",
    ...flagshipCaseStudy.proofPoints.map((p) => `- ${p}`),
    "",
  );

  push(
    "## Cabins guests can book direct",
    "",
    "Frontier manages cabins for other owners and also rents out its own. This section is for guests looking for a stay, not for owners looking for a manager.",
    "",
    "### Sublime Retreat, Hochatown, Oklahoma",
    "",
    `URL: ${url}/sublime`,
    "",
    sublimeSummary,
    "",
    "**Specifications**",
    "",
    ...sublimeAtAGlance.map((row) => `- ${row.label}: ${row.value}`),
    "",
    "**A good fit for**",
    "",
    ...sublimeGoodFit.map((item) => `- ${item}`),
    "",
    "**Not the right cabin for**",
    "",
    ...sublimeNotAFit.map((item) => `- ${item}`),
    "",
    "**Guest questions**",
    "",
  );
  for (const item of sublimeGuestFAQ) {
    push(`**Q: ${item.question}**`, "", `A: ${item.answer}`, "");
  }
  push(
    "### Old Broken Bow Highway, Broken Bow, Oklahoma",
    "",
    `URL: ${url}/old-broken-bow-highway`,
    "",
    "A 3-bedroom, 3-bathroom house with a private pool, and the property Frontier operated through its first year in business. It held roughly 15 booked nights a month through the slow season and a five-star rating for the life of the listing, on revenue that rivaled purpose-built cabins with more bedrooms. It is retired from the rental program and cannot be booked. The page is a retrospective on that first year, not a listing.",
    "",
  );

  push("## Frequently asked questions", "");
  for (const group of faqGroups) {
    push(`### ${group.title}`, "", group.blurb, "");
    for (const item of group.items) {
      push(`**Q: ${item.question}**`, "", `A: ${item.answer}`, "");
    }
  }

  push("## Articles", "");
  for (const post of posts) {
    push(
      `### ${post.title}`,
      "",
      `Published ${post.date} by ${post.author}. Category: ${post.category}.`,
      `URL: ${url}/blogs/${post.slug}`,
      "",
      post.excerpt,
      "",
      htmlToText(post.content),
      "",
      "---",
      "",
    );
  }

  return out.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
