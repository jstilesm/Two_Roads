// Load Data from JSON file

export async function loadData() {
  const res = await fetch('/data.json');
  const data = await res.json();
  return data;
}