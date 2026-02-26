"use client";

import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useScrollPosition } from "@/hooks/use-scroll-position";

export function ScrollToTop() {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 300;

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-sage text-white shadow-lg transition-colors hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
