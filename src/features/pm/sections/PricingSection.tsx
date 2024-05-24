"use client";

import { useCategories } from "@/features/categories/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyProperties, useProperties } from "@/features/properties/hooks";
import PaymentCard from "../components/PaymentCard";

// interface INewPropertySectionProps {

// }

export default function PricingSection() {
  return (
    <div className="w-full lg:px-[8rem] px-2">
      <h1 className="mb-4">Pricing</h1>
      <div className="flex lg:flex-row flex-col justify-between gap-3">
        <PaymentCard periodTime="1 Month" price="$100 / Month" />
        <PaymentCard periodTime="6 Months" price="$500 / 6 Months" />
        <PaymentCard periodTime="1 Year" price="$1000 / Year" />
      </div>
    </div>
  );
}
