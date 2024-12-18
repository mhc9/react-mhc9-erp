import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    unit: null,
    units: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
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

export const getUnit = createAsyncThunk("unit/getUnit", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/units/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("unit/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/units`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("unit/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/units/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("unit/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/units/${id}/delete`, {});

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const unitSlice = createSlice({
    name: 'unit',
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
        [getUnits.pending]: (state) => {
            state.units = [];
            state.pager = null;
            state.error = null;
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
        [getUnit.pending]: (state) => {
            state.unit = null;
            state.error = null;
            state.isLoading = true;
        },
        [getUnit.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.units = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getUnit.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, unit } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.unit = unit;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, unit } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.unit = unit;
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

export default unitSlice.reducer;

export const { resetSuccess, resetDeleted } = unitSlice.actions;
