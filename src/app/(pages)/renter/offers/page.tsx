import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import RenterOffersSection from "@/features/renter/sections/RenterOffersSection";

export default async function PageOffers() {
  const profile = await getCurrentProfile();
  const offers: any[] = await prisma.offers.findMany({
    where: {
      request: {
        profile_id: profile?.id,
      },
    },
    include: {
      property: {
        include: {
          category: true,
          currency: true,
          owner: true,
          images: true,
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
      <RenterOffersSection offers={offers} />
    </div>
  );
}
