"use client";

import type React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, CheckCircle2, X } from "lucide-react";

export default function Recovery() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    console.log(" Password reset completed");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <CheckCircle2 className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-balance text-gray-900">
              Password Reset Successful
            </h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
            <Link href="/auth/login">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors">
                Continue to Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/cardlet-logo.png"
              alt="Cardlet Logo"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-3xl font-bold text-balance text-gray-900">
            Reset Your Password
          </h1>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Create a strong password to secure your account
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {password.length > 0 && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-900 mb-2">
                  Password must contain:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    {hasMinLength ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span
                      className={
                        hasMinLength ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {hasUpperCase ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span
                      className={
                        hasUpperCase ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {hasLowerCase ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span
                      className={
                        hasLowerCase ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {hasNumber ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span
                      className={hasNumber ? "text-gray-900" : "text-gray-500"}
                    >
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {hasSpecialChar ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span
                      className={
                        hasSpecialChar ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      One special character
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
              {passwordsMatch && (
                <p className="text-xs text-orange-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                !hasMinLength ||
                !hasUpperCase ||
                !hasLowerCase ||
                !hasNumber ||
                !hasSpecialChar ||
                !passwordsMatch
              }
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-md transition-colors"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="text-sm text-orange-500 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
