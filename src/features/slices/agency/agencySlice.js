import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    agency: null,
    agencies: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getAgencies = createAsyncThunk("agency/getAgencies", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAgency = createAsyncThunk("agency/getAgency", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/agencies/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("agency/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/agencies`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("agency/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/agencies/${id}`, data);

        dispatch(getAgencies({ url: '/api/agencies' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("agency/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/agencies/${id}`);

        dispatch(getAgencies({ url: '/api/agencies' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const agencySlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getAgencies.pending]: (state) => {
            state.agencies = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getAgencies.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.agencies = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getAgencies.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAgency.pending]: (state) => {
            state.agency = null;
            state.isLoading = true;
            state.error = null;
        },
        [getAgency.fulfilled]: (state, { payload }) => {
            state.agency = payload;
            state.isLoading = false;
        },
        [getAgency.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, agency } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.agency = agency;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
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

export default agencySlice.reducer;

export const { resetSuccess } = agencySlice.actions;
