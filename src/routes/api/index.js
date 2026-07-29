const express = require("express");
const router = express.Router();

const { router: healthRouter } = require("./health");
const { router: itemsRouter } = require("./items");

// Mount all API sub-routers here
router.use("/", healthRouter);
router.use("/", itemsRouter);

module.exports = { router };