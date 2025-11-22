async function copyToClipboard() {
  const shortInput = document.getElementById("short");
  const btn = document.querySelector(".copy-btn");
  if (!shortInput || !btn) return;

  const original = btn.textContent;

  try {
    await navigator.clipboard.writeText(shortInput.value);
    btn.textContent = "Copied!";
    btn.style.background = "#38a169";
  } catch (err) {
    btn.textContent = "Failed";
    btn.style.background = "#e53e3e";
  }

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = "";
  }, 2000);
}

function showTempMessage(msg, isError = false) {
  let box = document.getElementById("tempMessageBox");

  if (!box) {
    box = document.createElement("div");
    box.id = "tempMessageBox";
    box.style.position = "fixed";
    box.style.top = "10px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.padding = "10px 16px";
    box.style.borderRadius = "6px";
    box.style.zIndex = 9999;
    box.style.color = "#fff";
    box.style.fontSize = "15px";
    document.body.appendChild(box);
  }

  box.style.background = isError ? "#f56565" : "#48bb78";
  box.textContent = msg;
  box.style.display = "block";

  setTimeout(() => (box.style.display = "none"), 3000);
}

function showServerFlash() {
  const flash = document.getElementById("server-flash");
  if (!flash) return;

  const errors = JSON.parse(flash.dataset.errors || "[]");
  const success = JSON.parse(flash.dataset.success || "[]");

  errors.forEach((msg) => showTempMessage(msg, true));
  success.forEach((msg) => showTempMessage(msg, false));
}

document.addEventListener("DOMContentLoaded", showServerFlash);

window.copyToClipboard = copyToClipboard;
