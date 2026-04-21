import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/audit/result/"],
    },
    sitemap: "https://rentwithfrontier.com/sitemap.xml",
  };
}
