"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AcommodationCard } from "@/components/housing/acommodation-card"
import axios from "axios"
import { API_ALL_ACOMMODATIONS, API_CREATE_ACCOMMODATION } from "@/utils/endpoints/config"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/context/authcontext"

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
  acommodationType: number
}

export default function AcommodationsPage() {

  const { user } = useAuth()

  const [acommodations, setAcommodations] = useState<Acommodation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAcommodation, setNewAcommodation] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    country: "",
    pricePerMonth: 0,
    numberOfRooms: 1,
    bathrooms: 1,
    squareMeters: 10,
    hasWifi: false,
    availableFrom: "",
    availableTo: "",
    acommodationType: 0,
    OwnerId: user?.id
  })
  const [isPosting, setIsPosting] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])


  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token")
      const ownerId = user?.id
      if (!ownerId) return toast.error("Missing user ID")
  
      const formData = new FormData()
      formData.append("Title", newAcommodation.title)
      formData.append("Description", newAcommodation.description)
      formData.append("Address", newAcommodation.address)
      formData.append("City", newAcommodation.city)
      formData.append("Country", newAcommodation.country)
      formData.append("PricePerMonth", String(Number(newAcommodation.pricePerMonth)))
formData.append("NumberOfRooms", String(parseInt(newAcommodation.numberOfRooms.toString())))
formData.append("Bathrooms", String(parseInt(newAcommodation.bathrooms.toString())))
formData.append("SquareMeters", String(parseInt(newAcommodation.squareMeters.toString())))
formData.append("AcommodationType", String(parseInt(newAcommodation.acommodationType.toString())))

formData.append("AvailableFrom", new Date(newAcommodation.availableFrom).toISOString())
formData.append("AvailableTo", new Date(newAcommodation.availableTo).toISOString())

      formData.append("OwnerId", ownerId)
      formData.append("AcommodationType", newAcommodation.acommodationType.toString())
  
      imageFiles.forEach((file) => {
        formData.append("AccomodationImages", file)
      })

      // Debug log
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }
  
      setIsPosting(true)
      await axios.post(API_CREATE_ACCOMMODATION, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
  
      toast.success("Accommodation created successfully")
      setShowCreateForm(false)
      setImageFiles([])
    } catch (err) {
      console.error("Error creating accommodation:", err)
      toast.error("Error creating accommodation")
    } finally {
      setIsPosting(false)
    }
  }
  

  useEffect(() => {
    const fetchAcommodations = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(API_ALL_ACOMMODATIONS, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAcommodations(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        console.error("Error fetching accommodations:", err)
        setAcommodations([])
      }
    }

    fetchAcommodations()
  }, [])

  // Generar países únicos
  const uniqueCountries = Array.from(new Set(acommodations.map((a) => a.country).filter(Boolean)))

  // Agrupar ciudades por país
  const citiesByCountry: Record<string, string[]> = {}
  acommodations.forEach((a) => {
    if (a.country && a.city) {
      if (!citiesByCountry[a.country]) {
        citiesByCountry[a.country] = []
      }
      if (!citiesByCountry[a.country].includes(a.city)) {
        citiesByCountry[a.country].push(a.city)
      }
    }
  })

  const currentCities = selectedCountry ? citiesByCountry[selectedCountry] || [] : []

  const filtered = acommodations.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCountry = selectedCountry ? a.country === selectedCountry : true
    const matchesCity = selectedCity ? a.city === selectedCity : true
    const matchesType = selectedType ? a.acommodationType === parseInt(selectedType) : true

    return matchesSearch && matchesCountry && matchesCity && matchesType
  })

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#0E1E40] via-[#4C69DD] to-[#62C3BA] dark:to-foreground rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Find Accommodations</h1>
              <p className="text-white/80">Choose your perfect place to stay</p>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for houses, flats, or rooms..."
                  className="pl-10 bg-white/10 border-white/20 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div
          className="flex items-center justify-between cursor-pointer rounded-lg px-4 py-3 mb-6 transition-colors duration-200 bg-gradient-to-r from-accent-light dark:from-accent/70 to-foreground hover:bg-accent/80 border border-dashed border-accent"
          onClick={() => setShowCreateForm(prev => !prev)}
        >
          <div className="flex items-center gap-2">
            {showCreateForm ? (
              <ChevronUp className="h-4 w-4 text-[#0E1E40]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#0E1E40]" />
            )}
            <span className="text-sm font-medium text-[#0E1E40]">
              {showCreateForm ? "Hide Accommodation Form" : "Create New Accommodation"}
            </span>
          </div>
        </div>

      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            key="createAccommodationForm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border border-primary rounded-xl shadow p-6 mb-8 bg-foreground">
              <h2 className="text-xl font-bold text-text mb-4">Create a New Accommodation</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Title", name: "title", value: newAcommodation.title },
                  { label: "Address", name: "address", value: newAcommodation.address },
                  { label: "City", name: "city", value: newAcommodation.city },
                  { label: "Country", name: "country", value: newAcommodation.country },
                  { label: "Price Per Month", name: "pricePerMonth", type: "number", value: newAcommodation.pricePerMonth },
                  { label: "Number of Rooms", name: "numberOfRooms", type: "number", value: newAcommodation.numberOfRooms },
                  { label: "Bathrooms", name: "bathrooms", type: "number", value: newAcommodation.bathrooms },
                  { label: "Square Meters", name: "squareMeters", type: "number", value: newAcommodation.squareMeters },
                  { label: "Available From", name: "availableFrom", type: "date", value: newAcommodation.availableFrom },
                  { label: "Available To", name: "availableTo", type: "date", value: newAcommodation.availableTo },
                ].map(({ label, name, value, type = "text" }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
                    <Input
                      type={type}
                      name={name}
                      value={value}
                      onChange={(e) => setNewAcommodation({ ...newAcommodation, [name]: type === "number" ? parseFloat(e.target.value) : e.target.value })}
                      className="text-primary-dark text-sm border border-[#4C69DD] focus:ring-2 focus:ring-[#4C69DD] focus:outline-none"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Accommodation Type</label>
                  <select
                    value={newAcommodation.acommodationType}
                    onChange={(e) => setNewAcommodation({ ...newAcommodation, acommodationType: parseInt(e.target.value) })}
                    className="w-full rounded-md border border-[#4C69DD] bg-foreground text-primary-dark text-sm p-2 focus:ring-2 focus:ring-[#4C69DD] focus:outline-none"
                  >
                    <option value={0}>Room</option>
                    <option value={1}>House</option>
                    <option value={2}>Apartment</option>
                    <option value={3}>Rural</option>
                    <option value={4}>Others</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={newAcommodation.hasWifi}
                    onChange={(e) => setNewAcommodation({ ...newAcommodation, hasWifi: e.target.checked })}
                  />
                  <label className="text-sm text-text-secondary">WiFi available</label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea
                  value={newAcommodation.description}
                  onChange={(e) => setNewAcommodation({ ...newAcommodation, description: e.target.value })}
                  rows={4}
                  placeholder="Describe the accommodation..."
                  className="w-full rounded-md border border-[#4C69DD] placeholder:text-gray-500 text-primary-dark text-sm p-3 focus:ring-2 focus:ring-[#4C69DD] focus:outline-none resize-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageFiles(Array.from(e.target.files))
                    }
                  }}
                  className="w-full rounded-md border border-[#4C69DD] text-primary-dark text-sm p-2 bg-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#4C69DD] file:text-white hover:file:bg-[#3b5ccd]"
                />

                {imageFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="w-full h-28 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <Button
                onClick={handleCreate}
                disabled={isPosting}
                className="bg-[#4C69DD] hover:bg-[#3b5ccd] text-white"
              >
                {isPosting ? "Posting..." : "Create Accommodation"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Country</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-background text-text"
              value={selectedCountry || "all"}
              onChange={(e) => {
                const val = e.target.value
                setSelectedCountry(val === "all" ? "" : val)
                setSelectedCity("")
              }}
            >
              <option value="all">All countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">City</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-background px-3 py-2 text-text"
              value={selectedCity || "all"}
              onChange={(e) => setSelectedCity(e.target.value === "all" ? "" : e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="all">All cities</option>
              {currentCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Accommodation Type</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-background px-3 py-2 text-text"
              value={selectedType || "all"}
              onChange={(e) => setSelectedType(e.target.value === "all" ? "" : e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="0">Room</option>
              <option value="1">House</option>
              <option value="2">Apartment</option>
              <option value="3">Rural</option>
              <option value="4">Others</option>
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((acommodation) => (
            <Link href={`/dashboard/housing/${acommodation.id}`} key={acommodation.id}>
              <AcommodationCard acommodation={acommodation} />
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
