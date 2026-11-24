export const SECTION_STYLES = [
  "hero",
  "category",
  "image-left",
  "image-right",
  "image-center",
  "text",
  "footer",
] as const;

export type SectionStyle = (typeof SECTION_STYLES)[number];

export type InfoSection = {
  style: SectionStyle;
  heading?: string;
  body?: string; // Markdown
  image?: string;
  imageAlt?: string;
};

export type SectionBlock =
  | { kind: "standalone"; section: InfoSection, index: number }
  | { kind: "group"; sections: { section: InfoSection, index: number}[] };

// Splits the sections into "blocks", where each block starts with a category if not hero or footer.
export const groupSections = (sections: InfoSection[]): SectionBlock[] => {
  const blocks: SectionBlock[] = [];
  let current: { section: InfoSection, index: number}[] | null = null;
  for (const [index, section] of sections.entries()) {
    if (section.style === "hero" || section.style === "footer") {
      current = null;
      blocks.push({ kind: "standalone", section, index });
      continue;
    }
    if (section.style === "category" || current === null) {
      current = [];
      blocks.push({ kind: "group", sections: current });
    }
    current.push({ section, index });
  }
  return blocks;
};
