import type { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const PROJECTS_SITEMAP_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current) && seo.robotsIndex != "noindex"] {
    "slug": slug.current,
    _updatedAt
  }`
);

const JOURNAL_SITEMAP_QUERY = defineQuery(
  `*[_type == "journal" && defined(slug.current) && seo.robotsIndex != "noindex"] {
    "slug": slug.current,
    _updatedAt
  }`
);

const SERVICES_SITEMAP_QUERY = defineQuery(
  `*[_type == "service" && defined(slug.current) && seo.robotsIndex != "noindex"] {
    "slug": slug.current,
    _updatedAt
  }`
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://terrapreta.it";

  const [projects, journal, services] = await Promise.all([
    client.fetch(PROJECTS_SITEMAP_QUERY),
    client.fetch(JOURNAL_SITEMAP_QUERY),
    client.fetch(SERVICES_SITEMAP_QUERY),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...projects
      .filter((project) => project.slug)
      .map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...journal
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${baseUrl}/journal/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ...services
      .filter((service) => service.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
