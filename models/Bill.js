const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  subtotal: Number,
  gst: Number,
  discount: Number,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", billSchema);