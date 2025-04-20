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
  SofaIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const mainNav = [
    { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { label: "Housing", href: "/dashboard/housing", icon: SofaIcon },
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
          "fixed top-0 left-0 z-40 h-full pt-16 transition-all duration-300 transform bg-foreground border-r border-gray-200",
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar title */}
        <div className="absolute top-0 left-0 w-full h-16 flex items-center px-4 border-gray-200 bg-white z-50">
          <span className="text-4xl font-bold text-primary-dark tracking-wide">Move<span className="text-secondary">Inn</span></span>
        </div>
        <ScrollArea className="h-full px-3 py-4 pb-24">
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

        {/* User Info */}
        <div className="absolute bottom-0 left-0 w-full px-3 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Kylian+M.&background=4C69DD&color=fff"
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Kylian M.</span>
                <span className="text-xs text-text-secondary">Student</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-dark hover:bg-accent-light/30">
              <UserIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
            <MenuIcon className="h-6 w-6 text-primary-dark" />
          </Button>
          <div className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-primary-dark" />
            <span className="text-lg font-semibold text-primary-dark">Dashboard</span>
          </div>
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
          "w-full justify-start px-3 py-2 h-auto text-text-secondary hover:bg-secondary/15 hover:text-primary-dark"
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
                ? "bg-primary text-white"
                : badge === "New"
                ? "bg-accent-light text-accent-dark"
                : "bg-secondary-greenblue text-primary-dark"
            )}
          >
            {badge}
          </span>
        )}
      </Button>
    </Link>
  )
}
