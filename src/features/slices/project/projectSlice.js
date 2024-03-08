import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    project: null,
    projects: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getProjects = createAsyncThunk("project/getProjects", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getProject = createAsyncThunk("project/getProject", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/projects/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("project/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/projects`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("project/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/projects/${id}`, data);

        dispatch(getProjects({ url: '/api/projects' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("project/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/projects/${id}`);

        dispatch(getProjects({ url: '/api/projects' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getProjects.pending]: (state) => {
            state.projects = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getProjects.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.projects = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getProjects.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getProject.pending]: (state) => {
            state.project = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getProject.fulfilled]: (state, { payload }) => {
            state.project = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getProject.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default projectSlice.reducer;

export const { resetSuccess } = projectSlice.actions;
