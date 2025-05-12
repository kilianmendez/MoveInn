"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/authcontext"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CreditCard, Lock, CheckCircle, AlertCircle, ArrowLeft, Shield, Home } from "lucide-react"
import Image from "next/image"
import {
  API_GET_ACCOMMODATION,
  API_CREATE_PAYMENT,
  API_UPDATE_RESERVATION,
  API_GET_RESERVATION,
  API_BASE_IMAGE_URL,
} from "@/utils/endpoints/config"
import axios from "axios"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


export function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  )
}


export function PaymentFormContent() {
  const { id } = useParams()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { user, token } = useAuth()

  const [reservation, setReservation] = useState<any>(null)
  const [accommodation, setAccommodation] = useState<any>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardError, setCardError] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || !token) return
    const fetchReservation = async () => {
      setLoading(true)
      try {
        const res = await axios.get(API_GET_RESERVATION(id), {
          headers: { Authorization: `Bearer ${token}` },
        })
        setReservation(res.data)
      } catch (err) {
        setError("Failed to fetch reservation")
      } finally {
        setLoading(false)
      }
    }
    fetchReservation()
  }, [id, token])

  useEffect(() => {
    if (!reservation?.accommodationId || !token) return
    const fetchAccommodation = async () => {
      setLoading(true)
      try {
        const res = await axios.get(API_GET_ACCOMMODATION(reservation.accommodationId), {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAccommodation(res.data)
      } catch (err) {
        setError("Failed to fetch accommodation")
      } finally {
        setLoading(false)
      }
    }
    fetchAccommodation()
  }, [reservation, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !reservation || !accommodation) return

    const card = elements.getElement(CardElement)
    if (!card) return

    setProcessing(true)
    setCardError(null)
    setError(null)

    const amount = Math.round((reservation.totalPrice + accommodation.pricePerMonth) * 100)

    try {
      const res = await fetch(API_CREATE_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          currency: "eur",
          reservationId: id,
          accommodationId: accommodation.id,
          userId: user?.id,
        }),
      })

      if (!res.ok) {
        const errorRes = await res.json()
        throw new Error(errorRes.message || "Failed to create payment intent")
      }

      const { clientSecret } = await res.json()
      if (!clientSecret) throw new Error("Missing client secret")

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.name || "Guest",
            email: user?.email,
          },
        },
      })

      if (stripeError) {
        setCardError(stripeError.message || "Payment error")
        return
      }

      if (paymentIntent.status === "succeeded") {
        try {
          await axios.put(API_UPDATE_RESERVATION(id), { Status: 1 }, { headers: { Authorization: `Bearer ${token}` } })
          setPaymentSuccess(true)
          setTimeout(() => {
            router.push(`/reservations/${id}`)
          }, 2000)
        } catch (updateError) {
          console.error("Error updating reservation:", updateError)
          setPaymentSuccess(true)
          setTimeout(() => {
            router.push(`/reservations/${id}`)
          }, 2000)
        }
      } else {
        setCardError("Payment was not completed")
      }
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
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

  if (!accommodation || !reservation) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Information not found</h3>
          <p className="text-gray-600 mb-6">The reservation or accommodation details couldn't be loaded.</p>
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
              <span className="font-bold text-gray-900">{reservation.totalPrice + accommodation.pricePerMonth}€</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Accommodation:</span>
              <span className="font-semibold text-gray-900">{accommodation.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reservation ID:</span>
              <span className="font-mono text-xs text-gray-900">{id}</span>
            </div>
          </div>
          <div className="animate-pulse">
            <p className="text-sm text-gray-500">Redirecting to your reservation details...</p>
          </div>
        </div>
      </div>
    )
  }

  const monthlyRent = reservation.totalPrice
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

      {cardError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Payment Error</p>
            <p className="text-sm">{cardError}</p>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                        placeholder="John Doe"
                        defaultValue={user?.name || ""}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
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
                    <CreditCard className="h-6 w-10 text-blue-700" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-10 text-red-600" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-10 text-green-600" />
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
                {/* Property image */}
                <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  {accommodation.accommodationImages && accommodation.accommodationImages.length > 0 ? (
                    <Image
                      src={`${API_BASE_IMAGE_URL}${accommodation.accommodationImages[0].url}`}
                      alt={accommodation.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <Home className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Property information */}
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

              {/* Price details */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-800 mb-3">Price Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly rent</span>
                    <span className="font-medium text-blue-600">{monthlyRent}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security deposit</span>
                    <span className="font-medium text-blue-600">{securityDeposit}€</span>
                  </div>
                </div>
              </div>

              {/* Total */}
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
