"use client";
import { useMatchedRequestsOfProperty } from "@/features/requests/hooks";
import PropertyCard from "../../requests/components/PropertyCard";
import RequestsSection from "../../requests/components/RequestsSection";

interface IRenterRequestForPropertySectionProps {
  propertyId: string;
  property: object;
}

export default function RenterRequestForPropertySection({
  propertyId,
  property,
}: IRenterRequestForPropertySectionProps) {
  const { data: requests, isLoading: isRequestsLoading } =
    useMatchedRequestsOfProperty(propertyId);

  return (
    <div className="grid grid-cols-4 gap-3">
      <div>
        <PropertyCard property={property} />
      </div>
      <div className="col-span-3">
        <RequestsSection requests={requests} propertyId={propertyId} />
      </div>
    </div>
  );
}
