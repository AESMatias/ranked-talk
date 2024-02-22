import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: null, // Token of firebase authentication
        muted: false, // Flag to know if the sound is muted
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
        setMuted: (state, action) => {
            state.muted = action.payload;
        },
    },
});

export const { setUser, clearUser, setMuted } = userSlice.actions;

// export const selectCurrentUser = (state) => state.user.currentUser;

// export const selectIsLoading = (state) => state.user.isLoading;

// export const selectError = (state) => state.user.error;

export default userSlice;