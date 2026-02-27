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
      "Frontier Property Management | Cabin Management in Hochatown & Broken Bow",
    template: "%s | Frontier Property Management",
  },
  description:
    "Full-service vacation rental management in Broken Bow and Hochatown, Oklahoma. We handle pricing, guests, cleanings, and maintenance — so you can enjoy stress-free rental income.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Frontier Property Management",
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
        {/* Structured Data — LocalBusiness */}
        <JsonLd
          type="LocalBusiness"
          data={{
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "3156 Old Broken Bow Hwy",
              addressLocality: "Broken Bow",
              addressRegion: "OK",
              postalCode: "74728",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 09:00-17:00",
            sameAs: [
              siteConfig.social.instagram,
              siteConfig.social.facebook,
            ],
            priceRange: "$$",
          }}
        />
        {/* Structured Data — WebSite with SearchAction */}
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
