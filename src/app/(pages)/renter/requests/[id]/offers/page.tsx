import { prisma } from "@/db";
import OffersOfRequestSection from "@/features/renter/sections/OffersOfRequestSection";

export default async function Renters({ params }: { params: { id: string } }) {
  const request: any = await prisma.requests.findFirst({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      currency: true,
    },
  });

  return (
    <div className="page-content-wrapper">
      <OffersOfRequestSection request={request} />
    </div>
  );
}
