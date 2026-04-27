export interface FlagshipCaseStudy {
  name: string;
  location: string;
  headline: string;
  summary: string;
  proofPoints: string[];
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  propertyHref: string;
}

export const flagshipCaseStudy: FlagshipCaseStudy = {
  name: "Sublime Retreat",
  location: "Hochatown / Broken Bow, Oklahoma",
  headline: "The cabin we operate ourselves",
  summary:
    "Frontier's management approach was built by operating our own high-performing cabin in the same market our owner partners care about. Every system on this page — pricing, listings, cleaning, guest messaging, maintenance — is tested on Sublime Retreat first.",
  proofPoints: [
    "Airbnb Top Rated Host on this cabin",
    "Direct booking site to lower platform dependence",
    "Dynamic pricing reviewed around local events and peak weekends",
    "Guest messaging, cleaning standards, and maintenance systems tested on our own property",
  ],
  image: {
    src: "/images/properties/sublime/sublime-2.jpg",
    alt: "Sublime Retreat — the Hochatown cabin Frontier operates as its flagship",
  },
  cta: {
    label: "Run a free audit for your cabin",
    href: "/audit#full-audit",
  },
  propertyHref: "/sublime",
};
