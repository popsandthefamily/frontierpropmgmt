import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface Amenity {
  icon: string;
  label: string;
}

interface AmenityGridProps {
  amenities: Amenity[];
  className?: string;
}

export function AmenityGrid({ amenities, className }: AmenityGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3",
        className
      )}
    >
      {amenities.map((amenity) => {
        const IconComponent = (
          LucideIcons as unknown as Record<
            string,
            React.ComponentType<{ className?: string }>
          >
        )[amenity.icon];

        return (
          <div
            key={amenity.label}
            className="flex items-center gap-3 py-1 text-base"
          >
            {IconComponent ? (
              <IconComponent className="size-5 shrink-0 text-sage" />
            ) : (
              <LucideIcons.Check className="size-5 shrink-0 text-sage" />
            )}
            <span className="text-charcoal">{amenity.label}</span>
          </div>
        );
      })}
    </div>
  );
}
