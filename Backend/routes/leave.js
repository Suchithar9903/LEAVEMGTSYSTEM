const express = require("express");
const Leave = require("../models/Leave");
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
  } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
  }
};

// Submit Leave Application
router.post("/", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    res.status(500).json({ message: "Error submitting leave request", error });
  }
});

// Get Leave History for a User
router.get("/:userId", async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.params.userId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave history", error });
  }
});

router.post('/apply', authenticate, async (req, res) => {
  const { startDate, endDate, reason } = req.body;
  try {
      const leave = new Leave({ userId: req.user.id, startDate, endDate, reason });
      await leave.save();
      res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
      res.status(400).json({ error: 'Error applying leave' });
  }
});

router.get('/status', authenticate, async (req, res) => {
  try {
      const leaves = await Leave.find({ userId: req.user.id });
      res.json(leaves);
  } catch (error) {
      res.status(400).json({ error: 'Error retrieving leave status' });
  }
});

router.get('/requests', authenticate, async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ error: 'Access denied' });
  try {
      const leaves = await Leave.find({ status: 'pending' }).populate('userId', 'name email');
      res.json(leaves);
  } catch (error) {
      res.status(400).json({ error: 'Error retrieving leave requests' });
  }
});

router.post('/approve/:userId', authenticate, async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ error: 'Access denied' });
  try {
      await Leave.findByIdAndUpdate(req.params.id, { status: 'approved' });
      res.json({ message: 'Leave approved' });
  } catch (error) {
      res.status(400).json({ error: 'Error approving leave' });
  }
});

router.post('/reject/:userId', authenticate, async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ error: 'Access denied' });
  try {
      await Leave.findByIdAndUpdate(req.params.id, { status: 'rejected' });
      res.json({ message: 'Leave rejected' });
  } catch (error) {
      res.status(400).json({ error: 'Error rejecting leave' });
  }
});

module.exports = router;

