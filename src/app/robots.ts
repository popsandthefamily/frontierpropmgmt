import type { MetadataRoute } from "next";

/** Paths no crawler should index, AI or otherwise. */
const DISALLOW = ["/api/", "/admin/", "/audit/result/"];

/**
 * Answer-engine crawlers, listed explicitly.
 *
 * A wildcard `allow` already covers these, but naming them does two useful
 * things: it survives any future tightening of the wildcard rule, and it
 * documents that being cited by ChatGPT, Claude, and Perplexity is
 * intentional rather than an oversight. Owners have started finding
 * Frontier through those tools, so this is a channel worth protecting.
 *
 * Google-Extended is the separate opt-in that governs Gemini and AI
 * Overviews; it does not affect normal Google Search ranking either way.
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
    sitemap: "https://rentwithfrontier.com/sitemap.xml",
    host: "https://rentwithfrontier.com",
  };
}
