import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    departments: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getDepartments = createAsyncThunk("department/getDepartments", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/departments`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("department/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/departments`, data);

        dispatch(addDepartment(res.data.department))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, { payload }) => {
            const newDepartments = [...state.departments, payload];

            state.departments = newDepartments;
        }
    },
    extraReducers: {
        [getDepartments.pending]: (state) => {
            state.loading = true;
        },
        [getDepartments.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.departments = data;
            state.pager = pager;
            state.loading = false;
        },
        [getDepartments.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
});

export default departmentSlice.reducer;

export const { addDepartment } = departmentSlice.actions;
