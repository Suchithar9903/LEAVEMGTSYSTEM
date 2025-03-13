import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure proper CSS

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="profile-dropdown-container">
            {/* Profile Icon */}
            <FaUserCircle 
                className="profile-icon" 
                onClick={() => setIsOpen(!isOpen)} 
            />

            {/* Dropdown Menu */}
            {isOpen && user && (
                <div className="profile-dropdown">
                    <p className="signed-in-text">Signed in as</p>
                    <p className="user-info"><strong>{user.name}</strong></p>
                    <p className="user-email">{user.email}</p>
                    <hr />
                    <ul>
                        <li onClick={() => navigate("/my-profile")}>✏ My Profile</li>
                        <li onClick={() => navigate("/change-password")}>🔒 Change Password</li>
                        <li onClick={handleLogout}>↪ Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
