"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ✅ Disable SSR for reCAPTCHA */
const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha"),
  { ssr: false }
);

type LoginData = {
  identifier: string;
};

const LOGIN_STORAGE_KEY = "mock_login_user";

/* ✅ Dummy allowed users */
const DUMMY_USERS = [
  "USI12345",
  "demo@usi.com",
  "9876543210",
];

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({ identifier: "" });
  const [error, setError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.identifier.trim()) {
      setError("Please enter Membership No, Email, or Mobile No.");
      return;
    }

    if (!captchaValue) {
      setError("Please verify the captcha.");
      return;
    }

    /* ✅ Dummy login validation */
    if (!DUMMY_USERS.includes(form.identifier.trim())) {
      setError("Invalid login credentials.");
      return;
    }

    setError(null);

    const loginData = {
      identifier: form.identifier,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem(
      LOGIN_STORAGE_KEY,
      JSON.stringify(loginData)
    );

    alert("Login successful! (Dummy user)");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      
      {/* LEFT – FORM */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1]">
            Login
          </h1>

          <p className="text-sm text-gray-700">
            Search by USI membership number, registered email or phone number.
          </p>

          {/* Identifier */}
          <Input
            id="identifier"
            type="text"
            placeholder="Enter Membership No, Email id or Mobile No"
            value={form.identifier}
            onChange={(e) =>
              setForm({ identifier: e.target.value })
            }
          />

          {/* reCAPTCHA */}
          <div className="pt-2">
            <ReCAPTCHA
              sitekey="6LfBXC8sAAAAAEUGOUN8B2XkFsov-bLIQoYzYLIf"
              onChange={(value) => setCaptchaValue(value)}
              onExpired={() => setCaptchaValue(null)}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-[#0d47a1] text-white"
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

      {/* RIGHT – IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/images/login.png"
          alt="Login Illustration"
          width={300}
          height={300}
          className="object-cover"
        />
      </div>
    </div>
  );
}
