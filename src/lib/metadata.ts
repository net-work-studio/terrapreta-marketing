import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://terrapreta.it";
const siteName = "Terrapreta";
const defaultDescription =
  "Regenerating ecosystems from the soil up. Growing equitable places for nature, people and climate.";
const defaultImage = "/images/terrapreta_hero.webp";

type GenerateMetadataOptions = {
  title: string;
  description?: string;
  image?: SanityImageSource | string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function generateMetadata({
  title,
  description = defaultDescription,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = title.includes("—") ? title : `${title} — ${siteName}`;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;

  // Handle image URL generation
  let imageUrl: string;
  if (typeof image === "string") {
    imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  } else if (image) {
    imageUrl = urlFor(image).width(1200).height(630).auto("format").url();
  } else {
    imageUrl = `${baseUrl}${defaultImage}`;
  }

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type,
      siteName,
      title: fullTitle,
      description,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && authors.length > 0 && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
