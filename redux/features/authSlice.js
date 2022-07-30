import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    is_auth: false,
    access_token: null,
    refresh_token: null,
    user: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            return {
                ...state,
                is_auth: action.payload.is_auth,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                user: action.payload.user
            }
        },
        logout(state, action) {
            return {
                ...state,
                is_auth: action.payload.is_auth,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                user: action.payload.user
            }
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;