"use client";

import { X } from "lucide-react";

export default function PreviewVideoModal({
  open,
  onClose,
  title,
  videoUrl,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-[92%] max-w-3xl shadow-xl z-50">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h3 className="text-sm font-semibold">
            TOPIC : {title}
          </h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video */}
        <div className="p-4">
          <video
            controls
            autoPlay
            className="w-full rounded-lg"
          >
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
