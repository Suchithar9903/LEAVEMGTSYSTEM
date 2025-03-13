import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown"; 

const EmployeeDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "employee") {
            navigate("/"); 
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <h2 className="text-xl font-bold">Employee Dashboard</h2>
                
                {/* Profile icon positioned at the top-right */}
                <div className="relative">
                    <ProfileDropdown />
                </div>
            </header>

            {/* Main Dashboard Content */}
            <div className="p-6">
                {user && <p className="text-lg font-semibold">Welcome, {user.name}!</p>}

                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li><Link to="/apply-leave" className="text-blue-600 hover:underline">Apply for Leave</Link></li>
                        <li><Link to="/leave-status" className="text-blue-600 hover:underline">View Leave Status</Link></li>
                        <li><Link to="/leave-history" className="text-blue-600 hover:underline">Leave History</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default EmployeeDashboard;


