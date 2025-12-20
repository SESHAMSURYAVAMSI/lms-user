// /lib/myWorkshopStorage.ts
export function addToMyWorkshops(id: number) {
  const key = "my_workshops";
  const stored = JSON.parse(localStorage.getItem(key) || "[]");

  if (!stored.includes(id)) {
    stored.push(id);
    localStorage.setItem(key, JSON.stringify(stored));
  }
}
