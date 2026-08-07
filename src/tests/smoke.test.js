// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const http = require("http");
const { connect } = require("../db");
const { router: authRouter } = require("../routes/auth");
const express = require("express");

(function testDbConnect() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js: db connect passed");
})();

function testAuthLogin() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
    const server = app.listen(0, () => {
      const { port } = server.address();

      const payload = JSON.stringify({
        email: "student@example.com",
        password: "hunter22",
      });

      const req = http.request(
        {
          hostname: "localhost",
          port,
          path: "/api/auth/login",
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
              assert.strictEqual(res.statusCode, 200);
              const parsed = JSON.parse(body);
              assert.ok(parsed.message);
              console.log("✅ smoke.test.js: /api/auth/login passed");
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

testAuthLogin().catch((err) => {
  console.error("❌ smoke.test.js: /api/auth/login failed:", err.message);
  process.exit(1);
});