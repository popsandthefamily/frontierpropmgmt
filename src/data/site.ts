export const siteConfig = {
  name: "Frontier Property Management",
  tagline: "Full-Service Cabin Management in Hochatown",
  description:
    "Full-service vacation rental management in Broken Bow and Hochatown, Oklahoma.",
  url: "https://rentwithfrontier.com",
  phone: "580-207-7154",
  email: "info@rentwithfrontier.com",
  address: "3156 Old Broken Bow Hwy, Broken Bow, OK 74728",
  hours: "Monday - Friday, 9:00 AM - 5:00 PM",
  owner: "Hunter Collins",
  managementFee: "20% of Gross Bookings",
  formspreeEndpoint: "https://formspree.io/f/mwpgdawq",
  social: {
    instagram: "https://www.instagram.com/rentwithfrontier",
    facebook: "https://www.facebook.com/rentwithfrontier",
  },
  analytics: {
    ga: "GT-K4TS7SM2",
    ads: "AW-17777139722",
  },
} as const;

export type SiteConfig = typeof siteConfig;
