import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const EmployeeDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "employee") {
            navigate("/");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <h2>Employee Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/apply-leave">Apply for Leave</Link></li>
                        <li><Link to="/leave-status">View Leave Status</Link></li>
                        <li><Link to="/leave-history">Leave History</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <h1>Welcome, {user ? user.name : "User 1"}!</h1>
                <p>Leave Management System</p>
            </main>
        </div>
    );
};

export default EmployeeDashboard;
