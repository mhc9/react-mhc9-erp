import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    plan: null,
    plans: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
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

export const getBudgetPlan = createAsyncThunk("budgetPaln/getBudgetPlan", async ({ id }, { rejectWithValue }) => {
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
        const res = await api.put(`/api/budget-plans/${id}`, data);

        dispatch(getBudgetPlans({ url: '/api/budget-plans' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budgetPaln/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/budget-plans/${id}`);

        dispatch(getBudgetPlans({ url: '/api/budget-plans' }));

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
        }
    },
    extraReducers: {
        [getBudgetPlans.pending]: (state) => {
            state.plans = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudgetPlans.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.plans = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudgetPlans.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getBudgetPlan.pending]: (state) => {
            state.plan = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getBudgetPlan.fulfilled]: (state, { payload }) => {
            state.plan = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getBudgetPlan.rejected]: (state, { payload }) => {
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

export default budgetPlanSlice.reducer;

export const { resetSuccess } = budgetPlanSlice.actions;
