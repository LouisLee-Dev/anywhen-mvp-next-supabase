/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/components/apps/Loading";
import {
  useDeletePropertyImage,
  useProperty,
  useUpdateProperty,
  useUploadPropertyImage,
} from "../hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import supabase from "@/core/supabase/supabase-client";

import { v4 as uuid_v4 } from "uuid";
import { getFileExt } from "@/lib/helpers";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  ArrowLeftIcon,
  CameraIcon,
  CircleDollarSign,
  EyeIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { getPublicUrl } from "@/lib/client";
import Link from "next/link";
import { PropertyFormDialog } from "../components/PropertyFormDialog";
import { useConfirm } from "@/components/confirm";
import { toast } from "sonner";

interface IPropertyDetailSectionProps {
  propertyId: string;
}

export default function PropertyDetailSection({
  propertyId,
}: IPropertyDetailSectionProps) {
  const [isLoading, setLoading] = useState(false);
  const uploadPropertyImage = useUploadPropertyImage();
  const [{ user }] = useAuth();
  const { data: property, isLoading: isPropertyLoading } =
    useProperty(propertyId);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const confirm = useConfirm();

  const deletePropertyImage = useDeletePropertyImage();

  const uploadAvatarFile = async (file: File): Promise<string> => {
    const fileName = `${user.id}/images/${uuid_v4()}.${getFileExt(file.name)}`;
    const { error } = await supabase.storage
      .from("properties")
      .upload(fileName, file);

    if (error) return Promise.reject(null);

    return Promise.resolve(fileName);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarSrc(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      fileRef.current.value = "";
    }
  };

  const handleDeletePropertyImage = async (imageId: string) => {
    await deletePropertyImage
      .mutateAsync({ propertyId, imageId })
      .then(() => {
        toast.success("Image deleted successfully");
      })
      .catch(() => {
        toast.error("Request failed");
      });
  };

  if (isPropertyLoading) return <Loading></Loading>;

  return (
    <div className="px-2 lg:px-[8rem]">
      <PropertyFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        property={property}
        propertyId={propertyId}
      />

      <h1 className="mb-4 flex items-center space-x-2">
        <Link
          className="cursor-pointer rounded p-2 transition-all duration-500 "
          href="/pm/properties"
        >
          <ArrowLeftIcon size={24}></ArrowLeftIcon>
        </Link>
        <span className="text-lg lg:text-2xl">{property.title}</span>
      </h1>
      <div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-5">
        <div className="col-span-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {property.images.map((t) => (
                  <div key={t.id} className="relative aspect-video w-full">
                    <img
                      src={getPublicUrl("properties", t.path)}
                      className="h-full w-full rounded-md object-cover"
                      alt="Property Image"
                    />
                    <div
                      className="absolute right-2 top-2 z-10 flex cursor-pointer items-center rounded bg-red-600 px-1.5 py-1 text-white transition-all duration-500 hover:bg-red-500"
                      onClick={() => {
                        confirm({
                          title: "Delete Image",
                          description:
                            "Are you sure you want to delete this image?",
                        }).then(() => {
                          handleDeletePropertyImage(t.id);
                        });
                      }}
                    >
                      <Trash2 size={20} />
                    </div>
                  </div>
                ))}
                <div className="w-full space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                    <Button
                      className="absolute right-2 top-2"
                      size="sm"
                      loading={isLoading}
                      disabled={!avatarSrc || !file}
                      onClick={() => {
                        setLoading(true);
                        uploadAvatarFile(file)
                          .then(async (fileName: string) => {
                            return await uploadPropertyImage.mutateAsync({
                              propertyId: property.id,
                              imageUrl: fileName,
                            });
                          })
                          .catch(() => {})
                          .then(() => {
                            setFile(null);
                            setAvatarSrc("");
                            setLoading(false);
                          });
                      }}
                    >
                      Upload
                    </Button>
                    <div className="h-full w-full bg-gray-100">
                      {avatarSrc && (
                        <img
                          src={avatarSrc}
                          alt="Avatar"
                          className="h-full w-full rounded-md object-cover"
                        />
                      )}
                      {!avatarSrc && (
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-600">
                          Drag & Drop or Select Image
                        </div>
                      )}
                    </div>
                    <div
                      className="absolute bottom-0 z-10 flex w-full cursor-pointer items-center justify-center bg-[#333333aa]"
                      onClick={() => {
                        fileRef.current.click();
                      }}
                    >
                      <div className="py-2">
                        <CameraIcon color="#ffffff" size={24}></CameraIcon>
                      </div>
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleOnChange}
                        ref={fileRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
        <div className="relative col-span-2 space-y-3 rounded-md  border p-3">
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <MapPinIcon size={24} className="mr-1" />
            {property.location}
          </div>
          <div className="flex items-center text-lg font-semibold text-gray-600">
            <MessageSquareTextIcon size={24} className="mr-1" />
            Description
          </div>
          <div
            className="px-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: property.description }}
          ></div>
          <div className="flex items-center font-medium text-gray-600">
            <CircleDollarSign size={22} className="mr-1" />
            {property.price_min} ~ {property.price_max} CAD
          </div>
        </div>
      </div>
    </div>
  );
}
