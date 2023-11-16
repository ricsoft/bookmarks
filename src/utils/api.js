import { methods } from "./constants";

export async function sendData(data) {
  const response = await fetch(import.meta.env.VITE_API_SERVER, {
    method: methods.post,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert(`${data.method} Error`);
    return;
  }

  const responseBody = await response.json();
  console.log("responseBody", responseBody);
}
