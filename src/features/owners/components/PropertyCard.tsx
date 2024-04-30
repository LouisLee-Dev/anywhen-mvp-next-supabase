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
          router.push(`/owners/property/${property.id}`);
        }}
      >
        <img
          src={
            property?.images?.length > 0
              ? getPublicUrl("properties", property.images[0].path)
              : "/assets/properties/1.webp"
          }
          className="h-full w-full rounded-xl object-cover"
        ></img>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {property.title} ({property.location})
          </span>
          <span className="flex items-center text-sm">
            <StarIcon className="mr-1"></StarIcon> 4.88
          </span>
        </div>
        <div className="">Built in 1850</div>
        <div className="">May 9-14</div>
        <div className="flex items-center">
          <span className="font-medium"> $249 CAD </span>
          <span>night</span>
        </div>
      </div>
    </div>
  );
}
