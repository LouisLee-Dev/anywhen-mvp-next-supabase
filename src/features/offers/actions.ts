"use server";
import { prisma } from "@/db";

export const getOffersOfRequest = async (requestId: string) => {
  const offers = await prisma.offers.findMany({
    where: {
      request_id: requestId,
    },
    include: {
      request: {
        include: {
          category: true,
          currency: true,
        },
      },
      property: {
        include: {
          images: true,
          owner: true,
          category: true,
          currency: true,
        },
      },
    },
  });

  return offers;
};
