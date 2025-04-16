import type { ReactNode } from "react"
import Image from "next/image"
import { MapPin, Star, Heart, ExternalLink, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Recommendation {
  id: number
  name: string
  category: string
  rating: number
  priceRange: string
  description: string
  address: string
  recommendedBy: string
  image: string
  tags: string[]
  isFavorite: boolean
}

interface DetailedRecommendationCardProps {
  recommendation: Recommendation
  categoryIcon: ReactNode
}

export function DetailedRecommendationCard({ recommendation, categoryIcon }: DetailedRecommendationCardProps) {
  // Generate a consistent color based on the category
  const getCategoryColor = () => {
    switch (recommendation.category.toLowerCase()) {
      case "restaurant":
        return "from-[#B7F8C8]/30 to-white"
      case "sightseeing":
        return "from-[#4C69DD]/20 to-white"
      case "outdoors":
        return "from-[#62C3BA]/30 to-white"
      case "viewpoint":
        return "from-amber-100 to-white"
      case "study":
        return "from-[#4C69DD]/10 to-white"
      case "nightlife":
        return "from-[#0E1E40]/20 to-white"
      default:
        return "from-gray-100 to-white"
    }
  }

  const getCategoryBadgeColor = () => {
    switch (recommendation.category.toLowerCase()) {
      case "restaurant":
        return "bg-[#B7F8C8] text-[#0E1E40]"
      case "sightseeing":
        return "bg-[#4C69DD] text-white"
      case "outdoors":
        return "bg-[#62C3BA] text-[#0E1E40]"
      case "viewpoint":
        return "bg-amber-400 text-amber-900"
      case "study":
        return "bg-[#4C69DD]/80 text-white"
      case "nightlife":
        return "bg-[#0E1E40] text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-foreground py-0   ">
      <div className="relative h-48 w-full">
        <Image
          src={recommendation.image || "/placeholder.svg"}
          alt={recommendation.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className={getCategoryBadgeColor()}>
            <span className="flex items-center">
              {categoryIcon}
              <span className="ml-1">{recommendation.category}</span>
            </span>
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${recommendation.isFavorite ? "bg-white/20 text-red-500" : "bg-white/20 text-white"}`}
          >
            <Heart className={`h-4 w-4 ${recommendation.isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-xs font-medium text-white">{recommendation.rating}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-white">{recommendation.priceRange}</span>
        </div>
      </div>

      <CardContent className={`p-4 bg-gradient-to-br ${getCategoryColor()}`}>
        <h3 className="font-semibold text-lg text-[#0E1E40] mb-1">{recommendation.name}</h3>

        <div className="flex items-start mb-3">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0 mr-1" />
          <p className="text-xs text-gray-600">{recommendation.address}</p>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{recommendation.description}</p>

        <div className="flex flex-wrap gap-1 mb-2">
          {recommendation.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5 border-gray-300 text-gray-600">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-gray-500">
          Recommended by <span className="font-medium text-[#4C69DD]">{recommendation.recommendedBy}</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 bg-gray-50 flex justify-between">
        <Button variant="outline" size="sm" className="text-[#4C69DD] border-[#4C69DD]/30 hover:bg-[#4C69DD]/10">
          <Share2 className="h-3.5 w-3.5 mr-1" />
          Share
        </Button>
        <Button size="sm" className="bg-[#4C69DD] hover:bg-[#4C69DD]/90">
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
