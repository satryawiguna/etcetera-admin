import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    access_token: null,
    refresh_token: null,
    expires_in: null,
    token_type: null,
    user: {},
    logged_at: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: action.payload.expires_in,
                token_type: action.payload.token_type,
                user: action.payload.user,
                logged_at: action.payload.logged_at
            }
        },
        logout(state, action) {
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: action.payload.expires_in,
                token_type: action.payload.token_type,
                user: action.payload.user,
                logged_at: action.payload.logged_at
            }
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;