"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, GraduationCap, Globe, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { useAuth } from "@/context/authcontext"
import { API_GET_ALL_USERS } from "@/utils/endpoints/config"
import Link from "next/link"
import UserCard from "@/components/findpeople/user-card"

export default function UsersExplorePage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [navigating, setNavigating] = useState(false)



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true)
        const token = localStorage.getItem("accessToken")
        const res = await axios.get(API_GET_ALL_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const filtered = res.data.filter((u: any) => u.id !== user?.id)
        setUsers(filtered)
      } catch (err) {
        console.error("Error fetching users:", err)
      } finally {
        setIsLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [user])

  const uniqueErasmusCountries = Array.from(
    new Set(users.map((u) => u.erasmusCountry).filter(Boolean))
  )

  const citiesByCountry: Record<string, string[]> = {}
  users.forEach((u) => {
    if (u.erasmusCountry && u.city) {
      if (!citiesByCountry[u.erasmusCountry]) {
        citiesByCountry[u.erasmusCountry] = []
      }
      if (!citiesByCountry[u.erasmusCountry].includes(u.city)) {
        citiesByCountry[u.erasmusCountry].push(u.city)
      }
    }
  })

  const currentCities = selectedCountry ? citiesByCountry[selectedCountry] || [] : []

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      u.name.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.city?.toLowerCase().includes(term) ||
      u.erasmusCountry?.toLowerCase().includes(term) ||
      u.school?.toLowerCase().includes(term)

    const matchesCountry = selectedCountry ? u.erasmusCountry === selectedCountry : true
    const matchesCity = selectedCity ? u.city === selectedCity : true

    return matchesSearch && matchesCountry && matchesCity
  })

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] dark:to-foreground rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Find Erasmus Friends</h1>
              <p className="text-white/80 mb-4">Search and connect with other Erasmus students</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, school, city, or country..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Erasmus Country</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-background text-text"
              value={selectedCountry || "all"}
              onChange={(e) => {
                const val = e.target.value
                setSelectedCountry(val === "all" ? "" : val)
                setSelectedCity("")
              }}
            >
              <option value="all">All Countries</option>
              {uniqueErasmusCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">City</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-background text-text"
              value={selectedCity || "all"}
              onChange={(e) => setSelectedCity(e.target.value === "all" ? "" : e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="all">All Cities</option>
              {currentCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Tarjetas */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((u) => (
              <UserCard
              key={u.id}
              user={u}
              onClick={() => {
                setNavigating(true)
                window.location.href = `/dashboard/findpeople/${u.id}`
              }}
            />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found. Try a different search term.</p>
          </div>
        )}
      </main>
      {(isLoadingUsers || navigating) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      )}
    </div>
  )
}
