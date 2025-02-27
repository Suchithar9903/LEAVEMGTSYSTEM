const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // For user reference
    employeeEmail: { type: String, required: true },  // Email of the employee
    leaveType: { type: String, required: true },  // Type of leave (optional in original Leave schema)
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    leaveDays: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Leave", LeaveSchema);
