import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyForLeave } from "../redux/leaveSlice";

const LeaveForm = () => {
  const dispatch = useDispatch();
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(applyForLeave(leaveData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Leave</h2>
      <label>Leave Type:</label>
      <select name="leaveType" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="sick">Sick Leave</option>
        <option value="casual">Casual Leave</option>
      </select>

      <label>Start Date:</label>
      <input type="date" name="startDate" onChange={handleChange} required />

      <label>End Date:</label>
      <input type="date" name="endDate" onChange={handleChange} required />

      <label>Reason:</label>
      <textarea name="reason" onChange={handleChange} required></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LeaveForm;
