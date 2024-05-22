"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface IPaymentCardProps {
  periodTime: string;
  price: string;
}

export default function PaymentCard({ periodTime, price }: IPaymentCardProps) {
  const router = useRouter();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">{periodTime}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2 ">{price}</div>
        <div className="flex items-center justify-center border-b border-gray-200 py-5">
          <Button
            className="rounded-full bg-primary px-8 py-4 text-lg"
            onClick={() => router.push("/pm/payment")}
          >
            Subscribe Now
          </Button>
        </div>
        <div className="pt-5">
          <div className="flex items-center">
            <Check size={20} className="mr-2 text-primary" />
            <p>Subscribe description here...............</p>
          </div>
          <div className="flex items-center">
            <Check size={20} className="mr-2 text-primary" />
            <p>Subscribe description here...............</p>
          </div>
          <div className="flex items-center">
            <Check size={20} className="mr-2 text-primary" />
            <p>Subscribe description here...............</p>
          </div>
          <div className="flex items-center">
            <Check size={20} className="mr-2 text-primary" />
            <p>Subscribe description here...............</p>
          </div>
          <div className="flex items-center">
            <Check size={20} className="mr-2 text-primary" />
            <p>Subscribe description here...............</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
