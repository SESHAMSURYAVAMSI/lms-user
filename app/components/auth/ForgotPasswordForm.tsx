"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input"; // Assuming shadcn Input
import { Button } from "@/components/ui/button"; // Assuming shadcn Button
import { Loader2 } from "lucide-react"; // For loading state

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000/api';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null); // For success/error messages
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset instructions.");
      }

      setMessage("Password reset instructions have been sent to your email.");
      setEmail(""); // Clear the input field on success

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-6 px-2" // Increased space-y
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-600">
            Enter the email address associated with your account, and we'll send you a link to reset your password.
          </p>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading} // Disable input while loading
            />
          </div>

          {/* Success Message */}
          {message && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}

          {/* Error Message */}
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-medium bg-orange-500 hover:bg-[#0d47a1] text-white py-2.5"
            disabled={loading} // Disable button while loading
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Instructions"}
          </Button>

          {/* Back to Login */}
          <div className="text-center mt-4 text-sm font-medium">
            <button
              type="button"
              onClick={() => router.push("/login")} // Navigate back to login
              className="text-orange-500 hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        {/* You might want a different image for forgot password */}
        <Image
          src="/images/login.png" // Reusing login image for now
          alt="Forgot Password Illustration"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}