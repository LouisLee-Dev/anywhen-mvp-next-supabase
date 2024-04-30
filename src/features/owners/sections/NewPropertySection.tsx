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
import PropertyCard from "../components/PropertyCard";

// interface INewPropertySectionProps {

// }

export default function NewPropertySection() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: properties, isLoading: isPropertiesLoading } =
    useMyProperties();

  return (
    <div className="w-full">
      <h1 className="mb-4">My Properties</h1>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Your Properties</CardTitle>
              <CardDescription>Upload new property</CardDescription>
            </CardHeader>
            <CardContent>
              {isPropertiesLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>New Property</CardTitle>
              <CardDescription>Upload new property</CardDescription>
            </CardHeader>
            <CardContent>
              <NewPropertyForm></NewPropertyForm>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
