const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const Manager = require("../models/Manager");

// Employee Authentication Middleware
const employeeAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Access denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded.id);

        if (!employee || decoded.role !== "employee") {
            return res.status(403).json({ error: "Unauthorized: Employees only" });
        }

        req.user = employee;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Manager Authentication Middleware
const managerAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Access denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id);

        if (!manager || decoded.role !== "manager") {
            return res.status(403).json({ error: "Unauthorized: Managers only" });
        }

        req.user = manager;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Admin Authentication Middleware
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Access denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized: Admins only" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { employeeAuth, managerAuth, adminAuth };
