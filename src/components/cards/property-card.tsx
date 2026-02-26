import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyCardProps {
  slug: string;
  name: string;
  tagline: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  featuredImage: string;
  className?: string;
}

export function PropertyCard({
  slug,
  name,
  tagline,
  bedrooms,
  bathrooms,
  sleeps,
  featuredImage,
  className,
}: PropertyCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <Link href={`/${slug}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={featuredImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <CardContent className="pt-4">
        <Link href={`/${slug}`}>
          <h3 className="mb-1 text-xl font-semibold text-charcoal transition-colors group-hover:text-sage">
            {name}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {tagline}
        </p>

        {/* Badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1.5">
            <Bed className="size-3.5" />
            {bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Bath className="size-3.5" />
            {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Users className="size-3.5" />
            Sleeps {sleeps}
          </Badge>
        </div>

        <Link
          href={`/${slug}`}
          className="inline-flex items-center text-sm font-medium text-sage transition-colors hover:text-sage-dark"
        >
          View Property
          <svg
            className="ml-1 size-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
}
