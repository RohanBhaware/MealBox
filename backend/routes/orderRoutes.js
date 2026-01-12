const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  const order = await Order.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(order);
});

router.get("/admin", auth, role("admin"), async (req, res) => {
  const orders = await Order.find().populate("userId messId");
  res.json(orders);
});

router.put("/status/:id", auth, role("admin"), async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

module.exports = router;
