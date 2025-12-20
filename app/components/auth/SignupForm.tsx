"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/* ✅ IMPORTANT: disable SSR for reCAPTCHA */
const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha"),
  { ssr: false }
);

const SIGNUP_STORAGE_KEY = "mock_signup_user";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    prefix: "",
    fullName: "",
    email: "",
    mobile: "",
    qualification: "",
    affiliation: "",
    country: "",
  });

  const [agree, setAgree] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.fullName ||
      !form.email ||
      !form.mobile ||
      !form.country
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!agree) {
      setError("Please accept Terms & Conditions.");
      return;
    }

    if (!captchaValue) {
      setError("Please verify the captcha.");
      return;
    }

    const signupData = {
      ...form,
      signupTime: new Date().toISOString(),
      approved: false,
    };

    localStorage.setItem(
      SIGNUP_STORAGE_KEY,
      JSON.stringify(signupData)
    );

    alert("Signup successful! (Frontend only)");
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      
      {/* LEFT – FORM */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-gradient-to-b from-[#eaf7ff] to-[#f6fbff]">
        <h1 className="text-xl font-semibold text-[#0d47a1] mb-5">
          Sign Up
        </h1>

        {/* Prefix */}
        <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Prefix
  </label>
        <Input
          id="prefix"
          placeholder="Eg: Dr, Prof, Mr, Ms"
          value={form.prefix}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Full Name */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Full Name
  </label>
        <Input
          id="fullName"
          placeholder="Enter Full Name"
          value={form.fullName}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Email */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter Email Id"
          value={form.email}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Mobile */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Mobile
  </label>
        <Input
          id="mobile"
          placeholder="Enter Mobile Number"
          value={form.mobile}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Qualification */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Qualification
  </label>
        <Input
          id="qualification"
          placeholder="Enter Qualification"
          value={form.qualification}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Affiliation */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Affiliation
  </label>
        <Input
          id="affiliation"
          placeholder="Enter Affiliation"
          value={form.affiliation}
          onChange={handleInputChange}
          className="mb-3"
        />
        </div>

        {/* Country */}
                <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Country
  </label>
        <Select
          value={form.country}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, country: value }))
          }
        >
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="-Select Country-" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>
        </div>

        {/* ✅ reCAPTCHA */}
        <div className="mb-4">
          <ReCAPTCHA
            // sitekey={
            //   process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
            // }
            sitekey="Enter Your_Site_Key_Here"
            onChange={(v) => setCaptchaValue(v)}
            onExpired={() => setCaptchaValue(null)}
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-4 text-sm">
          <Checkbox
            id="terms"
            checked={agree}
            onCheckedChange={(v) => setAgree(!!v)}
          />
          <label htmlFor="terms">
            I agree to all{" "}
            <span className="text-orange-500 cursor-pointer">
              Terms & Conditions
            </span>
          </label>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 mb-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Sign Up
        </Button>

        {/* Login */}
        <p className="text-xs text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-orange-500 cursor-pointer"
          >
            Login now
          </span>
        </p>
      </div>

      {/* RIGHT – IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/signup.png"
          alt="Signup Illustration"
          width={400}
          height={400}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
