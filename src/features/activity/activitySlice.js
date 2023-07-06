import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    activity: null,
    activities: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getActivities = createAsyncThunk("asset/getActivities", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getActivity = createAsyncThunk("asset/getActivity", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/activities/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/activities`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("asset/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/activities/${id}`, data);

        dispatch(getActivities({ url: '/api/activities' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/activities/${id}`);

        dispatch(getActivities({ url: '/api/activities' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const activitySlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getActivities.pending]: (state) => {
            state.activities = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getActivities.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.activities = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getActivities.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getActivity.pending]: (state) => {
            state.activity = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getActivity.fulfilled]: (state, { payload }) => {
            state.activity = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getActivity.rejected]: (state, { payload }) => {
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

export default activitySlice.reducer;

export const { resetSuccess } = activitySlice.actions;
