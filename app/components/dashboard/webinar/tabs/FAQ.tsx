"use client";

import React from "react";

type FAQItem = { q: string; a: string };

export default function FAQ({ faq }: { faq?: FAQItem[] }) {
  return (
    <div>
      <h3 className="font-semibold">FAQ</h3>
      <ul className="mt-3 space-y-2">
        {faq?.length ? (
          faq.map((item, i) => (
            <li key={i} className="border p-3 rounded">
              <div className="font-medium">{item.q}</div>
              <div className="text-sm text-gray-600 mt-1">{item.a}</div>
            </li>
          ))
        ) : (
          <div className="text-gray-600">No FAQs yet.</div>
        )}
      </ul>
    </div>
  );
}
