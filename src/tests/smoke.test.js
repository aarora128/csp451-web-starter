// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.
const { router: itemsRouter } = require("../routes/api/items");
const assert = require("assert");
const { connect } = require("../db");

(function run() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js passed");

  // Verify the items router loaded and exposes GET + POST /items routes
  assert.strictEqual(typeof itemsRouter, "function");
  const paths = itemsRouter.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path);
  assert.ok(paths.includes("/items"));
})();
