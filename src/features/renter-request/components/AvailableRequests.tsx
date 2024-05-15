"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { useAcceptRequest } from "@/features/renter-request/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RentalRequest } from "../schema";
import { ClockIcon, HeartHandshakeIcon, StarIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";

interface IAvailableRequestsProps {
  requests: RentalRequest[];
  propertyId: string;
}

export default function AvailableRequests({
  requests,
  propertyId,
}: IAvailableRequestsProps) {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const acceptRequest = useAcceptRequest();

  async function handleAccept(id: string) {
    await acceptRequest
      .mutateAsync(id)
      .then(({ success, request }) => {
        if (success) {
          console.log(request);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full space-y-2">
      {requests.map((t: any) => (
        <Card className="w-full" key={t.id}>
          <CardContent className="relative p-3">
            <div className="grid grid-cols-4">
              <div className="col-span-1">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 cursor-pointer rounded-full">
                      <AvatarImage src="/assets/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="whitespace-nowrap px-2 font-semibold">
                      {t?.profile?.full_name}
                    </div>
                  </div>
                  <div className="flex items-center text-base font-medium text-gray-500">
                    <ClockIcon size={20} className="mr-1" />
                    Joined{" "}
                    {dayjs
                      .duration(-dayjs().diff(dayjs(t.created_at)))
                      .humanize(true)}
                  </div>
                </div>
              </div>
              <div className="col-span-3 space-y-1">
                <div className="text-lg font-semibold">
                  {
                    categories.find((category) => category.id === t.category_id)
                      ?.title
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
            <div className="flex items-center justify-end">
              <Button
                type="button"
                size="sm"
                className="mt-2"
                color="primary"
                onClick={() => handleAccept(t.id)}
              >
                Accept Request
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
