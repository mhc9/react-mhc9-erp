import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    ownerships: [],
    pager: null,
    loading: false,
    success: false,
    error: null,
};

export const getOwnerships = createAsyncThunk("ownership/getOwnerships", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/asset-ownerships`);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const getOwnershipsByAsset = createAsyncThunk("ownership/getOwnershipsByAsset", async ({ assetId }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/asset-ownerships/asset/${assetId}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const store = createAsyncThunk("ownership/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/asset-ownerships`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const update = createAsyncThunk("ownership/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/asset-ownerships/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const destroy = createAsyncThunk("ownership/store", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/asset-ownerships/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

export const assetOwnershipSlice = createSlice({
    name: 'ownership',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: {
        [getOwnerships.pending]: (state) => {
            state.ownerships = [];
            state.pager = null;
            state.loading = true;
        },
        [getOwnerships.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.ownerships = data;
            state.pager = pager;
            state.loading = false;
        },
        [getOwnerships.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getOwnershipsByAsset.pending]: (state) => {
            state.ownerships = [];
            state.pager = null;
            state.loading = true;
        },
        [getOwnershipsByAsset.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.ownerships = data;
            state.pager = pager;
            state.loading = false;
        },
        [getOwnershipsByAsset.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default assetOwnershipSlice.reducer;

export const { resetSuccess } = assetOwnershipSlice.actions;
