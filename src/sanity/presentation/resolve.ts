import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/posts/${doc?.slug}`,
          },
          { title: "Posts index", href: "/posts" },
        ],
      }),
    }),
    journal: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/journal/${doc?.slug}`,
          },
          { title: "Journal index", href: "/journal" },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/projects/${doc?.slug}`,
          },
          { title: "Projects index", href: "/projects" },
        ],
      }),
    }),
    service: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/services/${doc?.slug}`,
          },
          { title: "Services index", href: "/services" },
        ],
      }),
    }),
    research: defineLocations({
      select: {
        title: "titleSlug.name",
        slug: "titleSlug.slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/research/${doc?.slug}`,
          },
          { title: "Research index", href: "/research" },
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/pages/${doc?.slug}`,
          },
          { title: "Pages index", href: "/pages" },
        ],
      }),
    }),
  },
};
