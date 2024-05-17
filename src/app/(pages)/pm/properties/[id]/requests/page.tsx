import { prisma } from "@/db";
import RenterRequestForPropertySection from "@/features/properties/sections/RenterRequestForPropertySection";

interface RentalRequestForPropertyPageProps {
  params: { id: string };
}

export default async function PropertyDetailPage({
  params,
}: RentalRequestForPropertyPageProps) {
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
      <div className="space-y-2 px-[8rem]">
        <h1 className="text-xl font-semibold"> Available Offers </h1>
        <div className="py-2">
          <RenterRequestForPropertySection
            propertyId={propertyId}
            property={property}
          />
        </div>
      </div>
    </div>
  );
}
