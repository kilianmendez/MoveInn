"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/authcontext"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield,
  Calendar,
  Home,
  User,
  CreditCardIcon as CardIcon,
} from "lucide-react"
import Image from "next/image"
import { API_GET_ACCOMMODATION, API_CREATE_PAYMENT, API_UPDATE_RESERVATION, API_GET_RESERVATION } from "@/utils/endpoints/config"
import axios from "axios"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface AccommodationData {
  id: string
  title: string
  description: string
  address: string
  city: string
  country: string
  pricePerMonth: number
  numberOfRooms: number
  bathrooms: number
  squareMeters: number
  hasWifi: boolean
  availableFrom: string
  availableTo: string
  ownerId: string
  accommodationImages: {
    id: string
    url: string
    createdAt: string
    accommodationId: string
  }[]
}
interface ReservationData {
  id: string
  userId: string
  accommodationId: string
  startDate: string
  endDate: string
  status: number 
}
// Main wrapper component
export function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  )
}

// Actual form content with Stripe hooks
function PaymentFormContent() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isLoading, isAuthenticated, token } = useAuth()
  const [accommodation, setAccommodation] = useState<AccommodationData | null>(null)
  const [reservation, setReservation] = useState<ReservationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Check authentication first
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    // Only fetch data if authenticated
    if (isAuthenticated) {
      fetchReservation()
    }
  }, [id, isLoading, isAuthenticated, router])

useEffect(() => {
  if (reservation?.accommodationId) {
    fetchAccommodationData();
  }
}, [reservation]); // Dependencia en reservation
  const fetchReservation = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_GET_RESERVATION(id),{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status !== 200) {
        throw new Error("Failed to fetch accommodation data")
      }
      const reservationData = response.data
      setReservation(reservationData)
    } catch (error) {
      console.error("Failed to fetch accommodation:", error)
      setError("Failed to load accommodation details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  const fetchAccommodationData = async () => {
    if (!reservation?.accommodationId) {
      console.error("Accommodation ID is undefined. Cannot fetch accommodation data.");
      setError("Accommodation details are missing. Please try again later.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.get(API_GET_ACCOMMODATION(reservation.accommodationId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch accommodation data");
      }
      const accommodationData = response.data;
      setAccommodation(accommodationData);
    } catch (error) {
      console.error("Failed to fetch accommodation:", error);
      setError("Failed to load accommodation details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !accommodation) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }

    setProcessing(true)
    setCardError(null)
    setPaymentError(null)

    try {
      // 1. Create payment intent on your server
      const createPaymentResponse = await fetch(API_CREATE_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: accommodation.pricePerMonth * 2 + 75, // Monthly rent + deposit + fee
          currency: "eur",
          reservationId: id,
          accommodationId: accommodation.id,
          userId: user?.id,
        }),
      })

      if (!createPaymentResponse.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret } = await createPaymentResponse.json()

      // 2. Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name || "Guest",
            email: user?.email,
          },
        },
      })

      if (stripeError) {
        setCardError(stripeError.message || "An error occurred with your payment")
        return
      }

      if (paymentIntent.status === "succeeded") {
        try {
          const updateResponse = await axios.put(
            API_UPDATE_RESERVATION(id),
            { Status: 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (updateResponse.status !== 200) {
            console.error("Payment successful but failed to update reservation status")
            setPaymentSuccess(true)

            // Redirect to success page after 2 seconds
            setTimeout(() => {
              router.push(`/reservations/${id}`)
            }, 4000)
            return
          }

          // Everything succeeded
          setPaymentSuccess(true)

          // Redirect to success page after 2 seconds
          setTimeout(() => {
            router.push(`/reservations/${id}`)
          }, 2000)
        } catch (updateError) {
          console.error("Error updating reservation:", updateError)
          // Payment succeeded but status update failed
          // We'll still show success but log the error
          setPaymentSuccess(true)

          // Redirect to success page after 2 seconds
          setTimeout(() => {
            router.push(`/reservations/${id}`)
          }, 2000)
        }
      } else {
        setPaymentError("Payment was not completed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError("An error occurred during payment processing. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading payment details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/reservations/${id}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Reservation
          </button>
        </div>
      </div>
    )
  }

  if (!accommodation) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Accommodation not found</h3>
          <p className="text-gray-600 mb-6">
            The accommodation you're looking for doesn't exist or you don't have access to it.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold mb-3 text-gray-800">Payment Successful!</h3>
          <p className="text-gray-600 mb-6 text-lg">
            Your payment has been processed and your reservation is now confirmed.
          </p>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount paid:</span>
              <span className="font-bold">{accommodation.pricePerMonth * 2 + 75}€</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Accommodation:</span>
              <span className="font-semibold">{accommodation.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reservation ID:</span>
              <span className="font-mono text-xs">{id}</span>
            </div>
          </div>
          <div className="animate-pulse">
            <p className="text-sm text-gray-500">Redirecting to your reservation details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Calculate total
  const monthlyRent = accommodation.pricePerMonth
  const securityDeposit = accommodation.pricePerMonth
  const total = monthlyRent + securityDeposit

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => router.push(`/reservations/${id}`)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to reservation</span>
      </button>

      {paymentError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Payment Error</p>
            <p className="text-sm">{paymentError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <h1 className="text-2xl font-bold">Complete Your Payment</h1>
              <p className="text-blue-100 mt-1">Secure payment for your accommodation</p>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Lock className="h-3 w-3 mr-1" />
                    <span>Secure Payment</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
                    <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                              iconColor: "#4F46E5",
                            },
                            invalid: {
                              color: "#9e2146",
                              iconColor: "#EF4444",
                            },
                          },
                          hidePostalCode: true,
                        }}
                        onChange={(e) => {
                          if (e.error) {
                            setCardError(e.error.message)
                          } else {
                            setCardError(null)
                          }
                        }}
                      />
                    </div>
                    {cardError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {cardError}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC, and any
                      5 digits for postal code.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                        defaultValue={user?.name || ""}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="email@example.com"
                        defaultValue={user?.email || ""}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-6 bg-blue-50 p-3 rounded-lg">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      I agree to the{" "}
                      <button type="button" className="text-blue-600 hover:underline">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button type="button" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 shadow-md"
                  >
                    {processing ? (
                      <>
                        <span className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay {total}€ Now
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-700">Secure Payment</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your payment information is encrypted and secure. We use industry-standard security measures to
                  protect your data.
                </p>
                <div className="flex space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CardIcon className="h-6 w-10 text-blue-700" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CardIcon className="h-6 w-10 text-red-600" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CardIcon className="h-6 w-10 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg overflow-hidden sticky top-6">
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-lg font-semibold">Reservation Summary</h2>
            </div>

            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt={accommodation.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">{accommodation.title}</h3>
                  <p className="text-sm text-gray-600">
                    {accommodation.address}, {accommodation.city}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Home className="h-3 w-3 mr-1" />
                    <span>{accommodation.numberOfRooms} bedroom(s)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <p>Available from</p>
                    <p className="font-medium text-gray-800">
                      {new Date(accommodation.availableFrom).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <p>Reserved by</p>
                    <p className="font-medium text-gray-800">{user?.name || "Guest"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-800 mb-3">Price Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly rent</span>
                    <span className="font-medium">{monthlyRent}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security deposit</span>
                    <span className="font-medium">{securityDeposit}€</span>
                  </div>

                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-800">Total</span>
                  <span className="font-bold text-xl text-indigo-700">{total}€</span>
                </div>
                <p className="text-xs text-indigo-600 mt-2">
                  By proceeding with the payment, you agree to the terms and conditions of MoveInn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
