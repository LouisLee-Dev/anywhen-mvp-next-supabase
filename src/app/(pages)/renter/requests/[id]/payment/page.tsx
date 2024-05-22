import { prisma } from "@/db";
import PaymentOfRequestSection from "@/features/renter/sections/PaymentOfRequestSection";

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
      <PaymentOfRequestSection request={request} />
    </div>
  );
}
