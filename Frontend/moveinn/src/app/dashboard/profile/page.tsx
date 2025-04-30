"use client"

import { UserProfile } from "@/components/profile/user-profile"
import { useAuth } from "@/context/authcontext"

export default function ProfilePage() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2 text-text">No has iniciado sesión</h3>
          <p className="text-text-secondary mb-4">Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <UserProfile />
    </div>
  )
}
