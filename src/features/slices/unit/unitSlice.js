import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    unit: null,
    units: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getUnits = createAsyncThunk("unit/getUnits", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("unit/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/units`, data);

        dispatch(getUnits({ url: `/api/units` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("unit/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/units/${id}`, data);

        dispatch(getUnits({ url: `/api/units` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("unit/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/units/${id}`, data);

        dispatch(getUnits({ url: `/api/units` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const unitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {},
    extraReducers: {
        [getUnits.pending]: (state) => {
            state.units = [];
            state.pager = null;
            state.isLoading = true;
        },
        [getUnits.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.units = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getUnits.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.units = [];
            state.pager = null;
            state.isLoading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.units = [];
            state.pager = null;
            state.isLoading = true;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default unitSlice.reducer;
