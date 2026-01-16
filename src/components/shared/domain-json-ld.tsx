import { JsonLd } from "./json-ld";

export function SoilHealthJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Soil Health",
        description:
          "The continued capacity of soil to function as a vital living ecosystem that sustains plants, animals, and humans. Healthy soil filters water, cycles nutrients, and supports biodiversity.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Environmental Science Terminology",
        },
      }}
      id="soil-health-json-ld"
    />
  );
}

export function EcosystemRestorationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Ecosystem Restoration",
        description:
          "The process of assisting the recovery of an ecosystem that has been degraded, damaged, or destroyed. It involves returning a natural area to a self-sustaining condition.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Environmental Science Terminology",
        },
      }}
      id="ecosystem-restoration-json-ld"
    />
  );
}

export function NatureBasedSolutionsJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Nature-Based Solutions",
        description:
          "Actions to protect, sustainably manage, and restore natural or modified ecosystems that address societal challenges effectively and adaptively, simultaneously providing human well-being and biodiversity benefits.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Environmental Science Terminology",
        },
      }}
      id="nature-based-solutions-json-ld"
    />
  );
}
