import { defineField, defineType } from "sanity";
import { groups } from "../helpers/groups";

export const aboutDoc = defineType({
  type: "document",
  name: "about",
  title: "About",
  groups,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
