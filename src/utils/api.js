import { methods } from "./constants";

export async function sendData(data) {
  const response = await fetch(import.meta.env.VITE_API_SERVER, {
    method: methods.post,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert(`${data.method} Error`);
  }

  return;
}

export async function fetchLinks() {
  const response = await fetch(import.meta.env.VITE_API_SERVER, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("GET Error");
    return;
  }

  const responseBody = await response.json();
  return responseBody;
}
