import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewEmp from "./pages/NewEmp";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory"; 
import LeaveApprovals from "./pages/LeaveApprovals";
import "./styles.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/register-employee" element={<NewEmp />} />
                <Route path="/apply-leave" element={<ApplyLeave/> }/>
                <Route path="/leave-history" element={<LeaveHistory />} />
                <Route path="/leave-approvals" element={<LeaveApprovals />} />
            </Routes>
        </Router>
    );
}

export default App;
