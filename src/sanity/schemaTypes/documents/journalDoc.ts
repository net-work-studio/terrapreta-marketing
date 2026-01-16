import { defineArrayMember, defineField, defineType } from "sanity";
import { groups } from "../helpers/groups";
import { richTextBlock } from "../helpers/richTextBlock";

export const journalDoc = defineType({
  type: "document",
  name: "journal",
  title: "Journal",
  groups,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Title",
      group: "meta",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      group: "meta",
      validation: (e) => e.required(),
      options: {
        source: "name",
      },
    }),
    defineField({
      type: "gridDimensionObject",
      name: "gridDimension",
      title: "Grid Dimension",
      group: "content",
    }),
    defineField({
      type: "reference",
      name: "tag",
      title: "Tag",
      group: "content",
      to: [{ type: "tag" }],
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "location",
      title: "Location",
      group: "content",
      description:
        "Use always a city and country in English, never a state or region. (Example: Milan, Italy)",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "date",
      name: "publishingDate",
      title: "Publishing Date",
      group: "content",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "imageObject",
      name: "mainImage",
      title: "Main Image",
      group: "content",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "shortDescription",
      title: "Short Description",
      group: "content",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "array",
      name: "contentObject",
      title: "Content",
      group: "content",
      validation: (e) => e.required(),
      of: [richTextBlock, defineArrayMember({ type: "imageObject" })],
    }),
    defineField({
      type: "reference",
      name: "relatedService",
      title: "Related Service",
      to: [{ type: "service" }],
      group: "content",
    }),
    defineField({
      type: "reference",
      name: "relatedProject",
      title: "Related Project",
      to: [{ type: "project" }],
      group: "content",
    }),
    defineField({
      type: "reference",
      name: "relatedResearch",
      title: "Related Research",
      to: [{ type: "research" }],
      group: "content",
    }),
    defineField({
      type: "seoObject",
      name: "seo",
      title: "SEO",
      group: "seo",
      description: "Search engine optimization settings",
      initialValue: {
        robotsIndex: "index",
        robotsFollow: "follow",
        twitterCard: "summary_large_image",
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "publishingDate",
      media: "mainImage.image",
    },
  },
});
