const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availableToday: Boolean
});

const messSchema = new mongoose.Schema({
  name: String,
  location: String,
  offers: String,
  image: String, // image path
  menu: [menuSchema], // FULL MENU
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Mess", messSchema);
