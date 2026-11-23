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

export type Accent = "rosa" | "lila" | "pistachio";

export type InfoSection = {
  style: SectionStyle;
  heading?: string;
  /** Markdown */
  body?: string;
  image?: string;
  imageAlt?: string;
};

export type SectionBlock =
  | { kind: "standalone"; section: InfoSection }
  | { kind: "group"; sections: InfoSection[] };

/**
 * Splits the flat, ordered section list into blocks for rendering. Hero and
 * footer sections are standalone. Every category starts a new group, which
 * holds the sections up to the next category. Sections before the first
 * category end up in a group of their own.
 */
export const groupSections = (sections: InfoSection[]): SectionBlock[] => {
  const blocks: SectionBlock[] = [];
  let current: InfoSection[] | null = null;
  for (const section of sections) {
    if (section.style === "hero" || section.style === "footer") {
      current = null;
      blocks.push({ kind: "standalone", section });
      continue;
    }
    if (section.style === "category" || current === null) {
      current = [];
      blocks.push({ kind: "group", sections: current });
    }
    current.push(section);
  }
  return blocks;
};
