"use server";

import { action } from "@/lib/safe-action";
import { prisma } from "@/db";
import { getMyProperties } from "@/features/properties/actions";
import _ from "lodash";
import { RentalRequest, rentalRequestSchema } from "./schema";

export async function getAllRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
}

export async function getAvailableRequest(propertyId: string) {
  const myProperties = await getMyProperties();

  const location = _.uniq(myProperties.filter((t) => t.id == propertyId))[0]
    ?.location;

  const category = _.uniq(myProperties.filter((t) => t.id == propertyId))[0]
    ?.category_id;

  const availableRequests: any[] = await prisma.requests.findMany({
    where: {
      OR: [
        {
          location,
        },
        {
          category_id: category,
        },
      ],
      AND: [
        {
          status: { not: "accepted" },
        },
      ],
    },
    include: { profile: { select: { full_name: true } } },
  });

  return availableRequests;
}

export async function getAcceptedRequest() {
  const acceptedRequests: any[] = await prisma.requests.findMany({
    where: {
      status: "accepted",
    },
    include: { profile: { select: { full_name: true } } },
  });

  return acceptedRequests;
}

export async function acceptRequest(id: string) {
  try {
    const request = await prisma.requests.update({
      where: {
        id,
      },
      data: { status: "accepted" },
    });
    return { success: true, request };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
