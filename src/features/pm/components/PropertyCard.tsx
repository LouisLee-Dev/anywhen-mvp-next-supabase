"use client";

import { useConfirm } from "@/components/confirm";
import { useDeleteProperty } from "@/features/properties/hooks";
import { Property } from "@/features/properties/schema";
import { getPublicUrl } from "@/lib/client";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IPropertyCardProps {
  property: Property;
  setIsDialogOpen: (open: boolean) => void;
  setPropertyId: (id: string) => void;
  setProperty: (property: Property) => void;
}

export default function PropertyCard({
  property,
  setIsDialogOpen,
  setPropertyId,
  setProperty,
}: IPropertyCardProps) {
  const router = useRouter();
  const confirm = useConfirm();

  const deleteProperty = useDeleteProperty();

  async function handleDeleteProperty(property: Property) {
    try {
      await deleteProperty.mutateAsync(property);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative w-full">
      <div className="absolute right-2 top-[-2px] flex gap-1">
        <div
          className=" z-10 flex cursor-pointer items-center rounded bg-green-600 px-1.5 py-1 text-white transition-all duration-500 hover:bg-green-500"
          onClick={() => {
            router.push(`/pm/properties/${property.id}`);
          }}
        >
          <EyeIcon size={20} />
        </div>
        <div
          className="z-10 flex cursor-pointer items-center rounded bg-red-600 px-1.5 py-1 text-white transition-all duration-500 hover:bg-red-500"
          onClick={() => {
            confirm({
              title: "Accept Offer",
              description: "Are you sure you want to accept this offer?",
            }).then(() => {
              handleDeleteProperty(property);
            });
          }}
        >
          <Trash2 size={20} />
        </div>
      </div>

      <div className="absolute left-2 top-2 z-10 cursor-pointer rounded px-2 py-1 font-semibold text-white transition-all duration-500">
        {property.category.title}
      </div>
      <div className="relative aspect-square w-full cursor-pointer rounded-md transition-all duration-500 hover:opacity-75">
        <div className="absolute bottom-[-7px] right-[-2px] flex gap-1">
          <div
            className="z-10 flex cursor-pointer items-center rounded bg-blue-600 px-1.5 py-1 text-white transition-all duration-500 hover:bg-blue-500"
            onClick={() => {
              setIsDialogOpen(true);
              setPropertyId(property.id);
              setProperty(property);
            }}
          >
            <Pencil size={13} />
            <span className="ml-1 text-sm">Edit</span>
          </div>
        </div>
        {property?.images?.length > 0 && (
          <img
            src={getPublicUrl("properties", property.images[0].path)}
            className="h-full w-full rounded-xl object-cover"
            alt="Property Image"
          ></img>
        )}
        {property?.images?.length == 0 && (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200 text-center text-2xl">
            No Preview Image Available
          </div>
        )}
        {property.status === "pending" ? (
          property?.matchedRequests?.length > 0 && (
            <div className="absolute bottom-2 left-[-8px]">
              <Link
                href={`/pm/properties/${property.id}/requests`}
                className="text-xs rounded-md bg-red-600 px-2 py-1 text-white transition-all duration-500 hover:bg-red-400"
              >
                {property?.matchedRequests?.length} Matched Requests
              </Link>
            </div>
          )
        ) : (
          <div className="absolute bottom-2 left-[-8px]">
            <Link
              href={`/pm/properties/${property.id}/requests`}
              className="text-xs rounded-md bg-blue-600 px-2 py-1 text-white transition-all duration-500 hover:bg-blue-400"
            >
              Booking
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-2">
        <span className="font-semibold">{property.title} </span>
        <span className="font-semibold text-gray-500">
          ({property.location})
        </span>
        <div className="text-sm font-medium text-gray-600">
          {property.price_min} ~ {property.price_max} CAD
        </div>
      </div>
    </div>
  );
}
