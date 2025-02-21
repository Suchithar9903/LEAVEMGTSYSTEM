import React, { useState } from "react";
import "../styles.css";

const AdminDashboard = () => {
    const [role, setRole] = useState("employee");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        alert(`New ${role} registered: ${name}, ${email}`);
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <h3>Register New User</h3>

            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
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

export default AdminDashboard;
