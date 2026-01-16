import { defineField, defineType } from "sanity";

export const redirectDoc = defineType({
  type: "document",
  name: "redirect",
  title: "Redirect",
  fields: [
    defineField({
      type: "string",
      name: "source",
      title: "Source Path",
      description:
        "The path to redirect from (e.g., /old-page or /blog/:slug for wildcards)",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.startsWith("/")) {
            return "Source path must start with /";
          }
          return true;
        }),
    }),
    defineField({
      type: "string",
      name: "destination",
      title: "Destination Path",
      description:
        "The path to redirect to (e.g., /new-page or /journal/:slug for wildcards)",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!(value?.startsWith("/") || value?.startsWith("http"))) {
            return "Destination must start with / or be a full URL";
          }
          return true;
        }),
    }),
    defineField({
      type: "boolean",
      name: "permanent",
      title: "Permanent Redirect (308)",
      description:
        "Enable for permanent redirects (308). Disable for temporary redirects (307).",
      initialValue: true,
    }),
    defineField({
      type: "boolean",
      name: "isActive",
      title: "Active",
      description: "Enable or disable this redirect",
      initialValue: true,
    }),
    defineField({
      type: "text",
      name: "notes",
      title: "Notes",
      description:
        "Internal notes about this redirect (not displayed publicly)",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      source: "source",
      destination: "destination",
      permanent: "permanent",
      isActive: "isActive",
    },
    prepare({ source, destination, permanent, isActive }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: `${permanent ? "308" : "307"} ${isActive ? "" : "(inactive)"}`,
      };
    },
  },
  orderings: [
    {
      title: "Source Path",
      name: "sourceAsc",
      by: [{ field: "source", direction: "asc" }],
    },
  ],
});
