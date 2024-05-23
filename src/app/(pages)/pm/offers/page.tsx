import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import { Offer } from "@/features/offers/schema";
import OffersSection from "@/features/offers/sections/OffersSection";

export default async function Renters() {
  const profile = await getCurrentProfile();
  const offers: any[] = await prisma.offers.findMany({
    where: {
      property: {
        owner_id: profile?.id,
      },
    },
    include: {
      property: {
        include: {
          category: true,
          currency: true,
        },
      },
      request: {
        include: {
          category: true,
          currency: true,
          profile: true,
        },
      },
    },
  });

  return (
    <div className="page-content-wrapper">
      <OffersSection offers={offers} />
    </div>
  );
}
