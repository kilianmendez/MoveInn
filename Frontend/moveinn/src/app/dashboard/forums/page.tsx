"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Search,
  MapPin,
  PlusCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Flag from 'react-world-flags'
import axios from "axios"
import { API_ALL_FORUMS, API_BASE_IMAGE_URL } from "@/utils/endpoints/config"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const categoryLabels: Record<number, string> = {
  0: "Procedures & Docs",
  1: "University Life",
  2: "Cultural & Social",
  3: "Scholarships",
  4: "Transport",
  5: "Tourism & Nightlife",
  6: "Events",
  7: "Tips",
  8: "FAQ",
  9: "Other"
}

const forumCategoryColors: Record<number, string> = {
  0: "from-green-100 to-white",
  1: "from-blue-100 to-white",
  2: "from-pink-100 to-white",
  3: "from-yellow-100 to-white",
  4: "from-purple-100 to-white",
  5: "from-rose-100 to-white",
  6: "from-orange-100 to-white",
  7: "from-teal-100 to-white",
  8: "from-gray-200 to-white",
  9: "from-gray-100 to-white",
}

const forumCategoryBadgeColors: Record<number, string> = {
  0: "bg-primary text-white",                  // Procedures & Docs
  1: "bg-yellow-200 text-yellow-900",          // University Life
  2: "bg-pink-200 text-pink-900",              // Cultural & Social
  3: "bg-purple-200 text-purple-900",          // Scholarships
  4: "bg-secondary-greenblue text-green-900",  // Transport
  5: "bg-amber-400 text-amber-900",            // Tourism & Nightlife
  6: "bg-[#0E1E40] text-white",                // Events
  7: "bg-secondary text-primary-dark",         // Tips
  8: "bg-gray-300 text-gray-800",              // FAQ
  9: "bg-gray-200 text-gray-700",              // Other
}


const countries = [
  { name: "Spain", code: "ES" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Italy", code: "IT" },
  { name: "Portugal", code: "PT" },
  { name: "Czech", code: "CZ" },
  { name: "Netherlands", code: "NL" },
]

export interface Forum {
  id: string
  title: string
  description: string
  country: string
  category: number
  createdAt: string
  creatorId: string
  creatorName: string
  creatorAvatar: string
}

export default function ForumsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [forums, setForums] = useState<Forum[]>([])

  const getForums = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(API_ALL_FORUMS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Forums: ", response.data)
      setForums(Array.isArray(response.data) ? response.data : [])
    } catch {
      setForums([])
    }
  }

  useEffect(() => { getForums() }, [])

  const filteredForums = forums.filter(forum => {
    const matchCountry = activeFilter ? forum.country.toLowerCase() === activeFilter.toLowerCase() : true
    const matchCategory = activeCategory !== null ? forum.category === activeCategory : true
    return matchCountry && matchCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30">
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Community Forums</h1>
                  <p className="text-white/80">Connect with fellow Erasmus students, ask questions, and share your experiences.</p>
                </div>
                <Button className="bg-[#FFBF00] text-[#0E1E40] hover:bg-[#FFBF00]/90 mt-4 md:mt-0">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Topic
                </Button>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search forums..."
                  className="pl-10 bg-white/10 text-white placeholder:text-white/60 border-white/20 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="space-y-6 order-2 xl:order-1 xl:col-span-1">
            <Card className="border-none shadow-md bg-foreground">
              <CardContent className="p-4">
                <h2 className="font-semibold text-[#0E1E40] mb-3">Countries</h2>
                <div className="space-y-2">
                  {countries.map((country) => (
                    <Button
                      key={country.name}
                      variant="outline"
                      className={`w-full justify-between h-auto py-2 text-primary-dark ${activeFilter === country.name ? "bg-[#4C69DD] text-white" : ""}`}
                      onClick={() => setActiveFilter(activeFilter === country.name ? null : country.name)}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="mr-2">{country.name}</span>
                        <Flag code={country.code} style={{ width: 24, height: 16 }} />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-foreground">
              <CardContent className="p-4">
                <h2 className="font-semibold text-[#0E1E40] mb-3">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryLabels).map(([id, label]) => (
                    <Badge
                      key={id}
                      onClick={() => setActiveCategory(activeCategory === Number(id) ? null : Number(id))}
                      className={`cursor-pointer px-3 py-1 rounded-md text-xs font-medium ${forumCategoryBadgeColors[Number(id)]} ${activeCategory === Number(id) ? "ring-2 ring-offset-2 ring-[#0E1E40]" : ""}`}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 xl:order-2 xl:col-span-3">
            {(activeFilter || activeCategory !== null) && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                {activeFilter && (
                  <Badge className="bg-[#4C69DD]/10 text-[#4C69DD] hover:bg-[#4C69DD]/20 px-3 py-1" onClick={() => setActiveFilter(null)}>
                    {activeFilter}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {activeCategory !== null && (
                  <Badge className="bg-[#4C69DD]/10 text-[#4C69DD] hover:bg-[#4C69DD]/20 px-3 py-1" onClick={() => setActiveCategory(null)}>
                    {categoryLabels[activeCategory]}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 w-full">
              {filteredForums.map((forum) => (
                <Link href={`/dashboard/forums/${forum.id}`} key={forum.id}>
                  <Card className={`flex flex-col justify-between border-none shadow-md transition-all hover:shadow-lg rounded-md bg-gradient-to-br ${forumCategoryColors[forum.category]} min-h-[280px] lg:min-h-[320px]`}>
                    <CardContent className="p-6 py-0 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <Badge className={`mb-2 w-fit text-xs font-medium px-2 py-1 rounded-md ${forumCategoryBadgeColors[forum.category]}`}>
                          {categoryLabels[forum.category]}
                        </Badge>
                        <h3 className="font-bold text-[#0E1E40] text-lg mb-2">{forum.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 justify-between mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#4C69DD]" />
                            {forum.country}
                          </span>
                          <span>{new Date(forum.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3 lg:line-clamp-5 mb-4">{forum.description}</p>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 bg-[#4C69DD]/10 rounded-full px-3 py-2 w-fit">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`${API_BASE_IMAGE_URL}${forum.creatorAvatar}`} />
                            <AvatarFallback>{forum.creatorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-[#0E1E40]">{forum.creatorName}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredForums.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No forums found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
                <Button onClick={() => { setActiveFilter(null); setActiveCategory(null); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
