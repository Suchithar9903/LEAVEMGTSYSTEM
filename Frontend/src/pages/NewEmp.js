import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const NewEmp = () => {
    const [role, setRole] = useState("employee");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); 

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register-user", {
                name,
                email,
                password,
                role,
            });

            if (response.status === 201) {
                alert(`${role} registered successfully!`);
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (error) {
            alert(error.response?.data?.error || "Registration failed");
        }
    };
    

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <h3>Register New User</h3>

            {message && <p className="message">{message}</p>}

            <form onSubmit={handleRegister}>
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
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
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
                <button className="register-btn" type="submit">
                    Register {role}
                </button>
            </form>
        </div>
    );
};

export default NewEmp;
