import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const LeaveApprovals = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            const response = await axios.get("/api/leave-requests");
            setLeaveRequests(response.data);
        } catch (error) {
            console.error("Error fetching leave requests", error);
        }
    };

    const handleApproval = async (id, status) => {
        try {
            await axios.put(`/api/leave-requests/${id}`, { status });
            fetchLeaveRequests();
        } catch (error) {
            console.error("Error updating leave request", error);
        }
    };

    return (
        <div className="leave-approvals-container">
            <h2>Leave Approvals</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.employeeName}</td>
                            <td>{request.leaveType}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === "Pending" && (
                                    <>
                                        <button onClick={() => handleApproval(request._id, "Approved")} className="approve-btn">Approve</button>
                                        <button onClick={() => handleApproval(request._id, "Rejected")} className="reject-btn">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveApprovals;
