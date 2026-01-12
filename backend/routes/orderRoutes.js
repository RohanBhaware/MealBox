const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/* =========================
   USER: CREATE ORDER
========================= */
router.post("/create", auth, async (req, res) => {
  try {
    const { messId, items, totalPrice } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      messId,
      items,
      totalPrice
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* =========================
   USER: MY ORDERS
========================= */
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("messId", "name location");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch orders" });
  }
});

/* =========================
   ADMIN: ALL ORDERS
========================= */
router.get("/admin", auth, role("admin"), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("messId", "name location");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch admin orders" });
  }
});

/* =========================
   ADMIN: UPDATE STATUS
========================= */
router.put("/status/:id", auth, role("admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
});

module.exports = router;
