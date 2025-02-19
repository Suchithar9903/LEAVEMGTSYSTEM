import React, { useState, useEffect } from "react";

const OldLeave = () => {
    const [leaveRecords, setLeaveRecords] = useState([]);

    useEffect(() => {
        // Fetch leave records from local storage (Replace with API call for real data)
        const storedLeaves = JSON.parse(localStorage.getItem("leaveRecords")) || [];
        setLeaveRecords(storedLeaves);
    }, []);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.tableContainer}>
                <h2 style={styles.heading}>Your Leave Records</h2>
                {leaveRecords.length === 0 ? (
                    <p style={styles.noRecords}>No leave records found.</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Leave Type</th>
                                <th style={styles.th}>Start Date</th>
                                <th style={styles.th}>End Date</th>
                                <th style={styles.th}>Days</th>
                                <th style={styles.th}>Reason</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRecords.map((record, index) => (
                                <tr key={index}>
                                    <td style={styles.td}>{record.leaveType}</td>
                                    <td style={styles.td}>{record.startDate}</td>
                                    <td style={styles.td}>{record.endDate}</td>
                                    <td style={styles.td}>{record.numDays}</td>
                                    <td style={styles.td}>{record.reason}</td>
                                    <td style={{ ...styles.td, color: getStatusColor(record.status), fontWeight: "bold" }}>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

// Function to assign colors to statuses
const getStatusColor = (status) => {
    switch (status) {
        case "Approved": return "green";
        case "Rejected": return "red";
        case "Pending": return "orange";
        default: return "black";
    }
};

// Improved Styling
const styles = {
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    tableContainer: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
        textAlign: "center",
    },
    heading: {
        color: "#1e3a8a",
        marginBottom: "15px",
    },
    noRecords: {
        fontSize: "18px",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        backgroundColor: "#1e3a8a",
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
    },
    td: {
        border: "1px solid #ddd",
        padding: "8px",
    },
};

export default OldLeave;
