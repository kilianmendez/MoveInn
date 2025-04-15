import RegisterForm from "@/components/register/register-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left side - Gradient background with info */}
            <div className="bg-gradient-to-br from-[#7AE582] via-[#4C69DD] to-[#4C69DD] p-8 text-white">
              <div className="flex flex-col h-full">
                <div className="mx-auto mb-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 mx-auto">
                    <img
                      src="/placeholder.svg?height=160&width=160"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Start your Erasmus adventure today</h2>
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start">
                      <div className="bg-white/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Find accommodation with ease</h3>
                        <p className="text-sm text-white/80">
                          Connect with potential roommates and explore housing options
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start">
                      <div className="bg-white/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="font-bold text-sm">2</span>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-1">Meet local student hosts</h3>
                        <p className="text-sm text-white/80">
                          Get guidance from experienced students who know the city
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start">
                      <div className="bg-white/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Join events and make friends</h3>
                        <p className="text-sm text-white/80">Discover social activities and cultural experiences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Registration form */}
            <div className="p-8 flex items-center justify-center">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
