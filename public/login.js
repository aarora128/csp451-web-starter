/**
 * Login form behavior.
 * feature/user-authentication: adds inline validation, loading/success/failure
 * states, and calls POST /api/auth/login.
 */
const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const submitBtn = form.querySelector("button[type=submit]");

function setState(state, text) {
  message.textContent = text || "";
  message.dataset.state = state;
  submitBtn.disabled = state === "loading";
}

function validate(email, password) {
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailPattern.test(email)) {
    errors.push("Enter a valid email address.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  return errors;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const errors = validate(email, password);
  if (errors.length > 0) {
    setState("error", errors.join(" "));
    return;
  }

  setState("loading", "Signing in...");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setState("success", data.message || "Login submitted.");
    } else {
      setState("error", data.error || "Login failed.");
    }
  } catch (err) {
    setState("error", "Network error. Please try again.");
  }
});