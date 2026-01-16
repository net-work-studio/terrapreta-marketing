import { defineArrayMember, defineField, defineType } from "sanity";

const MAX_CAPABILITIES = 6;

export const serviceDoc = defineType({
  type: "document",
  name: "service",
  title: "Service",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      validation: (e) => e.required(),
      options: {
        source: "name",
      },
    }),
    defineField({
      type: "text",
      name: "shortDescription",
      title: "Short Description",
    }),
    defineField({
      type: "imageObject",
      name: "mainImage",
      title: "Main Image",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "array",
      name: "clients",
      title: "Clients",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "organization" }],
        }),
      ],
    }),
    defineField({
      type: "array",
      name: "capabilities",
      title: "Capabilities",
      description: `You can select up to ${MAX_CAPABILITIES} capabilities`,
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "capability" }] }),
      ],
      validation: (e) => e.max(MAX_CAPABILITIES),
    }),
    defineField({
      type: "array",
      name: "content",
      title: "Content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "imageObject" }),
      ],
    }),
    defineField({
      type: "array",
      name: "relatedProject",
      title: "Related Project",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
    }),
    defineField({
      type: "array",
      name: "relatedResearch",
      title: "Related Research",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "research" }],
        }),
      ],
    }),
    defineField({
      type: "seoObject",
      name: "seo",
      title: "SEO",
      description: "Search engine optimization settings",
      initialValue: {
        robotsIndex: "index",
        robotsFollow: "follow",
        twitterCard: "summary_large_image",
      },
    }),
  ],
});
