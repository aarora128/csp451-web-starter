/**
 * Items routes.
 * feature/api-endpoints: GET /api/items, POST /api/items with validation.
 *
 * Uses a small local in-memory list so this branch is self-contained and
 * testable on its own. Once merged with feature/database-connection, this
 * can be swapped to call query()/insert() from src/db instead.
 */
const express = require("express");

const router = express.Router();
const items = [];

router.get("/items", (req, res) => {
  res.json({ items });
});

router.post("/items", (req, res) => {
  const { name, quantity } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "'name' is required." });
  }
  if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
    return res
      .status(400)
      .json({ error: "'quantity' must be a non-negative number." });
  }

  const item = { id: items.length + 1, name: name.trim(), quantity: quantity ?? 1 };
  items.push(item);
  res.status(201).json({ item });
});

module.exports = { router };
