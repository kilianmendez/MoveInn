"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  MessageCircle,
  MapPin,
  Globe,
  Home,
  Clock,
  Users,
  Heart,
  Flag,
  ThumbsUp,
  Send,
  Mail,
  Phone,
  Building,
  Calendar,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { API_BASE_IMAGE_URL } from "@/utils/endpoints/config"

interface LessorPublicProfileProps {
  user: any
}

export function LessorPublicProfile({ user }: LessorPublicProfileProps) {
  const [properties, setProperties] = useState<any[]>([])
  const [messageContent, setMessageContent] = useState("")
  const [activeTab, setActiveTab] = useState("information")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, fetch properties from API
        // const token = localStorage.getItem("token")
        // const response = await axios.get(`${API_BASE_URL}/Accommodations/owner/${user.id}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // setProperties(response.data)

        // Mock data for demonstration
        setProperties([
          {
            id: "1",
            title: "Modern Studio in City Center",
            location: "Eixample, Barcelona",
            price: 650,
            pricePerMonth: 650,
            type: "Studio",
            bedrooms: 0,
            bathrooms: 1,
            size: 45,
            amenities: ["Wi-Fi", "Air Conditioning", "Washing Machine", "Elevator"],
            rating: 4.8,
            reviewCount: 15,
            image: "/placeholder.svg?height=200&width=300",
            available: true,
          },
          {
            id: "2",
            title: "Cozy 2-Bedroom Apartment near University",
            location: "Gracia, Barcelona",
            price: 850,
            pricePerMonth: 850,
            type: "Apartment",
            bedrooms: 2,
            bathrooms: 1,
            size: 65,
            amenities: ["Wi-Fi", "Heating", "Balcony", "Fully Equipped Kitchen"],
            rating: 4.6,
            reviewCount: 23,
            image: "/placeholder.svg?height=200&width=300",
            available: true,
          },
          {
            id: "3",
            title: "Shared Room in Student Residence",
            location: "Sant Martí, Barcelona",
            price: 350,
            pricePerMonth: 350,
            type: "Shared Room",
            bedrooms: 1,
            bathrooms: 1,
            size: 20,
            amenities: ["Wi-Fi", "Shared Kitchen", "Laundry Facilities", "Study Room"],
            rating: 4.2,
            reviewCount: 31,
            image: "/placeholder.svg?height=200&width=300",
            available: false,
          },
        ])
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [user.id])

  // Enhance the user data with lessor-specific information
  const lessor = {
    ...user,
    rating: 4.7,
    reviewCount: 38,
    responseRate: 95,
    responseTime: "within 6 hours",
    isVerified: true,
    joinedDate: "March 2022",
    totalProperties: properties.length,
    activeListings: properties.filter((p) => p.available).length,
    languages: user.languages || ["Spanish", "English", "Catalan"],
    propertyTypes: ["Apartments", "Studios", "Shared Rooms"],
    acceptsStudents: true,
    acceptsShortTerm: true,
    paymentMethods: ["Bank Transfer", "Credit Card", "Cash"],
    cancellationPolicy: "Flexible - Full refund if cancelled 7 days before check-in",
  }

  // Sample reviews
  const reviews = [
    {
      id: "1",
      author: {
        name: "Emma Johnson",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "University of Amsterdam",
      },
      rating: 5,
      date: "March 2025",
      content:
        "I rented an apartment from this lessor for my semester abroad and had a wonderful experience. The apartment was exactly as described, clean, and in a great location. The lessor was very responsive and helpful throughout my stay. I highly recommend!",
    },
    {
      id: "2",
      author: {
        name: "Lucas Müller",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Humboldt University Berlin",
      },
      rating: 4,
      date: "January 2025",
      content:
        "Good experience overall. The apartment was nice and well-located. The only issue was a delay in fixing the washing machine, but it was eventually resolved. The lessor was generally responsive and accommodating.",
    },
    {
      id: "3",
      author: {
        name: "Sofia Rossi",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "University of Bologna",
      },
      rating: 5,
      date: "November 2024",
      content:
        "Perfect experience! The studio I rented was clean, modern, and had all the amenities I needed. The location was ideal for my studies, and the lessor was incredibly helpful with the move-in process and throughout my stay. Would definitely rent from them again!",
    },
  ]

  const handleMessageSubmit = () => {
    if (messageContent.trim()) {
      // In a real app, this would submit the message to the backend
      alert("Message sent: " + messageContent)
      setMessageContent("")
    }
  }

  const userAvatar = user.avatarUrl ? API_BASE_IMAGE_URL + user.avatarUrl : "/placeholder.svg?height=200&width=200"

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-sm">
          <Link href="/dashboard/housing" className="text-[#4C69DD] hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Housing
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{lessor.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Lessor Profile Header */}
            <Card className="border-none shadow-md mb-6 overflow-hidden bg-foreground py-0">
              <div className="bg-gradient-to-r from-[#4C69DD]/20 to-[#62C3BA]/20 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white">
                    <AvatarImage src={userAvatar || "/placeholder.svg"} alt={lessor.name} />
                    <AvatarFallback className="bg-[#4C69DD] text-white text-3xl">
                      {lessor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {lessor.isVerified && (
                    <Badge className="absolute top-0 right-0 bg-[#62C3BA] text-[#0E1E40]">
                      <Star className="h-3 w-3 mr-1 fill-[#0E1E40]" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-[#0E1E40] mb-1">{lessor.name}</h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                    <div className="flex items-center justify-center md:justify-start">
                      <MapPin className="h-4 w-4 text-[#4C69DD] mr-1" />
                      <span className="text-gray-700">{lessor.city || "Barcelona, Spain"}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Building className="h-4 w-4 text-[#4C69DD] mr-1" />
                      <span className="text-gray-700">{lessor.totalProperties} Properties</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    {(lessor.languages || ["Spanish", "English"]).map((language: string, index: number) => (
                      <Badge
                        key={language}
                        variant="outline"
                        className={`${
                          index === 0
                            ? "border-[#4C69DD] text-[#4C69DD]"
                            : index === 1
                              ? "border-[#62C3BA] text-[#62C3BA]"
                              : "border-[#0E1E40] text-[#0E1E40]"
                        }`}
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                      <span className="font-medium">{lessor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({lessor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-[#4C69DD] mr-1" />
                      <span>{lessor.activeListings} Active Listings</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="bg-[#4C69DD] hover:bg-[#4C69DD]/90">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Lessor
                  </Button>
                  <Button variant="outline" className="border-[#4C69DD] text-[#4C69DD]">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <Tabs defaultValue="information" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                    <TabsTrigger
                      value="information"
                      className={`
                        flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
                        ${
                          activeTab === "information"
                            ? "bg-white text-[#4C69DD] shadow-sm border border-gray-200"
                            : "text-[#4C69DD] hover:text-[#4C69DD] hover:bg-white/50"
                        }
                      `}
                    >
                      <User className="h-4 w-4" />
                      <span>Information</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="properties"
                      className={`
                        flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200
                        ${
                          activeTab === "properties"
                            ? "bg-white text-[#4C69DD] shadow-sm border border-gray-200"
                            : "text-[#4C69DD] hover:text-[#4C69DD] hover:bg-white/50"
                        }
                      `}
                    >
                      <Building className="h-4 w-4" />
                      <span>Properties</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="information">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#E7ECF0]/30 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Response Rate</div>
                        <div className="flex items-center">
                          <Progress value={lessor.responseRate} className="h-2 flex-1 mr-2" />
                          <span className="font-medium text-[#0E1E40]">{lessor.responseRate}%</span>
                        </div>
                      </div>
                      <div className="bg-[#E7ECF0]/30 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Response Time</div>
                        <div className="font-medium text-[#0E1E40]">{lessor.responseTime}</div>
                      </div>
                      <div className="bg-[#E7ECF0]/30 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Member Since</div>
                        <div className="font-medium text-[#0E1E40]">{lessor.joinedDate}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-[#0E1E40] mb-2">About</h2>
                      <p className="text-gray-700">
                        {lessor.biography ||
                          "Experienced property owner providing quality accommodation for students in Barcelona. I specialize in well-maintained, conveniently located properties that are perfect for Erasmus students and international visitors."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0E1E40] mb-2">Property Information</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-[#4C69DD]/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <Home className="h-3 w-3 text-[#4C69DD]" />
                            </div>
                            <span className="text-gray-700">Property Types: {lessor.propertyTypes.join(", ")}</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-[#4C69DD]/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <Users className="h-3 w-3 text-[#4C69DD]" />
                            </div>
                            <span className="text-gray-700">
                              Accepts Students: {lessor.acceptsStudents ? "Yes" : "No"}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-[#4C69DD]/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <Calendar className="h-3 w-3 text-[#4C69DD]" />
                            </div>
                            <span className="text-gray-700">
                              Accepts Short-Term: {lessor.acceptsShortTerm ? "Yes" : "No"}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-[#0E1E40] mb-2">Policies</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-[#62C3BA]/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <Clock className="h-3 w-3 text-[#62C3BA]" />
                            </div>
                            <div>
                              <span className="text-gray-700">Cancellation Policy:</span>
                              <p className="text-sm text-gray-600 mt-1">{lessor.cancellationPolicy}</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-[#62C3BA]/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                              <Globe className="h-3 w-3 text-[#62C3BA]" />
                            </div>
                            <span className="text-gray-700">Payment Methods: {lessor.paymentMethods.join(", ")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="properties">
                    <div className="space-y-6">
                      {properties.length > 0 ? (
                        properties.map((property) => (
                          <div
                            key={property.id}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 relative h-48 md:h-auto">
                                <Image
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                                {!property.available && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded">
                                      Not Available
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="p-4 md:p-6 flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-semibold text-[#0E1E40]">{property.title}</h3>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                                    <span className="font-medium">{property.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">({property.reviewCount})</span>
                                  </div>
                                </div>

                                <div className="flex items-center mt-2 text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1 text-[#4C69DD]" />
                                  <span>{property.location}</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-3">
                                  <div className="text-sm">
                                    <span className="text-gray-500">Type</span>
                                    <p className="font-medium">{property.type}</p>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-500">Size</span>
                                    <p className="font-medium">{property.size} m²</p>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-500">Rooms</span>
                                    <p className="font-medium">
                                      {property.bedrooms} BR, {property.bathrooms} BA
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <div className="text-sm text-gray-500 mb-1">Amenities</div>
                                  <div className="flex flex-wrap gap-1">
                                    {property.amenities.map((amenity: string) => (
                                      <Badge key={amenity} variant="outline" className="text-xs">
                                        {amenity}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                  <div>
                                    <span className="text-2xl font-bold text-[#4C69DD]">{property.price}€</span>
                                    <span className="text-gray-500 text-sm">/month</span>
                                  </div>

                                  <Button className="bg-[#4C69DD] hover:bg-[#4C69DD]/90" disabled={!property.available}>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No properties available at the moment</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-none shadow-md mb-6 bg-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-[#0E1E40]">Reviews</CardTitle>
                <CardDescription>What tenants say about {lessor.name}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                    <span className="font-medium text-lg">{lessor.rating}</span>
                    <span className="text-gray-500 ml-1">({lessor.reviewCount} reviews)</span>
                  </div>

                  <Button variant="outline" className="border-[#4C69DD] text-[#4C69DD]">
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.author.avatar || "/placeholder.svg"} alt={review.author.name} />
                            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[#0E1E40]">{review.author.name}</div>
                            <div className="text-sm text-gray-500">{review.author.university}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-[#FFBF00] fill-[#FFBF00] mr-1" />
                          <span className="font-medium">{review.rating}</span>
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                      <div className="flex items-center mt-3 space-x-4">
                        <Button variant="ghost" size="sm" className="h-8 text-gray-500">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-gray-500">
                          <Flag className="mr-1 h-3 w-3" />
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {lessor.reviewCount > reviews.length && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-[#4C69DD] text-[#4C69DD]">
                      See All {lessor.reviewCount} Reviews
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-none shadow-md bg-foreground py-0 rounded-var(--radius-md)">
              <CardHeader className="bg-gradient-to-r from-[#4C69DD] to-[#62C3BA] rounded-t-[10px] text-white p-4">
                <CardTitle className="text-lg">Contact {lessor.name}</CardTitle>
                <CardDescription className="text-white/80">Send a message about properties</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4 mb-4">
                  {lessor.mail && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-[#4C69DD] mr-2" />
                      <span className="text-sm">{lessor.mail}</span>
                    </div>
                  )}
                  {lessor.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-[#4C69DD] mr-2" />
                      <span className="text-sm">{lessor.phone}</span>
                    </div>
                  )}
                </div>

                <Textarea
                  placeholder={`Hi ${lessor.name}, I'm interested in your properties for my upcoming stay in Barcelona...`}
                  className="min-h-32 mb-4"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />

                <Button
                  className="w-full bg-[#4C69DD] hover:bg-[#4C69DD]/90"
                  onClick={handleMessageSubmit}
                  disabled={!messageContent.trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 text-center">
                Typically responds {lessor.responseTime}
              </CardFooter>
            </Card>

            {/* Lessor Details */}
            <Card className="border-none shadow-md bg-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#0E1E40]">Lessor Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Properties</div>
                    <div className="font-medium text-[#0E1E40]">
                      {lessor.totalProperties} total ({lessor.activeListings} active)
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="font-medium text-[#0E1E40]">{lessor.city || "Barcelona, Spain"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Languages</div>
                    <div className="flex flex-wrap gap-1">
                      {(lessor.languages || ["Spanish", "English"]).map((language: string, index: number) => (
                        <Badge
                          key={language}
                          variant="outline"
                          className={`text-xs ${
                            index === 0
                              ? "border-[#4C69DD] text-[#4C69DD]"
                              : index === 1
                                ? "border-[#62C3BA] text-[#62C3BA]"
                                : "border-[#0E1E40] text-[#0E1E40]"
                          }`}
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Member Since</div>
                    <div className="font-medium text-[#0E1E40]">{lessor.joinedDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card className="border-none shadow-md bg-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#0E1E40]">Verification</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#62C3BA]/20 flex items-center justify-center mr-3">
                      <Star className="h-5 w-5 text-[#62C3BA]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#0E1E40]">Identity Verified</div>
                      <div className="text-sm text-gray-600">Government ID verified</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#4C69DD]/20 flex items-center justify-center mr-3">
                      <Home className="h-5 w-5 text-[#4C69DD]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#0E1E40]">Property Owner</div>
                      <div className="text-sm text-gray-600">Ownership documents verified</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FFBF00]/20 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-[#FFBF00]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#0E1E40]">Student-Friendly</div>
                      <div className="text-sm text-gray-600">Specializes in student housing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report */}
            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
                <Flag className="h-3 w-3 mr-1" />
                Report this lessor
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
