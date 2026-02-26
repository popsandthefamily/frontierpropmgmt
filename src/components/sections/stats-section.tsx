"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
}

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState("0");

  // Extract the numeric portion and any prefix/suffix
  const match = value.match(/^([^\d]*)(\d+)([\D]*)$/);
  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;

  useEffect(() => {
    if (!inView || numericTarget === 0) {
      if (!inView) setDisplayed("0");
      return;
    }

    let frame = 0;
    const totalFrames = 40;
    const increment = numericTarget / totalFrames;

    const timer = setInterval(() => {
      frame++;
      const current = Math.min(Math.round(increment * frame), numericTarget);
      setDisplayed(String(current));
      if (frame >= totalFrames) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  if (!match) {
    return <span>{inView ? value : ""}</span>;
  }

  return (
    <span>
      {prefix}
      {displayed}
      {suffix}
    </span>
  );
}

export function StatsSection({ stats, className }: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={cn("bg-sage", className)}>
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:py-16"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <AnimatedValue value={stat.value} inView={inView} />
            </div>
            <div className="mt-2 text-sm text-white/80 md:text-base">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
