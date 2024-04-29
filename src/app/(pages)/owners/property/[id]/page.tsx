import { prisma } from "@/db";
import PropertyDetailSection from "@/features/properties/sections/PropertyDetailSection";

interface PropertyDetailPageProps {
  params: { id: string };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id: propertyId } = params;

  const property = await prisma.property.findFirst({
    where: { id: propertyId },
  });

  if (!property) {
    return <div> 404 Not Found </div>;
  }

  return (
    <div className="w-full">
      <div className="px-2 py-4 lg:px-[8rem]">
        <PropertyDetailSection propertyId={propertyId} />
      </div>
    </div>
  );
}
