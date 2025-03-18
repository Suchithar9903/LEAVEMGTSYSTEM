// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import ProfileDropdown from "../components/ProfileDropdown"; // Profile Icon
// import "../styles.css"; // Ensure styling is in place

// const ManagerDashboard = () => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (!storedUser || storedUser.role !== "manager") {
//             navigate("/"); // Redirect unauthorized users
//         } else {
//             setUser(storedUser);
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         navigate("/");
//     };

//     return (
//         <div>
//             {/* Header Section */}
//             <header className="flex justify-between items-center p-4 bg-white shadow">
//                 <h2 className="text-xl font-bold">Manager Dashboard</h2>
//                 <ProfileDropdown /> {/* Profile Icon in Top Right */}
//             </header>

//             {/* Dashboard Content */}
//             <div className="dashboard-container">
//                 {user && <p>Welcome, {user.name}!</p>}
//                 <p>You can manage leave applications here.</p>

//                 <nav>
//                     <ul>
//                         <li><Link to="/leave-approvals">Manage Leave Approvals</Link></li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default ManagerDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css"; 

const ManagerDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "manager") {
            navigate("/");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <h2>Manager Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/leave-approvals">Manage Leave Approvals</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
            <h1>Welcome, {user && user.name}!</h1>
            <p>Leave Management System</p>
            </main>
        </div>
    );
};

export default ManagerDashboard;
