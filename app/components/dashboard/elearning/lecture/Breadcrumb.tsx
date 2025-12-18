"use client";
import { useRouter } from "next/navigation";

export default function Breadcrumb({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="px-6 py-4 text-sm flex gap-2">
      <button
        onClick={() => router.push("/dashboard/elearning")}
        className="text-orange-600 hover:underline"
      >
        E-learning Courses
      </button>
      <span className="text-gray-400">{">"}</span>
      <span className="text-orange-600 font-medium">{title}</span>
    </div>
  );
}
