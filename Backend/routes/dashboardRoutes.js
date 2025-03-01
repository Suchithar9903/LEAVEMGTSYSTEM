const express = require("express");
const { employeeAuth, managerAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Employee Dashboard - Only employees can access
router.get("/dashboard/employee", employeeAuth, (req, res) => {
    res.json({ message: "Welcome to Employee Dashboard", user: req.user });
});

// Manager Dashboard - Only managers can access
router.get("/dashboard/manager", managerAuth, (req, res) => {
    res.json({ message: "Welcome to Manager Dashboard", user: req.user });
});

module.exports = router;
