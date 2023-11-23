const url = JSON.parse(import.meta.env.VITE_DEV)
  ? `http://localhost:8080${import.meta.env.VITE_API_SERVER}`
  : import.meta.env.VITE_API_SERVER;

export async function sendData(data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("pin"),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert(`${data.method} Error`);
  }

  return;
}

export async function fetchLinks(param = "") {
  const response = await fetch(`${url}${param}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("pin"),
    },
  });

  if (!response.ok) {
    alert(`GET ${param + " "}Error`);
    return;
  }

  const responseBody = await response.json();
  return responseBody;
}
