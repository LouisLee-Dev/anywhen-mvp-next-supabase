import { z } from "zod";
import { offerSchema } from "../offers/schema";
import { categorySchema } from "../categories/schema";
import { currencySchema } from "../currency/schema";

export const rentalRequestSchema = z.object({
  id: z.string().optional(),
  profile_id: z.string().uuid().optional(),
  flexible_by_region: z.boolean(),
  location: z.string().optional(),
  category_id: z.string().uuid(),
  category: categorySchema.optional(),
  price_min: z.number(),
  price_max: z.number(),
  currency_id: z.string().uuid(),
  currency: currencySchema.optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  num_guests: z.number(),
  amenities: z.object({
    bedroom: z.number().optional(),
  }),
  message: z.string(),
  offer_ids: z.array(z.string().uuid()).optional(),
  offers: z.array(offerSchema).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type RentalRequest = z.infer<typeof rentalRequestSchema>;
