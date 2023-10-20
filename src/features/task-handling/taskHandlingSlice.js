import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    handling: null,
    handlings: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getTaskHandlings = createAsyncThunk("task-handling/getTaskHandlings", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getTaskHandling = createAsyncThunk("task-handling/getTaskHandling", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/task-handlings/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("task-handling/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/task-handlings`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("task-handling/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/task-handlings/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("task-handling/destroy", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/task-handlings/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const taskHandlingSlice = createSlice({
    name: 'taskHandling',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getTaskHandlings.pending]: (state) => {
            state.isLoading = true;
            state.handlings = [];
            state.pager = null;
            state.error = null;
        },
        [getTaskHandlings.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.handlings = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getTaskHandlings.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getTaskHandling.pending]: (state) => {
            state.isLoading = true;
            state.handling = null;
            state.error = null;
        },
        [getTaskHandling.fulfilled]: (state, { payload }) => {
            state.handling = payload;
            state.isLoading = false;
        },
        [getTaskHandling.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
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
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default taskHandlingSlice.reducer;

export const { resetSuccess } = taskHandlingSlice.actions;
