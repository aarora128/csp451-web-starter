// Focused unit test for the in-memory db module (query/insert/clear).
const assert = require("assert");
const { connect, query, insert, clear } = require("../db");

(function run() {
  const db = connect();
  assert.strictEqual(db.driver, "memory");

  clear("users");
  const row = insert("users", { name: "Ada" });
  assert.strictEqual(row.name, "Ada");
  assert.strictEqual(typeof row.id, "number");

  const found = query("users", (u) => u.name === "Ada");
  assert.strictEqual(found.length, 1);

  console.log("✅ db.test.js passed");
})();