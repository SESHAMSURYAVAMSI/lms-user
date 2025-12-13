"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { ElearningCourse } from "@/app/data/elearning/elearning";

export default function RegisterModal({
  open,
  onClose,
  course,
}: {
  open: boolean;
  onClose: () => void;
  course: ElearningCourse | null;
}) {
  const [value, setValue] = useState("");

  // clear input when modal closes
  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  if (!open || !course) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl p-6 w-[92%] sm:w-[520px] shadow-xl z-50">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-black" aria-label="Close">
          <X size={18} />
        </button>

        <h2 className="text-sm font-semibold text-[#1F5C9E]">Register for <span className="text-green-600">FREE</span></h2>
        <h3 className="mt-1 text-2xl font-semibold text-orange-600">e Learning Courses</h3>

        <p className="mt-3 text-sm text-gray-700">Selected course: <strong>{course.title}</strong></p>

        <p className="mt-4 text-sm text-gray-600">Enter your USI membership number / registered email or phone number.</p>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="USI membership no. / Email or Phone Number"
          className="mt-4 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <button
          onClick={() => {
            // TODO: replace with server action / API integration
            alert(`Submitted: ${value || "(empty)"} for "${course.title}"`);
            onClose();
          }}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
