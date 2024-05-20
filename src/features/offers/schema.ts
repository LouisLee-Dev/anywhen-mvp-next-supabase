import { z } from "zod";
import { propertySchema } from "../properties/schema";
import { requestSchema } from "../requests/schema";

export const offerInputSchema = z.object({
  id: z.string().uuid().optional(),
  property_id: z.string().uuid(),
  request_id: z.string().uuid(),
  status: z.string().optional(),
  comment: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const offerSchema: z.ZodSchema = z.lazy(() =>
  offerInputSchema.extend({
    property: propertySchema,
    request: requestSchema,
  }),
);

export type Offer = z.infer<typeof offerSchema>;
