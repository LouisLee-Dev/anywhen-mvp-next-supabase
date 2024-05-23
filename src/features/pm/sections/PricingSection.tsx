"use client";

import { useCategories } from "@/features/categories/hooks";
import { NewPropertyForm } from "../../properties/components/PropertyFormDialog";
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
    <div className="w-full px-[8rem]">
      <h1 className="mb-4">Pricing</h1>
      <div className="flex justify-between gap-3">
        <PaymentCard periodTime="1 Month" price="$100 / Month" />
        <PaymentCard periodTime="6 Month" price="$500 / 6 Month" />
        <PaymentCard periodTime="1 Year" price="$1000 / Year" />
      </div>
    </div>
  );
}
