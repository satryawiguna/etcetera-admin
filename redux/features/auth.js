import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from "next-redux-wrapper";

export const initialState = {
    isAuth: false,
    access_token: null,
    refresh_token: null,
    user: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload.isAuth;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.user = action.payload.user;
        }
    }
});

export const {setAuth} = authSlice.actions;

export default authSlice.reducer;