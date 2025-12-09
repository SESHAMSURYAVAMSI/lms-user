import { useEffect, useState } from "react";

export function useRegisteredEvents() {
  const [registered, setRegistered] = useState<string[]>([]);

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem("registeredEvents");
    if (saved) setRegistered(JSON.parse(saved));
  }, []);

  // Save on update
  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registered));
  }, [registered]);

  const register = (id: string) => setRegistered(rs => rs.includes(id) ? rs : [...rs, id]);
  const isRegistered = (id: string) => registered.includes(id);
  return { isRegistered, register };
}
