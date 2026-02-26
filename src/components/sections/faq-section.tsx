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
      <h2 className="mb-8 text-center text-3xl font-bold text-charcoal md:text-4xl">
        {title}
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-b border-border data-[state=open]:border-sage"
          >
            <AccordionTrigger className="text-left text-base font-medium text-charcoal hover:text-sage hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
