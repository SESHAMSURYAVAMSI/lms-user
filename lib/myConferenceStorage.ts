export function addToMyConferences(id: number) {
  const key = "my_conferences";
  const stored = localStorage.getItem(key);
  const list = stored ? JSON.parse(stored) : [];

  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(key, JSON.stringify(list));
  }
}
