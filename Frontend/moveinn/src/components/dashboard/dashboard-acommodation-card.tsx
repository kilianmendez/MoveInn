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

interface DashboardAcommodationCardProps {
  acommodation: Acommodation
}

export function DashboardAcommodationCard({ acommodation }: DashboardAcommodationCardProps) {
  return (
    <Card className="bg-gradient-to-br from-white to-[#E7ECF0]/30 border-none shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden">
      {/* Imagen */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={acommodation.images?.[0] || "/placeholder.svg"}
          alt={acommodation.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenido */}
      <CardContent className="p-3 flex flex-col space-y-2">
        <h3 className="font-semibold text-[#0E1E40] text-md truncate">
          {acommodation.title}
        </h3>

        <div className="text-gray-600 text-xs flex items-center">
          <MapPin className="h-3 w-3 text-[#4C69DD] mr-1" />
          {acommodation.city}, {acommodation.country}
        </div>

        <div className="flex flex-wrap gap-1 text-xs">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            {acommodation.numberOfRooms} <BedIcon className="h-3 w-3 ml-1" />
          </Badge>
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            {acommodation.bathrooms} <BathIcon className="h-3 w-3 ml-1" />
          </Badge>
        </div>

        <div className="text-primary-dark font-bold text-sm">
          €{acommodation.pricePerMonth} <span className="text-gray-500 text-xs">/ month</span>
        </div>
      </CardContent>
    </Card>
  )
}
