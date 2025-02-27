import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaveRequests = createAsyncThunk("leave/fetchRequests", async () => {
    const response = await axios.get("/api/leave-requests/status");
    return response.data;
});

const leaveSlice = createSlice({
    name: "leave",
    initialState: { leaveRequests: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaveRequests.pending, (state) => { state.status = "loading"; })
            .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
                state.leaveRequests = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchLeaveRequests.rejected, (state) => { state.status = "failed"; });
    }
});

export default leaveSlice.reducer;
