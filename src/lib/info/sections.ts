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

export type InfoLang = "sv" | "en";

/** The fields of a section that have one value per language. */
export type SectionTextField = "heading" | "body" | "imageAlt";

/** Structure is shared by both languages, text is stored per language. */
export type InfoSection = {
  /** Stable id so the editor can key components by section, not position. */
  id: string;
  style: SectionStyle;
  headingSv?: string;
  headingEn?: string;
  bodySv?: string; // Markdown
  bodyEn?: string; // Markdown
  image?: string;
  imageAltSv?: string;
  imageAltEn?: string;
};

/** Page level fields the editor can change, apart from the sections. */
export type PageSettings = {
  titleSv: string;
  titleEn: string;
  /** Space or comma separated slugs. */
  aliases: string;
};

export type SectionBlock =
  | { kind: "standalone"; section: InfoSection; index: number }
  | { kind: "group"; sections: Array<{ section: InfoSection; index: number }> };

// Splits the sections into "blocks", where each block starts with a category if not hero or footer.
export const groupSections = (sections: InfoSection[]): SectionBlock[] => {
  const blocks: SectionBlock[] = [];
  let current: Array<{ section: InfoSection; index: number }> | null = null;
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

const suffix = (lang: InfoLang) => (lang === "sv" ? "Sv" : "En");

/**
 * Reads a translated field. Outside the editor an empty English text falls
 * back to the Swedish one, so a half translated page is never blank.
 */
export const readSectionText = (
  section: InfoSection,
  field: SectionTextField,
  lang: InfoLang,
  editing: boolean,
) => {
  const own = section[`${field}${suffix(lang)}`];
  return editing || own ? own : section[`${field}Sv`];
};

export const writeSectionText = (
  section: InfoSection,
  field: SectionTextField,
  lang: InfoLang,
  value: string | undefined,
) => {
  section[`${field}${suffix(lang)}`] = value;
};

/** True if the section has Swedish text that is missing in English. */
export const missingEnglish = (section: InfoSection) =>
  (["heading", "body"] as const).some(
    (field) => section[`${field}Sv`] && !section[`${field}En`],
  );
