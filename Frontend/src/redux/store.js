import { configureStore } from '@reduxjs/toolkit';
import authReducer from './leaveSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
