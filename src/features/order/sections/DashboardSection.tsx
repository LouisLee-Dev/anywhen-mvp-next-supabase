"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { useAcceptRentalRequestForProperty } from "@/features/requests/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RentalRequest } from "../schema";
import { HeartHandshakeIcon, StarIcon } from "lucide-react";

interface IDashboardSectionProps {
  requests: RentalRequest[];
  propertyId: string;
}

export default function DashboardSection({
  requests,
  propertyId,
}: IDashboardSectionProps) {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const acceptRequest = useAcceptRentalRequestForProperty(propertyId);

  async function handleAccept(id: string) {
    await acceptRequest
      .mutateAsync({ requestId: id })
      .then(({ success, request }) => {
        if (success) {
          console.log(request);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="page-content-wrapper">
      <div className="grid w-full">
        {requests.map((t: any) => (
          <Card className="mt-2 w-full" key={t.id}>
            <CardContent className="relative p-4">
              <div className="absolute right-2 top-2 z-10 cursor-pointer hover:text-primary">
                <HeartHandshakeIcon size={24}></HeartHandshakeIcon>
              </div>

              {propertyId !== "null" ? (
                <div className="absolute bottom-2 right-5 z-10 cursor-pointer hover:text-primary">
                  <Button
                    type="button"
                    size="sm"
                    className="mt-2"
                    color="primary"
                    onClick={() => handleAccept(t.id)}
                  >
                    Accept
                  </Button>
                </div>
              ) : (
                ""
              )}
              <div className="grid grid-cols-4">
                <div className="col-span-1">
                  <div>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 cursor-pointer rounded-full">
                        <AvatarImage
                          src="/assets/avatars/01.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <p className="whitespace-nowrap px-2 font-semibold">
                        {t?.profile?.full_name}
                      </p>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: `${t.message}` }}
                      className="pt-1"
                    />
                  </div>
                </div>
                <div key={t.id} className="gap-5">
                  <div className="w-full font-semibold">
                    {
                      categories.find(
                        (category) => category.id === t.category_id,
                      )?.title
                    }
                  </div>
                  <div className="font-semibold">{t.location} </div>
                  <div className="flex gap-1">
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
                  <div>
                    {t.start_date} ~ {t.end_date}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
