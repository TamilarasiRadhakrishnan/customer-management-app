// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/customer_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Customer = mongoose.model("Customer", customerSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Customer Management API is running 🚀");
});

// Create customer
app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
