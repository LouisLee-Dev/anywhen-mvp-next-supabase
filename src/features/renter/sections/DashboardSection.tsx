"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { RentalRequest } from "../schema";

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
          <div className="flex flex-col">
          {requests.map((t: any) => (
            <Card className="mt-2 w-[300px]" key={t.id}>
              <CardContent className="p-4">
                <div key={t.id}>
                  <div>
                    <span className="font-semibold">Category: </span>{" "}
                    {
                      categories.find(
                        (category) => category.id === t.category_id,
                      )?.title
                    }
                  </div>
                  <div>
                    <span className="font-semibold">Location: </span>
                    {t.location}
                  </div>
                  <div>
                    <span className="font-semibold">Number of guess: </span>
                    {t.num_guests}
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <span className="font-semibold">Min Price:</span>{" "}
                      {t.price_min}
                    </div>
                    <div>
                      {
                        currencies.find(
                          (currency) => currency.id === t.currency_id,
                        )?.title
                      }
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <span className="font-semibold">Max Price: </span>
                      {t.price_max}
                    </div>
                    <div>
                      {
                        currencies.find(
                          (currency) => currency.id === t.currency_id,
                        )?.title
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Start Date: </span>
                    {t.start_date}
                  </div>
                  <div>
                    <span className="font-semibold">End Date: </span>
                    {t.end_date}
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
