import { cn } from "@/lib/utils";

interface AnswerBlockProps {
  /** Short label above the paragraph. Keep it plain: "The short version". */
  heading?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A short, self-contained summary near the top of a page.
 *
 * Search snippets and AI answer engines both pull best from a single
 * paragraph that answers the page's question without needing the
 * surrounding context. Everything inside should stand on its own if it were
 * lifted out and quoted somewhere else, which means naming the business and
 * the market rather than saying "we" and "the area".
 */
export function AnswerBlock({
  heading = "The short version",
  children,
  className,
}: AnswerBlockProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl rounded-2xl border-l-4 border-sage bg-white p-6 shadow-sm md:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-sage">
        {heading}
      </p>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-charcoal md:text-lg">
        {children}
      </div>
    </div>
  );
}
