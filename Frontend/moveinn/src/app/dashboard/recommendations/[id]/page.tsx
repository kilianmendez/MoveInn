"use client"
import { API_BASE_IMAGE_URL } from "@/utils/endpoints/config";
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { API_GET_RECOMMENDATION, API_GET_USER } from "@/utils/endpoints/config"
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
import { Recommendation, categories } from "@/types/recommendation"
import { getCookie } from "cookies-next"

type CategoryName = keyof typeof categories
const categoryByNumber: Record<number, CategoryName> = Object.entries(categories).reduce(
  (acc, [name, id]) => {
    acc[id as number] = name as CategoryName
    return acc
  },
  {} as Record<number, CategoryName>
)

const recommendationImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1484659619207-9e2b2b8c8b6f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327",
    "https://images.unsplash.com/photo-1484723050470-6e5883a298a8",
    "https://images.unsplash.com/photo-1498654896293-37a115421ceb"
  ];

  const getRandomRecommendationImage = () => {
    const randomIndex = Math.floor(Math.random() * recommendationImages.length);
    return recommendationImages[randomIndex];
  };

const GalleryImage = ({ src, alt }: { src: string, alt: string }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const handleImageError = () => {
    setImageSrc(getRandomRecommendationImage());
  };

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
        onError={handleImageError}
      />
    </div>
  );
};

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

const getCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case "restaurant":
      return "from-[#B7F8C8]/30 to-foreground"
    case "cafeteria":
      return "from-pink-100 dark:from-[#ffbfea]/50 to-foreground"
    case "museum":
      return "from-[#4C69DD]/20 to-foreground"
    case "leisurezone":
      return "from-amber-200 dark:from-[#723917]/50 to-foreground"
    case "park":
      return "from-green-100 dark:from-secondary-greenblue/30 to-foreground"
    case "historicalsite":
      return "from-yellow-100 dark:from-yellow-200/50 to-foreground"
    case "shopping":
      return "from-purple-100 dark:from-[#ccb1ef]/50 to-foreground"
    case "bar":
      return "from-[#0E1E40]/30 dark:from-[#0E1E40]/50 to-foreground"
    case "other":
      return "from-gray-200 dark:from-gray-400/20 to-foreground"
    default:
      return "from-gray-200 to-foreground"
  }
}


const getCategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "restaurant":
      return "bg-secondary text-green-900"
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

const getCategoryColorBorder = (category: string) => {
  switch (category.toLowerCase()) {
    case "restaurant":
      return "border-secondary"
    case "cafeteria":
      return "border-pink-200"
    case "museum":
      return "border-primary"
    case "leisurezone":
      return "border-amber-400"
    case "park":
      return "border-secondary-greenblue"
    case "historicalsite":
      return "border-yellow-200"
    case "shopping":
      return "border-purple-200"
    case "bar":
      return "border-[#0E1E40]"
    case "other":
      return "border-gray-200"
    default:
      return "border-gray-200"
  }
}


export default function RecommendationDetailPage() {
  const { id } = useParams()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [recommenderName, setRecommenderName] = useState<string>("")
  const [imageSrc, setImageSrc] = useState("");

  const handleImageError = () => {
    setImageSrc(getRandomRecommendationImage());
  };

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(API_GET_RECOMMENDATION(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data)
        setRecommendation(response.data)
        setImageSrc(response.data.recommendationImages?.[0]?.url ? `${API_BASE_IMAGE_URL}${response.data.recommendationImages[0].url}` : getRandomRecommendationImage());
      } catch (error) {
        console.error("Error fetching recommendation:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [id])

  useEffect(() => {
      const fetchUserName = async () => {
        if (recommendation?.userId && recommendation.userId !== "00000000-0000-0000-0000-000000000000") {
          try {
            const token = getCookie("token")
            const response = await axios.get(API_GET_USER(recommendation.userId), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            const userData = response.data
            setRecommenderName(userData.name)
          } catch (error) {
            console.error("Error fetching user name:", error)
            setRecommenderName("Unknown User")
          }
        } else {
          setRecommenderName("System")
        }
      }
  
      fetchUserName()
    }, [recommendation?.userId])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  )
  if (!recommendation) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Recommendation not found</p>
    </div>
  )

  const categoryName = categoryByNumber[recommendation.category]
  const categoryIcon = getCategoryIcon(recommendation.category)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/dashboard/recommendations">
            <Button variant="ghost" className="text-primary dark:text-text-secondary hover:bg-primary/10">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Recommendations
            </Button>
          </Link>
        </div>

        <div className="bg-foreground rounded-xl shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80">
            <Image
              src={imageSrc}
              alt={recommendation.title}
              fill
              className="object-cover"
              unoptimized
              onError={handleImageError}
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
              <div className="flex items-center text-white/90 bg-black/50 w-fit px-2 py-1 rounded-full">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{recommendation.address}</span>
              </div>
            </div>
          </div>

          <div className={`flex justify-between items-center p-4 border-b-3 ${getCategoryColorBorder(categoryName)} bg-gradient-to-br ${getCategoryGradient(categoryName)}`}>

            <div className="flex items-center">
              <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="font-medium text-amber-700">{recommendation.rating}</span>
              </div>
            </div>
            <div className="flex gap-2">
              
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center md:justify-start px-4">
              <TabsList className="grid grid-cols-2 w-full max-w-md bg-background h-fit rounded-lg m-4">
                <TabsTrigger
                  value="overview"
                  className="bg-background p-2 rounded-var(--radius-sm) text-text data-[state=active]:bg-foreground data-[state=active]:text-text"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="bg-background p-2 rounded-var(--radius-sm) text-text data-[state=active]:bg-foreground data-[state=active]:text-text"
                >
                  Photos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-secondary mb-2 text-xl bold">About</h2>
                  <p className="text-text whitespace-pre-line">{recommendation.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-secondary-greenblue border-none text-green-900 cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 py-1 px-3 rounded-lg w-fit">
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-[#4C69DD] mt-0.5 mr-2" />
                        <div>
                        <p className="text-gray-600 dark:text-gray-300 mb-1 text-xs">
                          Recomended by{" "}
                          <span className="font-semibold text-primary dark:text-text-secondary">
                            {recommendation.userId === "00000000-0000-0000-0000-000000000000" ? "system" : recommenderName}
                          </span>
                        </p>
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
                    <GalleryImage
                      key={index}
                      src={`${API_BASE_IMAGE_URL}${photo.url}`}
                      alt={`${recommendation.title} photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div>
      {/* <Card className="border-none shadow-sm bg-foreground">
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
                </Card> */}
      </div>
    </div>
  )
}
