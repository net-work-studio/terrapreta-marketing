import { defineArrayMember, defineField, defineType } from "sanity";
import { richTextBlock } from "../helpers/richTextBlock";

export const contentObject = defineType({
  type: "object",
  name: "contentObject",
  title: "Content",
  fields: [
    defineField({
      type: "array",
      name: "content",
      title: "Content",
      validation: (e) => e.required(),
      of: [richTextBlock, defineArrayMember({ type: "imageObject" })],
    }),
  ],
});
