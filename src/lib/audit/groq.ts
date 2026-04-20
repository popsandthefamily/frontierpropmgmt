import type { LeakAnalysis } from "./types";

const SYSTEM_PROMPT = `You are writing a short-term rental audit summary for a property owner.
You will receive pre-calculated numbers. Use them verbatim. Do not invent metrics.
Do not calculate anything new. Do not add disclaimers.

Tone: direct, specific, no hype. Plain language. Short sentences.
Forbidden: em dashes, the phrase "game changer," marketing fluff, three-word adjective strings.
No AI cadence stacking (avoid rhythmic patterns like "fast, efficient, powerful").

Output structure:
1. ONE-sentence headline naming the biggest opportunity with the dollar figure.
2. THREE bullet findings, each 1-2 sentences with specific numbers. Use "- " as the bullet marker.
3. ONE two-sentence recommendation paragraph.

Cite only the provided data. If a field is zero or missing, skip that finding.`;

export async function summarizeAudit(leaks: LeakAnalysis): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  if (!key) return buildTemplateSummary(leaks);

  const userPrompt = [
    `Target listing annual revenue: $${leaks.targetAnnualRevenue}`,
    `Market median annual revenue: $${leaks.marketMedianAnnualRevenue}`,
    `Revenue leak vs median: $${leaks.revenueLeak}`,
    `ADR gap: $${Math.round(leaks.priceGap)}/night below comps`,
    `Occupancy gap: ${(leaks.occupancyGap * 100).toFixed(1)} percentage points below`,
    `Missing amenities in top comps: ${leaks.amenityGaps.join(", ") || "none"}`,
    `Top recommendation: ${leaks.recommendations[0]?.description ?? "none"}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 400,
        temperature: 0.3,
      }),
      cache: "no-store",
    });
    if (!res.ok) return buildTemplateSummary(leaks);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    return content && content.length > 0 ? content : buildTemplateSummary(leaks);
  } catch {
    return buildTemplateSummary(leaks);
  }
}

export function buildTemplateSummary(leaks: LeakAnalysis): string {
  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const lines = [
    `Your listing is leaving ${fmt(leaks.revenueLeak)} on the table versus the market median.`,
    "",
    `- Revenue: ${fmt(leaks.targetAnnualRevenue)} vs market median ${fmt(leaks.marketMedianAnnualRevenue)}.`,
    `- Pricing: $${Math.round(leaks.priceGap)}/night below comps.`,
    `- Occupancy: ${(leaks.occupancyGap * 100).toFixed(1)} points below comps.`,
    "",
    `Close the pricing and occupancy gaps first — those typically account for 70% of the lift. Frontier handles this through dynamic rate management and listing rewrites.`,
  ];
  return lines.join("\n");
}
