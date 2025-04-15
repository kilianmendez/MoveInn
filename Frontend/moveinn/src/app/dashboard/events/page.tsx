"use client"

import { useState } from "react"
import {
  Search, Filter, Calendar, List, ChevronDown, Plus, Users, X,
  Music, Utensils, GraduationCap, Plane, Globe, Coffee, BookOpen
} from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DetailedEventCard } from "@/components/events/detailed-event-card"
import { EventCalendarView } from "@/components/events/event-calendar-view"
import { CreateEventDialog } from "@/components/events/create-event-dialog"

import { mockUser } from "@/lib/data/mockUser"

export default function EventsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)

  const events = mockUser.events.map(e => ({
    ...e,
    date: new Date(e.date)
  }))

  const filteredEvents = events.filter(event =>
    isSameDay(event.date, selectedDate) &&
    (activeFilters.length === 0 || activeFilters.includes(event.category))
  )

  const toggleFilter = (filter: string) =>
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )

  const clearFilters = () => setActiveFilters([])

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      social: <Coffee className="h-4 w-4" />,
      trip: <Plane className="h-4 w-4" />,
      cultural: <Globe className="h-4 w-4" />,
      academic: <GraduationCap className="h-4 w-4" />,
      sports: <Users className="h-4 w-4" />,
      workshop: <BookOpen className="h-4 w-4" />,
      party: <Music className="h-4 w-4" />,
      food: <Utensils className="h-4 w-4" />
    }
    return icons[category.toLowerCase()] || <Calendar className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <section className="mb-8">
          <div className="relative bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 md:p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
            <div className="relative z-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Events & Meetups</h1>
                <p className="text-white/80 text-sm md:text-base">
                  Discover and join activities with fellow Erasmus students in Barcelona
                </p>
              </div>
              <Button
                className="bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 font-semibold"
                onClick={() => setIsCreateEventOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>

            {/* Filters & Tabs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-white/10 text-white border-white/20 placeholder:text-white/60 focus:bg-white/20"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-white bg-white/10 border-white/20 hover:bg-white/10">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-foreground border-white/20 text-primary-dark">
                    <DropdownMenuLabel>Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["Social", "Trip", "Cultural", "Academic", "Sports", "Workshop"].map(cat => (
                      <DropdownMenuItem key={cat} onClick={() => toggleFilter(cat)}>
                        {getCategoryIcon(cat)} <span className="ml-2">{cat}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Tabs defaultValue="list">
                  <TabsList className="bg-white/10 border border-white/20">
                    <TabsTrigger
                      value="list"
                      onClick={() => setViewMode("list")}
                      className="data-[state=active]:bg-white data-[state=active]:text-[#0E1E40] text-white"
                    >
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="calendar"
                      onClick={() => setViewMode("calendar")}
                      className="data-[state=active]:bg-white data-[state=active]:text-[#0E1E40] text-white"
                    >
                      <Calendar className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Date Selector */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
          {next7Days.map((date, i) => (
            <Button
              key={i}
              variant={isSameDay(date, selectedDate) ? "default" : "outline"}
              className={`flex-shrink-0 h-fit w-20 text-sm ${
                isSameDay(date, selectedDate)
                  ? "bg-[#4C69DD] text-white"
                  : "bg-foreground text-primary-dark hover:bg-background"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="flex flex-col items-center">
                <span>{i === 0 ? "Today" : format(date, "EEE")}</span>
                <span className="text-lg font-bold">{format(date, "d")}</span>
                <span>{format(date, "MMM")}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeFilters.map(filter => (
              <Badge key={filter} className="bg-[#4C69DD]/10 text-[#4C69DD] px-3 py-1">
                {filter}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4C69DD] hover:bg-[#4C69DD]/10 h-7 px-2"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Selected Date Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0E1E40]">
            Events for {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h2>
          <p className="text-gray-500">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {/* Events */}
        {viewMode === "list" ? (
          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <DetailedEventCard key={event.id} event={event} categoryIcon={getCategoryIcon(event.category)} />
              ))
            ) : (
              <div className="text-center py-12 bg-foreground rounded-lg border border-gray-100">
                <div className="bg-[#E7ECF0]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  There are no events scheduled for this date that match your filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={clearFilters}>Clear filters</Button>
                  <Button variant="default" className="bg-secondary text-primary-dark hover:bg-secondary/80" onClick={() => setIsCreateEventOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create an event
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EventCalendarView
            events={events}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            activeFilters={activeFilters}
          />
        )}
      </main>

      <CreateEventDialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen} />
    </div>
  )
}
