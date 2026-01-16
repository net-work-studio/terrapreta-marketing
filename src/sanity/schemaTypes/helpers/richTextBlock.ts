import { defineArrayMember } from "sanity";

/**
 * Rich text block configuration with internal link support.
 * Use this for all Portable Text content fields to enable
 * reference-based internal linking that auto-updates when slugs change.
 */
export const richTextBlock = defineArrayMember({
  type: "block",
  marks: {
    annotations: [
      {
        name: "link",
        type: "object",
        title: "External Link",
        fields: [
          {
            name: "href",
            type: "url",
            title: "URL",
            validation: (rule) =>
              rule.uri({
                scheme: ["http", "https", "mailto", "tel"],
              }),
          },
          {
            name: "blank",
            type: "string",
            title: "Open in new tab",
            options: {
              list: [
                { title: "Yes", value: "true" },
                { title: "No", value: "false" },
              ],
              layout: "radio",
            },
            initialValue: "true",
          },
        ],
      },
      {
        name: "internalLink",
        type: "object",
        title: "Internal Link",
        fields: [
          {
            name: "reference",
            type: "reference",
            title: "Reference",
            to: [
              { type: "page" },
              { type: "journal" },
              { type: "project" },
              { type: "service" },
              { type: "research" },
              { type: "press" },
              { type: "about" },
            ],
          },
        ],
      },
    ],
  },
});
