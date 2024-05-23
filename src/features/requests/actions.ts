"use server";

import { action } from "@/lib/safe-action";
import { prisma } from "@/db";
import { getMyProperties } from "@/features/properties/actions";
import _ from "lodash";
import { omit } from "lodash";
import { RentalRequest, requestInputSchema } from "./schema";
import { getCurrentProfile, getCurrentUser } from "@/core/auth/server";
import { Property } from "../properties/schema";

export async function upsertOffer(
  propertyId: string,
  requestId: string,
  status: string,
) {
  const profile = await getCurrentProfile();
  const offer = await prisma.offers.findFirst({
    where: {
      property_id: propertyId,
      request_id: requestId,
    },
  });

  if (offer) {
    await prisma.offers.update({
      where: {
        id: offer.id,
      },
      data: {
        status,
      },
    });
  } else {
    await prisma.offers.create({
      data: {
        property_id: propertyId,
        request_id: requestId,
        status,
        comment: `${profile.full_name} ${status} an request`,
      },
    });
  }
}

export async function getAllRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
}

export async function getMatchedRequestsOfProperty(property: Property) {
  const matchedRequests: any[] = await prisma.requests.findMany({
    where: {
      OR: [
        {
          location: property.location,
        },
        {
          category_id: property.category_id,
        },
      ],
      AND: [
        {
          status: "pending",
        },
      ],
    },
  });

  return matchedRequests;
}

export async function getMatchedRequests(propertyId: string) {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
    },
  });
  const matchedRequests: any[] = await prisma.requests.findMany({
    where: {
      OR: [
        {
          location: property.location,
        },
        {
          category_id: property.category_id,
        },
      ],
      AND: [
        {
          status: "pending",
        },
      ],
    },
    include: {
      category: true,
      currency: true,
      profile: true,
      offers: {
        where: {
          property_id: propertyId,
        },
      },
    },
  });

  return matchedRequests;
}

export async function getBookingRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
}

export async function acceptRentalRequestForProperty(
  propertyId: string,
  requestId: string,
): Promise<{ success: boolean; message?: string; request?: any }> {
  const profile = await getCurrentProfile();

  try {
    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });
    const request = await prisma.requests.findFirst({
      where: {
        id: requestId,
      },
      include: {
        profile: true,
      },
    });
    switch (request.status) {
      case "accepted":
        return {
          success: false,
          message: "This request is no longer available!",
          request: null,
        };
      case "pending": {
        await upsertOffer(propertyId, requestId, "sent");
        await prisma.notifications.create({
          data: {
            from: profile?.id,
            to: request.profile_id,
            collection: "requests",
            type: "accepted",
            title: "Request accepted",
            message: `Your request has been accepted by ${profile.full_name} on ${property.title}(${property.location || "Anywhere"})`,
            data: request,
            link: "",
            viewed: false,
          },
        });
        const updatedRequest = await prisma.requests.findFirst({
          where: {
            id: requestId,
          },
          include: {
            category: true,
            currency: true,
            profile: true,
            offers: {
              where: {
                property_id: propertyId,
              },
            },
          },
        });
        return {
          success: true,
          request: updatedRequest,
          message:
            "You accepted an request. Renter will get notification soon.",
        };
      }
    }
  } catch (error) {
    return { success: false, message: (error as Error).message, request: null };
  }
}

export async function cancelRentalRequestForProperty(
  propertyId: string,
  requestId: string,
) {
  const profile = await getCurrentProfile();

  try {
    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });
    const request = await prisma.requests.findFirst({
      where: {
        id: requestId,
      },
      include: {
        profile: true,
      },
    });
    const offer = await prisma.offers.findFirst({
      where: {
        property_id: propertyId,
        request_id: requestId,
      },
    });

    if (offer?.status === "booking") {
      return {
        success: false,
        message: "This offer is booking now...",
      };
    }
    await upsertOffer(propertyId, requestId, "cancelled");
    await prisma.notifications.create({
      data: {
        from: profile?.id,
        to: request.profile_id,
        collection: "offers",
        type: "cancelled",
        title: "Offer cancelled",
        message: `An offer what you received has been cancelled by ${profile.full_name} on ${property.title}(${property.location || "Anywhere"})`,
        data: request,
        link: "",
        viewed: false,
      },
    });
    const updatedRequest = await prisma.requests.findFirst({
      where: {
        id: requestId,
      },
      include: {
        category: true,
        currency: true,
        profile: true,
        offers: {
          where: {
            property_id: propertyId,
          },
        },
      },
    });
    return { success: true, request: updatedRequest };
  } catch (error) {
    console.log(error);
    return { success: false, message: (error as Error).message };
  }
}
