export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    name: "Hunter Collins",
    role: "Owner & Founder",
    image: "/images/team/hunter-collins.jpg",
    alt: "Hunter Collins, owner of Frontier Property Management",
    bio: "Hunter didn't grow up in Broken Bow, but he married into it. His background is in Maine woodlands — real seasons, real storms, real quiet — and he brings a triple perspective to Frontier: cabin owner, property manager, and frequent Airbnb guest. That combination shapes every operational decision, from pricing strategy to how guest issues get handled at midnight.",
  },
  {
    name: "Beth Collins",
    role: "Advisor",
    image: "/images/team/beth-collins.jpg",
    alt: "Beth Collins, advisor to Frontier Property Management",
    bio: "Beth grew up in Broken Bow. The woods, the back roads, the cleaning crews who show up in a storm, and the small-town businesses that keep guests coming back — those relationships aren't something she learned for this job, they're her hometown. She advises Frontier on local market conditions, vendor relationships, and the community knowledge an out-of-town manager simply doesn't have.",
  },
];
