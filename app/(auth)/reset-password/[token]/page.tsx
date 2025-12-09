"use client"; // <-- Make it a Client Component

import { useParams } from "next/navigation"; // Import the hook
import { ResetPasswordForm } from "@/app/components/auth/ResetPasswordForm";
import { Loader2 } from "lucide-react"; // For loading state while params load

export default function ResetPasswordPage() {
  const params = useParams(); // Get params using the hook
  const token = params.token as string; // Extract the token

  // Optional: Add a loading state until the token is available
  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Pass the token from the hook to the form component */}
      <ResetPasswordForm token={token} />
    </div>
  );
}