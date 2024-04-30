"use server";

import { prisma } from "@/db";

export const getCurrencies = async () => {
  const currencies = await prisma.currency.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return currencies;
};
