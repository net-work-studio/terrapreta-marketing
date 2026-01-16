import { AsteriskIcon, EarthGlobeIcon, SearchIcon } from "@sanity/icons";

export const groups = [
  {
    name: "meta",
    title: "Meta",
    icon: EarthGlobeIcon,
  },
  {
    name: "content",
    title: "Content",
    default: true,
    icon: AsteriskIcon,
  },
  {
    name: "seo",
    title: "SEO",
    icon: SearchIcon,
  },
];
