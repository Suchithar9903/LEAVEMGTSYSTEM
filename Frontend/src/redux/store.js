import { configureStore } from '@reduxjs/toolkit';
import authReducer from './leaveSlice';
import userReducer from "./userSlice";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        reducer: rootReducer,
    }
});

export default store;