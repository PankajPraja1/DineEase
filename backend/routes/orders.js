const express = require("express");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const router = express.Router();

// GET /api/orders
router.get("/", (req, res) => {
  const orders = readJSON("orders.json", []);
  res.json(orders);
});

// POST /api/orders
router.post("/", (req, res) => {
  const orders = readJSON("orders.json", []);
  const newOrder = { id: Date.now(), ...req.body };
  orders.unshift(newOrder);
  writeJSON("orders.json", orders);
  res.json({ success: true, order: newOrder });
});

module.exports = router;
