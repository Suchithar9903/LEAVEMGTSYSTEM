const express = require("express");
const LeaveRequest = require("../models/Leave");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Function to calculate leave days excluding weekends
const calculateLeaveDays = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let count = 0;

    while (start <= end) {
        const day = start.getDay(); // 0 = Sunday, 6 = Saturday
        if (day !== 0 && day !== 6) {
            count++; // Count only weekdays
        }
        start.setDate(start.getDate() + 1);
    }
    return count;
};

// ✅ Submit a leave request (Authenticated)
router.post("/api/leave-requests", authMiddleware, async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const leaveDays = calculateLeaveDays(startDate, endDate);

        const newLeave = new LeaveRequest({
            employeeEmail: req.user.email, // Get logged-in user's email
            leaveType,
            startDate,
            endDate,
            reason,
            leaveDays, // Store calculated leave days
            status: "Approved" // ✅ Directly mark it as Approved for history
        });

        await newLeave.save();

        res.status(201).json({
            message: "Leave request submitted successfully!",
            leaveRequest: newLeave // ✅ Send saved data back
        });

    } catch (error) {
        console.error("Error submitting leave request:", error);
        res.status(500).json({ error: "Error submitting leave request" });
    }
});


// ✅ Get leave requests for the logged-in user
router.get("/leave-requests/status", authMiddleware, async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find({ employeeEmail: req.user.email });
        res.json(leaveRequests);
    } catch (error) {
        console.error("Error fetching leave status:", error);
        res.status(500).json({ error: "Error fetching leave status" });
    }
});

// ✅ Get leave history for the logged-in user (excluding pending requests)
router.get("/leave-requests/history", authMiddleware, async (req, res) => {
    try {
        const leaveHistory = await LeaveRequest.find({
            employeeEmail: req.user.email,
            status: { $ne: "Pending" }
        });

        res.json(leaveHistory);
    } catch (error) {
        console.error("Error fetching leave history:", error);
        res.status(500).json({ error: "Error fetching leave history" });
    }
});

module.exports = router;
