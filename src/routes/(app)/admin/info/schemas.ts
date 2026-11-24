import type { Infer } from "sveltekit-superforms";
import { z } from "zod";

export const infoPageSchema = z.object({
  // Turned into a slug on the server, so any text is accepted here.
  name: z.string().trim().min(1).max(100),
  titleSv: z.string().trim().min(1).max(255),
  titleEn: z.string().trim().max(255).nullish(),
});
export type InfoPageSchema = Infer<typeof infoPageSchema>;
