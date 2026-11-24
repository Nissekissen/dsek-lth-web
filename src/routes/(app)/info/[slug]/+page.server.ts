import { error, fail } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import apiNames from "$lib/utils/apiNames";
import { authorize } from "$lib/utils/authorization";
import { savePageSchema } from "$lib/info/schema";
import {
  findInfoPage,
  isSlugTaken,
  savePage,
  toEditorSection,
  VersionConflictError,
} from "$lib/info/server/pages";
import * as m from "$paraglide/messages";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const page = await findInfoPage(locals.prisma, params.slug);
  if (!page) throw error(404, { message: "Not found" });
  return {
    page: {
      id: page.id,
      slug: page.slug,
      titleSv: page.titleSv,
      titleEn: page.titleEn,
      aliases: page.aliases,
      version: page.version,
    },
    sections: page.sections.map(toEditorSection),
  };
};

export const actions: Actions = {
  save: async ({ request, locals, params }) => {
    const { prisma, user } = locals;
    authorize(apiNames.INFO_PAGE.UPDATE, user);

    const payload = (await request.formData()).get("payload");
    let json: unknown;
    try {
      json = JSON.parse(typeof payload === "string" ? payload : "");
    } catch {
      return fail(400, { message: m.info_edit_save_failed() });
    }
    const parsed = savePageSchema.safeParse(json);
    if (!parsed.success) {
      return fail(400, { message: m.info_edit_save_failed() });
    }

    const page = await findInfoPage(prisma, params.slug);
    if (!page) throw error(404, { message: "Not found" });

    // A page's own slug doesn't need to be an alias.
    const aliases = parsed.data.aliases.filter((alias) => alias !== page.slug);
    if (aliases.length > 0 && (await isSlugTaken(prisma, aliases, page.id))) {
      return fail(400, { message: m.info_edit_alias_taken() });
    }

    try {
      const version = await savePage(prisma, user, page.id, {
        ...parsed.data,
        aliases,
      });
      return { version, aliases };
    } catch (e) {
      if (e instanceof VersionConflictError) {
        return fail(409, { message: m.info_edit_conflict() });
      }
      throw e;
    }
  },

  delete: async (event) => {
    const { locals, params } = event;
    authorize(apiNames.INFO_PAGE.DELETE, locals.user);
    const page = await findInfoPage(locals.prisma, params.slug);
    if (!page) throw error(404, { message: "Not found" });
    await locals.prisma.infoPage.delete({ where: { id: page.id } });
    throw redirect(
      "/",
      { message: m.info_edit_deleted(), type: "success" },
      event,
    );
  },
};
