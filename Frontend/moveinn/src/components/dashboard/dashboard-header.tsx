"use client"

import { useState } from "react"
import Link from "next/link"
import { BellIcon, SearchIcon, MenuIcon, MessageCircleIcon, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardHeaderProps {
    setSidebarOpen: (open: boolean) => void
}

export function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
    const [searchOpen, setSearchOpen] = useState(false)

return (
    <header className="bg-gradient-to-r from-[#0E1E40] via-[#0E1E40] to-[#4C69DD] text-white sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setSidebarOpen(true)}>
                <MenuIcon className="h-5 w-5" />
            </Button>
            {/* <Button
                variant="ghost"
                size="icon"
                className="mr-2 hidden md:flex"
                onClick={() => setSidebarOpen((prev) => !prev)}
            >
                <MenuIcon className="h-5 w-5" />
            </Button> */}
            <Link href="/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-white">
                Move<span className="text-[#B7F8C8] font-extrabold">In</span>
                </span>
            </Link>
            </div>

            {/* Search */}
            <div
            className={`absolute left-0 right-0 top-0 bg-white z-10 px-4 flex items-center h-16 transition-all duration-200 ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
            <div className="w-full max-w-md mx-auto relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                placeholder="Search for events, groups, or people..."
                className="pl-10 pr-10 border-gray-300 focus:border-[#4C69DD] focus:ring-[#4C69DD]"
                />
                <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-gray-500"
                onClick={() => setSearchOpen(false)}
                >
                Cancel
                </Button>
            </div>
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setSearchOpen(true)}>
                <SearchIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white relative">
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="sr-only">Notifications</span>
                </Button>
                </SheetTrigger>
                <SheetContent>
                <div className="py-4">
                    <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                    <div className="space-y-4">
                    {/* Notification items would go here */}
                    <p className="text-sm text-gray-500">No new notifications</p>
                    </div>
                </div>
                </SheetContent>
            </Sheet>

            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white relative">
                    <MessageCircleIcon className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="sr-only">Messages</span>
                </Button>
                </SheetTrigger>
                <SheetContent>
                <div className="py-4">
                    <h2 className="text-lg font-semibold mb-4">Messages</h2>
                    <div className="space-y-4">
                    {/* Message items would go here */}
                    <p className="text-sm text-gray-500">No new messages</p>
                    </div>
                </div>
                </SheetContent>
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel className="bg-[#0E1E40] text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        </header>
    )
}
