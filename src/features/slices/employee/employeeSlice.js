import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    employee: null,
    employees: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    isUploaded: false,
    error: null
};

export const getEmployees = createAsyncThunk("employee/getEmployees", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getEmployee = createAsyncThunk("employee/getEmployee", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/employees/${id}`);

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

export const update = createAsyncThunk("employee/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/employees/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("employee/destroy", async (id, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/employees/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("employee/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/employees/${id}/upload`, data);

        dispatch(updateAvatar(res.data?.avatar_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateAvatar: (state, { payload }) => {
            state.employee = { ...state.employee, avatar_url: payload };
        }
    },
    extraReducers: {
        [getEmployees.pending]: (state) => {
            state.employees = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getEmployees.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.employees = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getEmployees.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getEmployee.pending]: (state) => {
            state.employee = null;
            state.isLoading = true;
            state.error = null;
        },
        [getEmployee.fulfilled]: (state, { payload }) => {
            state.employee = payload;
            state.isLoading = false;
        },
        [getEmployee.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, employee } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, employee } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = { message };
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isDeleted = true;
            } else {
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [upload.pending]: (state) => {
            state.isUploaded = false;
            state.error = null;
        },
        [upload.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isUploaded = true;
            } else {
                state.error = { message };
            }
        },
        [upload.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default employeeSlice.reducer;

export const {
    resetDeleted,
    resetSuccess,
    resetUploaded,
    updateAvatar
} = employeeSlice.actions;
