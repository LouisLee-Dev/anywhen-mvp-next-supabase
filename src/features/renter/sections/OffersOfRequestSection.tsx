"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RentalRequest } from "../schema";
import { ClockIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useOffersOfRequest } from "../hooks";
import { getHumanizedDate } from "@/lib/client";
import { Button } from "@/components/ui/button";

interface IOffersOfRequestSectionProps {
  request: RentalRequest;
}

export default function OffersOfRequestSection({
  request,
}: IOffersOfRequestSectionProps) {
  const { data: offers, isLoading } = useOffersOfRequest(request.id);

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
                {request.category.title}
              </div>
              <div className="font-semibold">{request.location} </div>
              <div className="flex items-center font-medium text-gray-500">
                <div>
                  {request.price_min} {request.currency.title} ~{" "}
                  {request.price_max} {request.currency.title}
                </div>
              </div>
              <div className="font-medium text-gray-500">
                {request.start_date} ~ {request.end_date}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: `${request.message}` }}
                className="w-full rounded-md border p-2"
              />
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-base font-medium text-gray-500">
                  <ClockIcon size={20} className="mr-1" />
                  Sent{" "}
                  {dayjs
                    .duration(-dayjs().diff(dayjs(request.created_at)))
                    .humanize(true)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 space-y-2">
          {offers.map((offer) => {
            const profile = offer.property.owner;
            const property = offer.property;

            return (
              <div
                className="rounded border p-3 hover:bg-gray-50"
                key={offer.id}
              >
                <div className="grid grid-cols-4">
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">
                      Property Manager
                    </div>
                    <div className="text-base font-semibold">
                      {profile.full_name}
                    </div>
                    <div className="text-sm">
                      Joined{" "}
                      {dayjs
                        .duration(-dayjs().diff(dayjs(request.created_at)))
                        .humanize(true)}
                    </div>
                  </div>
                  <div className="grid-cols-3 space-y-2">
                    <div className="text-lg font-semibold">Property Detail</div>
                    <div className="text-base font-semibold">
                      {property.category.title}
                    </div>
                    <div className="text-base font-semibold">
                      {property.location}
                    </div>
                    <div className="flex items-center font-medium text-gray-500">
                      <div>
                        {property.price_min} {property.currency.title} ~{" "}
                        {property.price_max} {property.currency.title}
                      </div>
                    </div>
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
                  <div className="">
                    <Button variant="default">Accept Offer</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
