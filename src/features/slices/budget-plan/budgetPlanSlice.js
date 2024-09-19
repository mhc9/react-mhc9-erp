import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    plan: null,
    plans: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getBudgetPlans = createAsyncThunk("budgetPaln/getBudgetPlans", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAllBudgetPlans = createAsyncThunk("budgetPaln/getAllBudgetPlans", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getBudgetPlan = createAsyncThunk("budgetPaln/getBudgetPlan", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budget-plans/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("budgetPaln/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-plans`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("budgetPaln/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-plans/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budgetPaln/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-plans/${id}/delete`, {});

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetPlanSlice = createSlice({
    name: 'budgetPlan',
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
        [getBudgetPlans.pending]: (state) => {
            state.plans = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudgetPlans.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.plans = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getBudgetPlans.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllBudgetPlans.pending]: (state) => {
            state.plans = [];
            state.isLoading = true;
            state.error = null;
        },
        [getAllBudgetPlans.fulfilled]: (state, { payload }) => {
            state.plans = payload;
            state.isLoading = false;
        },
        [getAllBudgetPlans.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudgetPlan.pending]: (state) => {
            state.plan = null;
            state.isLoading = true;
            state.error = null;
        },
        [getBudgetPlan.fulfilled]: (state, { payload }) => {
            state.plan = payload;
            state.isLoading = false;
        },
        [getBudgetPlan.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.plan = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, plan } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.plan = plan;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.plan = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, plan } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.plan = plan;
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

export default budgetPlanSlice.reducer;

export const { resetSuccess, resetDeleted } = budgetPlanSlice.actions;
