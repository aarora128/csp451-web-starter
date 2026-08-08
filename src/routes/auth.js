/**
 * Auth routes (stub).
 * feature/user-authentication: POST /api/auth/login.
 * NOTE: This is a teaching stub — it validates shape/length only, not a
 * real credential store. No plaintext passwords are logged or persisted.
 */
const express = require("express");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });
  }

  // Stub: pretend the credentials checked out. Replace with a real
  // authentication/session step in a later checkpoint.
  return res.status(200).json({
    message: "Login accepted (stub) — no session was created.",
  });
});

module.exports = { router };
