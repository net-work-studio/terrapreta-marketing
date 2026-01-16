import { defineField, defineType } from "sanity";

export const siteDoc = defineType({
  type: "document",
  name: "site",
  title: "Site",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Site Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Default Description",
      description: "Default meta description used across the site",
      rows: 3,
    }),
    defineField({
      type: "image",
      name: "defaultOgImage",
      title: "Default Social Share Image",
      description: "Default image for social sharing (1200x630px)",
      options: { hotspot: true },
    }),
    defineField({
      type: "seoObject",
      name: "seo",
      title: "Homepage SEO",
      description:
        "SEO settings for the homepage (also used as site-wide defaults)",
    }),
  ],
});
