import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const LeaveHistory = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);

    useEffect(() => {
        fetchLeaveHistory();
    }, []);

    const fetchLeaveHistory = async () => {
        try {
            const response = await axios.get("/api/leave-requests/history");
            setLeaveHistory(response.data);
        } catch (error) {
            console.error("Error fetching leave history", error);
        }
    };

    return (
        <div className="history-container">
            <h2>Leave History</h2>
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
                    {leaveHistory.map((record) => (
                        <tr key={record._id}>
                            <td>{record.leaveType}</td>
                            <td>{record.startDate}</td>
                            <td>{record.endDate}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveHistory;
