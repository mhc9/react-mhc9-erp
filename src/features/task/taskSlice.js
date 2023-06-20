import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    task: null,
    tasks: [],
    pager: null,
    loading: false,
    success: false,
    error: null,
};

export const getTasks = createAsyncThunk("task/getTasks", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get('/api/tasks');

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getTask = createAsyncThunk("task/getTask", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/tasks/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("task/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/tasks`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("task/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/tasks/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("task/destroy", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/tasks/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: {
        [getTasks.pending]: (state) => {
            state.loading = true;
            state.tasks = [];
            state.pager = null;
            state.error = null;
        },
        [getTasks.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.tasks = data;
            state.pager = pager;
            state.loading = false;
        },
        [getTasks.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getTask.pending]: (state) => {
            state.loading = true;
            state.task = null;
            state.error = null;
        },
        [getTask.fulfilled]: (state, { payload }) => {
            state.task = payload;
            state.loading = false;
        },
        [getTask.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.success = false;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default taskSlice.reducer;
