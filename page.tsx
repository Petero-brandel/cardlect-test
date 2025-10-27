"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "One Platform to Streamline",
      subtitle: "All Product Analytics",
      description:
        "Your revenue will all be in one by 20% next month. Your revenue is increased by next month with our company tools.",
    },
    {
      title: "Real-time Analytics",
      subtitle: "Track Your Growth",
      description:
        "Monitor your business metrics in real-time with our comprehensive analytics dashboard and insights.",
    },
    {
      title: "Data-Driven Insights",
      subtitle: "Make Better Decisions",
      description:
        "Get actionable insights to optimize your product strategy and maximize revenue growth exponentially.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex">
        {/* Left Section - Dark Sidebar with Gradient */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#2a2620] via-[#1f1b16] to-[#0f0d0a] flex-col items-center justify-center p-12 text-white relative">
          {/* Logo */}
          <div className="mb-12 relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-600">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Content */}
          <h1 className="text-4xl font-bold text-center mb-2 leading-tight">{slides[currentSlide].title}</h1>
          <h2 className="text-4xl font-bold text-center mb-6 leading-tight">{slides[currentSlide].subtitle}</h2>

          {/* Description */}
          <p className="text-center text-gray-400 text-sm max-w-xs mb-12">{slides[currentSlide].description}</p>

          {/* Pagination Dots - Clickable */}
          <div className="flex gap-2 cursor-pointer">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-8" : "bg-gray-600 hover:bg-gray-500 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-12">
              <div className="lg:hidden">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-black font-semibold hover:underline">
                  Sign Up
                </a>
              </div>
            </div>

            {/* Welcome Text */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to Orion!</h1>
            <p className="text-gray-500 text-sm mb-8">Please enter your details to sign in your account</p>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition duration-200 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-gray-900">Continue with Google</span>
              </button>
              <button className="w-full border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition duration-200 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                  <path d="M17.05 13.5c-.91 0-1.64.46-2.05 1.27h-.1c-.3-.8-1.04-1.27-2.05-1.27-1.25 0-2.22.99-2.22 2.5s.97 2.5 2.22 2.5c1.01 0 1.75-.47 2.05-1.27h.1c.41.81 1.14 1.27 2.05 1.27 1.25 0 2.22-.99 2.22-2.5s-.97-2.5-2.22-2.5zm-2.05 3.5c-.66 0-1.22-.55-1.22-1.5s.56-1.5 1.22-1.5c.66 0 1.22.55 1.22 1.5s-.56 1.5-1.22 1.5zm2.05-3.5c-.91 0-1.64.46-2.05 1.27h-.1c-.3-.8-1.04-1.27-2.05-1.27-1.25 0-2.22.99-2.22 2.5s.97 2.5 2.22 2.5c1.01 0 1.75-.47 2.05-1.27h.1c.41.81 1.14 1.27 2.05 1.27 1.25 0 2.22-.99 2.22-2.5s-.97-2.5-2.22-2.5z" />
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-gray-900">Continue with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">Or sign in with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <input
                type="email"
                placeholder="john@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="minimum 8 character"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="acceptPolicy"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-orange-400 focus:ring-2 focus:ring-orange-400 cursor-pointer"
              />
              <label htmlFor="acceptPolicy" className="text-sm text-gray-600 cursor-pointer">
                I accept the{" "}
                <a href="#" className="text-gray-900 font-semibold hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <button
              disabled={!acceptPolicy}
              className={`w-full font-semibold py-3 px-4 rounded-lg transition mb-4 ${
                acceptPolicy
                  ? "bg-orange-400 hover:bg-orange-500 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Sign In →
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-xs text-gray-500 pt-8 border-t border-gray-200 mt-8">
            <span>© 2025 Orion</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
