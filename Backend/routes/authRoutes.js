const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const { adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new Employee or Manager (Admin only)
router.post("/register", adminAuth, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        const existingEmployee = await Employee.findOne({ email });
        const existingManager = await Manager.findOne({ email });

        if (existingEmployee || existingManager) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (role === "employee") {
            newUser = new Employee({ name, email, password: hashedPassword, role: "employee" });
        } else if (role === "manager") {
            newUser = new Manager({ name, email, password: hashedPassword, role: "manager" });
        } else {
            return res.status(400).json({ error: "Invalid role specified" });
        }

        await newUser.save();
        res.status(201).json({ message: `${role} registered successfully!` });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Employee Login
router.post("/login/employee", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Employee.findOne({ email });
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

        const user = await Manager.findOne({ email });
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

// Get all users (Admin only)
router.get("/users", adminAuth, async (req, res) => {
    try {
        const employees = await Employee.find();
        const managers = await Manager.find();
        res.status(200).json({ employees, managers });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

module.exports = router;
