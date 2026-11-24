import { z } from "zod";
import { SECTION_STYLES } from "$lib/info/sections";

/** Paths under /info that have their own route, so they can't be page slugs. */
export const RESERVED_SLUGS = ["new", "edit", "upload"];

export const slugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .refine((slug) => !RESERVED_SLUGS.includes(slug));

// Empty text is stored as null.
const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .nullish()
    .transform((value) => (value?.trim() ? value : null));

// Only http(s) urls and site paths, never data: or javascript: urls.
const imageSchema = z
  .string()
  .max(2048)
  .regex(/^(https?:\/\/|\/)/)
  .nullish()
  .transform((value) => value ?? null);

export const sectionSchema = z.object({
  id: z.uuid(),
  style: z.enum(SECTION_STYLES),
  headingSv: optionalText(500),
  headingEn: optionalText(500),
  bodySv: optionalText(50_000),
  bodyEn: optionalText(50_000),
  image: imageSchema,
  imageAltSv: optionalText(500),
  imageAltEn: optionalText(500),
});

export const savePageSchema = z.object({
  /** The version the editor loaded, used to detect concurrent edits. */
  version: z.number().int().min(0),
  titleSv: z.string().trim().min(1).max(255),
  titleEn: optionalText(255),
  aliases: z.array(slugSchema).max(10),
  sections: z
    .array(sectionSchema)
    .max(100)
    .superRefine((sections, ctx) => {
      sections.forEach((section, index) => {
        if (section.style === "hero" && index !== 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "style"],
            message: "A hero must be the first section",
          });
        }
        if (section.style === "footer" && index !== sections.length - 1) {
          ctx.addIssue({
            code: "custom",
            path: [index, "style"],
            message: "A footer must be the last section",
          });
        }
      });
      if (new Set(sections.map((s) => s.id)).size !== sections.length) {
        ctx.addIssue({ code: "custom", message: "Duplicate section ids" });
      }
    }),
});

export type SavePageInput = z.infer<typeof savePageSchema>;

export const createPageSchema = z.object({
  slug: slugSchema,
  titleSv: z.string().trim().min(1).max(255),
  titleEn: optionalText(255),
});
