import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure you have a userSlice or other reducers

const rootReducer = combineReducers({
    user: userReducer, // Add more reducers as needed
});

export default rootReducer;
