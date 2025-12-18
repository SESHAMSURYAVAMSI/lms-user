"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import ReCAPTCHA from "react-google-recaptcha";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
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

    // ✅ STORE SIGNUP DATA IN LOCAL STORAGE
    const signupData = {
      ...form,
      signupTime: new Date().toISOString(),
      approved: false, // for future backend logic
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
          <label className="text-sm text-black-900 mb-1 block">
            Prefix
          </label>
          <Input
            id="prefix"
            placeholder="Eg: Dr, Prof, Mr, Ms, etc."
            value={form.prefix}
            onChange={handleInputChange}
          />
        </div>

        {/* Full Name */}
        <div className="mb-3">
          <label className="text-sm text-black-900 mb-1 block">
            Full Name 
          </label>
          <Input
            id="fullName"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-sm text-black-900 mb-1 block">
            Email 
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email Id"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="text-sm text-black-900 mb-1 block">
            Mobile 
          </label>
          <Input
            id="mobile"
            placeholder="Enter Mobile Number"
            value={form.mobile}
            onChange={handleInputChange}
          />
        </div>

        {/* Qualification */}
        <div className="mb-3">
          <label className="text-sm text-black-900 mb-1 block">
            Qualification
          </label>
          <Input
            id="qualification"
            placeholder="Enter Qualification"
            value={form.qualification}
            onChange={handleInputChange}
          />
        </div>

        {/* Affiliation */}
        <div className="mb-3">
          <label className="text-sm text-black-900 mb-1 block">
            Affiliation
          </label>
          <Input
            id="affiliation"
            placeholder="Enter Affiliation"
            value={form.affiliation}
            onChange={handleInputChange}
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="text-sm text-black-900 mb-1 block">
            Country 
          </label>
          <Select
            value={form.country}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="United States">
                United States
              </SelectItem>
              <SelectItem value="United Kingdom">
                United Kingdom
              </SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">
                Australia
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* reCAPTCHA */}
        <div className="mb-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(v) => setCaptchaValue(v)}
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
