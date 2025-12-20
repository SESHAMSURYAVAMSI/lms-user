"use client";

import React, { useState } from "react";

/* ================= TYPES ================= */
type FAQItem = {
  q: string;
  a: string;
};

interface Props {
  faq?: FAQItem[];
  programTitle?: string; // ✅ optional
}

/* ================= COMPONENT ================= */
export default function ProgramFAQ({
  faq = [],
  programTitle,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div>
      {/* Optional Program Header */}
      {programTitle && (
        <h2 className="text-xl font-semibold mb-2 text-[#252641]">
          Program FAQs – {programTitle}
        </h2>
      )}

      <h3 className="text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4">
        {faq.length === 0 ? (
          <div className="text-gray-600">
            No FAQs available for this program.
          </div>
        ) : (
          faq.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="bg-white rounded-md">
                <div className="flex items-center">
                  {/* left bullet */}
                  <div className="flex items-start">
                    <span
                      aria-hidden
                      className="mt-3 ml-1 mr-4 inline-block w-3 h-3 rounded-full bg-[#C7D8EE]"
                    />
                  </div>

                  {/* question */}
                  <button
                    onClick={() => toggle(i)}
                    className="flex-1 text-left py-4 pr-4 flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                  >
                    <span className="text-sm text-gray-800">
                      {item.q}
                    </span>

                    {/* chevron */}
                    <span
                      className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gray-500"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* answer */}
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen
                      ? "max-h-[800px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-12 pb-6 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </div>

                {/* divider */}
                <div className="border-t" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
