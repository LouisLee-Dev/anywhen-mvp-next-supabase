"use server";

import createServerClient from "@/core/supabase/supabase-server";
import { prisma } from "@/db";

export async function getCurrentUser() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) return null;
  const profile = await prisma.profiles.findFirst({ where: { id: user.id } });
  if (!profile) {
    return await prisma.profiles.create({
      data: { id: user.id, full_name: "", role: "guest", email: user.email },
    });
  }

  return profile;
}
