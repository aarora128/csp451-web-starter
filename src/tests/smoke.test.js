// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const { connect } = require("../db");
const { router: authRouter } = require("../routes/auth");

(function run() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  
  // Verify the auth router loaded and exposes a POST /login route
  assert.strictEqual(typeof authRouter, "function");
  const hasLoginRoute = authRouter.stack.some(
    (layer) => layer.route && layer.route.path === "/login"
  );
  assert.strictEqual(hasLoginRoute, true);
  console.log("✅ smoke.test.js passed");
})();
