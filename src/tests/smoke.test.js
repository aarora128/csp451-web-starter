// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const { connect, insert, query } = require("../db");

(function run() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  // Verify insert + query work together
  insert("users", { id: 1, name: "Alice" });
  insert("users", { id: 2, name: "Bob" });
  const all = query("users");
  assert.strictEqual(all.length, 2);
  const bob = query("users", (u) => u.name === "Bob");
  assert.strictEqual(bob.length, 1);
  assert.strictEqual(bob[0].id, 2);
  console.log("✅ smoke.test.js passed");
})();
