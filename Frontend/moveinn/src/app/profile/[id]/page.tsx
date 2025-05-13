"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { API_GET_USER } from "@/utils/endpoints/config"
import {UserPublicProfile}  from "@/components/profile/user-public-profile"
import { HostPublicProfile } from "@/components/profile/host-public-profile"
import { LessorPublicProfile } from "@/components/profile/lessor-public-profile"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(API_GET_USER(id as string), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#4C69DD]" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error || "User not found"}</p>
        </div>
      </div>
    )
  }



  if (user.role === 3) {
    return <HostPublicProfile user={user} />
  } else if (user.role === 4) {
    return <LessorPublicProfile user={user} />
  } else {
    // Default to regular user profile
    return <UserPublicProfile user={user} />
  }
}
