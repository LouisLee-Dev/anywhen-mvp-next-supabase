"use client";

import { useCategories } from "@/features/categories/hooks";
import { NewPropertyForm } from "../components/NewPropertyForm";

// interface INewPropertySectionProps {

// }

export default function NewPropertySection() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  return (
    <div className="w-full p-4">
      <h1> New Property </h1>

      <NewPropertyForm></NewPropertyForm>
    </div>
  );
}
