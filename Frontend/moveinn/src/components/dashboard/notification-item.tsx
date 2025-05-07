import { MessageCircleIcon, CalendarIcon, Users2Icon, MapPinIcon, BellIcon } from "lucide-react"

interface NotificationItemProps {
    type: "message" | "event" | "group" | "recommendation" | "system"
    content: string
    time: string
    read: boolean
}

export function NotificationItem({ type, content, time, read }: NotificationItemProps) {
    const getIconAndColor = () => {
        switch (type) {
        case "message":
            return {
            icon: <MessageCircleIcon className="h-5 w-5 text-white" />,
            bgColor: "bg-[#4C69DD]",
            gradientFrom: read ? "from-[#4C69DD]/5" : "from-[#4C69DD]/20",
            }
        case "event":
            return {
            icon: <CalendarIcon className="h-5 w-5 text-[#0E1E40]" />,
            bgColor: "bg-[#B7F8C8]",
            gradientFrom: read ? "from-[#B7F8C8]/5" : "from-[#B7F8C8]/20",
            }
        case "group":
            return {
            icon: <Users2Icon className="h-5 w-5 text-white" />,
            bgColor: "bg-[#0E1E40]",
            gradientFrom: read ? "from-[#0E1E40]/5" : "from-[#0E1E40]/10",
            }
        case "recommendation":
            return {
            icon: <MapPinIcon className="h-5 w-5 text-[#0E1E40]" />,
            bgColor: "bg-[#62C3BA]",
            gradientFrom: read ? "from-[#62C3BA]/5" : "from-[#62C3BA]/20",
            }
        case "system":
            return {
            icon: <BellIcon className="h-5 w-5 text-white" />,
            bgColor: "bg-gray-500",
            gradientFrom: read ? "from-gray-100" : "from-gray-200",
            }
        }
    }

    const { icon, bgColor, gradientFrom } = getIconAndColor()

    return (
        <div className={`flex items-start gap-3 p-2 rounded-[var(--radius-lg)] bg-gradient-to-r ${gradientFrom} to-foreground`}>
            <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>{icon}</div>
                <div className="flex-1">
                    <p className={`text-sm ${read ? "text-text" : "text-text font-medium"}`}>{content}</p>
                    <p className="text-xs text-gray-400 mt-1">{time}</p>
                </div>
            {!read && <div className="w-2 h-2 rounded-full bg-[#4C69DD] mt-2"></div>}
        </div>
    )
}
