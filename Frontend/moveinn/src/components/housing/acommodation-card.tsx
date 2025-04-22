import type { ReactNode } from "react"
import Image from "next/image"
import { MapPin, BedIcon, BathIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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
}

interface AcommodationCard {
  acommodation: Acommodation
}

export function AcommodationCard({ acommodation }: AcommodationCard) {
  return (
    <Card className="bg-foreground border-none shadow-md hover:shadow-lg transition-all h-full flex flex-col rounded-md py-0">
      <div className="relative h-48 overflow-hidden rounded-t-md">
        <img
          src={acommodation.images?.[0] || "/placeholder.svg"}
          alt={acommodation.title}
          className="object-cover w-full h-full bg-gray-500"
        />
      </div>

      {/* Contenido */}
      <CardContent className="p-4 flex flex-col flex-1 pt-0">
        {/* Título */}
        <h3 className="font-semibold text-[#0E1E40] text-lg mb-1">
          {acommodation.title}
        </h3>

        {/* Ubicación */}
        <div className="text-gray-600 text-sm mb-2 flex items-center">
          <MapPin className="h-3 w-3 text-[#4C69DD] mr-1" />
          {acommodation.city}, {acommodation.country}
        </div>

        {/* Descripción truncada */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-3">
          {acommodation.description}
        </p>

        {/* Info adicional + precio */}
        <div className="mt-auto">
          <div className="flex gap-2 mb-4">
            <Badge>
              {acommodation.numberOfRooms}
              <BedIcon className="ml-1 h-4 w-4" />
            </Badge>
            <Badge>
              {acommodation.bathrooms}
              <BathIcon className="ml-1 h-4 w-4" />
            </Badge>
            <Badge>
              {acommodation.squareMeters} m²
            </Badge>
          </div>

          <div className="text-xl font-bold text-primary-dark">
            €{acommodation.pricePerMonth}
            <span className="text-sm font-medium text-gray-500"> / month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
