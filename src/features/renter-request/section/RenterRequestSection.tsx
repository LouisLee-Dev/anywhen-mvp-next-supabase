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
  const { data: acceptedRequests, isLoading: isAcceptedRequestLoading } =
    useAcceptedRequests();

  return (
    <div className="page-content-wrapper">
      <Tabs defaultValue="available" className="w-full px-5 py-5">
        <TabsList className="w-full">
          <TabsTrigger value="available" className="w-1/2">
            Available
          </TabsTrigger>
          <TabsTrigger value="accepted" className="w-1/2">
            Accepted
          </TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          {isPropertiesLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-6 gap-4 p-3">
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
    </div>
  );
}
