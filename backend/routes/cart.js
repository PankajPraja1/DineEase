const express = require("express");
const router = express.Router();

// Temporary in-memory cart (no file storage yet)
let cart = [];

// GET /api/cart
router.get("/", (req, res) => {
  res.json(cart);
});

// POST /api/cart
router.post("/", (req, res) => {
  const item = req.body;
  cart.push(item);
  res.json({ success: true, cart });
});

// DELETE /api/cart/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  cart = cart.filter((item) => item.id != id);
  res.json({ success: true, cart });
});

module.exports = router;
