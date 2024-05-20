"use client";
import { useMatchedRequestsOfProperty } from "@/features/requests/hooks";
import PropertyCard from "../../requests/components/PropertyCard";
import RequestsSection from "../../requests/components/RequestsSection";
import { Property } from "../schema";

interface IRequestsOfPropertySectionProps {
  propertyId: string;
  property: Property;
}

export default function RequestsOfPropertySection({
  propertyId,
  property,
}: IRequestsOfPropertySectionProps) {
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
