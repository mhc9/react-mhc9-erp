import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwt from "jwt-decode";
import api from "../../../api";

const accessToken = localStorage.getItem("access_token");

const initialState = {
    loggedInUser: null,
    isLoggedIn: accessToken ? true : false,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/auth/login', credentials);
    
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        setLoggedInUser: (state, { payload }) => {
            state.loggedInUser = payload;
        },
        logout: (state) => {
            state.loggedInUser = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loggedInUser = null;
            state.isLoggedIn = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [login.fulfilled]: (state, { payload }) => {
            if (payload) {
                const { access_token } = payload;
                // const decode = jwt(access_token);

                localStorage.setItem("access_token", access_token);

                // state.loggedInUser = decode.sub;
                state.isLoggedIn = true;
                state.isSuccess = true;
            }

            state.isLoading = false;
        },
        [login.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
    }
});

export default authSlice.reducer;

export const { resetSuccess, setLoggedInUser, logout } = authSlice.actions;
