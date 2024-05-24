"use client";

import { Property } from "@/features/properties/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ProfileInput } from "@/features/auth/schema";
import { ClockIcon } from "lucide-react";
import dayjs from "@/lib/utils/dayjs";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

interface IPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
export default function PaymentDialog({
  open,
  onOpenChange,
  product,
}: IPaymentDialogProps) {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/stripe/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen max-w-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Subscribe Now</DialogTitle>
        </DialogHeader>
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
