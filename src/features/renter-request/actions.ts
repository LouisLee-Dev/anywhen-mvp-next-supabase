"use server";

import { prisma } from "@/db";
import { getMyProperties } from "@/features/properties/actions";
import _ from "lodash";

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
