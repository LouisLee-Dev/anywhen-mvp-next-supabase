import { prisma } from "@/db";
import { AvailableRequestSection } from "@/features/renter-request/section/AvailableRequestSection";

interface PropertyDetailPageProps {
  params: { id: string };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id: propertyId } = params;

  const property = await prisma.property.findFirst({
    where: { id: propertyId },
    include: {
      images: true,
    },
  });

  if (!property) {
    return <div> 404 Not Found </div>;
  }

  return (
    <div className="w-full">
      <div className="px-2 py-4 lg:px-[8rem]">
        <AvailableRequestSection propertyId={propertyId} />
      </div>
    </div>
  );
}
