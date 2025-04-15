import type { ReactNode } from "react"
import Image from "next/image"
import { MapPin, Calendar, Clock, Users, Heart, ExternalLink, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { format } from "date-fns"
import { Progress } from "@/components/ui/progress"

interface Event {
  id: number
  title: string
  date: Date
  location: string
  address: string
  attendees: number
  maxAttendees: number
  category: string
  joined: boolean
  description: string
  organizer: string
  image: string
  tags: string[]
}

interface DetailedEventCardProps {
  event: Event
  categoryIcon: ReactNode
}

export function DetailedEventCard({ event, categoryIcon }: DetailedEventCardProps) {
  // Generate a consistent color based on the category
  const getCategoryColor = () => {
    switch (event.category.toLowerCase()) {
      case "social":
        return "from-[#B7F8C8]/30 to-white"
      case "trip":
        return "from-[#4C69DD]/20 to-white"
      case "cultural":
        return "from-[#62C3BA]/30 to-white"
      case "academic":
        return "from-[#4C69DD]/10 to-white"
      case "sports":
        return "from-[#B7F8C8]/20 to-white"
      case "workshop":
        return "from-[#62C3BA]/20 to-white"
      case "party":
        return "from-[#0E1E40]/20 to-white"
      default:
        return "from-gray-100 to-white"
    }
  }

  const getCategoryBadgeColor = () => {
    switch (event.category.toLowerCase()) {
      case "social":
        return "bg-[#B7F8C8] text-[#0E1E40]"
      case "trip":
        return "bg-[#4C69DD] text-white"
      case "cultural":
        return "bg-[#62C3BA] text-[#0E1E40]"
      case "academic":
        return "bg-[#4C69DD]/80 text-white"
      case "sports":
        return "bg-[#B7F8C8] text-[#0E1E40]"
      case "workshop":
        return "bg-[#62C3BA] text-[#0E1E40]"
      case "party":
        return "bg-[#0E1E40] text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  // Calculate attendance percentage
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100

  // Determine if event is almost full (>80% capacity)
  const isAlmostFull = attendancePercentage >= 80

  // Determine if event is happening today
  const isToday = new Date().toDateString() === event.date.toDateString()

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white py-0">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge className={getCategoryBadgeColor()}>
              <span className="flex items-center">
                {categoryIcon}
                <span className="ml-1">{event.category}</span>
              </span>
            </Badge>
            {isToday && <Badge className="bg-red-500 text-white animate-pulse">Today</Badge>}
          </div>
        </div>

        <div className={`flex-1 bg-gradient-to-br ${getCategoryColor()}`}>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-[#0E1E40] mb-2">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-[#4C69DD] mt-0.5 flex-shrink-0 mr-2" />
                    <span className="text-sm text-gray-700">{format(event.date, "EEEE, MMMM d, yyyy")}</span>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-4 w-4 text-[#4C69DD] mt-0.5 flex-shrink-0 mr-2" />
                    <span className="text-sm text-gray-700">{format(event.date, "h:mm a")}</span>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-[#4C69DD] mt-0.5 flex-shrink-0 mr-2" />
                    <div>
                      <span className="text-sm text-gray-700 block">{event.location}</span>
                      <span className="text-xs text-gray-500">{event.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="h-4 w-4 text-[#4C69DD] mt-0.5 flex-shrink-0 mr-2" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">
                          {event.attendees} / {event.maxAttendees} attendees
                        </span>
                        <span className={`text-xs ${isAlmostFull ? "text-amber-600 font-medium" : "text-gray-500"}`}>
                          {isAlmostFull ? "Almost full!" : `${event.maxAttendees - event.attendees} spots left`}
                        </span>
                      </div>
                      <Progress
                        value={attendancePercentage}
                        className="h-1.5"
                        indicatorClassName={`${isAlmostFull ? "bg-amber-500" : "bg-[#4C69DD]"}`}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{event.description}</p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5 border-gray-300 text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-gray-500">
                  Organized by <span className="font-medium text-[#4C69DD]">{event.organizer}</span>
                </div>
              </div>

              <div className="flex flex gap-2 md:w-32">
                <Button
                  className={
                    event.joined
                      ? "bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 px-3 h-8"
                      : "bg-[#4C69DD] hover:bg-[#4C69DD]/90"
                  }
                >
                  {event.joined ? "Attending" : "Join Event"}
                </Button>
                <Button variant="outline" size="icon" className="group border-gray-200 hover:bg-background">
                  <Heart className="h-4 w-4 text-gray-500 group-hover:text-primary-dark group-hover:fill-red-500 group-hover:text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-3 bg-white/50 flex justify-between border-t border-gray-100">
            <Button variant="ghost" size="sm" className="text-[#4C69DD] hover:bg-[#4C69DD]/10">
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="border-[#4C69DD] text-[#4C69DD] hover:bg-[#4C69DD]/10">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View Details
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
