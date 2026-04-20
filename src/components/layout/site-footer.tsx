import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Management Services", href: "/management-services" },
  { label: "Hochatown Management", href: "/hochatown-property-management" },
  { label: "Broken Bow Management", href: "/broken-bow-property-management" },
  { label: "Dallas Cabin Owners", href: "/dallas-cabin-owners" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blogs" },
];

const LOCAL_LINKS = [
  { label: "Broken Bow Guide", href: "/discover-broken-bow" },
  {
    label: "Hocha.Town",
    href: "https://hocha.town",
    external: true,
  },
];

const PROPERTIES = [
  { label: "Sublime Retreat", href: "/sublime" },
  { label: "Old Broken Bow Highway", href: "/old-broken-bow-highway" },
  { label: "Search Properties", href: "/search" },
];

export function SiteFooter() {
  return (
    <footer>
      {/* Pre-footer Booking CTA */}
      <div className="bg-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row lg:px-8">
          <div className="text-center sm:text-left">
            <p className="text-lg font-heading font-bold text-white">
              Ready for your Broken Bow getaway?
            </p>
            <p className="text-sm text-white/70">
              Browse our cabins and book direct, no platform fees.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-sage text-white hover:bg-sage-dark font-semibold px-8 shrink-0"
          >
            <Link href="/search">Book a Cabin</Link>
          </Button>
        </div>
      </div>

      {/* Upper Section */}
      <div className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Logo & Tagline */}
            <div className="flex flex-col gap-4">
              <Image
                src="/images/logos/Asset-1-2.png"
                alt="Frontier Property Management"
                width={234}
                height={133}
                className="w-44 h-auto"
              />
              <p className="text-sm leading-relaxed text-charcoal/80">
                Full-service cabin management in Hochatown &amp; Broken Bow
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-charcoal/10 p-2 text-charcoal/70 transition-colors hover:bg-sage hover:text-white"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-charcoal/10 p-2 text-charcoal/70 transition-colors hover:bg-sage hover:text-white"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href={siteConfig.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-charcoal/10 p-2 text-charcoal/70 transition-colors hover:bg-sage hover:text-white"
                  aria-label="View us on Google"
                >
                  <Star className="size-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-heading text-charcoal">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/70 transition-colors hover:text-sage"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Properties + Local */}
            <div>
              <h3 className="mb-4 text-lg font-heading text-charcoal">
                Properties
              </h3>
              <ul className="flex flex-col gap-2">
                {PROPERTIES.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/70 transition-colors hover:text-sage"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="mb-4 mt-8 text-lg font-heading text-charcoal">
                Local
              </h3>
              <ul className="flex flex-col gap-2">
                {LOCAL_LINKS.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-charcoal/70 transition-colors hover:text-sage"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-charcoal/70 transition-colors hover:text-sage"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="mb-4 text-lg font-heading text-charcoal">
                Contact
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="tel:5802077154"
                    className="flex items-start gap-2 text-sm text-charcoal/70 transition-colors hover:text-sage"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0 text-sage" />
                    580-207-7154
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@rentwithfrontier.com"
                    className="flex items-start gap-2 text-sm text-charcoal/70 transition-colors hover:text-sage"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-sage" />
                    info@rentwithfrontier.com
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2 text-sm text-charcoal/70">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-sage" />
                    <span>
                      3156 Old Broken Bow Hwy,
                      <br />
                      Broken Bow, OK 74728
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-2 text-sm text-charcoal/70">
                    <Clock className="mt-0.5 size-4 shrink-0 text-sage" />
                    Mon&ndash;Fri 9am&ndash;5pm
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="bg-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 text-sm text-white/70 sm:flex-row sm:items-center lg:px-8">
          <div className="space-y-1">
            <p>&copy; 2026 Frontier Property Management LLC. All rights reserved.</p>
            <p className="text-xs text-white/50">
              Site by Frontier Consulting Group LLC.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/rental-agreement"
              className="transition-colors hover:text-white"
            >
              Rental Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
