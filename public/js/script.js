async function copyToClipboard() {
  const shortInput = document.getElementById("short");
  const btn = document.querySelector(".copy-btn");
  const originalText = btn.textContent;

  try {
    await navigator.clipboard.writeText(shortInput.value);

    btn.textContent = "Copied!";
    btn.style.background = "#38a169";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
    }, 2000);

  } catch (err) {
    console.error("Failed to copy:", err);
    btn.textContent = "Failed";
    btn.style.background = "#e53e3e";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
    }, 2000);
  }
}