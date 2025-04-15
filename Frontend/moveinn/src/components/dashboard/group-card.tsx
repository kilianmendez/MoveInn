import { Users2Icon, MessageCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GroupCardProps {
    name: string
    members: number
    type: string
    lastActivity: string
    unreadMessages: number
}

export function GroupCard({ name, members, type, lastActivity, unreadMessages }: GroupCardProps) {
  // Generate a consistent color based on the group type
    const getTypeColor = () => {
        switch (type.toLowerCase()) {
        case "residence":
            return "from-[#B7F8C8]/20 to-white"
        case "academic":
            return "from-[#4C69DD]/20 to-white"
        case "interest":
            return "from-[#62C3BA]/20 to-white"
        default:
            return "from-gray-100 to-white"
        }
    }

    const getTypeBadgeColor = () => {
        switch (type.toLowerCase()) {
        case "residence":
            return "bg-[#B7F8C8] text-[#0E1E40]"
        case "academic":
            return "bg-[#4C69DD] text-white"
        case "interest":
            return "bg-[#62C3BA] text-[#0E1E40]"
        default:
            return "bg-gray-200 text-gray-700"
        }
    }

    return (
        <div
        className={`p-4 rounded-[var(--radius-lg)] border border-gray-100 hover:border-gray-200 bg-gradient-to-br ${getTypeColor()} transition-all hover:shadow-md`}
        >
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-[#0E1E40]">{name}</h3>
            <Badge className={getTypeBadgeColor()}>{type}</Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
            <Users2Icon className="h-3.5 w-3.5 mr-1" />
            <span>{members} members</span>
        </div>

        <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Last activity: {lastActivity}</span>
            {unreadMessages > 0 && (
            <div className="flex items-center bg-[#4C69DD] text-white px-2 py-1 rounded-full">
                <MessageCircleIcon className="h-3.5 w-3.5 mr-1" />
                <span>
                {unreadMessages} new {unreadMessages === 1 ? "message" : "messages"}
                </span>
            </div>
            )}
        </div>
        </div>
    )
}
