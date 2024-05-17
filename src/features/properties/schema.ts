import { z } from "zod";
import { rentalRequestSchema } from "../requests/schema";

export const propertyInputSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(6),
  description: z.string(),
  category_id: z.string().uuid(),
  owner_id: z.string().uuid().optional().nullable(),
  price_min: z.number().optional().nullable(),
  price_max: z.number().optional().nullable(),
  currency_id: z.string().uuid().optional().nullable(),
  location: z.string().optional().optional().nullable(),
  available_begin: z.date().optional().nullable(),
  available_end: z.date().optional().nullable(),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export const propertySchema = propertyInputSchema.extend({
  matchedRequests: z.array(rentalRequestSchema).optional(),
  images: z.array(
    z.object({
      id: z.string().uuid(),
      property_id: z.string().uuid(),
      path: z.string(),
    }),
  ),
});

export type Property = z.infer<typeof propertySchema>;
