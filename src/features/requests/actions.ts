"use server";

import { action } from "@/lib/safe-action";
import { prisma } from "@/db";
import { getMyProperties } from "@/features/properties/actions";
import _ from "lodash";
import { omit } from "lodash";
import { RentalRequest, rentalRequestSchema } from "./schema";
import { getCurrentProfile, getCurrentUser } from "@/core/auth/server";

export async function getAllRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
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
    },
    include: {
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

export async function getAcceptedRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
}

export async function acceptRentalRequestForProperty(
  propertyId: string,
  requestId: string,
) {
  const profile = await getCurrentProfile();

  try {
    const request = await prisma.requests.findFirst({
      where: {
        id: requestId,
      },
      include: {
        profile: true,
      },
    });
    await prisma.offers.create({
      data: {
        property_id: propertyId,
        request_id: request.id,
        status: "accepted",
        comment: `${profile.full_name} accepted your request`,
      },
    });
    await prisma.notifications.create({
      data: {
        from: profile.id,
        to: request.profile_id,
        body: {
          type: "accept",
          message: `Your request has been accepted by ${profile.full_name}`,
          data: request,
        },
        viewed: false,
      },
    });
    const updatedRequest = await prisma.requests.findFirst({
      where: {
        id: requestId,
      },
      include: {
        offers: {
          where: {
            property_id: propertyId,
          },
        },
      },
    });
    return { success: true, request: updatedRequest };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
