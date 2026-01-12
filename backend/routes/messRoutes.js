const express = require("express");
const Mess = require("../models/Mess");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/add",
  auth,
  role("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, location, offers } = req.body;

      // 🔴 SAFETY CHECK
      if (!name || !location) {
        return res.status(400).json({ message: "Missing fields" });
      }

      let menu = [];
      if (req.body.menu) {
        menu = JSON.parse(req.body.menu);
      }

      const mess = await Mess.create({
        name,
        location,
        offers,
        menu,
        image: req.file ? req.file.filename : null,
        adminId: req.user.id
      });

      res.json(mess);
    } catch (err) {
      console.error("ADD MESS ERROR:", err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/stats", auth, role("admin"), async (req, res) => {
  try {
    const totalMess = await Mess.countDocuments();
    res.json({ totalMess });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mess stats" });
  }
});




router.get("/all", async (req, res) => {
  const messes = await Mess.find();
  res.json(messes);
});

router.get("/:id", async (req, res) => {
  const mess = await Mess.findById(req.params.id);
  res.json(mess);
});

module.exports = router;
