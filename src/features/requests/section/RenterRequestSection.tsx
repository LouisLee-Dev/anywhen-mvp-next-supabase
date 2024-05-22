"use client";

import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMyProperties, useProperties } from "@/features/properties/hooks";
import {
  useAllRequests,
  useMatchedRequestsOfProperty,
  useBookingRequests,
} from "@/features/requests/hooks";
import DashboardSection from "@/features/order/sections/DashboardSection";
import PropertyCard from "../components/PropertyCard";

export function RenterRequestSection() {
  const { data: properties, isLoading: isPropertiesLoading } =
    useMyProperties();
  const { data: acceptedRequests, isLoading: isBookingRequestLoading } =
    useBookingRequests();

  return (
    <div className="page-content-wrapper px-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="booking">
          <AccordionTrigger className="hover:no-underline">
            Active Offers
          </AccordionTrigger>
          <AccordionContent>This is Active Offer Section</AccordionContent>
        </AccordionItem>
        <AccordionItem value="sent">
          <AccordionTrigger className="hover:no-underline">
            Sent Offers
          </AccordionTrigger>
          <AccordionContent>This is Sent Offer Section</AccordionContent>
        </AccordionItem>
        <AccordionItem value="declined">
          <AccordionTrigger className="hover:no-underline">
            Declined Offers
          </AccordionTrigger>
          <AccordionContent>This is Declined Offer Section</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
