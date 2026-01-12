const express = require("express");
const Mess = require("../models/Mess");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/* =========================
   ADMIN DASHBOARD STATS
========================= */
router.get("/dashboard-stats", auth, role("admin"), async (req, res) => {
  try {
    const totalMess = await Mess.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      status: "pending"
    });

    res.json({
      totalMess,
      totalOrders,
      pendingOrders
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});

module.exports = router;
