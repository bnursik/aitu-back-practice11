const express = require("express");

const { healthHandler, versionHandler } = require("../handlers/meta.handler");

const router = express.Router();

router.get("/version", versionHandler);
router.get("/health", healthHandler);

module.exports = router;
