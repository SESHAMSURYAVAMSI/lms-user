"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PurchaseForm({ webinarId, price, onDone }: { webinarId: string; price: number; onDone?: () => void; }) {
  const router = useRouter();
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Payment successful for webinar ${webinarId}. Amount: ₹${price}`);
      if (onDone) onDone();
    }, 900);
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600">Cardholder name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Card number</label>
        <input value={card} onChange={(e)=>setCard(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" placeholder="4242 4242 4242 4242" />
      </div>
      <p className="text-sm text-gray-600">Amount: <strong>₹{price}</strong></p>
      <div className="flex items-center gap-3">
        <button disabled={loading} type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
          {loading ? "Processing..." : "Pay Now"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-3 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
