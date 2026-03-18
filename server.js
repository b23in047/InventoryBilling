const Bill = require("./models/Bill");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Product Model
const Product = require("./models/Product");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// -------------------- ROUTES -------------------- //

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// 1️⃣ Add Product
app.post("/api/products", async (req, res) => {
  try {
    console.log("DATA RECEIVED:", req.body); // 👈 add this

    const product = new Product(req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    console.log("ERROR:", error.message); // 👈 add this
    res.status(500).json({ message: error.message });
  }
});

// 2️⃣ Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3️⃣ Update Product
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4️⃣ Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
// 🧾 Create Bill
app.post("/api/bills", async (req, res) => {
  try {
    const { customerName, items, discount = 0 } = req.body;

    let subtotal = 0;

    items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const gst = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + gst - discount;

    const bill = new Bill({
      customerName,
      items,
      subtotal,
      gst,
      discount,
      totalAmount
    });

    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});