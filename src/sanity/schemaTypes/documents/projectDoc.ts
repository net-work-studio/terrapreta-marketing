import { defineField, defineType } from "sanity";

export const projectDoc = defineType({
  type: "document",
  name: "project",
  title: "Project",
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
      type: "imageObject",
      name: "mainImage",
      title: "Main Image",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "status",
      title: "Status",
      options: {
        list: [
          { title: "On Hold", value: "on-hold" },
          { title: "In Progress", value: "in-progress" },
          { title: "In Construction", value: "in-construction" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (e) => e.required(),
    }),
    defineField({ type: "string", name: "location", title: "Location" }),
    defineField({
      type: "string",
      name: "areaRestored",
      title: "Area Restored",
      description: "Specify the unit of measurement",
    }),
    defineField({
      type: "string",
      name: "interventionType",
      title: "Intervention Type",
    }),
    defineField({
      type: "text",
      name: "shortDescription",
      title: "Short Description",
    }),
    defineField({
      type: "contentObject",
      name: "pageContent",
      title: "Page Content",
    }),
    defineField({
      type: "reference",
      name: "relatedService",
      title: "Related Service",
      to: [{ type: "service" }],
    }),
    defineField({
      type: "reference",
      name: "relatedResearch",
      title: "Related Research",
      to: [{ type: "research" }],
    }),
  ],
});
