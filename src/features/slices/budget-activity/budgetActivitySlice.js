import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    activity: null,
    activities: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getActivities = createAsyncThunk("budgetActivity/getActivities", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getActivity = createAsyncThunk("budgetActivity/getActivity", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budget-activities/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("budgetActivity/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-activities`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("budgetActivity/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-activities/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("budgetActivity/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-activities/${id}/delete`, {});

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const toggle = createAsyncThunk("budgetActivity/toggle", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-activities/${id}/toggle`, data);

        dispatch(updateActivities({ id, activity: res.data.activity }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetActivitySlice = createSlice({
    name: 'budgetActivity',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
        updateActivities: (state, { payload }) => {
            const newActivities = state.activities.map(activity => {
                if (payload.id === activity.id) return payload.activity;

                return activity;
            });

            state.activities = newActivities;
        },
    },
    extraReducers: {
        [getActivities.pending]: (state) => {
            state.activities = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getActivities.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.activities = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getActivities.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getActivity.pending]: (state) => {
            state.activity = null;
            state.isLoading = true;
            state.error = null;
        },
        [getActivity.fulfilled]: (state, { payload }) => {
            state.activity = payload;
            state.isLoading = false;
        },
        [getActivity.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.activity = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, activity } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.activity = activity;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.activity = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, activity } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.activity = activity;
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

export default budgetActivitySlice.reducer;

export const { resetSuccess, resetDeleted, updateActivities } = budgetActivitySlice.actions;
