import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const LeaveStatus = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        fetchLeaveStatus();
    }, []);

    const fetchLeaveStatus = async () => {
        try {
            const response = await axios.get("/api/leave-requests/status");
            setLeaveRequests(response.data);
        } catch (error) {
            console.error("Error fetching leave status", error);
        }
    };

    return (
        <div className="status-container">
            <h2>Leave Status</h2>
            <table>
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.leaveType}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveStatus;
