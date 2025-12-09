// Header.tsx
"use client";

import Image from "next/image";
// import { useRouter } from "next/navigation";
// // import { useLogin } from "../context/LoginContext"; // ✅ use context

export default function Header() {
//   const router = useRouter();
//   const { isLoggedIn, logout } = useLogin();

//   const handleLogout = () => {
//     logout(); // clears context & localStorage
//     router.push("/login");
//   };

  return (
    <header className="w-full bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/urological.png"
          alt="Logo"
          width={180}
          height={180}
        />
      </div>

      {/* Show Logout + profile only when logged in
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <Image
            src="/profile.jpeg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border"
          />
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </div>
      )} */}
    </header>
  );
}