"use client";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { RentalRequest } from "@/features/requests/schema";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

interface IPaymentOfRequestSectionProps {
  request: RentalRequest;
}

export default function PaymentOfRequestSection({
  request,
}: IPaymentOfRequestSectionProps) {
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/stripe/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
