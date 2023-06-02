import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import api from "../../api";

const initialState = {
    loggedInUser: null,
    isLoggedIn: false,
    success: false,
    error: null
};

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue}) => {
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
            state.success = false;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loggedInUser = null;
            state.isLoggedIn = false;
            state.success = false;
            state.error = null;
        },
        [login.fulfilled]: (state, { payload }) => {
            if (payload) {
                const { access_token } = payload;

                const decode = jwt(access_token);
    
                localStorage.setItem("access_token", access_token);
    
                state.loggedInUser = decode.sub;
                state.isLoggedIn = true;
                state.success = true;
            }
        },
        [login.rejected]: (state, { payload }) => {
            state.loggedInUser = null;
            state.isLoggedIn = false;
            state.success = false;
            state.error = payload;
        }
    }
});

export default authSlice.reducer;

export const { resetSuccess } = authSlice.actions;
