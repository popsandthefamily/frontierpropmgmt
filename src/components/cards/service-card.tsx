import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  className,
}: ServiceCardProps) {
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[icon];

  return (
    <Card
      className={cn(
        "group border-t-4 border-t-sage transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="pt-6">
        {IconComponent && (
          <div className="mb-4 inline-flex rounded-lg bg-sage/10 p-3">
            <IconComponent className="size-6 text-sage" />
          </div>
        )}

        <h3 className="mb-2 text-xl font-semibold text-charcoal">{title}</h3>

        <p className="text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base text-muted-foreground"
              >
                <LucideIcons.Check className="mt-0.5 size-4 shrink-0 text-sage" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
