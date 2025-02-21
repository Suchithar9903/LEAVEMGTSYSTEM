import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const EmployeeLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // In a real app, validate with the backend
        if (email && password) {
            navigate("/employee-dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <h2>Employee Login</h2>
            <input
                type="email"
                placeholder="Employee Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default EmployeeLogin;
