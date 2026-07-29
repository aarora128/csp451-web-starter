const express = require("express");
const router = express.Router();

// Simple in-memory list of items for the checkpoint
const items = [];

// GET /api/items — return all items
router.get("/items", (req, res) => {
  res.json({ count: items.length, items });
});

// POST /api/items — add a new item with input validation
router.post("/items", (req, res) => {
  const { name, quantity } = req.body || {};

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Field 'name' is required." });
  }

  // Validate quantity (must be a positive number)
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ error: "Field 'quantity' must be a positive integer." });
  }

  const item = { id: items.length + 1, name: name.trim(), quantity: qty };
  items.push(item);
  return res.status(201).json({ ok: true, item });
});

module.exports = { router };