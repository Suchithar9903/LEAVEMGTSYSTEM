import API from "../axios";

export const registerUser = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please log in.");

        const response = await API.post("/api/auth/register", userData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error registering user");
    }
};
