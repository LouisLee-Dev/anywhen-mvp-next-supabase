"use client";
import { useState } from "react";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import { useAcceptRentalRequestForProperty } from "@/features/requests/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileDialog from "./ProfileDialog";
import { RentalRequest } from "../schema";
import { ClockIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import { useConfirm } from "@/components/confirm";

interface IRequestsSectionProps {
  requests: RentalRequest[];
  propertyId: string;
}

export default function RequestsSection({
  requests,
  propertyId,
}: IRequestsSectionProps) {
  const confirm = useConfirm();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [create_at, setCreateAt] = useState<string>("");

  const acceptRequest = useAcceptRentalRequestForProperty(propertyId);

  async function handleAccept(id: string) {
    await acceptRequest
      .mutateAsync({ requestId: id })
      .then(({ success, request }) => {
        if (success) {
          console.log(request);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full space-y-2">
      <ProfileDialog
        profile={profile}
        open={open}
        create_at={create_at}
        onOpenChange={setOpen}
      />
      {requests.map((t: any) => (
        <Card className="w-full" key={t.id}>
          <CardContent className="relative p-3">
            {t.offers.length > 0 && (
              <div className="absolute right-[-8px] top-2 rounded bg-blue-500 px-2 py-1 text-white">
                Offer Sent
              </div>
            )}
            <div className="grid grid-cols-4">
              <div className="col-span-1">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Avatar
                      className="h-12 w-12 cursor-pointer rounded-full"
                      onClick={() => {
                        setOpen(true);
                        setProfile(t?.profile);
                        setCreateAt(t?.profile?.created_at);
                      }}
                    >
                      <AvatarImage src="/assets/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="whitespace-nowrap px-2 font-semibold">
                      {t?.profile?.full_name}
                    </div>
                  </div>
                  <div className="flex items-center text-base font-medium text-gray-500">
                    <ClockIcon size={20} className="mr-1" />
                    Posted{" "}
                    {dayjs
                      .duration(-dayjs().diff(dayjs(t.created_at)))
                      .humanize(true)}
                  </div>
                </div>
              </div>
              <div className="col-span-3 space-y-1">
                <div className="text-lg font-semibold">
                  {
                    categories.find((category) => category.id === t.category_id)
                      ?.title
                  }
                </div>
                <div className="font-semibold">{t.location} </div>
                <div className="flex items-center font-medium text-gray-500">
                  <div>
                    {t.price_min}{" "}
                    {
                      currencies.find(
                        (currency) => currency.id === t.currency_id,
                      )?.title
                    }{" "}
                    ~ {t.price_max}{" "}
                    {
                      currencies.find(
                        (currency) => currency.id === t.currency_id,
                      )?.title
                    }
                  </div>
                </div>
                <div className="font-medium text-gray-500">
                  {t.start_date} ~ {t.end_date}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: `${t.message}` }}
                  className="w-full rounded-md border p-2"
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              {t.offers.length == 0 ? (
                <Button
                  type="button"
                  size="sm"
                  className="mt-2"
                  variant="default"
                  onClick={() => {
                    confirm({
                      title: "Accept Request",
                      description:
                        "Are you sure you want to accept this request?",
                    }).then(() => {
                      handleAccept(t.id);
                    });
                  }}
                >
                  Accept Request
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  className="mt-2"
                  variant="danger"
                  onClick={() => {
                    confirm({
                      title: "Cancel Request",
                      description:
                        "Are you sure you want to cancel this request?",
                    }).then(() => {
                      // handleAccept(t.id);
                    });
                  }}
                >
                  Cancel Request
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
