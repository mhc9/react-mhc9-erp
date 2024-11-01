import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    allocation: null,
    allocations: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getAllocations = createAsyncThunk("allocation/getAllocations", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAllocation = createAsyncThunk("allocation/getAllocation", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budget-allocations/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAllocationsByActivity = createAsyncThunk("allocation/getAllocationsByActivity", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/budget-allocations/activity/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("allocation/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-allocations`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("allocation/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-allocations/${id}/update`, data);

        dispatch(getAllocations({ url: '/api/budget-allocations' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("allocation/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-allocations/${id}/delete`);

        dispatch(getAllocations({ url: '/api/budget-allocations' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("allocation/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/budget-allocations/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const budgetAllocationSlice = createSlice({
    name: 'budgetAllocation',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.allocation = { ...state.allocation, img_url: payload };
        }
    },
    extraReducers: {
        [getAllocations.pending]: (state) => {
            state.allocations = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getAllocations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.allocations = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getAllocations.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllocation.pending]: (state) => {
            state.allocation = null;
            state.isLoading = true;
            state.error = null;
        },
        [getAllocation.fulfilled]: (state, { payload }) => {
            state.allocation = payload;
            state.isLoading = false;
        },
        [getAllocation.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAllocationsByActivity.pending]: (state) => {
            state.allocations = null;
            state.isLoading = true;
            state.error = null;
        },
        [getAllocationsByActivity.fulfilled]: (state, { payload }) => {
            state.allocations = payload;
            state.isLoading = false;
        },
        [getAllocationsByActivity.rejected]: (state, { payload }) => {
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
        [upload.pending]: (state) => {
            state.isUploaded = false;
            state.error = null;
        },
        [upload.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isUploaded = true;
            } else {
                state.isUploaded = false;
                state.error = { message };
            }
        },
        [upload.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default budgetAllocationSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = budgetAllocationSlice.actions;
