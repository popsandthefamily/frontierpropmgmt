import type { Metadata } from "next";
import { Yanone_Kaffeesatz, Work_Sans } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { JsonLd } from "@/components/seo/json-ld";
import { googleProfileUrl, plans, siteConfig } from "@/data/site";
import { homeCare } from "@/data/home-care";
import "./globals.css";

const yanone = Yanone_Kaffeesatz({
  variable: "--font-yanone",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Broken Bow Property Management & Home Care | Frontier",
    template: "%s | Frontier",
  },
  description:
    "Full-service STR management and Home Care Concierge in Broken Bow and Hochatown. Local care for rental cabins and private second homes, from an owner-operated team that runs its own cabin in the same market.",
  keywords: [
    "Broken Bow cabin rentals",
    "Hochatown cabin rentals",
    "cabin management Broken Bow",
    "STR management Hochatown",
    "vacation rental management Oklahoma",
    "short-term rental management Broken Bow",
    "Broken Bow property management",
    "Hochatown property manager",
    "book direct Broken Bow cabin",
    "luxury cabin Hochatown",
    "McCurtain County cabin rentals",
    "Beavers Bend cabin",
    "Frontier Property Management",
    "Broken Bow cabin cleaning service",
    "Hochatown turnover cleaning",
    "cabin maintenance Broken Bow Oklahoma",
    "Dallas cabin owner management",
    "DFW Broken Bow cabin management",
    "remote cabin management Dallas Texas",
    "Dallas vacation rental investment Broken Bow",
    "second home care Broken Bow",
    "home watch Hochatown",
    "vacation home maintenance Broken Bow Oklahoma",
    "home care concierge Broken Bow",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Frontier Property Management",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury cabin in Hochatown managed by Frontier Property Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Frontier Property Management | STR Management & Home Care in Broken Bow",
    description:
      "Let us run your short-term rental, or keep your home cared for while you keep control. Full management at 20% of net rental revenue, or Home Care Concierge from $500 a month.",
  },
  // No root-level canonical: each page declares its own so that nested
  // routes never inherit the homepage URL.
  verification: {
    // Google: handled by the static file public/google39354f42bb809440.html
    // Bing: add your Bing Webmaster Tools meta tag here once the site is
    // registered at https://www.bing.com/webmasters. Leave the value empty
    // to skip the tag; Next.js omits empty values.
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yanone.variable} ${workSans.variable}`}>
      <body className="antialiased font-body text-foreground bg-background">
        {/* Structured Data: the one business entity every service page
            points at through its @id. LocalBusiness rather than
            RealEstateAgent: Frontier manages and cares for property; it
            does not hold itself out as a licensed brokerage. */}
        <JsonLd
          type="LocalBusiness"
          data={{
            "@id": `${siteConfig.url}/#business`,
            name: siteConfig.name,
            legalName: "Frontier Property Management LLC",
            description: `${siteConfig.description} Full-service STR management at ${plans.manager.feeInline}, or ${plans.concierge.name} ${plans.concierge.feeInline} with the scope confirmed after a walkthrough. Owner-operated, based in Broken Bow, Oklahoma.`,
            url: siteConfig.url,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            image: `${siteConfig.url}/images/logos/Asset-1-2.png`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "3156 Old Broken Bow Hwy",
              addressLocality: "Broken Bow",
              addressRegion: "OK",
              postalCode: "74728",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 34.1515,
              longitude: -94.7685,
            },
            // Where the work happens. Owners who live in Dallas are a
            // market, not a service area.
            areaServed: [
              { "@type": "Place", name: "Broken Bow, Oklahoma" },
              { "@type": "Place", name: "Hochatown, Oklahoma" },
              { "@type": "Place", name: "McCurtain County, Oklahoma" },
            ],
            openingHours: "Mo-Fr 09:00-17:00",
            sameAs: [
              siteConfig.social.instagram,
              siteConfig.social.facebook,
              googleProfileUrl,
            ],
            priceRange: "$$",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Property management and home care services",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: `Full-Service STR Management (${plans.manager.name} plan)`,
                  url: `${siteConfig.url}${plans.manager.href}`,
                  availability: "https://schema.org/LimitedAvailability",
                  itemOffered: {
                    "@type": "Service",
                    "@id": `${siteConfig.url}${plans.manager.href}#service`,
                    name: "Full-service short-term rental management",
                    description: plans.manager.summary,
                  },
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "USD",
                    description: plans.manager.feeDefinition,
                  },
                },
                {
                  "@type": "Offer",
                  name: `${plans.concierge.name} base plan`,
                  url: `${siteConfig.url}${plans.concierge.href}`,
                  availability: "https://schema.org/LimitedAvailability",
                  itemOffered: {
                    "@type": "Service",
                    "@id": `${siteConfig.url}${plans.concierge.href}#service`,
                    name: `${plans.concierge.name}, second-home and cabin care`,
                    description: plans.concierge.summary,
                  },
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: plans.concierge.basePrice,
                    priceCurrency: "USD",
                    description: `${homeCare.priceLine} ${homeCare.priceQualifier}`,
                  },
                },
                {
                  "@type": "Offer",
                  name: plans.local.name,
                  url: `${siteConfig.url}${plans.local.href}`,
                  itemOffered: {
                    "@type": "Service",
                    "@id": `${siteConfig.url}${plans.local.href}#service`,
                    name: `${plans.local.name}, turnover cleaning, maintenance, and logistics`,
                    description: plans.local.summary,
                  },
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "USD",
                    description: plans.local.feeDefinition,
                  },
                },
                {
                  "@type": "Offer",
                  url: `${siteConfig.url}/search`,
                  itemOffered: {
                    "@type": "Service",
                    name: "Direct cabin bookings",
                    description:
                      "Book Frontier's own cabins directly, with no platform service fee added.",
                  },
                },
              ],
            },
          }}
        />
        {/* Structured Data, WebSite with SearchAction */}
        <JsonLd
          type="WebSite"
          data={{
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
            publisher: { "@id": `${siteConfig.url}/#business` },
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <SiteHeader />
        <main className="min-h-screen overflow-x-clip">{children}</main>
        <SiteFooter />
        <ScrollToTop />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-K4TS7SM2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-K4TS7SM2');
            gtag('config', 'AW-17777139722');
          `}
        </Script>
      </body>
    </html>
  );
}
