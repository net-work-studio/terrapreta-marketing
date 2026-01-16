import { JsonLd } from "@/components/shared/json-ld";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://terrapreta.it";

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
      }}
      id="breadcrumb-json-ld"
    />
  );
}
