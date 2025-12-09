"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ProfileData } from "@/app/types/profile"; // Adjust path if needed

interface UserContextType {
  user: ProfileData | null;
  loading: boolean;
  error: string | null;
  setUser: (user: ProfileData | null) => void; // <-- ADD THIS FUNCTION
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token"); // Ensure this is the correct key
        if (!token) {
          // No need to throw an error, just means user is not logged in.
          // The header can show a default state.
          setLoading(false);
          return;
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await fetch(`${backendUrl}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.error || "Failed to parse user data.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // The value now includes the 'setUser' function
  const value = { user, loading, error, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

