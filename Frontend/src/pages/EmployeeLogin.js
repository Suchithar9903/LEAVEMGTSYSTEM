import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const EmployeeLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // ✅ Prevent page reload
        
        try {
            const response = await fetch("http://localhost:5000/api/auth/login/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Employee Login Response:", data);

            if (response.ok && data?.user?.role === "employee") {
                localStorage.setItem("user",JSON.stringify(data.user));
                localStorage.setItem("token", data.token); // ✅ Store only token
                navigate("/employee-dashboard");
            } else {
                console.error("Login Failed:", data.error || "Invalid credentials");
                alert(data.error || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Employee Login</h2>
            <form onSubmit={handleLogin}>  {/* ✅ Wrap in form */}
                <input 
                    type="email" 
                    placeholder="Employee Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button className="sign-in-btn" type="submit">Login</button> {/* ✅ Submit button */}
            </form>
        </div>
    );
};

export default EmployeeLogin;
