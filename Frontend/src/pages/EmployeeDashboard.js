import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const EmployeeDashboard = () => {
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
