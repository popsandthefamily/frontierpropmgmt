"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { label: "Home", href: "/" },
  {
    label: "Book a Cabin",
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
  { label: "Management Services", href: "/management-services" },
  { label: "About", href: "/about" },
  { label: "Discover", href: "/discover-broken-bow" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 50;

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative shrink-0">
          {isScrolled ? (
            <Image
              src="/images/logos/Asset-2.png"
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
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      "inline-flex h-9 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-charcoal hover:text-sage"
                        : "text-white/90 hover:text-white"
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
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/management-services"
            className={cn(
              "text-xs font-medium transition-colors",
              isScrolled
                ? "text-muted-foreground hover:text-sage"
                : "text-white/70 hover:text-white"
            )}
          >
            Owners &rarr;
          </Link>
          <Button
            asChild
            className="bg-sage text-white hover:bg-sage-dark"
          >
            <Link href="/search">Book Now</Link>
          </Button>
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
                  src="/images/logos/Asset-2.png"
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
                    <Link href="/management-services">Management Services</Link>
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
