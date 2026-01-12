const express = require("express");
const Mess = require("../models/Mess");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/add", auth, role("admin"), async (req, res) => {
  const mess = await Mess.create({
    ...req.body,
    adminId: req.user.id
  });
  res.json(mess);
});

router.get("/all", async (req, res) => {
  const messes = await Mess.find();
  res.json(messes);
});

module.exports = router;
