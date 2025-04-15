"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Mail, Lock, Smartphone } from "lucide-react"
import { useAuth, RegisterData } from "@/context/authcontext"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [remember, setRemember] = useState(false)
  const router = useRouter()

  const { register, isLoading, error, clearError } = useAuth()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError()

    const formData = new FormData(e.currentTarget)

    // Recolectar los campos visibles
    const name = formData.get("name") as string       // Nombre (obligatorio)
    const mail = formData.get("mail") as string       // Email (obligatorio)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const phone = formData.get("phone") as string

    // Validar contraseñas
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setPasswordMatch(true)

    // Los campos obligatorios adicionales serán enviados aunque sean vacíos (inputs ocultos los incluyen)
    const dataToSend: RegisterData = {
      mail,
      password,
      name,
      lastName: formData.get("lastName") as string || "",
      biography: formData.get("biography") as string || "",
      school: formData.get("school") as string || "",
      degree: formData.get("degree") as string || "",
      nationality: formData.get("nationality") as string || "",
      phone,
      file: (formData.get("file") as File) || null,
      socialMedias: JSON.parse(formData.get("socialMedias") as string || "[]"),
    }

    const success = await register(dataToSend, remember)
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-text">Join </span>
          <span className="text-primary">Move</span>
          <span className="text-secondary">Inn</span>
          <span className="text-text"> Today</span>
        </h1>
        <p className="text-gray-600">Create your account in just a few steps</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-text text-lg mb-1">Create your account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Join the MoveInn community and start your Erasmus journey
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {!passwordMatch && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            Passwords do not match
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Nombre visible */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tyron"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-secondary"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="mail" className="block text-sm font-medium text-text-secondary">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mail"
                name="mail"
                type="email"
                placeholder="your.email@gmail.com"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-secondary"
                required
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-secondary"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-secondary"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-secondary"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Hidden inputs para enviar campos adicionales aunque sean vacíos */}
          <input type="hidden" name="lastName" value="" />
          <input type="hidden" name="biography" value="" />
          <input type="hidden" name="school" value="" />
          <input type="hidden" name="degree" value="" />
          <input type="hidden" name="nationality" value="" />
          <input type="hidden" name="socialMedias" value="[]" />
          <input type="hidden" name="file" value="" />

          {/* Remember me (opcional) */}
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
