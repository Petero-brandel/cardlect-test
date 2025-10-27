"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Verify2FAPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) inputRefs.current[index + 1]?.focus();

    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  // ✅ Simulated 2FA verification and role-based redirect using if-else
  const handleVerify = async (verificationCode: string) => {
    setIsVerifying(true);
    console.log("Verifying 2FA code:", verificationCode);

    setTimeout(() => {
      if (verificationCode === "123456") {
        // Simulated user role (manually change this to test)
        const userRole = "admin"; // Try "staff" or "super_admin" manually

        if (userRole === "admin") {
          window.location.href = "/dashboard/admin";
        } else if (userRole === "staff") {
          window.location.href = "/dashboard/staff";
        } else if (userRole === "super_admin") {
          window.location.href = "/dashboard/super-admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError("Invalid verification code. Please try again.");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleResend = () => {
    console.log("Resending verification code");
    setResendTimer(30);
    setCode(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
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
          <h1 className="text-3xl font-bold text-balance">Enter OTP</h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="bg-[#fff] border border-border rounded-lg p-6 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Verification Code
              </label>
              <div className="flex gap-2 justify-between">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    placeholder="_"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg 
                               focus:outline-orange-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                               transition-all"
                    disabled={isVerifying}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>

            <Button
              onClick={() => handleVerify(code.join(""))}
              disabled={code.some((digit) => digit === "") || isVerifying}
              className="w-full text-[#fff] bg-orange-600"
              size="lg"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              {resendTimer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in{" "}
                  <span className="font-medium text-foreground">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResend}
                  className="text-primary p-0 h-auto"
                >
                  Resend Code
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="text-center">
            <Link
              href="/verify-2fa/backup"
              className="text-sm text-primary hover:underline"
            >
              Use backup code instead
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Having trouble?{" "}
          <Link href="/support" className="text-orange-500 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
