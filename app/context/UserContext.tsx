"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  profilePhoto?: string;
  fullName?: string;
  prefix?: string;
  designation?: string;
  affiliationHospital?: string;
  mobile?: string;
  email?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  updateUser: (data: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = "user_profile";

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* LOAD USER FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  /* ✅ UPDATE USER (SYNC HEADER + PROFILE) */
  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }
  return ctx;
};
