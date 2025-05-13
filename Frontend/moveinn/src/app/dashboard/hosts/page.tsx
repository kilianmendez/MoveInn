"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  MapPin,
  Star,
  MessageCircle,
  ChevronDown,
  Globe,
  GraduationCap,
  Clock,
  Users,
  CheckCircle,
  X,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { mockUser } from "@/lib/data/mockUser"

export default function HostsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const { hosts } = mockUser    

  // Sample cities
  const cities = [
    { name: "Barcelona", country: "Spain", count: 42 },
    { name: "Prague", country: "Czech Republic", count: 31 },
    { name: "Paris", country: "France", count: 38 },
    { name: "Rome", country: "Italy", count: 29 },
    { name: "Berlin", country: "Germany", count: 35 },
    { name: "Lisbon", country: "Portugal", count: 27 },
    { name: "Amsterdam", country: "Netherlands", count: 24 },
    { name: "Vienna", country: "Austria", count: 21 },
  ]

  // Sample languages
  const languages = [
    { name: "English", count: 156 },
    { name: "Spanish", count: 87 },
    { name: "French", count: 76 },
    { name: "German", count: 68 },
    { name: "Italian", count: 54 },
    { name: "Portuguese", count: 42 },
    { name: "Czech", count: 31 },
    { name: "Dutch", count: 28 },
  ]

  // Sample expertise areas
  const expertiseAreas = [
    { name: "Housing", count: 124 },
    { name: "Academic Support", count: 98 },
    { name: "Local Culture", count: 87 },
    { name: "Nightlife", count: 76 },
    { name: "City Navigation", count: 68 },
    { name: "Weekend Trips", count: 62 },
    { name: "Student Jobs", count: 54 },
    { name: "Administrative Help", count: 47 },
  ]

  // Filter hosts by active filter
  const filteredHosts = activeFilter
    ? hosts.filter(
        (host) =>
          host.location.includes(activeFilter) ||
          host.languages.includes(activeFilter) ||
          host.expertise.includes(activeFilter),
      )
    : hosts

  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Local Student Hosts</h1>
                  <p className="text-white/80">
                    Connect with experienced local students who can guide you through your Erasmus journey
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <Button className="bg-[#FFBF00] text-[#0E1E40] hover:bg-[#FFBF00]/90 font-semibold">
                    <Users className="mr-2 h-4 w-4" />
                    Become a Host
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for hosts by name, university, or expertise..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                </div>

                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 bg-white/10">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Hosts</DropdownMenuItem>
                      <DropdownMenuItem>Super Hosts</DropdownMenuItem>
                      <DropdownMenuItem>Online Now</DropdownMenuItem>
                      <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Languages</DropdownMenuLabel>
                      <DropdownMenuItem>English</DropdownMenuItem>
                      <DropdownMenuItem>Spanish</DropdownMenuItem>
                      <DropdownMenuItem>French</DropdownMenuItem>
                      <DropdownMenuItem>German</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Expertise</DropdownMenuLabel>
                      <DropdownMenuItem>Housing</DropdownMenuItem>
                      <DropdownMenuItem>Academic Support</DropdownMenuItem>
                      <DropdownMenuItem>Local Culture</DropdownMenuItem>
                      <DropdownMenuItem>Nightlife</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Tabs defaultValue="grid" className="w-auto">
                    <TabsList className="bg-white/10 border border-white/20">
                      <TabsTrigger
                        value="grid"
                        onClick={() => setViewMode("grid")}
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0E1E40] text-white"
                      >
                        <Users className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger
                        value="map"
                        onClick={() => setViewMode("map")}
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0E1E40] text-white"
                      >
                        <MapPin className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6 order-2 xl:order-1 xl:col-span-1">
            {/* Quick Stats */}
            <Card className="border-none shadow-md bg-foreground py-0">
              <CardContent className="p-4">
                <h2 className="font-semibold text-text-secondary mb-3">Host Community</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#E7ECF0]/30 p-3 rounded-lg text-center w-full">
                    <div className="text-xl font-bold text-text">1,240</div>
                    <div className="text-sm text-text-secondary">Active Hosts</div>
                  </div>
                  <div className="bg-[#E7ECF0]/30 p-3 rounded-lg text-center w-full">
                    <div className="text-xl font-bold text-text">42</div>
                    <div className="text-sm text-text-secondary">Countries</div>
                  </div>
                  <div className="bg-[#E7ECF0]/30 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-text">156</div>
                    <div className="text-sm text-text-secondary">Universities</div>
                  </div>
                  <div className="bg-[#E7ECF0]/30 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-text">28</div>
                    <div className="text-sm text-text-secondary">Languages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cities Filter */}
            <Card className="border-none shadow-md bg-foreground py-0">
              <CardContent className="p-4">
                <h2 className="font-semibold text-text-secondary mb-3">Popular Cities</h2>
                <div className="space-y-2">
                  {cities.map((city) => (
                    <Button
                      key={city.name}
                      variant="outline"
                      className={`w-full justify-between h-auto py-2 border-none text-primary-dark ${
                        activeFilter === city.name ? "bg-[#4C69DD] text-white" : ""
                      }`}
                      onClick={() => setActiveFilter(activeFilter === city.name ? null : city.name)}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>
                          {city.name}, {city.country}
                        </span>
                      </div>
                      <Badge
                        className={`${
                          activeFilter === city.name ? "bg-white text-[#4C69DD]" : "bg-[#E7ECF0] text-[#4C69DD]"
                        }`}
                      >
                        {city.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2 text-[#4C69DD]">
                  View All Cities
                </Button>
              </CardContent>
            </Card>

            {/* Languages Filter */}
            <Card className="border-none shadow-md bg-foreground py-0">
              <CardContent className="p-4">
                <h2 className="font-semibold text-text-secondary mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge
                      key={language.name}
                      variant="outline"
                      className={`cursor-pointer px-3 py-1 text-primary-dark ${
                        activeFilter === language.name
                          ? "bg-[#FFBF00] text-[#0E1E40] border-[#FFBF00]"
                          : "hover:bg-[#E7ECF0] border-gray-200"
                      }`}
                      onClick={() => setActiveFilter(activeFilter === language.name ? null : language.name)}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      {language.name} ({language.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expertise Filter */}
            <Card className="border-none shadow-md bg-foreground py-0">
              <CardContent className="p-4">
                <h2 className="font-semibold text-text-secondary mb-3">Areas of Expertise</h2>
                <div className="space-y-2">
                  {expertiseAreas.map((area) => (
                    <div
                      key={area.name}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                        activeFilter === area.name ? "bg-background text-primary-dark" : "bg-background hover:bg-background/50"
                      }`}
                      onClick={() => setActiveFilter(activeFilter === area.name ? null : area.name)}
                    >
                      <span className="text-primary-dark">{area.name}</span>
                      <Badge
                        className={`${
                          activeFilter === area.name ? "bg-white text-[#0E1E40]" : "bg-[#E7ECF0] text-[#4C69DD]"
                        }`}
                      >
                        {area.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Become a Host */}
            <Card className="border-none shadow-md bg-gradient-to-br from-[#FFBF00]/20 to-foreground">
              <CardContent className="p-4">
                <h2 className="font-semibold text-text-secondary mb-3">Become a Host</h2>
                <p className="text-sm text-text mb-4">
                  Help incoming Erasmus students navigate your city and university. Share your knowledge and make new
                  international friends!
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#FFBF00] mt-0.5 mr-2" />
                    <span className="text-sm text-gray-500">Earn recognition in your university</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#FFBF00] mt-0.5 mr-2" />
                    <span className="text-sm text-gray-500">Build your international network</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#FFBF00] mt-0.5 mr-2" />
                    <span className="text-sm text-gray-500">Gain intercultural experience</span>
                  </div>
                </div>
                <Button className="w-full bg-[#FFBF00] text-[#0E1E40] hover:bg-[#FFBF00]/90">
                  Apply to Become a Host
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="order-1 lg:order-1 lg:col-span-3">
            {/* Active Filters */}
            {activeFilter && (
              <div className="mb-4 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Active filter:</span>
                <Badge
                  className="bg-[#4C69DD]/10 text-[#4C69DD] hover:bg-[#4C69DD]/20 px-3 py-1"
                  onClick={() => setActiveFilter(null)}
                >
                  {activeFilter}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              </div>
            )}

            {/* View Mode: Grid or Map */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHosts.map((host) => (
                  <Link href={`/dashboard/hosts/${host.id}`} key={host.id}>
                    <Card className="border-none shadow-md hover:shadow-lg transition-all h-full w-full rounded-md py-0 bg-foreground">
                      <div className="relative">
                        <div className="h-48 bg-gradient-to-br from-[#4C69DD]/20 to-[#62C3BA]/20 rounded-t-md flex items-center justify-center">
                          <Avatar className="h-32 w-32 border-4 border-white">
                            <AvatarImage src={host.avatar} alt={host.name} />
                            <AvatarFallback className="bg-[#4C69DD] text-white text-2xl">
                              {host.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {host.isOnline && (
                          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                            <div className="h-2 w-2 rounded-full bg-white mr-1 animate-pulse"></div>
                            Online
                          </Badge>
                        )}
                        {host.isSuperHost && (
                          <Badge className="absolute top-3 left-3 bg-[#FFBF00] text-[#0E1E40]">
                            <Star className="h-3 w-3 mr-1 fill-[#0E1E40]" />
                            Super Host
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="text-center mb-3">
                          <h3 className="font-semibold text-text text-lg">{host.name}</h3>
                          <p className="text-gray-500 text-sm">{host.university}</p>
                          <div className="flex items-center justify-center mt-1">
                            <MapPin className="h-3 w-3 text-[#4C69DD] mr-1" />
                            <span className="text-sm text-gray-500">{host.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <div className="flex items-center bg-background px-2 py-1 rounded-full">
                            <Star className="h-3 w-3 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                            <span className="font-medium text-text">{host.rating}</span>
                            <span className="text-gray-500 text-xs ml-1">({host.reviewCount})</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {host.languages.map((language, index) => (
                            <Badge
                              key={language}
                              variant="outline"
                              className={`text-xs ${
                                index === 0
                                  ? "border-[#4C69DD] text-[#4C69DD]"
                                  : index === 1
                                    ? "border-[#62C3BA] text-[#62C3BA]"
                                    : "border-accent text-accent"
                              }`}
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <GraduationCap className="h-3 w-3 text-[#4C69DD] mr-1" />
                            <span>Helped {host.helpedStudents} students</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 text-[#4C69DD] mr-1" />
                            <span>Responds {host.responseTime}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {host.expertise.slice(0, 3).map((area) => (
                            <Badge key={area} className="bg-background text-text text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-3 pt-0">
                        <Button className="w-full bg-primary text-white hover:bg-primary/70">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact Host
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              // Map View
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-[600px]">
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 bg-[#E7ECF0]">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] opacity-20"></div>

                  {/* Host markers on map */}
                  {filteredHosts.map((host) => (
                    <div
                      key={host.id}
                      className="absolute cursor-pointer transition-all duration-300 hover:z-20 hover:scale-110"
                      style={{
                        // Random positions for demonstration - would be actual coordinates in real implementation
                        top: `${30 + Math.random() * 40}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage src={host.avatar} alt={host.name} />
                          <AvatarFallback className="bg-[#4C69DD] text-white">{host.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {host.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                        {host.isSuperHost && (
                          <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#FFBF00] border-2 border-white flex items-center justify-center">
                            <Star className="h-2 w-2 text-[#0E1E40]" />
                          </div>
                        )}
                      </div>

                      <div className="absolute mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 w-48 opacity-0 hover:opacity-100 transition-opacity z-10">
                        <div className="text-center mb-1">
                          <div className="font-medium text-[#0E1E40]">{host.name}</div>
                          <div className="text-xs text-gray-600">{host.university}</div>
                        </div>
                        <div className="flex items-center justify-center mb-1">
                          <Star className="h-3 w-3 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                          <span className="text-sm">{host.rating}</span>
                        </div>
                        <Button size="sm" className="w-full h-7 text-xs bg-background">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Map Attribution */}
                  <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-white/80 px-1 rounded">
                    Map data © MoveIn 2025
                  </div>
                </div>
              </div>
            )}

            {filteredHosts.length === 0 && (
              <div className="text-center py-12 bg-white/50 rounded-lg border border-gray-100">
                <div className="bg-[#E7ECF0]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No hosts found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any hosts matching your filter criteria. Try adjusting your filters or search for a
                  different location.
                </p>
                <Button onClick={() => setActiveFilter(null)}>Clear Filter</Button>
              </div>
            )}

            {filteredHosts.length > 0 && filteredHosts.length < hosts.length && (
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-[#4C69DD] text-[#4C69DD]">
                  Load More Hosts
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
