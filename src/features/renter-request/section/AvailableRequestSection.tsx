"use client";

import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMyProperties, useProperties } from "@/features/properties/hooks";
import {
  useAllRequests,
  useAvailableRequests,
  useAcceptedRequests,
  useAcceptRequest,
} from "@/features/renter-request/hooks";
import DashboardSection from "@/features/order/sections/DashboardSection";
import PropertyCard from "../components/PropertyCard";

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
    <div className="grid grid-cols-4">
      <div className="py-4">
        <PropertyCard property={property} />
      </div>
      <div className="col-span-3">
        <DashboardSection
          requests={availableRequests}
          propertyId={propertyId}
        />
      </div>
    </div>
  );
}
