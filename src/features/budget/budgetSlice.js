import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    budget: null,
    budgets: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getBudgets = createAsyncThunk("asset/getBudgets", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getBudget = createAsyncThunk("asset/getBudget", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budgets/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budgets`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("asset/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/budgets/${id}`, data);

        dispatch(getBudgets({ url: '/api/budgets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/budgets/${id}`);

        dispatch(getBudgets({ url: '/api/budgets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getBudgets.pending]: (state) => {
            state.budgets = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudgets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.budgets = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudgets.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudget.pending]: (state) => {
            state.budget = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudget.fulfilled]: (state, { payload }) => {
            state.budget = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudget.rejected]: (state, { payload }) => {
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

export default budgetSlice.reducer;

export const { resetSuccess } = budgetSlice.actions;
