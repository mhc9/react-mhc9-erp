import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    budget: null,
    budgets: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getBudgets = createAsyncThunk("budget/getBudgets", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getBudget = createAsyncThunk("budget/getBudget", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budgets/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("budget/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budgets`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("budget/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budgets/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budget/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budgets/${id}/delete`, {});

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const toggle = createAsyncThunk("budget/toggle", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budgets/${id}/toggle`, data);

        dispatch(updateBudgets({ id, budget: res.data.budget }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
        updateBudgets: (state, { payload }) => {
            const newBudgets = state.budgets.map(budget => {
                if (payload.id === budget.id) return payload.budget;

                return budget;
            });

            state.budgets = newBudgets;
        },
    },
    extraReducers: {
        [getBudgets.pending]: (state) => {
            state.budgets = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudgets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.budgets = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getBudgets.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudget.pending]: (state) => {
            state.budget = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudget.fulfilled]: (state, { payload }) => {
            state.budget = payload;
            state.isLoading = false;
        },
        [getBudget.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.budget = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, budget } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.budget = budget;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.budget = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, budget } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.budget = budget;
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
        [toggle.pending]: (state) => {
            state.isSuccess = false;
            state.budget = null;
            state.error = null;
        },
        [toggle.fulfilled]: (state, { payload }) => {
            const { status, message, budget } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.budget = budget;
            } else {
                state.error = { message };
            }
        },
        [toggle.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default budgetSlice.reducer;

export const { resetSuccess, resetDeleted, updateBudgets } = budgetSlice.actions;
