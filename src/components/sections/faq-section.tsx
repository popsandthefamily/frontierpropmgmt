import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  title?: string;
  questions: { question: string; answer: string }[];
  className?: string;
}

export function FAQSection({
  title = "Frequently Asked Questions",
  questions,
  className,
}: FAQSectionProps) {
  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      {title ? (
        <h2 className="mb-8 text-center text-3xl font-bold text-charcoal md:text-4xl">
          {title}
        </h2>
      ) : null}

      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-b border-border data-[state=open]:border-sage"
          >
            {/* The trigger sits inside an <h3>, whose condensed display font
                it would otherwise inherit; questions read better in the body
                face. */}
            <AccordionTrigger className="py-5 text-left font-body text-base font-semibold leading-snug text-charcoal hover:text-sage hover:no-underline md:text-[1.0625rem]">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-prose pb-6 text-base leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
