// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const http = require("http");
const express = require("express");
const { connect } = require("../db");
const { router: apiRouter } = require("../routes/api");

(function testDbConnect() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js: db connect passed");
})();

function testPostItems() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.json());
    app.use("/api", apiRouter);
    const server = app.listen(0, () => {
      const { port } = server.address();
      const payload = JSON.stringify({ name: "Notebook", quantity: 3 });

      const req = http.request(
        {
          hostname: "localhost",
          port,
          path: "/api/items",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload),
          },
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => {
            server.close();
            try {
              assert.strictEqual(res.statusCode, 201);
              const parsed = JSON.parse(body);
              assert.strictEqual(parsed.item.name, "Notebook");
              console.log("✅ smoke.test.js: POST /api/items passed");
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        }
      );
      req.on("error", reject);
      req.write(payload);
      req.end();
    });
  });
}

testPostItems().catch((err) => {
  console.error("❌ smoke.test.js: POST /api/items failed:", err.message);
  process.exit(1);
});