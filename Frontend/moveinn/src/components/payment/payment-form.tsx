"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentFormContent } from "./payment-form-content";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentForm() {
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    stripePromise.then((stripe) => {
      if (stripe) setStripeReady(true);
      else console.error("Stripe not loaded.");
    });
  }, []);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return <p className="text-red-600">Stripe key is not defined.</p>;
  }

  if (!stripeReady) {
    return <p className="text-blue-600">Loading Stripe...</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  );
}
