import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({
  number,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-sage text-xl font-bold text-white md:size-16 md:text-2xl">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-charcoal">{title}</h3>
      <p className="text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
