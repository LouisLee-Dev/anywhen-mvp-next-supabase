"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Offer } from "../../offers/schema";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { formatDate } from "@/lib/utils";
import { getHumanizedDate, getPublicUrl } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  CircleDollarSignIcon,
  HotelIcon,
  MapPinIcon,
  NavigationIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProfileDialog from "@/features/requests/components/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PropertyDetailDialog from "@/features/properties/components/PropertyDetailDialog";

interface IRenterOffersSectionProps {
  offers: Offer[];
}

const OfferCard = ({ offer }: { offer: Offer }) => {
  const [open, setOpen] = useState(false);
  const [openProperty, setOpenProperty] = useState(false);
  const profile = offer.request.profile;
  const [create_at, setCreateAt] = useState<string>("");
  return (
    <div className="flex flex-col justify-between gap-2 space-x-2 p-2 lg:flex-row lg:space-x-8 lg:p-4">
      <ProfileDialog
        profile={profile}
        create_at={create_at}
        open={open}
        onOpenChange={setOpen}
        headerTitle="Renter Profile"
      />
      <PropertyDetailDialog
        property={offer.property}
        open={openProperty}
        onOpenChange={setOpenProperty}
      />
      <div className="space-y-3">
        <h2
          className="cursor-pointer text-base font-semibold text-gray-800"
          onClick={() => setOpen(true)}
        >
          Renter
        </h2>
        <div className="flex items-center text-lg font-semibold">
          <Avatar
            className="mr-1 h-12 w-12 cursor-pointer rounded-full"
            onClick={() => {
              setOpen(true);
              setCreateAt(profile?.created_at.toString());
            }}
          >
            <AvatarImage src="/assets/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {offer.request.profile.full_name}
        </div>
        <div className="text-base font-medium">
          Requested {formatDate(offer.request.created_at)}
        </div>
        <div className="text-sm">
          {getHumanizedDate(offer.request.created_at)}
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <h2
          className="cursor-pointer text-base font-semibold text-gray-800"
          onClick={() => setOpenProperty(true)}
        >
          View My Property
        </h2>
        <div className="flex space-x-2 space-y-2 pl-2">
          <div
            className="aspect-video cursor-pointer"
            onClick={() => setOpenProperty(true)}
          >
            {offer?.property?.images?.length > 0 ? (
              <img
                src={getPublicUrl(
                  "properties",
                  offer.property?.images[0]?.path,
                )}
                className="h-full w-[150px] rounded-md object-cover"
                alt="Property Image"
              />
            ) : (
              <div className="text-md flex h-full w-[150px] items-center justify-center rounded-xl bg-gray-200 text-center">
                No Preview Image Available
              </div>
            )}
          </div>
          <div>
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
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="text-base font-semibold text-gray-800">
          Renter Request
        </h2>
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
    </div>
  );
};

export default function OffersSection({ offers }: IRenterOffersSectionProps) {
  const activeOffers = useMemo(
    () => offers.filter((offer) => offer.status === "booking"),
    [offers],
  );
  const sentOffers = useMemo(
    () => offers.filter((offer) => offer.status === "sent"),
    [offers],
  );
  const decliendOffers = useMemo(
    () => offers.filter((offer) => offer.status === "declined"),
    [offers],
  );

  return (
    <div className="px-2 lg:px-[8rem]">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="booking"
      >
        <AccordionItem value="booking">
          <AccordionTrigger className="hover:no-underline">
            Active Offer
          </AccordionTrigger>
          <AccordionContent>
            {activeOffers.map((offer, i) => (
              <div className="px-1 lg:px-4" key={offer.id}>
                <OfferCard offer={offer} />
                {activeOffers.length - 1 !== i && (
                  <Separator className="my-2 lg:my-4" />
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sent">
          <AccordionTrigger className="hover:no-underline">
            Sent Offers
          </AccordionTrigger>
          <AccordionContent>
            {sentOffers.map((offer, i) => (
              <div className="px-1 lg:px-4" key={offer.id}>
                <OfferCard offer={offer} />
                {sentOffers.length !== i && (
                  <Separator className="my-2 lg:my-4" />
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="declined">
          <AccordionTrigger className="hover:no-underline">
            Declined Offers
          </AccordionTrigger>
          <AccordionContent>
            {decliendOffers.map((offer, i) => (
              <div className="px-1 lg:px-4" key={offer.id}>
                <OfferCard offer={offer} />
                {decliendOffers.length !== i && (
                  <Separator className="my-2 lg:my-4" />
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
