import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const NewEmp = () => {
    const [role, setRole] = useState("employee");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            console.log("Sending request:", { name, email, password, role });
    
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                role,
            });
    
            console.log("Response received:", response.data);
    
            if (response.status === 201) {
                alert(`${role} registered successfully!`);
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data?.error);
            alert(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <h3>Register New User</h3>

            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
            </select>

            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register-btn" onClick={handleRegister}>
                Register {role}
            </button>
        </div>
    );
};

export default NewEmp;
