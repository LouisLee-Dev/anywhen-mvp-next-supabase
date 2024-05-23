"use client";

import { Property } from "@/features/properties/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ProfileInput } from "@/features/auth/schema";
import {
  CircleDollarSignIcon,
  ClockIcon,
  HeartHandshakeIcon,
  HotelIcon,
  MapPinIcon,
  NavigationIcon,
  Pill,
  StarIcon,
} from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { getPublicUrl } from "@/lib/client";

interface IPropertyDetailDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyDetailDialog({
  property,
  open,
  onOpenChange,
}: IPropertyDetailDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-center">Property Detail</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 space-y-2  py-4">
          <div className="col-span-4">
            <div className="flex items-center text-lg font-semibold">
              <NavigationIcon size={20} className="mr-1"></NavigationIcon>

              {property.title}
            </div>
            <div className="m-4 grid grid-cols-2 gap-2">
              {property.images.map((t) => (
                <div key={t.id} className="relative aspect-video w-full">
                  <img
                    src={getPublicUrl("properties", t.path)}
                    className="h-full w-full rounded-md object-cover"
                    alt="Property Image"
                  />
                </div>
              ))}
            </div>
            <p className="mx-4 flex items-center space-x-2 text-base font-semibold text-gray-800">
              <HotelIcon size={20}></HotelIcon>
              <span>{property.category.title}</span>
            </p>
            <p className="mx-4 flex items-center space-x-2 text-base text-gray-600">
              <MapPinIcon size={20}></MapPinIcon>
              <span>{property.location}</span>
            </p>
            <p className="mx-4 flex items-center space-x-2 text-base text-gray-600">
              <Pill size={20}></Pill>
              <span>Description</span>
            </p>
            <div className="mx-4 my-1 flex items-center space-x-2 text-base text-gray-600">
              <div
                dangerouslySetInnerHTML={{
                  __html: `${property?.description || "No description here!"}`,
                }}
                className="w-full rounded-md border p-2"
              />
            </div>
            <p className="mx-4 flex items-center space-x-2 text-base text-gray-600">
              <CircleDollarSignIcon size={20}></CircleDollarSignIcon>
              <span>
                {property.price_min} {property.currency.title} ~{" "}
                {property.price_max} {property.currency.title}
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
