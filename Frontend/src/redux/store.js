import { configureStore } from "@reduxjs/toolkit";
import leaveReducer from "./leaveSlice"; // Import your leave slice

const store = configureStore({
    reducer: {
        leave: leaveReducer,  // Add the leave slice to Redux store
    }
});

export default store;
