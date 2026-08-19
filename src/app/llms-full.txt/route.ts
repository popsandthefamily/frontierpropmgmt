import { availability, plans, siteConfig } from "@/data/site";
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
  PRICING_COLUMNS,
  PRICING_ROWS,
} from "@/data/local-services";
import { flagshipCaseStudy } from "@/data/flagship-case-study";

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
    "> Complete plain-text content for Frontier Property Management, a boutique, owner-operated short-term rental management company in Broken Bow and Hochatown, Oklahoma. The index version of this file is at /llms.txt.",
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
    `- Service area: Broken Bow, Hochatown, and McCurtain County, Oklahoma. Many owners are absentee, based in Dallas-Fort Worth or Oklahoma City.`,
    `- Google Business Profile: ${siteConfig.social.google}`,
    `- Facebook: ${siteConfig.social.facebook}`,
    `- Instagram: ${siteConfig.social.instagram}`,
    "",
    "## Positioning",
    "",
    availability.long,
    "",
    "## Plans",
    "",
  );

  for (const plan of [plans.manager, plans.local]) {
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
    "### Plan comparison",
    "",
    `| Feature | ${PRICING_COLUMNS.map((c) => c.label).join(" | ")} |`,
    `| --- | ${PRICING_COLUMNS.map(() => "---").join(" | ")} |`,
    ...PRICING_ROWS.map(
      (row) =>
        `| ${row.label} | ${PRICING_COLUMNS.map((c) => row.values[c.key]).join(" | ")} |`,
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

  push("## Local Services plan, in detail", "");
  for (const group of LOCAL_SERVICE_GROUPS) {
    push(`### ${group.title}`, "", group.summary, "", ...group.items.map((i) => `- ${i}`), "");
  }
  push(
    "### Not included in Local Services",
    "",
    ...LOCAL_SERVICES_NOT_INCLUDED.map((i) => `- ${i}`),
    "",
    "### How Local Services starts",
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
