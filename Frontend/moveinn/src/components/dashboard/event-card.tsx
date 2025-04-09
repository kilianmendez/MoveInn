import { CalendarIcon, MapPinIcon, Users2Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EventCardProps {
    title: string
    date: string
    location: string
    attendees: number
    category: string
    joined: boolean
}

export function EventCard({ title, date, location, attendees, category, joined }: EventCardProps) {
  // Generate a consistent color based on the category
    const getCategoryColor = () => {
        switch (category.toLowerCase()) {
        case "social":
            return "from-[#B7F8C8]/20 to-[#B7F8C8]/5"
        case "trip":
            return "from-[#4C69DD]/20 to-[#4C69DD]/5"
        case "cultural":
            return "from-[#62C3BA]/20 to-[#62C3BA]/5"
        default:
            return "from-gray-100 to-white"
        }
    }

    const getCategoryIconColor = () => {
        switch (category.toLowerCase()) {
        case "social":
            return "text-[#0E1E40] bg-[#B7F8C8]"
        case "trip":
            return "text-white bg-[#4C69DD]"
        case "cultural":
            return "text-[#0E1E40] bg-[#62C3BA]"
        default:
            return "text-[#4C69DD] bg-[#B7F8C8]/20"
        }
    }

    return (
        <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 bg-gradient-to-r ${getCategoryColor()} transition-all hover:shadow-md`}
        >
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getCategoryIconColor()}`}>
            <CalendarIcon className="h-6 w-6" />
        </div>

        <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
            <h3 className="font-medium text-[#0E1E40]">{title}</h3>
            <Badge
                className={
                joined
                    ? "bg-[#B7F8C8] text-[#0E1E40]"
                    : category.toLowerCase() === "social"
                    ? "bg-[#B7F8C8]/70 text-[#0E1E40]"
                    : category.toLowerCase() === "trip"
                        ? "bg-[#4C69DD] text-white"
                        : "bg-[#62C3BA] text-[#0E1E40]"
                }
            >
                {joined ? "Joined" : category}
            </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-y-1 sm:gap-x-4">
            <div className="flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{date}</span>
            </div>
            <div className="flex items-center">
                <MapPinIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{location}</span>
            </div>
            <div className="flex items-center">
                <Users2Icon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{attendees} attendees</span>
            </div>
            </div>
        </div>

        <Button
            variant={joined ? "outline" : "default"}
            size="sm"
            className={
            joined ? "border-[#4C69DD] text-[#4C69DD] hover:bg-[#4C69DD]/10" : "bg-[#4C69DD] hover:bg-[#4C69DD]/90"
            }
        >
            {joined ? "View Details" : "Join Event"}
        </Button>
        </div>
    )
}
