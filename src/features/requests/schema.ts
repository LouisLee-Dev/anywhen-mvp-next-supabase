import { z } from "zod";
import { offerSchema } from "../offers/schema";

export const rentalRequestSchema = z.object({
  id: z.string().optional(),
  profile_id: z.string().uuid().optional(),
  flexible_by_region: z.boolean(),
  location: z.string().optional(),
  category_id: z.string().uuid(),
  price_min: z.number(),
  price_max: z.number(),
  currency_id: z.string().uuid(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  num_guests: z.number(),
  amenities: z.object({
    bedroom: z.number().optional(),
  }),
  message: z.string(),
  offers: z.array(offerSchema).optional(),
});

export type RentalRequest = z.infer<typeof rentalRequestSchema>;
