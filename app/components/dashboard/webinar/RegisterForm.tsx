"use client";

import React, { useState } from "react";

export default function RegisterForm({
  webinarId,
  onDone,
}: {
  webinarId: string;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return alert("Please enter a valid membership number, email, or phone.");
    alert("Registered successfully!");
    onDone(); // close modal
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-lg font-semibold text-blue-600">
        Register for FREE
      </h2>

      <h3 className="text-center text-xl font-bold text-[#FFB347]">
        USI ISU Webinar
      </h3>

      <p className="text-center text-gray-600 text-sm">
        Enter your USI membership number / registered email / or phone number.
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="USI membership no. | Email | Phone Number"
        className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-[#1F5C9E] focus:outline-none text-sm"
      />

      <button
        onClick={submit}
        className="w-full px-4 py-2 bg-[#1F5C9E] text-white rounded-md mt-2 hover:bg-[#FFB347] transition"
      >
        Submit
      </button>
    </div>
  );
}
