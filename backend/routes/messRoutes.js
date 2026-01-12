const express = require("express");
const Mess = require("../models/Mess");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/* ---------------- ADD MESS (ADMIN) ---------------- */
router.post("/add", auth, role("admin"), async (req, res) => {
  try {
    const mess = await Mess.create({
      name: req.body.name,
      location: req.body.location,
      offers: req.body.offers,
      adminId: req.user.id
    });

    res.json({ message: "Mess added successfully", mess });
  } catch (err) {
    res.status(500).json({ message: "Failed to add mess" });
  }
});

/* ---------------- GET ALL MESS (USER) ---------------- */
router.get("/all", async (req, res) => {
  const messes = await Mess.find();
  res.json(messes);
});

/* ---------------- MESS COUNT (ADMIN DASHBOARD) ---------------- */
router.get("/count", auth, role("admin"), async (req, res) => {
  const totalMess = await Mess.countDocuments();
  res.json({ totalMess });
});

module.exports = router;
