"use client";

import React, { useEffect, useState } from "react";
import { X, IndianRupee, UserPlus } from "lucide-react";
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

  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  if (!open || !course) return null;

  const isPaid = course.price && course.price > 0;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-[92%] sm:w-[520px] shadow-2xl z-50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2">
          {isPaid ? (
            <IndianRupee className="text-orange-500" size={20} />
          ) : (
            <UserPlus className="text-green-600" size={20} />
          )}

          <h2 className="text-sm font-semibold text-[#1F5C9E]">
            {isPaid ? "Purchase Course" : "Register for"}
            {!isPaid && (
              <span className="ml-1 text-green-600">FREE</span>
            )}
          </h2>
        </div>

        <h3 className="mt-1 text-xl font-bold text-[#252641]">
          {course.title}
        </h3>

        {/* Price / Free Badge */}
        <div className="mt-3">
          {isPaid ? (
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              ₹ {course.price} • Paid Course
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              100% Free Registration
            </div>
          )}
        </div>

        {/* Info */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          Enter your USI membership number, registered email address,
          or phone number to continue.
        </p>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="USI Membership No / Email / Phone"
          className="mt-4 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        {/* CTA */}
        <button
          onClick={() => {
            if (!value.trim()) {
              alert("Please enter valid details");
              return;
            }

            if (isPaid) {
              alert(`Proceed to payment of ₹${course.price}`);
            } else {
              alert(`Registered successfully for "${course.title}"`);
            }

            onClose();
          }}
          className={`mt-6 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition ${
            isPaid
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPaid ? `Pay ₹${course.price}` : "Register Free"}
        </button>
      </div>
    </div>
  );
}
