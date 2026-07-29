const express = require("express");
const router = express.Router();

const { router: healthRouter } = require("./health");

// Mount all API sub-routers here
router.use("/", healthRouter);

module.exports = { router };