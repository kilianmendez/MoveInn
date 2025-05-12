"use client"

import {
  Calendar,
  MapPin,
  Users,
  Mail,
  Utensils,
  Music,
  Landmark,
  Bike,
  TreesIcon as Tree,
  Building,
  ShoppingBag,
  Wine,
  Coffee,
  BookOpen,
  PenToolIcon as Tool,
} from "lucide-react"
import Image from "next/image"
import type { User } from "@/types/user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { DetailedRecommendationCard } from "@/components/recommendations/detailed-recommendation-card"
import { DetailedEventCard } from "@/components/events/detailed-event-card"
import { API_BASE_IMAGE_URL } from "@/utils/endpoints/config"
import { ProfileInfo } from "./profile-info"

export function UserPublicProfile({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState("profile")

  const getRoleBadge = (role: number) => {
    switch (role) {
      case 0:
        return (
          <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full shadow-sm border border-yellow-200">
            Administrator
          </span>
        )
      case 1:
        return (
          <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full shadow-sm border border-red-200">
            Banned
          </span>
        )
      case 2:
        return (
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full shadow-sm border border-blue-200">
            User
          </span>
        )
      case 3:
        return (
          <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full shadow-sm border border-green-200">
            Host
          </span>
        )
      case 4:
        return (
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full shadow-sm border border-purple-200">
            Lessor
          </span>
        )
      default:
        return null
    }
  }

  // Helper function to get category icon for recommendations
  const getRecommendationCategoryIcon = (category: number) => {
    switch (category) {
      case 0: // Restaurant
        return <Utensils className="h-3.5 w-3.5" />
      case 1: // Cafeteria
        return <Coffee className="h-3.5 w-3.5" />
      case 2: // Museum
        return <Landmark className="h-3.5 w-3.5" />
      case 3: // LeisureZone
        return <Music className="h-3.5 w-3.5" />
      case 4: // Park
        return <Tree className="h-3.5 w-3.5" />
      case 5: // HistoricalSite
        return <Building className="h-3.5 w-3.5" />
      case 6: // Shopping
        return <ShoppingBag className="h-3.5 w-3.5" />
      case 7: // Bar
        return <Wine className="h-3.5 w-3.5" />
      default:
        return <MapPin className="h-3.5 w-3.5" />
    }
  }

  // Helper function to get category icon for events
  const getEventCategoryIcon = (category: number) => {
    switch (category) {
      case 1:
        return <Users className="h-3.5 w-3.5" />
      case 2:
        return <MapPin className="h-3.5 w-3.5" />
      case 3:
        return <Landmark className="h-3.5 w-3.5" />
      case 4:
        return <BookOpen className="h-3.5 w-3.5" />
      case 5:
        return <Bike className="h-3.5 w-3.5" />
      case 6:
        return <Tool className="h-3.5 w-3.5" />
      case 7:
        return <Music className="h-3.5 w-3.5" />
      default:
        return <Calendar className="h-3.5 w-3.5" />
    }
  }
  const userAvatar = user.avatarUrl ? API_BASE_IMAGE_URL + user.avatarUrl : "/placeholder.svg?height=160&width=160"

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <div
          className={`relative h-32 w-32 rounded-full overflow-hidden border-4 shadow-lg ${
            user.role === 0
              ? "border-yellow-400"
              : user.role === 1
                ? "border-red-400"
                : user.role === 2
                  ? "border-blue-400"
                  : user.role === 3
                    ? "border-green-400"
                    : "border-purple-400"
          }`}
        >
          <Image
            src={userAvatar || "/placeholder.svg?height=128&width=128"}
            alt={user.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <h1 className="text-3xl font-bold mt-4 text-[#0E1E40]">
          {user.name} {user.lastName || ""}
        </h1>

        <div className="mt-2">{getRoleBadge(user.role)}</div>

        {user.biography && <p className="mt-4 text-gray-600 max-w-2xl text-center">{user.biography}</p>}

        {user.degree && user.school && (
          <p className="text-sm text-gray-500 mt-2">
            {user.degree} at {user.school}
          </p>
        )}
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl bg-background h-fit p-1 rounded-xl shadow-inner">
            <TabsTrigger
              value="profile"
              className={`
                flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
                ${
                  activeTab === "profile"
                    ? "bg-white text-[#4C69DD] shadow-sm border border-gray-200"
                    : "text-[#4C69DD] hover:text-[#4C69DD] hover:bg-white/50"
                }
              `}
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className={`
                flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
                ${
                  activeTab === "recommendations"
                    ? "bg-white text-[#4C69DD] shadow-sm border border-gray-200"
                    : "text-[#4C69DD] hover:text-[#4C69DD] hover:bg-white/50"
                }
              `}
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className={`
                flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
                ${
                  activeTab === "events"
                    ? "bg-white text-[#4C69DD] shadow-sm border border-gray-200"
                    : "text-[#4C69DD] hover:text-[#4C69DD] hover:bg-white/50"
                }
              `}
            >
              Events
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="border-none shadow-md bg-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-[#0E1E40]">Personal Information</CardTitle>
              <CardDescription className="text-l text-[#0E1E40]">Details of {user.name}'s profile</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ProfileInfo user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.recommendations && user.recommendations.length > 0 ? (
              user.recommendations.map((recommendation) => (
                <DetailedRecommendationCard
                  key={recommendation.id}
                  recommendation={{
                    id: recommendation.id,
                    title: recommendation.title,
                    description: recommendation.description,
                    address: `${recommendation.city}, ${recommendation.country}`,
                    rating: recommendation.rating,
                    category: recommendation.category || 8,
                    tags: recommendation.tags || [],
                    recommendationImages: [
                      {
                        id: recommendation.recommendationImages?.[0]?.id || "",
                        url: `${recommendation.recommendationImages?.[0]?.url}` || "placeholder.svg",
                      },
                    ],
                    city: recommendation.city,
                    country: recommendation.country,
                    createdAt: recommendation.createdAt,
                    userId: recommendation.userId,
                  }}
                  categoryIcon={getRecommendationCategoryIcon(recommendation.category || 8)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No recommendations created yet</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <div className="space-y-6">
            {user.createdEvents && user.createdEvents.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#0E1E40]">Created Events</h2>
                {user.createdEvents.map((event) => (
                  <DetailedEventCard
                    key={event.id}
                    event={{
                      id: event.id,
                      title: event.title,
                      description: event.description,
                      date: new Date(event.date).toISOString(),
                      location: event.address.split(",")[0] || "Location",
                      address: event.address,
                      category: event.category || "Other",
                      imageUrl: event.imageUrl || "/placeholder.svg",
                      attendeesCount: event.attendeesCount || 0,
                      maxAttendees: event.maxAttendees,
                      organizer: `${user.name} ${user.lastName || ""}`,
                      tags: event.tags || [],
                      creatorId: event.creatorId || "Unknown", 
                    }}
                    categoryIcon={getEventCategoryIcon(event.category || "Other")}
                  />
                ))}
              </div>
            )}

            {user.participatingEvents && user.participatingEvents.length > 0 && (
              <div className="space-y-6 mt-10">
                <h2 className="text-xl font-semibold text-[#0E1E40]">Participating Events</h2>
                {user.participatingEvents.map((event) => (
                  <DetailedEventCard
                    key={event.id}
                    event={{
                      id: event.id,
                      title: event.title,
                      description: event.description,
                      date: new Date(event.date).toISOString(),
                      location: event.address.split(",")[0] || "Location",
                      address: event.address,
                      category: event.category || "Other",
                      imageUrl: event.imageUrl || "/placeholder.svg",
                      attendeesCount: event.attendeesCount || 0,
                      maxAttendees: event.maxAttendees,
                      organizer: event.organizer || "Event Organizer",
                      tags: event.tags || [],
                      creatorId: event.creatorId || "Unknown", 
                      }}
                    categoryIcon={getEventCategoryIcon(event.category || "Other")}
                  />
                ))}
              </div>
            )}

            {(!user.createdEvents || user.createdEvents.length === 0) &&
              (!user.participatingEvents || user.participatingEvents.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No events found</p>
                </div>
              )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contact Button */}
      <div className="mt-8 flex justify-center">
        <Button className="bg-[#4C69DD] hover:bg-[#4C69DD]/90">
          <Mail className="mr-2 h-4 w-4" />
          Contact {user.name}
        </Button>
      </div>
    </div>
  )
}
