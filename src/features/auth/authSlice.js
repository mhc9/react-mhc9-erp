import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

    },
    extraReducers: {
        [login.pending]: (state) => {
            
        },
        [login.fulfilled]: (state, { payload }) => {
            state.success = true;
            state.isLoggedIn = true;
        },
        [login.rejected]: (state, { payload }) => {
            state.success = false;
            state.error = payload;
        }
    }
});

export default authSlice.reducer;
