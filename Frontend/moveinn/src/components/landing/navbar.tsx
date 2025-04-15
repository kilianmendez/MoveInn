import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
    return (
        <header className="bg-gradient-to-r from-white to-[#E7ECF0]/80 text-[#0E1E40] py-4 px-4 md:px-8 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#0E1E40]">
                Move<span className="text-[#4C69DD] font-extrabold">In</span>
            </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-[#0E1E40] hover:text-[#4C69DD] transition-colors">
                Features
            </Link>
            <Link href="#how-it-works" className="text-[#0E1E40] hover:text-[#4C69DD] transition-colors">
                How It Works
            </Link>
            <Link href="#testimonials" className="text-[#0E1E40] hover:text-[#4C69DD] transition-colors">
                Testimonials
            </Link>
            </nav>

            <div className="flex items-center space-x-4">
            <Link href="/login">
                <Button variant="outline" className="border-[#4C69DD] text-[#4C69DD] hover:bg-[#4C69DD]/10">
                Log In
                </Button>
            </Link>
            <Link href="/register" className="hidden md:inline-flex">
                <Button className="bg-[#4C69DD] text-white hover:bg-[#4C69DD]/90">Sign Up</Button>
            </Link>
            </div>
        </div>
        </header>
    )
}

