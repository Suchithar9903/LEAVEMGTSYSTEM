import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthForm from "./components/AuthForm";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import OldLeave from "./pages/OldLeave";
import "./app.css"; // Import CSS for styling
import "./dashboard.css";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const location = useLocation();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/auth/:role" element={<AuthOptions />} />
                <Route path="/login/:role" element={<Login />} />
                <Route path="/register/:role" element={<Register />} />
                <Route path="/login" element={<AuthForm isLogin={true} />} />
                <Route path="/register" element={<AuthForm isLogin={false} />} />
                <Route path="/authform" element={<AuthForm />} />
                <Route path="/employeedashboard" element={<EmployeeDashboard />} />
                <Route path="/applyleave" element={<ApplyLeave />} />
                <Route path="/oldleave" element={<OldLeave />} />
            </Routes>
        </div>
    );
}

// ✅ Step 1: Role Selection Page
const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="role-selection">
            <h1 className="title">LEAVE MANAGEMENT SYSTEM</h1>
            <h2>Select Your Role</h2>
            <div className="nav-buttons">
                <button className="nav-button" onClick={() => navigate("/auth/employee")}>Employee</button>
                <button className="nav-button" onClick={() => navigate("/auth/management")}>Management</button>
            </div>
        </div>
    );
};

// ✅ Step 2: Show Login & Register After Selecting Role
const AuthOptions = () => {
    const location = useLocation();
    const role = location.pathname.split("/")[2]; // Extracts role from URL
    const navigate = useNavigate();

    return (
        <div className="auth-selection">
            <h2>{role === "management" ? "Management Portal" : "Employee Portal"}</h2>
            <div className="nav-buttons">
                <button className="nav-button" onClick={() => navigate(`/login/${role}`)}>Login</button>
                <button className="nav-button" onClick={() => navigate(`/register/${role}`)}>Register</button>
            </div>
        </div>
    );
};

export default App;
