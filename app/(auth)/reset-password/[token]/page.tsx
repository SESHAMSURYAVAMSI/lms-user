"use client";

import { useParams } from "next/navigation";
import ResetPasswordForm  from "@/app/components/auth/ResetPasswordForm";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ResetPasswordForm token={token} />
    </div>
  );
}
