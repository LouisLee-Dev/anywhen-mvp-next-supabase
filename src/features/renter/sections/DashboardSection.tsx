"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { Card, CardContent } from "@/components/ui/card";
import {
  BuildingIcon,
  CalendarClockIcon,
  CircleDollarSign,
  ClockIcon,
  MapPinIcon,
} from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useMyRequests } from "../hooks";
import clsx from "clsx";
import Link from "next/link";
import { RentalRequest } from "@/features/requests/schema";

interface IDashboardSectionProps {}

const RentalRequestCard = ({ request }: { request: RentalRequest }) => {
  return (
    <Card className="mt-2">
      <CardContent
        className={clsx("relative space-y-2 px-4 py-2", {
          "bg-green-50": request.offers.length > 0,
        })}
      >
        {request.status === "pending" ? (
          <Link
            className="absolute right-[-8px] top-2 rounded bg-primary px-3 py-1 text-white transition-all duration-300 hover:bg-primary/75"
            href={`/renter/requests/${request.id}/offers`}
          >
            {request.offers.length ? request.offers.length : "No"} Offers
          </Link>
        ) : (
          request.status === "accepted" && (
            <Link
              className="absolute right-[-8px] top-2 rounded bg-primary px-3 py-1 text-white transition-all duration-300 hover:bg-primary/75"
              href={`/renter/requests/${request.id}/offers`}
            >
              Booking
            </Link>
          )
        )}
        <div className="flex items-center space-x-2">
          <BuildingIcon size={20}></BuildingIcon>
          <div className="text-lg font-semibold">{request.category.title}</div>
        </div>
        <div className="flex items-center space-x-2 font-medium text-gray-600">
          <MapPinIcon size={20} />
          <span>{request.location || "Anywhere"}</span>
        </div>
        <div className="flex items-center space-x-2 font-medium text-gray-500">
          <CircleDollarSign size={20} />
          <div>
            {request.price_min} {request.currency.title} ~ {request.price_max}{" "}
            {request.currency.title}
          </div>
        </div>
        <div className="flex items-center space-x-2 font-medium text-gray-500">
          <CalendarClockIcon size={20}></CalendarClockIcon>
          <span>
            {request.start_date} ~ {request.end_date}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: `${request.message}` }}
          className="w-full rounded-md border p-2"
        />
        <div className="flex items-center justify-end">
          <div className="flex cursor-pointer items-center text-sm font-medium text-gray-500">
            <ClockIcon size={18} className="mr-1" />
            Posted{" "}
            {dayjs
              .duration(-dayjs().diff(dayjs(request.created_at)))
              .humanize(true)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface IDashboardSectionProps {
  requests: RentalRequest[];
}

export default function DashboardSection({ requests }: IDashboardSectionProps) {
  return (
    <div className="px-[8rem]">
      <h1>Your Requests</h1>
      <div className="grid w-full grid-cols-3">
        <div className="col-span-3 ">
          {requests.map((t: RentalRequest) => (
            <RentalRequestCard key={t.id} request={t} />
          ))}
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
