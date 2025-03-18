import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import "../styles.css"; 

const ManagerDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "manager") {
            navigate("/");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <h2>Manager Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/leave-approvals">Manage Leave Approvals</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <h1>Welcome, {user ? user.name : "Loading...!"}!</h1>
                <p>Leave Management System</p>
            </main>
        </div>
    );
};

export default ManagerDashboard;

