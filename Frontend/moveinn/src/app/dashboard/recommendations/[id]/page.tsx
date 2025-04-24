"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { API_GET_RECOMMENDATION } from "@/utils/endpoints/config"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Star,
  Share2,
  ChevronLeft,
  Utensils,
  Coffee,
  Landmark,
  Music,
  Bike,
  GraduationCap,
  Grid3X3,
  Map,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Recommendation {
  id: string
  title: string
  description: string
  address: string
  city: string
  country: string
  createdAt: string
  rating: number
  category: number
  tags: string[]
  userId: string
  recommendationImages: {
    id: string
    url: string
    createdAt: string
    userId: string | null
    user: any | null
    recommendationId: string
  }[]
}

const categories = {
  Restaurant: 0,
  Cafeteria: 1,
  Museum: 2,
  LeisureZone: 3,
  Park: 4,
  HistoricalSite: 5,
  Shopping: 6,
  Bar: 7,
  Other: 8,
} as const

type CategoryName = keyof typeof categories
const categoryByNumber: Record<number, CategoryName> = Object.entries(categories).reduce(
  (acc, [name, id]) => {
    acc[id as number] = name as CategoryName
    return acc
  },
  {} as Record<number, CategoryName>
)

const getCategoryIcon = (categoryId: number) => {
  const category = categoryByNumber[categoryId]?.toLowerCase() || ""
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

const getCategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
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


export default function RecommendationDetailPage() {
  const { id } = useParams()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(API_GET_RECOMMENDATION(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRecommendation(response.data)
      } catch (error) {
        console.error("Error fetching recommendation:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [id])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!recommendation) return <div className="p-8 text-center">Recommendation not found</div>

  const categoryName = categoryByNumber[recommendation.category]
  const categoryIcon = getCategoryIcon(recommendation.category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/dashboard/recommendations">
            <Button variant="ghost" className="text-[#4C69DD] hover:bg-[#4C69DD]/10">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Recommendations
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80">
            <Image
              src={recommendation.recommendationImages?.[0]?.url
                ? `https://localhost:7023/${recommendation.recommendationImages[0].url}`
                : "/placeholder.svg"}
              alt={recommendation.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getCategoryBadgeColor(categoryName)}>
                  <span className="flex items-center">
                    {categoryIcon}
                    <span className="ml-1">{categoryName}</span>
                  </span>
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{recommendation.title}</h1>
              <div className="flex items-center text-white/90">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{recommendation.address}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="font-medium text-amber-700">{recommendation.rating}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-gray-500 border-gray-200 hover:bg-primary hover:text-white">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="px-4">
              <TabsList className="grid grid-cols-2 w-full max-w-md bg-background h-fit rounded-[5px] m-4">
              <TabsTrigger value="overview" className="bg-background p-2 rounded-var(--radius-sm) text-text data-[state=active]:bg-white data-[state=active]:text-primary-dark">
                Overview
              </TabsTrigger>
                <TabsTrigger
                value="photos"
                className="bg-background p-2 rounded-var(--radius-sm) text-text data-[state=active]:bg-white data-[state=active]:text-primary-dark">
                Photos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary-dark mb-2 text-xl bold">About</h2>
                  <p className="text-gray-700 whitespace-pre-line">{recommendation.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-[#4C69DD] mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Address</p>
                          <p className="text-sm text-gray-600">{recommendation.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-dark mb-2 text-xl bold">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recommendation.recommendationImages.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={`https://localhost:7023/${photo.url}`}
                        alt={`${recommendation.title} photo ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div>
      <div></div>
      <Card className="border-none shadow-sm bg-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                    <CardTitle className="text-xl text-[#0E1E40]">Contact Recommender</CardTitle>
                    <CardDescription>Events you&apos;ve joined or might be interested in</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                        <AvatarImage src={recommendation.recommendationImages?.[0]?.user?.image || ""} />
                        <AvatarFallback>
                            {recommendation.recommendationImages?.[0]?.user?.name?.charAt(0)}
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="text-sm font-medium text-[#0E1E40]">
                            {recommendation.recommendationImages?.[0]?.user?.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {recommendation.recommendationImages?.[0]?.user?.university || "Unknown University"}
                        </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                    <Button className="w-full bg-[#4C69DD] hover:bg-[#4C69DD]/90">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Host
                    </Button>
                </CardFooter>
                </Card>
      </div>
    </div>
  )
}
