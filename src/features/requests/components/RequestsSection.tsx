"use client";
import { useState } from "react";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import {
  useAcceptRentalRequestForProperty,
  useCancelRentalRequestForProperty,
} from "@/features/requests/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileDialog from "./ProfileDialog";
import { RentalRequest } from "../schema";
import {
  CalendarIcon,
  CircleDollarSignIcon,
  ClockIcon,
  DollarSignIcon,
  HotelIcon,
  MapPinIcon,
} from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useConfirm } from "@/components/confirm";

interface IRequestsSectionProps {
  requests: RentalRequest[];
  propertyId: string;
}

export default function RequestsSection({
  requests,
  propertyId,
}: IRequestsSectionProps) {
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [create_at, setCreateAt] = useState<string>("");

  const acceptRequest = useAcceptRentalRequestForProperty(propertyId);
  const cancelRequest = useCancelRentalRequestForProperty(propertyId);

  async function handleAcceptRequest(id: string) {
    await acceptRequest
      .mutateAsync({ requestId: id })
      .then(({ success, request }) => {
        if (success) {
          console.log(request);
        }
      })
      .catch((error) => console.log(error));
  }

  async function handleCancelRequest(id: string) {
    await cancelRequest
      .mutateAsync({ requestId: id })
      .then(({ success, request }) => {
        if (success) {
          console.log(request);
        }
      })
      .catch((error) => console.log(error));
  }

  console.log(requests);

  return (
    <div className="w-full space-y-2">
      <ProfileDialog
        profile={profile}
        open={open}
        create_at={create_at}
        onOpenChange={setOpen}
      />
      {requests.map((t: any) => {
        const isBooking =
          t.offers.filter((t: any) => t.status !== "cancelled").length > 0
            ? true
            : false;
        return (
          <Card className="w-full" key={t.id}>
            <CardContent className="relative p-3">
              {isBooking && (
                <div className="absolute right-[-8px] top-2 rounded bg-blue-500 px-2 py-1 text-white">
                  Offer Sent
                </div>
              )}
              <div className="grid grid-cols-4">
                <div className="col-span-1">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Avatar
                        className="h-12 w-12 cursor-pointer rounded-full"
                        onClick={() => {
                          setOpen(true);
                          setProfile(t?.profile);
                          setCreateAt(t?.profile?.created_at);
                        }}
                      >
                        <AvatarImage
                          src="/assets/avatars/01.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="whitespace-nowrap px-2 font-semibold">
                        {t?.profile?.full_name}
                      </div>
                    </div>
                    <div className="flex items-center text-base font-medium text-gray-500">
                      <ClockIcon size={20} className="mr-1" />
                      Posted{" "}
                      {dayjs
                        .duration(-dayjs().diff(dayjs(t.created_at)))
                        .humanize(true)}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 space-y-2">
                  <div className="font-semibold text-gray-600">
                    Request Details
                  </div>
                  <div className="space-y-3 px-2">
                    <div className="flex items-center space-x-1 text-lg font-semibold">
                      <HotelIcon></HotelIcon>
                      <span>{t.category.title}</span>
                    </div>
                    <div className="flex items-center space-x-1 font-medium text-gray-500">
                      <MapPinIcon size={20}></MapPinIcon>
                      <span>{t.location ? t.location : "Anywhere"}</span>
                    </div>
                    <div className="flex items-center space-x-1  text-gray-500">
                      <CircleDollarSignIcon size={20}></CircleDollarSignIcon>
                      <span>
                        {t.price_min} {t.currency.title} ~ {t.price_max}{" "}
                        {t.currency.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1  text-gray-500">
                      <CalendarIcon size={20}></CalendarIcon>
                      <span>
                        {t.start_date} ~ {t.end_date}
                      </span>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: `${t.message}` }}
                      className="w-full rounded-md border p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                {!isBooking ? (
                  <Button
                    type="button"
                    size="sm"
                    className="mt-2"
                    variant="default"
                    onClick={() => {
                      confirm({
                        title: "Send an offer",
                        description:
                          "Are you sure you want to accept this request and send an offer?",
                      }).then(() => {
                        handleAcceptRequest(t.id);
                      });
                    }}
                  >
                    Send Offer
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    className="mt-2"
                    variant="danger"
                    onClick={() => {
                      confirm({
                        title: "Cancel offer",
                        description:
                          "Are you sure you want to cancel this offer?",
                      }).then(() => {
                        handleCancelRequest(t.id);
                      });
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
