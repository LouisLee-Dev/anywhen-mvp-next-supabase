"use server";

import { prisma } from "@/db";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return categories;
};
