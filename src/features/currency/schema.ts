import { z } from "zod";

export const currencySchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional(),
});

export type Currency = z.infer<typeof currencySchema>;
