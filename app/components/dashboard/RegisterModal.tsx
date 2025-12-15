"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, CreditCard } from "lucide-react";

type CourseLike = {
  id: number | string;
  title: string;
  price?: number;
};

export default function RegisterModal({
  open,
  onClose,
  course,
}: {
  open: boolean;
  onClose: () => void;
  course: CourseLike | null;
}) {
  const [value, setValue] = useState("");
  const isPaid = (course?.price ?? 0) > 0;

  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  if (!open || !course) return null;

  function handleSubmit() {
    if (!value.trim()) {
      alert("Please enter membership / email / phone");
      return;
    }

    alert(
      isPaid
        ? `Payment initiated for "${course!.title}"`
        : `Successfully registered for "${course!.title}"`
    );

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-[92%] sm:w-[520px] p-6 shadow-xl z-50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          {isPaid ? (
            <CreditCard className="text-orange-500" />
          ) : (
            <CheckCircle className="text-green-600" />
          )}
          <h2 className="text-lg font-semibold text-[#1F5C9E]">
            {isPaid ? "Purchase Access" : "Register for FREE"}
          </h2>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#252641] mb-3">
          {course.title}
        </h3>

        {/* Price / Info */}
        {isPaid ? (
          <p className="text-sm text-gray-700 mb-4">
            Amount to pay:{" "}
            <span className="font-semibold text-orange-600">
              ₹{course.price}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            Enter your USI membership number, registered email or phone
            number.
          </p>
        )}

        {/* Input */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Membership No. / Email / Phone"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1F5C9E] outline-none"
        />

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          className={`mt-5 w-full py-2 rounded-lg text-sm font-semibold text-white transition ${
            isPaid
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPaid ? "Proceed to Pay" : "Confirm Registration"}
        </button>
      </div>
    </div>
  );
}
