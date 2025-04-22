import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accommodation Details | MoveInn",
  description: "View detailed information about this accommodation",
}

export default function AccommodationLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
