const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { protect } = require("../middleware/authMiddleware");
const { getUserProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Register a new Employee or Manager (Admin only)     
router.post("/register-user", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // Role will be either "employee" or "manager"
        });

        await newUser.save();
        res.status(201).json({ message: `${role} registered successfully!` });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Get all users (Admin only)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Employee Login
router.post("/login/employee", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Employee not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Ensure only employees can log in through this route
        if (user.role !== "employee") {
            return res.status(403).json({ error: "Access denied. Employees only." });
        }

        const token = jwt.sign({ id: user._id, role: "employee" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ success: true, token, user });

    } catch (error) {
        console.error("Employee Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

// Manager Login
router.post("/login/manager", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Manager not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Ensure only managers can log in through this route
        if (user.role !== "manager") {
            return res.status(403).json({ error: "Access denied. Managers only." });
        }

        const token = jwt.sign({ id: user._id, role: "manager" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ success: true, token, user });

    } catch (error) {
        console.error("Manager Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

// Get user profile details
// router.get("/profile", protect, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.get("/api/auth/profile", protect, getUserProfile);

// router.get("/profile", protect, async (req, res) => {
//     res.json({ 
//         id: req.user.id, 
//         email: req.user.email, 
//         role: req.user.role 
//     });
// });

module.exports = router;
