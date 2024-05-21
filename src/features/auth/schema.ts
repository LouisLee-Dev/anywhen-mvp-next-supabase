import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const profileInputSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  full_name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;

export const changePasswordSchema = z
  .object({
    password: z.string().min(6),
    new_password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "new_password and confirm_password must match",
    path: ["confirm_password"],
  });
