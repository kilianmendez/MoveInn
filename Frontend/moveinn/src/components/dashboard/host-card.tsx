import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HostCardProps {
    name: string
    university: string
    languages: string[]
    lastActive: string
}

export function HostCard({ name, university, languages, lastActive }: HostCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    // Generate a gradient based on online status
    const getStatusGradient = () => {
        return lastActive === "Online now" ? "bg-gradient-to-r from-[#B7F8C8]/30 to-white" : "bg-white"
    }

    return (
        <div className={`flex items-start gap-3 p-3 rounded-lg ${getStatusGradient()}`}>
        <Avatar className="h-10 w-10 border-2 border-[#B7F8C8]">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={name} />
            <AvatarFallback className="bg-[#4C69DD] text-white">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
            <div className="flex items-center justify-between">
            <h3 className="font-medium text-[#0E1E40]">{name}</h3>
            <span
                className={`text-xs px-2 py-0.5 rounded-full ${lastActive === "Online now" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
            >
                {lastActive}
            </span>
            </div>

            <p className="text-xs text-gray-500 mb-1">{university}</p>

            <div className="flex flex-wrap gap-1 mb-2">
            {languages.map((lang, index) => (
                <Badge
                key={lang}
                variant="outline"
                className={`text-xs py-0 px-1.5 ${
                    index === 0
                    ? "border-[#4C69DD] text-[#4C69DD]"
                    : index === 1
                        ? "border-[#62C3BA] text-[#62C3BA]"
                        : "border-[#0E1E40] text-[#0E1E40]"
                }`}
                >
                {lang}
                </Badge>
            ))}
            </div>

            <Button variant="ghost" size="sm" className="h-7 text-[#4C69DD] hover:bg-[#4C69DD]/10 p-0">
            Send message
            </Button>
        </div>
        </div>
    )
}
