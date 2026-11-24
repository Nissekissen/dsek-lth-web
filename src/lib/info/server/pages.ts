import type { ExtendedPrisma } from "$lib/server/extendedPrisma";
import type { AuthUser } from "@zenstackhq/runtime";
import DOMPurify from "isomorphic-dompurify";
import type { SavePageInput } from "$lib/info/schema";
import type { InfoSection, SectionStyle } from "$lib/info/sections";
import type { InfoSectionStyle } from "@prisma/client";

// The database enum is named with underscores, the styles with hyphens.
const styleToDb = (style: SectionStyle) =>
  style.replace("-", "_") as InfoSectionStyle;
const styleFromDb = (style: InfoSectionStyle) =>
  style.replace("_", "-") as SectionStyle;

type DbSection = NonNullable<
  Awaited<ReturnType<typeof findInfoPage>>
>["sections"][number];

/** Converts a stored section to the shape the editor works with. */
export const toEditorSection = (section: DbSection): InfoSection => ({
  id: section.id,
  style: styleFromDb(section.style),
  headingSv: section.headingSv ?? undefined,
  headingEn: section.headingEn ?? undefined,
  bodySv: section.bodySv ?? undefined,
  bodyEn: section.bodyEn ?? undefined,
  image: section.image ?? undefined,
  imageAltSv: section.imageAltSv ?? undefined,
  imageAltEn: section.imageAltEn ?? undefined,
});

/** Finds a page by its slug or by one of its aliases. */
export const findInfoPage = (prisma: ExtendedPrisma, slug: string) =>
  prisma.infoPage.findFirst({
    where: { OR: [{ slug }, { aliases: { has: slug } }] },
    include: { sections: { orderBy: { position: "asc" } } },
  });

/** True if the slug is already used as a slug or alias by any other page. */
export const isSlugTaken = async (
  prisma: ExtendedPrisma,
  slugs: string[],
  exceptPageId?: string,
) =>
  (await prisma.infoPage.count({
    where: {
      ...(exceptPageId && { id: { not: exceptPageId } }),
      OR: [{ slug: { in: slugs } }, { aliases: { hasSome: slugs } }],
    },
  })) > 0;

export class VersionConflictError extends Error {}

/**
 * Replaces the whole page in one transaction. Throws `VersionConflictError`
 * if someone else saved after the editor loaded the page.
 */
export const savePage = async (
  prisma: ExtendedPrisma,
  user: AuthUser,
  pageId: string,
  input: SavePageInput,
) => {
  const bumped = await prisma.$transaction(async (tx) => {
    // Matching on the version makes the check and the update one atomic step.
    const { count } = await tx.infoPage.updateMany({
      where: { id: pageId, version: input.version },
      data: {
        titleSv: input.titleSv,
        titleEn: input.titleEn,
        aliases: input.aliases,
        updatedBy: user?.memberId,
        version: { increment: 1 },
      },
    });
    if (count === 0) throw new VersionConflictError();

    const existing = await tx.infoSection.findMany({
      where: { pageId },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((s) => s.id));

    await tx.infoSection.deleteMany({
      where: { pageId, id: { notIn: input.sections.map((s) => s.id) } },
    });

    for (const [position, section] of input.sections.entries()) {
      const data = {
        position,
        style: styleToDb(section.style),
        headingSv: section.headingSv,
        headingEn: section.headingEn,
        bodySv: sanitize(section.bodySv),
        bodyEn: sanitize(section.bodyEn),
        image: section.image,
        imageAltSv: section.imageAltSv,
        imageAltEn: section.imageAltEn,
      };
      if (existingIds.has(section.id)) {
        // Scoped to the page so an id from another page can't be overwritten.
        await tx.infoSection.updateMany({
          where: { id: section.id, pageId },
          data,
        });
      } else {
        await tx.infoSection.create({
          data: { id: section.id, pageId, ...data },
        });
      }
    }
    return input.version + 1;
  });
  return bumped;
};

const sanitize = (markdown: string | null) =>
  markdown ? DOMPurify.sanitize(markdown) : markdown;
