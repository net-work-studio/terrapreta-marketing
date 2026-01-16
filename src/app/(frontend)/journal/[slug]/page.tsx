import { Minus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { BreadcrumbJsonLd } from "@/components/shared/breadcrumb-json-ld";
import { JsonLd } from "@/components/shared/json-ld";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PortableImage } from "@/components/ui/portable-image";
import SocialShare from "@/components/ui/social-share";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/site-settings";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { JOURNAL_ITEM_QUERY } from "@/sanity/lib/queries";

const ASPECT_RATIO = 16 / 9;
const IMAGE_QUALITY = 75;
const BLUR_QUALITY = 5;
const BLUR_SIZE = 24;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [{ data: journalItem }, siteSettings] = await Promise.all([
    sanityFetch({
      query: JOURNAL_ITEM_QUERY,
      params: { slug },
    }),
    getSiteSettings(),
  ]);

  if (!journalItem?.name) {
    return generateMetadataHelper({
      title: "Journal",
      description: "Read our latest journal entries.",
      url: "/journal",
      siteSettings,
    });
  }

  return generateMetadataHelper({
    title: journalItem.seo?.metaTitle || journalItem.name,
    description:
      journalItem.seo?.metaDescription ||
      journalItem.shortDescription ||
      undefined,
    image:
      journalItem.seo?.ogImage ?? journalItem.mainImage?.image ?? undefined,
    url: `/journal/${slug}`,
    type: "article",
    publishedTime: journalItem.publishingDate ?? undefined,
    canonicalUrl: journalItem.seo?.canonicalUrl ?? undefined,
    robotsIndex: journalItem.seo?.robotsIndex ?? undefined,
    robotsFollow: journalItem.seo?.robotsFollow ?? undefined,
    ogTitle: journalItem.seo?.ogTitle ?? undefined,
    ogDescription: journalItem.seo?.ogDescription ?? undefined,
    twitterCard: journalItem.seo?.twitterCard ?? undefined,
    siteSettings,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: journalItem } = await sanityFetch({
    query: JOURNAL_ITEM_QUERY,
    params: { slug },
  });

  if (!journalItem?.mainImage?.image) {
    notFound();
  }

  return (
    <article className="container-site flex flex-col items-center justify-center gap-5 pt-30 pb-20 md:pt-40">
      <hgroup className="flex starting:translate-y-2 translate-y-0 flex-col items-center justify-center gap-5 text-balance pb-5 text-center starting:opacity-0 transition-all duration-400">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/journal">Journal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/journal">
                {journalItem?.tag?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl tracking-tight md:text-4xl lg:text-5xl">
          {journalItem?.name}
        </h1>
        <p className="max-w-[70ch] text-pretty text-lg text-stone-400 md:text-xl lg:text-2xl">
          {journalItem?.shortDescription}
        </p>
      </hgroup>

      <AspectRatio
        className="relative blur-none starting:blur-xl transition-all duration-400"
        ratio={ASPECT_RATIO}
      >
        <Image
          alt={journalItem.name || ""}
          blurDataURL={urlFor(journalItem.mainImage.image)
            .width(BLUR_SIZE)
            .height(BLUR_SIZE)
            .quality(BLUR_QUALITY)
            .auto("format")
            .url()}
          className="z-0 h-full w-full object-cover"
          fill
          placeholder="blur"
          priority
          quality={IMAGE_QUALITY}
          sizes="100vw"
          src={urlFor(journalItem.mainImage.image)
            .quality(IMAGE_QUALITY)
            .auto("format")
            .url()}
        />
      </AspectRatio>

      <div className="container-article space-y-4 py-20">
        <ul className="flex items-center gap-2 text-lg text-muted-foreground">
          <li>{journalItem?.location}</li>
          <Minus size={16} />
          <li>
            {journalItem?.publishingDate
              ? new Date(journalItem.publishingDate).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )
              : ""}
          </li>
        </ul>
        {journalItem?.contentObject && (
          <section className="space-y-7.5 text-pretty text-lg md:text-xl lg:text-2xl">
            <PortableText
              components={{
                types: {
                  imageObject: PortableImage,
                },
              }}
              value={journalItem.contentObject}
            />
          </section>
        )}
      </div>

      <SocialShare />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": journalItem?.seo?.schemaType || "BlogPosting",
          headline: journalItem?.name,
          description: journalItem?.shortDescription,
          ...(journalItem?.publishingDate && {
            datePublished: journalItem.publishingDate,
          }),
          ...(journalItem?.mainImage?.image && {
            image: urlFor(journalItem.mainImage.image)
              .width(1200)
              .auto("format")
              .url(),
          }),
          ...(journalItem?.location && {
            locationCreated: journalItem.location,
          }),
          ...(journalItem?.seo?.customSchema?.knowsAbout && {
            knowsAbout: journalItem.seo.customSchema.knowsAbout
              .split(",")
              .map((s: string) => s.trim()),
          }),
          author: {
            "@type": "Organization",
            name: "Terrapreta",
          },
          publisher: {
            "@type": "Organization",
            name: "Terrapreta",
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Journal", url: "/journal" },
          { name: journalItem?.name || "Article", url: `/journal/${slug}` },
        ]}
      />
    </article>
  );
}
