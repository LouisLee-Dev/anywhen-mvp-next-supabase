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
      <div className="absolute right-2 top-2 z-10 cursor-pointer text-white hover:text-red-500">
        <HeartHandshakeIcon size={24}></HeartHandshakeIcon>
      </div>
      <div
        className="relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-md"
        onClick={() => {
          router.push(`/renter-request/${property.id}`);
        }}
      >
        {property?.images?.length > 0 && (
          <div className="h-full w-full overflow-hidden rounded-md">
            <img
              src={getPublicUrl("properties", property.images[0].path)}
              className="h-full w-full rounded-xl object-cover transition-all duration-500 ease-in-out hover:h-[110%] hover:w-[110%] hover:opacity-90"
            ></img>
          </div>
        )}
        {property?.images?.length == 0 && (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200 text-center text-2xl">
            No Preview Image Available
          </div>
        )}
        {property?.matchedRequests?.length && (
          <div className="absolute bottom-3 right-[-8px]">
            <div className="text-xs rounded-md bg-blue-500 px-2 py-1 text-white">
              {property?.matchedRequests?.length} Matched Requests
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">
            {property.title} in {property.location}
          </span>
        </div>
        <div className="font-medium text-gray-600">
          {property.price_min} - {property.price_max} CAD
        </div>
      </div>
    </div>
  );
}
