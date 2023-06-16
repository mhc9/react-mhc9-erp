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

export const assetOwnershipSlice = createSlice({
    name: 'ownership',
    initialState,
    reducers: {},
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
    }
});

export default assetOwnershipSlice.reducer;
