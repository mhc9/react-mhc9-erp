import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    department: null,
    departments: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getDepartments = createAsyncThunk("department/getDepartments", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

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

export const update = createAsyncThunk("department/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/departments/${id}`, data);

        dispatch(updateDepartment(res.data.department))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("department/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/departments/${id}`, data);

        dispatch(deleteDepartment(res.data.department))

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
            const updatedDepartments = [...state.departments, payload];

            state.departments = updatedDepartments;
        },
        updateDepartment: (state, { payload }) => {
            const updatedDepartments = state.departments.map(dep => {
                if (dep.id === payload.id) return payload;

                return dep;
            });

            state.departments = updatedDepartments;
        },
        deleteDepartment: (state, { payload }) => {
            const updatedDepartments = [...state.departments, payload];

            state.departments = updatedDepartments;
        }
    },
    extraReducers: {
        [getDepartments.pending]: (state) => {
            state.isLoading = true;
        },
        [getDepartments.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.departments = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getDepartments.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isLoading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isLoading = true;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default departmentSlice.reducer;

export const {
    addDepartment,
    updateDepartment,
    deleteDepartment
} = departmentSlice.actions;
