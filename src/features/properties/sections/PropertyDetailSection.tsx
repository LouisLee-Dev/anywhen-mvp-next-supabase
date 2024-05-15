/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/components/apps/Loading";
import {
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
import { CameraIcon } from "lucide-react";
import { getPublicUrl } from "@/lib/client";

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

  if (isPropertyLoading) return <Loading></Loading>;

  return (
    <div className="w-full">
      <h1 className="mb-4">{property.title}</h1>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-lg font-semibold">
                  {property.title} in {property.location}
                </div>
                <div className="font-medium text-gray-600">
                  {property.price_min} - {property.price_max} CAD
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {property.images.map((t) => (
                  <div key={t.id} className="aspect-video w-full">
                    <img
                      src={getPublicUrl("properties", t.path)}
                      className="h-full w-full rounded-md object-cover"
                      alt="Property Image"
                    />
                  </div>
                ))}
                <div className="w-full space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                    <div className="h-full w-full">
                      {avatarSrc && (
                        <img
                          src={avatarSrc}
                          alt="Avatar"
                          className="h-full w-full rounded-md object-cover"
                        />
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
                  <div className="flex items-center justify-end">
                    <Button
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
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
