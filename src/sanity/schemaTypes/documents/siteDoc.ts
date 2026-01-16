import { defineField, defineType } from "sanity";
import { groups } from "../helpers/groups";

export const siteDoc = defineType({
  type: "document",
  name: "site",
  title: "Site",
  groups,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Site Name",
      hidden: true,
      readOnly: true,
      validation: (e) => e.required(),
    }),
    defineField({
      type: "seoObject",
      name: "seo",
      title: "Site SEO Defaults",
      group: "seo",
      description: "Default SEO settings used across the site and for the homepage",
    }),
  ],
});
