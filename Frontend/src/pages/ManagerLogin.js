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
            const response = await axios.post("http://localhost:5000/api/auth/login/manager", { email, password });
    
            console.log("Login Response:", response.data); // Debugging
    
            if (response.data?.user?.role === "manager") {
                localStorage.setItem("user", JSON.stringify({
                    token: response.data.token,
                    role: response.data.user.role,
                    name: response.data.user.name,  
                    email: response.data.user.email 
                }));
    
                navigate("/manager-dashboard");
            } else {
                alert("Access denied. Managers only.");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Something went wrong. Please try again.");
        }
    };
    

    return (
        <div className="login-container">
            <h2>Manager Login</h2>
            <input type="email" placeholder="Manager Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="sign-in-btn" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default ManagerLogin;

