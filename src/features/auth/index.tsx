import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any | null>) => {
            state.user = action.payload;
        }
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
