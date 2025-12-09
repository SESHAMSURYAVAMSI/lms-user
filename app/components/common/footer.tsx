"use client";

import Image from "next/image";

export default function Footor() {
  return (
    <footer className="fixed bottom-0 left-0 w-64 bg-white border-t text-center text-xs text-gray-500 py-4">
      <p>Educational Grant By</p>
      <div className="mt-2 flex justify-center">
        <Image
          src="/sun_pharma.png"
          alt="Sun Pharma"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </footer>
  );
}
