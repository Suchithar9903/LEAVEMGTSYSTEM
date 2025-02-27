import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const ApplyLeave = () => {
    const [leaveData, setLeaveData] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const [message, setMessage] = useState(""); // ✅ Success message
    const [leaveDays, setLeaveDays] = useState(0); // ✅ Track leave days excluding weekends
    const [leaveHistory, setLeaveHistory] = useState([]); // ✅ Store applied leave history

    // Handle input change
    const handleChange = (e) => {
        setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
    };

    // Function to calculate leave days excluding weekends
    const calculateLeaveDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        let count = 0;

        while (startDate <= endDate) {
            const day = startDate.getDay(); // 0 = Sunday, 6 = Saturday
            if (day !== 0 && day !== 6) {
                count++; // Count only weekdays
            }
            startDate.setDate(startDate.getDate() + 1); // Move to next day
        }
        return count;
    };

    // Auto-calculate leave days when startDate or endDate changes
    useEffect(() => {
        if (leaveData.startDate && leaveData.endDate) {
            setLeaveDays(calculateLeaveDays(leaveData.startDate, leaveData.endDate));
        }
    }, [leaveData.startDate, leaveData.endDate]);

    // Fetch leave history when the component loads
    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get("/api/leave-requests/history");
                setLeaveHistory(response.data);
            } catch (error) {
                console.error("Error fetching leave history:", error);
            }
        };
        fetchLeaveHistory();
    }, []);

    // Handle leave submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeEmail = localStorage.getItem("userEmail"); // Retrieve logged-in user's email
            
            const leaveRequest = {
                ...leaveData,
                leaveDays,
                employeeEmail // Associate leave request with employee
            };
            console.log("Submitting leave request:", leaveRequest); // 🔍 Debugging log

            // Submit leave request
            const response = await axios.post("/api/leave-requests", leaveRequest);
            console.log("Response from server:", response.data); // 🔍 Check response

            setMessage(response.data.message); // ✅ Show success message


            const historyResponse = await axios.get(`/api/leave-requests/status?email=${employeeEmail}`);
            setLeaveHistory(historyResponse.data);
    
            // ✅ Update leave history immediately
            setLeaveHistory([...leaveHistory, response.data.leaveRequest]);

            // ✅ Reset form after submission
            setLeaveData({ leaveType: "", startDate: "", endDate: "", reason: "" });
            setLeaveDays(0); // Reset leave days count

        } catch (error) {
            console.error("Error submitting leave request", error);
            setMessage("Failed to submit leave request.");
        }
    };

    return (
        <div className="form-container">
            <h2>Apply for Leave</h2>

            {message && <p className="success-message">{message}</p>} {/* ✅ Show success message */}

            <form onSubmit={handleSubmit}>
                <label>Leave Type:</label>
                <select name="leaveType" value={leaveData.leaveType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                </select>

                <label>Start Date:</label>
                <input type="date" name="startDate" value={leaveData.startDate} onChange={handleChange} required />

                <label>End Date:</label>
                <input type="date" name="endDate" value={leaveData.endDate} onChange={handleChange} required />

                <label>Reason:</label>
                <textarea name="reason" value={leaveData.reason} onChange={handleChange} required></textarea>

                <p><strong>Leave Days (Excluding Sat & Sun):</strong> {leaveDays}</p>

                <button type="submit">Submit</button>
            </form>
        
        </div>
    );
};

export default ApplyLeave;
