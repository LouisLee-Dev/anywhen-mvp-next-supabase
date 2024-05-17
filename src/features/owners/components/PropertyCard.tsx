"use client";

import { Property } from "@/features/properties/schema";
import { getPublicUrl } from "@/lib/client";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IPropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: IPropertyCardProps) {
  const router = useRouter();

  return (
    <div className="relative w-full">
      <div
        className="absolute right-2 top-[-8px] z-10 cursor-pointer rounded bg-green-600 p-2 text-white transition-all duration-500 hover:bg-green-400"
        onClick={() => {
          router.push(`/pm/properties/${property.id}`);
        }}
      >
        <EyeIcon size={24} />
      </div>
      <div className="relative aspect-square w-full cursor-pointer rounded-md">
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
        {property?.matchedRequests?.length && (
          <div className="absolute bottom-2 right-[-8px]">
            <Link
              href={`/pm/properties/${property.id}/requests`}
              className="text-xs rounded-md bg-red-600 px-2 py-1 text-white transition-all duration-500 hover:bg-red-400"
            >
              {property?.matchedRequests?.length} Matched Requests
            </Link>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <span className="font-semibold">
          {property.title} ({property.location})
        </span>
        <div className="font-medium text-gray-600">
          {property.price_min} - {property.price_max} CAD
        </div>
      </div>
    </div>
  );
}
