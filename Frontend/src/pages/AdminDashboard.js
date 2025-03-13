import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import { FaUserCircle } from "react-icons/fa"; // Importing user icon

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token"); // If using JWT authentication
        navigate("/"); // Redirect to home page
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Admin Dashboard</h2>
            <p>You can add new Employees and Managers here.</p>
            
            <nav>
                <ul>
                    <li><Link to="/register-user">Register New User</Link></li>
                </ul>
            </nav>

            {/* Admin Profile Dropdown */}
            <div className="profile-container">
                <FaUserCircle className="profile-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />

                {isDropdownOpen && (
                    <div className="profile-dropdown">
                        <p><strong>Signed in as Admin</strong></p>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
