"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // FRONTEND-ONLY SIMULATION
    setTimeout(() => {
      setLoading(false);
      setMessage("Password reset instructions have been sent to your email.");
      setEmail("");
    }, 800);
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-6 px-2"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1]">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-600">
            Enter the email address associated with your account and we’ll help
            you reset your password.
          </p>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Success Message */}
          {message && (
            <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full font-medium bg-orange-500 hover:bg-[#0d47a1] text-white py-2.5"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>

          {/* Back to Login */}
          <div className="text-center mt-4 text-sm font-medium">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-500 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/images/login.png"
          alt="Forgot Password Illustration"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
