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

const LOGIN_STORAGE_KEY = "mock_login_user";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({ identifier: "" });
  const [error, setError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic frontend validation
    if (!form.identifier.trim()) {
      setError("Please enter Membership No, Email, or Mobile No.");
      return;
    }

    if (!captchaValue) {
      setError("Please verify the captcha.");
      return;
    }

    setError(null);

    // ✅ STORE LOGIN DATA IN LOCAL STORAGE
    const loginData = {
      identifier: form.identifier,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(loginData));

    alert("Login successful! (Frontend only)");

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">
            Login
          </h1>

          <p className="text-l text-black-100 mb-2">
            Search by USI membership number, registered email or phone number.
          </p>

          {/* Identifier */}
          <Input
            id="identifier"
            type="text"
            placeholder="Enter Membership No, Email id or Mobile No."
            value={form.identifier}
            onChange={(e) => setForm({ identifier: e.target.value })}
          />

          {/* reCAPTCHA */}
          <ReCAPTCHA
            sitekey="your_site_key_here"
            onChange={(value) => setCaptchaValue(value)}
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full font-medium bg-orange-500 hover:bg-[#0d47a1] text-white mt-4"
          >
            Login
          </Button>

          {/* Signup */}
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
