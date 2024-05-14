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

export function RenterRequestSection() {
  const { data: properties, isLoading: isPropertiesLoading } =
    useMyProperties();

  const { data: allRequests, isLoading: isAllRequestLoading } =
    useAllRequests();

  const { data: acceptedRequests, isLoading: isAcceptedRequestLoading } =
    useAcceptedRequests();

  return (
    <Tabs defaultValue="all" className="w-full px-5 py-5">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="w-1/3">
          All
        </TabsTrigger>
        <TabsTrigger value="active" className="w-1/3">
          Available
        </TabsTrigger>
        <TabsTrigger value="accepted" className="w-1/3">
          Accepted
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <DashboardSection requests={allRequests} propertyId="null" />
      </TabsContent>
      <TabsContent value="active">
        {isPropertiesLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-4 gap-5 p-4">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="accepted">
        <DashboardSection requests={acceptedRequests} propertyId="null" />
      </TabsContent>
    </Tabs>
  );
}
