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

export const getBudgetProjects = createAsyncThunk("budgetProject/getBudgetProjects", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getBudgetProject = createAsyncThunk("budgetProject/getBudgetProject", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budget-projects/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("budgetProject/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-projects`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("budgetProject/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/budget-projects/${id}`, data);

        dispatch(getBudgetProjects({ url: '/api/budget-projects' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budgetProject/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/budget-projects/${id}`);

        dispatch(getBudgetProjects({ url: '/api/budget-projects' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetProjectSlice = createSlice({
    name: 'budgetProject',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getBudgetProjects.pending]: (state) => {
            state.projects = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudgetProjects.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.projects = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudgetProjects.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudgetProject.pending]: (state) => {
            state.project = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudgetProject.fulfilled]: (state, { payload }) => {
            state.project = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudgetProject.rejected]: (state, { payload }) => {
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

export default budgetProjectSlice.reducer;

export const { resetSuccess } = budgetProjectSlice.actions;
