import React from "react";
import { useLocation } from "react-router-dom";
import "../styles.css";

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role"); // Extract role from query params

    return (
        <div className="login-container">
            <h2> Welcome to Leave Management System {role === "admin" ? "AMS (Admin)" : "AMS (Employee)"}</h2>
            <p>Sign in to your {role} account</p>
            <input type="text" placeholder="User Name" />
            <input type="password" placeholder="Credentials" />
            <button className="sign-in-btn">Sign in</button>
            <p>
                Don't have an account? <a href="/register">Click here to register</a>
            </p>
        </div>
    );
};

export default Login;
