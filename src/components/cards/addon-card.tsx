import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddonCardProps {
  name: string;
  description: string;
  features: string[];
  className?: string;
}

export function AddonCard({
  name,
  description,
  features,
  className,
}: AddonCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl text-charcoal">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-base text-muted-foreground"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-sage" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
