import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios";

// Async action to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("user"));
        if (!token) return rejectWithValue("No token found, please log in.");

        const response = await API.get("api/auth/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.status == 200) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user data");
        }
        return response.data; // Return user data
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Error fetching user data");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token"); // Clear token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
