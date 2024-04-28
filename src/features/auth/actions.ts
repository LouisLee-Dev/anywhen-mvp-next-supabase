"use server";

import { prisma } from "@/db";

export const getProfile = async (id: string) => {
  const profile = await prisma.profiles.findUnique({
    where: {
      id,
    },
  });

  return profile;
};
