import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Welcome to Admin Dashboard</h2>
            <p>You can manage leave applications here.</p>
            
            <nav>
                <ul>
                    <li><Link to="/register-employee">Register New Employee</Link></li>
                    <li><Link to="/leave-approvals">Manage Leave Approvals</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
