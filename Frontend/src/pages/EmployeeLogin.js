import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const EmployeeLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Employee Login Response:", data);

            if (response.ok && data.user.role === "employee") {
                localStorage.setItem("user", JSON.stringify({ role: "employee", token: data.token }));
                navigate("/employee-dashboard");
            } else {
                alert("Access denied. Employees only.");
            }
        } catch (error) {
            console.error("Employee login error:", error);
            alert("Something went wrong. Check console.");
        }
    };

    return (
        <div className="login-container">
            <h2>Employee Login</h2>
            <input type="email" placeholder="Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="sign-in-btn" onClick={handleLogin}>Login </button>
        </div>
    );
};

export default EmployeeLogin;