import React, { useState } from "react";

const ApplyLeave = () => {
    const [leaveType, setLeaveType] = useState("Casual");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [numDays, setNumDays] = useState(0);

    // Calculate leave days when dates change
    const calculateLeaveDays = (start, end) => {
        if (start && end) {
            const startD = new Date(start);
            const endD = new Date(end);
            const diffTime = endD - startD;
            const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
            setNumDays(diffDays > 0 ? diffDays : 0);
        } else {
            setNumDays(0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (numDays <= 0) {
            alert("End date must be after start date!");
            return;
        }

        const leaveRecord = {
            leaveType,
            startDate,
            endDate,
            reason,
            numDays,
        };

        // Save to local storage (simulate storing the leave record)
        let storedLeaves = JSON.parse(localStorage.getItem("leaveRecords")) || [];
        storedLeaves.push(leaveRecord);
        localStorage.setItem("leaveRecords", JSON.stringify(storedLeaves));

        alert("Leave Applied Successfully!");
        setLeaveType("Casual");
        setStartDate("");
        setEndDate("");
        setReason("");
        setNumDays(0);
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Apply Leave Form</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Leave Type:</label>
                    <select style={styles.input} value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                        <option value="Casual">Casual</option>
                        <option value="Sick">Sick</option>
                        <option value="Annual">Annual</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Other">Other</option>
                    </select>

                    <label style={styles.label}>Start Date:</label>
                    <input type="date" style={styles.input} value={startDate} onChange={(e) => { setStartDate(e.target.value); calculateLeaveDays(e.target.value, endDate); }} required />

                    <label style={styles.label}>End Date:</label>
                    <input type="date" style={styles.input} value={endDate} onChange={(e) => { setEndDate(e.target.value); calculateLeaveDays(startDate, e.target.value); }} required />

                    <label style={styles.label}>Reason:</label>
                    <textarea style={styles.textarea} value={reason} onChange={(e) => setReason(e.target.value)} required />

                    <p style={styles.numDays}><strong>Number of Days:</strong> {numDays}</p>

                    <button type="submit" style={styles.button}>Apply for Leave</button>
                </form>
            </div>
        </div>
    );
};

// Improved CSS styles
const styles = {
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e3a8a", // Dark blue background
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
        textAlign: "center",
    },
    heading: {
        color: "#1e3a8a",
        marginBottom: "15px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: "20px",
        color: "#1e3a8a",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    textarea: {
        width: "100%",
        height: "80px",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        resize: "none",
    },
    numDays: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1e3a8a",
    },
    button: {
        backgroundColor: "#1e3a8a",
        color: "#fff",
        padding: "10px 15px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
    buttonHover: {
        backgroundColor: "#163172",
    }
};

export default ApplyLeave;
