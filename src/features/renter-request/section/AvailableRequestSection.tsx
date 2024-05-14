"use client";

import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMyProperties, useProperties } from "@/features/properties/hooks";
import {
  useAllRequests,
  useAvailableRequests,
  useAcceptedRequests,
} from "@/features/renter-request/hooks";
import DashboardSection from "@/features/order/sections/DashboardSection";
import PropertyCard from "../components/PropertyCard";

interface IAvailableRequestSectionProps {
  propertyId: string;
}

export function AvailableRequestSection({
  propertyId,
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
    <DashboardSection requests={availableRequests} propertyId={propertyId} />
  );
}
