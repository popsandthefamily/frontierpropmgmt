"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
  { label: "About", href: "/about" },
  { label: "Management Services", href: "/management-services" },
  {
    label: "Our Cabins",
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
              src="/images/logos/Asset-2.svg"
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
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent hover:bg-sage/10 focus:bg-sage/10 data-[state=open]:bg-sage/10",
                        isScrolled
                          ? "text-charcoal"
                          : "text-white hover:text-white"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[320px] gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sage/10 focus:bg-sage/10"
                              >
                                <div className="text-sm font-medium text-charcoal">
                                  {child.label}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground leading-snug">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-sage/10 focus:bg-sage/10",
                        isScrolled
                          ? "text-charcoal"
                          : "text-white hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <Button
          asChild
          className="hidden lg:inline-flex bg-sage text-white hover:bg-sage-dark"
        >
          <Link href="/contact">Get Started</Link>
        </Button>

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
                  src="/images/logos/Asset-2.svg"
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

              <div className="mt-4 border-t pt-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-sage text-white hover:bg-sage-dark"
                  >
                    <Link href="/contact">Get Started</Link>
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
