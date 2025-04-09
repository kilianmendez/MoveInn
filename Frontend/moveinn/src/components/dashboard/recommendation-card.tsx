import { MapPinIcon, StarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RecommendationCardProps {
    name: string
    category: string
    rating: number
    priceRange: string
    description: string
    recommendedBy: string
}

export function RecommendationCard({
    name,
    category,
    rating,
    priceRange,
    description,
    recommendedBy,
}: RecommendationCardProps) {
  // Generate a consistent color based on the category
    const getCategoryColor = () => {
        switch (category.toLowerCase()) {
        case "restaurant":
            return "from-[#B7F8C8]/30 to-white"
        case "sightseeing":
            return "from-[#4C69DD]/20 to-white"
        case "outdoors":
            return "from-[#62C3BA]/30 to-white"
        case "viewpoint":
            return "from-amber-100 to-white"
        default:
            return "from-gray-100 to-white"
        }
    }

    const getCategoryBadgeColor = () => {
        switch (category.toLowerCase()) {
        case "restaurant":
            return "bg-[#B7F8C8] text-[#0E1E40]"
        case "sightseeing":
            return "bg-[#4C69DD] text-white"
        case "outdoors":
            return "bg-[#62C3BA] text-[#0E1E40]"
        case "viewpoint":
            return "bg-amber-400 text-amber-900"
        default:
            return "bg-gray-200 text-gray-700"
        }
    }

    return (
        <div
        className={`p-4 rounded-lg border border-gray-100 hover:border-gray-200 bg-gradient-to-br ${getCategoryColor()} transition-all hover:shadow-md`}
        >
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-[#0E1E40]">{name}</h3>
            <div className="flex items-center bg-amber-100 px-2 py-0.5 rounded-full">
            <StarIcon className="h-3.5 w-3.5 text-amber-500 mr-1" />
            <span className="text-sm font-medium text-amber-700">{rating}</span>
            </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
            <Badge className={getCategoryBadgeColor()}>{category}</Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-300">
            {priceRange}
            </Badge>
        </div>

        <p className="text-sm text-gray-600 mb-3">{description}</p>

        <div className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-full w-fit">
            <MapPinIcon className="h-3 w-3 mr-1 text-[#4C69DD]" />
            <span className="text-[#0E1E40]">Recommended by {recommendedBy}</span>
        </div>
        </div>
    )
}
