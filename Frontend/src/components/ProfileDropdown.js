import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, fetchUser } from "../redux/userSlice";
import "../styles.css"; // Ensure proper CSS

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.user);

    // Fetch user when component mounts
    useEffect(() => {
        dispatch(fetchUser()); // ✅ Only use Redux to fetch user
    }, [dispatch]);

    // Logs fetched user details for debugging
    useEffect(() => {
        console.log("Fetched user:", user);
        if (error) console.error("Error fetching user:", error);
    }, [user, error]);

    // Handle Logout
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    // Toggle Dropdown
    const toggleDropdown = (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest(".profile-dropdown-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    return (
        <div className="profile-dropdown-container relative">
            {/* Profile Icon */}
            <FaUserCircle className="profile-icon cursor-pointer" onClick={toggleDropdown} />

            {/* Dropdown Menu */}
            {isOpen && user && (
                <div className="profile-dropdown absolute bg-white shadow-lg p-3 rounded-md">
                    <p className="signed-in-text text-gray-600">Signed in as</p>
                    <p className="user-info font-bold">{user.name}</p>
                    <p className="user-email text-gray-500">{user.email}</p>
                    <hr className="my-2" />
                    <ul className="text-left">
                        <li className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => navigate("/my-profile")}>✏ My Profile</li>
                        <li className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => navigate("/change-password")}>🔒 Change Password</li>
                        <li className="cursor-pointer hover:bg-gray-200 p-2 text-red-600" onClick={handleLogout}>↪ Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
