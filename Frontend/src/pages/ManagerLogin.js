import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const ManagerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login/manager", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Manager Login Response:", data);

            if (response.ok && data.user.role === "manager") {
                localStorage.setItem("user", JSON.stringify({ role: "manager", token: data.token }));
                navigate("/manager-dashboard");
            } else {
                alert("Access denied. Managers only.");
            }
        } catch (error) {
            console.error("Manager login error:", error);
            alert("Something went wrong. Check console.");
        }
    };

    return (
        <div className="login-container">
            <h2>Manager Login</h2>
            <input type="email" placeholder="Manager Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="sign-in-btn" onClick={handleLogin}>Sign in</button>
        </div>
    );
};

export default ManagerLogin;

