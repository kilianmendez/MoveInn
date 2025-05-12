"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  MapPin,
  ChevronDown,
  Users,
  X,
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
import { AcommodationCard } from "@/components/housing/acommodation-card"
import axios from "axios"

import { API_ALL_ACOMMODATIONS, API_SEARCH_ACOMMODATION } from "@/utils/endpoints/config"

interface Acommodation {
  id: number
  title: string
  description: string
  addres: string
  city: string
  country: string
  pricePerMonth: number
  numberOfRooms: number
  bathrooms: number
  squareMeters: number
  hasWifi: boolean
  ownetId: string
  availableFrom: string
  availableTo: string
  images: string[]
  publisher: string
}

export default function AcommodationsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [acommodations, setAcommodations] = useState<Acommodation[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortField, setSortField] = useState<string | null>("")
  const [sortOrder, setSortOrder] = useState<string | null>("")
  const [availableFrom, setAvailableFrom] = useState<string | null>("") 
  const [availableTo, setAvailableTo] = useState<string | null>("")
  const [country, setCountry] = useState<string | null>("")
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  

  const searchAcommodations = async () => {

      {/*Iso Date from today*/}
      const isoDate = new Date().toISOString()

      {/*Iso Date in 15 days*/}
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 15)
      const isoDate2 = futureDate.toISOString()

    const searchParams = ({
      query: searchQuery,
      sortField: sortField,
      sortOrder: sortOrder,
      availableFrom: isoDate,
      availableTo: isoDate2,
      country: country,
      page: page,
      limit: limit
    });

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(API_SEARCH_ACOMMODATION, searchParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const data = response.data
      const foundPlaces = data.items
  
      console.log("Alojamientos mediante busqueda:", foundPlaces)
  
      if (Array.isArray(foundPlaces)) {
        setAcommodations(foundPlaces)
      } else {
        console.warn("Respuesta inesperada del backend:", data)
        setAcommodations([])
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error)
      setAcommodations([])
    }
  }

  const fetchAcommodations = async () => {
    try {
      const token = localStorage.getItem("token") // 👈 aún no se está usando, lo dejo si lo necesitas para autenticación
      const response = await axios.get(API_ALL_ACOMMODATIONS, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 solo si la API lo requiere
        },
      })
  
      const data = response.data
  
      console.log("Alojamientos encontrados:", data)
  
      if (Array.isArray(data)) {
        setAcommodations(data)
      } else {
        console.warn("Respuesta inesperada del backend:", data)
        setAcommodations([])
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error)
      setAcommodations([])
    }
  }
  
  useEffect(() => {
    fetchAcommodations()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery !== "") {
        searchAcommodations()
      } else {
        fetchAcommodations()
      }
    }, 400) // retrasa la búsqueda para evitar spamear peticiones
  
    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] dark:to-foreground rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Find Acommodations</h1>
                  <p className="text-white/80">
                    Choose your perfect place to stay
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for houses, flats, or rooms..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                    value={searchQuery ?? ""}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className=" border-white/20 text-white hover:bg-white/5 bg-white/10">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white text-primary-dark">
                      <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Acommodations</DropdownMenuItem>
                      <DropdownMenuItem>Houses</DropdownMenuItem>
                      <DropdownMenuItem>Apartments</DropdownMenuItem>
                      <DropdownMenuItem>Student Residences</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Rooms</DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">           

          {/* Main Content */}
          <div className="order-1 lg:order-2 lg:col-span-3">
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
                {acommodations.map((acommodation) => (
                <Link href={`/dashboard/acommodations/${acommodation.id}`} key={acommodation.id}>
                  <AcommodationCard acommodation={acommodation} />
                </Link>
              ))}
              </div>
            ) : (
              // Map View
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-[600px]">
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 bg-[#E7ECF0]">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] opacity-20"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
