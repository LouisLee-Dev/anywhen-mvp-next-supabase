"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleDollarSignIcon,
  ClockIcon,
  HotelIcon,
  MapPinIcon,
  NavigationIcon,
} from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useDeclineOffer, useOffersOfRequest } from "../hooks";
import { getHumanizedDate } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm";
import { acceptOffer, declineOffer } from "@/features/offers/actions";
import { toast } from "sonner";
import { RentalRequest } from "@/features/requests/schema";
import { useRouter } from "next/navigation";
import { acceptedRequest } from "../actions";
import ProfileDialog from "@/features/requests/components/ProfileDialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Offer } from "@/features/offers/schema";
import PropertyDetailDialog from "@/features/properties/components/PropertyDetailDialog";

interface IOffersOfRequestSectionProps {
  request: RentalRequest;
}

export default function OffersOfRequestSection({
  request,
}: IOffersOfRequestSectionProps) {
  const { data: offers, isLoading } = useOffersOfRequest(request?.id);
  const confirm = useConfirm();

  const router = useRouter();
  const declineOffer = useDeclineOffer();

  const [open, setOpen] = useState(false);
  const [openProperty, setOpenProperty] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [create_at, setCreateAt] = useState<string>("");

  const handleAcceptOffer = async (offer: Offer) => {
    await acceptOffer(offer)
      .then((res) => {
        toast.success("Offer Booking");
        router.push(`/renter/requests/${request.id}/payment`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDeclineOffer = async (offer: Offer) => {
    await declineOffer.mutateAsync(offer).then(() => {
      toast.success("Offer Declined");
    });
  };

  return (
    <div className="px-[8rem]">
      <h1 className="mb-2 w-full">Offers</h1>
      <div className="grid grid-cols-4 gap-2">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle> Request Detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-lg font-semibold">
                {request?.category.title}
              </div>
              <div className="font-semibold">{request?.location} </div>
              <div className="flex items-center font-medium text-gray-500">
                <div>
                  {request?.price_min} {request?.currency.title} ~{" "}
                  {request?.price_max} {request?.currency.title}
                </div>
              </div>
              <div className="font-medium text-gray-500">
                {request?.start_date} ~ {request?.end_date}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${request?.message || "No message here!"}`,
                }}
                className="w-full rounded-md border p-2"
              />
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-base font-medium text-gray-500">
                  <ClockIcon size={20} className="mr-1" />
                  Sent{" "}
                  {dayjs
                    .duration(-dayjs().diff(dayjs(request?.created_at)))
                    .humanize(true)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 space-y-2">
          {offers.length > 0 ? (
            offers.map((offer) => {
              const profile = offer.property.owner;
              const property = offer.property;

              return (
                <div
                  className="relative rounded border p-3 hover:bg-gray-50"
                  key={offer.id}
                >
                  <ProfileDialog
                    profile={profile}
                    create_at={create_at}
                    open={open}
                    onOpenChange={setOpen}
                    headerTitle="Property Manager"
                  />
                  <PropertyDetailDialog
                    property={property}
                    open={openProperty}
                    onOpenChange={setOpenProperty}
                  />
                  {offer.status === "booking" ? (
                    <div className="absolute right-[-8px] top-2 rounded-md bg-blue-500 px-3 py-2 text-white">
                      Booking
                    </div>
                  ) : (
                    offer.status === "declined" && (
                      <div className="absolute right-[-8px] top-2 rounded-md bg-red-500 px-3 py-2 text-white">
                        Declined
                      </div>
                    )
                  )}
                  <div className="grid grid-cols-4">
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        Property Manager
                      </div>
                      <div className="flex items-center text-base font-semibold">
                        <Avatar
                          className="mr-2 h-12 w-12 cursor-pointer rounded-full"
                          onClick={() => {
                            setOpen(true);
                            setProfile(profile);
                            setCreateAt(profile?.created_at.toString());
                          }}
                        >
                          <AvatarImage
                            src="/assets/avatars/01.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {profile.full_name}
                      </div>
                      <div className="text-sm">
                        Joined{" "}
                        {dayjs
                          .duration(-dayjs().diff(dayjs(request?.created_at)))
                          .humanize(true)}
                      </div>
                    </div>
                    <div className="grid-cols-3 space-y-2">
                      <div
                        className="cursor-pointer text-lg font-semibold"
                        onClick={() => setOpenProperty(true)}
                      >
                        Property Detail
                      </div>
                      <div className="flex items-center gap-1 text-base font-semibold">
                        <NavigationIcon size={20}></NavigationIcon>
                        {property.title}
                      </div>
                      <div className="flex items-center gap-1 text-base font-semibold">
                        <HotelIcon size={20}></HotelIcon>
                        {property.category.title}
                      </div>

                      <div className="flex items-center gap-1 text-base font-semibold">
                        <MapPinIcon size={20}></MapPinIcon>
                        {property.location}
                      </div>

                      <p className="flex items-center space-x-1 text-base text-gray-600">
                        <CircleDollarSignIcon size={20}></CircleDollarSignIcon>
                        <span>
                          {property.price_min} {property.currency.title} ~{" "}
                          {property.price_max} {property.currency.title}
                        </span>
                      </p>
                      <div className="text-sm">
                        Created{" "}
                        {dayjs
                          .duration(-dayjs().diff(dayjs(property.created_at)))
                          .humanize(true)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="">
                      Sent {getHumanizedDate(offer.created_at)}
                    </div>
                    {offer?.status === "sent" && (
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          onClick={() => {
                            confirm({
                              title: "Accept Offer",
                              description:
                                "Are you sure you want to accept this offer?",
                            }).then(() => {
                              handleAcceptOffer(offer);
                            });
                          }}
                        >
                          Accept Offer
                        </Button>

                        <Button
                          variant="default"
                          className="bg-red-500 hover:bg-red-400"
                          onClick={() => {
                            confirm({
                              title: "Decline Offer",
                              description:
                                "Are you sure you want to decline this offer?",
                            }).then(() => {
                              handleDeclineOffer(offer);
                            });
                          }}
                        >
                          Decline Offer
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center font-semibold">No offers yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
