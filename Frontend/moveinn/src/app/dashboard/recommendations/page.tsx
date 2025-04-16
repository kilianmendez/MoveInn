"use client"

import { useEffect, useState } from "react"
import {
  Search,
  MapPin,
  Filter,
  Star,
  Coffee,
  Utensils,
  Landmark,
  Music,
  GraduationCap,
  Bike,
  Map,
  Grid3X3,
  Plus,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DetailedRecommendationCard } from "@/components/recommendations/detailed-recommendation-card"
import axios from "axios"
import { API_SEARCH_RECOMMENDATION } from "@/utils/endpoints/config"

interface Recommendation {
  address: string;
  category: string;
  city: string;
  country: string;
  createdAt: string;
  description: string;
  id: number;
  rating: number;
  title: string;
  image: string;
}

export default function RecommendationsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
  }


  const handleSearch = async () => {
    const body =  {
        "query": "",
        "sortField": "",
        "sortOrder": "",
        "country": "Spain",
        "city": "",
        "page": 1,
        "limit": 10
      }
    const response = await axios.post(API_SEARCH_RECOMMENDATION, body)
    console.log(response.data)
    setRecommendations(response.data)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const categories = {
    "Restaurant": 0,
    "Cafeteria": 1,
    "Museum": 2,
    "LeisureZone": 3,
    "Park": 4,
    "HistoricalSite": 5,
    "Shopping": 6,
    "Bar": 7,
    "Other": 8,
  }

  // Sample recommendation data
  const recommendationsPlaceHolder = [
    {
      id: 1,
      name: "La Sagrada Familia",
      category: "Sightseeing",
      rating: 4.9,
      priceRange: "€€",
      description:
        "Gaudí's famous basilica. Book tickets online to avoid long queues! This iconic church is a must-visit landmark in Barcelona with its unique architecture and fascinating history.",
      address: "Carrer de Mallorca, 401, 08013 Barcelona",
      recommendedBy: "Maria (Host)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Architecture", "Tourist Spot", "Cultural"],
      isFavorite: true,
    },
    {
      id: 2,
      name: "El Xampanyet",
      category: "Restaurant",
      rating: 4.7,
      priceRange: "€€",
      description:
        "Traditional tapas bar with great atmosphere and local cava. This small, always-crowded bar is known for its house cava and delicious tapas selection.",
      address: "Carrer de Montcada, 22, 08003 Barcelona",
      recommendedBy: "Thomas (Student)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Tapas", "Local Cuisine", "Drinks"],
      isFavorite: false,
    },
    {
      id: 3,
      name: "Parc de la Ciutadella",
      category: "Outdoors",
      rating: 4.6,
      priceRange: "Free",
      description:
        "Perfect for picnics, studying outdoors, or rowing on the lake. This beautiful park includes a zoo, a lake, several museums, and a large fountain designed by Gaudí.",
      address: "Passeig de Picasso, 21, 08003 Barcelona",
      recommendedBy: "Anna (Host)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Park", "Relaxation", "Student-friendly"],
      isFavorite: true,
    },
    {
      id: 4,
      name: "Bunkers del Carmel",
      category: "Viewpoint",
      rating: 4.8,
      priceRange: "Free",
      description:
        "Best sunset view of Barcelona. Bring snacks and drinks! These old anti-aircraft bunkers from the Spanish Civil War offer a 360-degree view of the city.",
      address: "Carrer de Marià Labèrnia, s/n, 08032 Barcelona",
      recommendedBy: "Carlos (Student)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Sunset", "Views", "Photography"],
      isFavorite: false,
    },
    {
      id: 5,
      name: "Biblioteca Jaume Fuster",
      category: "Study",
      rating: 4.5,
      priceRange: "Free",
      description:
        "Modern library with excellent study spaces and free WiFi. Perfect for getting work done in a quiet, inspiring environment.",
      address: "Plaça de Lesseps, 20, 08023 Barcelona",
      recommendedBy: "Elena (Host)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Study", "Quiet", "WiFi"],
      isFavorite: false,
    },
    {
      id: 6,
      name: "Paradiso",
      category: "Nightlife",
      rating: 4.7,
      priceRange: "€€€",
      description:
        "Hidden speakeasy bar with creative cocktails. Enter through a pastrami shop refrigerator door for a unique experience!",
      address: "Carrer de Rera Palau, 4, 08003 Barcelona",
      recommendedBy: "Miguel (Student)",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Cocktails", "Hidden Gem", "Evening"],
      isFavorite: true,
    },
  ]

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "sightseeing":
        return <Landmark className="h-4 w-4" />
      case "outdoors":
        return <Bike className="h-4 w-4" />
      case "viewpoint":
        return <MapPin className="h-4 w-4" />
      case "study":
        return <GraduationCap className="h-4 w-4" />
      case "nightlife":
        return <Music className="h-4 w-4" />
      case "café":
        return <Coffee className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">

      <div className="flex">

        <main className={`flex-1 transition-all duration-300`}>
          <div className="container mx-auto px-4 py-6">
            {/* Header Section */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7F8C8]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#62C3BA]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">Local Recommendations</h1>
                      <p className="text-white/80">
                        Discover the best places in Barcelona recommended by hosts and fellow students
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <Button className="bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 font-semibold">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Recommendation
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search for places, activities, or keywords..."
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className=" bg-foreground/10 border-white/20 text-white hover:bg-white/15">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-foreground text-primary-dark">
                          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-gray-500">Category</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Utensils className="mr-2 h-4 w-4" />
                              <span>Restaurants</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Coffee className="mr-2 h-4 w-4" />
                              <span>Cafés</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Landmark className="mr-2 h-4 w-4" />
                              <span>Sightseeing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bike className="mr-2 h-4 w-4" />
                              <span>Outdoors</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Music className="mr-2 h-4 w-4" />
                              <span>Nightlife</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-gray-500">Price Range</DropdownMenuLabel>
                            <DropdownMenuItem>Free</DropdownMenuItem>
                            <DropdownMenuItem>€ (Budget-friendly)</DropdownMenuItem>
                            <DropdownMenuItem>€€ (Moderate)</DropdownMenuItem>
                            <DropdownMenuItem>€€€ (Expensive)</DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-gray-500">Rating</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 text-gray-300" />
                                <span className="ml-2">& up</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    className="bg-[#4C69DD]/10 text-[#4C69DD] hover:bg-[#4C69DD]/20 px-3 py-1"
                    onClick={() => toggleFilter(filter)}
                  >
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

            {/* Category Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("All") ? "bg-[#0E1E40] text-white" : ""}`}
                onClick={() => clearFilters()}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Restaurant") ? "bg-[#B7F8C8] text-[#0E1E40]" : ""}`}
                onClick={() => toggleFilter("Restaurant")}
              >
                <Utensils className="mr-1 h-3 w-3" />
                Restaurants
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Café") ? "bg-[#B7F8C8] text-[#0E1E40]" : ""}`}
                onClick={() => toggleFilter("Café")}
              >
                <Coffee className="mr-1 h-3 w-3" />
                Cafés
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Sightseeing") ? "bg-[#4C69DD] text-white" : ""}`}
                onClick={() => toggleFilter("Sightseeing")}
              >
                <Landmark className="mr-1 h-3 w-3" />
                Sightseeing
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Outdoors") ? "bg-[#62C3BA] text-[#0E1E40]" : ""}`}
                onClick={() => toggleFilter("Outdoors")}
              >
                <Bike className="mr-1 h-3 w-3" />
                Outdoors
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Nightlife") ? "bg-[#0E1E40] text-white" : ""}`}
                onClick={() => toggleFilter("Nightlife")}
              >
                <Music className="mr-1 h-3 w-3" />
                Nightlife
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-foreground text-primary-dark ${activeFilters.includes("Study") ? "bg-[#4C69DD] text-white" : ""}`}
                onClick={() => toggleFilter("Study")}
              >
                <GraduationCap className="mr-1 h-3 w-3" />
                Study Spots
              </Button>
            </div>

            {/* Recommendations Grid/Map View */}
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations
                  .filter((rec) => activeFilters.length === 0 || activeFilters.includes(rec.category))
                  .map((recommendation) => (
                    <DetailedRecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      categoryIcon={getCategoryIcon(recommendation.category)}
                    />
                  ))}
              </div>
            

            {/* No Results */}
            {recommendations.filter((rec) => activeFilters.length === 0 || activeFilters.includes(rec.category))
              .length === 0 && (
              <div className="text-center py-12">
                <div className="bg-[#E7ECF0]/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No recommendations found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any recommendations matching your filters. Try adjusting your search criteria.
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
