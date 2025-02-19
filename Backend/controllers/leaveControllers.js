const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    const newLeave = new Leave({
      user: req.user.id,
      startDate,
      endDate,
      reason,
      status: "pending",
    });

    await newLeave.save();
    res.json({ message: "Leave request submitted successfully", leave: newLeave });
  } catch (error) {
    res.status(500).json({ message: "Error submitting leave request" });
  }
};

exports.getUserLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leaves = await Leave.find().populate("user", "name email");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leave.status = status;
    leave.manager = req.user.id;
    await leave.save();

    res.json({ message: `Leave request ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: "Error updating leave status" });
  }
};
