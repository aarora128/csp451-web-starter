const express = require("express");
const router = express.Router();

// Basic email format check reused on the server side
function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * POST /api/auth/login
 * Validates the submitted credentials and returns a stubbed result.
 * A real implementation would verify a hashed password against the DB.
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  // Stubbed success response (no real credential check yet)
  return res.json({ ok: true, user: { email } });
});

module.exports = { router };