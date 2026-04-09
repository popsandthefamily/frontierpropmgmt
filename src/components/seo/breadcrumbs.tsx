import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = "https://rentwithfrontier.com";

  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: allItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground/50" />}
              {item.href && i < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-sage"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
