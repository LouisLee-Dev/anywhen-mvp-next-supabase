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
    <div className="page-content-wrapper">
      <div className="px-[8rem]">
        <h1 className="text-xl"> Available Offers </h1>
        <div className="py-3">
          <AvailableRequestSection
            propertyId={propertyId}
            property={property}
          />
        </div>
      </div>
    </div>
  );
}
