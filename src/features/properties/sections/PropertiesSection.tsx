"use client";

import { useCategories } from "@/features/categories/hooks";
import { PropertyFormDialog } from "../components/PropertyFormDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMyProperties, useProperties } from "@/features/properties/hooks";
import PropertyCard from "../../pm/components/PropertyCard";
import { CirclePlus, Plus } from "lucide-react";
import { useState } from "react";
import { Property } from "../schema";

const defaultProperty: Property = {
  title: "",
  description: "",
  location: "",
  price_min: 0,
  price_max: 0,
};

export default function PropertiesSection() {
  const { data: properties, isLoading: isPropertiesLoading } =
    useMyProperties();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [property, setProperty] = useState(defaultProperty);
  const [propertyId, setPropertyId] = useState(null);

  return (
    <div className="w-full">
      <PropertyFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        property={property}
        propertyId={propertyId}
      />
      <h1 className="mb-4">My Properties</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
          <CardDescription>Upload new property</CardDescription>
        </CardHeader>
        <CardContent>
          {isPropertiesLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid auto-rows-auto grid-cols-4 gap-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  setIsDialogOpen={setIsDialogOpen}
                  setPropertyId={setPropertyId}
                  setProperty={setProperty}
                />
              ))}
              <div className="flex items-center justify-center ">
                <div
                  className="z-10 box-border flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full border-2 border-dotted border-black bg-gray-300 px-1.5 py-5 align-bottom text-gray-600 transition-all duration-500 hover:bg-gray-200"
                  onClick={() => {
                    setIsDialogOpen(true);
                    setPropertyId(null);
                    setProperty(defaultProperty);
                  }}
                >
                  <Plus size={40} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
