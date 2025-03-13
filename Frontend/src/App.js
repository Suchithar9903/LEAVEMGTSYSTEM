import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerLogin from "./pages/ManagerLogin";
import AdminLogin from "./pages/AdminLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewEmp from "./pages/NewEmp";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import LeaveApprovals from "./pages/LeaveApprovals";
import MyProfile from "./pages/MyProfile";
import "./styles.css";

// Private Route Component for Role-Based Access
const PrivateRoute = ({ element, role }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage
    return user && user.role === role ? element : <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<RoleSelection />} />
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/manager-login" element={<ManagerLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Protected Routes */}
                <Route path="/employee-dashboard" element={<PrivateRoute element={<EmployeeDashboard />} role="employee" />} />
                <Route path="/manager-dashboard" element={<PrivateRoute element={<ManagerDashboard />} role="manager" />} />
                <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} role="admin" />} />

                {/* Additional Protected Routes */}
                <Route path="/register-user" element={<PrivateRoute element={<NewEmp />} role="admin" />} />
                <Route path="/apply-leave" element={<PrivateRoute element={<ApplyLeave />} role="employee" />} />
                <Route path="/leave-history" element={<PrivateRoute element={<LeaveHistory />} role="employee" />} />
                <Route path="/leave-approvals" element={<PrivateRoute element={<LeaveApprovals />} role="manager" />} />
                <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
