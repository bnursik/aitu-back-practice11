const express = require("express");
const { home } = require("../handlers/root.handler");

const router = express.Router();

router.get("/", home);

module.exports = router;
