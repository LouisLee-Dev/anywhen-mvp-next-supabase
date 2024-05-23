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
import { ClockIcon, HeartHandshakeIcon, StarIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";

interface IPropertyDetailDialogProps {
  profile: ProfileInput;
  create_at: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerTitle?: string;
}

export default function PropertyDetailDialog({
  profile,
  create_at,
  open,
  onOpenChange,
  headerTitle,
}: IPropertyDetailDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-center">{headerTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="col-span-2">
            <div className="flex items-center">
              <Avatar className="mr-2 h-12 w-12 cursor-pointer rounded-full">
                <AvatarImage src="/assets/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-center font-semibold">
                  {profile?.full_name}
                </p>
                <p className="px-1 text-sm">{profile?.address}</p>
              </div>
            </div>
            <div className="flex items-center px-2 pt-2">
              <ClockIcon size={20} className="mr-1" />
              Joined{" "}
              {dayjs.duration(-dayjs().diff(dayjs(create_at))).humanize(true)}
              <div className="grid grid-cols-4 items-center gap-4"></div>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div>
              <span className="font-semibod">Phone Number:</span>{" "}
              {profile?.phone_number ? profile?.phone_number : "N/A"}
            </div>
            <p></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
