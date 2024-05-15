"use client";
import { useAvailableRequests } from "@/features/renter-request/hooks";
import PropertyCard from "../components/PropertyCard";
import AvailableRequests from "../components/AvailableRequests";

interface IAvailableRequestSectionProps {
  propertyId: string;
  property: object;
}

export function AvailableRequestSection({
  propertyId,
  property,
}: IAvailableRequestSectionProps) {
  // const { data: properties, isLoading: isPropertiesLoading } =
  //   useMyProperties();

  // const { data: allRequests, isLoading: isAllRequestLoading } =
  //   useAllRequests();

  const { data: availableRequests, isLoading: isAvailableRequestLoading } =
    useAvailableRequests(propertyId);

  // const { data: acceptedRequests, isLoading: isAcceptedRequestLoading } =
  //   useAcceptedRequests();

  return (
    <div className="grid grid-cols-4 gap-3">
      <div>
        <PropertyCard property={property} />
      </div>
      <div className="col-span-3">
        <AvailableRequests
          requests={availableRequests}
          propertyId={propertyId}
        />
      </div>
    </div>
  );
}
