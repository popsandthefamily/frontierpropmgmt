export interface NavChild {
  label: string;
  href: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Management Services", href: "/management-services" },
  {
    label: "Our Cabins",
    href: "/search",
    children: [
      {
        label: "Sublime Retreat",
        href: "/sublime",
        description: "A luxury cabin experience in Hochatown",
      },
      {
        label: "Old Broken Bow Highway",
        href: "/old-broken-bow-highway",
        description: "Rustic charm meets modern comfort",
      },
      {
        label: "Search Properties",
        href: "/search",
        description: "Browse all available cabins",
      },
    ],
  },
  { label: "Discover Broken Bow", href: "/discover-broken-bow" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  company: [
    { label: "About", href: "/about" },
    { label: "Management Services", href: "/management-services" },
    { label: "Contact", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
  ],
  properties: [
    { label: "Sublime Retreat", href: "/sublime" },
    { label: "Old Broken Bow Highway", href: "/old-broken-bow-highway" },
    { label: "Search Properties", href: "/search" },
  ],
  resources: [
    { label: "Discover Broken Bow", href: "/discover-broken-bow" },
    { label: "Income Calculator", href: "/income-calculator" },
  ],
};
