import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featuredImage: string;
  category?: string;
  className?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({
  slug,
  title,
  date,
  excerpt,
  featuredImage,
  category,
  className,
}: BlogCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <Link href={`/blogs/${slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <CardContent className="pt-4">
        <div className="mb-3 flex items-center gap-3">
          <time
            dateTime={date}
            className="text-xs text-muted-foreground"
          >
            {formatDate(date)}
          </time>
          {category && (
            <Badge
              variant="secondary"
              className="bg-sage/10 text-sage text-xs"
            >
              {category}
            </Badge>
          )}
        </div>

        <Link href={`/blogs/${slug}`}>
          <h3 className="mb-2 text-lg font-semibold leading-tight text-charcoal transition-colors group-hover:text-sage">
            {title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>

        <Link
          href={`/blogs/${slug}`}
          className="inline-flex items-center text-sm font-medium text-sage transition-colors hover:text-sage-dark"
        >
          Read More
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
