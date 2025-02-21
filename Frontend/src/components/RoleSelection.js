import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const RoleSelection = () => {
    return (
        <div className="role-container">
            <h1>Leave Management System </h1>
            <h1>Select Your Role</h1>
            <Link to="/employee-login">
                <button className="role-btn">Employee Login</button>
            </Link>
            <Link to="/admin-login">
                <button className="role-btn">Admin Login</button>
            </Link>
        </div>
    );
};

export default RoleSelection;
