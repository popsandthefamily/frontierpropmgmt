import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rentwithfrontier.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/management-services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/income-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/discover-broken-bow`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/hochatown-property-management`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/broken-bow-property-management`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dallas-cabin-owners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/airbnb-management-hochatown-ok`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/best-hochatown-property-management-company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/broken-bow-cabin-management-fees`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/switch-property-managers-broken-bow`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/rental-agreement`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const propertyPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/sublime`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/old-broken-bow-highway`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const blogPosts: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blogs/managing-broken-bow-cabin-from-dallas`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/best-time-to-visit-broken-bow`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/broken-bow-cabin-hot-tub-private-pool`,
      lastModified: new Date("2026-03-25"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/why-dallas-investors-buying-broken-bow-cabins`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/what-you-need-to-know-before-this-weekends-winter-storm-hits-hochatown`,
      lastModified: new Date("2026-01-21"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blogs/how-frontier-property-management-smooths-the-transition-amid-airbnbs-fee-overhaul`,
      lastModified: new Date("2025-10-13"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blogs/nights-number-taxes-hochatown`,
      lastModified: new Date("2025-10-09"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...propertyPages, ...blogPosts];
}
