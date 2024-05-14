"use client";

import { Property } from "@/features/properties/schema";
import { getPublicUrl } from "@/lib/client";
import { HeartHandshakeIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface IPropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: IPropertyCardProps) {
  const router = useRouter();

  return (
    <div className="relative w-full">
      <div className="absolute right-2 top-2 z-10 cursor-pointer hover:text-white">
        <HeartHandshakeIcon size={24}></HeartHandshakeIcon>
      </div>
      <div
        className="relative aspect-square w-full cursor-pointer rounded-md"
        onClick={() => {
          router.push(`/renter-request/${property.id}`);
        }}
      >
        {property?.images?.length > 0 && (
          <img
            src={getPublicUrl("properties", property.images[0].path)}
            className="h-full w-full rounded-xl object-cover"
          ></img>
        )}
        {property?.images?.length == 0 && (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200 text-center text-2xl">
            No Preview Image Available
          </div>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">
            {property.title} ({property.location})
          </span>
          <span className="flex items-center text-sm">
            <StarIcon fill="#000000" className="mr-1"></StarIcon> 4.88
          </span>
        </div>
        <div className="font-medium text-gray-600">
          {property.price_min} - {property.price_max} CAD
        </div>
      </div>
    </div>
  );
}
