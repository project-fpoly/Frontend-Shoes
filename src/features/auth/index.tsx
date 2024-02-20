import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    username: string | null;
}

const initialState: AuthState = {
    username: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        }
    },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
