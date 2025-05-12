import type { ReactNode } from "react"
import Image from "next/image"
import { MapPin, Calendar, Clock, Users, Heart, ExternalLink, Share2, Bike, BookOpen, Landmark, Music,  PenToolIcon as Tool} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { format } from "date-fns"
import { Progress } from "@/components/ui/progress"
import { Event } from "@/types/event"
import { API_BASE_IMAGE_URL } from "@/utils/endpoints/config"

interface DetailedEventCardProps {
  event: Event
  categoryIcon: ReactNode
}

export function DetailedEventCard({ event, categoryIcon }: DetailedEventCardProps) {
  const getCategoryColor = () => {
    switch (event.category) {
      case 1:
        return "from-[#B7F8C8]/30 to-foreground"
      case 2:
        return "from-[#4C69DD]/20 to-foreground"
      case 3:
        return "from-[#62C3BA]/30 to-foreground"
      case 4:
        return "from-[#4C69DD]/10 to-foreground"
      case 5:
        return "from-[#B7F8C8]/20 to-foreground"
      case 6:
        return "from-[#62C3BA]/20 to-foreground"
      case 7:
        return "from-[#0E1E40]/20 to-foreground"
      default:
        return "from-gray-100 to-foreground"
    }
  }

  const getCategoryBadgeColor = () => {
    switch (event.category) {
      case 1:
        return "bg-green-200 text-green-800"
      case 2:
        return "bg-blue-200 text-blue-800"
      case 3:
        return "bg-teal-200 text-teal-800"
      case 4:
        return "bg-yellow-200 text-yellow-800"
      case 5:
        return "bg-orange-200 text-orange-800"
      case 6:
        return "bg-purple-200 text-purple-800"
      case 7:
        return "bg-pink-200 text-pink-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  // Calculate attendance percentage
  const attendancePercentage = (event.attendeesCount / event.maxAttendees) * 100

  // Determine if event is almost full (>80% capacity)
  const isAlmostFull = attendancePercentage >= 80

  // Determine if event is happening today
  const isToday = new Date().toDateString() === event.date.toString()
  const eventImageUrl = API_BASE_IMAGE_URL + event.imageUrl;
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-foreground py-0">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image src={eventImageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge className={`${getCategoryBadgeColor()} flex items-center`}>
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
                <h3 className="font-semibold text-xl text-text mb-2">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <div className="p-1 bg-gray-200 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <Calendar className="h-4 w-4 text-[#4C69DD] flex-shrink-0" />
                    </div>
                    <span className="text-sm text-text">{format(event.date, "EEEE, MMMM d, yyyy")}</span>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1 bg-gray-200 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <Clock className="h-4 w-4 text-[#4C69DD] flex-shrink-0" />
                    </div>
                    <span className="text-sm text-text">{format(event.date, "h:mm a")}</span>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1 bg-gray-200 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <MapPin className="h-4 w-4 text-[#4C69DD] flex-shrink-0" />
                    </div>
                    <div>
                      <span className="text-sm text-text block">{event.location}</span>
                      <span className="text-xs text-text-secondary">{event.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1 bg-gray-200 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <Users className="h-4 w-4 text-[#4C69DD] flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-text">
                          {event.attendeesCount} / {event.maxAttendees} attendees
                        </span>
                        <span className={`text-xs ${isAlmostFull ? "text-amber-600 font-medium" : "text-gray-400"}`}>
                          {isAlmostFull ? "Almost full!" : `${event.maxAttendees - event.attendeesCount} spots left`}
                        </span>
                      </div>
                      <Progress
                        value={attendancePercentage}
                        className={`h-1.5 ${isAlmostFull ? "bg-amber-500" : "bg-[#4C69DD]"}`}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text mb-3 line-clamp-3">{event.description}</p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5 border-gray-300 text-text-secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-text-secondary">
                  Organized by <span className="font-medium text-[#4C69DD]">{event.organizer}</span>
                </div>
              </div>

              <div className="flex flex gap-2 md:w-32">
                {/* <Button
                  className={
                    event.joined
                      ? "bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 px-3 h-8"
                      : "bg-[#4C69DD] hover:bg-[#4C69DD]/90"
                  }
                >
                  {event.joined ? "Attending" : "Join Event"}
                </Button> */}
                <Button variant="outline" size="icon" className="group border-gray-200 hover:bg-background">
                  <Heart className="h-4 w-4 text-gray-500 group-hover:text-primary-dark group-hover:fill-red-500 group-hover:text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-3 bg-foreground flex justify-between">
            <Button variant="ghost" size="sm" className="text-[#4C69DD] hover:bg-[#4C69DD]/10">
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="border-[#4C69DD] text-white bg-primary hover:bg-primary/80">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View Details
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
