"use client";

import { useCategories } from "@/features/categories/hooks";
import { NewPropertyForm } from "../components/NewPropertyForm";
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
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: properties, isLoading: isPropertiesLoading } =
    useMyProperties();

  return (
    <div className="w-full">
      <h1 className="mb-4">Pricing</h1>
      <div className="flex justify-between gap-3">
        <PaymentCard />
        <PaymentCard />
        <PaymentCard />
      </div>
    </div>
  );
}
