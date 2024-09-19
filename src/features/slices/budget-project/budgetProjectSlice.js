import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    project: null,
    projects: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
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

export const getAllBudgetProjects = createAsyncThunk("budgetProject/getAllBudgetProjects", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getBudgetProject = createAsyncThunk("budgetProject/getBudgetProject", async (id, { rejectWithValue }) => {
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
        const res = await api.post(`/api/budget-projects/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budgetProject/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-projects/${id}/delete`, {});

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
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
    },
    extraReducers: {
        [getBudgetProjects.pending]: (state) => {
            state.projects = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudgetProjects.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.projects = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getBudgetProjects.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllBudgetProjects.pending]: (state) => {
            state.projects = [];
            state.isLoading = true;
            state.error = null;
        },
        [getAllBudgetProjects.fulfilled]: (state, { payload }) => {
            state.projects = payload;
            state.isLoading = false;
        },
        [getAllBudgetProjects.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudgetProject.pending]: (state) => {
            state.project = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudgetProject.fulfilled]: (state, { payload }) => {
            state.project = payload;
            state.isLoading = false;
        },
        [getBudgetProject.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.project = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, project } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.project = project;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.project = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, project } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.project = project;
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
    }
});

export default budgetProjectSlice.reducer;

export const { resetSuccess, resetDeleted } = budgetProjectSlice.actions;
