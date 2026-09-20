"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { CTA } from "@/data/home-care";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface NavChild {
  label: string;
  href: string;
  description: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  children?: never;
}

interface NavDropdownItem {
  label: string;
  href?: never;
  children: NavChild[];
}

type NavItem = NavLinkItem | NavDropdownItem;

const NAV_ITEMS: NavItem[] = [
  {
    label: "For Owners",
    children: [
      {
        label: "Full-Service STR Management",
        href: "/management-services",
        description: "We run the rental: pricing, guests, cleaning, taxes",
      },
      {
        label: "Home Care Concierge",
        href: "/home-care-concierge",
        description: "Monthly care for second homes and cabins, from $500",
      },
      {
        label: "Compare Services & Pricing",
        href: "/pricing",
        description: "Management vs. home care, side by side",
      },
      {
        label: "STR Cleaning & Local Support",
        href: "/local-services",
        description: "Turnovers and local hands for a rental you run yourself",
      },
    ],
  },
  {
    label: "Properties",
    children: [
      {
        label: "Sublime Retreat",
        href: "/sublime",
        description: "Luxury 3BR with hot tub, 2 zip lines & arcade",
      },
      {
        label: "Old Broken Bow Highway",
        href: "/old-broken-bow-highway",
        description: "The house we started the company on, now retired",
      },
      {
        label: "All Properties",
        href: "/search",
        description: "Browse all available cabins & check dates",
      },
    ],
  },
  {
    label: "About",
    children: [
      {
        label: "About Frontier",
        href: "/about",
        description: "Who we are and the cabin we run ourselves",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Fees, switching, taxes, and the market, answered",
      },
      {
        label: "Hochatown Management",
        href: "/hochatown-property-management",
        description: "Local cabin management for Hochatown owners",
      },
      {
        label: "Broken Bow Management",
        href: "/broken-bow-property-management",
        description: "Short-term rental management in Broken Bow, OK",
      },
      {
        label: "Dallas Cabin Owners",
        href: "/dallas-cabin-owners",
        description: "Remote-owner support for DFW cabin investors",
      },
      {
        label: "Free Listing Audit",
        href: "/audit",
        description: "See the revenue gap in your Airbnb or Vrbo listing",
      },
      {
        label: "Broken Bow Guide",
        href: "/discover-broken-bow",
        description: "Things to do, seasons, and local context for guests",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* Paths (and their subtrees) that do NOT have a hero section, force solid header */
const SOLID_HEADER_PATHS = [
  "/",
  "/sublime",
  "/old-broken-bow-highway",
  "/portal",
  "/privacy-policy",
  "/rental-agreement",
  "/audit",
  "/admin",
  "/sign",
  "/contact",
];

export function SiteHeader() {
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const forceSolid = SOLID_HEADER_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  const isScrolled = forceSolid || scrollY > 50;

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-shadow",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative shrink-0 flex-1 lg:flex-none lg:w-48">
          {isScrolled ? (
            <Image
              src="/images/logos/Asset-1-2.png"
              alt="Frontier Property Management"
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          ) : (
            <Image
              src="/images/logos/white_logo.png"
              alt="Frontier Property Management"
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      "inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-charcoal hover:text-sage"
                        : "text-white hover:text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.4)]"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="w-72 rounded-lg border bg-white shadow-lg p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md p-3 transition-colors hover:bg-cream"
                        >
                          <div className="text-sm font-medium text-charcoal">
                            {child.label}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                            {child.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-charcoal hover:text-sage"
                    : "text-white hover:text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.4)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs: one quiet utility link, then two pills that share
            a size so the cluster reads as a set rather than three unrelated
            bits of text. */}
        <div className="hidden lg:flex shrink-0 items-center justify-end gap-3">
          <Link
            href="/portal"
            aria-label="Owner login"
            title="Owner login"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm font-medium whitespace-nowrap transition-colors",
              isScrolled
                ? "text-muted-foreground hover:text-sage"
                : "text-white/85 hover:text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.4)]",
            )}
          >
            <LockKeyhole className="size-4 shrink-0" />
            <span className="hidden xl:inline">Owner Login</span>
          </Link>
          <span
            aria-hidden="true"
            className={cn(
              "h-5 w-px",
              isScrolled ? "bg-charcoal/15" : "bg-white/30",
            )}
          />
          <Link
            href="/search"
            className={cn(
              "inline-flex h-9 items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
              isScrolled
                ? "border-charcoal/20 text-charcoal hover:border-sage hover:text-sage"
                : "border-white/60 text-white hover:bg-white/10",
            )}
          >
            Book a Cabin
          </Link>
          <Link
            href={CTA.owner.href}
            className="inline-flex h-9 items-center whitespace-nowrap rounded-full bg-sage px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-dark"
          >
            {CTA.owner.label}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden",
              isScrolled ? "text-charcoal" : "text-white"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </Button>

          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/images/logos/Asset-1-2.png"
                  alt="Frontier Property Management"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4 pt-4">
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label}>
                      <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <SheetClose asChild key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-2 pl-6 text-sm font-medium text-charcoal transition-colors hover:bg-sage/10"
                          >
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  );
                }

                return (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sage/10"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}

              <div className="mt-4 border-t pt-4 space-y-2">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-sage text-white hover:bg-sage-dark"
                  >
                    <Link href={CTA.owner.href}>{CTA.owner.label}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/search">Book a Cabin</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/portal">
                      <LockKeyhole className="size-4" />
                      Owner Login
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
