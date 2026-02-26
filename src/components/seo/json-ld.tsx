interface JsonLdProps {
  type:
    | "LocalBusiness"
    | "VacationRental"
    | "Article"
    | "FAQPage"
    | "BreadcrumbList";
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
