import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
