// app/lib/myLearningStorage.ts

import { webinars } from "@/app/data/webinar/webinar";

const STORAGE_KEY = "my_learning_webinars";

export function getMyLearning() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToMyLearning(webinarId: number) {
  if (typeof window === "undefined") return;

  const existing = getMyLearning();
  if (existing.includes(webinarId)) return; // prevent duplicates

  const updated = [...existing, webinarId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isInMyLearning(webinarId: number) {
  return getMyLearning().includes(webinarId);
}

export function getMyLearningWebinars() {
  const ids = getMyLearning();
  return webinars.filter((w) => ids.includes(w.id));
}
