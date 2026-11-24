import { PUBLIC_BUCKETS_FILES } from "$env/static/public";
import { error, json } from "@sveltejs/kit";
import { uploadFile } from "$lib/files/uploadFiles";
import { isFileImage } from "$lib/files/utils";
import apiNames from "$lib/utils/apiNames";
import { authorize } from "$lib/utils/authorization";
import type { RequestHandler } from "./$types";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

export const POST: RequestHandler = async ({ request, locals }) => {
  const { user } = locals;
  authorize(apiNames.INFO_PAGE.UPDATE, user);

  const file = (await request.formData()).get("file");
  if (!(file instanceof File) || !isFileImage(file)) {
    throw error(400, "Expected an image");
  }
  if (file.size > MAX_IMAGE_BYTES) throw error(413, "The image is too large");

  const randomName = (Math.random() + 1).toString(36).substring(2);
  const url = await uploadFile(
    user,
    file,
    "public/info",
    PUBLIC_BUCKETS_FILES,
    randomName,
    { resize: { width: 1920 } },
  );
  return json({ url });
};
