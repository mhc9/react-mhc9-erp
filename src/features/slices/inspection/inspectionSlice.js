import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    inspections: [],
    inspection: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getInspections = createAsyncThunk("inspection/getInspections", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getInspection = createAsyncThunk("inspection/getInspection", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/inspections/${id}`);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("inspection/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/inspections`, data);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("inspection/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/inspections/${id}/update`, data);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("inspection/destroy", async (id, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/inspections/${id}/delete`, {});
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const inspectionSlice = createSlice({
    name: 'inspection',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
    },
    extraReducers: {
        [getInspections.pending]: (state) => {
            state.inspections = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getInspections.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.inspections = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getInspections.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        [getInspection.pending]: (state) => {
            state.inspection = null;
            state.isLoading = true;
            state.error = null;
        },
        [getInspection.fulfilled]: (state, { payload }) => {
            state.inspection = payload;
            state.isLoading = false;
        },
        [getInspection.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.inspection = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, inspection } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.inspection = inspection;
            } else {
                state.isSuccess = false;
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
                state.isDeleted = false;
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default inspectionSlice.reducer;

export const { resetDeleted, resetSuccess } = inspectionSlice.actions;
