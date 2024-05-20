import { prisma } from "@/db";
import RequestsOfPropertySection from "@/features/properties/sections/RequestsOfPropertySection";

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
      category: true,
      owner: true,
      images: true,
    },
  });

  if (!property) {
    return <div> 404 Not Found </div>;
  }

  return (
    <div className="page-content-wrapper">
      <div className="px-[8rem]">
        <div className="space-y-1 pb-3">
          <h1 className="text-xl font-semibold"> Available Requests </h1>
          <p className="text-sm text-gray-500">
            Shows matched requests from renters. You can accept request what you
            want and reject what you don&apos;t want.
          </p>
        </div>
        <RequestsOfPropertySection
          propertyId={propertyId}
          property={property}
        />
      </div>
    </div>
  );
}
