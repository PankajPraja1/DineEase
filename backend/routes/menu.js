const express = require("express");
const { readJSON } = require("../utils/fileHandler");
const router = express.Router();

// GET /api/menu
router.get("/", (req, res) => {
  const menu = readJSON("menu.json", []);
  res.json(menu);
});

module.exports = router;
