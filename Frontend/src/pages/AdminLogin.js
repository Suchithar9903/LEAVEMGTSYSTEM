import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "admin" && password === "admin123") {
            navigate("/admin-dashboard");
        } else {
            alert("Invalid Admin Credentials");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <input
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="sign-in-btn" onClick={handleLogin}>
                Sign in
            </button>
        </div>
    );
};

export default AdminLogin;
