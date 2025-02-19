const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");
const leave = require("./routes/leave");
const User = require("./models/User");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to access backend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Login Route
app.post("/api/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/leaves", leave);

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Leave Management System API" });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
