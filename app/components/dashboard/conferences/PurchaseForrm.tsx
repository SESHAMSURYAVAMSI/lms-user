"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addToMyConferences } from "@/lib/myConferenceStorage";

export default function PurchaseForm({
  conferenceId,
  price,
  onDone,
}: {
  conferenceId: string;
  price: number;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePay(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !card.trim()) {
      alert("Please enter valid card details.");
      return;
    }

    setLoading(true);

    // ⏳ simulate payment gateway
    setTimeout(() => {
      // ✅ ADD TO MY CONFERENCES
      addToMyConferences(Number(conferenceId));

      setLoading(false);
      alert(
        `Payment successful! Conference unlocked. Amount: ₹${price}`
      );

      if (onDone) onDone();
    }, 900);
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <h2 className="text-lg font-semibold text-center text-orange-600">
        Secure Conference Payment
      </h2>

      <div>
        <label className="block text-sm text-gray-600">
          Cardholder Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">
          Card Number
        </label>
        <input
          value={card}
          onChange={(e) => setCard(e.target.value)}
          required
          placeholder="4242 4242 4242 4242"
          className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      <p className="text-sm text-gray-600">
        Amount to Pay:{" "}
        <strong className="text-orange-600">
          ₹{price}
        </strong>
      </p>

      <div className="flex items-center gap-3 pt-2">
        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-3 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
