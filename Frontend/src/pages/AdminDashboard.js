// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles.css";
// import { FaUserCircle } from "react-icons/fa"; // Importing user icon

// const AdminDashboard = () => {
//     const navigate = useNavigate();
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const handleLogout = () => {
//         localStorage.removeItem("token"); // If using JWT authentication
//         navigate("/"); // Redirect to home page
//     };

//     return (
//         <div className="dashboard-container">
//             <h2>Welcome to Admin Dashboard</h2>
//             <p>You can add new Employees and Managers here.</p>
            
//             <nav>
//                 <ul>
//                     <li><Link to="/register-user">Register New User</Link></li>
//                 </ul>
//             </nav>

//             {/* Admin Profile Dropdown */}
//             <div className="profile-container">
//                 <FaUserCircle className="profile-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />

//                 {isDropdownOpen && (
//                     <div className="profile-dropdown">
//                         <p><strong>Signed in as Admin</strong></p>
//                         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user")); // Fetch admin details

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/"); // Redirect to home page
    };

    return (
        <div className="admin-dashboard">
            {/* Header Section */}
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-info">
                    <p><strong>Signed in as:</strong> {storedUser?.email} ({storedUser?.role})</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="admin-content">
                <h2>Welcome to Admin Dashboard</h2>
                <p>You can add new Employees and Managers here.</p>

                <nav>
                    <ul>
                        <li><Link to="/register-user" className="admin-link">Register New User</Link></li>
                    </ul>
                </nav>
            </main>
        </div>
    );
};

export default AdminDashboard;

