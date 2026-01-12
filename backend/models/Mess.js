const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
  name: String,
  location: String,
  offers: String,
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Mess", messSchema);
