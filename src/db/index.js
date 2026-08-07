/**
 * Database module.
 * feature/database-connection: in-memory store, env-driven config,
 * and a small query/insert API standing in for a real driver.
 */

const config = {
  url: process.env.DB_URL || "memory://local",
  pool: Number(process.env.DB_POOL || 4),
};

const store = new Map();

function connect() {
  return { connected: true, driver: "memory", config };
}

function query(table, predicate = () => true) {
  const rows = store.get(table) || [];
  return rows.filter(predicate);
}

function insert(table, row) {
  if (!row || typeof row !== "object") {
    throw new TypeError("insert() requires a row object");
  }
  if (!store.has(table)) store.set(table, []);
  const record = { id: store.get(table).length + 1, ...row };
  store.get(table).push(record);
  return record;
}

function clear(table) {
  store.delete(table);
}

module.exports = { connect, query, insert, clear, config };