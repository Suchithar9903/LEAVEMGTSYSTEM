const express = require("express");
const Leave = require("../models/Leave");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/apply", authMiddleware, async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    const leave = new Leave({ user: req.user.id, startDate, endDate, reason });
    
    try {
        await leave.save();
        res.status(201).json({ message: "Leave applied successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/history", authMiddleware, async (req, res) => {
    const leaves = await Leave.find({ user: req.user.id });
    res.json(leaves);
});

module.exports = router;
