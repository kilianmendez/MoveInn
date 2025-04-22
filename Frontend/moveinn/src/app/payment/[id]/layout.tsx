import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete Payment | MoveInn",
  description: "Complete your payment to confirm your accommodation reservation",
}

export default function PaymentLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
