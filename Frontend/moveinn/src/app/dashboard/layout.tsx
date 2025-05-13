import type React from "react"
import type { Metadata } from "next"
import { DashboardLayoutClient } from "@/components/dashboard/dashboard-layout-client"

export  const metadata: Metadata = {
    title: "MoveIn Dashboard - Your Erasmus Journey",
    description: "Manage your Erasmus experience, connect with students, and discover events and recommendations.",
}

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
