import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "cream" | "sage" | "purple" | "charcoal";
  id?: string;
}

const bgClasses = {
  white: "bg-white",
  cream: "bg-cream",
  sage: "bg-sage text-white",
  purple: "bg-purple text-white",
  charcoal: "bg-charcoal text-white",
} as const;

export function SectionWrapper({
  children,
  className,
  background = "white",
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn(bgClasses[background], className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">{children}</div>
    </section>
  );
}
