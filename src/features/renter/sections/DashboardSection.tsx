"use client";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
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
          <div className="col-span-1">
            {requests.map((t: any) => (
              <div key={t.id}>
                <div>
                  {
                    categories.find((category) => category.id === t.category_id)
                      ?.title
                  }
                </div>
                <div>{t.location}</div>
                <div>{t.num_guests}</div>
                <div className="flex gap-1">
                  <div>{t.price_min}</div>
                  <div>
                    {
                      currencies.find(
                        (currency) => currency.id === t.currency_id)?.title
                    }
                  </div>
                </div>
                <div className="flex gap-1">
                  <div>{t.price_max}</div>
                  <div>
                    {
                      currencies.find(
                        (currency) => currency.id === t.currency_id)?.title
                    }
                  </div>
                </div>
                <div>{t.start_date}</div>
                <div>{t.end_date}</div>
              </div>
            ))}
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}
