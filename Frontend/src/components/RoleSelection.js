import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const RoleSelection = () => {
    return (
        <div className="page-container">
            {/* Full-width header */}
            <header className="header">
                <h3>Welcome..</h3>
                <h1>Leave Management System</h1>
            </header>

            {/* Content below the header */}
            <main className="content">
                <h1>Select Your Role</h1>
                <div className="role-container">
                    <Link to="/employee-login">
                        <button className="role-btn">Employee Login</button>
                    </Link>
                    <Link to="/manager-login">
                        <button className="role-btn">Manager Login</button>
                    </Link>
                    <Link to="/admin-login">
                        <button className="role-btn">Admin Login</button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default RoleSelection;
