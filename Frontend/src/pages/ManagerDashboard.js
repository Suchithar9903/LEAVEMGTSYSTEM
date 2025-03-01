import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const ManagerDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Welcome to Manager Dashboard</h2>
            <p>You can manage leave applications here.</p>
            
            <nav>
                <ul>
                    <li><Link to="/leave-approvals">Manage Leave Approvals</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default ManagerDashboard;
