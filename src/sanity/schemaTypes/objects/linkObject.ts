import { defineField, defineType } from "sanity";

export const linkObject = defineType({
  type: "object",
  name: "linkObject",
  title: "Link",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "type",
      title: "Type",
      validation: (e) => e.required(),
      initialValue: "internal",
      options: {
        layout: "radio",

        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
      },
    }),
    defineField({
      type: "reference",
      name: "page",
      title: "Page",
      to: [
        { type: "page" },
        { type: "about" },
        { type: "journal" },
        { type: "project" },
        { type: "service" },
        { type: "research" },
        { type: "press" },
      ],
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
    defineField({
      type: "string",
      name: "href",
      title: "URL",
      hidden: ({ parent }) => parent?.type !== "external",
    }),
    defineField({
      type: "string",
      name: "target",
      title: "Target",
      validation: (e) => e.required(),
      initialValue: "_self",
      options: {
        list: [
          { title: "Self", value: "_self" },
          { title: "Blank", value: "_blank" },
        ],
        layout: "radio",
      },
    }),
  ],
});
