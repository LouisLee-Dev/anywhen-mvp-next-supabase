"use client";

import { Property } from "@/features/properties/schema";
import { getPublicUrl } from "@/lib/client";
import { HeartHandshakeIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface IPaymentCardProps {
//   property: Property;
// }

export default function PaymentCard() {
  const router = useRouter();

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-center">1 Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2 ">
          <p>
            <span className="font-semibold">$100</span> / Year
          </p>
        </div>
        <div className="flex items-center justify-center py-5">
          <Button className="rounded-full bg-primary px-8 py-4 text-lg">
            Subscribe Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
