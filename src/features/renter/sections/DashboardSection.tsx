"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RentalRequest } from "../schema";
import { ClockIcon, HeartHandshakeIcon, StarIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";

interface IDashboardSectionProps {
  requests: RentalRequest[];
}

export default function DashboardSection({ requests }: IDashboardSectionProps) {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  return (
    <div className="page-content-wrapper">
      <div className="px-[8rem]">
        <h1 className="w-full">Your Requests</h1>
        <div className="grid w-full grid-cols-3">
          <div className="col-span-3 ">
            {requests.map((t: any) => (
              <Card className="mt-2 " key={t.id}>
                <CardContent className="relative p-4">
                  <div className="grid grid-cols-4">
                    <div className="absolute right-2 top-2 z-10 flex cursor-pointer  items-center text-base font-medium text-gray-500">
                      <ClockIcon size={20} className="mr-1" />
                      Posted{" "}
                      {dayjs
                        .duration(-dayjs().diff(dayjs(t.created_at)))
                        .humanize(true)}
                    </div>
                    {t?.status === "accepted" && (
                      <div className="absolute bottom-2 right-[-8px]">
                        <div className="text-xs rounded-md bg-primary px-2 py-1 text-white">
                          Accepted
                        </div>
                      </div>
                    )}
                    <div className="col-span-3 space-y-1">
                      <div className="text-lg font-semibold">
                        {
                          categories.find(
                            (category) => category.id === t.category_id,
                          )?.title
                        }
                      </div>
                      <div className="font-semibold">{t.location} </div>
                      <div className="flex items-center font-medium text-gray-500">
                        <div>
                          {t.price_min}{" "}
                          {
                            currencies.find(
                              (currency) => currency.id === t.currency_id,
                            )?.title
                          }{" "}
                          ~ {t.price_max}{" "}
                          {
                            currencies.find(
                              (currency) => currency.id === t.currency_id,
                            )?.title
                          }
                        </div>
                      </div>
                      <div className="font-medium text-gray-500">
                        {t.start_date} ~ {t.end_date}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: `${t.message}` }}
                        className="w-full rounded-md border p-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}
