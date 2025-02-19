import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token"); // Check authentication
        if (!token) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, []);

    return (
        <div style={styles.container}>
            <h1>Employee Dashboard</h1>
            <div style={styles.links}>
                <Link to="/applyleave" style={styles.button}>Apply for Leave</Link>
                <Link to="/OldLeave" style={styles.button}>See Old Leave Records</Link>
            </div>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "40px" },
    links: { marginTop: "30px" },
    button: { 
        display: "block", 
        margin: "10px auto", 
        padding: "10px 20px", 
        background: "#007bff", 
        color: "white", 
        textDecoration: "none",
        borderRadius: "5px",
        width: "200px",
        textAlign: "center"
    }
};

export default Dashboard;
