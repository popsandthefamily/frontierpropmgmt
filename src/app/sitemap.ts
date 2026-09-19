import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getBlogPosts } from "@/data/blog-posts";

const baseUrl = siteConfig.url;

/**
 * Static pages with the date their content last materially changed.
 *
 * These are maintained by hand rather than set to build time: Google reads
 * lastModified as a signal and ignores it once it notices every page
 * claims to have changed on every deploy. Bump a date when you change the
 * page's substance, not its styling. The initial values are the last
 * content commit for each route as of 2026-09-19.
 *
 * Only canonical, indexable pages belong here. Portal, admin, signing,
 * audit results, API routes, and query variants of /contact are excluded
 * on purpose.
 */
const STATIC_PAGES: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-09-19" },
  { path: "/management-services", lastModified: "2026-09-19" },
  { path: "/home-care-concierge", lastModified: "2026-09-19" },
  { path: "/local-services", lastModified: "2026-09-19" },
  { path: "/pricing", lastModified: "2026-09-19" },
  { path: "/faq", lastModified: "2026-09-19" },
  { path: "/contact", lastModified: "2026-09-19" },
  { path: "/about", lastModified: "2026-09-19" },
  { path: "/search", lastModified: "2026-09-03" },
  { path: "/income-calculator", lastModified: "2026-04-21" },
  { path: "/audit", lastModified: "2026-04-27" },
  { path: "/discover-broken-bow", lastModified: "2026-09-03" },
  { path: "/hochatown-property-management", lastModified: "2026-09-19" },
  { path: "/broken-bow-property-management", lastModified: "2026-09-19" },
  { path: "/dallas-cabin-owners", lastModified: "2026-09-19" },
  { path: "/airbnb-management-hochatown-ok", lastModified: "2026-08-19" },
  { path: "/best-hochatown-property-management-company", lastModified: "2026-08-19" },
  { path: "/broken-bow-cabin-management-fees", lastModified: "2026-09-03" },
  { path: "/switch-property-managers-broken-bow", lastModified: "2026-08-19" },
  { path: "/rental-agreement", lastModified: "2026-04-20" },
  { path: "/privacy-policy", lastModified: "2026-04-20" },
  { path: "/blogs", lastModified: "2026-08-19" },
  { path: "/sublime", lastModified: "2026-09-02" },
  { path: "/old-broken-bow-highway", lastModified: "2026-09-02" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date(p.lastModified),
  }));

  // Drafts are excluded by getBlogPosts(), so unpublished articles never
  // reach the sitemap.
  const blogPosts: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...blogPosts];
}
