const express = require("express");
const cors = require("cors");
const path = require("path");

const menuRoutes = require("./routes/menu");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const profileRoutes = require("./routes/profile");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/profile", profileRoutes);

// Serve frontend (optional if using same server for both)
app.use(express.static(path.join(__dirname, "../frontend")));

// Fallback for SPA routing
app.get(/.*/, (req, res) =>  {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
