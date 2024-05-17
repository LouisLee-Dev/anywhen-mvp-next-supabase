"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RentalRequest } from "../schema";
import { ClockIcon, HeartHandshakeIcon, StarIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useMyRequests } from "../hooks";
import clsx from "clsx";

interface IDashboardSectionProps {}

const RentalRequestCard = ({ request }: { request: RentalRequest }) => {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  return (
    <Card className="mt-2">
      <CardContent
        className={clsx("relative space-y-2 px-4 py-2", {
          "bg-green-100": request.offers.length > 0,
        })}
      >
        <div className="absolute right-[-8px] top-2 rounded bg-primary px-3 py-1 text-white">
          {request.offers.length ? request.offers.length : "No"} Offers
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            {
              categories.find((category) => category.id === request.category_id)
                ?.title
            }
          </div>
        </div>
        <div className="font-semibold">{request.location} </div>
        <div className="flex items-center font-medium text-gray-500">
          <div>
            {request.price_min}{" "}
            {
              currencies.find((currency) => currency.id === request.currency_id)
                ?.title
            }{" "}
            ~ {request.price_max}{" "}
            {
              currencies.find((currency) => currency.id === request.currency_id)
                ?.title
            }
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

export default function DashboardSection() {
  const { data: requests, isLoading: isRequestsLoading } = useMyRequests();

  return (
    <div className="page-content-wrapper">
      <div className="px-[8rem]">
        <h1 className="w-full">Your Requests</h1>
        <div className="grid w-full grid-cols-3">
          <div className="col-span-3 ">
            {requests.map((t: any) => (
              <RentalRequestCard key={t.id} request={t} />
            ))}
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}
