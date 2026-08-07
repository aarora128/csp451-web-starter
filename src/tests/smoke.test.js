// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.
// Combines coverage from feature/user-authentication and feature/api-endpoints
// (resolved merge conflict — see docs/conflict-resolution-report.md).

const assert = require("assert");
const http = require("http");
const express = require("express");
const { connect } = require("../db");
const { router: authRouter } = require("../routes/auth");
const { router: apiRouter } = require("../routes/api");

(function testDbConnect() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js: db connect passed");
})();

function postJson(router, mountPath, path, payload) {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(express.json());
    app.use(mountPath, router);
    const server = app.listen(0, () => {
      const { port } = server.address();
      const body = JSON.stringify(payload);
      const req = http.request(
        {
          hostname: "localhost",
          port,
          path,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
          },
        },
        (res) => {
          let raw = "";
          res.on("data", (chunk) => (raw += chunk));
          res.on("end", () => {
            server.close();
            try {
              resolve({ status: res.statusCode, data: JSON.parse(raw) });
            } catch (err) {
              reject(err);
            }
          });
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });
  });
}

async function testAuthLogin() {
  const { status, data } = await postJson(
    authRouter,
    "/api/auth",
    "/api/auth/login",
    { email: "student@example.com", password: "hunter22" }
  );
  assert.strictEqual(status, 200);
  assert.ok(data.message);
  console.log("✅ smoke.test.js: /api/auth/login passed");
}

async function testPostItems() {
  const { status, data } = await postJson(apiRouter, "/api", "/api/items", {
    name: "Notebook",
    quantity: 3,
  });
  assert.strictEqual(status, 201);
  assert.strictEqual(data.item.name, "Notebook");
  console.log("✅ smoke.test.js: POST /api/items passed");
}

(async function run() {
  try {
    await testAuthLogin();
    await testPostItems();
  } catch (err) {
    console.error("❌ smoke.test.js failed:", err.message);
    process.exit(1);
  }
})();