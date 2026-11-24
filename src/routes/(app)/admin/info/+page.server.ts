import { fail } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import { setError, superValidate } from "sveltekit-superforms/server";
import { zod4 } from "sveltekit-superforms/adapters";
import { infoPageSchema } from "./schemas";
import type { Actions, PageServerLoad } from "./$types";
import * as m from "$paraglide/messages";
import { slugify } from "$lib/utils/slugify";
import { authorize } from "$lib/utils/authorization";
import apiNames from "$lib/utils/apiNames";
import { slugSchema } from "$lib/info/schema";
import { isSlugTaken } from "$lib/info/server/pages";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = locals;
  authorize(apiNames.INFO_PAGE.CREATE, user);

  return { form: await superValidate(zod4(infoPageSchema)) };
};

export const actions: Actions = {
  create: async (event) => {
    const { request, locals } = event;
    const { prisma, user } = locals;
    authorize(apiNames.INFO_PAGE.CREATE, user);
    const form = await superValidate(request, zod4(infoPageSchema));
    if (!form.valid) return fail(400, { form });

    const slug = slugify(form.data.name);
    if (!slugSchema.safeParse(slug).success) {
      return setError(form, "name", m.admin_info_invalidSlug());
    }
    if (await isSlugTaken(prisma, [slug])) {
      return setError(form, "name", m.admin_info_slugTaken());
    }

    await prisma.infoPage.create({
      data: {
        slug,
        titleSv: form.data.titleSv,
        titleEn: form.data.titleEn || null,
        updatedBy: user?.memberId,
      },
    });
    throw redirect(
      `/info/${slug}`,
      { message: m.admin_info_infoPageCreated(), type: "success" },
      event,
    );
  },
};
