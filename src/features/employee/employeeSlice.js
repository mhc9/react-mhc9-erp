import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    employees: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getEmployees = createAsyncThunk("employee/getEmployees", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/employees`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("employee/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/employees`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: {
        [getEmployees.pending]: (state) => {
            state.employees = [];
            state.pager = null;
            state.loading = true;
            state.error = null;
        },
        [getEmployees.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.employees = data;
            state.pager = pager;
            state.loading = false;
        },
        [getEmployees.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
    }
});

export default employeeSlice.reducer;
