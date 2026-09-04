"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  overlay?: "dark" | "gradient";
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  size?: "full" | "large" | "medium";
}

const sizeClasses = {
  full: "min-h-screen",
  large: "min-h-[75vh]",
  medium: "min-h-[50vh]",
} as const;

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  overlay = "dark",
  cta,
  secondaryCta,
  size = "full",
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        // pt-20 clears the fixed h-20 header, which otherwise overlaps the
        // heading on the shorter sizes. min-h is a floor, so tall content
        // grows the section rather than being clipped by overflow-hidden.
        "relative flex items-center justify-center overflow-hidden pt-20",
        sizeClasses[size]
      )}
    >
      {/* Background image. next/image rather than a CSS background so each
          device gets a size and format it can actually use; a phone was
          downloading the full desktop file. Decorative, so alt is empty, and
          priority because the hero is the largest paint on every page. */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0",
          overlay === "dark" && "bg-black/50",
          overlay === "gradient" &&
            "bg-gradient-to-br from-sage-dark/80 to-purple-dark/80"
        )}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl md:mt-6 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        )}

        {(cta || secondaryCta) && (
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {cta && (
              <Button
                asChild
                size="lg"
                className="bg-sage text-white hover:bg-sage-dark px-8 py-3 text-base"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 text-base"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
