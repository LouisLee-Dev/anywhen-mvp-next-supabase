"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Offer } from "../../offers/schema";
import { useMemo } from "react";
import dayjs from "dayjs";
import { formatDate } from "@/lib/utils";
import { getHumanizedDate } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  CircleDollarSignIcon,
  HotelIcon,
  MapPinIcon,
  NavigationIcon,
} from "lucide-react";

interface IRenterOffersSectionProps {
  offers: Offer[];
}

const OfferCard = ({ offer }: { offer: Offer }) => {
  return (
    <div className="flex items-center justify-between space-x-8 border-b border-gray-200 p-4">
      <div className="space-y-1">
        <div className="text-lg font-semibold">
          {offer.request.profile.full_name}
        </div>
        <div className="text-base font-medium">
          Requested {formatDate(offer.request.created_at)}
        </div>
        <div className="text-sm">
          {getHumanizedDate(offer.request.created_at)}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="text-base font-semibold text-gray-800">Property</h2>
        <div className="space-y-2 pl-2">
          <h2 className="flex items-center space-x-2 text-base font-semibold text-gray-800">
            <HotelIcon></HotelIcon>
            <span>{offer.property.category.title}</span>
          </h2>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
            <NavigationIcon size={20}></NavigationIcon>
            <span>{offer.property.title}</span>
          </h3>
          <p className="flex items-center space-x-2 text-base text-gray-600">
            <MapPinIcon size={20}></MapPinIcon>
            <span>{offer.property.location}</span>
          </p>
          <div className="flex items-center space-x-2  text-gray-500">
            <CircleDollarSignIcon size={20}></CircleDollarSignIcon>
            <span>
              {offer.property.price_min} {offer.property.currency.title} ~{" "}
              {offer.property.price_max} {offer.property.currency.title}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="text-base font-semibold text-gray-800">Request</h2>
        <div className="space-y-2 pl-2">
          <h2 className="flex items-center space-x-2 text-base font-semibold text-gray-800">
            <HotelIcon></HotelIcon>
            <span>{offer.request.category.title}</span>
          </h2>
          <p className="flex items-center space-x-2 text-base text-gray-600">
            <MapPinIcon size={20}></MapPinIcon>
            <span>{offer.request.location}</span>
          </p>
          <div className="flex items-center space-x-2  text-gray-500">
            <CircleDollarSignIcon size={20}></CircleDollarSignIcon>
            <span>
              {offer.request.price_min} {offer.request.currency.title} ~{" "}
              {offer.request.price_max} {offer.request.currency.title}
            </span>
          </div>
          <p className="flex items-center space-x-2 text-gray-600">
            <CalendarIcon size={20}></CalendarIcon>
            <span>
              {offer.request.start_date} ~ {offer.request.end_date}
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <Button variant="default"> View Offer </Button>
      </div>
    </div>
  );
};

export default function RenterOffersSection({
  offers,
}: IRenterOffersSectionProps) {
  const activeOffers = useMemo(
    () => offers.filter((offer) => offer.status === "booking"),
    [offers],
  );
  const sentOffers = useMemo(
    () => offers.filter((offer) => offer.status === "accepted"),
    [offers],
  );
  const decliendOffers = useMemo(
    () => offers.filter((offer) => offer.status === "cancelled"),
    [offers],
  );

  return (
    <div className="px-[8rem]">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="active"
      >
        <AccordionItem value="active">
          <AccordionTrigger className="hover:no-underline">
            Active Offers
          </AccordionTrigger>
          <AccordionContent>
            {activeOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sent">
          <AccordionTrigger className="hover:no-underline">
            Sent Offers
          </AccordionTrigger>
          <AccordionContent>
            {sentOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="declined">
          <AccordionTrigger className="hover:no-underline">
            Declined Offers
          </AccordionTrigger>
          <AccordionContent>
            {decliendOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
