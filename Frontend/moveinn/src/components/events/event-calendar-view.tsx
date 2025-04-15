"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  getDay,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface EventCalendarViewProps {
  events: Event[]
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  activeFilters: string[]
}

export function EventCalendarView({ events, selectedDate, setSelectedDate, activeFilters }: EventCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate))

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: currentMonth,
    end: endOfMonth(currentMonth),
  })

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(
      (event) => isSameDay(event.date, day) && (activeFilters.length === 0 || activeFilters.includes(event.category)),
    )
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "social":
        return "bg-[#B7F8C8] border-[#B7F8C8]"
      case "trip":
        return "bg-[#4C69DD] border-[#4C69DD]"
      case "cultural":
        return "bg-[#62C3BA] border-[#62C3BA]"
      case "academic":
        return "bg-[#4C69DD]/80 border-[#4C69DD]/80"
      case "sports":
        return "bg-[#B7F8C8] border-[#B7F8C8]"
      case "workshop":
        return "bg-[#62C3BA] border-[#62C3BA]"
      case "party":
        return "bg-[#0E1E40] border-[#0E1E40]"
      default:
        return "bg-gray-200 border-gray-200"
    }
  }

  // Get day of week names
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Calculate empty cells before the first day of the month
  const firstDayOfMonth = getDay(currentMonth)
  const emptyCellsBefore = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-[#0E1E40]">{format(currentMonth, "MMMM yyyy")}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday Headers */}
          {weekdays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells before first day */}
          {emptyCellsBefore.map((i) => (
            <div key={`empty-before-${i}`} className="h-24 md:h-32 p-1 bg-gray-50/50"></div>
          ))}

          {/* Calendar Days */}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isSelected = isSameDay(day, selectedDate)
            const isTodayDate = isToday(day)

            return (
              <div
                key={day.toString()}
                className={`h-24 md:h-32 p-1 border border-gray-100 transition-colors ${
                  isSelected
                    ? "bg-[#4C69DD]/10 border-[#4C69DD]"
                    : isTodayDate
                      ? "bg-[#B7F8C8]/10 border-[#B7F8C8]"
                      : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-sm font-medium ${
                      isTodayDate
                        ? "bg-[#B7F8C8] text-[#0E1E40] w-6 h-6 rounded-full flex items-center justify-center"
                        : isSelected
                          ? "text-[#4C69DD]"
                          : "text-gray-700"
                    }`}
                  >
                    {format(day, "d")}
                  </span>

                  {dayEvents.length > 0 && (
                    <Badge className="bg-[#4C69DD] text-white text-xs">{dayEvents.length}</Badge>
                  )}
                </div>

                {/* Event Indicators */}
                <div className="mt-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <TooltipProvider key={event.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`text-xs truncate px-1 py-0.5 rounded ${getCategoryColor(event.category)} ${
                              event.category.toLowerCase() === "trip" ||
                              event.category.toLowerCase() === "academic" ||
                              event.category.toLowerCase() === "party"
                                ? "text-white"
                                : "text-[#0E1E40]"
                            } ${event.joined ? "border-l-2 border-white" : ""}`}
                          >
                            {format(event.date, "HH:mm")} {event.title}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs">
                              {format(event.date, "h:mm a")} • {event.location}
                            </p>
                            <p className="text-xs">
                              {event.attendees}/{event.maxAttendees} attending
                            </p>
                            {event.joined && (
                              <Badge className="bg-[#B7F8C8] text-[#0E1E40] text-xs">You're attending</Badge>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}

                  {dayEvents.length > 3 && (
                    <div className="text-xs text-[#4C69DD] font-medium px-1">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#B7F8C8] rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Social</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#4C69DD] rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Trip</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#62C3BA] rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Cultural</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#4C69DD]/80 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Academic</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#0E1E40] rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Party</span>
          </div>
          <div className="flex items-center ml-auto">
            <div className="w-3 h-3 border-l-2 border-white bg-gray-200 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">You're attending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
