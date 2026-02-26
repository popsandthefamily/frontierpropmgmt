"use client";

import { motion, type Variant } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimateInViewProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const directionOffsets: Record<string, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function AnimateInView({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimateInViewProps) {
  const offset = directionOffsets[direction];

  const hidden: Variant = {
    opacity: 0,
    ...offset,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
