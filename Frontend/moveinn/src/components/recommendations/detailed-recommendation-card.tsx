import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, ExternalLink, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { API_BASE, API_BASE_URL } from "@/utils/endpoints/config"
import {DetailedRecommendationCardProps} from "@/types/recommendation"




const categoryByNumber: Record<number, string> = {
  0: "Restaurant",
  1: "Cafeteria",
  2: "Museum",
  3: "LeisureZone",
  4: "Park",
  5: "HistoricalSite",
  6: "Shopping",
  7: "Bar",
  8: "Other",
}

export function DetailedRecommendationCard({
  recommendation,
  categoryIcon,
}: DetailedRecommendationCardProps) {
  const categoryName = categoryByNumber[recommendation.category] || "Other"
  const categorySlug = categoryName.toLowerCase()

  const mainImage = recommendation.recommendationImages?.[0]?.url
    ? `/uploads/${recommendation.recommendationImages[0].url}`
    : "/placeholder.svg"

    const getCategoryColor = () => {
      switch (categorySlug) {
        case "restaurant":
          return "from-[#B7F8C8]/30 to-white"
        case "cafeteria":
          return "from-pink-100 to-white"
        case "museum":
          return "from-[#4C69DD]/20 to-white"
        case "leisurezone":
          return "from-amber-100 to-white"
        case "park":
          return "from-green-100 to-white"
        case "historicalsite":
          return "from-yellow-100 to-white"
        case "shopping":
          return "from-purple-100 to-white"
        case "bar":
          return "from-[#0E1E40]/20 to-white"
        case "other":
          return "from-gray-200 to-white"
        default:
          return "from-gray-200 to-white"
      }
    }
    

    const getCategoryBadgeColor = () => {
      switch (categorySlug) {
        case "restaurant":
          return "bg-secondary text-primary-dark"
        case "cafeteria":
          return "bg-pink-200 text-pink-900"
        case "museum":
          return "bg-primary text-white"
        case "leisurezone":
          return "bg-amber-400 text-amber-900"
        case "park":
          return "bg-secondary-greenblue text-green-900"
        case "historicalsite":
          return "bg-yellow-200 text-yellow-900"
        case "shopping":
          return "bg-purple-200 text-purple-900"
        case "bar":
          return "bg-[#0E1E40] text-white"
        case "other":
          return "bg-gray-300 text-gray-800"
        default:
          return "bg-gray-200 text-gray-700"
      }
    }

  return (
    <Card className="flex gap-0 flex-col justify-between py-0 h-full min-h-[460px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-foreground border-none">
      <div className="relative h-48 w-full">
        <Image
          src={`https://${API_BASE}/` + recommendation.recommendationImages[0].url}
          alt={recommendation.title}
          fill
          unoptimized // 👈 desactiva el loader de imágenes
          className="object-cover pb-0 mb-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className={getCategoryBadgeColor()}>
            <span className="flex items-center">
              {categoryIcon}
              <span className="ml-1">{categoryName}</span>
            </span>
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-xs font-medium text-white">{recommendation.rating}</span>
        </div>
      </div>

      <CardContent className={`p-0 pb-0 mt-0 bg-gradient-to-br ${getCategoryColor()}`}>
        <div className="px-4 py-2 my-0">
          <h3 className="font-semibold text-lg text-[#0E1E40] mb-1">{recommendation.title}</h3>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0 mr-1" />
            <p className="text-xs text-gray-600">{recommendation.address}</p>
          </div>
        </div>
      </CardContent>

      <CardContent className="pt-3 px-4 pb-4">
        <p className="text-sm text-text mb-3 line-clamp-3">{recommendation.description}</p>

        {recommendation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {recommendation.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5 border-gray-300 text-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-none flex justify-between">
        <Button variant="outline" size="sm" className="text-[#4C69DD] border-[#4C69DD]/30 hover:bg-[#4C69DD]/10">
          <Share2 className="h-3.5 w-3.5 mr-1" />
          Share
        </Button>
        <Link href={`/dashboard/recommendations/${recommendation.id}`}>
          <Button size="sm" className="text-white bg-[#4C69DD] hover:bg-[#4C69DD]/90">
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
