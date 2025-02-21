import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles.css";

const Register = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role"); // Extract role from query params

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${role} registered:`, formData);
        // Here, add API call logic to register the user
    };

    return (
        <div className="login-container">
            <h1>Create an Account</h1>
            <p>Register as {role === "admin" ? "Admin" : "Employee"} to access the Leave Management System</p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="signin-btn">Register</button>
            </form>

            <p className="register-link">
                Already have an account? <Link to={`/login?role=${role}`}>Click here to login</Link>
            </p>
        </div>
    );
};

export default Register;
