const express = require("express");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const router = express.Router();

// GET /api/profile
router.get("/", (req, res) => {
  const profile = readJSON("profile.json", {});
  res.json(profile);
});

// POST /api/profile
router.post("/", (req, res) => {
  writeJSON("profile.json", req.body);
  res.json({ success: true, profile: req.body });
});

module.exports = router;
