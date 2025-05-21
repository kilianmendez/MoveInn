"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, ChevronLeft, ChevronRight, Star, Wifi, Calendar, BedIcon, BathIcon, SquareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking/booking-form"
import { API_BASE_IMAGE_URL, API_GET_ACCOMMODATION, API_GET_USER } from "@/utils/endpoints/config"
import { AccommodationData,OwnerData } from "@/types/accommodation"


export default function AccommodationDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [accommodation, setAccommodation] = useState<AccommodationData | null>(null)
  const [owner, setOwner] = useState<OwnerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    const fetchAccommodationData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(API_GET_ACCOMMODATION(id))
        if (!response.ok) {
          throw new Error("Failed to fetch accommodation data")
        }
        const data = await response.json()
        setAccommodation(data)
        if (data.accommodationImages?.length > 0) {
          console.log("URL de imagen cargada:", `${API_BASE_IMAGE_URL}${data.accomodationImages?.[0]?.url}`)
        } else {
          console.log("No hay imágenes en accommodation.accomodationImages")
        }

        if (data.ownerId) {
          try {
            const ownerResponse = await fetch(API_GET_USER(data.ownerId))
            if (ownerResponse.ok) {
              const ownerData = await ownerResponse.json()
              setOwner(ownerData)
            }
          } catch (ownerError) {
            console.error("Error fetching owner:", ownerError)
            // Continue even if owner fetch fails
          }
        }
      } catch (error) {
        console.error("Error fetching accommodation:", error)
        setError("Failed to load accommodation details. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccommodationData()
  }, [id])

  const handlePrevImage = () => {
    if (accommodation?.accomodationImages?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? accommodation.accomodationImages.length - 1 : prevIndex - 1,
      )
    }
  }

  const handleNextImage = () => {
    if (accommodation?.accomodationImages?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === accommodation.accomodationImages.length - 1 ? 0 : prevIndex + 1,
      )
    }
  }

  const handleBookNow = () => {
    setIsBookingModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !accommodation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2 text-text">Error</h3>
          <p className="text-text-secondary mb-4">{error || "Accommodation not found"}</p>
          <Button onClick={() => router.push("/dashboard")} className="bg-primary text-foreground">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      {/* Header with title and rating */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-primary">{accommodation.title}</h1>
        <div className="flex items-center bg-accent-light px-2 py-1 rounded-md">
          <Star className="h-4 w-4 text-accent-dark mr-1 fill-accent-dark" />
          <span className="font-bold text-accent-dark">4.9</span>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center text-text-secondary mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{accommodation.address}</span>
      </div>

      <div className="relative rounded-lg overflow-hidden mb-6 h-72 bg-background">
        {accommodation.accomodationImages && accommodation.accomodationImages.length > 0 ? (
          <Image
            src={`${API_BASE_IMAGE_URL}${accommodation.accomodationImages[currentImageIndex]?.url}`}
            alt={accommodation.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No images available</span>
          </div>
        )}

        {/* Image navigation buttons */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-foreground rounded-full p-2 shadow-md hover:bg-background transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-text" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-foreground rounded-full p-2 shadow-md hover:bg-background transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-text" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-text mb-6">{accommodation.description}</p>

          <div className="bg-background rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 text-text">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {accommodation.hasWifi && (
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 text-primary mr-2" />
                  <span className="text-text-secondary">High-speed WiFi</span>
                </div>
              )}
              <div className="flex items-center">
                <BedIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-text-secondary">{accommodation.numberOfRooms} bedroom(s)</span>
              </div>
              <div className="flex items-center">
                <BathIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-text-secondary">{accommodation.bathrooms} bathroom(s)</span>
              </div>
              <div className="flex items-center">
                <SquareIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-text-secondary">{accommodation.squareMeters} m²</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-text">Availability</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-1">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span className="text-text-secondary text-sm">Available from</span>
                </div>
                <p className="text-text font-medium">{formatDate(accommodation.availableFrom)}</p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span className="text-text-secondary text-sm">Available to</span>
                </div>
                <p className="text-text font-medium">{formatDate(accommodation.availableTo)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-foreground rounded-lg shadow-lg p-6 border border-background sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-primary-dark">€{accommodation.pricePerMonth}</span>
                <span className="text-text-secondary ml-1">/month</span>
              </div>
            </div>
            {/* force deploy */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Security deposit</span>
                <span className="font-medium text-text">€{accommodation.pricePerMonth}</span>
              </div>
              <div className="pt-3 border-t border-background flex justify-between">
                <span className="font-semibold text-text">Total (first month)</span>
                <span className="font-bold text-primary-dark">
                  €{accommodation.pricePerMonth + accommodation.pricePerMonth}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-accent hover:bg-accent-dark text-foreground font-medium py-3"
              onClick={handleBookNow}
            >
              Book Now
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-text-secondary">
                Contact the owner for more information about this accommodation
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-background">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-background rounded-full overflow-hidden mr-3 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {owner?.avatarUrl ? owner.name.charAt(0) : "O"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-text">{owner?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {accommodation && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          accommodation={accommodation}
        />
      )}
    </div>
  )
}
