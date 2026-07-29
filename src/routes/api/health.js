const express = require("express");
const router = express.Router();

// GET /api/health — simple liveness check
router.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

module.exports = { router };