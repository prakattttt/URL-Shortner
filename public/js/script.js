async function copyToClipboard() {
  const shortInput = document.getElementById("short");
  const btn = document.querySelector(".copy-btn");
  const originalText = btn ? btn.textContent : "Copy";

  if (!shortInput) return;

  try {
    await navigator.clipboard.writeText(shortInput.value);

    if (btn) {
      btn.textContent = "Copied!";
      btn.style.background = "#38a169";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
      }, 2000);
    }
  } catch (err) {
    console.error("Failed to copy:", err);
    if (btn) {
      btn.textContent = "Failed";
      btn.style.background = "#e53e3e";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
      }, 2000);
    }
  }
}

function setupDatabaseToggle() {
  const dbLink = document.getElementById("showDatabase") || document.querySelector(".nav-link");
  const databaseSection = document.getElementById("database");
  if (!dbLink || !databaseSection) return;

  dbLink.addEventListener("click", (e) => {
    e.preventDefault();
    databaseSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupShortenForm() {
  const form = document.getElementById("shortenForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const input = form.querySelector('input[name="fullUrl"]');
    const val = input ? input.value.trim() : "";
    if (!val) {
      e.preventDefault();
      showTempMessage("Please enter a URL.", true);
      return;
    }
    const urlPattern = /^(https?:\/\/)/i;
    if (!urlPattern.test(val)) {
      e.preventDefault();
      showTempMessage("Please include the protocol (http:// or https://).", true);
      return;
    }
  });
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
    box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    document.body.appendChild(box);
  }
  box.textContent = msg;
  box.style.background = isError ? "#f56565" : "#48bb78";
  box.style.color = "#fff";
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

function showServerFlash() {
  const flashEl = document.getElementById("server-flash");
  if (!flashEl) return;

  const errors = flashEl.dataset.errors ? JSON.parse(flashEl.dataset.errors) : [];
  const success = flashEl.dataset.success ? JSON.parse(flashEl.dataset.success) : [];

  if (errors && errors.length) {
    errors.forEach((m) => showTempMessage(m, true));
  }
  if (success && success.length) {
    success.forEach((m) => showTempMessage(m, false));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupDatabaseToggle();
  setupShortenForm();
  showServerFlash();
});

window.copyToClipboard = copyToClipboard;
