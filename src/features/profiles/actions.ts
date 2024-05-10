"use server";

import { prisma } from "@/db";
import { ProfileInput } from "../auth/schema";
import { getCurrentProfile } from "@/core/auth/server";

export async function updateProfileAction(data: ProfileInput) {
  const profile = await getCurrentProfile();

  try {
    const request = await prisma.profiles.update({
      where: {
        id: profile.id,
      },
      data: {
        full_name: data.full_name,
        email:data.email
      },
    });
    return request;
  } catch (e) {
    console.log(e);
    return null;
  }
}
