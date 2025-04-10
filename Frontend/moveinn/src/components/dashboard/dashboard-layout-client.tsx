"use client"

import { useState } from "react"
import Link from "next/link"
import {
    MenuIcon,
    HomeIcon,
    Users2Icon,
    CalendarIcon,
    MessageCircleIcon,
    BookmarkIcon,
    MapPinIcon,
    UserIcon,
    SettingsIcon,
    HelpCircleIcon,
    GlobeIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const mainNav = [
        { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
        { label: "Groups", href: "/dashboard/groups", icon: Users2Icon },
        { label: "Events", href: "/dashboard/events", icon: CalendarIcon },
        { label: "Messages", href: "/dashboard/messages", icon: MessageCircleIcon, badge: 12 },
        { label: "Forums", href: "/dashboard/forums", icon: BookmarkIcon },
        { label: "Recommendations", href: "/dashboard/recommendations", icon: MapPinIcon, badge: "New" },
        { label: "Hosts", href: "/dashboard/hosts", icon: GlobeIcon },
        { label: "Profile", href: "/dashboard/profile", icon: UserIcon },
    ]

    const settingsNav = [
        { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
        { label: "Help Center", href: "/dashboard/help", icon: HelpCircleIcon },
    ]

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
        {/* Sidebar */}
        <aside
            className={cn(
            "fixed top-0 left-0 z-40 h-full pt-16 transition-all duration-300 transform bg-white border-r border-gray-200",
            sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0",
            )}
        >
            <ScrollArea className="h-full px-3 py-4">
            <nav className="space-y-1">
                {mainNav.map(({ label, href, icon: Icon, badge }) => (
                <SidebarItem
                    key={label}
                    href={href}
                    icon={<Icon className="h-5 w-5" />}
                    label={label}
                    badge={badge}
                />
                ))}

                <div className="pt-4 mt-4 border-t border-gray-200">
                {settingsNav.map(({ label, href, icon: Icon }) => (
                    <SidebarItem
                    key={label}
                    href={href}
                    icon={<Icon className="h-5 w-5" />}
                    label={label}
                    />
                ))}
                </div>
            </nav>
            </ScrollArea>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            />
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col lg:ml-64">
            {/* Topbar (mobile only) */}
            <div className="p-4 bg-white shadow lg:hidden flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
                <MenuIcon className="h-6 w-6" />
            </Button>
            <span className="text-lg font-semibold">Dashboard</span>
            </div>

            <main className="p-4">{children}</main>
        </div>
        </div>
    )
    }

    function SidebarItem({
    href,
    icon,
    label,
    badge,
    }: {
    href: string
    icon: React.ReactNode
    label: string
    badge?: string | number
    }) {
    return (
        <Link href={href} className="block">
        <Button
            variant="ghost"
            className={cn(
            "w-full justify-start px-3 py-2 h-auto text-gray-600 hover:bg-gray-100",
            // Aquí podrías activar un estado "activo" con usePathname() de next/navigation si quieres
            )}
        >
            <span className="flex items-center">
            {icon}
            <span className="ml-3">{label}</span>
            </span>
            {badge && (
            <span
                className={cn(
                "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                typeof badge === "number"
                    ? "bg-[#4C69DD] text-white"
                    : badge === "New"
                    ? "bg-[#B7F8C8] text-[#0E1E40]"
                    : "bg-[#62C3BA] text-[#0E1E40]",
                )}
            >
                {badge}
            </span>
            )}
        </Button>
        </Link>
    )
}
