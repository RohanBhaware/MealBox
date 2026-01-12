const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess"
  },
  items: [String],
  totalPrice: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
