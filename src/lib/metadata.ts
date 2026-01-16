import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import { SITE_DEFAULTS } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  image?: SanityImageSource | string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  canonicalUrl?: string;
  robotsIndex?: "index" | "noindex";
  robotsFollow?: "follow" | "nofollow";
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary_large_image" | "summary";
  siteSettings?: SITE_SETTINGS_QUERY_RESULT;
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  canonicalUrl,
  robotsIndex,
  robotsFollow,
  ogTitle,
  ogDescription,
  twitterCard,
  siteSettings,
}: GenerateMetadataOptions): Metadata {
  // Use site settings as fallbacks with hardcoded values as last resort
  const siteName = siteSettings?.name || SITE_DEFAULTS.name;
  const defaultDescription =
    siteSettings?.description ||
    siteSettings?.seo?.metaDescription ||
    SITE_DEFAULTS.description;
  const defaultImage =
    siteSettings?.defaultOgImage || siteSettings?.seo?.ogImage || null;

  const finalDescription = description || defaultDescription;
  const finalTwitterCard =
    twitterCard ||
    (siteSettings?.seo?.twitterCard as "summary_large_image" | "summary") ||
    "summary_large_image";

  const fullTitle = title.includes("—") ? title : `${title} — ${siteName}`;
  const pageUrl = url ? `${SITE_DEFAULTS.baseUrl}${url}` : SITE_DEFAULTS.baseUrl;
  const canonical = canonicalUrl || pageUrl;

  // Handle image URL generation
  let imageUrl: string;
  if (typeof image === "string") {
    imageUrl = image.startsWith("http")
      ? image
      : `${SITE_DEFAULTS.baseUrl}${image}`;
  } else if (image) {
    imageUrl = urlFor(image).width(1200).height(630).auto("format").url();
  } else if (defaultImage) {
    imageUrl = urlFor(defaultImage).width(1200).height(630).auto("format").url();
  } else {
    imageUrl = `${SITE_DEFAULTS.baseUrl}${SITE_DEFAULTS.defaultImage}`;
  }

  // Process robots directives
  const robotsConfig =
    robotsIndex || robotsFollow
      ? {
          index: robotsIndex !== "noindex",
          follow: robotsFollow !== "nofollow",
        }
      : undefined;

  // Open Graph values (use overrides or fall back to defaults)
  const ogTitleValue = ogTitle || fullTitle;
  const ogDescriptionValue = ogDescription || finalDescription;

  return {
    title: fullTitle,
    description: finalDescription,
    ...(robotsConfig && { robots: robotsConfig }),
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      siteName,
      title: ogTitleValue,
      description: ogDescriptionValue,
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
      card: finalTwitterCard,
      title: ogTitleValue,
      description: ogDescriptionValue,
      images: [imageUrl],
    },
  };
}
