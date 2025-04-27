"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authcontext"
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Calendar, Home, CreditCard } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { API_BASE_URL, API_CREATE_RESERVATION } from "@/utils/endpoints/config"
import axios from "axios"
import { BookingModalProps } from "@/types/accommodation"



export function BookingModal({ isOpen, onClose, accommodation }: BookingModalProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])

  const minDate = new Date(accommodation.availableFrom)
  const maxDate = new Date(accommodation.availableTo)

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/Accommodations/UnavailableDates/${accommodation.id}`)
        if (!res.ok) throw new Error("No se pudieron cargar las fechas no disponibles")
        const data = await res.json()
        const parsed = data.map((dateStr: string) => new Date(dateStr))
        setUnavailableDates(parsed)
      } catch (err) {
        console.error("Error fetching unavailable dates:", err)
      }
    }
    fetchUnavailableDates()
  }, [accommodation.id])

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0
    const months = Math.max(
      1,
      endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear()),
    )
    return accommodation.pricePerMonth * months + accommodation.pricePerMonth
  }

  const totalDue = calculateTotal()

  const handleCreateReservation = async () => {
    if (!user || !startDate || !endDate) {
      setError("Por favor, inicia sesión y selecciona las fechas de entrada y salida")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await axios.post(
        API_CREATE_RESERVATION,
        {
          userId: user.id,
          accommodationId: accommodation.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          status: "Pending",
          totalPrice: totalDue,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Error al crear la reserva")
      }

      const data = response.data
      router.push(`/reservations/${data.id}`)
    } catch (error) {
      console.error("Error creating reservation:", error)
      setError("No se pudo crear la reserva. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-foreground">
          <DialogTitle className="text-xl text-white font-bold text-center">Reservar Alojamiento</DialogTitle>
          <p className="text-center text-sm mt-1 text-foreground/80">Selecciona las fechas para tu estancia</p>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-6">
            <Home className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <h3 className="font-medium text-text">{accommodation.title}</h3>
          </div>

          <div className="space-y-5 mb-6">
            {/* Fecha de entrada con mejor estilo */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-primary" />
                Fecha de entrada
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={minDate}
                  maxDate={maxDate}
                  excludeDates={unavailableDates}
                  placeholderText="Selecciona fecha de entrada"
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text"
                />
              </div>
            </div>

            {/* Fecha de salida con mejor estilo */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-primary" />
                Fecha de salida
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate || minDate}
                  maxDate={maxDate}
                  excludeDates={unavailableDates}
                  placeholderText="Selecciona fecha de salida"
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text"
                />
              </div>
            </div>
          </div>

          {/* Resumen de precios mejorado */}
          <div className="bg-background rounded-xl p-5 mb-5 border border-background shadow-sm">
            <h4 className="font-medium mb-4 text-text flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Resumen de precios
            </h4>

            {startDate && endDate ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Alquiler</span>
                  <span className="font-medium text-text">€{accommodation.pricePerMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Depósito de seguridad</span>
                  <span className="font-medium text-text">€{accommodation.pricePerMonth}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-semibold text-text">Total a pagar</span>
                  <span className="font-bold text-xl text-primary-dark">€{totalDue}</span>
                </div>
              </div>
            ) : (
              <p className="text-text-secondary text-sm italic">Selecciona las fechas para ver el precio total</p>
            )}
          </div>

          {/* Mensaje de error mejorado */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-negative-red p-4 rounded-lg mb-5 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">No se pudo completar la reserva</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones mejorados */}
        <DialogFooter className="bg-gray-50 p-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-300 text-text-secondary hover:bg-gray-100 hover:text-text sm:flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateReservation}
              disabled={isSubmitting || !startDate || !endDate}
              className="bg-accent hover:bg-accent-dark text-foreground sm:flex-1"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-foreground border-t-transparent rounded-full"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Reserva
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
