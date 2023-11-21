export function handlePin() {
  let pin = localStorage.getItem("pin");

  if (!pin) {
    pin = window.prompt("PIN");
    if (pin) localStorage.setItem("pin", pin);
  }
}

export function scrollToFolder() {
  const folder = document.getElementById("folder");
  if (folder && window.screen.width < 1000)
    folder.scrollIntoView({ behavior: "smooth" });
}
