import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    task: null,
    tasks: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getTasks = createAsyncThunk("task/getTasks", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

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

export const handle = createAsyncThunk("task/handle", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/tasks/${id}/handle`, data);

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
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getTasks.pending]: (state) => {
            state.isLoading = true;
            state.tasks = [];
            state.pager = null;
            state.error = null;
        },
        [getTasks.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.tasks = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getTasks.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getTask.pending]: (state) => {
            state.isLoading = true;
            state.task = null;
            state.error = null;
        },
        [getTask.fulfilled]: (state, { payload }) => {
            state.task = payload;
            state.isLoading = false;
        },
        [getTask.rejected]: (state, { payload }) => {
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
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [handle.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [handle.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [handle.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default taskSlice.reducer;

export const { resetSuccess } = taskSlice.actions;
