"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileInfo } from "./profile-info"
import { ProfileEdit } from "./profile-edit"
import { Facebook, Instagram, Twitter, FileEdit, User, Linkedin, Github, X, TwitterIcon } from "lucide-react"
import { SOCIAL_MEDIA_TYPES } from "@/types/user"
import { useAuth } from "@/context/authcontext"
import { API_BASE_IMAGE_URL } from "@/utils/endpoints/config"

export function UserProfile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("info")

  if (!user) {
    return <div className="text-gray-800">No user information available</div>
  }

  const getSocialIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Facebook className="h-5 w-5" />
      case 2:
        return <Instagram className="h-5 w-5" />
      case 3:
        return <Twitter className="h-5 w-5" />

    }
  }

  const userAvatar = user.avatarUrl ? API_BASE_IMAGE_URL + user.avatarUrl : "/placeholder.svg?height=160&width=160"

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
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with profile photo and name */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div
          className={`relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 shadow-lg ${
            user.role === 0
              ? "border-yellow-400"
              : user.role === 1
                ? "border-red-400"
                : user.role === 2
                  ? "border-blue-400"
                  : user.role === 3
                    ? "border-green-400"
                    : "border-primary"
          }`}
        >
          <Image
            src={userAvatar || "/placeholder.svg"}
            alt={`${user.name} ${user.lastName || ""}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-text mb-2">
            {user.name} {user.lastName || ""}
          </h1>
          {getRoleBadge(user.role)}

          {user.biography && <p className="px-1 mt-6 text-text-secondary max-w-2xl">{user.biography}</p>}

          {user.socialMedias && user.socialMedias.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {user.socialMedias.map((social) => (
                <a
                  key={`${social.id}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  title={SOCIAL_MEDIA_TYPES[social.socialMedia as keyof typeof SOCIAL_MEDIA_TYPES] || "Social Media"}
                >
                  {getSocialIcon(social.socialMedia)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-2">
          <TabsList className="grid grid-cols-2 w-full max-w-xl bg-background h-fit p-1 rounded-xl shadow-inner">
            <TabsTrigger
              value="info"
              className={`
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
        ${
          activeTab === "info"
            ? "bg-white text-primary shadow-sm border border-gray-200"
            : "text-primary hover:text-primary hover:bg-white/50"
        }
      `}
            >
              <User className="h-4 w-4" />
              <span>Information</span>
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className={`
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
        ${
          activeTab === "edit"
            ? "bg-white text-primary shadow-sm border border-gray-200"
            : "text-primary hover:text-primary hover:bg-white/50"
        }
      `}
            >
              <FileEdit className="h-4 w-4" />
              <span>Edit Profile</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="info" className="mt-6">
          <Card className="border-none shadow-sm bg-foreground">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-text">Personal Information</CardTitle>
              <CardDescription className="text-gray-500">Details of your user profile</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ProfileInfo user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="mt-6">
          <Card className="border-none shadow-sm bg-foreground">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-text">Edit Profile</CardTitle>
              <CardDescription className="text-gray-500">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ProfileEdit onSuccess={() => setActiveTab("info")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
