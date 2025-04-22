import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reservation Details | MoveInn",
  description: "View and manage your reservation details",
}

export default function ReservationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>{children}</div>
    </div>
  )
}
