"use server";

import { prisma } from "@/db";
import { RentalRequest } from "./schema";
import { getCurrentProfile } from "@/core/auth/server";

export async function getMatchedRequests() {
  const profile = await getCurrentProfile();

  const requests = await prisma.requests.findMany({
    where: {
      profile_id: profile.id,
    },
  });

  return requests;
}

export async function getMyRequests() {
  const profile = await getCurrentProfile();

  const requests = await prisma.requests.findMany({
    where: {
      profile_id: profile.id,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      offers: true,
    },
  });

  return requests;
}

export async function createRequestAction(data: RentalRequest) {
  const profile = await getCurrentProfile();

  try {
    const request = await prisma.requests.create({
      data: {
        profile_id: profile.id,
        location: data.location,
        category_id: data.category_id,
        price_min: data.price_min,
        price_max: data.price_max,
        currency_id: data.currency_id,
        start_date: data.start_date,
        end_date: data.end_date,
        amenities: {
          bedroom: data.amenities.bedroom,
        },
        num_guests: data.num_guests,
        message: data.message,
      },
    });
    return request;
  } catch (e) {
    console.log(e);
    return null;
  }
}
