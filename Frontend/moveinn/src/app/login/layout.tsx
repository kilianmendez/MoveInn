import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "MoveIn Login - Your Erasmus Journey",
    description: "Manage your Erasmus experience, connect with students, and discover events and recommendations.",
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}
