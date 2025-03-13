require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Ensure MONGO_URI is set
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
