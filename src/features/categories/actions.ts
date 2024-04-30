"use server";

import { prisma } from "@/db";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  console.log(categories);

  return categories;
};
export const getCurrencies = async () => {
  const currencies = await prisma.currency.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  console.log(currencies);

  return currencies;
};