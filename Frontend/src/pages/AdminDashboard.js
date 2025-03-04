import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Welcome to Admin Dashboard</h2>
            <p>You can add new Employee and New Managers here.</p>
            
            <nav>
                <ul>
                    <li><Link to="/register-user">Register New User</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
