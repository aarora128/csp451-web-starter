/**
 * Database module (starter stub).
 *
 * Feature branch: feature/database-connection should implement:
 * - connect()
 * - a config pattern using environment variables
 * - a simple query function OR a client getter
 *
 * You may use:
 * - a "fake" in-memory database for the checkpoint, OR
 * - SQLite, OR
 * - MongoDB/Postgres (optional) — keep setup simple
 */

// Read settings from environment variables, with fallbacks
const config = {
  url: process.env.DB_URL || "memory://local",
  pool: Number(process.env.DB_POOL || 4),
};

// In-memory store: each "table" is a key holding an array of rows
const store = new Map();

// Simulate opening a database connection
function connect() {
  return { connected: true, driver: "memory", config };
}

// Return rows from a table that match an optional filter
function query(table, predicate = () => true) {
  const rows = store.get(table) || [];
  return rows.filter(predicate);
}

// Add a row into a table (creates the table if it doesn't exist)
function insert(table, row) {
  if (!store.has(table)) store.set(table, []);
  store.get(table).push(row);
  return row;
}

module.exports = { connect, query, insert, config };
