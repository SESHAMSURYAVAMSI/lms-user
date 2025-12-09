"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

type LoginData = {
  identifier: string; // Membership No, Email, or Phone
};

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:5000/api";
console.log("Backend Base URL:", BACKEND_BASE_URL);

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({ identifier: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.identifier) {
      setError("Please enter Membership No, Email, or Mobile No.");
      return;
    }

    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">Login</h1>

          <p className="text-l text-black-100 mb-2">
            Search by USI membership number, registered email or phone number.
          </p>

          {/* Single Input */}
          <Input
            id="identifier"
            type="text"
            placeholder="Enter Membership No, Email id or Mobile No."
            className="text-placeholder w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            value={form.identifier}
            onChange={(e) => setForm({ identifier: e.target.value })}
          />

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="your_site_key_here"
              onChange={(val) => console.log("captcha", val)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-button font-medium bg-orange-500 hover:bg-[#0d47a1] text-white mt-4"
          >
            Login
          </Button>

          {/* Signup Section */}
          <div className="text-center mt-3 text-sm text-gray-700">
            Not a USI Member?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-orange-500 hover:underline font-medium"
            >
              Signup
            </button>{" "}
            (Subject to USI Approval)
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/images/login.png"
          alt="Login Illustration"
          width={300}
          height={300}
          className="object-cover rounded-r-2xl"
        />
      </div>
    </div>
  );
}
