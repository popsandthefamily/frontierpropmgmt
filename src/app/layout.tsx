import type { Metadata } from "next";
import { Yanone_Kaffeesatz, Work_Sans } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
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
  metadataBase: new URL("https://rentwithfrontier.com"),
  title: {
    default:
      "Broken Bow & Hochatown Property Management | Frontier",
    template: "%s | Frontier",
  },
  description:
    "Book a cabin in Broken Bow & Hochatown or hire the top-rated local STR management company. Direct booking with no platform fees. Full-service vacation rental management — pricing, guests, cleanings, maintenance. 20% of nightly-rental revenue, no monthly minimum.",
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
    "Dallas cabin owner management",
    "DFW Broken Bow cabin management",
    "remote cabin management Dallas Texas",
    "Dallas vacation rental investment Broken Bow",
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
      "Frontier Property Management | Cabin Rentals & STR Management in Broken Bow",
    description:
      "Book a cabin direct or let us manage your Broken Bow vacation rental. No platform fees. 20% management fee.",
  },
  alternates: {
    canonical: "https://rentwithfrontier.com",
  },
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
        {/* Structured Data, LocalBusiness */}
        <JsonLd
          type="RealEstateAgent"
          data={{
            name: siteConfig.name,
            description:
              "Full-service short-term rental management and direct cabin bookings in Broken Bow and Hochatown, Oklahoma. Dynamic pricing, guest communication, cleaning coordination, and maintenance. 20% of nightly-rental revenue, no monthly minimum.",
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
            areaServed: [
              { "@type": "Place", name: "Broken Bow, Oklahoma" },
              { "@type": "Place", name: "Hochatown, Oklahoma" },
              { "@type": "Place", name: "McCurtain County, Oklahoma" },
              { "@type": "Place", name: "Dallas-Fort Worth, Texas" },
            ],
            openingHours: "Mo-Fr 09:00-17:00",
            sameAs: [
              siteConfig.social.instagram,
              siteConfig.social.facebook,
              siteConfig.social.google,
            ],
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.95",
              bestRating: "5",
              ratingCount: "47",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Cabin Management Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Full-Service STR Management",
                    description:
                      "Complete vacation rental management including dynamic pricing, guest communication, cleaning, and maintenance",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Direct Cabin Bookings",
                    description:
                      "Book luxury cabins directly with no platform fees, best rate guaranteed",
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
            name: siteConfig.name,
            url: siteConfig.url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
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
