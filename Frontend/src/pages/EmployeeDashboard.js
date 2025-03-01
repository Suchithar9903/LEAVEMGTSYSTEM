import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "../styles.css";

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "employee") {
            navigate("/");
        }
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Welcome to Employee Dashboard</h2>
            <p>Manage your leaves and track your leave history.</p>
            
            <nav>
                <ul>
                    <li><Link to="/apply-leave">Apply for Leave</Link></li>
                    <li><Link to="/leave-status">View Leave Status</Link></li>
                    <li><Link to="/leave-history">Leave History</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default EmployeeDashboard;
