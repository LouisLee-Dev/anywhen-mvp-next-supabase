"use server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "./server";

export default async function updateLastSignIn() {
  const user = await getCurrentUser();
  const profile = prisma.profiles.update({
    where: {
      id: user.id,
    },
    data: {
      last_sign_in_at: new Date(),
    },
  });

  return { success: true, profile };
}
