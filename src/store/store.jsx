import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/AccountSlice';

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer
    },
});
