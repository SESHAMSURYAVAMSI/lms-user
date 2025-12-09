"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full relative bg-gradient-to-r from-[#d0ebff] to-[#a9d6fb]">
      <div className="max-w-6xl mx-auto flex justify-end items-center py-3 text-sm text-gray-600">
        <div className="absolute right-2 bottom-2 flex items-center gap-1 mr-2 mb-2">
          <span className="mr-1">Educational Grant By</span>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
