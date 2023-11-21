const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("pin") || "",
};

export async function sendData(data) {
  const response = await fetch(import.meta.env.VITE_API_SERVER, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert(`${data.method} Error`);
  }

  return;
}

export async function fetchLinks(param = "") {
  const response = await fetch(`${import.meta.env.VITE_API_SERVER}${param}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    alert(`GET ${param + " "}Error`);
    return;
  }

  const responseBody = await response.json();
  return responseBody;
}
