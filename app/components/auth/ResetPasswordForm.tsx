"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000/api';

// Define props to accept the token
interface Props {
  token: string;
}

export function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Add password complexity validation if needed

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }), // Send only the new password
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setMessage("Password reset successful! You can now log in with your new password.");
      // Optionally store the returned token and log the user in automatically
      // if (data.token) {
      //   localStorage.setItem("token", data.token);
      // }
      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirect after 3 seconds

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Reset password error:", err);
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
          className="w-full max-w-md mx-auto space-y-5 px-2" // Adjusted spacing
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">
            Reset Password
          </h1>

          {/* New Password */}
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || !!message} // Disable if loading or success message shown
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading || !!message}
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
            disabled={loading || !!message}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password"}
          </Button>

        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/images/login.png" // Consider a different image
          alt="Reset Password Illustration"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}