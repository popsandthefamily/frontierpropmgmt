"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
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
    label: "Cabins",
    children: [
      {
        label: "Sublime Retreat",
        href: "/sublime",
        description: "Luxury 3BR with hot tub, 2 zip lines & arcade",
      },
      {
        label: "Old Broken Bow Highway",
        href: "/old-broken-bow-highway",
        description: "Cozy 3BR poolside getaway near Broken Bow Lake",
      },
      {
        label: "All Properties",
        href: "/search",
        description: "Browse all available cabins & check dates",
      },
    ],
  },
  {
    label: "Explore",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Meet the team behind Frontier",
      },
      {
        label: "Discover Broken Bow",
        href: "/discover-broken-bow",
        description: "Things to do, eat & see nearby",
      },
    ],
  },
  { label: "Management", href: "/management-services" },
  { label: "Contact", href: "/contact" },
];

/* Paths (and their subtrees) that do NOT have a hero section — force solid header */
const SOLID_HEADER_PATHS = [
  "/sublime",
  "/old-broken-bow-highway",
  "/privacy-policy",
  "/rental-agreement",
  "/audit",
  "/admin",
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
                      "inline-flex h-9 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
                  "inline-flex h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
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

        {/* Desktop CTAs — Split Pill */}
        <div className="hidden lg:flex shrink-0 items-center justify-end">
          <div className={cn(
            "inline-flex items-center whitespace-nowrap rounded-full border overflow-hidden",
            isScrolled ? "border-border" : "border-white/40"
          )}>
            <Link
              href="/management-services"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-r",
                isScrolled
                  ? "text-charcoal hover:bg-sage/10 border-border"
                  : "text-white border-white/30 hover:bg-white/10"
              )}
            >
              Owners
            </Link>
            <Link
              href="/search"
              className="px-5 py-2 text-sm font-semibold bg-sage text-white hover:bg-sage-dark transition-colors"
            >
              Book Now
            </Link>
          </div>
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
                    <Link href="/search">Book a Cabin</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link href="/management-services">Property Owners</Link>
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
