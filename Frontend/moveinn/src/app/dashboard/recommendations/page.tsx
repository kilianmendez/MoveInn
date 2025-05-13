"use client"

import { useEffect, useState } from "react"
import {
  Search,
  MapPin,
  Coffee,
  Utensils,
  Landmark,
  Music,
  GraduationCap,
  Bike,
  Map,
  Grid3X3,
  Plus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { API_SEARCH_RECOMMENDATION } from "@/utils/endpoints/config"
import { DetailedRecommendationCard } from "@/components/recommendations/detailed-recommendation-card"
import { Recommendation, categories } from "@/types/recommendation"

type CategoryName = keyof typeof categories
type CategoryId = (typeof categories)[CategoryName]

const categoryByNumber: Record<CategoryId, CategoryName> = Object.entries(categories).reduce(
  (acc, [name, id]) => {
    acc[id as CategoryId] = name as CategoryName
    return acc
  },
  {} as Record<CategoryId, CategoryName>
)

const getCategoryName = (categoryId: number): string => {
  return categoryByNumber[categoryId as CategoryId] || "Other"
}

const getCategoryIcon = (categoryId: number) => {
  const category = categoryByNumber[categoryId as CategoryId]?.toLowerCase() || ""

  switch (category) {
    case "restaurant":
      return <Utensils className="h-4 w-4" />
    case "cafeteria":
      return <Coffee className="h-4 w-4" />
    case "museum":
      return <Landmark className="h-4 w-4" />
    case "leisurezone":
      return <Music className="h-4 w-4" />
    case "park":
      return <Bike className="h-4 w-4" />
    case "historicalsite":
      return <GraduationCap className="h-4 w-4" />
    case "shopping":
      return <Grid3X3 className="h-4 w-4" />
    case "bar":
      return <Coffee className="h-4 w-4" />
    default:
      return <Map className="h-4 w-4" />
  }
}

export default function RecommendationsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  const clearFilters = () => setActiveFilters([])

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("accessToken") 
  
      const body = {
        query: "",
        sortField: "",
        sortOrder: "",
        country: "Spain",
        city: "",
        page: 1,
        limit: 10,
      }
  
      const response = await axios.post(API_SEARCH_RECOMMENDATION, body, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 add Authorization header
        },
      })
  
      const data = response.data.items
      console.log("Recomendaciones encontradas:", data)
  
      if (Array.isArray(data)) {
        setRecommendations(data)
      } else if (Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations)
      } else {
        setRecommendations([])
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      setRecommendations([])
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const filtered = recommendations.filter(
    (rec) => activeFilters.length === 0 || activeFilters.includes(getCategoryName(rec.category))
  )

  return (
    <div className="min-h-screen px-4 py-6 container mx-auto">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 text-white relative">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Local Recommendations</h1>
                <p className="text-white/80">Discover great places recommended by students and hosts</p>
              </div>
              <Button className="bg-[#B7F8C8] text-[#0E1E40] hover:bg-[#B7F8C8]/90 mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Recommendation
              </Button>
            </div>
            <div className="relative flex">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search places..."
                className="pl-10 bg-white/10 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtros activos */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              className="bg-[#4C69DD]/10 text-[#4C69DD] px-3 py-1 cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(categories).map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            className={`rounded-full ${
              activeFilters.includes(cat) ? "bg-foreground text-text" : "text-white bg-primary"
            }`}
            onClick={() => toggleFilter(cat)}
          >
            {getCategoryIcon(categories[cat as CategoryName])}
            <span className="ml-1">{cat}</span>
          </Button>
        ))}
      </div>

      {/* Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rec) => (
            <DetailedRecommendationCard
            key={rec.id}
            recommendation={rec} // NO sobrescribas nada
            categoryIcon={getCategoryIcon(rec.category)}
            />
        ))}
        </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-[#E7ECF0]/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No recommendations found</h3>
          <p className="text-gray-500 mb-6">Try changing your filters or search terms.</p>
          <Button onClick={clearFilters}>Clear all filters</Button>
        </div>
      )}
    </div>
  )
}
