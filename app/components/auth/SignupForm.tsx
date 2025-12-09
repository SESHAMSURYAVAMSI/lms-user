"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

type FormData = {
  prefix: string;
  fullName: string;
  email: string;
  mobile: string;
  qualification: string;
  affiliation: string;
  country: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    prefix: "",
    fullName: "",
    email: "",
    mobile: "",
    qualification: "",
    affiliation: "",
    country: "",
  });

  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOpen, setIsOpen] = useState(false); // modal
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // NOTE: removed body overflow-lock effect so page remains scrollable when modal is open.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let filteredValue = value;

    if (id === "fullName") filteredValue = value.replace(/[^A-Za-z\s]/g, "");
    else if (id === "mobile") filteredValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    else if (id === "prefix") filteredValue = value.replace(/[^A-Za-z]/g, "");

    setForm((prev) => ({ ...prev, [id]: filteredValue }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.prefix.trim()) newErrors.prefix = "Prefix is required.";
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (!/^[A-Za-z\s]{2,}$/.test(form.fullName)) newErrors.fullName = "Enter a valid name.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.qualification.trim()) newErrors.qualification = "Qualification is required.";
    if (!form.affiliation.trim()) newErrors.affiliation = "Affiliation details are required.";
    if (!form.country.trim()) newErrors.country = "Country is required.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!agree) {
      alert("Please accept Terms & Conditions before signing up.");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // ---------- SIMULATED BACKEND (no network) ----------
      await new Promise((res) => setTimeout(res, 700));
      const data = {
        success: true,
        token: "fake-jwt-token-12345",
        user: {
          fullName: form.fullName,
          email: form.email,
          mobile: form.mobile,
          prefix: form.prefix,
          affiliation: form.affiliation,
          qualification: form.qualification,
          country: form.country,
        },
        message: "THANK YOU SIGN UP — WAIT FOR USI APPROVAL.",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setModalMessage(data.message);
      setIsOpen(true);

      setForm({
        prefix: "",
        fullName: "",
        email: "",
        mobile: "",
        qualification: "",
        affiliation: "",
        country: "",
      });
      // ----------------------------------------------------
    } catch (error) {
      console.error("Signup simulation error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // optionally redirect after close:
    // router.push("/login");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg transition">
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex flex-col">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins">
            <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">Sign Up</h1>

            <div>
              <label htmlFor="prefix" className="mb-1 text-black">Prefix <span className="text-red-500">*</span></label>
              <Input id="prefix" placeholder="Eg: Dr, Mr, Ms" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.prefix} onChange={handleChange} />
              {errors.prefix && <p className="text-sm text-red-600 mt-1">{errors.prefix}</p>}
            </div>

            <div>
              <label htmlFor="fullName" className="mb-1 text-black">Full Name <span className="text-red-500">*</span></label>
              <Input id="fullName" placeholder="Enter full name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.fullName} onChange={handleChange} />
              {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 text-black">Email <span className="text-red-500">*</span></label>
              <Input id="email" type="email" placeholder="Enter email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.email} onChange={handleChange} />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="mobile" className="mb-1 text-black">Mobile Number <span className="text-red-500">*</span></label>
              <Input id="mobile" placeholder="Enter mobile number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.mobile} onChange={handleChange} />
              {errors.mobile && <p className="text-sm text-red-600 mt-1">{errors.mobile}</p>}
            </div>

            <div>
              <label htmlFor="qualification" className="mb-1 text-black">Qualification <span className="text-red-500"></span></label>
              <Input id="qualification" placeholder="Enter your qualification" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.qualification} onChange={handleChange} />
              {errors.qualification && <p className="text-sm text-red-600 mt-1">{errors.qualification}</p>}
            </div>

            <div>
              <label htmlFor="affiliation" className="mb-1 text-black">Affiliation <span className="text-red-500">*</span></label>
              <Input id="affiliation" placeholder="Enter your affiliation" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white" value={form.affiliation} onChange={handleChange} />
              {errors.affiliation && <p className="text-sm text-red-600 mt-1">{errors.affiliation}</p>}
            </div>

            <div>
              <label htmlFor="country" className="mb-1 text-black">Country <span className="text-red-500">*</span></label>
              <select
                id="country"
                value={form.country}
                onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-white text-gray-700"
              >
                <option value="">-select-</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Brazil">Brazil</option>
              </select>
              {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-label mb-2">reCAPTCHA</label>
              <ReCAPTCHA sitekey="your_site_key_here" onChange={(val) => console.log("captcha", val)} />
            </div>

            <div className="flex items-start space-x-2">
              <input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
              <label htmlFor="agree" className="text-paragraph font-normal leading-snug text-sm">
                I agree to all <span className="text-orange-500 hover:underline cursor-pointer">Terms & Conditions</span>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full font-medium bg-orange-500 hover:bg-[#0d47a1] text-white mt-4">
              {loading ? "Submitting..." : "Sign Up"}
            </Button>

            <div className="text-left mt-2 text-paragraph font-medium">
              Already have an account?
              <button type="button" onClick={() => router.push("/login")} className="text-orange-500 font-semibold hover:underline ml-1">
                Login now
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 bg-white">
          <Image src="/signup.png" alt="Urological Society of India" width={400} height={400} className="object-cover rounded-r-2xl" />
        </div>
      </div>

      {/* MODAL (scrolls with page) */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full min-h-screen z-[100] flex items-start justify-center py-20"
          role="dialog"
          aria-modal="true"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop - fixed so it always covers viewport while still allowing page scroll */}
          <div className="fixed inset-0 bg-black/50" />

          {/* Modal card */}
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white shadow-xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <AlertCircle className="h-6 w-6 text-orange-500" aria-hidden="true" />
            </div>

            <h2 className="text-sm font-semibold tracking-wide text-gray-500">THANK YOU SIGN UP</h2>
            <p className="mt-2 text-base font-bold text-[#0d47a1]">{modalMessage || "WAIT FOR USI APPROVAL."}</p>

            <Button onClick={handleClose} className="mt-6 w-full bg-orange-500 hover:bg-[#0d47a1] text-white">
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupForm;
