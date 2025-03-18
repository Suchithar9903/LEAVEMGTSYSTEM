import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

        const fetchUserProfile = async () => {
            const token = JSON.parse(localStorage.getItem("user"));
            console.log("Fetching profile with token:", token);
        
            try {
                const response = await axios.get("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Profile Data:", response.data);
            } catch (error) {
                console.error("Error fetching profile:", error.response ? error.response.data : error);
            }
        };
        
        useEffect(() => {
            fetchUserProfile();
        }, []);        


    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            {user ? (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default MyProfile;
