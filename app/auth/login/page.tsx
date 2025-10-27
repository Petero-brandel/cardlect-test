"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { MessageSquare, Eye, EyeOff, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Simulated (in-memory) users for local testing only. superadmin, admin, staff.
 */
const SIMULATED_USERS = [
  {
    role: "superadmin",
    email: "superadmin@cardlect.local",
    password: "Super@1234",
  },
  { role: "admin", email: "admin@cardlect.local", password: "Admin@1234" },
  { role: "staff", email: "staff@cardlect.local", password: "Staff@1234" },
];

const textOptions = [
  "You can Now manage and monitor what goes in and out of your school with Cardlet!",
  "Seamlessly manage student identities, authorize parent pickups, and enable cashless transactions — all in one secure platform.",
  "Your Cardlect Login Details is your Identity, Do not share it with anyone, Cardlect support will never ask for your OTP",
  "If you are unable to login, please contact your school Administrator for prompt assistance",
  "Students now go fully cashless — just with the Cardlect smart card ID system",
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(""); // invalid credentials error
  const [termsError, setTermsError] = useState(""); // terms acceptance error
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const isFormValid = () => {
    return isValidEmail(email) && password.trim().length > 0 && rememberMe;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialError("");
    setTermsError("");

    setTouched({ email: true, password: true });

    // Validate terms acceptance
    if (!rememberMe) {
      setTermsError("You must accept the Terms of Service to continue.");
      return;
    }

    // Validate inputs
    if (!isValidEmail(email) || password.trim().length === 0) {
      setCredentialError("Please provide a valid email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const matched = SIMULATED_USERS.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!matched) {
        setCredentialError(
          "Invalid credentials. Please check your email and password."
        );
        setLoading(false);
        return;
      }
      router.push("/auth/verify-2fa");
    }, 700);
  };

  return (
    <div className="md:max-h-screen bg-gray-50 min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Purple Gradient */}
      <div className="hidden md:block md:w-2/6 md:max-h-screen rounded-half background-bg p-8 md:p-16 flex flex-col md:justify-center text-white">
        <div className="max-w-md">
          <div className="flex mt-40 items-center gap-3 mb-3">
            {/* <Image
                  src="/cardlet-logo.png"
                  alt="Cardlet Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                /> */}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hey, Hello!</h1>

          <p>{textOptions[currentTextIndex]}</p>
        </div>

        {/* login footer */}
        <div className="absolute bottom-0 flex">
          <small className="pb-5">
            Read our{" "}
            <span className="text-orange-400 underline ">
              <Link href="/terms"> Terms of Service</Link>
            </span>
          </small>
        </div>
      </div>

      {/* Right Side - White Form */}
      <div className="md:w-2/4 md:mx-auto flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#fffffd] rounded-3xl shadow-xl p-8 md:px-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Let's Log You in
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Enter your Login credentals to access your dashboard.
            </p>

            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setCredentialError("");
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={`w-full h-12 px-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    credentialError && touched.email
                      ? "border-red-500 ring-red-200"
                      : "border-gray-200"
                  }`}
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setCredentialError("");
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  className={`w-full h-12 px-4 pr-12 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    credentialError && touched.password
                      ? "border-red-500 ring-red-200"
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {credentialError && (
                <div className="text-sm text-red-600 mt-1">
                  {credentialError}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      if (e.target.checked) setTermsError("");
                    }}
                    className={`w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-2 cursor-pointer ${
                      termsError ? "ring-2 ring-red-200 border-red-500" : ""
                    }`}
                  />
                  <span className="text-sm text-gray-600">
                    Accept our Terms of Service
                  </span>
                </label>
                <Link
                  href="/auth/recovery"
                  className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {termsError && (
                <div className="text-sm text-red-600 mt-1">{termsError}</div>
              )}

              <Button
                type="submit"
                disabled={
                  !isValidEmail(email) ||
                  password.trim().length === 0 ||
                  !rememberMe ||
                  loading
                }
                className={`w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50 rounded-xl bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50 rounded-xl bg-transparent"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-orange-600 hover:text-orange-700 hover:underline font-medium"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
