"use server";
import { prisma } from "@/db";

export const getOffersOfRequest = async (requestId: string) => {
  const offers = await prisma.offers.findMany({
    where: {
      AND: [{ request_id: requestId }],
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

export const acceptOffer = async (offerId: string) => {
  const offer = await prisma.offers.update({
    where: {
      id: offerId,
    },
    data: {
      status: "booking",
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

  return offer;
};

export const declineOffer = async (offerId: string) => {
  const offer = await prisma.offers.update({
    where: {
      id: offerId,
    },
    data: {
      status: "declined",
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

  return offer;
};
