import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Paths no crawler should index, AI or otherwise. Every route here is also
 * protected by real access control or a noindex tag; robots is a courtesy
 * to well-behaved crawlers, not the security boundary.
 */
const DISALLOW = ["/api/", "/admin/", "/audit/result/", "/portal/", "/sign/"];

/**
 * Answer-engine crawlers, listed explicitly.
 *
 * A wildcard `allow` already covers these, but naming them does two useful
 * things: it survives any future tightening of the wildcard rule, and it
 * documents that being cited by ChatGPT, Claude, and Perplexity is
 * intentional rather than an oversight. Owners have started finding
 * Frontier through those tools, so this is a channel worth protecting.
 *
 * Google-Extended is Google's separate token for whether content may be
 * used to train and ground Gemini models. It does not affect Google Search
 * ranking, and it does not control AI Overviews or AI Mode, which use the
 * ordinary Googlebot crawl. Allowing it here is a deliberate choice to let
 * Gemini learn from the site; change it only if the owner wants otherwise.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
