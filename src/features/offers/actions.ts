"use server";
import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import { Offer } from "./schema";

export const getOffersOfRequest = async (requestId: string) => {
  const offers = await prisma.offers.findMany({
    where: {
      AND: [{ request_id: requestId }, { status: { not: "cancelled" } }],
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

export const acceptOffer = async (offer: Offer) => {
  const previousOffer = await prisma.offers.findFirst({
    where: { id: offer.id },
  });

  const profile = await getCurrentProfile();

  if (previousOffer.status === "cancelled") {
    // await prisma.notifications.create({
    //   data: {
    //     from: profile.id,
    //     to: offer.property.owner_id,
    //     collection: "requests",
    //     type: "accepted",
    //     title: "Request accepted",
    //     message: `Your offer for ${offer.request.category.title} request has been accepted.`,
    //     data: offer,
    //     link: "",
    //     viewed: false,
    //   },
    // });
    throw new Error("Offer is cancelled.");
  }
  const updatedOffer = await prisma.offers.update({
    where: {
      id: offer.id,
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
  await prisma.notifications.create({
    data: {
      from: profile.id,
      to: offer.property.owner_id,
      collection: "offer",
      type: "accepted",
      title: "Offer accepted",
      message: `Your offer for ${offer.request.category.title} request has been accepted.`,
      data: offer,
      link: "",
      viewed: false,
    },
  });
  const request = await prisma.requests.update({
    where: {
      id: offer.request_id,
    },
    data: {
      status: "booking",
    },
  });

  const property = await prisma.property.update({
    where: {
      id: offer.property_id,
    },
    data: {
      status: "booking",
    },
  });

  return updatedOffer;
};

export const declineOffer = async (offer: Offer) => {
  const profile = await getCurrentProfile();

  await prisma.notifications.create({
    data: {
      from: profile.id,
      to: offer.property.owner_id,
      collection: "offer",
      type: "declined",
      title: "Offer declined",
      message: `Your offer for ${offer.request.category.title} request has been declined.`,
      data: offer,
      link: "",
      viewed: false,
    },
  });
  const updatedOffer = await prisma.offers.update({
    where: {
      id: offer.id,
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

  return { success: true, offer: updatedOffer };
};
