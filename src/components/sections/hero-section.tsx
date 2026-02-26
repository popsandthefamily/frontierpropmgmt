"use client";

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
        "relative flex items-center justify-center overflow-hidden",
        sizeClasses[size]
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-base"
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
