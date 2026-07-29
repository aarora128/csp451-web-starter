/**
 * Starter login behavior (minimal).
 * Feature branch: feature/user-authentication should add:
 * - better validation (inline errors)
 * - UI feedback states (loading, success, failure)
 * - optional: call an API endpoint (e.g., POST /api/auth/login)
 */
const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = form.querySelector("button[type='submit']");

// Simple email format check
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Show a status message with a state class for styling
function setMessage(text, state) {
  message.textContent = text;
  message.className = state ? `muted ${state}` : "muted";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Inline validation with specific error messages
  if (!isValidEmail(email)) {
    setMessage("Please enter a valid email address.", "error");
    return;
  }
  if (password.length < 6) {
    setMessage("Password must be at least 6 characters.", "error");
    return;
  }

  // Loading feedback state
  setMessage("Signing in...", "loading");
  button.disabled = true;

  // Simulate an async auth attempt (would call POST /api/auth/login)
  setTimeout(() => {
    button.disabled = false;
    setMessage("Login validated on the client. Ready to call the API.", "success");
  }, 600);
});
